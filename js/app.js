(function () {
  "use strict";

  var NEWS_PAGE_SIZE = 6;
  var ALL = "all";
  var data = window.GEGE_DATA;

  var games = data.games.slice().sort(function (a, b) {
    return a.name.localeCompare(b.name, "vi", { sensitivity: "base", numeric: true });
  });
  var news = data.news.slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  var state = { query: "", genre: ALL, newsGame: ALL, newsLimit: NEWS_PAGE_SIZE };

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
      art.appendChild(img);
    } else {
      art.classList.add("game-art-blank");
      art.appendChild(el("span", "", game.name));
    }
    card.appendChild(art);

    var body = el("div", "game-body");
    var meta = el("div", "game-meta");
    meta.appendChild(el("span", "", game.genre));
    meta.appendChild(el("span", game.url ? "status status-live" : "status", game.url ? "Vào trang" : "Sắp ra mắt"));
    body.appendChild(meta);
    body.appendChild(el("h3", "", game.name));
    body.appendChild(el("p", "", game.description));
    if (game.services.length) {
      var tags = el("div", "tags");
      game.services.forEach(function (s) { tags.appendChild(el("span", "tag", s)); });
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
    var options = [{ value: ALL, label: "Tất cả" }].concat(genres.map(function (g) {
      return { value: g, label: g };
    }));
    renderChips($("genre-filters"), options, state.genre, function (value) {
      state.genre = value;
      renderGames();
    });

    var grid = $("game-grid");
    grid.textContent = "";
    visible.forEach(function (g) { grid.appendChild(gameCard(g)); });
    $("game-count").textContent = visible.length + " game · xếp theo A–Z";
    $("game-empty").hidden = visible.length > 0;
  }

  function newsItem(item) {
    var game = item.game ? gameById(item.game) : null;
    var card = el("article", "news-card");
    var meta = el("div", "news-meta");
    var time = el("time", "", formatDate(item.date));
    time.dateTime = item.date;
    meta.appendChild(time);
    meta.appendChild(el("span", "tag", game ? game.name : "GeGe Team"));
    card.appendChild(meta);

    var title = el("h3");
    if (item.url) {
      var link = el("a", "", item.title);
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener";
      title.appendChild(link);
    } else {
      title.textContent = item.title;
    }
    card.appendChild(title);
    card.appendChild(el("p", "", item.summary));
    return card;
  }

  function renderNews() {
    var withNews = games.filter(function (g) {
      return news.some(function (n) { return n.game === g.id; });
    });
    var options = [{ value: ALL, label: "Tất cả" }].concat(withNews.map(function (g) {
      return { value: g.id, label: g.name };
    }));
    renderChips($("news-filters"), options, state.newsGame, function (value) {
      state.newsGame = value;
      state.newsLimit = NEWS_PAGE_SIZE;
      renderNews();
    });

    var matching = news.filter(function (n) {
      return state.newsGame === ALL || n.game === state.newsGame;
    });
    var list = $("news-list");
    list.textContent = "";
    matching.slice(0, state.newsLimit).forEach(function (n) { list.appendChild(newsItem(n)); });
    $("news-empty").hidden = matching.length > 0;
    $("news-more").hidden = matching.length <= state.newsLimit;
  }

  function renderCommunity() {
    var grid = $("community-grid");
    data.community.forEach(function (c) {
      var card = el(c.url ? "a" : "div", "community-card" + (c.primary ? " is-primary" : "") + (c.url ? "" : " is-off"));
      if (c.url) {
        card.href = c.url;
        card.target = "_blank";
        card.rel = "noopener";
      }
      card.appendChild(el("strong", "", c.name));
      card.appendChild(el("span", "", c.detail));
      grid.appendChild(card);
    });
  }

  function openSoon(game) {
    $("soon-title").textContent = game.name;
    $("soon-dialog").showModal();
  }

  $("game-search").addEventListener("input", function (e) {
    state.query = e.target.value;
    renderGames();
  });
  $("news-more").addEventListener("click", function () {
    state.newsLimit += NEWS_PAGE_SIZE;
    renderNews();
  });
  $("soon-close").addEventListener("click", function () { $("soon-dialog").close(); });
  $("soon-dialog").addEventListener("click", function (e) {
    if (e.target === this) this.close();
  });
  $("year").textContent = new Date().getFullYear();

  renderGames();
  renderNews();
  renderCommunity();
})();
