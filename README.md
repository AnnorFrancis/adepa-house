# Adepa House — unisex salon website (sample)

A six-page sample site for a unisex family salon (women, men, children, nails and beauty) that
also sells wigs, hair and grooming products. Visitors can add services and products to one bag,
choose a stylist and a time, collect or get delivery, and pay at the salon or by mobile money.

Plain HTML, CSS and JavaScript with GSAP, ScrollTrigger and Lenis saved locally. No build step.

## Run it

Double-click `OPEN-WEBSITE.bat`, or serve the folder (`py -m http.server 4190`) and open
`http://localhost:4190`.

## Pages

| Page | What is on it |
|---|---|
| `index.html` | Intro with the logo, drifting photo-wall hero with live open/closed status, Women / Men / Kids panels, slideshow, numbered style chart, shop teaser, team, reviews, hours and directions |
| `services.html` | Every service as a photo card with price, duration and an Add button, grouped by Women, Men, Kids and Nails and beauty, with filters |
| `shop.html` | 18 products in four categories, each with an Add button and a matching service suggestion |
| `lookbook.html` | 30 photos, filterable, with a full-screen viewer and "Add to booking" |
| `about.html` | Why the salon is unisex, how it works, the children's corner, the team |
| `book.html` | One checkout for services and products: stylist, time, collect or deliver, details, payment, confirmation |

## Changing it for a real client

Almost everything lives in `assets/js/data.js`: business details, opening hours, services and
prices (each with its own photo), shop products, the style chart and the team. Colours and type
sizes are the variables at the top of `assets/css/site.css`.

## What is placeholder

The salon name, address, phone number, prices, staff names and customer reviews are invented
for the sample. Payments are simulated: no money moves and no card details are asked for.
Bookings and orders are not sent anywhere yet; the confirmation offers a pre-filled WhatsApp
message.

## Photos

All photographs are from Unsplash under the Unsplash licence. Sources are listed in
`assets/img/CREDITS.txt`. `assets/img/s/` holds lighter copies used in grids.
