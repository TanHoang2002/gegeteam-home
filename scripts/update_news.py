#!/usr/bin/env python3
"""Tự lấy tin mới của từng game và ghi vào js/news-auto.js.

Chạy bằng GitHub Actions theo lịch (.github/workflows/update-news.yml), hoặc chạy tay:
    pip install pillow
    python3 scripts/update_news.py

Nguồn tin:
  - POE 1, AION 2: thông báo chính thức trên Steam (Steam Web API, không cần key).
  - WoW Forever: trang tin worldofwarcraft.blizzard.com, chỉ lấy bài có chữ "Forever".
  - Blox Fruits: chưa có nguồn tin chính thức, vẫn đăng tay trong js/data.js.

Tin tự động để tiếng Anh. Muốn có bản dịch thì chép tin sang js/data.js (mục news)
và thêm các bản dịch; tin đăng tay có ngày mới hơn hoặc bằng sẽ che tin tự động của game đó.
Nguồn nào lỗi thì giữ nguyên tin cũ của nguồn đó, không làm hỏng trang.
"""
import datetime as dt
import html
import io
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_JS = os.path.join(ROOT, "js", "news-auto.js")
IMG_DIR = os.path.join(ROOT, "assets", "news", "auto")
UA = "GeGeTeam-NewsBot/1.0 (+https://github.com/TanHoang2002/gegeteam-home)"
PER_GAME = 2          # số tin tự động giữ lại cho mỗi game
MAX_AGE_DAYS = 45     # bỏ tin cũ hơn số ngày này

# Tin không đáng đưa lên trang chủ: bảo trì, khoá tài khoản, bản vá nhỏ, bán hàng...
NOISE = re.compile(
    r"maintenance|account restriction|hotfix|matchmaking|login issue|patch notes|known issues|"
    r"twitch drops|qualifier|\bsale\b|mystery box|supporter pack|merchandise|winner|"
    r"skin item|pass product|purchase|upgrade|code of conduct|house rules|vods?\b|"
    r"filter information|faq\b|weekly|podcast|poster signing",
    re.I,
)

STEAM_GAMES = [
    # (id game trong data.js, Steam appid, chữ bắt buộc có trong tiêu đề hoặc None)
    ("poe-1", 238960, None),
    ("aion-2", 3393110, None),
]


