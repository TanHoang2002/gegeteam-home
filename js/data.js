/*
  Mọi nội dung hay thay đổi nằm trong file này. Giao diện tự cập nhật theo dữ liệu.

  GAMES: thứ tự trong file không quan trọng, trang tự xếp theo chữ cái.
    url:   link website riêng của game. Để null thì thẻ game hiện "Sắp ra mắt".
    image: ảnh trong assets/games. Để null thì thẻ dùng nền màu.
    genre: thể loại, tự sinh thành bộ lọc danh mục.
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
      description: "Cộng đồng người chơi AION 2 Việt Nam: tin tức, hỏi đáp, tìm đội và tuyển thành viên Legion.",
      services: ["Cộng đồng", "Tin tức"],
      url: null
    },
    {
      id: "blox-fruits",
      name: "Blox Fruits",
      genre: "Roblox",
      image: "assets/games/blox-fruits.webp",
      description: "Bảng giá thu mua trái, skin và item limited, tính tổng tiền theo VND và USDT.",
      services: ["Thu mua item"],
      url: null
    },
    {
      id: "diablo-4",
      name: "Diablo 4",
      genre: "ARPG",
      image: null,
      description: "Khu vực dành cho người chơi Diablo 4 đang được chuẩn bị.",
      services: [],
      url: null
    },
    {
      id: "wow-forever",
      name: "WoW Forever",
      genre: "MMORPG",
      image: "assets/games/wow-forever.webp",
      description: "Thu mua gold theo ruleset và phe, cùng dịch vụ cày thuê theo yêu cầu.",
      services: ["Thu mua gold", "Cày thuê"],
      url: null
    }
  ],

  news: [
    {
      date: "2026-11-01",
      game: "aion-2",
      title: "Discord AION 2 đang được hoàn thiện",
      summary: "Máy chủ Discord cho kênh thoại chiến bang và săn Boss đang được chuẩn bị. Trong lúc chờ, anh em giao lưu tại nhóm Zalo và Group Facebook.",
      url: null
    },
    {
      date: "2026-10-31",
      game: "blox-fruits",
      title: "Bảng giá thu mua Blox Fruits đã có 46 item",
      summary: "Danh sách gồm trái gốc, trái đột biến, skin limited, chromatic và các item limited khác, có thể tính tiền theo VND hoặc USDT.",
      url: null
    },
    {
      date: "2026-10-31",
      game: "wow-forever",
      title: "GeGe Team nhận thu mua gold WoW Forever",
      summary: "Thu mua theo ruleset và phe, thanh toán qua ví USDT. Rate đang được cập nhật, liên hệ admin để biết thông tin mới nhất.",
      url: null
    }
  ],

  community: [
    { name: "Zalo Admin", detail: "Hỗ trợ và giao dịch · 0936 854 505", url: "https://zalo.me/0936854505", primary: true },
    { name: "Nhóm Zalo", detail: "Tin nhanh và thông báo trong ngày", url: "https://zalo.me/g/kmxfzujpa7akgrijn5hk" },
    { name: "Fanpage GeGe Team", detail: "Tin tức và sự kiện chính thức", url: "https://www.facebook.com/GegeTeam.net/" },
    { name: "Group Facebook", detail: "Giao lưu, hỏi đáp và tìm đội", url: "https://www.facebook.com/groups/457999664580741" },
    { name: "Discord", detail: "Sắp mở", url: null },
    { name: "Trang liên kết", detail: "gegeteam.xyz", url: "https://gegeteam.xyz/" }
  ]
};
