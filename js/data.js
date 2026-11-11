/*
  Mọi nội dung hay thay đổi nằm trong file này. Giao diện tự cập nhật theo dữ liệu.

  GAMES: thứ tự trong file không quan trọng, trang tự xếp theo chữ cái.
    url:   link website riêng của game. Để null thì thẻ game hiện "Sắp ra mắt".
    image: ảnh trong assets/games. Để null thì thẻ dùng nền màu.
    genre: thể loại, tự sinh thành bộ lọc danh mục.
    hero:  ảnh lớn (~2000px) cho slide đầu trang; không có thì dùng image.
    focus: vị trí cắt ảnh khi thành poster đứng, ví dụ "75% 50%" (0% là mép trái, 100% là mép phải). Không điền thì lấy "50% 50%".
    heroFocusMobile: vị trí cắt ảnh hero trên điện thoại (màn hình dọc chỉ thấy một dải hẹp của ảnh), ví dụ "66% 50%".
  COMMUNITY: icon ("zalo", "facebook", "discord", "link") hiện trong thẻ khi rê chuột và ở nút tròn chân trang.
    card: false thì không hiện thẻ ở mục "Vào team cùng anh em" (vẫn có ở chân trang).
  NEWS: trang tự xếp tin mới nhất lên đầu.
    game:  id của game trong GAMES, hoặc null nếu là tin chung của team.
    image: ảnh riêng của tin trong assets/news; không có thì dùng ảnh của game.
    url:   link bài chi tiết, để null nếu không có.
    date:  định dạng YYYY-MM-DD.
*/
window.GEGE_DATA = {
  games: [
    {
      id: "aion-2",
      name: "AION 2",
      genre: "MMORPG",
      image: "assets/games/aion-2.webp",
      hero: "assets/hero/aion-2.webp",
      focus: "72% 50%",
      heroFocusMobile: "84% 50%",
      description: "Cộng đồng người chơi AION 2 Việt Nam: tin tức, hỏi đáp, tìm đội và tuyển thành viên Legion.",
      services: ["Cộng đồng", "Tin tức"],
      url: "games/aion-2/",
      en: { description: "Vietnamese AION 2 community: news, Q&A, finding parties and Legion recruitment.", services: ["Community", "News"] }
    },
    {
      id: "blox-fruits",
      name: "Blox Fruits",
      genre: "Roblox",
      image: "assets/games/blox-fruits.webp",
      hero: "assets/hero/blox-fruits.webp",
      description: "Bảng giá thu mua trái, skin và item limited, tính tổng tiền theo VND và USDT.",
      services: ["Thu mua item"],
      url: "games/blox-fruits/",
      en: { description: "Buying price list for fruits, skins and limited items, with totals in VND and USDT.", services: ["Item buying"] }
    },
    {
      id: "diablo-4",
      name: "Diablo 4",
      genre: "ARPG",
      image: "assets/games/diablo-4.webp",
      hero: "assets/hero/diablo-4.webp",
      focus: "50% 40%",
      description: "Season 15 – Season of Hell's Legacy: Diablo, Baal và Mephisto trở lại. Khu vực Diablo 4 của Nhà Cáo đang được chuẩn bị.",
      services: [],
      url: null,
      en: { description: "Season 15 – Season of Hell's Legacy: Diablo, Baal and Mephisto return. Nha Cao's Diablo 4 area is being prepared.", services: [] }
    },
    {
      id: "poe-1",
      name: "POE 1",
      genre: "ARPG",
      image: "assets/games/poe-1.webp",
      hero: "assets/hero/poe-1.webp",
      heroFocusMobile: "60% 50%",
      description: "Thu mua Divine Orb và Mirror of Kalandra, nhận booster account và mua bán item hộ.",
      services: ["Thu mua Divine/Mirror", "Booster"],
      url: "games/poe-1/",
      en: { description: "Buying Divine Orbs and Mirrors of Kalandra, plus account boosting and item trading.", services: ["Divine/Mirror buying", "Boosting"] }
    },
    {
      id: "wow-forever",
      name: "WoW Forever",
      genre: "MMORPG",
      image: "assets/games/wow-forever.webp",
      hero: "assets/hero/wow-forever.webp",
      focus: "80% 50%",
      heroFocusMobile: "74% 50%",
      description: "Thu mua gold theo ruleset và phe, cùng dịch vụ booster theo yêu cầu.",
      services: ["Thu mua gold", "Booster"],
      url: "games/wow-forever/",
      en: { description: "Gold buying by ruleset and faction, plus boosting on request.", services: ["Gold buying", "Boosting"] }
    }
  ],

  news: [
    {
      date: "2026-11-11",
      game: "aion-2",
      image: "assets/news/aion-2-lookbook.webp",
      title: "AION 2 bảo trì ngày 11/11 và ra mắt trang phục mới",
      summary: "Máy chủ Global bảo trì 4 tiếng 30 phút từ 13h30 ngày 11/11 (giờ Việt Nam). Cùng đợt này NCSOFT giới thiệu loạt trang phục mới trong Daeva Lookbook.",
      url: "https://aion2.plaync.com/en-us/conts/261111_lookbook",
      en: { title: "AION 2 maintenance on Nov 11 and new outfits", summary: "Global servers are down for 4.5 hours from 07:30 CET on November 11. NCSOFT also showcases a new set of outfits in the Daeva Lookbook." }
    },
    {
      date: "2026-11-06",
      game: "poe-1",
      image: "assets/news/poe-1-covens-of-umbra.webp",
      title: "POE 1: league Covens of Umbra (3.30) mở ngày 13/11",
      summary: "League mới mở rạng sáng 14/11 giờ Việt Nam. Các hội phù thủy làm nghi lễ để triệu hồi nữ hoàng của chúng; endgame thay đổi lớn, cây Atlas Passive được làm lại và có thêm nhiều unique mới.",
      url: "https://www.pathofexile.com/covens",
      en: { title: "POE 1: Covens of Umbra (3.30) launches November 13", summary: "The new league starts on November 13 (PST). Covens perform wicked rituals to summon their queen, the endgame gets major changes, the Atlas Passive Tree is redesigned and new uniques arrive." }
    },
    {
      date: "2026-11-04",
      game: "aion-2",
      image: "assets/news/aion-2-ludra.webp",
      title: "AION 2 mở raid Sanctuary \"Abyssal Forge: Ludra\"",
      summary: "Bản cập nhật ngày 4/11 thêm raid Ludra với hai độ khó: Normal (item level 2.800) và Hard (3.000), mỗi lượt giới hạn 1 giờ. Sự kiện điểm danh Ludra Awakens tặng Kinah và trang bị đến ngày 18/11.",
      url: "https://aion2.plaync.com/en-us/eventon/board/event_notice/view?articleId=50000049",
      en: { title: "AION 2 opens the \"Abyssal Forge: Ludra\" Sanctuary raid", summary: "The November 4 update adds the Ludra raid in Normal (item level 2,800) and Hard (3,000) difficulties, each run capped at 1 hour. The Ludra Awakens check-in event gives Kinah and gear until November 18." }
    },
    {
      date: "2026-11-04",
      game: "wow-forever",
      image: "assets/news/wow-forever-live.webp",
      title: "World of Warcraft: Forever chính thức mở cửa",
      summary: "Máy chủ mở đồng loạt toàn cầu ngày 4/11: phiêu lưu đến cấp 60 trên các lục địa gốc, chọn ruleset thay cho realm. GeGe Team đang thu mua gold, liên hệ admin để biết rate.",
      url: "https://worldofwarcraft.blizzard.com/en-us/news/24315820/world-of-warcraft-forever-now-live",
      en: { title: "World of Warcraft: Forever is now live", summary: "Servers opened worldwide on November 4: adventure to level 60 across the original continents and pick a ruleset instead of a realm. GeGe Team is buying gold, contact the admin for rates." }
    },
    {
      date: "2026-10-31",
      game: "blox-fruits",
      image: "assets/news/blox-fruits-halloween.webp",
      title: "Blox Fruits: sự kiện Halloween kéo dài đến 15/11",
      summary: "Sự kiện Halloween thêm Hellfire Gas, Candy Corn, săn bí ngô và raid boss Great Pumpkin. Có trái hoặc item muốn bán, xem bảng giá thu mua của Nhà Cáo.",
      url: "https://www.roblox.com/games/2753915549",
      en: { title: "Blox Fruits: Halloween event runs until November 15", summary: "The Halloween event adds Hellfire Gas, Candy Corn, a pumpkin hunt and the Great Pumpkin raid boss. Got fruits or items to sell? Check Nha Cao's buying price list." }
    }
  ],

  community: [
    { name: "Zalo Admin", detail: "Hỗ trợ và giao dịch · 0936 854 505", detailEn: "Support and trading · 0936 854 505", url: "https://zalo.me/0936854505", icon: "zalo", card: false },
    { name: "Nhóm Zalo", detail: "Tin nhanh và thông báo trong ngày", detailEn: "Quick news and daily announcements", url: "https://zalo.me/g/kmxfzujpa7akgrijn5hk", icon: "zalo" },
    { name: "Fanpage GeGe Team", detail: "Tin tức và sự kiện chính thức", detailEn: "Official news and events", url: "https://www.facebook.com/GegeTeam.net/", icon: "facebook" },
    { name: "Group Facebook", detail: "Giao lưu, hỏi đáp và tìm đội", detailEn: "Chat, Q&A and finding parties", url: "https://www.facebook.com/groups/457999664580741", icon: "facebook" },
    { name: "Discord", detail: "Kênh thoại, thảo luận và tìm đội", detailEn: "Voice chat, discussion and finding parties", url: "https://discord.gg/XN8j8yVnV", icon: "discord" },
    { name: "Trang liên kết", detail: "gegeteam.xyz", url: "https://gegeteam.xyz/", icon: "link" }
  ]
};
