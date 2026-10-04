# Adepa House — unisex salon website (sample)

A five-page sample site for a unisex family salon: women, men, children, nails and beauty.
Plain HTML, CSS and JavaScript. No build step, no internet needed once the folder is copied.

## Run it

Double-click `OPEN-WEBSITE.bat`, or serve the folder (`py -m http.server 4190`) and open `http://localhost:4190`.

## Pages

| Page | What is on it |
|---|---|
| `index.html` | Intro, drifting photo-wall hero with live open/closed status, Women / Men / Kids panels, the numbered style chart, slideshow, team, reviews, hours and directions |
| `services.html` | The full price list in four sections, each row linking straight into booking |
| `lookbook.html` | 30 photos, filterable, with a full-screen viewer and "Book this look" |
| `about.html` | Why the salon is unisex, how it works, the children's corner, the team |
| `book.html` | Five-step booking with a live summary and a confirmation screen |

## Changing it for a real client

Almost everything lives in `assets/js/data.js`:

- `biz` — name, address, phone, WhatsApp, email
- `hours` — opening hours (drives the hero status, the hours list, the footer and the booking times)
- `groups` — the price list
- `looks` — the style chart on the home page
- `team` — staff, and which services each one can be booked for

The brand name also appears in the page titles, the intro (`home.js`, the word `ADEPA`) and the logo in `site.js`.
Colours and type sizes are the variables at the top of `assets/css/site.css`.

## What is placeholder

The salon name, address, phone number, prices, staff names and customer quotes are invented for the sample.
Booking does not send anything anywhere yet: it shows a confirmation and offers a pre-filled WhatsApp message.
A real version needs a booking backend or a connection to the salon's management system.

## Photos

All photographs are from Unsplash under the Unsplash licence. Sources are listed in `assets/img/CREDITS.txt`.
`assets/img/s/` holds lighter copies used in grids and the hero wall.
