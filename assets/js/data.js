/* ADEPA HOUSE — everything the client will want to edit lives here:
   business details, hours, the price list (with a photo per service), the shop,
   the style chart and the team. Image names refer to files in assets/img/. */
window.ADEPA = {
  biz: {
    name: 'Adepa House',
    area: 'East Legon, Accra',
    address: '14 Lagos Avenue, East Legon, Accra',
    phone: '+233 30 000 0000',
    tel: '+233300000000',
    whatsapp: '233300000000',
    email: 'hello@adepahouse.com',
    maps: 'https://www.google.com/maps/search/?api=1&query=Lagos+Avenue+East+Legon+Accra',
    delivery: 30            /* GH₵, rider delivery inside Accra */
  },

  /* 0 = Sunday. [open, close] in 24h. */
  hours: { 0: [12, 18], 1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20], 6: [8, 20] },

  /* `sub` groups services inside each tab on the services page. */
  groups: [
    {
      id: 'women', name: 'Women', img: 'her-knotless.jpg',
      blurb: 'Braids, locs, natural hair, wigs, weaves and colour.',
      subs: ['Braids', 'Natural and treatments', 'Locs', 'Wigs and weaves', 'Colour and cut'],
      items: [
        { id: 'w1',  sub: 'Natural and treatments', name: 'Wash and blow-dry', mins: 45, price: 80, img: 'svc-blowdry.jpg', note: 'Shampoo, condition, blow-dry and a light style.' },
        { id: 'w2',  sub: 'Natural and treatments', name: 'Silk press', mins: 90, price: 150, img: 'svc-silkpress.jpg', note: 'Wash, deep condition, press and trim. No relaxer.' },
        { id: 'w3',  sub: 'Natural and treatments', name: 'Deep conditioning treatment', mins: 45, price: 120, img: 'svc-steam.jpg', note: 'Steam treatment for dry or breaking hair.' },
        { id: 'w4',  sub: 'Braids', name: 'Cornrows, straight back', mins: 60, price: 100, img: 'svc-cornrows-w.jpg', note: 'Six to ten lines in your own hair.' },
        { id: 'w5',  sub: 'Braids', name: 'Stitch braids', mins: 120, price: 180, img: 'her-stitch-cornrows.jpg', note: 'Extensions included.' },
        { id: 'w6',  sub: 'Braids', name: 'Box braids', mins: 240, price: 300, img: 'her-box-braids.jpg', note: 'Medium size, waist length. Extensions included.' },
        { id: 'w7',  sub: 'Braids', name: 'Knotless braids', mins: 270, price: 350, img: 'her-knotless.jpg', note: 'Medium size. Lighter on the scalp than box braids.' },
        { id: 'w8',  sub: 'Braids', name: 'Jumbo braids', mins: 180, price: 250, img: 'her-jumbo-braids.jpg', note: 'Extensions included.' },
        { id: 'w9',  sub: 'Locs', name: 'Faux locs', mins: 300, price: 400, img: 'her-faux-locs.jpg', note: 'Shoulder to waist length.' },
        { id: 'w10', sub: 'Locs', name: 'Loc retwist and style', mins: 90, price: 150, img: 'svc-locs-w.jpg', note: 'Wash, retwist and style.' },
        { id: 'w11', sub: 'Wigs and weaves', name: 'Wig install', mins: 90, price: 200, img: 'svc-wig.jpg', note: 'Braid-down, install and style. Bring your unit or buy one from our shop.' },
        { id: 'w12', sub: 'Wigs and weaves', name: 'Sew-in weave', mins: 150, price: 250, img: 'svc-weave.jpg', note: 'Hair not included. Bundles are in our shop.' },
        { id: 'w13', sub: 'Colour and cut', name: 'Full colour', mins: 120, price: 300, from: true, img: 'her-blonde-crop.jpg', note: 'Price depends on length and how light you are going.' },
        { id: 'w14', sub: 'Colour and cut', name: 'Cut and shape', mins: 40, price: 100, img: 'her-afro.jpg', note: 'Big chops, tapers and afro shaping.' }
      ]
    },
    {
      id: 'men', name: 'Men', img: 'him-fade-beard.jpg',
      blurb: 'Clipper cuts, fades, beards, locs, cornrows and colour.',
      subs: ['Cuts', 'Beard and shave', 'Locs and cornrows', 'Waves and colour'],
      items: [
        { id: 'm1',  sub: 'Cuts', name: 'Haircut', mins: 30, price: 50, img: 'him-low-cut.jpg', note: 'Any clipper cut with a line-up.' },
        { id: 'm2',  sub: 'Cuts', name: 'Skin fade', mins: 40, price: 70, img: 'him-clipper-cut.jpg', note: 'Low, mid or high. Line-up included.' },
        { id: 'm3',  sub: 'Cuts', name: 'Haircut and beard', mins: 45, price: 80, img: 'him-fade-beard.jpg', note: 'Cut, beard shape and line-up.' },
        { id: 'm6',  sub: 'Cuts', name: 'High-top and shape-up', mins: 40, price: 70, img: 'him-high-top.jpg', note: 'Shaped by hand, finished with the razor.' },
        { id: 'm4',  sub: 'Beard and shave', name: 'Beard trim and line-up', mins: 15, price: 30, img: 'him-razor-lineup.jpg', note: 'No haircut. In and out.' },
        { id: 'm5',  sub: 'Beard and shave', name: 'Hot towel shave', mins: 30, price: 60, img: 'svc-hottowel.jpg', note: 'Straight razor, hot towel, aftershave balm.' },
        { id: 'm11', sub: 'Locs and cornrows', name: 'Men’s cornrows', mins: 60, price: 80, img: 'svc-cornrows-m.jpg', note: 'Straight back or patterned. Your own hair.' },
        { id: 'm8',  sub: 'Locs and cornrows', name: 'Starter locs', mins: 120, price: 250, img: 'him-starter-locs.jpg', note: 'Comb coils or two-strand twists.' },
        { id: 'm9',  sub: 'Locs and cornrows', name: 'Loc retwist', mins: 75, price: 120, img: 'him-locs.jpg', note: 'Wash and retwist.' },
        { id: 'm7',  sub: 'Waves and colour', name: 'Waves treatment', mins: 30, price: 60, img: 'him-waves.jpg', note: 'Wash, moisturise and brush-in.' },
        { id: 'm10', sub: 'Waves and colour', name: 'Hair colour', mins: 45, price: 100, img: 'him-colour.jpg', note: 'Black, blonde or a fashion colour.' }
      ]
    },
    {
      id: 'kids', name: 'Kids', img: 'kid-boy-cornrows.jpg',
      blurb: 'Under twelve. Patient hands and a cartoon on the screen.',
      subs: ['Boys', 'Girls', 'Everyone'],
      items: [
        { id: 'k2', sub: 'Everyone', name: 'First haircut', mins: 30, price: 40, img: 'kid-boy-toddler.jpg', note: 'We go slowly. You get the photo and the first curl to take home.' },
        { id: 'k1', sub: 'Boys', name: 'Boy’s haircut', mins: 25, price: 35, img: 'kid-boy-low-cut.jpg', note: 'Clipper cut and line-up.' },
        { id: 'k7', sub: 'Boys', name: 'Boy’s cornrows', mins: 45, price: 60, img: 'kid-boy-cornrows.jpg', note: 'Straight back or patterned.' },
        { id: 'k3', sub: 'Girls', name: 'Girl’s cornrows', mins: 45, price: 60, img: 'kid-girl-cornrows.jpg', note: 'Their own hair, no extensions.' },
        { id: 'k4', sub: 'Girls', name: 'Kids’ braids with extensions', mins: 120, price: 150, img: 'kid-girl-long-braids.jpg', note: 'Kept light so it does not pull.' },
        { id: 'k5', sub: 'Everyone', name: 'Wash and detangle', mins: 40, price: 50, img: 'svc-kid-detangle.jpg', note: 'Tear-free shampoo and a lot of conditioner.' },
        { id: 'k6', sub: 'Everyone', name: 'Kids’ loc retwist', mins: 60, price: 80, img: 'svc-kid-locs.jpg', note: 'Wash and retwist.' }
      ]
    },
    {
      id: 'beauty', name: 'Nails and beauty', img: 'nails-gel-dark.jpg',
      blurb: 'Hands, feet, lashes, brows and make-up. For him too.',
      subs: ['Nails', 'Lashes and brows', 'Make-up'],
      items: [
        { id: 'b1', sub: 'Nails', name: 'Manicure', mins: 40, price: 60, img: 'nails-manicure.jpg', note: 'File, cuticle care and polish.' },
        { id: 'b2', sub: 'Nails', name: 'Gel manicure', mins: 60, price: 100, img: 'nails-gel-dark.jpg', note: 'Lasts two to three weeks.' },
        { id: 'b3', sub: 'Nails', name: 'Acrylic full set', mins: 90, price: 180, img: 'svc-acrylic.jpg', note: 'Any length and shape. Nail art priced per nail.' },
        { id: 'b4', sub: 'Nails', name: 'Pedicure', mins: 50, price: 80, img: 'svc-pedicure.jpg', note: 'Soak, scrub, cuticle care and polish.' },
        { id: 'b5', sub: 'Nails', name: 'Manicure and pedicure', mins: 90, price: 130, img: 'nails-pedicure-station.jpg', note: 'Both, at the same sitting.' },
        { id: 'b6', sub: 'Nails', name: 'Men’s hand and foot care', mins: 60, price: 110, img: 'svc-mens-hands.jpg', note: 'No polish. Clean, trimmed and buffed.' },
        { id: 'b7', sub: 'Lashes and brows', name: 'Brow shape and tint', mins: 20, price: 40, img: 'svc-brows.jpg', note: 'Razor or thread.' },
        { id: 'b8', sub: 'Lashes and brows', name: 'Classic lashes', mins: 75, price: 150, img: 'svc-lashes.jpg', note: 'Individual extensions.' },
        { id: 'b9', sub: 'Make-up', name: 'Make-up, soft glam', mins: 60, price: 250, img: 'beauty-makeup.jpg', note: 'For events and shoots.' },
        { id: 'b10', sub: 'Make-up', name: 'Bridal make-up', mins: 120, price: 600, from: true, img: 'svc-bridal.jpg', note: 'Includes a trial. We come to you on the day.' }
      ]
    }
  ],

  /* The shop. `pair` suggests a service to book alongside the product. */
  shopCats: [
    { id: 'hair', name: 'Wigs and hair' },
    { id: 'care', name: 'Hair care' },
    { id: 'men', name: 'Men’s grooming' },
    { id: 'acc', name: 'Accessories' }
  ],
  products: [
    { id: 'p1',  cat: 'hair', name: 'Straight lace-front wig, 22 inch', price: 1450, img: 'shop/wig-1.jpg', pair: 'w11' },
    { id: 'p2',  cat: 'hair', name: 'Honey blonde wig, 20 inch', price: 1550, img: 'shop/wig-5.jpg', pair: 'w11' },
    { id: 'p3',  cat: 'hair', name: 'Ash blonde body wave wig', price: 1700, img: 'shop/wig-3.jpg', pair: 'w11' },
    { id: 'p4',  cat: 'hair', name: 'Highlighted closure wig', price: 1300, img: 'shop/unit-1.jpg', pair: 'w11' },
    { id: 'p5',  cat: 'hair', name: 'Body wave bundles, set of 3', price: 900, img: 'shop/bundle-2.jpg', pair: 'w12' },
    { id: 'p6',  cat: 'hair', name: 'Clip-in extensions', price: 650, img: 'shop/ext-2.jpg' },
    { id: 'p7',  cat: 'care', name: 'Coconut growth oil', price: 95, img: 'shop/care-1.jpg' },
    { id: 'p8',  cat: 'care', name: 'Deep repair hair mask', price: 120, img: 'shop/care-2.jpg', pair: 'w3' },
    { id: 'p9',  cat: 'care', name: 'Scalp drops', price: 140, img: 'shop/care-3.jpg' },
    { id: 'p10', cat: 'care', name: 'Leave-in conditioner', price: 85, img: 'shop/care-4.jpg' },
    { id: 'p11', cat: 'care', name: 'Hair oil', price: 75, img: 'shop/care-5.jpg' },
    { id: 'p12', cat: 'men',  name: 'Beard oil', price: 90, img: 'shop/beard-oil.jpg', pair: 'm4' },
    { id: 'p13', cat: 'men',  name: 'Boar bristle wave brush', price: 70, img: 'shop/wave-brush.jpg', pair: 'm7' },
    { id: 'p14', cat: 'men',  name: 'Pomade and wooden comb', price: 110, img: 'shop/pomade-comb.jpg' },
    { id: 'p15', cat: 'acc',  name: 'Gold claw clip', price: 60, img: 'shop/acc-1.jpg' },
    { id: 'p16', cat: 'acc',  name: 'Pearl barrette', price: 45, img: 'shop/acc-3.jpg' },
    { id: 'p17', cat: 'acc',  name: 'Crystal butterfly pin', price: 85, img: 'shop/acc-4.jpg' },
    { id: 'p18', cat: 'acc',  name: 'Wooden paddle brush', price: 65, img: 'shop/paddle-brush.jpg' }
  ],

  /* The style chart on the home page. `svc` points at a price-list item. */
  looks: [
    { no: 1,  name: 'Skin fade and beard', who: 'men',   img: 'him-fade-beard.jpg',      svc: 'm3' },
    { no: 2,  name: 'Knotless braids',     who: 'women', img: 'her-knotless.jpg',        svc: 'w7' },
    { no: 3,  name: 'High-top',            who: 'men',   img: 'him-high-top.jpg',        svc: 'm6' },
    { no: 4,  name: 'Braided bun',         who: 'women', img: 'her-braided-bun.jpg',     svc: 'w6' },
    { no: 5,  name: 'Boy’s cornrows',      who: 'kids',  img: 'kid-boy-cornrows.jpg',    svc: 'k7' },
    { no: 6,  name: 'Shaped afro',         who: 'women', img: 'her-afro.jpg',            svc: 'w14' },
    { no: 7,  name: 'Low cut',             who: 'men',   img: 'him-low-cut.jpg',         svc: 'm1' },
    { no: 8,  name: 'Jumbo braids',        who: 'women', img: 'her-jumbo-braids.jpg',    svc: 'w8' },
    { no: 9,  name: 'Girl’s long braids',  who: 'kids',  img: 'kid-girl-long-braids.jpg', svc: 'k4' },
    { no: 10, name: 'Locs',                who: 'men',   img: 'him-locs.jpg',            svc: 'm9' },
    { no: 11, name: 'Blonde crop',         who: 'women', img: 'her-blonde-crop.jpg',     svc: 'w13' },
    { no: 12, name: 'Waves',               who: 'men',   img: 'him-waves.jpg',           svc: 'm7' }
  ],

  team: [
    { id: 't1', name: 'Kwame Asante',  role: 'Head barber',             does: ['men', 'kids'],           img: 'team-1.jpg' },
    { id: 't2', name: 'Abena Owusu',   role: 'Braids and natural hair', does: ['women', 'kids'],         img: 'her-long-braids.jpg' },
    { id: 't3', name: 'Efua Mensah',   role: 'Nails and make-up',       does: ['beauty'],                img: 'team-3.jpg' },
    { id: 't4', name: 'Yaw Boateng',   role: 'Barber and loctician',    does: ['men', 'women', 'kids'],  img: 'team-2.jpg' }
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
  A.product = function (id) { return A.products.filter(function (p) { return p.id === id; })[0] || null; };
  A.openNow = function (d) {
    d = d || new Date();
    var h = A.hours[d.getDay()], now = d.getHours() + d.getMinutes() / 60;
    return { open: now >= h[0] && now < h[1], from: h[0], to: h[1] };
  };
})(window.ADEPA);
