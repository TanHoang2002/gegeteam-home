(function () {
  "use strict";

  var NEWS_SIDE_SIZE = 4;
  var ALL = "all";
  var data = window.GEGE_DATA;

  /* Game hiện đúng thứ tự trong data.js (đổi vị trí game bằng cách đổi thứ tự ở đó) */
  var games = data.games.slice();
  /* Tin tự động (js/news-auto.js, cập nhật bởi GitHub Actions) chỉ hiện khi mới hơn tin đăng tay
     mới nhất của cùng game; tin đăng tay (có bản dịch) luôn được ưu tiên */
  var latestManual = {};
  var manualUrls = {};
  data.news.forEach(function (n) {
    if (n.game && (!latestManual[n.game] || n.date > latestManual[n.game])) latestManual[n.game] = n.date;
    if (n.url) manualUrls[n.url] = true;
  });
  var autoNews = (window.GEGE_NEWS_AUTO || []).filter(function (n) {
    return n && n.date && !manualUrls[n.url] && !(n.game && latestManual[n.game] && n.date <= latestManual[n.game]);
  });
  var news = data.news.concat(autoNews).sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  var state = { query: "", game: ALL, newsAll: false, lang: "en", auto: true };

  var STRINGS = {
    vi: {
      skip: "Đến danh mục game", navLabel: "Điều hướng chính", heroLabel: "Nổi bật",
      navNews: "Tin tức", navGames: "Game của chúng tôi", navAbout: "Dịch vụ", navCommunity: "Cộng đồng", footerGames: "Game",
      menuLogin: "Đăng nhập", menuRegister: "Đăng ký", menuFind: "Tìm game", menuZalo: "Liên hệ Discord", menuSettings: "Cài đặt",
      newsTitle: "Cập nhật mới nhất", gamesTitle: "Trò chơi của chúng tôi", aboutTitle: "Dịch vụ của Nhà Cáo",
      communityTitle: "Vào team cùng anh em", communityLead: "Tin nhanh, hỏi đáp, tìm đội và hỗ trợ giao dịch. Chọn kênh bạn quen dùng nhất.",
      searchPh: "Tìm theo tên game", genreLabel: "Lọc theo game", gameEmpty: "Không có game phù hợp. Thử từ khóa khác hoặc chọn \"Tất cả\".",
      prevGame: "Game trước", nextGame: "Game sau", gameList: "Danh sách game",
      aboutCommunity: "Cộng đồng", aboutCommunityText: "Nơi anh em cập nhật tin game, trao đổi, thảo luận và cùng chơi qua Zalo, Facebook, Discord.",
      aboutCommunityList: "Tin game mỗi ngày|Hỏi đáp, chia sẻ kinh nghiệm|Tìm đội, tuyển thành viên",
      aboutBuy: "Thu mua", aboutBuyText: "Thu mua gold và item trong game, có bảng giá riêng cho từng game.",
      aboutBuyList: "AION 2: Kinah|POE 1: Divine Orb, Mirror|Blox Fruits: trái, skin, item limited",
      aboutBoost: "Booster", aboutBoostText: "Nhận làm đơn theo yêu cầu ở những game có mở dịch vụ, trao đổi trực tiếp với admin.",
      aboutBoostList: "AION 2|POE 1|WoW Forever",
      brandTag: "GeGe Team · Nhà Cáo", footerTag: "Nhà Cáo · Cộng đồng và giao dịch game", legal: "Tên và hình ảnh game thuộc về nhà phát hành tương ứng.",
      footerAbout: "Cộng đồng game thủ và đội giao dịch game Việt Nam: tin tức, thu mua và booster cho các game anh em đang chơi.",
      footerGamesTitle: "Game", footerExplore: "Khám phá", footerContact: "Liên hệ", footerHours: "Hỗ trợ qua Discord mỗi ngày", backTop: "Lên đầu trang",
      soonText: "Website riêng của game này sắp ra mắt. Trong lúc chờ, bạn có thể liên hệ admin để được hỗ trợ.",
      accountText: "Tài khoản thành viên chưa mở. Hiện tại bạn không cần đăng nhập để xem tin và bảng giá. Cần hỗ trợ thì liên hệ admin qua Discord.",
      zaloFull: "Liên hệ qua Discord", close: "Đóng", setLang: "Ngôn ngữ", setAuto: "Tự chuyển slide ở đầu trang",
      all: "Tất cả", visit: "Vào trang", soon: "Sắp ra mắt", watch: "Xem ngay", viewAll: "Xem tất cả", collapse: "Thu gọn",
      servicesLead: "Thu mua và booster — hai mảng dịch vụ cốt lõi của Nhà Cáo, phục vụ anh em mỗi ngày.",
      gamesLead: "Mỗi thẻ game là một trang dịch vụ — bấm vào thẻ để xem bảng giá thu mua, booster và tin tức của game đó.",
      svcBuyTag: "Thu mua", svcBoostTag: "Booster", gameCta: "Xem dịch vụ",
      navWhy: "Vì sao chọn chúng tôi", whyTitle: "Tại sao chọn GeGeTeam?", whyLead: "Tiến độ của bạn. Ưu tiên của chúng tôi.",
      whyPositive: "Đánh giá tốt trên G2G trong 90 ngày qua", whyNegative: "Đánh giá xấu (38/43,8k đơn)",
      why1Title: "Giao hàng nhanh, thanh toán ngay", why1Text: "Dịch vụ nhanh chóng, hiệu quả; thanh toán ngay sau khi hoàn tất thành công.",
      why2Title: "Ưu tiên an toàn & bảo mật", why2Text: "An toàn tài khoản và thông tin cá nhân đặt lên hàng đầu; thông tin khu vực, tài khoản được giữ bí mật.",
      why3Title: "Phục vụ khách hàng toàn cầu", why3Text: "Dù bạn ở đâu, chúng tôi luôn sẵn sàng hỗ trợ, linh hoạt theo từng khu vực và yêu cầu.",
      why4Title: "Dịch vụ linh hoạt cho mọi nhu cầu", why4Text: "Từ đơn ngắn hạn đến dài hạn, nhỏ lẻ đến quy mô lớn — luôn có giải pháp hợp nhu cầu và ngân sách.",
      whyNote: "Hỗ trợ tận tình kể cả khi bạn chưa mua hàng · Dịch vụ chuyên nghiệp, đúng như mô tả.",
      whyStory1: "Nhà Cáo quy tụ anh em game thủ chuyên nghiệp để giúp bạn tận hưởng trọn vẹn tựa game mình yêu. Chúng tôi nói ngôn ngữ của bạn và hiểu rằng game không chỉ là sở thích — đó là đam mê.",
      whyStory2: "Mỗi cột mốc bạn đạt được trong game cũng là lý do chúng tôi lớn lên. GeGeTeam ở đây để giúp bạn đi xa hơn, nhanh hơn và an toàn hơn.",
      whyGiantWord: "đánh giá tốt", whyGiantSub: "trên G2G · 90 ngày qua",
      whyS1: "Đơn hàng hoàn tất", whyS2: "Đánh giá tốt (G2G)", whyS3: "Khách hàng hài lòng (G2G)", whyS4: "Hỗ trợ mỗi ngày",
      svcQuote: "Báo giá thu mua qua admin", svcRecruit: "Ứng tuyển làm booster",
      svcBuyMeta: "Thanh toán USDT / VND ngay sau giao dịch", svcBoostMeta: "Báo giá trước khi làm · screenshot tiến độ",
      navRecruit: "Tuyển dụng", recruitTitle: "Tuyển dụng Nhà Cáo",
      recruitLead: "Team đang mở rộng — tìm anh em cùng làm, cùng chơi, cùng kiếm tiền từ game.",
      recruit1Title: "Booster (cày thuê)", recruit1Text: "Nhận đơn cày cấp, dungeon, raid, PvP theo game bạn thạo. Chủ động thời gian, chia sẻ doanh thu rõ ràng.",
      recruit2Title: "Support & trực đơn", recruit2Text: "Trực Discord/Zalo, báo giá và chăm sóc khách. Ca linh hoạt, đào tạo từ đầu.",
      recruitApply: "Ứng tuyển", recruitNote: "Ứng tuyển qua Discord admin — phản hồi trong 24 giờ."
    },
    en: {
      skip: "Skip to games", navLabel: "Main navigation", heroLabel: "Highlights",
      navNews: "News", navGames: "Our games", navAbout: "Services", navCommunity: "Community", footerGames: "Games",
      menuLogin: "Log in", menuRegister: "Sign up", menuFind: "Find a game", menuZalo: "Contact on Discord", menuSettings: "Settings",
      newsTitle: "Latest updates", gamesTitle: "Our games", aboutTitle: "Fox House services",
      communityTitle: "Join the team", communityLead: "Quick news, Q&A, finding parties and trading support. Pick the channel you use most.",
      searchPh: "Search by game name", genreLabel: "Filter by game", gameEmpty: "No matching games. Try another keyword or choose \"All\".",
      prevGame: "Previous game", nextGame: "Next game", gameList: "Game list",
      aboutCommunity: "Community", aboutCommunityText: "A place to catch up on game news, chat, discuss and play together through Zalo, Facebook and Discord.",
      aboutCommunityList: "Daily game news|Q&A and shared experience|Finding parties and recruiting",
      aboutBuy: "Buying", aboutBuyText: "We buy in-game gold and items, with a separate price list for each game.",
      aboutBuyList: "AION 2: Kinah|POE 1: Divine Orb, Mirror|Blox Fruits: fruits, skins, limited items",
      aboutBoost: "Booster", aboutBoostText: "Orders on request for games where the service is open. Talk directly with the admin.",
      aboutBoostList: "AION 2|POE 1|WoW Forever",
      brandTag: "GeGe Team · Fox House", footerTag: "Fox House · Gaming community and trading", legal: "Game names and images belong to their respective publishers.",
      footerAbout: "A Vietnamese gaming community and trading team: news, buying and boosting for the games we play.",
      footerGamesTitle: "Games", footerExplore: "Explore", footerContact: "Contact", footerHours: "Discord support every day", backTop: "Back to top",
      soonText: "This game's own website is coming soon. In the meantime, you can contact the admin for support.",
      accountText: "Member accounts are not open yet. You don't need to log in to read news and price lists. For support, contact the admin on Discord.",
      zaloFull: "Contact on Discord", close: "Close", setLang: "Language", setAuto: "Auto-advance the top slides",
      all: "All", visit: "Open site", soon: "Coming soon", watch: "Watch now", viewAll: "View all", collapse: "Show less",
      servicesLead: "Buying and boosting — the two core services of Fox House, ready for you every day.",
      gamesLead: "Each game card is its own service page — tap a card for buying prices, boosting and news.",
      svcBuyTag: "Buying", svcBoostTag: "Booster", gameCta: "View services",
      navWhy: "Why us", whyTitle: "Why choose GeGeTeam?", whyLead: "Your progress. Our priority.",
      whyPositive: "Positive reviews on G2G in the last 90 days", whyNegative: "Negative reviews (38 of 43.8k orders)",
      why1Title: "Fast delivery, instant payment", why1Text: "Fast, efficient service — payment processed immediately upon successful completion.",
      why2Title: "Security & privacy first", why2Text: "Account security and personal data come first; region and account details stay strictly confidential.",
      why3Title: "Worldwide service coverage", why3Text: "Wherever you play from, we're ready to assist, adapting to every region and requirement.",
      why4Title: "Flexible services for everyone", why4Text: "From short sessions to long-term orders, small tasks to large scale — solutions tailored to your needs and budget.",
      whyNote: "Warm support even before you buy · Professional service, exactly as described.",
      whyStory1: "Fox House brings together seasoned professional gamers to help you fully enjoy the games you love. We speak your language and know gaming is more than a hobby — it's a passion.",
      whyStory2: "Every milestone you reach in game is why we grow. GeGeTeam is here to help you go further, faster and safer.",
      whyGiantWord: "positive", whyGiantSub: "on G2G · last 90 days",
      whyS1: "Completed orders", whyS2: "Positive reviews (G2G)", whyS3: "Happy customers (G2G)", whyS4: "Daily support",
      svcQuote: "Get a buying quote from admin", svcRecruit: "Apply as a booster",
      svcBuyMeta: "Paid in USDT / VND right after the trade", svcBoostMeta: "Quote before start · progress screenshots",
      navRecruit: "Careers", recruitTitle: "Join the Fox House team",
      recruitLead: "We're expanding — looking for people to work, play and earn from games together.",
      recruit1Title: "Booster", recruit1Text: "Take leveling, dungeon, raid and PvP orders in games you master. Flexible hours, transparent revenue share.",
      recruit2Title: "Support & order desk", recruit2Text: "Staff Discord/Zalo, quote prices and care for customers. Flexible shifts, training provided.",
      recruitApply: "Apply", recruitNote: "Apply via admin Discord — reply within 24 hours."
    },
    id: {
      skip: "Lewati ke daftar game", navLabel: "Navigasi utama", heroLabel: "Sorotan",
      navNews: "Berita", navGames: "Game kami", navAbout: "Layanan", navCommunity: "Komunitas", footerGames: "Game",
      menuLogin: "Masuk", menuRegister: "Daftar", menuFind: "Cari game", menuZalo: "Hubungi via Discord", menuSettings: "Pengaturan",
      newsTitle: "Kabar terbaru", gamesTitle: "Game kami", aboutTitle: "Layanan Fox House",
      communityTitle: "Gabung bersama tim", communityLead: "Berita cepat, tanya jawab, cari party, dan bantuan transaksi. Pilih saluran yang paling sering kamu pakai.",
      searchPh: "Cari nama game", genreLabel: "Filter berdasarkan game", gameEmpty: "Tidak ada game yang cocok. Coba kata kunci lain atau pilih \"Semua\".",
      prevGame: "Game sebelumnya", nextGame: "Game berikutnya", gameList: "Daftar game",
      aboutCommunity: "Komunitas", aboutCommunityText: "Tempat mengikuti berita game, mengobrol, berdiskusi, dan bermain bersama lewat Zalo, Facebook, dan Discord.",
      aboutCommunityList: "Berita game setiap hari|Tanya jawab dan berbagi pengalaman|Cari party dan rekrut anggota",
      aboutBuy: "Pembelian", aboutBuyText: "Kami membeli gold dan item dalam game, dengan daftar harga terpisah untuk setiap game.",
      aboutBuyList: "AION 2: Kinah|POE 1: Divine Orb, Mirror|Blox Fruits: buah, skin, item limited",
      aboutBoost: "Booster", aboutBoostText: "Pesanan sesuai permintaan untuk game yang layanannya dibuka. Bicara langsung dengan admin.",
      aboutBoostList: "AION 2|POE 1|WoW Forever",
      footerTag: "Fox House · Komunitas dan jual beli game", legal: "Nama dan gambar game adalah milik penerbit masing-masing.",
      footerAbout: "Komunitas gamer dan tim jual beli game asal Vietnam: berita, pembelian, dan boosting untuk game yang kami mainkan.",
      footerGamesTitle: "Game", footerExplore: "Jelajahi", footerContact: "Kontak", footerHours: "Dukungan Discord setiap hari", backTop: "Kembali ke atas",
      soonText: "Situs khusus game ini segera hadir. Sementara itu, kamu bisa menghubungi admin untuk bantuan.",
      accountText: "Akun anggota belum dibuka. Kamu tidak perlu masuk untuk membaca berita dan daftar harga. Untuk bantuan, hubungi admin via Discord.",
      zaloFull: "Hubungi via Discord", close: "Tutup", setLang: "Bahasa", setAuto: "Ganti slide atas otomatis",
      all: "Semua", visit: "Buka situs", soon: "Segera hadir", watch: "Lihat sekarang", viewAll: "Lihat semua", collapse: "Tampilkan lebih sedikit",
      servicesLead: "Pembelian dan boosting — dua layanan inti Fox House, siap setiap hari.",
      navWhy: "Mengapa kami", whyTitle: "Mengapa memilih GeGeTeam?", whyLead: "Progres kamu. Prioritas kami.",
      whyPositive: "Ulasan positif di G2G dalam 90 hari terakhir", whyNegative: "Ulasan negatif (38 dari 43,8rb pesanan)",
      why1Title: "Pengiriman cepat, bayar langsung", why1Text: "Layanan cepat dan efisien — pembayaran diproses segera setelah pesanan selesai.",
      why2Title: "Keamanan & privasi utama", why2Text: "Keamanan akun dan data pribadi diutamakan; info region dan akun dijaga ketat.",
      why3Title: "Melayani pelanggan global", why3Text: "Di mana pun kamu bermain, kami siap membantu, fleksibel mengikuti region dan kebutuhan.",
      why4Title: "Layanan fleksibel untuk semua", why4Text: "Dari pesanan singkat hingga jangka panjang, kecil hingga besar — selalu ada solusi sesuai kebutuhan dan budget.",
      whyNote: "Dukungan ramah bahkan sebelum kamu membeli · Layanan profesional, sesuai deskripsi.",
      whyStory1: "Fox House mengumpulkan gamer profesional berpengalaman agar kamu menikmati penuh game yang kamu cintai. Kami berbicara bahasamu dan paham game bukan sekadar hobi — ini passion.",
      whyStory2: "Setiap pencapaianmu dalam game adalah alasan kami bertumbuh. GeGeTeam hadir membantumu melangkah lebih jauh, lebih cepat, dan lebih aman.",
      whyGiantWord: "ulasan positif", whyGiantSub: "di G2G · 90 hari terakhir",
      whyS1: "Pesanan selesai", whyS2: "Ulasan positif (G2G)", whyS3: "Pelanggan puas (G2G)", whyS4: "Dukungan setiap hari",
      svcQuote: "Minta harga beli ke admin", svcRecruit: "Daftar jadi booster",
      svcBuyMeta: "Dibayar USDT / VND segera setelah transaksi", svcBoostMeta: "Harga sebelum mulai · screenshot progres",
      navRecruit: "Karier", recruitTitle: "Rekrutmen Fox House",
      recruitLead: "Tim sedang berkembang — cari rekan untuk kerja, main, dan hasilkan uang dari game bersama.",
      recruit1Title: "Booster", recruit1Text: "Ambil order leveling, dungeon, raid, PvP di game yang kamu kuasai. Jam fleksibel, bagi hasil transparan.",
      recruit2Title: "Support & jaga order", recruit2Text: "Jaga Discord/Zalo, beri harga dan rawat pelanggan. Shift fleksibel, ada pelatihan.",
      recruitApply: "Lamar", recruitNote: "Lamar lewat Discord admin — dibalas dalam 24 jam."
    },
    fil: {
      skip: "Pumunta sa mga laro", navLabel: "Pangunahing nabigasyon", heroLabel: "Mga tampok",
      navNews: "Balita", navGames: "Aming mga laro", navAbout: "Serbisyo", navCommunity: "Komunidad", footerGames: "Mga laro",
      menuLogin: "Mag-log in", menuRegister: "Mag-sign up", menuFind: "Maghanap ng laro", menuZalo: "Kontakin sa Discord", menuSettings: "Mga setting",
      newsTitle: "Pinakabagong balita", gamesTitle: "Aming mga laro", aboutTitle: "Mga serbisyo ng Fox House",
      communityTitle: "Sumali sa team", communityLead: "Mabilis na balita, Q&A, paghahanap ng party at tulong sa trading. Piliin ang channel na madalas mong gamitin.",
      searchPh: "Maghanap ayon sa pangalan ng laro", genreLabel: "I-filter ayon sa laro", gameEmpty: "Walang tugmang laro. Subukan ang ibang keyword o piliin ang \"Lahat\".",
      prevGame: "Nakaraang laro", nextGame: "Susunod na laro", gameList: "Listahan ng laro",
      aboutCommunity: "Komunidad", aboutCommunityText: "Lugar para sa balita ng laro, kuwentuhan, talakayan at sabay na paglalaro sa Zalo, Facebook at Discord.",
      aboutCommunityList: "Araw-araw na balita ng laro|Q&A at pagbabahagi ng karanasan|Paghahanap ng party at pag-recruit",
      aboutBuy: "Pagbili", aboutBuyText: "Bumibili kami ng in-game gold at item, may hiwalay na price list para sa bawat laro.",
      aboutBuyList: "AION 2: Kinah|POE 1: Divine Orb, Mirror|Blox Fruits: prutas, skin, limited item",
      aboutBoost: "Booster", aboutBoostText: "Mga order ayon sa hiling para sa mga larong bukas ang serbisyo. Direktang makipag-usap sa admin.",
      aboutBoostList: "AION 2|POE 1|WoW Forever",
      footerTag: "Fox House · Gaming community at trading", legal: "Ang mga pangalan at larawan ng laro ay pag-aari ng kani-kanilang publisher.",
      footerAbout: "Isang Vietnamese gaming community at trading team: balita, pagbili at boosting para sa mga larong nilalaro namin.",
      footerGamesTitle: "Mga laro", footerExplore: "Tuklasin", footerContact: "Kontak", footerHours: "Suporta sa Discord araw-araw", backTop: "Bumalik sa itaas",
      soonText: "Malapit nang ilunsad ang sariling website ng larong ito. Habang naghihintay, puwede mong kontakin ang admin para sa tulong.",
      accountText: "Hindi pa bukas ang member accounts. Hindi mo kailangang mag-log in para magbasa ng balita at price list. Para sa tulong, kontakin ang admin sa Discord.",
      zaloFull: "Kontakin sa Discord", close: "Isara", setLang: "Wika", setAuto: "Awtomatikong ilipat ang slide sa itaas",
      all: "Lahat", visit: "Buksan ang site", soon: "Malapit na", watch: "Panoorin", viewAll: "Tingnan lahat", collapse: "Ipakita nang mas kaunti",
      servicesLead: "Pagbili at boosting — dalawang pangunahing serbisyo ng Fox House, araw-araw.",
      navWhy: "Bakit kami", whyTitle: "Bakit piliin ang GeGeTeam?", whyLead: "Ang progress mo. Priority namin.",
      whyPositive: "Positibong review sa G2G sa huling 90 araw", whyNegative: "Negatibong review (38 sa 43.8k order)",
      why1Title: "Mabilis na delivery, instant na bayad", why1Text: "Mabilis at efficient na serbisyo — bayad agad pagkatapos matagumpay na makumpleto.",
      why2Title: "Seguridad at privacy muna", why2Text: "Una ang seguridad ng account at personal na data; striktong kumpidensyal ang region at account info.",
      why3Title: "Serbisyong worldwide", why3Text: "Saan ka man maglaro, ready kaming tumulong, flexible sa bawat region at requirement.",
      why4Title: "Flexible na serbisyo para sa lahat", why4Text: "Mula short session hanggang long-term, maliit hanggang malaking order — laging may solusyon sa needs at budget mo.",
      whyNote: "Mainit na suporta kahit bago ka bumili · Propesyonal na serbisyo, exactly as described.",
      whyStory1: "Pinagsasama ng Fox House ang mga seasoned professional gamer para lubos mong ma-enjoy ang mga larong mahal mo. Nagsasalita kami ng wika mo at alam naming higit sa hobby ang gaming — passion ito.",
      whyStory2: "Bawat milestone mo sa laro ang dahilan ng paglago namin. Nandito ang GeGeTeam para tulungan kang umabot sa mas malayo, mas mabilis, at mas ligtas.",
      whyGiantWord: "positibong review", whyGiantSub: "sa G2G · huling 90 araw",
      whyS1: "Natapos na order", whyS2: "Positibong review (G2G)", whyS3: "Nasiyahan na customer (G2G)", whyS4: "Suporta araw-araw",
      svcQuote: "Kumuha ng buying quote sa admin", svcRecruit: "Mag-apply bilang booster",
      svcBuyMeta: "Bayad sa USDT / VND agad pagkatapos ng trade", svcBoostMeta: "Quote bago magsimula · screenshot ng progress",
      navRecruit: "Karera", recruitTitle: "Sumali sa team ng Fox House",
      recruitLead: "Lumalawak kami — naghahanap ng kasama sa trabaho, laro, at kita mula sa games.",
      recruit1Title: "Booster", recruit1Text: "Kumuha ng order sa leveling, dungeon, raid, PvP sa mga larong master mo. Flexible na oras, malinaw na hatian.",
      recruit2Title: "Support & order desk", recruit2Text: "Bantay sa Discord/Zalo, mag-quote at alagaan ang customer. Flexible shift, may training.",
      recruitApply: "Mag-apply", recruitNote: "Mag-apply sa admin Discord — sagot sa loob ng 24 oras."
    },
    ru: {
      skip: "К списку игр",
      navLabel: "Главное меню",
      heroLabel: "Главное",
      navNews: "Новости",
      navGames: "Наши игры",
      navAbout: "Услуги",
      navCommunity: "Сообщество",
      footerGames: "Игры",
      menuLogin: "Войти",
      menuRegister: "Регистрация",
      menuFind: "Найти игру",
      menuZalo: "Написать в Discord",
      menuSettings: "Настройки",
      newsTitle: "Последние новости",
      gamesTitle: "Наши игры",
      aboutTitle: "Услуги Fox House",
      communityTitle: "Присоединяйтесь к команде",
      communityLead: "Быстрые новости, вопросы и ответы, поиск группы и помощь со сделками. Выберите удобный канал.",
      searchPh: "Поиск по названию игры",
      genreLabel: "Фильтр по игре",
      gameEmpty: "Ничего не найдено. Попробуйте другое слово или выберите «Все».",
      prevGame: "Предыдущая игра",
      nextGame: "Следующая игра",
      gameList: "Список игр",
      aboutCommunity: "Сообщество",
      aboutCommunityText: "Место, где можно следить за игровыми новостями, общаться, обсуждать и играть вместе через Zalo, Facebook и Discord.",
      aboutCommunityList: "Игровые новости каждый день|Вопросы, ответы и обмен опытом|Поиск группы и набор участников",
      aboutBuy: "Скупка",
      aboutBuyText: "Покупаем игровое золото и предметы, с отдельным прайсом для каждой игры.",
      aboutBuyList: "AION 2: Kinah|POE 1: Divine Orb, Mirror|Blox Fruits: фрукты, скины, лимитированные предметы",
      aboutBoost: "Буст",
      aboutBoostText: "Заказы на буст в играх, где открыта услуга. Общение напрямую с админом.",
      aboutBoostList: "AION 2|POE 1|WoW Forever",
      footerTag: "Fox House · Игровое сообщество и сделки",
      legal: "Названия и изображения игр принадлежат их издателям.",
      footerAbout: "Вьетнамское игровое сообщество и команда по сделкам: новости, скупка и буст в играх, в которые мы играем.",
      footerGamesTitle: "Игры",
      footerExplore: "Разделы",
      footerContact: "Контакты",
      footerHours: "Поддержка в Discord каждый день",
      backTop: "Наверх",
      soonText: "Отдельный сайт этой игры скоро появится. Пока что вы можете обратиться к админу за помощью.",
      accountText: "Аккаунты участников пока не открыты. Для чтения новостей и прайсов вход не нужен. За помощью обращайтесь к админу в Discord.",
      zaloFull: "Написать в Discord",
      close: "Закрыть",
      setLang: "Язык",
      setAuto: "Автопрокрутка слайдов вверху",
      all: "Все",
      visit: "Открыть сайт",
      soon: "Скоро",
      watch: "Смотреть",
      viewAll: "Смотреть все",
      collapse: "Свернуть",
      servicesLead: "Скупка и буст — две основные услуги Fox House, каждый день для вас.",
      navWhy: "Почему мы", whyTitle: "Почему GeGeTeam?", whyLead: "Ваш прогресс. Наш приоритет.",
      whyPositive: "Положительных отзывов на G2G за 90 дней", whyNegative: "Отрицательных отзывов (38 из 43,8 тыс. заказов)",
      why1Title: "Быстрая доставка, мгновенная оплата", why1Text: "Быстрый и эффективный сервис — оплата сразу после успешного выполнения заказа.",
      why2Title: "Безопасность и приватность прежде всего", why2Text: "Безопасность аккаунта и личные данные — в приоритете; информация о регионе и аккаунте строго конфиденциальна.",
      why3Title: "Обслуживаем по всему миру", why3Text: "Где бы вы ни играли, мы готовы помочь, адаптируясь к любому региону и требованиям.",
      why4Title: "Гибкие услуги для всех", why4Text: "От коротких сессий до долгосрочных заказов, от мелких задач до крупных — решения под ваши задачи и бюджет.",
      whyNote: "Тёплая поддержка даже до покупки · Профессиональный сервис, точно как описано.",
      whyStory1: "Fox House объединяет опытных профессиональных геймеров, чтобы вы полностью наслаждались любимыми играми. Мы говорим на вашем языке и знаем: игры — больше чем хобби, это страсть.",
      whyStory2: "Каждое ваше достижение в игре — причина нашего роста. GeGeTeam помогает идти дальше, быстрее и безопаснее.",
      whyGiantWord: "положительных", whyGiantSub: "на G2G · за 90 дней",
      whyS1: "Завершённых заказов", whyS2: "Положительных отзывов (G2G)", whyS3: "Довольных клиентов (G2G)", whyS4: "Поддержка каждый день",
      svcQuote: "Запросить цену скупки у админа", svcRecruit: "Подать заявку на бустера",
      svcBuyMeta: "Оплата USDT / VND сразу после сделки", svcBoostMeta: "Цена до старта · скриншоты прогресса",
      navRecruit: "Вакансии", recruitTitle: "Команда Fox House набирает",
      recruitLead: "Мы растём — ищем тех, кто хочет работать, играть и зарабатывать на играх вместе.",
      recruit1Title: "Бустер", recruit1Text: "Заказы на прокачку, подземелья, рейды и PvP в играх, которые вы знаете. Гибкий график, прозрачное разделение дохода.",
      recruit2Title: "Поддержка и приём заказов", recruit2Text: "Дежурство в Discord/Zalo, цены и забота о клиентах. Гибкие смены, обучение с нуля.",
      recruitApply: "Откликнуться", recruitNote: "Отклик через Discord админа — ответ в течение 24 часов."
    }
  };
  var LANGS = ["en", "vi", "id", "fil", "ru"];

  function t(key) { return STRINGS[state.lang][key] || STRINGS.en[key] || key; }

  /* Nội dung data.js: tiếng Việt ở trường gốc, tiếng Anh trong "en", Indonesia/Philippines trong "tr.id"/"tr.fil".
     Thiếu bản dịch Indonesia/Philippines thì dùng tiếng Anh, thiếu tiếng Anh thì dùng tiếng Việt. */
  function loc(item, field) {
    if (state.lang === "vi") return item[field];
    var own = state.lang === "en" ? item.en : item.tr && item.tr[state.lang];
    if (own && own[field] !== undefined) return own[field];
    if (item.en && item.en[field] !== undefined) return item.en[field];
    return item[field];
  }

  function store(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* trình duyệt chặn lưu trữ */ } }
  function recall(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function $(id) { return document.getElementById(id); }

  /* Dựng phần tử bằng textContent để nội dung trong data.js không bị hiểu thành HTML. */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function normalize(text) {
    return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  }

  function formatDate(iso) {
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  function gameById(id) {
    return games.filter(function (g) { return g.id === id; })[0] || null;
  }

  function renderChips(container, options, active, onSelect) {
    container.textContent = "";
    options.forEach(function (option) {
      var chip = el("button", "chip", option.label);
      chip.type = "button";
      chip.setAttribute("aria-pressed", String(option.value === active));
      chip.addEventListener("click", function () { onSelect(option.value); });
      container.appendChild(chip);
    });
  }

  /* Mục dịch vụ trong trang game: thu mua (buy) và booster (boost); chưa có mục riêng thì mở trang game */
  var SVC_ANCHORS = {
    "aion-2": { buy: "#pricing", boost: "#boost" },
    "blox-fruits": { buy: "#bang-gia" },
    "poe-1": { buy: "#sell-divine" }
  };
  function svcTag(game, kind, label) {
    var a = el("a", "tag tag-svc", label);
    var hash = (SVC_ANCHORS[game.id] || {})[kind] || "";
    a.href = (game.url || "#") + hash;
    a.addEventListener("click", function (e) { e.stopPropagation(); });
    return a;
  }

  function gameCard(game) {
    /* Thẻ là khối thường; game có trang riêng thì phủ một liên kết toàn thẻ,
       nút Thu mua/Booster nằm trên và bấm được riêng (tránh <a> lồng <a>) */
    var card = el(game.url ? "div" : "button", "game-card");
    if (game.color) card.style.setProperty("--card-brand", game.color);
    if (game.url) {
      card.classList.add("has-link");
      var hit = el("a", "game-hit");
      hit.href = game.url;
      hit.setAttribute("aria-label", game.name);
      card.appendChild(hit);
    } else {
      card.type = "button";
      card.addEventListener("click", function () { openSoon(game); });
    }

    var art = el("div", "game-art");
    if (game.image) {
      var img = el("img");
      img.src = game.image;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      if (game.focus) img.style.objectPosition = game.focus;
      art.appendChild(img);
    } else {
      art.classList.add("game-art-blank");
      art.appendChild(el("span", "", game.name));
    }
    card.appendChild(art);

    var body = el("div", "game-body");
    if (!game.url) {
      var meta = el("div", "game-meta");
      meta.appendChild(el("span", "status", t("soon")));
      body.appendChild(meta);
    }
    body.appendChild(el("h3", "", game.name));
    body.appendChild(el("p", "", loc(game, "description")));
    /* Nhãn dịch vụ + nút "Xem dịch vụ": người chơi biết bấm vào đâu để tìm dịch vụ */
    var sv = game.svc || {};
    if (sv.buy || sv.boost) {
      var tags = el("div", "tags");
      if (sv.buy) tags.appendChild(svcTag(game, "buy", t("svcBuyTag")));
      if (sv.boost) tags.appendChild(svcTag(game, "boost", t("svcBoostTag")));
      body.appendChild(tags);
    }
    card.appendChild(body);
    return card;
  }

  function renderGames() {
    var query = normalize(state.query.trim());
    var visible = games.filter(function (g) {
      return (state.game === ALL || g.id === state.game) &&
        normalize(g.name).indexOf(query) !== -1;
    });

    var options = [{ value: ALL, label: t("all") }].concat(games.map(function (g) {
      return { value: g.id, label: g.name };
    }));
    renderChips($("genre-filters"), options, state.game, function (value) {
      state.game = value;
      renderGames();
    });

    var grid = $("game-grid");
    grid.textContent = "";
    visible.forEach(function (g) { grid.appendChild(gameCard(g)); });
    $("game-empty").hidden = visible.length > 0;
  }

  function newsThumb(item, className) {
    var game = item.game ? gameById(item.game) : null;
    var box = el("div", className);
    if (item.image || (game && game.image)) {
      var img = el("img");
      /* Tin có ảnh riêng thì dùng ảnh đó; không thì lấy ảnh game (tin lớn dùng ảnh hero độ phân giải cao) */
      img.src = item.image || (className === "feature-art" && game.hero ? game.hero : game.image);
      img.alt = "";
      img.loading = "lazy";
      box.appendChild(img);
    } else {
      box.classList.add("thumb-blank");
      var logo = el("img");
      logo.src = "assets/logo.webp";
      logo.alt = "";
      box.appendChild(logo);
    }
    return box;
  }

  function newsMeta(item) {
    var game = item.game ? gameById(item.game) : null;
    var meta = el("div", "news-meta");
    meta.appendChild(el("span", "badge", game ? game.name : "GeGe Team"));
    var time = el("time", "", formatDate(item.date));
    time.dateTime = item.date;
    meta.appendChild(time);
    return meta;
  }

  function newsTitle(item) {
    var title = el("h3");
    if (item.url) {
      var link = el("a", "", loc(item, "title"));
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener";
      title.appendChild(link);
    } else {
      title.textContent = loc(item, "title");
    }
    return title;
  }

  function featuredCard(item) {
    var card = el("article", "feature");
    var fg = item.game ? gameById(item.game) : null;
    if (fg && fg.color) card.style.setProperty("--card-brand", fg.color);
    card.appendChild(newsThumb(item, "feature-art"));
    card.appendChild(newsTitle(item));
    card.appendChild(el("p", "", loc(item, "summary")));
    card.appendChild(newsMeta(item));
    return card;
  }

  function sideCard(item) {
    var card = el("article", "side");
    var sg = item.game ? gameById(item.game) : null;
    if (sg && sg.color) card.style.setProperty("--card-brand", sg.color);
    var text = el("div", "side-text");
    text.appendChild(newsTitle(item));
    text.appendChild(newsMeta(item));
    card.appendChild(text);
    card.appendChild(newsThumb(item, "side-art"));
    return card;
  }

  function renderNews() {
    var featured = $("news-featured");
    var list = $("news-list");
    featured.textContent = "";
    list.textContent = "";
    if (!news.length) return;
    featured.appendChild(featuredCard(news[0]));
    var rest = news.slice(1);
    var shown = state.newsAll ? rest : rest.slice(0, NEWS_SIDE_SIZE);
    shown.forEach(function (n) { list.appendChild(sideCard(n)); });
    var more = $("news-more");
    more.hidden = rest.length <= NEWS_SIDE_SIZE;
    more.textContent = state.newsAll ? t("collapse") : t("viewAll");
  }

  /* Hero: giới thiệu lần lượt từng game (A–Z), sau đó là các tin mới nhất; nền là ảnh của game tương ứng. */
  var HERO_COUNT = 3;
  var HERO_ORDER = ["wow-forever", "blox-fruits", "news", "aion-2", "poe-1", "diablo-4"];
  var heroIndex = 0;
  var heroTimer = null;

  function heroSlide(item, i) {
    var game = item.game ? gameById(item.game) : null;
    var slide = el("div", "hero-slide");
    slide.id = "hero-slide-" + i;
    if (!item.isGame) slide.classList.add("hero-news");
    if (item.image || (game && game.image)) {
      var img = el("img", "hero-img");
      img.src = item.image || game.hero || game.image;
      img.alt = "";
      img.decoding = "async";
      if (i === 0) img.setAttribute("fetchpriority", "high");
      if (item.isGame && game.heroFocusMobile) img.style.setProperty("--focus-m", game.heroFocusMobile);
      if (item.isGame && game.heroFocus) img.style.setProperty("--focus-d", game.heroFocus);
      if (i > 0) img.loading = "lazy";
      /* Ảnh nằm trong khung riêng để hiệu ứng phóng to không tràn ra ngoài khung */
      var media = el("div", "hero-media");
      media.appendChild(img);
      slide.appendChild(media);
    } else {
      slide.classList.add("hero-plain");
    }
    var copy = el("div", "hero-copy");
    /* Tin có heroNoText: ảnh đã có chữ riêng, nên chỉ giữ nút mở tin (tiêu đề vẫn còn cho trình đọc màn hình) */
    if (item.heroNoText) slide.classList.add("hero-notext");
    copy.appendChild(el("p", "eyebrow", item.isGame ? t("brandTag") : (game ? game.name : "GeGe Team")));
    copy.appendChild(el(i === 0 ? "h1" : "h2", "hero-title", loc(item, "title")));
    copy.appendChild(el("p", "hero-text", loc(item, "summary")));
    var cta = el("a", "cta-pill");
    cta.href = item.url || (game ? "#games" : "#news");
    /* Slide game mở trang game ngay trong tab; slide tin mở bài ở tab mới */
    if (item.url && !item.isGame) { cta.target = "_blank"; cta.rel = "noopener"; }
    cta.appendChild(el("span", "cta-play", "▶"));
    cta.appendChild(el("span", "", item.isGame ? t(item.url ? "visit" : "soon") : t("watch")));
    copy.appendChild(cta);
    slide.appendChild(copy);
    return slide;
  }

  function showHero(i) {
    var slides = $("hero-slides").children;
    var dots = $("hero-dots").children;
    heroIndex = (i + slides.length) % slides.length;
    Array.prototype.forEach.call(slides, function (s, n) {
      s.classList.toggle("is-active", n === heroIndex);
      s.setAttribute("aria-hidden", String(n !== heroIndex));
    });
    Array.prototype.forEach.call(dots, function (d, n) {
      d.setAttribute("aria-pressed", String(n === heroIndex));
    });
  }

  function startHero() {
    stopHero();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!state.auto || $("hero-slides").children.length < 2) return;
    heroTimer = setInterval(function () { showHero(heroIndex + 1); }, 4500);
    /* Bật thanh tiến trình trên chấm slide đang hiện (CSS .hero.is-auto) */
    var hero = document.querySelector(".hero");
    if (hero) hero.classList.add("is-auto");
  }

  function stopHero() {
    if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
    var hero = document.querySelector(".hero");
    if (hero) hero.classList.remove("is-auto");
  }

  var heroBound = false;

  function renderHero() {
    var slides = $("hero-slides");
    var dots = $("hero-dots");
    slides.textContent = "";
    dots.textContent = "";
    var gameSlides = games.filter(function (g) { return g.hero || g.image; }).map(function (g) {
      return {
        isGame: true, game: g.id, url: g.url, title: g.name, summary: g.description,
        en: { title: g.name, summary: g.en && g.en.description },
        tr: g.tr && Object.keys(g.tr).reduce(function (out, l) {
          out[l] = { title: g.name, summary: g.tr[l].description };
          return out;
        }, {})
      };
    });
    /* Tin có hero: false vẫn hiện ở mục Tin tức nhưng không chạy ở đầu trang */
    var newsSlides = news.slice(0, HERO_COUNT).filter(function (n) { return n.hero !== false; });
    /* Thứ tự slide đầu trang: "news" là chỗ chèn các slide tin; game không có trong danh sách xếp cuối */
    var ordered = [];
    HERO_ORDER.forEach(function (key) {
      if (key === "news") ordered = ordered.concat(newsSlides);
      else gameSlides.forEach(function (g) { if (g.game === key) ordered.push(g); });
    });
    gameSlides.forEach(function (g) { if (HERO_ORDER.indexOf(g.game) < 0) ordered.push(g); });
    if (HERO_ORDER.indexOf("news") < 0) ordered = ordered.concat(newsSlides);
    ordered.forEach(function (n, i) {
      slides.appendChild(heroSlide(n, i));
      var dot = el("button", "dot");
      dot.type = "button";
      dot.setAttribute("aria-label", "Slide " + (i + 1));
      dot.addEventListener("click", function () { showHero(i); startHero(); });
      dots.appendChild(dot);
    });
    dots.hidden = slides.children.length < 2;
    showHero(0);
    startHero();
    if (heroBound) return;
    heroBound = true;
    var hero = document.querySelector(".hero");
    hero.addEventListener("mouseenter", stopHero);
    hero.addEventListener("mouseleave", startHero);
    hero.addEventListener("focusin", stopHero);
    hero.addEventListener("focusout", startHero);
  }

  var ICONS = {
    facebook: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
    discord: "M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.1 14.1 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
    link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
  };
  /* Đường nét (stroke) thay vì tô đặc */
  var STROKE_ICONS = { link: true };

  /* Logo nền tảng: SVG cho Facebook, Discord, liên kết; Zalo dùng chữ vì không có biểu tượng đơn sắc */
  function iconNode(name) {
    if (!ICONS[name]) return el("span", "icon-text", name === "zalo" ? "Zalo" : "");
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    if (STROKE_ICONS[name]) svg.setAttribute("class", "is-stroke");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", ICONS[name]);
    svg.appendChild(path);
    return svg;
  }

  function renderCommunity() {
    var grid = $("community-grid");
    grid.textContent = "";
    data.community.filter(function (c) { return c.card !== false; }).forEach(function (c) {
      var card = el(c.url ? "a" : "div", "community-card" + (c.icon ? " brand-" + c.icon : "") + (c.url ? "" : " is-off"));
      if (c.url) {
        card.href = c.url;
        card.target = "_blank";
        card.rel = "noopener";
      }
      var text = el("div", "community-text");
      text.appendChild(el("strong", "", loc(c, "name")));
      text.appendChild(el("span", "", loc(c, "detail")));
      card.appendChild(text);
      if (c.icon) {
        var mark = el("span", "community-icon");
        mark.appendChild(iconNode(c.icon));
        card.appendChild(mark);
      }
      grid.appendChild(card);
    });
  }

  /* Dịch vụ: hai thẻ Thu mua / Booster, mỗi thẻ liệt kê game (trang riêng) + nút liên hệ admin */
  var SVC_GAMES = { buy: ["blox-fruits", "poe-1", "aion-2"], boost: ["wow-forever", "poe-1", "aion-2"] };
  function adminUrl() {
    var a = data.community.filter(function (c) { return c.card === false && c.url; })[0];
    return a ? a.url : "https://discord.gg/t2fPyUPGY";
  }
  function svcLinks(id) {
    return SVC_GAMES[id].map(function (gid) {
      var g = gameById(gid);
      if (!g || !g.url) return null;
      var sv = loc(g, "svc");
      return { name: g.name, href: g.url, detail: sv && sv[id] };
    }).filter(Boolean);
  }
  function renderServices() {
    var box = $("svc-list");
    box.textContent = "";
    [["buy", "01", "aboutBuy", "aboutBuyText", "svcQuote"],
     ["boost", "02", "aboutBoost", "aboutBoostText", "svcRecruit"]].forEach(function (def) {
      var id = def[0];
      var card = el("article", "svc-card");
      var head = el("div", "svc-card-head");
      head.appendChild(el("span", "svc-num", def[1]));
      var titles = el("div", "svc-titles");
      titles.appendChild(el("strong", "", t(def[2])));
      titles.appendChild(el("small", "", t(def[3])));
      head.appendChild(titles);
      card.appendChild(head);
      card.appendChild(el("p", "svc-card-meta", t(id === "buy" ? "svcBuyMeta" : "svcBoostMeta")));
      var ul = el("ul", "svc-links");
      svcLinks(id).forEach(function (l) {
        var li = el("li");
        var a = el("a");
        a.href = l.href;
        var txt = el("span", "svc-link-text");
        txt.appendChild(el("strong", "", l.name));
        if (l.detail) txt.appendChild(el("small", "", l.detail));
        a.appendChild(txt);
        a.appendChild(el("span", "svc-link-tag", t("visit")));
        a.appendChild(el("span", "svc-arrow", "→"));
        li.appendChild(a);
        ul.appendChild(li);
      });
      card.appendChild(ul);
      var cta = el("a", "svc-cta", t(def[4]));
      cta.href = adminUrl();
      cta.target = "_blank";
      cta.rel = "noopener";
      cta.appendChild(el("span", "svc-arrow", "→"));
      card.appendChild(cta);
      box.appendChild(card);
    });
  }

  /* Danh sách gạch đầu dòng dưới từng mục "Chúng tôi làm gì", lấy từ chuỗi ngăn bởi dấu | */
  function renderAboutLists() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-list]"), function (ul) {
      ul.textContent = "";
      t(ul.getAttribute("data-list")).split("|").forEach(function (line) { ul.appendChild(el("li", "", line)); });
    });
  }

  function footerLink(label, href, external) {
    var li = el("li");
    var a = el("a", "", label);
    a.href = href;
    if (external) { a.target = "_blank"; a.rel = "noopener"; }
    li.appendChild(a);
    return li;
  }

  /* Chân trang: cột game lấy từ GAMES, cột liên hệ và nút mạng xã hội lấy từ COMMUNITY */
  function renderFooter() {
    var gameList = $("footer-games");
    gameList.textContent = "";
    games.forEach(function (g) {
      if (g.url) gameList.appendChild(footerLink(g.name, g.url));
      else gameList.appendChild(el("li", "is-off", g.name + " · " + t("soon")));
    });
    var contact = $("footer-contact");
    contact.textContent = "";
    data.community.forEach(function (c) {
      if (c.url) contact.appendChild(footerLink(loc(c, "name"), c.url, true));
    });
    var socials = $("footer-socials");
    socials.textContent = "";
    /* Mỗi nền tảng một nút: lấy mục đầu tiên có icon đó */
    var seen = {};
    data.community.filter(function (c) {
      if (!c.icon || !c.url || seen[c.icon]) return false;
      seen[c.icon] = true;
      return true;
    }).forEach(function (c) {
      var a = el("a", "social social-" + c.icon);
      a.href = c.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", c.name);
      a.title = c.name;
      a.appendChild(iconNode(c.icon));
      socials.appendChild(a);
    });
  }

  function openSoon(game) {
    $("soon-title").textContent = game.name;
    $("soon-dialog").showModal();
  }

  /* Chuỗi tĩnh trong index.html được gắn data-i18n, data-i18n-placeholder hoặc data-i18n-aria. */
  function applyStatic() {
    document.documentElement.lang = state.lang;
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-placeholder]"), function (n) { n.placeholder = t(n.getAttribute("data-i18n-placeholder")); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-aria]"), function (n) { n.setAttribute("aria-label", t(n.getAttribute("data-i18n-aria"))); });
    $("lang-label").textContent = {en:"EN", vi:"VI", id:"ID", fil:"PH", ru:"RU"}[state.lang];
    Array.prototype.forEach.call(document.querySelectorAll("#lang-panel [data-lang]"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === state.lang ? "true" : "false");
    });
    $("set-lang").value = state.lang;
    $("set-auto").checked = state.auto;
  }

  /* Hiện dần khi cuộn: quan sát các khối nội dung, vào khung hình thì thêm .in-view.
     Dùng translate (CSS) riêng nên không đè hiệu ứng hover của thẻ. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealObserver = ("IntersectionObserver" in window && !reduceMotion) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in-view"); revealObserver.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;

  function observeReveals() {
    if (!revealObserver) return;
    var nodes = document.querySelectorAll(".head-row, .filters, .feature, .side, .rec-card, .community-card, .game-card, .why-statement, .why-stat, .why-panel, .footer-top, .footer-cols");
    Array.prototype.forEach.call(nodes, function (n) {
      if (n.classList.contains("reveal") || n.classList.contains("in-view")) return;
      var idx = 0, sib = n;
      while ((sib = sib.previousElementSibling)) idx++;
      n.style.setProperty("--rd", Math.min(idx * 70, 350) + "ms");
      n.classList.add("reveal");
      revealObserver.observe(n);
    });
  }

  function renderAll() {
    renderHero();
    renderGames();
    renderNews();
    renderCommunity();
    renderAboutLists();
    renderFooter();
    observeReveals();
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    state.lang = lang;
    store("gege-lang", lang);
    applyStatic();
    renderAll();
  }

  /* Menu 3 gạch */
  var menuBtn = $("menu-btn");
  var menuPanel = $("menu-panel");

  function setMenu(open) {
    menuPanel.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
  }

  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setMenu(menuPanel.hidden);
  });
  document.addEventListener("click", function (e) {
    if (!menuPanel.hidden && !menuPanel.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menuPanel.hidden) { setMenu(false); menuBtn.focus(); }
  });

  menuPanel.addEventListener("click", function (e) {
    var item = e.target.closest(".menu-item");
    if (!item) return;
    setMenu(false);
    var action = item.getAttribute("data-action");
    if (action === "login" || action === "register") {
      $("account-title").textContent = t(action === "login" ? "menuLogin" : "menuRegister");
      $("account-dialog").showModal();
    } else if (action === "find") {
      $("games").scrollIntoView({ behavior: "smooth" });
      setTimeout(function () { $("game-search").focus({ preventScroll: true }); }, 500);
    } else if (action === "settings") {
      $("settings-dialog").showModal();
    }
  });

  /* Nút địa cầu mở danh sách 4 ngôn ngữ; chọn xong, bấm ra ngoài hoặc Esc thì đóng. */
  var langBtn = $("lang-btn");
  var langPanel = $("lang-panel");
  function setLangOpen(open) {
    langPanel.hidden = !open;
    langBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  langBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setMenu(false);
    setLangOpen(langPanel.hidden);
  });
  langPanel.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (!b) return;
    setLangOpen(false);
    setLang(b.getAttribute("data-lang"));
  });
  document.addEventListener("click", function (e) {
    if (!langPanel.hidden && !langPanel.contains(e.target)) setLangOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !langPanel.hidden) { setLangOpen(false); langBtn.focus(); }
  });
  $("set-lang").addEventListener("change", function (e) { setLang(e.target.value); });
  $("set-auto").addEventListener("change", function (e) {
    state.auto = e.target.checked;
    store("gege-auto", state.auto ? "1" : "0");
    if (state.auto) startHero(); else stopHero();
  });

  $("game-search").addEventListener("input", function (e) {
    state.query = e.target.value;
    renderGames();
  });
  $("news-more").addEventListener("click", function () {
    state.newsAll = !state.newsAll;
    renderNews();
  });
  /* Thanh menu trên cùng: thêm nền đen khi đã cuộn xuống */
  (function () {
    var bar = document.querySelector(".topbar");
    if (!bar) return;
    var ticking = false;
    function update() { ticking = false; bar.classList.toggle("is-scrolled", window.scrollY > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  })();

  function scrollGames(dir) {
    var box = $("game-grid");
    box.scrollBy({ left: dir * Math.max(280, box.clientWidth * 0.6), behavior: "smooth" });
  }
  $("games-prev").addEventListener("click", function () { scrollGames(-1); });
  $("games-next").addEventListener("click", function () { scrollGames(1); });

  Array.prototype.forEach.call(document.querySelectorAll("dialog"), function (dlg) {
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    Array.prototype.forEach.call(dlg.querySelectorAll("[data-close]"), function (b) {
      b.addEventListener("click", function () { dlg.close(); });
    });
  });
  $("year").textContent = new Date().getFullYear();

  var savedLang = recall("gege-lang");
  /* Mặc định tiếng Anh; người xem đã chọn ngôn ngữ thì nhớ lại lựa chọn đó. */
  state.lang = LANGS.indexOf(savedLang) !== -1 ? savedLang : "en";
  state.auto = recall("gege-auto") !== "0";

  applyStatic();
  renderAll();
})();
