/*
  Mọi nội dung hay thay đổi nằm trong file này. Giao diện tự cập nhật theo dữ liệu.

  GAMES: thứ tự trong file không quan trọng, trang tự xếp theo chữ cái.
    url:   link website riêng của game. Để null thì thẻ game hiện "Sắp ra mắt".
    image: ảnh trong assets/games. Để null thì thẻ dùng nền màu.
    genre: thể loại, tự sinh thành bộ lọc danh mục.
    hero:  ảnh lớn (~2000px) cho slide đầu trang; không có thì dùng image.
    focus: vị trí cắt ảnh khi thành poster đứng, ví dụ "75% 50%" (0% là mép trái, 100% là mép phải). Không điền thì lấy "50% 50%".
  NEWS: trang tự xếp tin mới nhất lên đầu.
    game:  id của game trong GAMES, hoặc null nếu là tin chung của team.
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
      description: "Thu mua Divine Orb và Mirror of Kalandra, nhận cày account và mua bán item hộ.",
      services: ["Thu mua Divine/Mirror", "Cày thuê"],
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
      description: "Thu mua gold theo ruleset và phe, cùng dịch vụ cày thuê theo yêu cầu.",
      services: ["Thu mua gold", "Cày thuê"],
      url: "games/wow-forever/",
      en: { description: "Gold buying by ruleset and faction, plus boosting on request.", services: ["Gold buying", "Boosting"] }
    }
  ],

  news: [
    {
      date: "2026-11-01",
      game: "aion-2",
      title: "Discord AION 2 đang được hoàn thiện",
      summary: "Máy chủ Discord cho kênh thoại chiến bang và săn Boss đang được chuẩn bị. Trong lúc chờ, anh em giao lưu tại nhóm Zalo và Group Facebook.",
      url: null,
      en: { title: "AION 2 Discord is being finished", summary: "The Discord server for guild war voice channels and boss hunts is being prepared. Meanwhile, join us in the Zalo group and Facebook group." }
    },
    {
      date: "2026-10-31",
      game: "blox-fruits",
      title: "Bảng giá thu mua Blox Fruits đã có 46 item",
      summary: "Danh sách gồm trái gốc, trái đột biến, skin limited, chromatic và các item limited khác, có thể tính tiền theo VND hoặc USDT.",
      url: null,
      en: { title: "Blox Fruits buying price list now covers 46 items", summary: "The list includes base fruits, mutated fruits, limited skins, chromatic and other limited items, with totals in VND or USDT." }
    },
    {
      date: "2026-10-31",
      game: "wow-forever",
      title: "GeGe Team nhận thu mua gold WoW Forever",
      summary: "Thu mua theo ruleset và phe, thanh toán qua ví USDT. Rate đang được cập nhật, liên hệ admin để biết thông tin mới nhất.",
      url: null,
      en: { title: "GeGe Team now buys WoW Forever gold", summary: "We buy by ruleset and faction, paid to a USDT wallet. Rates are being updated, so contact the admin for the latest information." }
    }
  ],

  community: [
    { name: "Zalo Admin", detail: "Hỗ trợ và giao dịch · 0936 854 505", detailEn: "Support and trading · 0936 854 505", url: "https://zalo.me/0936854505", primary: true },
    { name: "Nhóm Zalo", detail: "Tin nhanh và thông báo trong ngày", detailEn: "Quick news and daily announcements", url: "https://zalo.me/g/kmxfzujpa7akgrijn5hk" },
    { name: "Fanpage GeGe Team", detail: "Tin tức và sự kiện chính thức", detailEn: "Official news and events", url: "https://www.facebook.com/GegeTeam.net/" },
    { name: "Group Facebook", detail: "Giao lưu, hỏi đáp và tìm đội", detailEn: "Chat, Q&A and finding parties", url: "https://www.facebook.com/groups/457999664580741" },
    { name: "Discord", detail: "Sắp mở", detailEn: "Coming soon", url: null },
    { name: "Trang liên kết", detail: "gegeteam.xyz", url: "https://gegeteam.xyz/" }
  ]
};
