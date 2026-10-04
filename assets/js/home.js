/* ADEPA HOUSE — home: intro, photo wall, doors, style chart, slideshow, quotes, hours. */
(function () {
  'use strict';
  var A = window.ADEPA, anim = A.canAnim;
  var IMG = 'assets/img/';

  /* ---------- photo wall ---------- */
  var WALL = ['him-barber-at-work', 'her-box-braids', 'kid-girl-long-braids', 'him-fade-beard',
    'her-afro', 'kid-boy-cornrows', 'her-jumbo-braids', 'him-high-top',
    'her-faux-locs', 'him-waves', 'her-braided-bun', 'kid-boy-toddler',
    'him-low-cut', 'her-knotless', 'him-locs', 'her-afro-red'];
  var wall = document.getElementById('wall');
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
      gsap.fromTo(t, { yPercent: down ? -50 : 0 }, { yPercent: down ? 0 : -50, duration: [58, 72, 64, 80, 68][i % 5], ease: 'none', repeat: -1 });
    });
    if (window.matchMedia('(pointer: fine)').matches) {
      var wx = gsap.quickTo(wall, 'x', { duration: 1.4, ease: 'power2' });
      var wy = gsap.quickTo(wall, 'y', { duration: 1.4, ease: 'power2' });
      window.addEventListener('mousemove', function (e) {
        wx((e.clientX / window.innerWidth - .5) * -26);
        wy((e.clientY / window.innerHeight - .5) * -18);
      });
    }
  } else {
    tracks.forEach(function (t, i) { t.style.transform = 'translateY(' + (i % 2 ? -22 : -8) + '%)'; });
  }

  /* ---------- opening status ---------- */
  (function () {
    var s = A.openNow(), dot = document.getElementById('statusDot'), txt = document.getElementById('statusText');
    if (s.open) txt.textContent = 'Open now, until ' + A.clock(s.to);
    else {
      dot.classList.add('is-shut');
      var now = new Date(), h = now.getHours();
      if (h < s.from) txt.textContent = 'Opens today at ' + A.clock(s.from);
      else { var t = new Date(now); t.setDate(t.getDate() + 1); txt.textContent = 'Closed. Opens ' + A.clock(A.hours[t.getDay()][0]) + ' tomorrow'; }
    }
  })();

  /* ---------- intro + hero entrance ---------- */
  var intro = document.getElementById('intro');
  var titleSpans = A.split(document.getElementById('heroTitle'));
  var rest = ['#heroSub', '#heroCta', '#status'];
  function heroIn(delay) {
    if (!anim) return;
    gsap.set(titleSpans, { yPercent: 108 });
    gsap.set(rest, { opacity: 0, y: 18 }); gsap.set('.nav', { opacity: 0 });
    gsap.timeline({ delay: delay || 0 })
      .to(titleSpans, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: .12 })
      .to(rest, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08, clearProps: 'transform' }, '-=.75')
      .to('.nav', { opacity: 1, duration: .8 }, '<');
  }
  var seen = false;
  try { seen = sessionStorage.getItem('adepa-intro') === '1'; } catch (e) {}
  var came = A.arrive(null);

  if (!anim || seen || came) {
    intro.style.display = 'none';
    heroIn(came ? .45 : .1);
  } else {
    try { sessionStorage.setItem('adepa-intro', '1'); } catch (e) {}
    var word = document.getElementById('introWord');
    'ADEPA'.split('').forEach(function (ch) { var s = document.createElement('span'); s.textContent = ch; word.appendChild(s); });
    var letters = word.querySelectorAll('span');
    var halves = intro.querySelectorAll('.intro__half');
    gsap.set(titleSpans, { yPercent: 108 });
    gsap.set(rest, { opacity: 0, y: 18 }); gsap.set('.nav', { opacity: 0 });
    document.body.classList.add('is-locked');
    var tl = gsap.timeline({ onComplete: function () { intro.style.display = 'none'; document.body.classList.remove('is-locked'); } });
    tl.fromTo(letters, { yPercent: 110, y: 0 }, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: .07 }, .25)
      .to('#introRule', { scaleX: 1, duration: .8, ease: 'power3.inOut' }, .75)
      .to('#introSub', { opacity: 1, duration: .6 }, 1.15)
      .to('.intro__in', { opacity: 0, y: -24, duration: .5, ease: 'power2.in' }, 2.35)
      .to(halves[0], { yPercent: -101, duration: 1.05, ease: 'power4.inOut' }, 2.7)
      .to(halves[1], { yPercent: 101, duration: 1.05, ease: 'power4.inOut' }, 2.7)
      .add(function () { heroIn(0); }, 3.05);
    intro.addEventListener('click', function () { tl.progress(1); heroIn(0); });
  }

  /* ---------- running line: duplicate for a seamless loop ---------- */
  var run = document.getElementById('run');
  run.innerHTML += run.innerHTML;

  /* ---------- doors ---------- */
  var doors = Array.prototype.slice.call(document.querySelectorAll('.door'));
  doors.forEach(function (d) {
    function on() { doors.forEach(function (x) { x.classList.toggle('is-on', x === d); }); }
    d.addEventListener('mouseenter', on);
    d.addEventListener('focusin', on);
    d.addEventListener('click', on);
  });

  /* ---------- style chart ---------- */
  var chart = document.getElementById('chart');
  function lookHTML(l) {
    var f = A.find(l.svc);
    return '<a class="look" href="book.html?svc=' + l.svc + '" data-who="' + l.who + '">' +
      '<div class="ph"><img src="' + IMG + 's/' + l.img + '" alt="' + l.name + '" loading="lazy">' +
      '<span class="look__no">' + l.no + '</span><span class="look__go">Book number ' + l.no + '</span></div>' +
      '<div class="look__meta"><h3>' + l.name + '</h3><span>' + (f.item.from ? 'from ' : '') + A.money(f.item.price) + '</span></div></a>';
  }
  chart.innerHTML = A.looks.map(lookHTML).join('');
  var tiles = Array.prototype.slice.call(chart.children);
  var tabs = Array.prototype.slice.call(document.querySelectorAll('#chartTabs .tab'));
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
      var who = t.dataset.who;
      var show = tiles.filter(function (el) { return who === 'all' || el.dataset.who === who; });
      if (!anim) { tiles.forEach(function (el) { el.style.display = show.indexOf(el) > -1 ? '' : 'none'; }); return; }
      gsap.to(tiles, { opacity: 0, y: 14, duration: .22, ease: 'power2.in', overwrite: true, onComplete: function () {
        tiles.forEach(function (el) { el.style.display = show.indexOf(el) > -1 ? '' : 'none'; });
        gsap.fromTo(show, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out', stagger: .05, clearProps: 'transform' });
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      } });
    });
  });
  if (anim && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(tiles, { opacity: 0, y: 40 });
    ScrollTrigger.batch(tiles, { start: 'top 92%', once: true, onEnter: function (b) {
      gsap.to(b, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .07, clearProps: 'transform' });
    } });
  }

  /* ---------- team ---------- */
  document.getElementById('team').innerHTML = A.team.slice(0, 3).map(function (p) {
    return '<article class="person"><div class="ph" data-unmask><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"></div><h3>' + p.name + '</h3><p>' + p.role + '</p></article>';
  }).join('');

  /* ---------- slideshow ---------- */
  (function () {
    var root = document.getElementById('show');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.show__slide'));
    var caps = Array.prototype.slice.call(root.querySelectorAll('#showCap > div'));
    var ticks = Array.prototype.slice.call(root.querySelectorAll('#showTicks i'));
    var count = document.getElementById('showCount');
    var i = 0, timer, DUR = 6500, busy = false;
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
      gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.5, ease: 'power3.out' });
      gsap.to(from.querySelector('img'), { scale: 1.08, duration: 1.1, ease: 'power2.inOut' });
      gsap.to(to, { clipPath: 'inset(0 0% 0 0%)', duration: 1.1, ease: 'power4.inOut', onComplete: function () {
        from.classList.remove('is-on'); to.classList.add('is-on');
        gsap.set([from, to], { clearProps: 'all' }); gsap.set(from.querySelector('img'), { clearProps: 'all' });
        busy = false;
      } });
    }
    function arm() { clearTimeout(timer); timer = setTimeout(function () { go(i + 1, 1); }, DUR); }
    document.getElementById('showNext').addEventListener('click', function () { go(i + 1, 1); });
    document.getElementById('showPrev').addEventListener('click', function () { go(i - 1, -1); });
    var sx = null, stage = root.querySelector('.show__stage');
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
    paint();
    /* only run the clock while the slideshow is on screen */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { root.classList.remove('is-paused'); paint(); arm(); }
        else { root.classList.add('is-paused'); clearTimeout(timer); }
      }, { threshold: .35 }).observe(root);
    } else arm();
  })();

  /* ---------- quotes ---------- */
  A.rotator(
    Array.prototype.slice.call(document.querySelectorAll('#quotes .quote')),
    Array.prototype.slice.call(document.querySelectorAll('#quoteDots button')), 7000);

  /* ---------- hours ---------- */
  (function () {
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date().getDay(), order = [1, 2, 3, 4, 5, 6, 0];
    document.getElementById('hours').innerHTML = order.map(function (d) {
      return '<li' + (d === today ? ' class="is-today"' : '') + '><span>' + names[d] + '</span><span>' + A.clock(A.hours[d][0]) + ' to ' + A.clock(A.hours[d][1]) + '</span></li>';
    }).join('');
  })();

  A.smooth();
  A.reveals();
})();
