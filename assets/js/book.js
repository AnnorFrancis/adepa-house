/* ADEPA HOUSE — booking: who, service, stylist, time, details. */
(function () {
  'use strict';
  var A = window.ADEPA, anim = A.canAnim;
  var st = { group: null, svc: null, staff: null, day: null, slot: null };
  var $ = function (id) { return document.getElementById(id); };
  var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function opt(html, pressed, attrs) {
    return '<button type="button" class="opt" aria-pressed="' + (pressed ? 'true' : 'false') + '" ' + (attrs || '') + '>' + html + '</button>';
  }
  function unlock(id) {
    var el = $(id);
    if (!el.classList.contains('is-wait')) return;
    el.classList.remove('is-wait');
    if (anim) gsap.from(el.querySelectorAll('.opt, .field'), { opacity: 0, y: 14, duration: .5, ease: 'power3.out', stagger: .025, clearProps: 'all' });
  }
  function fmtTime(h) { var ap = h >= 12 ? 'pm' : 'am'; return (h % 12 || 12) + ':00 ' + ap; }
  function fmtDay(d) { return DAY[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()]; }

  /* ---------- 1. who ---------- */
  function drawWho() {
    $('pickWho').innerHTML = A.groups.map(function (g) {
      return opt('<b>' + g.name + '</b>', st.group === g.id, 'data-g="' + g.id + '"');
    }).join('');
  }
  $('pickWho').addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    if (st.group !== b.dataset.g) { st.group = b.dataset.g; st.svc = null; st.staff = null; }
    drawWho(); drawSvc(); drawStaff(); unlock('s2'); sync();
  });

  /* ---------- 2. service ---------- */
  function drawSvc() {
    var g = A.groups.filter(function (x) { return x.id === st.group; })[0];
    $('pickSvc').innerHTML = g ? g.items.map(function (it) {
      return opt('<b>' + it.name + '</b><span>' + (it.from ? 'from ' : '') + A.money(it.price) + ', about ' + A.dur(it.mins) + '</span>', st.svc === it.id, 'data-s="' + it.id + '"');
    }).join('') : '';
  }
  $('pickSvc').addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    st.svc = b.dataset.s; drawSvc(); unlock('s3'); drawSlots(); sync();
  });

  /* ---------- 3. stylist ---------- */
  function drawStaff() {
    var list = A.team.filter(function (p) { return p.does.indexOf(st.group) > -1; });
    $('pickStaff').innerHTML =
      opt('<b>First available</b><span>Shortest wait</span>', st.staff === 'any', 'data-p="any"') +
      list.map(function (p) { return opt('<b>' + p.name + '</b><span>' + p.role + '</span>', st.staff === p.id, 'data-p="' + p.id + '"'); }).join('');
  }
  $('pickStaff').addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    st.staff = b.dataset.p; drawStaff(); unlock('s4');
    if (st.day === null) {
      /* open on the first day that still has room for this service */
      st.day = 0;
      for (var i = 0; i < days.length; i++) { if (hasFree(i)) { st.day = i; break; } }
    }
    drawDays(); drawSlots(); sync();
  });

  /* ---------- 4. day + time ---------- */
  var days = [];
  for (var i = 0; i < 14; i++) { var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); days.push(d); }
  function drawDays() {
    if (st.day === null) st.day = 0;
    $('pickDay').innerHTML = days.map(function (d, i) {
      var top = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : DAY[d.getDay()];
      return opt('<b>' + top + '</b><span>' + d.getDate() + ' ' + MON[d.getMonth()] + '</span>', st.day === i, 'data-d="' + i + '"');
    }).join('');
  }
  /* A stable pattern of "taken" times so the demo feels like a working diary. */
  function taken(dayIdx, hour) {
    var d = days[dayIdx], seed = (d.getDate() * 31 + d.getMonth() * 17 + hour * 7 + (st.staff ? st.staff.length : 0) * 3) % 10;
    return seed < 3;
  }
  function hasFree(dayIdx) {
    var d = days[dayIdx], h = A.hours[d.getDay()], now = new Date();
    var mins = st.svc ? A.find(st.svc).item.mins : 60, last = h[1] - Math.ceil(mins / 60);
    for (var t = h[0]; t <= last; t++) if (!(dayIdx === 0 && t <= now.getHours()) && !taken(dayIdx, t)) return true;
    return false;
  }
  function drawSlots() {
    if (st.day === null) return;
    var d = days[st.day], h = A.hours[d.getDay()], now = new Date(), html = '', anyFree = false;
    var mins = st.svc ? A.find(st.svc).item.mins : 60;
    var last = h[1] - Math.ceil(mins / 60);
    for (var t = h[0]; t <= last; t++) {
      var past = st.day === 0 && t <= now.getHours();
      var off = past || taken(st.day, t);
      if (!off) anyFree = true;
      if (st.slot === t && off) st.slot = null;
      html += opt('<b>' + fmtTime(t) + '</b>', st.slot === t, 'data-t="' + t + '"' + (off ? ' disabled' : ''));
    }
    $('pickSlot').innerHTML = anyFree ? html : '<p class="muted" style="grid-column:1/-1">Nothing left on this day for a service this long. Try the next day.</p>';
  }
  $('pickDay').addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    st.day = +b.dataset.d; st.slot = null; drawDays(); drawSlots(); sync();
  });
  $('pickSlot').addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b || b.disabled) return;
    st.slot = +b.dataset.t; drawSlots(); unlock('s5'); sync();
  });

  /* ---------- summary ---------- */
  function sync() {
    var g = A.groups.filter(function (x) { return x.id === st.group; })[0];
    var f = st.svc ? A.find(st.svc) : null;
    var p = st.staff === 'any' ? { name: 'First available' } : A.team.filter(function (x) { return x.id === st.staff; })[0];
    $('sWho').textContent = g ? g.name : 'Not chosen yet';
    $('sSvc').textContent = f ? f.item.name : 'Not chosen yet';
    $('sStaff').textContent = p ? p.name : 'Not chosen yet';
    $('sWhen').textContent = st.slot !== null && st.day !== null ? fmtDay(days[st.day]) + ', ' + fmtTime(st.slot) : 'Not chosen yet';
    $('sDur').textContent = f ? A.dur(f.item.mins) : '–';
    $('sTotal').textContent = f ? (f.item.from ? 'from ' : '') + A.money(f.item.price) : '–';
    var ready = g && f && p && st.slot !== null;
    $('bkGo').disabled = !ready;
    $('bkHint').textContent = !g ? 'Choose who the booking is for to begin.'
      : !f ? 'Next, pick a service.'
      : !p ? 'Next, pick who you would like.'
      : st.slot === null ? 'Next, pick a day and a time.'
      : 'Add your name and number, then confirm.';
  }

  /* ---------- confirm ---------- */
  $('bkForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('fName'), phone = $('fPhone'), ok = true;
    [name, phone].forEach(function (f) { f.classList.remove('is-bad'); });
    if (name.value.trim().length < 2) { name.classList.add('is-bad'); ok = false; }
    if (phone.value.replace(/\D/g, '').length < 9) { phone.classList.add('is-bad'); ok = false; }
    if (!ok) { (name.classList.contains('is-bad') ? name : phone).focus(); return; }

    var f = A.find(st.svc);
    var p = st.staff === 'any' ? 'First available' : A.team.filter(function (x) { return x.id === st.staff; })[0].name;
    var when = fmtDay(days[st.day]) + ', ' + fmtTime(st.slot);
    var ref = 'AH-' + String(days[st.day].getDate()).padStart(2, '0') + String(st.slot).padStart(2, '0') + '-' + Math.random().toString(36).slice(2, 5).toUpperCase();
    var first = name.value.trim().split(' ')[0];

    $('doneLead').textContent = 'Thank you, ' + first + '. Your chair is held for fifteen minutes past the hour. We will message ' + phone.value.trim() + ' to confirm.';
    var rows = [['Reference', ref], ['Service', f.item.name], ['With', p], ['When', when], ['To pay at the salon', (f.item.from ? 'from ' : '') + A.money(f.item.price)]];
    $('doneCard').innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
    $('doneWa').href = 'https://wa.me/' + A.biz.whatsapp + '?text=' + encodeURIComponent(
      'Hello Adepa House, I have booked ' + f.item.name + ' on ' + when + ' with ' + p + '. Reference ' + ref + '. Name: ' + name.value.trim() + '.');

    $('bookMain').style.display = 'none';
    $('done').classList.add('is-on');
    if (A.lenis) A.lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
    if (anim) gsap.from('#done .done__tick, #done h1, #done p, #done dl, #done .done__cta', { opacity: 0, y: 24, duration: .8, ease: 'power3.out', stagger: .09 });
  });
  ['fName', 'fPhone'].forEach(function (id) { $(id).addEventListener('input', function () { $(id).classList.remove('is-bad'); }); });

  /* ---------- start, with an optional ?svc= deep link ---------- */
  drawWho();
  var m = location.search.match(/[?&]svc=([a-z]\d+)/);
  var pre = m ? A.find(m[1]) : null;
  if (pre) {
    st.group = pre.group.id; st.svc = pre.item.id;
    drawWho(); drawSvc(); drawStaff();
    ['s2', 's3'].forEach(function (id) { $(id).classList.remove('is-wait'); });
  }
  sync();
  A.pageIn();
})();
