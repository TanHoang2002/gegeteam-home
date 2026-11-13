# GeGe Team Home

Trang chính của GeGe Team (Nhà Cáo): giới thiệu thương hiệu, danh mục game xếp theo chữ cái, tin tức và các kênh liên hệ. Trang tĩnh, không cần cài đặt.

Chạy thử: `python3 -m http.server 8090` rồi mở `http://localhost:8090`.

## Sửa nội dung

Mọi dữ liệu nằm trong `js/data.js`:

- Gắn website cho game: điền `url` của game đó. Thẻ game sẽ đổi từ "Sắp ra mắt" sang mở website trong tab mới.
- Thêm game: thêm một mục vào `games`. Thứ tự A–Z và bộ lọc thể loại được tạo tự động.
- Đăng tin: thêm một mục vào `news`. Tin mới nhất tự lên đầu.
- Đổi kênh liên hệ: sửa `community`. Để `url` là `null` thì kênh hiện ở trạng thái chưa mở.

## Tin tức tự động

GitHub Actions (`.github/workflows/deploy.yml`) chạy `scripts/update_news.py` mỗi giờ một lần, lấy tin mới của POE 1, AION 2 (thông báo chính thức trên Steam) và WoW Forever (trang tin Blizzard), ghi vào `js/news-auto.js` và ảnh vào `assets/news/auto/`, rồi tự commit. Blox Fruits chưa có nguồn tin nên vẫn đăng tay.

- Tin tự động để tiếng Anh cho mọi ngôn ngữ. Muốn dịch: chép tin đó vào mục `news` trong `js/data.js` và thêm `en`/`tr` như các tin khác. Tin đăng tay mới hơn hoặc cùng ngày sẽ che tin tự động của game đó.
- Bỏ bớt tin vặt (bảo trì, hotfix, bán hàng, Twitch drops...): sửa danh sách `NOISE` trong script.
- Chạy ngay: tab Actions → Deploy site → Run workflow. Chạy trên máy: `pip install pillow && python3 scripts/update_news.py`.

## Đăng website (GitHub Pages)

`.github/workflows/deploy.yml` gộp trang chủ và 4 trang game (`/games/poe-1/`, `/games/aion-2/`, `/games/blox-fruits/`, `/games/wow-forever/`) thành một website rồi đăng lên GitHub Pages. Chạy khi push lên `main`, mỗi giờ một lần (nhận luôn thay đổi của các repo game), hoặc bấm tay ở tab Actions.

Tên miền riêng: ghi tên miền vào file `CNAME` ở gốc repo, điền cùng tên miền trong Settings → Pages → Custom domain, và trỏ DNS:
- `@` → bản ghi A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `www` → CNAME: `tanhoang2002.github.io`
