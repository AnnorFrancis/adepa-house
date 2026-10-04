/* ADEPA HOUSE — home: intro, photo wall, rooms, signature rail, slideshow, looks,
   boutique teaser, artists, words, hours. */
(function () {
  'use strict';
  var A = window.ADEPA, anim = A.canAnim;
  var IMG = 'assets/img/';
  function $(id) { return document.getElementById(id); }

  /* ---------- photo wall ---------- */
  var WALL = ['lx-silkpress', 'lx-m-signature', 'lx-k-gent', 'lx-afro', 'lx-pearl-bun', 'lx-m-exec',
    'lx-k-princess', 'lx-pixie', 'lx-glow', 'lx-m-beardcut', 'lx-k-first', 'lx-sleek-bun',
    'lx-b-glam', 'lx-bride-hair', 'lx-m-hottowel', 'lx-boho'];
  var wall = $('wall');
  var cols = window.innerWidth < 900 ? 4 : 5, per = 4, tracks = [];
  for (var c = 0; c < cols; c++) {
    var col = document.createElement('div'); col.className = 'wall__col';
    var track = document.createElement('div'); track.className = 'wall__track';
    var set = [];
    for (var k = 0; k < per; k++) set.push(WALL[(c * 3 + k * 5 + c) % WALL.length]);
    set.concat(set).forEach(function (n) {
      var d = document.createElement('div'); d.className = 'wall__img';
      d.style.backgroundImage = 'url(' + IMG + 's/' + n + '.jpg)';
      track.appendChild(d);
    });
    col.appendChild(track); wall.appendChild(col); tracks.push(track);
  }
  if (anim) {
    tracks.forEach(function (t, i) {
      var down = i % 2 === 1;
      gsap.fromTo(t, { yPercent: down ? -50 : 0 }, { yPercent: down ? 0 : -50, duration: [80, 96, 88, 104, 92][i % 5], ease: 'none', repeat: -1 });
    });
    if (window.matchMedia('(pointer: fine)').matches) {
      var wx = gsap.quickTo(wall, 'x', { duration: 1.8, ease: 'power2' });
      var wy = gsap.quickTo(wall, 'y', { duration: 1.8, ease: 'power2' });
      window.addEventListener('mousemove', function (e) {
        wx((e.clientX / window.innerWidth - .5) * -22);
        wy((e.clientY / window.innerHeight - .5) * -14);
      });
    }
  } else {
    tracks.forEach(function (t, i) { t.style.transform = 'translateY(' + (i % 2 ? -22 : -8) + '%)'; });
  }

  /* ---------- opening status ---------- */
  (function () {
    var s = A.openNow(), dot = $('statusDot'), txt = $('statusText');
    if (s.open) txt.textContent = 'Open now, until ' + A.clock(s.to);
    else {
      dot.classList.add('is-shut');
      var now = new Date();
      if (now.getHours() < s.from) txt.textContent = 'Opens today at ' + A.clock(s.from);
      else { var t = new Date(now); t.setDate(t.getDate() + 1); txt.textContent = 'Closed. Opens ' + A.clock(A.hours[t.getDay()][0]) + ' tomorrow'; }
    }
  })();

  /* ---------- intro + hero entrance ---------- */
  var intro = $('intro');
  var titleSpans = A.split($('heroTitle'));
  var rest = ['#heroPlace', '#heroSub', '#heroCta', '#status'];
  function heroIn(delay) {
    if (!anim) return;
    gsap.set(titleSpans, { yPercent: 108 });
    gsap.set(rest, { opacity: 0, y: 18 }); gsap.set('.nav', { opacity: 0 });
    gsap.timeline({ delay: delay || 0 })
      .to(titleSpans, { yPercent: 0, duration: 1.5, ease: 'power4.out', stagger: .14 })
      .to(rest, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: .1, clearProps: 'transform' }, '-=1')
      .to('.nav', { opacity: 1, duration: 1 }, '<');
  }
  var seen = false;
  try { seen = sessionStorage.getItem('adepa-intro') === '1'; } catch (e) {}
  var came = A.arrive(null);

  if (!anim || seen || came) {
    intro.style.display = 'none';
    heroIn(came ? .45 : .1);
  } else {
    try { sessionStorage.setItem('adepa-intro', '1'); } catch (e) {}
    $('introMark').outerHTML = A.mark('intro__mark');
    var markEl = intro.querySelector('.intro__mark');
    var word = $('introWord');
    'Adepa House'.split('').forEach(function (ch) { var s = document.createElement('span'); s.innerHTML = ch === ' ' ? '&nbsp;' : ch; word.appendChild(s); });
    var letters = word.querySelectorAll('span');
    var halves = intro.querySelectorAll('.intro__half');
    gsap.set(titleSpans, { yPercent: 108 });
    gsap.set(rest, { opacity: 0, y: 18 }); gsap.set('.nav', { opacity: 0 });
    document.body.classList.add('is-locked');
    var tl = gsap.timeline({ onComplete: function () { intro.style.display = 'none'; document.body.classList.remove('is-locked'); } });
    tl.to(markEl.querySelectorAll('circle, path'), { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: .14 }, .1)
      .fromTo(letters, { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: .045 }, .7)
      .to('#introRule', { scaleX: 1, duration: 1, ease: 'power3.inOut' }, 1.3)
      .to('#introSub', { opacity: 1, duration: .8 }, 1.6)
      .to('.intro__in', { opacity: 0, y: -24, duration: .6, ease: 'power2.in' }, 3)
      .to(halves[0], { yPercent: -101, duration: 1.3, ease: 'power4.inOut' }, 3.35)
      .to(halves[1], { yPercent: 101, duration: 1.3, ease: 'power4.inOut' }, 3.35)
      .add(function () { heroIn(0); }, 3.75);
    intro.addEventListener('click', function () { tl.progress(1); });
  }

  /* ---------- rooms ---------- */
  var PICKS = { women: ['w1', 'w4', 'w8', 'w13'], men: ['m1', 'm4', 'm3', 'm10'], kids: ['k1', 'k2', 'k3', 'k4'], beauty: ['b1', 'b4', 'b8', 'b9'] };
  var IMGS = { women: 'lx-pearl-bun', men: 'lx-m-signature', kids: 'lx-k-gent', beauty: 'lx-b-glam' };
  $('doors').innerHTML = A.groups.map(function (g, i) {
    return '<article class="door' + (i === 0 ? ' is-on' : '') + '" tabindex="0">' +
      '<div class="door__img" style="background-image:url(\'' + IMG + IMGS[g.id] + '.jpg\')"></div>' +
      '<div class="door__body"><h3 class="door__name"><span class="door__who">' + g.short + '</span>' + g.name + '</h3>' +
      '<div class="door__more"><div><div class="door__panel glass-d"><ul class="door__list">' +
        PICKS[g.id].map(function (id) { var f = A.find(id); return '<li><span>' + f.item.name + '</span><span>' + (f.item.from ? 'from ' : '') + A.money(f.item.price) + '</span></li>'; }).join('') +
      '</ul><a class="btn btn--champ btn--sm" href="services.html#' + g.id + '">See all ' + g.items.length + ' treatments</a></div></div></div></div></article>';
  }).join('');
  var doors = Array.prototype.slice.call(document.querySelectorAll('.door'));
  doors.forEach(function (d) {
    function on() { doors.forEach(function (x) { x.classList.toggle('is-on', x === d); }); }
    d.addEventListener('mouseenter', on); d.addEventListener('focusin', on); d.addEventListener('click', on);
  });

  /* ---------- signature rail ---------- */
  function svcCard(id) {
    var f = A.find(id), it = f.item;
    return '<article class="svc-card"><div class="ph"><img src="' + IMG + 's/' + it.img + '" alt="' + it.name + '" loading="lazy"><span class="chip-on-img">' + f.group.name + '</span></div>' +
      '<div class="card__body"><h3>' + it.name + '</h3><p>' + it.note + '</p>' +
      '<div class="card__foot"><span class="price">' + (it.from ? '<small>from</small>' : '') + A.money(it.price) + '</span>' + A.addBtn('svc', it.id) + '</div></div></article>';
  }
  var rail = $('rail');
  rail.innerHTML = ['w1', 'm4', 'w5', 'k1', 'b4', 'w13', 'm3', 'b8'].map(svcCard).join('');
  function railStep(dir) { var card = rail.firstElementChild; rail.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' }); }
  $('railPrev').addEventListener('click', function () { railStep(-1); });
  $('railNext').addEventListener('click', function () { railStep(1); });
  function railBar() {
    var max = rail.scrollWidth - rail.clientWidth, vis = Math.min(1, rail.clientWidth / rail.scrollWidth);
    var p = max > 0 ? rail.scrollLeft / max : 0;
    var bar = $('railBar');
    bar.style.width = (vis * 100) + '%';
    bar.style.transform = 'translateX(' + (p * (1 - vis) / vis * 100) + '%)';
  }
  rail.addEventListener('scroll', railBar, { passive: true });
  window.addEventListener('resize', railBar);
  setTimeout(railBar, 50);

  /* ---------- signature looks ---------- */
  var chart = $('chart');
  chart.innerHTML = A.looks.map(function (l) {
    var f = A.find(l.svc);
    return '<article class="look" data-who="' + l.who + '"><div class="ph"><img src="' + IMG + 's/' + l.img + '" alt="' + l.name + '" loading="lazy">' +
      '<button type="button" class="look__add" data-add-svc="' + l.svc + '" data-label="Add to reservation" aria-label="Add ' + l.name + ' to your reservation"></button></div>' +
      '<div class="look__meta"><h3>' + l.name + '</h3><span>' + (f.item.from ? 'from ' : '') + A.money(f.item.price) + '</span></div></article>';
  }).join('');
  var tiles = Array.prototype.slice.call(chart.children);
  var tabs = Array.prototype.slice.call(document.querySelectorAll('#chartTabs .tab'));
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
      var who = t.dataset.who;
      var show = tiles.filter(function (el) { return who === 'all' || el.dataset.who === who; });
      if (!anim) { tiles.forEach(function (el) { el.style.display = show.indexOf(el) > -1 ? '' : 'none'; }); return; }
      gsap.to(tiles, { opacity: 0, y: 14, duration: .25, ease: 'power2.in', overwrite: true, onComplete: function () {
        tiles.forEach(function (el) { el.style.display = show.indexOf(el) > -1 ? '' : 'none'; });
        gsap.fromTo(show, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .06, clearProps: 'transform' });
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      } });
    });
  });

  /* ---------- boutique teaser ---------- */
  $('shopTeaser').innerHTML = ['p1', 'p7', 'p8', 'p15'].map(function (id) {
    var p = A.product(id), cat = A.shopCats.filter(function (c) { return c.id === p.cat; })[0];
    return '<article class="prod glass-d"><div class="ph"><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"><span class="chip-on-img">' + cat.name + '</span></div>' +
      '<div class="card__body"><h3>' + p.name + '</h3><p>' + p.note + '</p><div class="card__foot"><span class="price">' + A.money(p.price) + '</span>' + A.addBtn('prod', p.id) + '</div></div></article>';
  }).join('');

  /* ---------- artists ---------- */
  $('team').innerHTML = A.team.map(function (p) {
    return '<article class="person"><div class="ph" data-unmask><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"></div><div class="person__plate glass-d"><h3>' + p.name + '</h3><p>' + p.role + '</p></div></article>';
  }).join('');

  /* entrance for generated grids */
  if (anim && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    var cards = tiles.concat(Array.prototype.slice.call($('shopTeaser').children), Array.prototype.slice.call(rail.children));
    gsap.set(cards, { opacity: 0, y: 40 });
    ScrollTrigger.batch(cards, { start: 'top 92%', once: true, onEnter: function (b) {
      gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: .08, clearProps: 'transform' });
    } });
  }
  A.syncAdds();

  /* ---------- slideshow ---------- */
  (function () {
    var root = $('show');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.show__slide'));
    var caps = Array.prototype.slice.call(root.querySelectorAll('#showCap > div'));
    var ticks = Array.prototype.slice.call(root.querySelectorAll('#showTicks i'));
    var count = $('showCount');
    var i = 0, timer, DUR = 7000, busy = false;
    root.style.setProperty('--dur', DUR + 'ms');
    function paint() {
      caps.forEach(function (c, k) { c.classList.toggle('is-on', k === i); });
      ticks.forEach(function (t, k) {
        t.classList.remove('is-on'); t.classList.toggle('is-done', k < i);
        if (k === i) { void t.offsetWidth; t.classList.add('is-on'); }
      });
      count.innerHTML = (i + 1) + ' <small>/ ' + slides.length + '</small>';
    }
    function go(n, dir) {
      if (busy) return;
      var from = slides[i]; i = (n + slides.length) % slides.length; var to = slides[i];
      if (from === to) return;
      paint(); arm();
      if (!anim) { from.classList.remove('is-on'); to.classList.add('is-on'); return; }
      busy = true;
      var img = to.querySelector('img');
      gsap.set(to, { visibility: 'visible', opacity: 1, zIndex: 3, clipPath: dir < 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' });
      gsap.fromTo(img, { scale: 1.16 }, { scale: 1, duration: 1.8, ease: 'power3.out' });
      gsap.to(from.querySelector('img'), { scale: 1.06, duration: 1.4, ease: 'power2.inOut' });
      gsap.to(to, { clipPath: 'inset(0 0% 0 0%)', duration: 1.4, ease: 'power4.inOut', onComplete: function () {
        from.classList.remove('is-on'); to.classList.add('is-on');
        gsap.set([from, to], { clearProps: 'all' }); gsap.set(from.querySelector('img'), { clearProps: 'all' });
        busy = false;
      } });
    }
    function arm() { clearTimeout(timer); timer = setTimeout(function () { go(i + 1, 1); }, DUR); }
    $('showNext').addEventListener('click', function () { go(i + 1, 1); });
    $('showPrev').addEventListener('click', function () { go(i - 1, -1); });
    var sx = null, stage = root.querySelector('.show__stage');
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
    paint();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { root.classList.remove('is-paused'); paint(); arm(); }
        else { root.classList.add('is-paused'); clearTimeout(timer); }
      }, { threshold: .35 }).observe(root);
    } else arm();
  })();

  /* ---------- words ---------- */
  A.rotator(
    Array.prototype.slice.call(document.querySelectorAll('#quotes .quote')),
    Array.prototype.slice.call(document.querySelectorAll('#quoteDots button')), 8000);

  /* ---------- hours ---------- */
  (function () {
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date().getDay(), order = [1, 2, 3, 4, 5, 6, 0];
    $('hours').innerHTML = order.map(function (d) {
      return '<li' + (d === today ? ' class="is-today"' : '') + '><span>' + names[d] + '</span><span>' + A.clock(A.hours[d][0]) + ' to ' + A.clock(A.hours[d][1]) + '</span></li>';
    }).join('');
  })();

  A.smooth();
  A.reveals();
})();
