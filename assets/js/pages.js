/* ADEPA HOUSE — services, shop, lookbook and about pages. */
(function () {
  'use strict';
  var A = window.ADEPA, anim = A.canAnim, IMG = 'assets/img/';
  var page = document.body.dataset.page;
  function $(id) { return document.getElementById(id); }

  /* bring freshly drawn cards in with a short stagger */
  function cardsIn(cards) {
    A.syncAdds();
    if (!anim) return;
    gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .045, clearProps: 'transform,opacity' });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  /* if the reader is far down the list, lift them back to the top of it */
  function backToList(anchor) {
    var top = anchor.getBoundingClientRect().top + window.scrollY - 170;
    if (window.scrollY > top + 40) { if (A.lenis) A.lenis.scrollTo(top); else window.scrollTo({ top: top, behavior: 'smooth' }); }
  }

  /* ================= SERVICES ================= */
  if (page === 'services') {
    var current = null, sub = 'All';
    $('seg').innerHTML = A.groups.map(function (g) {
      return '<button type="button" data-g="' + g.id + '" aria-pressed="false">' + g.name + ' <small>' + g.items.length + '</small></button>';
    }).join('');

    function card(it) {
      return '<article class="svc-card glass" data-sub="' + it.sub + '">' +
        '<div class="ph"><img src="' + IMG + 's/' + it.img + '" alt="' + it.name + '" loading="lazy"><span class="svc-card__time">About ' + A.dur(it.mins) + '</span></div>' +
        '<div class="svc-card__body"><h3>' + it.name + '</h3><p>' + it.note + '</p>' +
        '<div class="svc-card__foot"><span class="svc-card__price">' + (it.from ? '<small>from</small>' : '') + A.money(it.price) + '</span>' + A.addBtn('svc', it.id) + '</div></div></article>';
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

  /* ================= SHOP ================= */
  if (page === 'shop') {
    var cat = 'all';
    $('shopSeg').innerHTML = [{ id: 'all', name: 'Everything' }].concat(A.shopCats).map(function (c) {
      var n = c.id === 'all' ? A.products.length : A.products.filter(function (p) { return p.cat === c.id; }).length;
      return '<button type="button" data-c="' + c.id + '" aria-pressed="' + (c.id === 'all') + '">' + c.name + ' <small>' + n + '</small></button>';
    }).join('');
    function drawShop() {
      var list = A.products.filter(function (p) { return cat === 'all' || p.cat === cat; });
      $('shopGrid').innerHTML = list.map(function (p) {
        var c = A.shopCats.filter(function (x) { return x.id === p.cat; })[0];
        var pair = p.pair ? A.find(p.pair) : null;
        return '<article class="prod glass"><div class="ph"><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"><span class="prod__tag">' + c.name + '</span></div>' +
          '<div class="prod__body"><h3>' + p.name + '</h3>' +
          (pair ? '<p class="prod__pair"><button type="button" data-add-svc="' + pair.item.id + '" data-label="Book a ' + pair.item.name.toLowerCase() + ' too"></button></p>' : '') +
          '<div class="prod__row"><span class="prod__price">' + A.money(p.price) + '</span>' + A.addBtn('prod', p.id) + '</div></div></article>';
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
    var SHOTS = [
      ['her-knotless', 'Knotless braids', 'women', 'w7'], ['him-fade-beard', 'Skin fade and beard', 'men', 'm3'],
      ['kid-girl-long-braids', 'Girl’s long braids', 'kids', 'k4'], ['her-afro', 'Shaped afro', 'women', 'w14'],
      ['him-high-top', 'High-top', 'men', 'm6'], ['nails-gel-dark', 'Gel manicure', 'beauty', 'b2'],
      ['her-braided-bun', 'Braided bun', 'women', 'w6'], ['kid-boy-cornrows', 'Boy’s cornrows', 'kids', 'k7'],
      ['him-locs', 'Locs', 'men', 'm9'], ['her-jumbo-braids', 'Jumbo braids', 'women', 'w8'],
      ['him-waves', 'Waves', 'men', 'm7'], ['beauty-makeup', 'Soft glam make-up', 'beauty', 'b9'],
      ['her-box-braids', 'Box braids', 'women', 'w6'], ['him-low-cut', 'Low cut', 'men', 'm1'],
      ['kid-girl-cornrows', 'Girl’s cornrows', 'kids', 'k3'], ['her-blonde-crop', 'Blonde crop', 'women', 'w13'],
      ['him-starter-locs', 'Starter locs', 'men', 'm8'], ['her-faux-locs-smile', 'Faux locs', 'women', 'w9'],
      ['svc-acrylic', 'Acrylic full set', 'beauty', 'b3'], ['him-colour', 'Hair colour', 'men', 'm10'],
      ['her-stitch-cornrows', 'Stitch braids', 'women', 'w5'], ['kid-boy-low-cut', 'Boy’s haircut', 'kids', 'k1'],
      ['svc-silkpress', 'Silk press', 'women', 'w2'], ['svc-cornrows-m', 'Men’s cornrows', 'men', 'm11'],
      ['her-afro-red', 'Full afro', 'women', 'w3'], ['svc-kid-locs', 'Kids’ locs', 'kids', 'k6'],
      ['svc-wig', 'Wig install', 'women', 'w11'], ['svc-lashes', 'Classic lashes', 'beauty', 'b8'],
      ['her-blonde-fringe', 'Blonde fringe', 'women', 'w13'], ['svc-bridal', 'Bridal make-up', 'beauty', 'b10']
    ];
    var grid = $('lbGrid');
    grid.innerHTML = SHOTS.map(function (s, i) {
      return '<button data-i="' + i + '" data-who="' + s[2] + '" aria-label="Open photo: ' + s[1] + '"><img src="' + IMG + 's/' + s[0] + '.jpg" alt="' + s[1] + '" loading="lazy"><span>' + s[1] + '</span></button>';
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
          gsap.fromTo(visible, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out', stagger: .035, clearProps: 'transform' });
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        } });
      });
    });
    if (anim && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(cells, { opacity: 0, y: 36 });
      ScrollTrigger.batch(cells, { start: 'top 94%', once: true, onEnter: function (b) {
        gsap.to(b, { opacity: 1, y: 0, duration: .85, ease: 'power3.out', stagger: .06, clearProps: 'transform' });
      } });
    }

    var box = $('lightbox'), img = $('lbImg'), at = 0, lastFocus = null;
    function show(n) {
      at = (n + visible.length) % visible.length;
      var s = SHOTS[+visible[at].dataset.i];
      img.src = IMG + s[0] + '.jpg'; img.alt = s[1];
      $('lbName').textContent = s[1];
      $('lbAdd').dataset.addSvc = s[3];
      A.syncAdds();
      if (anim) gsap.fromTo(img, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .45, ease: 'power3.out' });
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

  /* ================= ABOUT ================= */
  if (page === 'about') {
    $('teamAll').innerHTML = A.team.map(function (p) {
      return '<article class="person"><div class="ph" data-unmask><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"></div><div class="person__plate glass-d"><h3>' + p.name + '</h3><p>' + p.role + '</p></div></article>';
    }).join('');
  }

  A.pageIn();
})();
