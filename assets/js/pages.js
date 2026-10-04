/* ADEPA HOUSE — the menu, the boutique, the lookbook and the house. */
(function () {
  'use strict';
  var A = window.ADEPA, anim = A.canAnim, IMG = 'assets/img/';
  var page = document.body.dataset.page;
  function $(id) { return document.getElementById(id); }

  /* bring freshly drawn cards in with a short stagger */
  function cardsIn(cards) {
    A.syncAdds();
    if (!anim) return;
    gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .05, clearProps: 'transform,opacity' });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  /* if the reader is far down the list, lift them back to the top of it */
  function backToList(anchor) {
    var top = anchor.getBoundingClientRect().top + window.scrollY - 180;
    if (window.scrollY > top + 40) { if (A.lenis) A.lenis.scrollTo(top); else window.scrollTo({ top: top, behavior: 'smooth' }); }
  }

  /* ================= THE MENU ================= */
  if (page === 'services') {
    var current = null, sub = 'All';
    $('seg').innerHTML = A.groups.map(function (g) {
      return '<button type="button" data-g="' + g.id + '" aria-pressed="false">' + (g.tab || g.short) + ' <small>' + g.items.length + '</small></button>';
    }).join('');

    function card(it) {
      return '<article class="svc-card" data-sub="' + it.sub + '">' +
        '<div class="ph"><img src="' + IMG + 's/' + it.img + '" alt="' + it.name + '" loading="lazy"><span class="chip-on-img">About ' + A.dur(it.mins) + '</span></div>' +
        '<div class="card__body"><h3>' + it.name + '</h3><p>' + it.note + '</p>' +
        '<div class="card__foot"><span class="price">' + (it.from ? '<small>from</small>' : '') + A.money(it.price) + '</span>' + A.addBtn('svc', it.id) + '</div></div></article>';
    }
    function drawGrid() {
      var g = A.groups.filter(function (x) { return x.id === current; })[0];
      var items = g.items.filter(function (it) { return sub === 'All' || it.sub === sub; });
      $('svcGrid').innerHTML = items.map(card).join('');
      cardsIn($('svcGrid').children);
    }
    function select(gid, fromUser) {
      var g = A.groups.filter(function (x) { return x.id === gid; })[0] || A.groups[0];
      current = g.id; sub = 'All';
      $('seg').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.g === g.id)); });
      $('gName').textContent = g.name;
      $('gBlurb').textContent = g.blurb;
      $('chips').innerHTML = ['All'].concat(g.subs).map(function (s) {
        return '<button type="button" class="chip" aria-pressed="' + (s === 'All') + '" data-sub="' + s + '">' + s + '</button>';
      }).join('');
      drawGrid();
      if (fromUser) { history.replaceState(null, '', '#' + g.id); backToList($('gName')); }
    }
    $('seg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) select(b.dataset.g, true); });
    $('chips').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      sub = b.dataset.sub;
      $('chips').querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
      drawGrid();
    });
    window.addEventListener('hashchange', function () { select(location.hash.slice(1), false); });
    select(location.hash.slice(1), false);
  }

  /* ================= THE BOUTIQUE ================= */
  if (page === 'shop') {
    var cat = 'all';
    var PAIR = { w8: ['Add the install', 'Install added'], w9: ['Add wig construction', 'Construction added'], w3: ['Add a scalp ritual', 'Scalp ritual added'], w1: ['Add a silk press', 'Silk press added'], m5: ['Add a beard sculpt', 'Beard sculpt added'] };
    $('shopSeg').innerHTML = [{ id: 'all', name: 'Everything' }].concat(A.shopCats).map(function (c) {
      var n = c.id === 'all' ? A.products.length : A.products.filter(function (p) { return p.cat === c.id; }).length;
      return '<button type="button" data-c="' + c.id + '" aria-pressed="' + (c.id === 'all') + '">' + c.name + ' <small>' + n + '</small></button>';
    }).join('');
    function drawShop() {
      var list = A.products.filter(function (p) { return cat === 'all' || p.cat === cat; });
      $('shopGrid').innerHTML = list.map(function (p) {
        var c = A.shopCats.filter(function (x) { return x.id === p.cat; })[0];
        var pair = p.pair ? A.find(p.pair) : null;
        return '<article class="prod glass"><div class="ph"><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"><span class="chip-on-img">' + c.name + '</span></div>' +
          '<div class="card__body"><h3>' + p.name + '</h3><p>' + p.note + '</p>' +
          (pair ? '<p class="prod__pair"><button type="button" data-add-svc="' + pair.item.id + '" data-label="' + (PAIR[pair.item.id] ? PAIR[pair.item.id][0] : 'Add ' + pair.item.name) + '" data-on="' + (PAIR[pair.item.id] ? PAIR[pair.item.id][1] : pair.item.name + ' added') + '"></button></p>' : '') +
          '<div class="card__foot"><span class="price">' + A.money(p.price) + '</span>' + A.addBtn('prod', p.id) + '</div></div></article>';
      }).join('');
      cardsIn($('shopGrid').children);
    }
    $('shopSeg').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      cat = b.dataset.c;
      $('shopSeg').querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      drawShop(); backToList($('shopGrid'));
    });
    drawShop();
  }

  /* ================= LOOKBOOK ================= */
  if (page === 'lookbook') {
    /* every photograph is tied to the treatment that produces it */
    var ORDER = ['w1', 'm4', 'w5', 'k1', 'b9', 'w13', 'm2', 'w8', 'k3', 'b2', 'w7', 'm3', 'w12', 'k2', 'b8',
      'w2', 'm10', 'w4', 'k4', 'b4', 'w11', 'm1', 'w15', 'k6', 'b10', 'w10', 'm5', 'w9', 'b7', 'w14'];
    var SHOTS = ORDER.map(function (id) { var f = A.find(id); return [f.item.img, f.item.name, f.group.id, id]; });
    SHOTS.splice(9, 0, ['lx-pearl-bun.jpg', 'Pearl chignon', 'women', 'w14']);
    SHOTS.splice(20, 0, ['lx-glow.jpg', 'Bridal glow', 'beauty', 'b10']);

    var grid = $('lbGrid');
    grid.innerHTML = SHOTS.map(function (s, i) {
      return '<button data-i="' + i + '" data-who="' + s[2] + '" aria-label="Open photo: ' + s[1] + '"><img src="' + IMG + 's/' + s[0] + '" alt="' + s[1] + '" loading="lazy"><span>' + s[1] + '</span></button>';
    }).join('');
    var cells = Array.prototype.slice.call(grid.children), visible = cells.slice();
    var lbTabs = Array.prototype.slice.call(document.querySelectorAll('#lbTabs .tab'));
    lbTabs.forEach(function (t) {
      t.addEventListener('click', function () {
        lbTabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
        var who = t.dataset.who;
        visible = cells.filter(function (c) { return who === 'all' || c.dataset.who === who; });
        var swap = function () { cells.forEach(function (c) { c.style.display = visible.indexOf(c) > -1 ? '' : 'none'; }); };
        if (!anim) { swap(); return; }
        gsap.to(cells, { opacity: 0, duration: .2, overwrite: true, onComplete: function () {
          swap();
          gsap.fromTo(visible, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .035, clearProps: 'transform' });
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        } });
      });
    });
    if (anim && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(cells, { opacity: 0, y: 36 });
      ScrollTrigger.batch(cells, { start: 'top 94%', once: true, onEnter: function (b) {
        gsap.to(b, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .06, clearProps: 'transform' });
      } });
    }

    var box = $('lightbox'), img = $('lbImg'), at = 0, lastFocus = null;
    function show(n) {
      at = (n + visible.length) % visible.length;
      var s = SHOTS[+visible[at].dataset.i];
      img.src = IMG + s[0]; img.alt = s[1];
      $('lbName').textContent = s[1];
      $('lbAdd').dataset.addSvc = s[3];
      A.syncAdds();
      if (anim) gsap.fromTo(img, { opacity: 0, scale: .97 }, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out' });
    }
    function close() { box.classList.remove('is-open'); document.body.classList.remove('is-locked'); if (lastFocus) lastFocus.focus(); }
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      lastFocus = b; box.classList.add('is-open'); document.body.classList.add('is-locked');
      show(visible.indexOf(b)); $('lbClose').focus();
    });
    $('lbClose').addEventListener('click', close);
    $('lbPrev').addEventListener('click', function () { show(at - 1); });
    $('lbNext').addEventListener('click', function () { show(at + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.tagName === 'FIGURE') close(); });
    window.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(at + 1);
      if (e.key === 'ArrowLeft') show(at - 1);
    });
  }

  /* ================= THE HOUSE ================= */
  if (page === 'about') {
    $('teamAll').innerHTML = A.team.map(function (p) {
      return '<article class="person"><div class="ph" data-unmask><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"></div><div class="person__plate glass-d"><h3>' + p.name + '</h3><p>' + p.role + '</p></div></article>';
    }).join('');
  }

  A.pageIn();
})();
