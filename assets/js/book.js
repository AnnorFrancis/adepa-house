/* ADEPA HOUSE — checkout. Reads the bag (services + products) and walks through:
   services, stylist, time, shop items (collect or deliver), details, payment. */
(function () {
  'use strict';
  var A = window.ADEPA, anim = A.canAnim, IMG = 'assets/img/s/';
  var $ = function (id) { return document.getElementById(id); };
  var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var st = { staff: 'any', day: null, slot: null, ful: null, pay: null, pickGroup: 'women' };

  /* ?svc=w7 from a lookbook photo or an old link: add it, then tidy the address bar */
  var m = location.search.match(/[?&]svc=([a-z]\d+)/);
  if (m && A.find(m[1])) { A.bag.addSvc(m[1]); history.replaceState(null, '', 'book.html'); }

  function opt(html, pressed, attrs) {
    return '<button type="button" class="opt" aria-pressed="' + (pressed ? 'true' : 'false') + '" ' + (attrs || '') + '>' + html + '</button>';
  }
  function fmtTime(h) { return (h % 12 || 12) + ':00 ' + (h >= 12 ? 'pm' : 'am'); }
  function fmtDay(d) { return DAY[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()]; }

  /* ---------- derived state from the bag ---------- */
  function model() {
    var b = A.bag.get();
    var svcs = b.s.map(A.find).filter(Boolean);
    var prods = Object.keys(b.p).map(function (id) { var p = A.product(id); return p ? { p: p, q: b.p[id] } : null; }).filter(Boolean);
    var groups = {};
    svcs.forEach(function (f) { groups[f.group.id] = (groups[f.group.id] || 0) + f.item.mins; });
    var gids = Object.keys(groups);
    /* different people sit in different chairs at the same time, so a family visit
       takes as long as the longest person's list, not the sum of everyone's */
    var mins = gids.reduce(function (mx, g) { return Math.max(mx, groups[g]); }, 0);
    var svcTotal = svcs.reduce(function (n, f) { return n + f.item.price; }, 0);
    var prodTotal = prods.reduce(function (n, x) { return n + x.p.price * x.q; }, 0);
    var from = svcs.some(function (f) { return f.item.from; });
    return { svcs: svcs, prods: prods, gids: gids, mins: mins, svcTotal: svcTotal, prodTotal: prodTotal, from: from };
  }

  /* ---------- 1. services ---------- */
  function drawServices(M) {
    $('svcLines').innerHTML = M.svcs.map(function (f) {
      return '<div class="line"><img src="' + IMG + f.item.img + '" alt=""><div><b>' + f.item.name + '</b><small>' + f.group.name + ', about ' + A.dur(f.item.mins) + '</small></div>' +
        '<div class="end">' + (f.item.from ? 'from ' : '') + A.money(f.item.price) + '<button type="button" class="bag__rm" data-rm="' + f.item.id + '">Remove</button></div></div>';
    }).join('');
    $('svcHint').textContent = !M.svcs.length
      ? (M.prods.length ? 'No treatments yet. Only shopping the boutique? Go straight to your pieces below.' : 'Nothing chosen yet. Add a treatment below.')
      : M.gids.length > 1 ? 'Reserving for the family? We seat you side by side, so everyone is finished at about the same time.' : 'Add anything else you would like at the same visit.';
    if (!M.svcs.length && !M.prods.length) $('svcMore').open = true;
    $('pickGroup').innerHTML = A.groups.map(function (g) {
      return '<button type="button" class="tab" data-g="' + g.id + '" aria-pressed="' + (st.pickGroup === g.id) + '">' + (g.tab || g.short) + '</button>';
    }).join('');
    var g = A.groups.filter(function (x) { return x.id === st.pickGroup; })[0];
    var inBag = A.bag.get().s;
    $('pickSvc').innerHTML = g.items.map(function (it) {
      return opt('<b>' + it.name + '</b><span>' + (it.from ? 'from ' : '') + A.money(it.price) + ', about ' + A.dur(it.mins) + '</span>', inBag.indexOf(it.id) > -1, 'data-s="' + it.id + '"');
    }).join('');
  }
  $('svcLines').addEventListener('click', function (e) { var r = e.target.closest('[data-rm]'); if (r) A.bag.removeSvc(r.dataset.rm); });
  $('pickGroup').addEventListener('click', function (e) { var b = e.target.closest('[data-g]'); if (b) { st.pickGroup = b.dataset.g; render(); } });
  $('pickSvc').addEventListener('click', function (e) {
    var b = e.target.closest('[data-s]'); if (!b) return;
    if (A.bag.has(b.dataset.s)) A.bag.removeSvc(b.dataset.s); else A.bag.addSvc(b.dataset.s);
  });

  /* ---------- 2. stylist ---------- */
  function drawStaff(M) {
    var list = M.gids.length === 1 ? A.team.filter(function (p) { return p.does.indexOf(M.gids[0]) > -1; }) : [];
    if (st.staff !== 'any' && !list.some(function (p) { return p.id === st.staff; })) st.staff = 'any';
    $('pickStaff').innerHTML =
      opt('<b>First available</b><span>' + (M.gids.length > 1 ? 'Your party, side by side' : 'Shortest wait') + '</span>', st.staff === 'any', 'data-p="any"') +
      list.map(function (p) { return opt('<b>' + p.name + '</b><span>' + p.role + '</span>', st.staff === p.id, 'data-p="' + p.id + '"'); }).join('');
  }
  $('pickStaff').addEventListener('click', function (e) { var b = e.target.closest('[data-p]'); if (b) { st.staff = b.dataset.p; render(); } });

  /* ---------- 3. day + time ---------- */
  var days = [];
  for (var i = 0; i < 14; i++) { var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); days.push(d); }
  /* a stable pattern of taken times, so the demo diary looks like a working one */
  function taken(dayIdx, hour) {
    var d = days[dayIdx];
    return (d.getDate() * 31 + d.getMonth() * 17 + hour * 7 + st.staff.length * 3) % 10 < 3;
  }
  function slotsFor(dayIdx, mins) {
    var d = days[dayIdx], h = A.hours[d.getDay()], now = new Date(), out = [];
    var last = h[1] - Math.ceil(mins / 60);
    for (var t = h[0]; t <= last; t++) out.push({ t: t, off: (dayIdx === 0 && t <= now.getHours()) || taken(dayIdx, t) });
    return out;
  }
  function hasFree(dayIdx, mins) { return slotsFor(dayIdx, mins).some(function (s) { return !s.off; }); }
  function drawTime(M) {
    if (st.day === null) {
      st.day = 0;
      for (var i = 0; i < days.length; i++) { if (hasFree(i, M.mins)) { st.day = i; break; } }
    }
    $('timeHint').textContent = 'Your visit takes about ' + A.dur(M.mins) + '.';
    $('pickDay').innerHTML = days.map(function (d, i) {
      var top = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : DAY[d.getDay()];
      return opt('<b>' + top + '</b><span>' + d.getDate() + ' ' + MON[d.getMonth()] + '</span>', st.day === i, 'data-d="' + i + '"');
    }).join('');
    var slots = slotsFor(st.day, M.mins);
    if (st.slot !== null && !slots.some(function (s) { return s.t === st.slot && !s.off; })) st.slot = null;
    $('pickSlot').innerHTML = hasFree(st.day, M.mins)
      ? slots.map(function (s) { return opt('<b>' + fmtTime(s.t) + '</b>', st.slot === s.t, 'data-t="' + s.t + '"' + (s.off ? ' disabled' : '')); }).join('')
      : '<p class="bk__empty" style="grid-column:1/-1">Nothing left on this day for a visit this long. Try the next day.</p>';
  }
  $('pickDay').addEventListener('click', function (e) { var b = e.target.closest('[data-d]'); if (b) { st.day = +b.dataset.d; st.slot = null; render(); } });
  $('pickSlot').addEventListener('click', function (e) { var b = e.target.closest('[data-t]'); if (b && !b.disabled) { st.slot = +b.dataset.t; render(); } });

  /* ---------- 4. shop items ---------- */
  function drawProducts(M) {
    $('prodLines').innerHTML = M.prods.map(function (x) {
      return '<div class="line"><img src="' + IMG + x.p.img + '" alt=""><div><b>' + x.p.name + '</b><small>' + A.money(x.p.price) + ' each</small></div>' +
        '<div class="end">' + A.money(x.p.price * x.q) + '<span class="qty"><button type="button" data-q="' + x.p.id + '" data-d="-1" aria-label="One less">−</button><span>' + x.q + '</span><button type="button" data-q="' + x.p.id + '" data-d="1" aria-label="One more">+</button></span></div></div>';
    }).join('');
    var opts = M.svcs.length
      ? [['collect', 'Collect at my visit', 'Waiting at your chair']]
      : [['collect', 'Collect at the house', 'Ready within the hour']];
    opts.push(['deliver', 'Courier to me', A.money(A.biz.delivery) + ', anywhere in Accra']);
    if (!st.ful) st.ful = 'collect';
    $('pickFul').innerHTML = opts.map(function (o) { return opt('<b>' + o[1] + '</b><span>' + o[2] + '</span>', st.ful === o[0], 'data-f="' + o[0] + '"'); }).join('');
    $('addrField').hidden = st.ful !== 'deliver';
  }
  $('prodLines').addEventListener('click', function (e) {
    var b = e.target.closest('[data-q]'); if (!b) return;
    A.bag.setQty(b.dataset.q, (A.bag.get().p[b.dataset.q] || 0) + (+b.dataset.d));
  });
  $('pickFul').addEventListener('click', function (e) { var b = e.target.closest('[data-f]'); if (b) { st.ful = b.dataset.f; render(); } });

  /* ---------- 6. payment ---------- */
  function drawPay(M) {
    var deliver = M.prods.length && st.ful === 'deliver';
    var opts = [
      ['salon', M.svcs.length ? 'Settle at the house' : 'Pay when you collect', 'Cash, mobile money or card', deliver],
      ['momo', 'Mobile money now', 'MTN, Telecel or AirtelTigo', false],
      ['card', 'Card now', 'Visa or Mastercard', false]
    ];
    if (!st.pay || (st.pay === 'salon' && deliver)) st.pay = deliver ? 'momo' : 'salon';
    $('pickPay').innerHTML = opts.map(function (o) { return opt('<b>' + o[1] + '</b><span>' + o[2] + '</span>', st.pay === o[0], 'data-pay="' + o[0] + '"' + (o[3] ? ' disabled' : '')); }).join('');
    $('payHint').textContent = deliver ? 'Couriered orders are paid when you order.' : 'This is a demo: no money is taken and no card details are asked for.';
  }
  $('pickPay').addEventListener('click', function (e) { var b = e.target.closest('[data-pay]'); if (b && !b.disabled) { st.pay = b.dataset.pay; render(); } });

  /* ---------- summary + validation ---------- */
  function totals(M) {
    var del = M.prods.length && st.ful === 'deliver' ? A.biz.delivery : 0;
    return { del: del, all: M.svcTotal + M.prodTotal + del };
  }
  function missing(M) {
    if (!M.svcs.length && !M.prods.length) return 'Add a treatment or a boutique piece to begin.';
    if (M.svcs.length && st.slot === null) return 'Pick a day and a time.';
    if (M.prods.length && st.ful === 'deliver' && $('fAddr').value.trim().length < 4) return 'Add the courier address.';
    if ($('fName').value.trim().length < 2 || $('fPhone').value.replace(/\D/g, '').length < 9) return 'Add your name and phone number.';
    return '';
  }
  function drawSlip(M) {
    var T = totals(M), rows = [];
    M.svcs.forEach(function (f) { rows.push([f.item.name, (f.item.from ? 'from ' : '') + A.money(f.item.price)]); });
    M.prods.forEach(function (x) { rows.push([x.p.name + (x.q > 1 ? ' × ' + x.q : ''), A.money(x.p.price * x.q)]); });
    if (T.del) rows.push(['Courier', A.money(T.del)]);
    if (M.svcs.length) {
      var p = st.staff === 'any' ? 'First available' : A.team.filter(function (x) { return x.id === st.staff; })[0].name;
      rows.push(['With', p]);
      rows.push(['When', st.slot !== null ? fmtDay(days[st.day]) + ', ' + fmtTime(st.slot) : 'Not chosen yet']);
    }
    $('slipLines').innerHTML = rows.length ? rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('') : '<div><dt>Nothing chosen yet</dt><dd></dd></div>';
    $('sTotal').textContent = (M.from ? 'from ' : '') + A.money(T.all);
    $('sSplit').textContent = !rows.length ? '' : st.pay === 'salon' ? 'Nothing to pay now. Settle at the house.' : 'Paid now by ' + (st.pay === 'momo' ? 'mobile money' : 'card') + '.';
    var need = missing(M);
    $('bkGo').disabled = !!need;
    $('bkGo').textContent = st.pay === 'salon' ? (M.svcs.length ? 'Confirm reservation' : 'Place order') : 'Pay ' + A.money(T.all);
    $('bkHint').textContent = need || 'All set.';
  }

  /* ---------- render everything, number the visible steps ---------- */
  function render() {
    var M = model();
    drawServices(M);
    $('sStaff').hidden = $('sTime').hidden = !M.svcs.length;
    if (M.svcs.length) { drawStaff(M); drawTime(M); }
    $('sProd').hidden = !M.prods.length;
    if (M.prods.length) drawProducts(M);
    drawPay(M);
    var n = 0;
    ['sSvc', 'sStaff', 'sTime', 'sProd', 'sYou', 'sPay'].forEach(function (id) { if (!$(id).hidden) $(id).querySelector('h2 i').textContent = ++n; });
    drawSlip(M);
  }
  document.addEventListener('bag', render);
  ['fName', 'fPhone', 'fAddr'].forEach(function (id) {
    $(id).addEventListener('input', function () { $(id).classList.remove('is-bad'); drawSlip(model()); });
  });

  /* ---------- confirm ---------- */
  $('bkForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var M = model();
    var name = $('fName'), phone = $('fPhone');
    [name, phone, $('fAddr')].forEach(function (f) { f.classList.remove('is-bad'); });
    if (name.value.trim().length < 2) name.classList.add('is-bad');
    if (phone.value.replace(/\D/g, '').length < 9) phone.classList.add('is-bad');
    if (M.prods.length && st.ful === 'deliver' && $('fAddr').value.trim().length < 4) $('fAddr').classList.add('is-bad');
    var bad = document.querySelector('.field input.is-bad');
    if (bad || missing(M)) { if (bad) bad.focus(); return; }
    if (st.pay === 'salon') finish(M);
    else pay(M, function () { finish(M); });
  });

  function pay(M, done) {
    var T = totals(M), box = $('paying');
    $('payTitle').textContent = st.pay === 'momo' ? 'Check your phone' : 'Opening secure card payment';
    $('payMsg').textContent = st.pay === 'momo'
      ? 'Approve the ' + A.money(T.all) + ' prompt from Adepa House on ' + $('fPhone').value.trim() + '.'
      : 'You would enter your card on the payment provider’s page. In this demo nothing is charged.';
    box.classList.add('is-on');
    setTimeout(function () { $('payTitle').textContent = 'Payment received'; $('payMsg').textContent = 'Thank you.'; }, 2600);
    setTimeout(function () { box.classList.remove('is-on'); done(); }, 3400);
  }

  function finish(M) {
    var T = totals(M), first = $('fName').value.trim().split(' ')[0];
    var ref = 'AH-' + String(new Date().getDate()).padStart(2, '0') + Math.random().toString(36).slice(2, 6).toUpperCase();
    var who = st.staff === 'any' ? 'First available' : A.team.filter(function (x) { return x.id === st.staff; })[0].name;
    var when = M.svcs.length ? fmtDay(days[st.day]) + ', ' + fmtTime(st.slot) : '';
    var rows = [['Reference', ref]];
    if (M.svcs.length) {
      rows.push(['Treatments', M.svcs.map(function (f) { return f.item.name; }).join(', ')]);
      rows.push(['With', who]); rows.push(['When', when]);
    }
    if (M.prods.length) {
      rows.push(['Boutique', M.prods.map(function (x) { return x.p.name + (x.q > 1 ? ' × ' + x.q : ''); }).join(', ')]);
      rows.push([st.ful === 'deliver' ? 'Courier to' : 'Collection', st.ful === 'deliver' ? $('fAddr').value.trim() : (M.svcs.length ? 'At your visit' : 'At the house, ready within the hour')]);
    }
    rows.push(['Total', (M.from ? 'from ' : '') + A.money(T.all)]);
    rows.push(['Payment', st.pay === 'salon' ? 'At the house' : 'Paid by ' + (st.pay === 'momo' ? 'mobile money' : 'card')]);

    $('doneTitle').textContent = M.svcs.length ? 'You are reserved.' : 'Order placed.';
    $('doneLead').textContent = 'Thank you, ' + first + '. ' + (M.svcs.length ? 'Your chair is held for fifteen minutes past the hour. ' : '') + 'We will message ' + $('fPhone').value.trim() + ' to confirm.';
    $('doneCard').innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
    $('doneWa').href = 'https://wa.me/' + A.biz.whatsapp + '?text=' + encodeURIComponent(
      'Hello Adepa House, this is ' + $('fName').value.trim() + '. Reference ' + ref + '. ' +
      (M.svcs.length ? 'Reserved: ' + M.svcs.map(function (f) { return f.item.name; }).join(', ') + ' on ' + when + '. ' : '') +
      (M.prods.length ? 'Shop items: ' + M.prods.map(function (x) { return x.p.name + ' x' + x.q; }).join(', ') + '. ' : ''));

    A.bag.clear();
    $('bookMain').style.display = 'none';
    $('done').classList.add('is-on');
    if (A.lenis) A.lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
    if (anim) gsap.from('#done .done__tick, #done h1, #done p, #done dl, #done .done__cta', { opacity: 0, y: 24, duration: .8, ease: 'power3.out', stagger: .09 });
  }

  render();
  A.pageIn();
})();