def get(url, binary=False, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def clean_text(s, limit=220):
    s = re.sub(r"\[img[^\]]*\].*?\[/img\]", " ", s, flags=re.S)
    s = re.sub(r"\{STEAM_CLAN_IMAGE\}\S*", " ", s)
    s = re.sub(r"\[/?[a-z*][^\]]*\]", " ", s)
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    s = re.sub(r"https?://\S+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(hello|greetings|hi)[^.!?]*[.!?]\s*", "", s, flags=re.I)
    s = re.sub(r"\s*\d+\.$", "", s)
    if len(s) <= limit:
        return s
    cut = s[:limit]
    end = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
    return (cut[: end + 1] if end > 80 else cut.rsplit(" ", 1)[0] + "…").strip()


def poe_forum_links():
    """Tiêu đề -> link bài trên pathofexile.com (để khách bấm vào trang chính thức thay vì Steam)."""
    try:
        root = ET.fromstring(get("https://www.pathofexile.com/news/rss"))
    except Exception as e:  # trang có thể chặn máy chủ GitHub, khi đó dùng link Steam
        print("  poe rss:", e)
        return {}
    links = {}
    for it in root.iter("item"):
        t, l = it.findtext("title") or "", it.findtext("link") or ""
        links[norm(t)] = l
    return links


def norm(t):
    return re.sub(r"[^a-z0-9]+", "", t.lower())


def steam_items(game, appid, must):
    url = (
        "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/"
        f"?appid={appid}&count=40&feeds=steam_community_announcements&format=json"
    )
    items = json.loads(get(url))["appnews"]["newsitems"]
    poe_links = poe_forum_links() if game == "poe-1" else {}
    out = []
    for n in items:
        title = html.unescape(n["title"]).strip()
        if NOISE.search(title) or (must and must.lower() not in title.lower()):
            continue
        m = re.search(r"\{STEAM_CLAN_IMAGE\}(/[^\s\"\[\]]+?\.(?:jpg|jpeg|png|gif|webp))", n["contents"], re.I)
        if not m:  # bài lớn luôn có ảnh; bài không ảnh thường là thông báo vặt
            continue
        link = poe_links.get(norm(title)) or n["url"]
        out.append({
            "id": f"steam-{n['gid']}",
            "game": game,
            "date": dt.datetime.fromtimestamp(n["date"], dt.timezone.utc).date().isoformat(),
            "title": title,
            "summary": clean_text(n["contents"]),
            "url": link,
            "src_image": "https://clan.akamai.steamstatic.com/images" + m.group(1),
        })
    return out


def wow_items():
    page = get("https://worldofwarcraft.blizzard.com/en-us/news")
    out, seen = [], set()
    # Bài blog nằm trong JSON nhúng sẵn trong trang: tiêu đề, link, mô tả, ngày đăng, ảnh
    pat = re.compile(
        r'"title":"(?P<title>(?:[^"\\]|\\.)*)","id":(?P<id>\d+),"slug":"[^"]*","url":"(?P<url>/news/[^"]+)",'
        r'"author":"[^"]*","description":"(?P<desc>(?:[^"\\]|\\.)*)"'
    )
    for m in pat.finditer(page):
        title = json.loads('"' + m.group("title") + '"')
        if "forever" not in title.lower() or NOISE.search(title) or m.group("id") in seen:
            continue
        seen.add(m.group("id"))
        tail = page[m.end(): m.end() + 200000]
        pub = re.search(r'"published":"(\d{4}-\d{2}-\d{2})', tail)
        img = re.search(r'"thumbnail":\{"width":\d+,"height":\d+,"url":"([^"]+)"', tail)
        if not pub:
            continue
        src = img.group(1) if img else None
        if src and src.startswith("//"):
            src = "https:" + src
        out.append({
            "id": "wow-" + m.group("id"),
            "game": "wow-forever",
            "date": pub.group(1),
            "title": title,
            "summary": clean_text(json.loads('"' + m.group("desc") + '"')),
            "url": "https://worldofwarcraft.blizzard.com/en-us" + m.group("url"),
            "src_image": src,
        })
    return out


def save_image(item):
    """Tải ảnh về repo (khách ở VN không vào được Steam), đổi sang webp rộng tối đa 1280px."""
    from PIL import Image

    name = re.sub(r"[^a-z0-9-]+", "-", f"{item['game']}-{item['id']}".lower())[:80] + ".webp"
    path = os.path.join(IMG_DIR, name)
    if not os.path.exists(path):
        if not item.get("src_image"):
            raise ValueError("không có ảnh")
        im = Image.open(io.BytesIO(get(item["src_image"], binary=True))).convert("RGB")
        if im.width < 600 or im.height < 250:  # ảnh quá nhỏ (logo, banner chữ): dùng ảnh game
            raise ValueError(f"ảnh nhỏ {im.size}")
        if im.width > 1280:
            im = im.resize((1280, round(im.height * 1280 / im.width)), Image.LANCZOS)
        os.makedirs(IMG_DIR, exist_ok=True)
        im.save(path, "WEBP", quality=84)
    return "assets/news/auto/" + name


def load_previous():
    try:
        txt = open(OUT_JS, encoding="utf-8").read()
        return json.loads(txt[txt.index("["): txt.rindex("]") + 1])
    except Exception:
        return []


def main():
    previous = load_previous()
    cutoff = (dt.date.today() - dt.timedelta(days=MAX_AGE_DAYS)).isoformat()
    sources = [(g, (lambda g=g, a=a, m=m: steam_items(g, a, m))) for g, a, m in STEAM_GAMES]
    sources.append(("wow-forever", wow_items))

    result = []
    for game, fetch in sources:
        try:
            items = [i for i in fetch() if i["date"] >= cutoff]
            items.sort(key=lambda i: i["date"], reverse=True)
            kept = []
            for i in items[:PER_GAME]:
                try:
                    i["image"] = save_image(i)
                except Exception as e:
                    print(f"  {game}: ảnh lỗi ({e}), dùng ảnh game")
                kept.append(i)
            print(f"{game}: {len(kept)} tin")
        except Exception as e:  # nguồn lỗi: giữ tin cũ của game này
            kept = [i for i in previous if i.get("game") == game]
            print(f"{game}: lỗi nguồn ({e}), giữ {len(kept)} tin cũ")
        result.extend(kept)

    result.sort(key=lambda i: i["date"], reverse=True)
    for i in result:
        i.pop("src_image", None)
        i["auto"] = True
        i["hero"] = False  # ảnh tin tự động thường có chữ, không đưa lên slide đầu trang

    # Xoá ảnh của tin đã rơi khỏi danh sách
    used = {os.path.basename(i["image"]) for i in result if i.get("image")}
    if os.path.isdir(IMG_DIR):
        for f in os.listdir(IMG_DIR):
            if f not in used:
                os.remove(os.path.join(IMG_DIR, f))

    body = json.dumps(result, ensure_ascii=False, indent=2)
    js = (
        "/* Tạo tự động bởi scripts/update_news.py, đừng sửa tay (sẽ bị ghi đè).\n"
        "   Muốn dịch một tin: chép nó sang mục news trong js/data.js rồi thêm bản dịch. */\n"
        f"window.GEGE_NEWS_AUTO = {body};\n"
    )
    old = open(OUT_JS, encoding="utf-8").read() if os.path.exists(OUT_JS) else ""
    if js != old:
        open(OUT_JS, "w", encoding="utf-8").write(js)
        print("Đã cập nhật js/news-auto.js")
    else:
        print("Không có tin mới")


if __name__ == "__main__":
    sys.exit(main())
