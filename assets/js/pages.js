/* ADEPA HOUSE — services, lookbook and about pages. */
(function () {
  'use strict';
  var A = window.ADEPA, anim = A.canAnim, IMG = 'assets/img/';
  var page = document.body.dataset.page;

  /* ================= SERVICES ================= */
  if (page === 'services') {
    var SIDE = { women: ['work-braiding-2.jpg', 'Braids being put in at the salon'], men: ['him-clipper-cut.jpg', 'A barber cutting a client’s hair with clippers'], kids: ['kid-girl-braids-top.jpg', 'A child’s freshly parted braids, seen from above'], beauty: ['nails-polish.jpg', 'Polish being applied during a manicure'] };
    document.getElementById('svcTabs').innerHTML = A.groups.map(function (g) {
      return '<a class="tab" href="#' + g.id + '">' + g.name + '</a>';
    }).join('');
    document.getElementById('svcList').innerHTML = A.groups.map(function (g) {
      return '<section class="menu-sec" id="' + g.id + '">' +
        '<div class="menu-sec__side"><h2 class="d-l" data-lines>' + g.name.replace(' and ', '<br>and ') + '</h2><p class="muted">' + g.blurb + '</p>' +
          '<div class="ph" data-unmask><img src="' + IMG + SIDE[g.id][0] + '" alt="' + SIDE[g.id][1] + '" loading="lazy"></div></div>' +
        '<div>' + g.items.map(function (it) {
          return '<article class="price"><h3>' + it.name + '</h3><b>' + (it.from ? '<small>from</small>' : '') + A.money(it.price) + '</b>' +
            '<p>' + it.note + '</p>' +
            '<div class="price__row"><span>About ' + A.dur(it.mins) + '</span><a href="book.html?svc=' + it.id + '">Book this</a></div></article>';
        }).join('') + '</div></section>';
    }).join('');

    /* highlight the tab for the section in view */
    var tabs = Array.prototype.slice.call(document.querySelectorAll('#svcTabs .tab'));
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          tabs.forEach(function (t) { t.setAttribute('aria-pressed', String(t.getAttribute('href') === '#' + en.target.id)); });
        });
      }, { rootMargin: '-35% 0px -55% 0px' });
      document.querySelectorAll('.menu-sec').forEach(function (s) { io.observe(s); });
    }
  }

  /* ================= LOOKBOOK ================= */
  if (page === 'lookbook') {
    var SHOTS = [
      ['her-knotless', 'Knotless braids', 'women', 'w7'], ['him-fade-beard', 'Skin fade and beard', 'men', 'm3'],
      ['kid-girl-long-braids', 'Girl’s long braids', 'kids', 'k4'], ['her-afro', 'Shaped afro', 'women', 'w14'],
      ['him-high-top', 'High-top', 'men', 'm6'], ['nails-gel-dark', 'Gel manicure', 'beauty', 'b2'],
      ['her-braided-bun', 'Braided bun', 'women', 'w6'], ['kid-boy-cornrows', 'Boy’s cornrows', 'kids', 'k3'],
      ['him-locs', 'Locs', 'men', 'm9'], ['her-jumbo-braids', 'Jumbo braids', 'women', 'w8'],
      ['him-waves', 'Waves', 'men', 'm7'], ['beauty-makeup', 'Soft glam make-up', 'beauty', 'b9'],
      ['her-box-braids', 'Box braids', 'women', 'w6'], ['him-low-cut', 'Low cut', 'men', 'm1'],
      ['kid-girl-cornrows', 'Girl’s cornrows', 'kids', 'k3'], ['her-blonde-crop', 'Blonde crop', 'women', 'w13'],
      ['him-starter-locs', 'Starter locs', 'men', 'm8'], ['her-faux-locs-smile', 'Faux locs', 'women', 'w9'],
      ['nails-red', 'Classic red manicure', 'beauty', 'b1'], ['him-colour', 'Hair colour', 'men', 'm10'],
      ['her-stitch-cornrows', 'Stitch braids', 'women', 'w5'], ['kid-boy-low-cut', 'Boy’s haircut', 'kids', 'k1'],
      ['her-sleek-ponytail', 'Sleek ponytail', 'women', 'w2'], ['him-razor-lineup', 'Razor line-up', 'men', 'm4'],
      ['her-afro-red', 'Full afro', 'women', 'w3'], ['kid-girl-braids-top', 'Kids’ braids', 'kids', 'k4'],
      ['her-cornrow-braids', 'Cornrows into braids', 'women', 'w5'], ['her-braided-updo', 'Braided updo', 'women', 'w6'],
      ['her-blonde-fringe', 'Blonde fringe', 'women', 'w13'], ['her-faux-locs', 'Long faux locs', 'women', 'w9']
    ];
    var grid = document.getElementById('lbGrid');
    grid.innerHTML = SHOTS.map(function (s, i) {
      return '<button data-i="' + i + '" data-who="' + s[2] + '" aria-label="Open photo: ' + s[1] + '"><img src="' + IMG + 's/' + s[0] + '.jpg" alt="' + s[1] + '" loading="lazy"><span>' + s[1] + '</span></button>';
    }).join('');
    var cells = Array.prototype.slice.call(grid.children);
    var visible = cells.slice();
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

    /* lightbox */
    var box = document.getElementById('lightbox'), img = document.getElementById('lbImg');
    var nameEl = document.getElementById('lbName'), bookEl = document.getElementById('lbBook');
    var at = 0, lastFocus = null;
    function show(n) {
      at = (n + visible.length) % visible.length;
      var s = SHOTS[+visible[at].dataset.i];
      img.src = IMG + s[0] + '.jpg'; img.alt = s[1];
      nameEl.textContent = s[1];
      bookEl.href = 'book.html?svc=' + s[3];
      if (anim) gsap.fromTo(img, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .45, ease: 'power3.out' });
    }
    function close() { box.classList.remove('is-open'); document.body.classList.remove('is-locked'); if (lastFocus) lastFocus.focus(); }
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      lastFocus = b; box.classList.add('is-open'); document.body.classList.add('is-locked');
      show(visible.indexOf(b)); document.getElementById('lbClose').focus();
    });
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { show(at - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(at + 1); });
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
    document.getElementById('teamAll').innerHTML = A.team.map(function (p) {
      return '<article class="person"><div class="ph" data-unmask><img src="' + IMG + 's/' + p.img + '" alt="' + p.name + '" loading="lazy"></div><h3>' + p.name + '</h3><p>' + p.role + '</p></article>';
    }).join('');
  }

  A.pageIn();
})();
