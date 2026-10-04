/* ADEPA HOUSE — everything the client will want to edit lives here:
   business details, opening hours, the price list, the style chart and the team. */
window.ADEPA = {
  biz: {
    name: 'Adepa House',
    area: 'East Legon, Accra',
    address: '14 Lagos Avenue, East Legon, Accra',
    phone: '+233 30 000 0000',
    tel: '+233300000000',
    whatsapp: '233300000000',
    email: 'hello@adepahouse.com',
    maps: 'https://www.google.com/maps/search/?api=1&query=Lagos+Avenue+East+Legon+Accra'
  },

  /* 0 = Sunday. [open, close] in 24h. */
  hours: { 0: [12, 18], 1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20], 6: [8, 20] },

  groups: [
    {
      id: 'women', name: 'Women', img: 'her-knotless.jpg',
      blurb: 'Braids, locs, natural hair, weaves and colour.',
      items: [
        { id: 'w1',  name: 'Wash and blow-dry', mins: 45, price: 80, note: 'Shampoo, condition, blow-dry and a light style.' },
        { id: 'w2',  name: 'Silk press', mins: 90, price: 150, note: 'Wash, deep condition, press and trim. No relaxer.' },
        { id: 'w3',  name: 'Deep conditioning treatment', mins: 45, price: 120, note: 'Steam treatment for dry or breaking hair.' },
        { id: 'w4',  name: 'Cornrows, straight back', mins: 60, price: 100, note: 'Six to ten lines. Your own hair.' },
        { id: 'w5',  name: 'Stitch braids', mins: 120, price: 180, note: 'Extensions included.' },
        { id: 'w6',  name: 'Box braids', mins: 240, price: 300, note: 'Medium size, waist length. Extensions included.' },
        { id: 'w7',  name: 'Knotless braids', mins: 270, price: 350, note: 'Medium size. Lighter on the scalp than box braids.' },
        { id: 'w8',  name: 'Jumbo braids', mins: 180, price: 250, note: 'Extensions included.' },
        { id: 'w9',  name: 'Faux locs', mins: 300, price: 400, note: 'Shoulder to waist length.' },
        { id: 'w10', name: 'Loc retwist and style', mins: 90, price: 150, note: 'Wash, retwist and style.' },
        { id: 'w11', name: 'Wig install', mins: 90, price: 200, note: 'Braid-down, install and style. Bring your unit or ask about ours.' },
        { id: 'w12', name: 'Sew-in weave', mins: 150, price: 250, note: 'Hair not included.' },
        { id: 'w13', name: 'Full colour', mins: 120, price: 300, from: true, note: 'Price depends on length and how light you are going.' },
        { id: 'w14', name: 'Cut and shape', mins: 40, price: 100, note: 'Big chops, tapers and afro shaping.' }
      ]
    },
    {
      id: 'men', name: 'Men', img: 'him-fade-beard.jpg',
      blurb: 'Clipper cuts, fades, beards, locs and colour.',
      items: [
        { id: 'm1',  name: 'Haircut', mins: 30, price: 50, note: 'Any clipper cut with a line-up.' },
        { id: 'm2',  name: 'Skin fade', mins: 40, price: 70, note: 'Low, mid or high. Line-up included.' },
        { id: 'm3',  name: 'Haircut and beard', mins: 45, price: 80, note: 'Cut, beard shape and line-up.' },
        { id: 'm4',  name: 'Beard trim and line-up', mins: 15, price: 30, note: 'No haircut. In and out.' },
        { id: 'm5',  name: 'Hot towel shave', mins: 30, price: 60, note: 'Straight razor, hot towel, aftershave balm.' },
        { id: 'm6',  name: 'High-top and shape-up', mins: 40, price: 70, note: 'Shaped by hand, finished with the razor.' },
        { id: 'm7',  name: 'Waves treatment', mins: 30, price: 60, note: 'Wash, moisturise and brush-in.' },
        { id: 'm8',  name: 'Starter locs', mins: 120, price: 250, note: 'Comb coils or two-strand twists.' },
        { id: 'm9',  name: 'Loc retwist', mins: 75, price: 120, note: 'Wash and retwist.' },
        { id: 'm10', name: 'Hair colour', mins: 45, price: 100, note: 'Black, blonde or a fashion colour.' }
      ]
    },
    {
      id: 'kids', name: 'Kids', img: 'kid-boy-cornrows.jpg',
      blurb: 'Under twelve. Patient hands and a cartoon on the screen.',
      items: [
        { id: 'k1', name: 'Boy’s haircut', mins: 25, price: 35, note: 'Clipper cut and line-up.' },
        { id: 'k2', name: 'First haircut', mins: 30, price: 40, note: 'We go slowly. You get the photo and the first curl to take home.' },
        { id: 'k3', name: 'Girl’s cornrows', mins: 45, price: 60, note: 'Their own hair, no extensions.' },
        { id: 'k4', name: 'Kids’ braids with extensions', mins: 120, price: 150, note: 'Kept light so it does not pull.' },
        { id: 'k5', name: 'Wash and detangle', mins: 40, price: 50, note: 'Tear-free shampoo and a lot of conditioner.' },
        { id: 'k6', name: 'Kids’ loc retwist', mins: 60, price: 80, note: 'Wash and retwist.' }
      ]
    },
    {
      id: 'beauty', name: 'Nails and beauty', img: 'nails-gel-dark.jpg',
      blurb: 'Hands, feet, lashes, brows and make-up.',
      items: [
        { id: 'b1', name: 'Manicure', mins: 40, price: 60, note: 'File, cuticle care and polish.' },
        { id: 'b2', name: 'Gel manicure', mins: 60, price: 100, note: 'Lasts two to three weeks.' },
        { id: 'b3', name: 'Acrylic full set', mins: 90, price: 180, note: 'Any length and shape. Nail art priced per nail.' },
        { id: 'b4', name: 'Pedicure', mins: 50, price: 80, note: 'Soak, scrub, cuticle care and polish.' },
        { id: 'b5', name: 'Manicure and pedicure', mins: 90, price: 130, note: 'Both, at the same sitting.' },
        { id: 'b6', name: 'Men’s hand and foot care', mins: 60, price: 110, note: 'No polish. Clean, trimmed and buffed.' },
        { id: 'b7', name: 'Brow shape and tint', mins: 20, price: 40, note: 'Razor or thread.' },
        { id: 'b8', name: 'Classic lashes', mins: 75, price: 150, note: 'Individual extensions.' },
        { id: 'b9', name: 'Make-up, soft glam', mins: 60, price: 250, note: 'For events and shoots.' },
        { id: 'b10', name: 'Bridal make-up', mins: 120, price: 600, from: true, note: 'Includes a trial. We come to you on the day.' }
      ]
    }
  ],

  /* The style chart. `svc` points at a price-list item so booking can pre-fill. */
  looks: [
    { no: 1,  name: 'Skin fade and beard', who: 'men',   img: 'him-fade-beard.jpg',      svc: 'm3' },
    { no: 2,  name: 'Knotless braids',     who: 'women', img: 'her-knotless.jpg',        svc: 'w7' },
    { no: 3,  name: 'High-top',            who: 'men',   img: 'him-high-top.jpg',        svc: 'm6' },
    { no: 4,  name: 'Braided bun',         who: 'women', img: 'her-braided-bun.jpg',     svc: 'w6' },
    { no: 5,  name: 'Boy’s cornrows',      who: 'kids',  img: 'kid-boy-cornrows.jpg',    svc: 'k3' },
    { no: 6,  name: 'Shaped afro',         who: 'women', img: 'her-afro.jpg',            svc: 'w14' },
    { no: 7,  name: 'Low cut',             who: 'men',   img: 'him-low-cut.jpg',         svc: 'm1' },
    { no: 8,  name: 'Jumbo braids',        who: 'women', img: 'her-jumbo-braids.jpg',    svc: 'w8' },
    { no: 9,  name: 'Girl’s long braids',  who: 'kids',  img: 'kid-girl-long-braids.jpg', svc: 'k4' },
    { no: 10, name: 'Locs',                who: 'men',   img: 'him-locs.jpg',            svc: 'm9' },
    { no: 11, name: 'Blonde crop',         who: 'women', img: 'her-blonde-crop.jpg',     svc: 'w13' },
    { no: 12, name: 'Waves',               who: 'men',   img: 'him-waves.jpg',           svc: 'm7' }
  ],

  team: [
    { id: 't1', name: 'Kwame Asante',  role: 'Head barber',            does: ['men', 'kids'],            img: 'team-1.jpg' },
    { id: 't2', name: 'Abena Owusu',   role: 'Braids and natural hair', does: ['women', 'kids'],          img: 'her-long-braids.jpg' },
    { id: 't3', name: 'Efua Mensah',   role: 'Nails and make-up',      does: ['beauty'],                 img: 'team-3.jpg' },
    { id: 't4', name: 'Yaw Boateng',   role: 'Barber and loctician',   does: ['men', 'women', 'kids'],   img: 'team-2.jpg' }
  ]
};

(function (A) {
  A.money = function (n) { return 'GH₵ ' + n.toLocaleString('en-GH'); };
  A.dur = function (m) {
    var h = Math.floor(m / 60), r = m % 60;
    return h ? h + ' hr' + (r ? ' ' + r + ' min' : '') : r + ' min';
  };
  A.clock = function (h) { var ap = h >= 12 ? 'pm' : 'am'; var x = h % 12 || 12; return x + ap; };
  A.find = function (id) {
    for (var g = 0; g < A.groups.length; g++)
      for (var i = 0; i < A.groups[g].items.length; i++)
        if (A.groups[g].items[i].id === id) return { item: A.groups[g].items[i], group: A.groups[g] };
    return null;
  };
  A.openNow = function (d) {
    d = d || new Date();
    var h = A.hours[d.getDay()], now = d.getHours() + d.getMinutes() / 60;
    return { open: now >= h[0] && now < h[1], from: h[0], to: h[1] };
  };
})(window.ADEPA);
