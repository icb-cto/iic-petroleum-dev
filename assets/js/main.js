/* IIC Oil & Gas — site behaviour (no dependencies) */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const OFFICE_EMAIL = "office@iicpetroleum.com";

  const ICON = {
    arrowUR: '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    arrowR: '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowL: '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    clock: '<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Hero background video ---------- */
  const heroVideo = $(".hero__video");
  const heroToggle = $("[data-hero-toggle]");
  if (heroVideo && heroToggle) {
    let userPaused = reduceMotion; // honour "reduce motion": start paused on the poster frame
    const sync = () => {
      heroToggle.classList.toggle("is-paused", heroVideo.paused);
      heroToggle.setAttribute("aria-pressed", String(heroVideo.paused));
      heroToggle.setAttribute("aria-label", heroVideo.paused ? "Play background video" : "Pause background video");
    };
    if (reduceMotion) { heroVideo.removeAttribute("autoplay"); heroVideo.pause(); }
    heroToggle.addEventListener("click", () => {
      if (heroVideo.paused) { userPaused = false; heroVideo.play().catch(() => {}); }
      else { userPaused = true; heroVideo.pause(); }
    });
    heroVideo.addEventListener("play", sync);
    heroVideo.addEventListener("pause", sync);
    // Save battery/CPU: pause while the hero is scrolled out of view
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) heroVideo.pause();
        else if (!userPaused) heroVideo.play().catch(() => {});
      }, { threshold: 0.1 }).observe(heroVideo);
    }
    sync();
  }

  /* ---------- About "20+" video fill (video drawn inside the letters on a canvas) ---------- */
  const figWrap = $(".about-big--video");
  if (figWrap) {
    const video = $(".about-big__video", figWrap);
    const canvas = $(".about-big__canvas", figWrap);
    const mask = $(".about-big__mask", figWrap);
    const ctx = canvas.getContext && canvas.getContext("2d");
    let raf = 0, visible = false, w = 0, h = 0, dpr = 1;

    const size = () => {
      const r = figWrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    };
    const draw = () => {
      if (!ctx || !w || video.readyState < 2) return false;
      const cs = getComputedStyle(mask);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#000";
      const m = ctx.measureText(mask.textContent);
      const top = (h - (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent)) / 2 + m.actualBoundingBoxAscent;
      ctx.fillText(mask.textContent, -m.actualBoundingBoxLeft + (w - (m.actualBoundingBoxLeft + m.actualBoundingBoxRight)) / 2, top);
      // keep only the video pixels that fall inside the letters (cover-fit)
      ctx.globalCompositeOperation = "source-in";
      const vr = video.videoWidth / video.videoHeight, br = w / h;
      const dw = vr > br ? h * vr : w, dh = vr > br ? h : w / vr;
      ctx.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);
      // optional darkening (data-darken="0..1"), applied only inside the letters
      const dark = parseFloat(figWrap.dataset.darken || 0);
      if (dark > 0) { ctx.globalCompositeOperation = "source-atop"; ctx.fillStyle = `rgba(20,20,22,${dark})`; ctx.fillRect(0, 0, w, h); }
      return true;
    };
    const loop = () => { if (draw()) figWrap.classList.add("is-filled"); if (visible && !video.paused) raf = requestAnimationFrame(loop); };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };

    if (ctx) {
      size();
      window.addEventListener("resize", () => { size(); draw(); }, { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { size(); draw(); });
      video.addEventListener("loadeddata", () => { if (draw()) figWrap.classList.add("is-filled"); });
      video.addEventListener("play", start);
      if (reduceMotion) { video.removeAttribute("autoplay"); video.pause(); }
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([en]) => {
          visible = en.isIntersecting;
          if (visible && !reduceMotion) { video.play().catch(() => {}); start(); } else video.pause();
        }, { threshold: 0.1 }).observe(figWrap);
      } else { visible = true; start(); }
    }
  }

  /* ---------- About "20+" / "VISION": video drawn inside the letters on a canvas ---------- */
  $$(".about-big--video").forEach((figWrap) => {
    const video = $(".about-big__video", figWrap);
    const canvas = $(".about-big__canvas", figWrap);
    const mask = $(".about-big__mask", figWrap);
    const ctx = canvas.getContext && canvas.getContext("2d");
    let raf = 0, visible = false, w = 0, h = 0, dpr = 1;

    const size = () => {
      const r = canvas.getBoundingClientRect(); // includes the 16px bleed on each side
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    };
    const draw = () => {
      if (!ctx || !w || video.readyState < 2) return false;
      const cs = getComputedStyle(mask);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#000";
      const text = cs.textTransform === "uppercase" ? mask.textContent.toUpperCase() : mask.textContent; // canvas ignores CSS text-transform
      if ("letterSpacing" in ctx) ctx.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
      let m = ctx.measureText(text);
      const tw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      if (tw > w - 8) { // never let the drawn word outgrow its box
        ctx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * ((w - 8) / tw)}px ${cs.fontFamily}`;
        m = ctx.measureText(text);
      }
      const top = (h - (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent)) / 2 + m.actualBoundingBoxAscent;
      ctx.fillText(text, -m.actualBoundingBoxLeft + (w - (m.actualBoundingBoxLeft + m.actualBoundingBoxRight)) / 2, top);
      // keep only the video pixels that fall inside the letters (cover-fit)
      ctx.globalCompositeOperation = "source-in";
      const vr = video.videoWidth / video.videoHeight, br = w / h;
      const dw = vr > br ? h * vr : w, dh = vr > br ? h : w / vr;
      ctx.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);
      // optional darkening (data-darken="0..1"), applied only inside the letters
      const dark = parseFloat(figWrap.dataset.darken || 0);
      if (dark > 0) { ctx.globalCompositeOperation = "source-atop"; ctx.fillStyle = `rgba(20,20,22,${dark})`; ctx.fillRect(0, 0, w, h); }
      return true;
    };
    const loop = () => { if (draw()) figWrap.classList.add("is-filled"); if (visible && !video.paused) raf = requestAnimationFrame(loop); };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };

    if (ctx) {
      size();
      window.addEventListener("resize", () => { size(); draw(); }, { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { size(); draw(); });
      video.addEventListener("loadeddata", () => { if (draw()) figWrap.classList.add("is-filled"); });
      video.addEventListener("play", start);
      if (reduceMotion) { video.removeAttribute("autoplay"); video.pause(); }
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([en]) => {
          visible = en.isIntersecting;
          if (visible && !reduceMotion) { video.play().catch(() => {}); start(); } else video.pause();
        }, { threshold: 0.1 }).observe(figWrap);
      } else { visible = true; start(); }
    }
  });

  /* ---------- Header: transparent over hero, solid once scrolled ---------- */
  const header = $("[data-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("nav--scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  const menu = $("#mobile-menu");
  const toggle = $(".nav__toggle");
  if (header && menu && toggle) {
    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      header.classList.toggle("nav--menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      open ? menu.removeAttribute("inert") : menu.setAttribute("inert", "");
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* On the home page, highlight the section link currently in view */
  const sectionLinks = $$('.nav__links a[href^="index.html#"], .nav__links a[href="index.html"]');
  if (sectionLinks.length && $(".hero") && "IntersectionObserver" in window) {
    const all = $$('.site-header a.nav__link[href^="index.html"]');
    const mark = (href) => all.forEach((l) => (l.getAttribute("href") === href ? l.setAttribute("aria-current", "page") : l.removeAttribute("aria-current")));
    const map = { about: "index.html#about", services: "index.html#services", contact: "index.html#contact" };
    const hero = $(".hero");
    const sections = $$("main > section, main > div");
    const io = new IntersectionObserver((ens) => {
      ens.forEach((en) => {
        if (!en.isIntersecting) return;
        mark(en.target === hero ? "index.html" : map[en.target.id] || null);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((t) => io.observe(t));
  }

  /* ---------- Reveal on scroll ---------- */
  function observeReveals(root = document) {
    const els = $$(".reveal:not(.is-in)", root);
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = (el.dataset.delay || 0) + "ms";
      io.observe(el);
    });
  }
  observeReveals();

  /* ---------- Accordion ---------- */
  $$("[data-accordion]").forEach((acc) => {
    const items = $$(".acc__item", acc);
    items.forEach((item) => {
      const btn = $(".acc__btn", item);
      btn.addEventListener("click", () => {
        const wasOpen = item.classList.contains("is-open");
        items.forEach((it) => {
          it.classList.remove("is-open");
          $(".acc__btn", it).setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  });

  /* ---------- Services slider ---------- */
  const slider = $("[data-slider]");
  if (slider) {
    const slides = $$(".slide", slider);
    const data = JSON.parse($("#services-data").textContent);
    const text = $(".services__text", slider);
    const count = $("[data-count]", slider);
    const bar = $(".progress span", slider);
    let idx = 0;
    let timer;
    const pad = (n) => String(n).padStart(2, "0");

    const render = (i) => {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => {
        s.classList.toggle("is-active", k === idx);
        s.setAttribute("aria-hidden", k === idx ? "false" : "true");
      });
      const d = data[idx];
      text.removeAttribute("data-anim");
      void text.offsetWidth; // restart animation
      text.setAttribute("data-anim", "");
      text.innerHTML = `
        <h3>${d.title}</h3>
        <p>${d.text}</p>
        <ul aria-label="Scope">${d.tags.map((t) => `<li>${t}</li>`).join("")}</ul>`;
      count.innerHTML = `(${pad(idx + 1)}<span class="soft">/${pad(slides.length)}</span>)`;
      bar.style.width = ((idx + 1) / slides.length) * 100 + "%";
    };
    const start = () => {
      if (reduceMotion) return;
      stop();
      timer = setInterval(() => render(idx + 1), 7000);
    };
    const stop = () => clearInterval(timer);

    $("[data-prev]", slider).addEventListener("click", () => { render(idx - 1); start(); });
    $("[data-next]", slider).addEventListener("click", () => { render(idx + 1); start(); });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { render(idx + 1); }
      if (e.key === "ArrowLeft") { render(idx - 1); }
    });
    render(0);
    start();
  }

  /* ---------- News helpers ---------- */
  const NEWS = (window.IIC_NEWS || []).slice().sort((a, b) => b.date.localeCompare(a.date));
  const fmtDate = (iso) =>
    new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const url = (a) => `article.html?slug=${encodeURIComponent(a.slug)}`;

  function cardHTML(a, feature = false, delay = 0, reveal = true) {
    return `
      <article class="news-card ${feature ? "news-card--feature" : ""} ${reveal ? "reveal" : ""}" data-delay="${delay}">
        <div class="news-card__media">
          <img src="${a.image}" alt="${esc(a.imageAlt || "")}" loading="${feature ? "eager" : "lazy"}" width="1400" height="875">
          ${feature && a.video && a.video.preview && !reduceMotion ? `
          <video class="news-card__video" src="${a.video.preview}" poster="${a.video.previewPoster || a.video.poster || a.image}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video>
          <button type="button" class="news-card__vidtoggle" data-vidtoggle aria-pressed="false" aria-label="Pause preview video">
            <svg class="icon icon--sm vt-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>
            <svg class="icon icon--sm vt-play" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>
          </button>` : ""}
          ${a.video ? `<span class="news-card__badge"><svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>Video${a.video.duration ? " · " + esc(a.video.duration) : ""}</span>` : ""}
        </div>
        <div class="news-card__body">
          <div class="news-card__meta">
            <span class="chip">${esc(a.category)}</span>
            <time datetime="${a.date}">${fmtDate(a.date)}</time>
          </div>
          <h3><a href="${url(a)}">${esc(a.title)}</a></h3>
          <p>${esc(a.excerpt)}</p>
          <div class="news-card__foot">
            <span style="display:inline-flex;gap:6px;align-items:center">${ICON.clock} ${a.readMins} min read</span>
            <span class="go" aria-hidden="true">${ICON.arrowUR}</span>
          </div>
        </div>
      </article>`;
  }
  // Featured-card preview videos: pause button, and pause while off-screen
  function wirePreviews(root) {
    $$(".news-card__video", root).forEach((v) => {
      const btn = v.parentElement.querySelector("[data-vidtoggle]");
      let userPaused = false;
      const sync = () => {
        btn.setAttribute("aria-pressed", String(v.paused));
        btn.setAttribute("aria-label", v.paused ? "Play preview video" : "Pause preview video");
        btn.classList.toggle("is-paused", v.paused);
      };
      btn.addEventListener("click", (e) => {
        e.preventDefault(); e.stopPropagation();
        if (v.paused) { userPaused = false; v.play().catch(() => {}); } else { userPaused = true; v.pause(); }
      });
      v.addEventListener("play", sync); v.addEventListener("pause", sync);
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([en]) => {
          if (en.isIntersecting && !userPaused) v.play().catch(() => {}); else if (!en.isIntersecting) v.pause();
        }, { threshold: 0.25 }).observe(v);
      }
      sync();
    });
  }
  const featuredOf = (list) => list.find((a) => a.featured) || list[0];

  /* ---------- Market prices: live TradingView quotes (config in assets/js/prices.js) ---------- */
  const pricesEl = $("[data-prices]");
  const P = window.IIC_PRICES;
  if (pricesEl && P && P.items && P.items.length) {
    const PICON = {
      drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
      flame: '<path d="M12 3c3 4 6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 10 8 8 9 6c.5 2 1.5 3 3 3.5 0-2.5-.5-4.5 0-6.5z"/>',
      can: '<path d="M6 7h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zM9 4h5v3H9zM9 12l6 5M15 12l-6 5"/>'
    };
    const tvLink = (sym) => `https://www.tradingview.com/symbols/${sym.replace(":", "-")}/`;
    const status = $("[data-prices-status]");

    pricesEl.innerHTML = P.items.map((p) => `
      <li class="price">
        <div class="price__top">
          <span class="price__ico"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${PICON[p.icon] || PICON.drop}</svg></span>
          <div style="min-width:0">
            <p class="price__name">${esc(p.name)}</p>
            <p class="price__sym">${esc(p.unit)}</p>
          </div>
        </div>
        <div class="price__quote" data-symbol="${esc(p.symbol)}">
          <div class="tradingview-widget-container"><div class="tradingview-widget-container__widget"></div></div>
          <a class="price__fallback" href="${tvLink(p.symbol)}" target="_blank" rel="noopener nofollow">Live price unavailable. View on TradingView</a>
        </div>
      </li>`).join("");

    let failed = 0;
    $$(".price__quote", pricesEl).forEach((box) => {
      const container = $(".tradingview-widget-container", box);
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
      script.async = true;
      script.textContent = JSON.stringify({
        symbols: [{ proName: box.dataset.symbol, title: box.dataset.symbol.split(":")[1] }],
        showSymbolLogo: true,
        colorTheme: "light",
        isTransparent: true,
        displayMode: "adaptive",
        locale: "en"
      });
      // Mark the column loaded once TradingView injects its iframe
      const mo = new MutationObserver(() => {
        const frame = container.querySelector("iframe");
        if (frame) {
          frame.setAttribute("title", `Live quote: ${box.closest(".price").querySelector(".price__name").textContent}`);
          frame.addEventListener("load", () => box.classList.add("is-loaded"), { once: true });
          mo.disconnect();
        }
      });
      mo.observe(container, { childList: true, subtree: true });
      script.onerror = () => {
        box.classList.add("is-failed");
        if (++failed === P.items.length) status.innerHTML = '<span class="dot" aria-hidden="true"></span>Live prices unavailable';
      };
      container.appendChild(script);
    });

    status.classList.add("is-live");
    status.innerHTML = '<span class="dot" aria-hidden="true"></span>Live · via TradingView';
    $("[data-prices-note]").innerHTML =
      `${esc(P.source || "")} Physical supply quotations vary by product specification, location and delivery terms. ` +
      `<a href="https://www.tradingview.com/markets/commodities/" target="_blank" rel="noopener nofollow">Commodity markets</a> by TradingView.`;
  }

  /* Home: fixed featured story + carousel of the other articles */
  const homeNews = $("[data-news-home]");
  if (homeNews && NEWS.length) {
    const feat = featuredOf(NEWS);
    const rest = NEWS.filter((a) => a !== feat);
    homeNews.innerHTML = cardHTML(feat, true) + (rest.length ? `
      <div class="news-carousel reveal" data-news-carousel role="region" aria-roledescription="carousel" aria-label="More news">
        <div class="news-carousel__track" aria-live="polite">
          ${rest.map((a) => cardHTML(a, false, 0, false)).join("")}
        </div>
        <div class="news-carousel__dots" role="group" aria-label="Choose news page"></div>
      </div>` : "");
    observeReveals(homeNews);
    wirePreviews(homeNews);
    const car = $("[data-news-carousel]", homeNews);
    if (car) initNewsCarousel(car);
  }

  /* Paged news carousel, modelled on the IIC Worldwide site:
     one page of cards at a time, dot pagination, auto-advance every 10s. */
  function initNewsCarousel(car) {
    const track = $(".news-carousel__track", car);
    const dots = $(".news-carousel__dots", car);
    const cards = $$(".news-card", track);
    const DELAY = 10000;
    let page = 0, perPage = 3, pages = 1, timer = null, hovering = false, inView = true;

    const getPerPage = () => parseInt(getComputedStyle(track).getPropertyValue("--cols"), 10) || 1;

    function buildDots() {
      dots.innerHTML = "";
      for (let i = 0; i < pages; i++) {
        const d = document.createElement("button");
        d.type = "button";
        d.className = "news-carousel__dot";
        d.dataset.page = i;
        d.setAttribute("aria-label", `Show news page ${i + 1} of ${pages}`);
        dots.appendChild(d);
      }
    }
    function show(p, animate) {
      page = (p + pages) % pages;
      cards.forEach((c, i) => {
        const on = Math.floor(i / perPage) === page;
        c.hidden = !on;
        c.classList.remove("is-entering");
        if (on && animate && !reduceMotion) { void c.offsetWidth; c.classList.add("is-entering"); }
      });
      $$(".news-carousel__dot", dots).forEach((d, i) => {
        d.classList.toggle("is-active", i === page);
        d.setAttribute("aria-current", i === page ? "true" : "false");
      });
    }
    function layout() {
      perPage = getPerPage();
      pages = Math.max(1, Math.ceil(cards.length / perPage));
      car.classList.toggle("is-paginated", pages > 1);
      buildDots();
      show(Math.min(page, pages - 1), false);
    }
    function schedule() {
      clearInterval(timer);
      if (pages > 1 && !reduceMotion && !hovering && inView) timer = setInterval(() => show(page + 1, true), DELAY);
    }

    dots.addEventListener("click", (e) => {
      const d = e.target.closest(".news-carousel__dot");
      if (!d) return;
      show(+d.dataset.page, true);
      schedule();
    });
    car.addEventListener("mouseenter", () => { hovering = true; schedule(); });
    car.addEventListener("mouseleave", () => { hovering = false; schedule(); });
    car.addEventListener("focusin", () => { hovering = true; schedule(); });
    car.addEventListener("focusout", (e) => { if (!car.contains(e.relatedTarget)) { hovering = false; schedule(); } });
    car.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { show(page + 1, true); schedule(); }
      if (e.key === "ArrowLeft") { show(page - 1, true); schedule(); }
    });
    let x0 = null;
    track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { show(page + (dx < 0 ? 1 : -1), true); schedule(); }
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => { inView = en.isIntersecting; schedule(); }, { threshold: 0.2 }).observe(car);
    }
    let rt, lastPer = getPerPage();
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (getPerPage() !== lastPer) { lastPer = getPerPage(); layout(); schedule(); } }, 150);
    });
    layout();
    schedule();
  }

  /* News ticker: TV-style rolling headlines */
  $$("[data-ticker]").forEach((ticker) => {
    if (!NEWS.length) { ticker.remove(); return; }
    const track = $(".ticker__track", ticker);
    // data-ticker="announcements" shows only real company announcements
    const pool = ticker.dataset.ticker === "announcements" ? NEWS.filter((a) => a.announcement) : NEWS;
    if (!pool.length) { ticker.remove(); return; }
    const items = pool.slice(0, 8).map((a) => `
      <li class="ticker__item"><a href="${url(a)}">
        <span class="ticker__cat">${esc(a.category)}</span>
        <span class="ticker__title">${esc(a.title)}</span>
        <time class="ticker__date" datetime="${a.date}">${fmtDate(a.date)}</time>
      </a></li>`).join("");
    // Two identical copies scroll as one strip, so the loop is seamless.
    // The copy is hidden from screen readers and removed from the tab order.
    track.innerHTML = `<ul class="ticker__list">${items}</ul><ul class="ticker__list" aria-hidden="true">${items}</ul>`;
    $$('[aria-hidden="true"] a', track).forEach((a) => a.setAttribute("tabindex", "-1"));

    const setSpeed = () => {
      const w = $(".ticker__list", track).offsetWidth;
      ticker.style.setProperty("--ticker-dur", Math.max(20, w / 70) + "s"); // ~70px per second
    };
    setSpeed();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSpeed);

    const btn = $(".ticker__toggle", ticker);
    btn.addEventListener("click", () => {
      const paused = ticker.classList.toggle("is-paused");
      btn.setAttribute("aria-pressed", String(paused));
      btn.setAttribute("aria-label", paused ? "Play headlines" : "Pause headlines");
    });
  });

  /* Listing page */
  const listEl = $("[data-news-list]");
  if (listEl) {
    const PAGE = 6;
    const params = new URLSearchParams(location.search);
    const cats = window.IIC_NEWS_CATEGORIES || [...new Set(NEWS.map((a) => a.category))];
    const state = { cat: params.get("category") || "All", q: params.get("q") || "", shown: PAGE };
    const filtersEl = $("[data-news-filters]");
    const searchEl = $("#news-search");
    const moreBtn = $("[data-news-more]");
    const note = $("[data-news-note]");
    searchEl.value = state.q;

    filtersEl.innerHTML = ["All", ...cats]
      .map((c) => {
        const n = c === "All" ? NEWS.length : NEWS.filter((a) => a.category === c).length;
        return `<button type="button" class="filter" data-cat="${esc(c)}" aria-pressed="${c === state.cat}">${esc(c)}<span class="count">${n}</span></button>`;
      })
      .join("");

    const syncURL = () => {
      const p = new URLSearchParams();
      if (state.cat !== "All") p.set("category", state.cat);
      if (state.q) p.set("q", state.q);
      history.replaceState(null, "", p.toString() ? `?${p}` : location.pathname);
    };

    const render = () => {
      const q = state.q.trim().toLowerCase();
      const matches = NEWS.filter(
        (a) =>
          (state.cat === "All" || a.category === state.cat) &&
          (!q || (a.title + " " + a.excerpt + " " + a.category).toLowerCase().includes(q))
      );
      const isDefault = state.cat === "All" && !q;
      let html = "";
      let list = matches;
      if (isDefault && matches.length) {
        const feat = featuredOf(matches);
        html += cardHTML(feat, true);
        list = matches.filter((a) => a !== feat);
      }
      const visible = list.slice(0, state.shown);
      html += visible.map((a, i) => cardHTML(a, false, (i % 3) * 60)).join("");
      if (!matches.length) {
        html = `<div class="news-empty" role="status">
          <h3>No articles match "${esc(state.q || state.cat)}"</h3>
          <p>Try a different keyword or browse all categories.</p>
          <button type="button" class="btn btn--outline" data-news-reset>Clear filters</button>
        </div>`;
      }
      listEl.innerHTML = html;
      observeReveals(listEl);
      wirePreviews(listEl);
      moreBtn.hidden = list.length <= state.shown;
      note.textContent = isDefault ? "" : `${matches.length} article${matches.length === 1 ? "" : "s"} found`;
      $$(".filter", filtersEl).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)));
      const reset = $("[data-news-reset]", listEl);
      if (reset) reset.addEventListener("click", () => { state.cat = "All"; state.q = ""; searchEl.value = ""; state.shown = PAGE; syncURL(); render(); });
    };

    filtersEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      state.cat = b.dataset.cat;
      state.shown = PAGE;
      syncURL();
      render();
    });
    let t;
    searchEl.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => { state.q = searchEl.value; state.shown = PAGE; syncURL(); render(); }, 200);
    });
    $("#news-search-form").addEventListener("submit", (e) => e.preventDefault());
    moreBtn.addEventListener("click", () => { state.shown += PAGE; render(); });
    render();
  }

  /* Article page */
  const articleEl = $("[data-article]");
  if (articleEl) {
    const slug = new URLSearchParams(location.search).get("slug");
    const i = NEWS.findIndex((a) => a.slug === slug);
    const a = NEWS[i];
    if (!a) {
      $("[data-article-title]").textContent = "Article not found";
      $("[data-article-meta]").innerHTML = "";
      articleEl.innerHTML = `<div class="news-empty"><h3>We couldn't find that article.</h3><p>It may have been moved or renamed.</p><a class="btn btn--dark" href="news.html" style="margin-top:16px">Back to all news <span class="btn__icon">${ICON.arrowR}</span></a></div>`;
      $("[data-article-hero]").remove();
      $$("[data-article-side]").forEach((el) => el.remove());
    } else {
      document.title = `${a.title} | IIC Oil & Gas News`;
      const md = $('meta[name="description"]');
      if (md) md.setAttribute("content", a.excerpt);
      $("[data-article-title]").textContent = a.title;
      $("[data-article-crumb]").textContent = a.category;
      $("[data-article-meta]").innerHTML = `
        <span class="chip">${esc(a.category)}</span>
        <time datetime="${a.date}">${fmtDate(a.date)}</time>
        <span style="display:inline-flex;gap:6px;align-items:center">${ICON.clock} ${a.readMins} min read</span>
        <span>By IIC Oil &amp; Gas</span>`;
      const hero = $("[data-article-hero] img");
      hero.src = a.image;
      hero.alt = a.imageAlt || "";
      articleEl.innerHTML = a.body;
      if (a.video && a.video.src) {
        const fig = document.createElement("figure");
        fig.className = "article-video";
        fig.innerHTML = `
          <video controls playsinline preload="metadata" poster="${a.video.poster || a.image}">
            <source src="${a.video.src}" type="video/mp4">
            Your browser can't play this video. <a href="${a.video.src}">Download it instead</a>.
          </video>
          ${a.video.caption ? `<figcaption>${esc(a.video.caption)}${a.video.duration ? ` <span>(${esc(a.video.duration)})</span>` : ""}</figcaption>` : ""}`;
        const lede = $(".lede", articleEl);
        lede ? lede.after(fig) : articleEl.prepend(fig);
      }

      // Table of contents from h2s
      const toc = $("[data-toc]");
      const hs = $$("h2[id]", articleEl);
      if (toc && hs.length) {
        toc.innerHTML = hs.map((h) => `<a href="#${h.id}">${esc(h.textContent)}</a>`).join("");
        if ("IntersectionObserver" in window) {
          const links = $$("a", toc);
          const io = new IntersectionObserver((ens) => {
            ens.forEach((en) => {
              if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
            });
          }, { rootMargin: "0px 0px -70% 0px" });
          hs.forEach((h) => io.observe(h));
        }
      } else if (toc) {
        toc.closest(".side-card").remove();
      }

      // Share
      const pageURL = encodeURIComponent(location.href);
      const title = encodeURIComponent(a.title);
      $("[data-share-li]").href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageURL}`;
      $("[data-share-x]").href = `https://twitter.com/intent/tweet?url=${pageURL}&text=${title}`;
      $("[data-share-wa]").href = `https://wa.me/?text=${title}%20${pageURL}`;
      $("[data-share-mail]").href = `mailto:?subject=${title}&body=${pageURL}`;
      const copyBtn = $("[data-share-copy]");
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(location.href);
          $("[data-share-status]").textContent = "Link copied to clipboard";
        } catch {
          $("[data-share-status]").textContent = "Copy failed — use your browser's address bar";
        }
        setTimeout(() => ($("[data-share-status]").textContent = ""), 3500);
      });

      // Prev / next (by date)
      const newer = NEWS[i - 1];
      const older = NEWS[i + 1];
      $("[data-article-nav]").innerHTML =
        (older ? `<a href="${url(older)}"><small>${ICON.arrowL} Previous</small><strong>${esc(older.title)}</strong></a>` : "<span></span>") +
        (newer ? `<a href="${url(newer)}"><small>Next ${ICON.arrowR}</small><strong>${esc(newer.title)}</strong></a>` : "<span></span>");

      // Related
      const related = NEWS.filter((x) => x !== a).sort((x, y) => (y.category === a.category) - (x.category === a.category)).slice(0, 3);
      const relEl = $("[data-related]");
      relEl.innerHTML = related.map((r, k) => cardHTML(r, false, k * 60)).join("");
      observeReveals(relEl);
    }
  }

  /* ---------- Forms ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateField(field) {
    const input = $("input, select, textarea", field);
    if (!input) return true;
    let ok = input.checkValidity();
    if (ok && input.type === "email" && input.value) ok = EMAIL_RE.test(input.value.trim());
    field.classList.toggle("is-invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    return ok;
  }

  $$("form[data-enquiry]").forEach((form) => {
    const fields = $$(".field", form);
    const msg = $(".form-msg", form);
    fields.forEach((f) => {
      const input = $("input, select, textarea", f);
      if (!input) return;
      input.addEventListener("blur", () => { if (input.value) validateField(f); });
      input.addEventListener("input", () => { if (f.classList.contains("is-invalid")) validateField(f); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invalid = fields.filter((f) => !validateField(f));
      if (invalid.length) {
        msg.className = "form-msg is-error";
        msg.textContent = `Please fix ${invalid.length} field${invalid.length > 1 ? "s" : ""} highlighted below.`;
        $("input, select, textarea", invalid[0]).focus();
        return;
      }
      // Static site: hand the enquiry to the visitor's email client.
      // To receive submissions directly, point the form at a form service
      // (e.g. Formspree) or your own endpoint and replace this block.
      const data = new FormData(form);
      const lines = [];
      for (const [k, v] of data.entries()) if (v) lines.push(`${k}: ${v}`);
      const subject = form.dataset.enquiry === "product"
        ? `Product enquiry — ${data.get("Product") || "IIC Oil & Gas"}`
        : `Website enquiry — ${data.get("Topic") || "General"}`;
      window.location.href = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      msg.className = "form-msg is-ok";
      msg.textContent = `Your email app should open with the enquiry ready to send. If it doesn't, email ${OFFICE_EMAIL} directly.`;
    });
  });

  $$("form[data-newsletter]").forEach((form) => {
    const input = $("input[type=email]", form);
    const msg = $(".form-msg", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!EMAIL_RE.test(input.value.trim())) {
        msg.className = "form-msg is-error";
        msg.textContent = "Please enter a valid email address, e.g. name@company.com";
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }
      input.setAttribute("aria-invalid", "false");
      window.location.href = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent("Subscribe to IIC Oil & Gas news")}&body=${encodeURIComponent("Please add " + input.value.trim() + " to the IIC Oil & Gas news mailing list.")}`;
      msg.className = "form-msg is-ok";
      msg.textContent = "Your email app should open with a subscription request ready to send.";
    });
  });

  /* Product "Enquire" buttons prefill the enquiry form */
  $$("[data-enquire]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sel = $("#enq-product");
      if (sel) {
        sel.value = btn.dataset.enquire;
        const f = sel.closest(".field");
        if (f) validateField(f);
      }
      const target = $("#enquiry");
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        setTimeout(() => $("#enq-volume") && $("#enq-volume").focus({ preventScroll: true }), reduceMotion ? 0 : 600);
      }
    });
  });

  /* Product category filter */
  const prodFilters = $("[data-prod-filters]");
  if (prodFilters) {
    prodFilters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", prodFilters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const cat = b.dataset.cat;
      let n = 0;
      $$(".prod").forEach((p) => {
        const show = cat === "All" || p.dataset.cat === cat;
        p.hidden = !show;
        if (show) n++;
      });
      $("[data-prod-note]").textContent = `Showing ${n} product${n === 1 ? "" : "s"}`;
    });
  }
})();
