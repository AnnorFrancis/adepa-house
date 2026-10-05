# Nakus Beauty Studio — luxury hair and beauty studio (sample website)

A six-page sample site for a private, high-end hair and beauty studio in Airport Residential,
Accra, with four categories: Women, Men, Kids, and Nails & Beauty (nails, lashes, brows and
make-up). A small shop sells raw-hair wigs, bundles and professional hair care. Visitors add
services and shop items to one bag, choose a stylist and a time, collect at the studio or have
it couriered, and pay at the studio or by mobile money.

Plain HTML, CSS and JavaScript with GSAP, ScrollTrigger and Lenis saved locally. No build step.

## Run it

Double-click `OPEN-WEBSITE.bat`, or serve the folder (`py -m http.server 4190`) and open
`http://localhost:4190`.

## Pages

| Page | What is on it |
|---|---|
| `index.html` | Cinematic intro, photo-wall hero with live open/closed status, the four categories, popular services, a visit slideshow, popular styles, the shop, our team, reviews, hours and directions |
| `services.html` | Services: every service as a photo card with price, duration and an Add button, by category, with filters |
| `shop.html` | Shop: 15 items in three categories, each with a matching service suggestion |
| `lookbook.html` | Gallery: 32 photographs, filterable, with a full-screen viewer and "Add to booking" |
| `about.html` | About us: the story, how clients are looked after, the kids' corner, our team |
| `book.html` | Book now: one checkout for services and shop items: stylist, time, collect or courier, details, payment, confirmation |

## Changing it for a real client

Almost everything lives in `assets/js/data.js`: business details, opening hours, services and
prices (each with its own photo), shop products, popular styles and the team. Colours and
type are the variables at the top of `assets/css/site.css`.

## What is placeholder

The name, address, phone number, prices, staff names and reviews are invented for the
sample. Payments are simulated: no money moves and no card details are asked for. Bookings
and orders are not sent anywhere yet; the confirmation offers a pre-filled WhatsApp message.

## Photos and fonts

Photographs are from Unsplash under the Unsplash licence; sources are in
`assets/img/CREDITS.txt`. `assets/img/s/` holds lighter copies used in grids. Fonts are Bodoni
Moda and Jost (SIL Open Font License), self-hosted in `assets/fonts/`.
