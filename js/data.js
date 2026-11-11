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
  Ngôn ngữ: trường gốc là tiếng Việt, "en" là tiếng Anh, "tr.id" là Indonesia, "tr.fil" là Philippines, "tr.ru" là tiếng Nga.
    Thiếu bản dịch Indonesia/Philippines/Nga thì trang tự dùng tiếng Anh.
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
      en: { description: "Vietnamese AION 2 community: news, Q&A, finding parties and Legion recruitment.", services: ["Community", "News"] },
      tr: { id: { description: "Komunitas AION 2 Vietnam: berita, tanya jawab, cari party, dan rekrut anggota Legion." }, fil: { description: "Vietnamese AION 2 community: balita, Q&A, paghahanap ng party at pag-recruit sa Legion." }, ru: { description: "Вьетнамское сообщество AION 2: новости, вопросы и ответы, поиск группы и набор в легион." } }
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
      en: { description: "Buying price list for fruits, skins and limited items, with totals in VND and USDT.", services: ["Item buying"] },
      tr: { id: { description: "Daftar harga beli buah, skin, dan item limited, dengan total dalam VND dan USDT." }, fil: { description: "Price list sa pagbili ng prutas, skin at limited item, may kabuuan sa VND at USDT." }, ru: { description: "Прайс скупки фруктов, скинов и лимитированных предметов с итогом в VND и USDT." } }
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
      en: { description: "Season 15 – Season of Hell's Legacy: Diablo, Baal and Mephisto return. Fox House's Diablo 4 area is being prepared.", services: [] },
      tr: { id: { description: "Season 15 – Season of Hell's Legacy: Diablo, Baal, dan Mephisto kembali. Area Diablo 4 Fox House sedang disiapkan." }, fil: { description: "Season 15 – Season of Hell's Legacy: bumalik sina Diablo, Baal at Mephisto. Inihahanda pa ang Diablo 4 area ng Fox House." }, ru: { description: "Сезон 15 – Season of Hell's Legacy: возвращаются Диабло, Баал и Мефисто. Раздел Diablo 4 от Fox House готовится." } }
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
      en: { description: "Buying Divine Orbs and Mirrors of Kalandra, plus account boosting and item trading.", services: ["Divine/Mirror buying", "Boosting"] },
      tr: { id: { description: "Membeli Divine Orb dan Mirror of Kalandra, plus boosting akun dan jual beli item." }, fil: { description: "Bumibili ng Divine Orb at Mirror of Kalandra, kasama ang account boosting at item trading." }, ru: { description: "Скупка Divine Orb и Mirror of Kalandra, а также буст аккаунта и торговля предметами." } }
    },
    {
      id: "wow-forever",
      name: "WoW Forever",
      genre: "MMORPG",
      image: "assets/games/wow-forever.webp",
      hero: "assets/hero/wow-forever.webp",
      focus: "80% 50%",
      heroFocusMobile: "74% 50%",
      description: "Boosting WoW Forever cho người chơi quốc tế: cày cấp, dungeon, raid, nghề, PvP. Hỗ trợ qua Discord, giá thương lượng.",
      services: ["Booster"],
      url: "games/wow-forever/",
      en: { description: "WoW Forever boosting for international players: leveling, dungeons, raids, professions and PvP. Support on Discord, prices negotiable.", services: ["Boosting"] },
      tr: { id: { description: "Boosting WoW Forever untuk pemain internasional: leveling, dungeon, raid, profesi, dan PvP. Dukungan via Discord, harga bisa nego." }, fil: { description: "WoW Forever boosting para sa international players: leveling, dungeons, raids, professions at PvP. Suporta sa Discord, napag-uusapan ang presyo." }, ru: { description: "Буст в WoW Forever для игроков со всего мира: прокачка, подземелья, рейды, профессии и PvP. Поддержка в Discord, цена договорная." } }
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
      en: { title: "AION 2 maintenance on Nov 11 and new outfits", summary: "Global servers are down for 4.5 hours from 07:30 CET on November 11. NCSOFT also showcases a new set of outfits in the Daeva Lookbook." },
      tr: { id: { title: "Maintenance AION 2 pada 11 Nov dan kostum baru", summary: "Server Global maintenance selama 4,5 jam mulai pukul 07.30 CET pada 11 November. NCSOFT juga memamerkan kostum baru di Daeva Lookbook." }, fil: { title: "AION 2 maintenance sa Nob 11 at mga bagong outfit", summary: "Sarado ang Global servers nang 4.5 oras simula 07:30 CET sa Nobyembre 11. Ipinakita rin ng NCSOFT ang mga bagong outfit sa Daeva Lookbook." }, ru: { title: "AION 2: техработы 11 ноября и новые костюмы", summary: "Глобальные серверы закрыты на 4,5 часа с 07:30 CET 11 ноября. NCSOFT также показала новые костюмы в Daeva Lookbook." } }
    },
    {
      date: "2026-11-06",
      game: "poe-1",
      image: "assets/news/poe-1-covens-of-umbra.webp",
      title: "POE 1: league Covens of Umbra (3.30) mở ngày 13/11",
      summary: "League mới mở rạng sáng 14/11 giờ Việt Nam. Các hội phù thủy làm nghi lễ để triệu hồi nữ hoàng của chúng; endgame thay đổi lớn, cây Atlas Passive được làm lại và có thêm nhiều unique mới.",
      url: "https://www.pathofexile.com/covens",
      en: { title: "POE 1: Covens of Umbra (3.30) launches November 13", summary: "The new league starts on November 13 (PST). Covens perform wicked rituals to summon their queen, the endgame gets major changes, the Atlas Passive Tree is redesigned and new uniques arrive." },
      tr: { id: { title: "POE 1: Covens of Umbra (3.30) rilis 13 November", summary: "League baru dimulai 13 November (PST). Para Coven melakukan ritual untuk memanggil ratu mereka, endgame berubah besar, Atlas Passive Tree didesain ulang, dan unique baru hadir." }, fil: { title: "POE 1: Covens of Umbra (3.30) ilulunsad sa Nobyembre 13", summary: "Magsisimula ang bagong league sa Nobyembre 13 (PST). Nagsasagawa ng ritwal ang mga Coven para tawagin ang kanilang reyna, malaki ang pagbabago sa endgame, binago ang Atlas Passive Tree at may mga bagong unique." }, ru: { title: "POE 1: лига Covens of Umbra (3.30) стартует 13 ноября", summary: "Новая лига стартует 13 ноября (PST). Ковены проводят ритуалы, чтобы призвать свою королеву, эндгейм сильно меняется, дерево Atlas Passive переработано, появились новые уникальные предметы." } }
    },
    {
      date: "2026-11-04",
      game: "aion-2",
      image: "assets/news/aion-2-ludra.webp",
      title: "AION 2 mở raid Sanctuary \"Abyssal Forge: Ludra\"",
      summary: "Bản cập nhật ngày 4/11 thêm raid Ludra với hai độ khó: Normal (item level 2.800) và Hard (3.000), mỗi lượt giới hạn 1 giờ. Sự kiện điểm danh Ludra Awakens tặng Kinah và trang bị đến ngày 18/11.",
      url: "https://aion2.plaync.com/en-us/eventon/board/event_notice/view?articleId=50000049",
      en: { title: "AION 2 opens the \"Abyssal Forge: Ludra\" Sanctuary raid", summary: "The November 4 update adds the Ludra raid in Normal (item level 2,800) and Hard (3,000) difficulties, each run capped at 1 hour. The Ludra Awakens check-in event gives Kinah and gear until November 18." },
      tr: { id: { title: "AION 2 membuka raid Sanctuary \"Abyssal Forge: Ludra\"", summary: "Update 4 November menambah raid Ludra dalam mode Normal (item level 2.800) dan Hard (3.000), tiap run maksimal 1 jam. Event check-in Ludra Awakens memberi Kinah dan gear hingga 18 November." }, fil: { title: "Binuksan ng AION 2 ang Sanctuary raid na \"Abyssal Forge: Ludra\"", summary: "Idinagdag ng update noong Nobyembre 4 ang Ludra raid sa Normal (item level 2,800) at Hard (3,000), bawat run ay hanggang 1 oras. Nagbibigay ang Ludra Awakens check-in event ng Kinah at gear hanggang Nobyembre 18." }, ru: { title: "AION 2 открывает рейд Sanctuary «Abyssal Forge: Ludra»", summary: "Обновление 4 ноября добавило рейд Ludra в режимах Normal (уровень предметов 2800) и Hard (3000), каждое прохождение до 1 часа. Событие Ludra Awakens дарит Kinah и экипировку до 18 ноября." } }
    },
    {
      date: "2026-11-04",
      game: "wow-forever",
      image: "assets/news/wow-forever-live.webp",
      title: "World of Warcraft: Forever chính thức mở cửa",
      summary: "Máy chủ mở đồng loạt toàn cầu ngày 4/11: phiêu lưu đến cấp 60 trên các lục địa gốc, chọn ruleset thay cho realm. GeGe Team nhận boosting WoW Forever, liên hệ qua Discord.",
      url: "https://worldofwarcraft.blizzard.com/en-us/news/24315820/world-of-warcraft-forever-now-live",
      en: { title: "World of Warcraft: Forever is now live", summary: "Servers opened worldwide on November 4: adventure to level 60 across the original continents and pick a ruleset instead of a realm. GeGe Team offers WoW Forever boosting, contact us on Discord." },
      tr: { id: { title: "World of Warcraft: Forever resmi dibuka", summary: "Server dibuka serentak di seluruh dunia pada 4 November: bertualang hingga level 60 di benua asli dan pilih ruleset sebagai ganti realm. GeGe Team menerima boosting WoW Forever, hubungi kami di Discord." }, fil: { title: "Live na ang World of Warcraft: Forever", summary: "Sabay-sabay na nagbukas ang servers sa buong mundo noong Nobyembre 4: mag-adventure hanggang level 60 sa mga orihinal na kontinente at pumili ng ruleset sa halip na realm. Tumatanggap ang GeGe Team ng WoW Forever boosting, kontakin kami sa Discord." }, ru: { title: "World of Warcraft: Forever уже доступен", summary: "4 ноября серверы открылись по всему миру: путешествие до 60 уровня по оригинальным континентам и выбор набора правил вместо реалма. GeGe Team принимает заказы на буст WoW Forever — пишите в Discord." } }
    },
    {
      date: "2026-10-31",
      game: "blox-fruits",
      image: "assets/news/blox-fruits-halloween.webp",
      title: "Blox Fruits: sự kiện Halloween kéo dài đến 15/11",
      summary: "Sự kiện Halloween thêm Hellfire Gas, Candy Corn, săn bí ngô và raid boss Great Pumpkin. Có trái hoặc item muốn bán, xem bảng giá thu mua của Nhà Cáo.",
      url: "https://www.roblox.com/games/2753915549",
      en: { title: "Blox Fruits: Halloween event runs until November 15", summary: "The Halloween event adds Hellfire Gas, Candy Corn, a pumpkin hunt and the Great Pumpkin raid boss. Got fruits or items to sell? Check Fox House's buying price list." },
      tr: { id: { title: "Blox Fruits: event Halloween berlangsung hingga 15 November", summary: "Event Halloween menambah Hellfire Gas, Candy Corn, perburuan labu, dan raid boss Great Pumpkin. Punya buah atau item untuk dijual? Cek daftar harga beli Fox House." }, fil: { title: "Blox Fruits: Halloween event hanggang Nobyembre 15", summary: "May Hellfire Gas, Candy Corn, pumpkin hunt at Great Pumpkin raid boss ang Halloween event. May prutas o item na gustong ibenta? Tingnan ang buying price list ng Fox House." }, ru: { title: "Blox Fruits: событие Halloween до 15 ноября", summary: "В событии Halloween появились Hellfire Gas, Candy Corn, охота на тыквы и рейд-босс Great Pumpkin. Есть фрукты или предметы на продажу? Загляните в прайс скупки Fox House." } }
    }
  ],

  community: [
    { name: "Zalo Admin", detail: "Hỗ trợ và giao dịch · 0936 854 505", en: { detail: "Support and trading · 0936 854 505" }, tr: { id: { detail: "Dukungan dan transaksi · 0936 854 505" }, fil: { detail: "Suporta at trading · 0936 854 505" }, ru: { detail: "Поддержка и сделки · 0936 854 505" } }, url: "https://zalo.me/0936854505", icon: "zalo", card: false },
    { name: "Nhóm Zalo", detail: "Tin nhanh và thông báo trong ngày", en: { detail: "Quick news and daily announcements" }, tr: { id: { detail: "Berita cepat dan pengumuman harian" }, fil: { detail: "Mabilis na balita at araw-araw na anunsyo" }, ru: { detail: "Быстрые новости и объявления дня" } }, url: "https://zalo.me/g/kmxfzujpa7akgrijn5hk", icon: "zalo" },
    { name: "Fanpage GeGe Team", detail: "Tin tức và sự kiện chính thức", en: { detail: "Official news and events" }, tr: { id: { detail: "Berita dan event resmi" }, fil: { detail: "Opisyal na balita at event" }, ru: { detail: "Официальные новости и события" } }, url: "https://www.facebook.com/GegeTeam.net/", icon: "facebook" },
    { name: "Group Facebook", detail: "Giao lưu, hỏi đáp và tìm đội", en: { detail: "Chat, Q&A and finding parties" }, tr: { id: { detail: "Ngobrol, tanya jawab, dan cari party" }, fil: { detail: "Kuwentuhan, Q&A at paghahanap ng party" }, ru: { detail: "Общение, вопросы и поиск группы" } }, url: "https://www.facebook.com/groups/457999664580741", icon: "facebook" },
    { name: "Discord", detail: "Kênh thoại, thảo luận và tìm đội", en: { detail: "Voice chat, discussion and finding parties" }, tr: { id: { detail: "Voice chat, diskusi, dan cari party" }, fil: { detail: "Voice chat, talakayan at paghahanap ng party" }, ru: { detail: "Голосовой чат, обсуждения и поиск группы" } }, url: "https://discord.gg/XN8j8yVnV", icon: "discord" },
    { name: "Trang liên kết", detail: "gegeteam.xyz", url: "https://gegeteam.xyz/", icon: "link" }
  ]
};
