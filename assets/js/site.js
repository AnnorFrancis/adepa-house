/* ADEPA HOUSE — shared chrome and motion: nav, menu, curtain, footer, reveals. */
(function () {
  'use strict';
  var A = window.ADEPA, B = A.biz;
  var page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnim = !!window.gsap && !reduce;
  if (canAnim) document.documentElement.classList.add('js-anim');
  A.canAnim = canAnim;

  /* ---------- chrome ---------- */
  var LINKS = [['services', 'Services'], ['lookbook', 'Lookbook'], ['about', 'About'], ['index.html#visit', 'Visit']];
  function href(k) { return k.indexOf('.html') > -1 ? k : k + '.html'; }
  function cur(k) { return k === page ? ' aria-current="page"' : ''; }

  var nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML =
    '<a class="logo" href="index.html" aria-label="Adepa House, home"><b>Adepa</b><i>House</i></a>' +
    '<nav class="nav__links" aria-label="Main">' +
      LINKS.map(function (l) { return '<a href="' + href(l[0]) + '"' + cur(l[0]) + '>' + l[1] + '</a>'; }).join('') +
    '</nav>' +
    '<div class="nav__right">' +
      '<a class="btn btn--sun btn--sm" href="book.html">Book a chair</a>' +
      '<button class="burger" aria-label="Open menu" aria-expanded="false"></button>' +
    '</div>';
  document.body.prepend(nav);

  var menu = document.createElement('div');
  menu.className = 'menu';
  menu.setAttribute('aria-hidden', 'true');
  menu.innerHTML =
    '<div class="menu__top"><a class="logo" href="index.html"><b>Adepa</b></a><button class="menu__close">Close</button></div>' +
    '<nav class="menu__list" aria-label="Menu">' +
      [['index', 'Home']].concat(LINKS).concat([['book', 'Book a chair']]).map(function (l) {
        return '<span class="ln"><span><a href="' + href(l[0]) + '">' + l[1] + '</a></span></span>';
      }).join('') +
    '</nav>' +
    '<div class="menu__foot"><span>' + B.address + '</span><a href="tel:' + B.tel + '">' + B.phone + '</a><a href="https://wa.me/' + B.whatsapp + '">WhatsApp</a></div>';
  document.body.appendChild(menu);

  var curtain = document.createElement('div');
  curtain.className = 'curtain';
  curtain.innerHTML = '<i></i><i></i><b>Adepa</b>';
  document.body.appendChild(curtain);

  var footSlot = document.querySelector('[data-foot]');
  if (footSlot) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    footSlot.className = 'foot';
    footSlot.innerHTML =
      '<div class="wrap">' +
        '<div class="foot__cta"><h2 class="d-l">Your chair<br>is ready.</h2><a class="btn btn--sun" href="book.html">Book a chair</a></div>' +
        '<div class="foot__cols">' +
          '<div><h4>Find us</h4><p>' + B.address + '</p><p>Monday to Saturday, ' + A.clock(A.hours[1][0]) + ' to ' + A.clock(A.hours[1][1]) + '</p><p>Sunday, ' + A.clock(A.hours[0][0]) + ' to ' + A.clock(A.hours[0][1]) + '</p></div>' +
          '<div><h4>Salon</h4><a href="services.html">Services and prices</a><a href="lookbook.html">Lookbook</a><a href="about.html">About us</a><a href="book.html">Book a chair</a></div>' +
          '<div><h4>Talk to us</h4><a href="tel:' + B.tel + '">' + B.phone + '</a><a href="https://wa.me/' + B.whatsapp + '">WhatsApp</a><a href="mailto:' + B.email + '">' + B.email + '</a></div>' +
          '<div><h4>Follow</h4><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="wrap"><div class="foot__legal"><span>© ' + new Date().getFullYear() + ' Adepa House. All rights reserved.</span><span>Walk-ins welcome. Booking gets you seated first.</span></div></div>' +
      '<div class="foot__mark" aria-hidden="true">Adepa</div>';
    void days;
  }

  /* ---------- nav behaviour ---------- */
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

  /* ---------- menu ---------- */
  var burger = nav.querySelector('.burger');
  var open = false;
  function setMenu(on) {
    if (on === open) return;
    open = on;
    burger.setAttribute('aria-expanded', String(on));
    menu.setAttribute('aria-hidden', String(!on));
    document.body.classList.toggle('is-locked', on);
    var items = menu.querySelectorAll('.menu__list .ln > span');
    if (!window.gsap) {
      menu.style.visibility = on ? 'visible' : 'hidden';
      menu.style.clipPath = on ? 'inset(0)' : 'inset(0 0 100% 0)';
      return;
    }
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
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- curtain ---------- */
  var cl = curtain.children[0], cr = curtain.children[1], cm = curtain.children[2];
  function leave(url) {
    if (!canAnim) { location.href = url; return; }
    try { sessionStorage.setItem('adepa-curtain', '1'); } catch (e) {}
    gsap.set(curtain, { visibility: 'visible' });
    gsap.timeline({ onComplete: function () { location.href = url; } })
      .to([cl, cr], { x: 0, duration: .6, ease: 'power3.inOut' })
      .to(cm, { opacity: 1, duration: .25 }, '-=.15')
      .to({}, { duration: .12 });
  }
  A.arrive = function (done) {
    var flagged = false;
    try { flagged = sessionStorage.getItem('adepa-curtain') === '1'; sessionStorage.removeItem('adepa-curtain'); } catch (e) {}
    if (!flagged || !canAnim) { if (done) done(false); return false; }
    gsap.set(curtain, { visibility: 'visible' });
    gsap.set([cl, cr], { x: 0 }); gsap.set(cm, { opacity: 1 });
    gsap.timeline({ onComplete: function () { gsap.set(curtain, { visibility: 'hidden' }); } })
      .to(cm, { opacity: 0, duration: .2 })
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
    if (samePage) { setMenu(false); return; }           /* let the browser jump to the anchor */
    e.preventDefault();
    if (open) setMenu(false);
    leave(raw);
  });
  /* back/forward cache: never show a stuck curtain */
  window.addEventListener('pageshow', function (e) { if (e.persisted) { curtain.style.visibility = 'hidden'; } });

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
      ScrollTrigger.create({ trigger: el, start: 'top 86%', once: true, onEnter: function () {
        gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.25, ease: 'power4.inOut' });
        if (img) gsap.to(img, { scale: 1, duration: 1.7, ease: 'power3.out' });
      } });
    });
    ScrollTrigger.batch('[data-rise]', { start: 'top 90%', once: true, onEnter: function (els) {
      gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .07, overwrite: true });
    } });
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

  /* ---------- generic rotating set (quotes, captions) ---------- */
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
    var run = function () {
      if (spans && canAnim) gsap.to(spans, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: .1, delay: .05 });
    };
    A.arrive(run);
    A.smooth();
    A.reveals();
  };
})();
