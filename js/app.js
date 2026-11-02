(function () {
  "use strict";

  var NEWS_SIDE_SIZE = 4;
  var ALL = "all";
  var data = window.GEGE_DATA;

  var games = data.games.slice().sort(function (a, b) {
    return a.name.localeCompare(b.name, "vi", { sensitivity: "base", numeric: true });
  });
  var news = data.news.slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  var state = { query: "", genre: ALL, newsAll: false, lang: "vi", auto: true };

  var STRINGS = {
    vi: {
      skip: "Đến danh mục game", navLabel: "Điều hướng chính", heroLabel: "Nổi bật",
      navNews: "Tin tức", navGames: "Game của chúng tôi", navAbout: "Dịch vụ", navCommunity: "Cộng đồng", footerGames: "Game",
      menuLogin: "Đăng nhập", menuRegister: "Đăng ký", menuFind: "Tìm game", menuZalo: "Liên hệ Zalo", menuSettings: "Cài đặt",
      newsTitle: "Chuyện gì đang xảy ra vậy?", gamesTitle: "Trò chơi của chúng tôi", aboutTitle: "Chúng tôi làm gì",
      communityTitle: "Vào team cùng anh em", communityLead: "Tin nhanh, hỏi đáp, tìm đội và hỗ trợ giao dịch. Chọn kênh bạn quen dùng nhất.",
      searchPh: "Tìm theo tên game", genreLabel: "Lọc theo thể loại", gameEmpty: "Không có game phù hợp. Thử từ khóa khác hoặc chọn \"Tất cả\".",
      prevGame: "Game trước", nextGame: "Game sau", gameList: "Danh sách game",
      aboutCommunity: "Cộng đồng", aboutCommunityText: "Nơi anh em cập nhật tin game, hỏi đáp, tìm đội và cùng chơi qua Zalo, Facebook.",
      aboutBuy: "Thu mua", aboutBuyText: "Thu mua gold và item trong game, có bảng giá riêng cho từng game và thanh toán bằng VND hoặc USDT tùy game.",
      aboutBoost: "Cày thuê", aboutBoostText: "Nhận cày thuê theo yêu cầu ở những game có mở dịch vụ, trao đổi trực tiếp với admin.",
      footerTag: "Nhà Cáo · Cộng đồng và giao dịch game", legal: "Tên và hình ảnh game thuộc về nhà phát hành tương ứng.",
      soonText: "Website riêng của game này sắp ra mắt. Trong lúc chờ, bạn có thể liên hệ admin để được hỗ trợ.",
      accountText: "Tài khoản thành viên chưa mở. Hiện tại bạn không cần đăng nhập để xem tin và bảng giá. Cần hỗ trợ thì liên hệ admin qua Zalo.",
      zaloFull: "Liên hệ qua Zalo", close: "Đóng", setLang: "Ngôn ngữ", setAuto: "Tự chuyển slide ở đầu trang",
      all: "Tất cả", visit: "Vào trang", soon: "Sắp ra mắt", watch: "Xem ngay", viewAll: "Xem tất cả", collapse: "Thu gọn"
    },
    en: {
      skip: "Skip to games", navLabel: "Main navigation", heroLabel: "Highlights",
      navNews: "News", navGames: "Our games", navAbout: "Services", navCommunity: "Community", footerGames: "Games",
      menuLogin: "Log in", menuRegister: "Sign up", menuFind: "Find a game", menuZalo: "Contact on Zalo", menuSettings: "Settings",
      newsTitle: "What's happening?", gamesTitle: "Our games", aboutTitle: "What we do",
      communityTitle: "Join the team", communityLead: "Quick news, Q&A, finding parties and trading support. Pick the channel you use most.",
      searchPh: "Search by game name", genreLabel: "Filter by genre", gameEmpty: "No matching games. Try another keyword or choose \"All\".",
      prevGame: "Previous game", nextGame: "Next game", gameList: "Game list",
      aboutCommunity: "Community", aboutCommunityText: "A place to catch up on game news, ask questions, find parties and play together through Zalo and Facebook.",
      aboutBuy: "Buying", aboutBuyText: "We buy in-game gold and items, with a separate price list for each game, paid in VND or USDT depending on the game.",
      aboutBoost: "Boosting", aboutBoostText: "Boosting on request for games where the service is open. Talk directly with the admin.",
      footerTag: "Nha Cao · Gaming community and trading", legal: "Game names and images belong to their respective publishers.",
      soonText: "This game's own website is coming soon. In the meantime, you can contact the admin for support.",
      accountText: "Member accounts are not open yet. You don't need to log in to read news and price lists. For support, contact the admin on Zalo.",
      zaloFull: "Contact on Zalo", close: "Close", setLang: "Language", setAuto: "Auto-advance the top slides",
      all: "All", visit: "Open site", soon: "Coming soon", watch: "Watch now", viewAll: "View all", collapse: "Show less"
    }
  };

  function t(key) { return STRINGS[state.lang][key] || STRINGS.vi[key] || key; }

  /* Nội dung tiếng Anh nằm trong trường "en" của từng mục trong data.js, thiếu thì dùng tiếng Việt. */
  function loc(item, field) {
    return (state.lang === "en" && item.en && item.en[field] !== undefined) ? item.en[field] : item[field];
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

  function gameCard(game) {
    var card = el(game.url ? "a" : "button", "game-card");
    if (game.url) {
      card.href = game.url;
      card.target = "_blank";
      card.rel = "noopener";
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
      if (game.focus) img.style.objectPosition = game.focus;
      art.appendChild(img);
    } else {
      art.classList.add("game-art-blank");
      art.appendChild(el("span", "", game.name));
    }
    card.appendChild(art);

    var body = el("div", "game-body");
    var meta = el("div", "game-meta");
    meta.appendChild(el("span", "", game.genre));
    meta.appendChild(el("span", game.url ? "status status-live" : "status", game.url ? t("visit") : t("soon")));
    body.appendChild(meta);
    body.appendChild(el("h3", "", game.name));
    body.appendChild(el("p", "", loc(game, "description")));
    var services = loc(game, "services");
    if (services.length) {
      var tags = el("div", "tags");
      services.forEach(function (s) { tags.appendChild(el("span", "tag", s)); });
      body.appendChild(tags);
    }
    card.appendChild(body);
    return card;
  }

  function renderGames() {
    var query = normalize(state.query.trim());
    var visible = games.filter(function (g) {
      return (state.genre === ALL || g.genre === state.genre) &&
        normalize(g.name).indexOf(query) !== -1;
    });

    var genres = games.map(function (g) { return g.genre; })
      .filter(function (g, i, list) { return list.indexOf(g) === i; })
      .sort(function (a, b) { return a.localeCompare(b, "vi"); });
    var options = [{ value: ALL, label: t("all") }].concat(genres.map(function (g) {
      return { value: g, label: g };
    }));
    renderChips($("genre-filters"), options, state.genre, function (value) {
      state.genre = value;
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
    if (game && game.image) {
      var img = el("img");
      img.src = game.image;
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
    card.appendChild(newsThumb(item, "feature-art"));
    card.appendChild(newsTitle(item));
    card.appendChild(el("p", "", loc(item, "summary")));
    card.appendChild(newsMeta(item));
    return card;
  }

  function sideCard(item) {
    var card = el("article", "side");
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

  /* Hero: trượt qua các tin mới nhất, nền là ảnh của game tương ứng. */
  var HERO_COUNT = 3;
  var heroIndex = 0;
  var heroTimer = null;

  function heroSlide(item, i) {
    var game = item.game ? gameById(item.game) : null;
    var slide = el("div", "hero-slide");
    slide.id = "hero-slide-" + i;
    if (game && game.image) {
      var img = el("img", "hero-img");
      img.src = game.image;
      img.alt = "";
      if (i > 0) img.loading = "lazy";
      slide.appendChild(img);
    } else {
      slide.classList.add("hero-plain");
    }
    var copy = el("div", "hero-copy");
    copy.appendChild(el("p", "eyebrow", game ? game.name : "GeGe Team"));
    copy.appendChild(el(i === 0 ? "h1" : "h2", "hero-title", loc(item, "title")));
    copy.appendChild(el("p", "hero-text", loc(item, "summary")));
    var cta = el("a", "cta-pill");
    cta.href = item.url || (game ? "#games" : "#news");
    if (item.url) { cta.target = "_blank"; cta.rel = "noopener"; }
    cta.appendChild(el("span", "cta-play", "▶"));
    cta.appendChild(el("span", "", t("watch")));
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
    heroTimer = setInterval(function () { showHero(heroIndex + 1); }, 7000);
  }

  function stopHero() { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } }

  var heroBound = false;

  function renderHero() {
    var slides = $("hero-slides");
    var dots = $("hero-dots");
    slides.textContent = "";
    dots.textContent = "";
    news.slice(0, HERO_COUNT).forEach(function (n, i) {
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

  function renderCommunity() {
    var grid = $("community-grid");
    grid.textContent = "";
    data.community.forEach(function (c) {
      var card = el(c.url ? "a" : "div", "community-card" + (c.primary ? " is-primary" : "") + (c.url ? "" : " is-off"));
      if (c.url) {
        card.href = c.url;
        card.target = "_blank";
        card.rel = "noopener";
      }
      card.appendChild(el("strong", "", c.name));
      card.appendChild(el("span", "", (state.lang === "en" && c.detailEn) || c.detail));
      grid.appendChild(card);
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
    $("lang-label").textContent = state.lang.toUpperCase();
    $("set-lang").value = state.lang;
    $("set-auto").checked = state.auto;
  }

  function renderAll() {
    renderHero();
    renderGames();
    renderNews();
    renderCommunity();
  }

  function setLang(lang) {
    if (lang !== "vi" && lang !== "en") return;
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

  $("lang-btn").addEventListener("click", function () { setLang(state.lang === "vi" ? "en" : "vi"); });
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
  if (savedLang === "vi" || savedLang === "en") state.lang = savedLang;
  else if ((navigator.language || "").toLowerCase().indexOf("vi") !== 0) state.lang = "en";
  state.auto = recall("gege-auto") !== "0";

  applyStatic();
  renderAll();
})();
