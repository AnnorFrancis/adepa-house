/* ADEPA HOUSE — shared chrome and motion: logo, nav, menu, bag (drawer + toast),
   curtain transitions, footer, reveals, smooth scroll. */
(function () {
  'use strict';
  var A = window.ADEPA, B = A.biz;
  var page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnim = !!window.gsap && !reduce;
  if (canAnim) document.documentElement.classList.add('js-anim');
  A.canAnim = canAnim;

  /* ---------- icons + logo ---------- */
  var ICON = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>'
  };
  A.icon = ICON;
  /* The mark: an A whose crossbar is a comb, inside a ring. */
  A.mark = function (cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="24" cy="24" r="21.5" stroke-width="1.8"/>' +
      '<path d="M14.5 35 24 12l9.5 23" stroke-width="3"/>' +
      '<path d="M17.6 27.4h12.8" stroke-width="2.6"/>' +
      '<path d="M19.8 27.4v3.6M22.6 27.4v3.6M25.4 27.4v3.6M28.2 27.4v3.6" stroke-width="1.5"/></svg>';
  };
  function logo(sub) {
    return '<a class="logo" href="index.html" aria-label="Adepa House, home">' + A.mark() +
      '<span class="logo__word"><b>Adepa</b>' + (sub ? '<i>House, East Legon</i>' : '') + '</span></a>';
  }

  /* ---------- bag: services to book + products to buy ---------- */
  var KEY = 'adepa-bag-v1', mem = { s: [], p: {} };
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || { s: [], p: {} }; } catch (e) { return mem; } }
  function write(b) { try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) { mem = b; } document.dispatchEvent(new CustomEvent('bag')); }
  A.bag = {
    get: read,
    has: function (id) { return read().s.indexOf(id) > -1; },
    addSvc: function (id) { var b = read(); if (b.s.indexOf(id) < 0 && A.find(id)) b.s.push(id); write(b); },
    removeSvc: function (id) { var b = read(); b.s = b.s.filter(function (x) { return x !== id; }); write(b); },
    addProd: function (id, n) { var b = read(); b.p[id] = (b.p[id] || 0) + (n || 1); write(b); },
    setQty: function (id, q) { var b = read(); if (q <= 0) delete b.p[id]; else b.p[id] = q; write(b); },
    clear: function () { write({ s: [], p: {} }); },
    count: function () { var b = read(), n = b.s.length; for (var k in b.p) n += b.p[k]; return n; },
    totals: function () {
      var b = read(), svc = 0, prod = 0, from = false;
      b.s.forEach(function (id) { var f = A.find(id); if (f) { svc += f.item.price; if (f.item.from) from = true; } });
      for (var k in b.p) { var p = A.product(k); if (p) prod += p.price * b.p[k]; }
      return { svc: svc, prod: prod, from: from };
    }
  };
  /* Buttons anywhere on the page: data-add-svc="w7" toggles, data-add-prod="p3" adds one. */
  A.addBtn = function (kind, id, cls) {
    return '<button type="button" class="' + (cls || 'add') + '" data-add-' + kind + '="' + id + '" aria-pressed="false">' + ICON.plus + '<span>Add</span></button>';
  };
  function syncAdds() {
    var b = read();
    document.querySelectorAll('[data-add-svc]').forEach(function (el) {
      var on = b.s.indexOf(el.dataset.addSvc) > -1;
      el.setAttribute('aria-pressed', String(on));
      el.innerHTML = (on ? ICON.check : ICON.plus) + '<span>' + (on ? 'Added' : (el.dataset.label || 'Add')) + '</span>';
    });
    document.querySelectorAll('[data-add-prod]').forEach(function (el) {
      var q = b.p[el.dataset.addProd] || 0;
      el.setAttribute('aria-pressed', String(q > 0));
      el.innerHTML = (q ? ICON.check : ICON.plus) + '<span>' + (q ? 'In bag' + (q > 1 ? ' (' + q + ')' : '') : (el.dataset.label || 'Add')) + '</span>';
    });
    var n = A.bag.count();
    document.querySelectorAll('.bagbtn__n').forEach(function (el) { el.textContent = n; el.classList.toggle('is-on', n > 0); });
  }
  A.syncAdds = syncAdds;
  document.addEventListener('click', function (e) {
    var s = e.target.closest('[data-add-svc]'), p = e.target.closest('[data-add-prod]');
    if (s) {
      e.preventDefault();
      var id = s.dataset.addSvc, f = A.find(id);
      if (A.bag.has(id)) { A.bag.removeSvc(id); toast(f.item.name + ' removed'); }
      else { A.bag.addSvc(id); toast(f.item.name + ' added to your booking'); bump(); }
    } else if (p) {
      e.preventDefault();
      var pr = A.product(p.dataset.addProd);
      A.bag.addProd(pr.id); toast(pr.name + ' added to your bag'); bump();
    }
  });
  document.addEventListener('bag', function () { syncAdds(); if (bag.classList.contains('is-open')) drawBag(); });

  /* ---------- nav ---------- */
  var LINKS = [['services', 'Services'], ['shop', 'Shop'], ['lookbook', 'Lookbook'], ['about', 'About'], ['index.html#visit', 'Visit']];
  function href(k) { return k.indexOf('.html') > -1 ? k : k + '.html'; }
  function cur(k) { return k === page ? ' aria-current="page"' : ''; }

  var nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML = logo(true) +
    '<nav class="nav__links" aria-label="Main"><span class="nav__ink" aria-hidden="true"></span>' +
      LINKS.map(function (l) { return '<a href="' + href(l[0]) + '"' + cur(l[0]) + '>' + l[1] + '</a>'; }).join('') +
    '</nav>' +
    '<div class="nav__right">' +
      '<button class="bagbtn" aria-label="Open your bag">' + ICON.bag + '<span class="bagbtn__n">0</span></button>' +
      '<a class="btn btn--cream btn--sm" href="book.html">Book</a>' +
      '<button class="burger" aria-label="Open menu" aria-expanded="false"></button>' +
    '</div>';
  document.body.prepend(nav);

  /* sliding highlight that follows the pointer and rests on the current page */
  (function () {
    var wrap = nav.querySelector('.nav__links'), ink = wrap.querySelector('.nav__ink');
    var links = wrap.querySelectorAll('a'), here = wrap.querySelector('[aria-current]');
    function to(a) {
      if (!a) { ink.style.opacity = 0; return; }
      ink.style.width = a.offsetWidth + 'px';
      ink.style.transform = 'translateX(' + a.offsetLeft + 'px)';
      ink.style.opacity = 1;
    }
    links.forEach(function (a) { a.addEventListener('mouseenter', function () { to(a); }); a.addEventListener('focus', function () { to(a); }); });
    wrap.addEventListener('mouseleave', function () { to(here); });
    window.addEventListener('load', function () { to(here); });
    setTimeout(function () { to(here); }, 60);
  })();

  /* ---------- menu ---------- */
  var menu = document.createElement('div');
  menu.className = 'menu';
  menu.setAttribute('aria-hidden', 'true');
  menu.innerHTML =
    '<div class="menu__top">' + logo(false) + '<button class="menu__close">Close</button></div>' +
    '<nav class="menu__list" aria-label="Menu">' +
      [['index', 'Home']].concat(LINKS).concat([['book', 'Book a chair']]).map(function (l) {
        return '<span class="ln"><span><a href="' + href(l[0]) + '">' + l[1] + '</a></span></span>';
      }).join('') +
    '</nav>' +
    '<div class="menu__foot"><span>' + B.address + '</span><a href="tel:' + B.tel + '">' + B.phone + '</a><a href="https://wa.me/' + B.whatsapp + '">WhatsApp</a></div>';
  document.body.appendChild(menu);

  var burger = nav.querySelector('.burger'), open = false;
  function setMenu(on) {
    if (on === open) return;
    open = on;
    burger.setAttribute('aria-expanded', String(on));
    menu.setAttribute('aria-hidden', String(!on));
    document.body.classList.toggle('is-locked', on);
    var items = menu.querySelectorAll('.menu__list .ln > span');
    if (!window.gsap) { menu.style.visibility = on ? 'visible' : 'hidden'; menu.style.clipPath = on ? 'inset(0)' : 'inset(0 0 100% 0)'; return; }
    if (on) {
      gsap.set(menu, { visibility: 'visible' });
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: reduce ? 0 : .75, ease: 'power4.inOut' });
      gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: reduce ? 0 : .8, ease: 'power4.out', stagger: .05, delay: reduce ? 0 : .3 });
    } else {
      gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: reduce ? 0 : .6, ease: 'power4.inOut', onComplete: function () { gsap.set(menu, { visibility: 'hidden' }); } });
    }
  }
  burger.addEventListener('click', function () { setMenu(true); });
  menu.querySelector('.menu__close').addEventListener('click', function () { setMenu(false); });

  /* ---------- bag drawer ---------- */
  var bag = document.createElement('div');
  bag.className = 'bag';
  bag.setAttribute('aria-hidden', 'true');
  bag.innerHTML = '<div class="bag__veil"></div><aside class="bag__panel" role="dialog" aria-modal="true" aria-label="Your bag">' +
    '<div class="bag__head"><h2>Your bag</h2><button class="bag__x">Close</button></div>' +
    '<div class="bag__body"></div><div class="bag__foot"></div></aside>';
  document.body.appendChild(bag);
  var lastFocus = null;
  function drawBag() {
    var b = read(), t = A.bag.totals(), body = bag.querySelector('.bag__body'), foot = bag.querySelector('.bag__foot');
    var pids = Object.keys(b.p);
    if (!b.s.length && !pids.length) {
      body.innerHTML = '<div class="bag__empty"><h3 class="d-m">Nothing here yet.</h3><p>Add a service to book, or something from the shop.</p>' +
        '<div><a class="btn btn--navy" href="services.html">Browse services</a><a class="btn btn--line" href="shop.html">Visit the shop</a></div></div>';
      foot.style.display = 'none';
      return;
    }
    foot.style.display = '';
    var html = '';
    if (b.s.length) {
      html += '<div class="bag__group"><h3>To book</h3>' + b.s.map(function (id) {
        var f = A.find(id); if (!f) return '';
        return '<div class="bag__item"><img src="assets/img/s/' + f.item.img + '" alt=""><div><b>' + f.item.name + '</b><small>' + f.group.name + ', about ' + A.dur(f.item.mins) + '</small></div>' +
          '<div class="end">' + (f.item.from ? 'from ' : '') + A.money(f.item.price) + '<button class="bag__rm" data-rm-svc="' + id + '">Remove</button></div></div>';
      }).join('') + '</div>';
    }
    if (pids.length) {
      html += '<div class="bag__group"><h3>To buy</h3>' + pids.map(function (id) {
        var p = A.product(id); if (!p) return '';
        return '<div class="bag__item"><img src="assets/img/s/' + p.img + '" alt=""><div><b>' + p.name + '</b><small>' + A.money(p.price) + ' each</small></div>' +
          '<div class="end">' + A.money(p.price * b.p[id]) + '<span class="qty"><button data-qty="' + id + '" data-d="-1" aria-label="One less">−</button><span>' + b.p[id] + '</span><button data-qty="' + id + '" data-d="1" aria-label="One more">+</button></span></div></div>';
      }).join('') + '</div>';
    }
    body.innerHTML = html;
    foot.innerHTML = '<div class="bag__sum"><span>Total' + (t.from ? ', from' : '') + '</span><b>' + A.money(t.svc + t.prod) + '</b></div>' +
      '<a class="btn btn--navy btn--block" href="book.html">' + (b.s.length ? 'Choose a time' : 'Checkout') + '</a>' +
      '<p class="bag__hint">' + (b.s.length ? 'Services are paid at the salon. Pick your stylist and time next.' : 'Collect at the salon or have it delivered in Accra.') + '</p>';
  }
  function setBag(on) {
    if (on) { drawBag(); lastFocus = document.activeElement; toastEl.classList.remove('is-on'); }
    bag.classList.toggle('is-open', on);
    bag.setAttribute('aria-hidden', String(!on));
    document.body.classList.toggle('is-locked', on);
    if (on) bag.querySelector('.bag__x').focus(); else if (lastFocus) lastFocus.focus();
  }
  A.openBag = function () { setBag(true); };
  nav.querySelector('.bagbtn').addEventListener('click', function () { setBag(true); });
  bag.querySelector('.bag__x').addEventListener('click', function () { setBag(false); });
  bag.querySelector('.bag__veil').addEventListener('click', function () { setBag(false); });
  bag.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-rm-svc]'), q = e.target.closest('[data-qty]');
    if (rm) A.bag.removeSvc(rm.dataset.rmSvc);
    if (q) { var id = q.dataset.qty; A.bag.setQty(id, (read().p[id] || 0) + (+q.dataset.d)); }
  });
  window.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (bag.classList.contains('is-open')) setBag(false); else setMenu(false);
  });

  /* ---------- toast ---------- */
  var toastEl = document.createElement('div');
  toastEl.className = 'toast'; toastEl.setAttribute('role', 'status');
  toastEl.innerHTML = '<span></span><button type="button">View bag</button>';
  document.body.appendChild(toastEl);
  toastEl.querySelector('button').addEventListener('click', function () { toastEl.classList.remove('is-on'); setBag(true); });
  var toastT;
  function toast(msg) {
    toastEl.querySelector('span').textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 3400);
  }
  A.toast = toast;
  function bump() {
    var n = nav.querySelector('.bagbtn');
    if (canAnim) gsap.fromTo(n, { scale: .8 }, { scale: 1, duration: .7, ease: 'elastic.out(1, .45)' });
  }

  /* ---------- curtain ---------- */
  var curtain = document.createElement('div');
  curtain.className = 'curtain';
  curtain.innerHTML = '<i></i><i></i><span class="curtain__mark">' + A.mark() + '</span>';
  document.body.appendChild(curtain);
  var cl = curtain.children[0], cr = curtain.children[1], cm = curtain.children[2];
  function leave(url) {
    if (!canAnim) { location.href = url; return; }
    try { sessionStorage.setItem('adepa-curtain', '1'); } catch (e) {}
    gsap.set(curtain, { visibility: 'visible' });
    gsap.timeline({ onComplete: function () { location.href = url; } })
      .to([cl, cr], { x: 0, duration: .6, ease: 'power3.inOut' })
      .fromTo(cm, { opacity: 0, scale: .85, rotate: -20 }, { opacity: 1, scale: 1, rotate: 0, duration: .4, ease: 'back.out(2)' }, '-=.2')
      .to({}, { duration: .1 });
  }
  A.arrive = function (done) {
    var flagged = false;
    try { flagged = sessionStorage.getItem('adepa-curtain') === '1'; sessionStorage.removeItem('adepa-curtain'); } catch (e) {}
    if (!flagged || !canAnim) { if (done) done(false); return false; }
    gsap.set(curtain, { visibility: 'visible' });
    gsap.set([cl, cr], { x: 0 }); gsap.set(cm, { opacity: 1 });
    gsap.timeline({ onComplete: function () { gsap.set(curtain, { visibility: 'hidden' }); } })
      .to(cm, { opacity: 0, scale: .9, duration: .2 })
      .to(cl, { x: '-101%', duration: .8, ease: 'power3.inOut' }, 0.05)
      .to(cr, { x: '101%', duration: .8, ease: 'power3.inOut' }, 0.05)
      .add(function () { if (done) done(true); }, .35);
    return true;
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var raw = a.getAttribute('href');
    if (!/\.html(\?|#|$)/.test(raw) || /^https?:/.test(raw)) return;
    var samePage = raw.split('#')[0].split('?')[0].replace('.html', '') === page && raw.indexOf('#') > -1;
    if (samePage) { setMenu(false); if (bag.classList.contains('is-open')) setBag(false); return; }
    e.preventDefault();
    if (open) setMenu(false);
    leave(raw);
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) { curtain.style.visibility = 'hidden'; syncAdds(); } });

  /* ---------- footer ---------- */
  var footSlot = document.querySelector('[data-foot]');
  if (footSlot) {
    footSlot.className = 'foot';
    footSlot.innerHTML =
      '<div class="wrap">' +
        '<div class="foot__cta glass-d"><h2 class="d-l">Your chair<br>is ready.</h2><div style="display:flex;flex-wrap:wrap;gap:10px"><a class="btn btn--cream" href="book.html">Book a chair</a><a class="btn btn--glass" href="shop.html">Visit the shop</a></div></div>' +
        '<div class="foot__cols">' +
          '<div>' + logo(true) + '<p>' + B.address + '</p><p>Monday to Saturday, ' + A.clock(A.hours[1][0]) + ' to ' + A.clock(A.hours[1][1]) + '</p><p>Sunday, ' + A.clock(A.hours[0][0]) + ' to ' + A.clock(A.hours[0][1]) + '</p></div>' +
          '<div><h4>Salon</h4><a href="services.html">Services and prices</a><a href="shop.html">Shop</a><a href="lookbook.html">Lookbook</a><a href="about.html">About us</a><a href="book.html">Book a chair</a></div>' +
          '<div><h4>Talk to us</h4><a href="tel:' + B.tel + '">' + B.phone + '</a><a href="https://wa.me/' + B.whatsapp + '">WhatsApp</a><a href="mailto:' + B.email + '">' + B.email + '</a></div>' +
          '<div><h4>Follow</h4><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a></div>' +
        '</div>' +
        '<div class="foot__legal"><span>© ' + new Date().getFullYear() + ' Adepa House. All rights reserved.</span><span>Walk-ins welcome. Booking gets you seated first.</span></div>' +
      '</div>' +
      '<div class="foot__mark" aria-hidden="true">Adepa</div>';
  }

  /* ---------- nav behaviour on scroll ---------- */
  var hero = document.querySelector('[data-hero]');
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-over', !!hero && y < hero.offsetHeight - 90);
    nav.classList.toggle('is-away', !document.body.dataset.navStay && y > 500 && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove('is-away');
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- line splitting ---------- */
  A.split = function (el) {
    if (el.dataset.splitDone) return el.querySelectorAll('.ln > span');
    el.innerHTML = el.innerHTML.split(/<br\s*\/?>/i).map(function (l) {
      return '<span class="ln"><span>' + l.trim() + '</span></span>';
    }).join('');
    el.dataset.splitDone = '1';
    return el.querySelectorAll('.ln > span');
  };

  /* ---------- scroll reveals ---------- */
  A.reveals = function () {
    if (!canAnim || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('[data-lines]').forEach(function (el) {
      if (el.dataset.lines === 'manual') return;
      var spans = A.split(el);
      gsap.set(spans, { yPercent: 108 });
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () {
        gsap.to(spans, { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: .09 });
      } });
    });
    document.querySelectorAll('[data-unmask]').forEach(function (el) {
      var img = el.querySelector('img');
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () {
        gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.25, ease: 'power4.inOut' });
        if (img) gsap.to(img, { scale: 1, duration: 1.7, ease: 'power3.out' });
      } });
    });
    ScrollTrigger.batch('[data-rise]', { start: 'top 92%', once: true, onEnter: function (els) {
      gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .07, overwrite: true });
    } });
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  };

  /* ---------- smooth wheel on desktop ---------- */
  A.smooth = function () {
    if (!canAnim || !window.Lenis || !window.matchMedia('(pointer: fine)').matches) return;
    var lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on('scroll', function () { if (window.ScrollTrigger) ScrollTrigger.update(); });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    A.lenis = lenis;
  };

  /* ---------- generic rotating set (quotes) ---------- */
  A.rotator = function (items, dots, ms) {
    var i = 0, timer;
    function go(n) {
      i = (n + items.length) % items.length;
      items.forEach(function (el, k) { el.classList.toggle('is-on', k === i); });
      if (dots) dots.forEach(function (d, k) { d.setAttribute('aria-current', String(k === i)); });
      clearInterval(timer);
      if (ms && !reduce) timer = setInterval(function () { go(i + 1); }, ms);
    }
    if (dots) dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    go(0);
    return go;
  };

  /* ---------- inner pages: heading on arrival ---------- */
  A.pageIn = function () {
    var h = document.querySelector('.phead [data-lines="manual"]');
    var spans = h ? A.split(h) : null;
    if (spans && canAnim) gsap.set(spans, { yPercent: 108 });
    A.arrive(function () {
      if (spans && canAnim) gsap.to(spans, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: .1, delay: .05 });
    });
    syncAdds();
    A.smooth();
    A.reveals();
  };

  syncAdds();
})();
