# Adepa House — luxury hair and beauty house (sample website)

A six-page sample site for a private, high-end hair and beauty house in Airport Residential,
Accra, with four rooms: the Salon (women), the Grooming Room (gentlemen), the Little Suite
(children) and the Beauty Room (nails, lashes, brows and make-up). A small boutique sells
raw-hair wigs, bundles and professional hair care. Visitors add treatments and boutique pieces
to one selection, choose an artist and a time, collect at the house or have it couriered, and
settle at the house or pay by mobile money.

Plain HTML, CSS and JavaScript with GSAP, ScrollTrigger and Lenis saved locally. No build step.

## Run it

Double-click `OPEN-WEBSITE.bat`, or serve the folder (`py -m http.server 4190`) and open
`http://localhost:4190`.

## Pages

| Page | What is on it |
|---|---|
| `index.html` | Cinematic intro, photo-wall hero with live open/closed status, the four rooms, signature services, a visit slideshow, signature looks, the boutique, the artists, client words, hours and directions |
| `services.html` | The full menu as photo cards with price, duration and an Add button, by room, with filters |
| `shop.html` | The boutique: 15 pieces in three categories, each with a matching treatment suggestion |
| `lookbook.html` | 32 photographs, filterable, with a full-screen viewer and "Add to reservation" |
| `about.html` | The story of the house, how clients are looked after, the Little Suite, the artists |
| `book.html` | One checkout for treatments and boutique pieces: artist, time, collect or courier, details, payment, confirmation |

## Changing it for a real client

Almost everything lives in `assets/js/data.js`: business details, opening hours, treatments and
prices (each with its own photo), boutique products, signature looks and the team. Colours and
type are the variables at the top of `assets/css/site.css`.

## What is placeholder

The name, address, phone number, prices, staff names and client words are invented for the
sample. Payments are simulated: no money moves and no card details are asked for. Reservations
and orders are not sent anywhere yet; the confirmation offers a pre-filled WhatsApp message.

## Photos and fonts

Photographs are from Unsplash under the Unsplash licence; sources are in
`assets/img/CREDITS.txt`. `assets/img/s/` holds lighter copies used in grids. Fonts are Bodoni
Moda and Jost (SIL Open Font License), self-hosted in `assets/fonts/`.
