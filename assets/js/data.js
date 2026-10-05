/* NAKUS BEAUTY STUDIO — everything the client will want to edit lives here:
   business details, hours, the services (one photo per service), the shop,
   popular styles and the team. Image names refer to files in assets/img/. */
window.NAKUS = {
  biz: {
    name: 'Nakus Beauty Studio',
    area: 'Airport Residential Area, Accra',
    address: '12 Senchi Street, Airport Residential Area, Accra',
    phone: '+233 30 000 0000',
    tel: '+233300000000',
    whatsapp: '233300000000',
    email: 'hello@nakusbeauty.com',
    maps: 'https://www.google.com/maps/search/?api=1&query=Airport+Residential+Area+Accra',
    delivery: 50            /* GH₵, courier delivery inside Accra */
  },

  /* 0 = Sunday. [open, close] in 24h. */
  hours: { 0: [12, 18], 1: [9, 21], 2: [9, 21], 3: [9, 21], 4: [9, 21], 5: [9, 21], 6: [9, 21] },

  /* Four categories. `sub` groups services inside each category on the services page. */
  groups: [
    {
      id: 'women', name: 'Women', short: 'Women', img: 'lx-pearl-bun.jpg',
      blurb: 'Silk presses, braids, wigs, colour and bridal hair, by senior stylists only.',
      subs: ['Silk and blowouts', 'Braids', 'Wigs', 'Cut and colour', 'Treatments', 'Bridal and occasion'],
      items: [
        { id: 'w1',  sub: 'Silk and blowouts', name: 'Signature silk press', mins: 120, price: 650, img: 'lx-silkpress.jpg', note: 'Wash, deep conditioning, a heat-protected press and a precision trim. No relaxer, ever.' },
        { id: 'w2',  sub: 'Silk and blowouts', name: 'Blowout and finish', mins: 75, price: 420, img: 'lx-blowout.jpg', note: 'Wash, treatment and a smooth, swinging blowout.' },
        { id: 'w15', sub: 'Silk and blowouts', name: 'Natural hair styling', mins: 90, price: 480, img: 'lx-afro.jpg', note: 'Twist-outs, defined curls or a sculpted afro, shaped to your face.' },
        { id: 'w4',  sub: 'Braids', name: 'Bespoke knotless braids', mins: 300, price: 1200, from: true, img: 'her-knotless.jpg', note: 'Your size and length, premium pre-stretched hair, two braiders on every head.' },
        { id: 'w5',  sub: 'Braids', name: 'Boho knotless braids', mins: 330, price: 1500, img: 'lx-boho.jpg', note: 'Knotless braids with human-hair curls left loose through the length.' },
        { id: 'w6',  sub: 'Braids', name: 'Feed-in cornrows', mins: 120, price: 600, img: 'lx-feedin.jpg', note: 'Clean partings, tapered feed-ins, finished long or into a bun.' },
        { id: 'w7',  sub: 'Braids', name: 'Braided crown updo', mins: 180, price: 850, img: 'lx-updo-braid.jpg', note: 'Braids built up into a high crown for events and travel.' },
        { id: 'w8',  sub: 'Wigs', name: 'HD lace wig install', mins: 120, price: 900, img: 'lx-lace.jpg', note: 'Braid-down, lace tinted and melted to your skin, styled to finish. Glueless on request.' },
        { id: 'w9',  sub: 'Wigs', name: 'Custom wig construction', mins: 60, price: 2500, from: true, img: 'lx-custom-unit.jpg', note: 'A unit made to your head measurements in our atelier. Hair priced separately.' },
        { id: 'w12', sub: 'Cut and colour', name: 'Precision cut and style', mins: 60, price: 450, img: 'lx-pixie.jpg', note: 'Pixies, bobs and tapered cuts, finished with a style.' },
        { id: 'w11', sub: 'Cut and colour', name: 'Bespoke colour', mins: 150, price: 1200, from: true, img: 'lx-colour.jpg', note: 'Blonde, copper or rich brunette, with a bond-building treatment included.' },
        { id: 'w3',  sub: 'Treatments', name: 'Scalp and hair ritual', mins: 60, price: 550, img: 'svc-steam.jpg', note: 'Scalp analysis, steam, massage and a treatment chosen for your hair.' },
        { id: 'w10', sub: 'Treatments', name: 'Loc retwist and styling', mins: 120, price: 700, img: 'lx-locs-w.jpg', note: 'Wash, scalp care, retwist and an updo or loose style.' },
        { id: 'w13', sub: 'Bridal and occasion', name: 'Bridal hair, with trial', mins: 180, price: 3500, from: true, img: 'lx-bride-hair.jpg', note: 'Trial in the salon, then we come to you on the morning of the wedding.' },
        { id: 'w14', sub: 'Bridal and occasion', name: 'Event updo', mins: 75, price: 600, img: 'lx-sleek-bun.jpg', note: 'A sleek bun, chignon or high pony for galas and dinners.' }
      ]
    },
    {
      id: 'men', name: 'Men', short: 'Men', img: 'lx-m-signature.jpg',
      blurb: 'A private room for men: cuts, hot towel shaves, beards and locs.',
      subs: ['Cuts', 'Shave and beard', 'Locs and texture'],
      items: [
        { id: 'm1',  sub: 'Cuts', name: 'Signature cut', mins: 45, price: 250, img: 'lx-m-fade.jpg', note: 'Consultation, cut, wash and a hot towel finish.' },
        { id: 'm2',  sub: 'Cuts', name: 'Skin fade and line-up', mins: 45, price: 230, img: 'lx-m-signature.jpg', note: 'Low, mid or high, finished with a straight-razor line-up.' },
        { id: 'm6',  sub: 'Cuts', name: 'High-top and shape-up', mins: 45, price: 250, img: 'lx-m-hightop.jpg', note: 'Shaped by hand and finished with the razor.' },
        { id: 'm10', sub: 'Cuts', name: 'Executive express', mins: 40, price: 400, img: 'lx-m-exec.jpg', note: 'Cut, beard and hot towel in forty minutes, for the lunch hour.' },
        { id: 'm3',  sub: 'Shave and beard', name: 'Cut and beard ritual', mins: 75, price: 380, img: 'lx-m-beardcut.jpg', note: 'Signature cut plus beard sculpting, oil and balm.' },
        { id: 'm4',  sub: 'Shave and beard', name: 'Royal hot towel shave', mins: 45, price: 280, img: 'lx-m-hottowel.jpg', note: 'Pre-shave oil, three hot towels, a straight-razor shave and a cold-towel finish.' },
        { id: 'm5',  sub: 'Shave and beard', name: 'Beard sculpt and conditioning', mins: 30, price: 180, img: 'lx-m-beard.jpg', note: 'Shape, line and condition, with no haircut.' },
        { id: 'm7',  sub: 'Locs and texture', name: 'Waves and texture treatment', mins: 45, price: 280, img: 'him-waves.jpg', note: 'Wash, moisture treatment and a brush-in set.' },
        { id: 'm9',  sub: 'Locs and texture', name: 'Loc maintenance', mins: 90, price: 450, img: 'lx-m-locs.jpg', note: 'Wash, scalp care and retwist.' },
        { id: 'm11', sub: 'Locs and texture', name: 'Men’s cornrows', mins: 75, price: 300, img: 'svc-cornrows-m.jpg', note: 'Straight back or patterned, in your own hair.' }
      ]
    },
    {
      id: 'kids', name: 'Kids', short: 'Kids', img: 'lx-k-gent.jpg',
      blurb: 'Under twelves, in their own room, with patient hands and no rush.',
      subs: ['Boys', 'Girls', 'Everyone'],
      items: [
        { id: 'k1', sub: 'Everyone', name: 'First haircut ceremony', mins: 45, price: 250, img: 'lx-k-first.jpg', note: 'A slow first cut, a photograph, a certificate and the first curl in a keepsake box.' },
        { id: 'k2', sub: 'Boys', name: 'Young gentleman’s cut', mins: 40, price: 180, img: 'lx-k-gent.jpg', note: 'Clipper or scissor cut with a soft line-up.' },
        { id: 'k5', sub: 'Boys', name: 'Boys’ cornrows', mins: 60, price: 250, img: 'lx-k-cornrows.jpg', note: 'Straight back or patterned, in their own hair.' },
        { id: 'k3', sub: 'Girls', name: 'Princess braids with beads', mins: 90, price: 350, img: 'lx-k-princess.jpg', note: 'Their own hair, light partings and beads of their choice.' },
        { id: 'k4', sub: 'Girls', name: 'Kids’ knotless braids', mins: 180, price: 650, img: 'lx-k-knotless.jpg', note: 'Kept light and loose at the hairline so nothing pulls.' },
        { id: 'k6', sub: 'Everyone', name: 'Natural styling and puffs', mins: 45, price: 220, img: 'lx-k-puffs.jpg', note: 'Gentle detangle, wash and a style that lasts the week.' },
        { id: 'k7', sub: 'Everyone', name: 'Kids’ loc care', mins: 60, price: 280, img: 'svc-kid-locs.jpg', note: 'Wash, scalp care and retwist.' }
      ]
    },
    {
      id: 'beauty', name: 'Nails & Beauty', short: 'Nails & Beauty', tab: 'Beauty', img: 'lx-b-glam.jpg',
      blurb: 'Hands, feet, lashes, brows and make-up, for her and for him.',
      subs: ['Nails', 'Lashes and brows', 'Make-up'],
      items: [
        { id: 'b1', sub: 'Nails', name: 'Signature manicure', mins: 50, price: 300, img: 'lx-b-manicure.jpg', note: 'Soak, shape, cuticle care, hand massage and polish.' },
        { id: 'b2', sub: 'Nails', name: 'Gel or builder gel manicure', mins: 75, price: 450, img: 'lx-b-gel.jpg', note: 'Lasts three weeks. Strengthens natural nails.' },
        { id: 'b3', sub: 'Nails', name: 'Sculpted acrylic set', mins: 100, price: 550, img: 'lx-b-acrylic.jpg', note: 'Any length and shape. Nail art priced per design.' },
        { id: 'b4', sub: 'Nails', name: 'Spa pedicure ritual', mins: 70, price: 400, img: 'lx-b-pedicure.jpg', note: 'Mineral soak, scrub, masque, massage and polish in a private chair.' },
        { id: 'b5', sub: 'Nails', name: 'Manicure and pedicure ritual', mins: 120, price: 650, img: 'nails-pedicure-station.jpg', note: 'Both, side by side, with a drink of your choice.' },
        { id: 'b6', sub: 'Nails', name: 'Gentleman’s hand and foot ritual', mins: 75, price: 450, img: 'lx-b-gents-hands.jpg', note: 'No polish. Trimmed, buffed and massaged.' },
        { id: 'b7', sub: 'Lashes and brows', name: 'Brow lamination and tint', mins: 45, price: 350, img: 'lx-b-brows.jpg', note: 'Brushed-up, fuller brows that last six weeks.' },
        { id: 'b8', sub: 'Lashes and brows', name: 'Lash extensions', mins: 120, price: 600, img: 'lx-b-lashes.jpg', note: 'Classic or hybrid, mapped to the shape of your eye.' },
        { id: 'b9', sub: 'Make-up', name: 'Soft glam make-up', mins: 75, price: 800, img: 'lx-b-glam.jpg', note: 'Skin-first glam for dinners, shoots and events.' },
        { id: 'b10', sub: 'Make-up', name: 'Bridal make-up, with trial', mins: 150, price: 3000, from: true, img: 'lx-b-bridal.jpg', note: 'Trial in the salon, then we come to you on the day.' }
      ]
    }
  ],

  /* The shop: hair and hair care only. `pair` suggests a service to book with it. */
  shopCats: [
    { id: 'hair', name: 'Wigs and hair' },
    { id: 'care', name: 'Hair care' },
    { id: 'silk', name: 'Silk' }
  ],
  products: [
    { id: 'p1',  cat: 'hair', name: 'Bone-straight HD lace wig, 26 inch', price: 4800, img: 'shop/lx-wig-straight.jpg', note: 'Raw Vietnamese hair, 13×6 HD lace.', pair: 'w8' },
    { id: 'p2',  cat: 'hair', name: 'Body wave frontal wig, 24 inch', price: 4500, img: 'shop/lx-wig-bodywave.jpg', note: 'Raw Cambodian hair, pre-plucked hairline.', pair: 'w8' },
    { id: 'p3',  cat: 'hair', name: 'Kinky curly closure wig, 18 inch', price: 3900, img: 'shop/lx-wig-curly.jpg', note: 'Matches 4a to 4b natural texture.', pair: 'w8' },
    { id: 'p4',  cat: 'hair', name: 'Signature bob wig, 12 inch', price: 2900, img: 'shop/lx-wig-bob.jpg', note: 'Glueless, cut and styled in the salon.', pair: 'w8' },
    { id: 'p5',  cat: 'hair', name: 'Deep wave glueless wig, 22 inch', price: 4200, img: 'shop/lx-wig-deepwave.jpg', note: 'Wear-and-go cap with adjustable band.', pair: 'w8' },
    { id: 'p6',  cat: 'hair', name: 'Raw ombré bundles, set of three', price: 3600, img: 'shop/lx-bundles.jpg', note: 'Single-donor raw hair, colour-ready.', pair: 'w9' },
    { id: 'p7',  cat: 'care', name: 'Scalp and growth serum', price: 380, img: 'shop/lx-serum.jpg', note: 'Rosemary, peptides and caffeine, 30 ml.', pair: 'w3' },
    { id: 'p8',  cat: 'care', name: 'Chébé and rosemary hair oil', price: 320, img: 'shop/lx-chebe.jpg', note: 'Sealing oil for length retention, 50 ml.' },
    { id: 'p9',  cat: 'care', name: 'Silk shine drops', price: 290, img: 'shop/lx-shine.jpg', note: 'Lightweight finish for silk presses and wigs, 30 ml.', pair: 'w1' },
    { id: 'p10', cat: 'care', name: 'Hydrating shampoo', price: 260, img: 'shop/lx-shampoo.jpg', note: 'Sulphate-free, for textured and coloured hair, 250 ml.' },
    { id: 'p11', cat: 'care', name: 'Moisture conditioner', price: 260, img: 'shop/lx-conditioner.jpg', note: 'Shea and murumuru butters, 250 ml.' },
    { id: 'p12', cat: 'care', name: 'Restorative hair masque', price: 340, img: 'shop/lx-masque.jpg', note: 'Weekly bond repair, 200 ml.', pair: 'w3' },
    { id: 'p13', cat: 'care', name: 'Leave-in conditioning cream', price: 240, img: 'shop/lx-leavein.jpg', note: 'Daily moisture for braids, locs and natural hair, 150 ml.' },
    { id: 'p14', cat: 'care', name: 'Gentleman’s beard and scalp oil', price: 280, img: 'shop/lx-beard-oil.jpg', note: 'Cedarwood and argan, 50 ml.', pair: 'm5' },
    { id: 'p15', cat: 'silk', name: 'Mulberry silk pillowcase', price: 650, img: 'shop/lx-silk.jpg', note: '22 momme, champagne. Less friction, longer-lasting styles.' }
  ],

  /* Popular styles on the home page and gallery. `svc` points at a service. */
  looks: [
    { name: 'Signature silk press', who: 'women', img: 'lx-silkpress.jpg',  svc: 'w1' },
    { name: 'Skin fade',            who: 'men',   img: 'lx-m-signature.jpg', svc: 'm2' },
    { name: 'Boho knotless braids', who: 'women', img: 'lx-boho.jpg',        svc: 'w5' },
    { name: 'Young gentleman’s cut', who: 'kids', img: 'lx-k-gent.jpg',      svc: 'k2' },
    { name: 'Braided crown updo',   who: 'women', img: 'lx-updo-braid.jpg',  svc: 'w7' },
    { name: 'Cut and beard ritual', who: 'men',   img: 'lx-m-beardcut.jpg',  svc: 'm3' },
    { name: 'Princess braids',      who: 'kids',  img: 'lx-k-princess.jpg',  svc: 'k3' },
    { name: 'Precision pixie',      who: 'women', img: 'lx-pixie.jpg',       svc: 'w12' }
  ],

  team: [
    { id: 't1', name: 'Kwame Asante',  role: 'Head of men’s grooming',    does: ['men', 'kids'],          img: 'team-1.jpg' },
    { id: 't2', name: 'Abena Owusu',   role: 'Creative director, braids',  does: ['women', 'kids'],        img: 'her-long-braids.jpg' },
    { id: 't3', name: 'Efua Mensah',   role: 'Head of nails and beauty',  does: ['beauty'],               img: 'team-3.jpg' },
    { id: 't4', name: 'Yaw Boateng',   role: 'Senior barber and loctician', does: ['men', 'women', 'kids'], img: 'team-2.jpg' }
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
})(window.NAKUS);
