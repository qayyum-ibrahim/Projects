# Design briefs

One section per site. `/new-site <slug>` copies the section whose heading is `## <slug>` into the new site's `CLAUDE.md`.
Fonts are `@fontsource` packages. If a package name does not exist on npm, pick the closest font and log it in Decisions.
All content is fictional. Prices are in naira (₦).

## restaurant
**Name:** Saffron & Smoke. A modern West African grill restaurant, fictional, in Lagos.
**Mood:** warm, dark, candle-lit. Ember glow on near-black. Feels premium but welcoming.
**Colors:** background #14100d, surface #1e1814, text #f3ebe0, muted text #b9a99a, accent ember #e0722f, gold #c9a35b.
**Fonts:** `@fontsource/cormorant-garamond` (headings), `@fontsource/dm-sans` (body).
**Pages:**
- Home: hero with the restaurant name and a "Reserve a table" button, short story teaser, 6 signature dishes, hours and location strip, final reservation call to action.
- Menu: category tabs (Starters, Grill, Mains, Sides, Desserts, Drinks). At least 4 items per category from `src/data/menu.js`. Each item has a name, a short description, a price in ₦, and optional tags (spicy, vegetarian).
- Our Story: the chef, the idea, the fire. About 3 short sections.
- Gallery: image grid with a lightbox (keyboard and touch friendly).
- Reservations: form with name, phone, date, time, number of guests and a note. Front-end validation. A success message replaces the form on submit. No data is sent anywhere.
- Contact: opening hours table, fake address and phone, an "Open now" badge computed from the hours, and a styled map placeholder box.
**Features:** sticky header that gets a background on scroll, accessible mobile menu, "Open now" badge, scroll reveal animation, lightbox.
**Images:** `hero.jpg`, `story.jpg`, `chef.jpg`, `interior.jpg`, `dish-1.jpg` to `dish-6.jpg`, `gallery-1.jpg` to `gallery-8.jpg`.

**Signature dishes (the six on the home page, in this order, matching `dish-1.jpg` to `dish-6.jpg`):** 1) Suya-spiced beef skewers, 2) Smoked jollof rice with grilled chicken, 3) Whole fire-roasted catfish with pepper sauce, 4) Charred lamb ribs with yaji glaze, 5) Grilled king prawns with garlic butter and chili, 6) Caramelised plantain with vanilla ice cream. Use these exact dishes and put them in `src/data/menu.js` too.

## hotel
**Name:** Marina Crest Hotel. A calm luxury waterfront hotel, fictional.
**Mood:** bright, airy, quiet luxury. Large images, lots of space, slow gentle animation.
**Colors:** background #f6f1ea, surface #ffffff, text #1f2a2e, muted #6b7478, deep teal #1d4b4f, brass #b08d57.
**Fonts:** `@fontsource/fraunces` (headings), `@fontsource/manrope` (body).
**Pages:**
- Home: full-width hero with an availability bar (check-in, check-out, guests), rooms preview, amenities, dining teaser, special offers, guest reviews.
- Rooms: list of 6 rooms with filter by type. Each links to a room page.
- Room detail (`/rooms/:id`): image gallery, description, amenities list, price per night, a "Book this room" button.
- Facilities: pool, spa, gym, events. Short sections.
- Dining: two venues with hours.
- Offers: 3 packages.
- Book: multi-step front-end booking (dates, room, guest details, summary, confirmation). No data is sent anywhere.
**Features:** availability bar with native date inputs and validation (check-out after check-in), room gallery, booking summary with nights and total price.
**Images:** `hero.jpg`, `pool.jpg`, `spa.jpg`, `restaurant.jpg`, `room-1.jpg` to `room-6.jpg` (plus `room-1-b.jpg`, `room-1-c.jpg` for the gallery of any room).
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## real-estate
**Name:** Haven Estates. A property agency in Lagos and Abuja, fictional.
**Mood:** modern, trustworthy, clean. Photo-led cards, strong filters.
**Colors:** background #ffffff, surface #f4f6f5, text #1b1f23, muted #5d6870, accent green #2f8f6b, dark #12201b.
**Fonts:** `@fontsource/dm-serif-display` (headings), `@fontsource/manrope` (body).
**Pages:**
- Home: hero with a search bar (buy or rent, location, type), featured listings, popular areas, why choose us, agent strip.
- Listings: at least 12 properties in `src/data/properties.js`. Working filters: buy or rent, type, price range, bedrooms. Sort by price or newest. Result count.
- Property detail (`/properties/:id`): gallery, price, facts (beds, baths, size), description, features, agent card, enquiry form, mortgage calculator.
- About and Contact.
**Features:** filters that really work on the mock data, mortgage calculator (price, deposit, years, rate), save-to-favourites stored in localStorage.
**Images:** `hero.jpg`, `property-1.jpg` to `property-12.jpg`, `agent-1.jpg` to `agent-3.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## ecommerce
**Name:** Kora Goods. A lifestyle and home goods store, fictional.
**Mood:** warm minimal retail. Product photos on clean backgrounds, terracotta accents.
**Colors:** background #faf8f5, surface #ffffff, text #1a1a1a, muted #6f6a64, accent terracotta #c4572f.
**Fonts:** `@fontsource/syne` (headings), `@fontsource/inter` (body).
**Pages:**
- Home: hero, category tiles, featured products, a promo banner, newsletter form.
- Shop: 16 products in `src/data/products.js`. Category filter, sort by price, search.
- Product detail (`/product/:id`): images, price, size or color options, quantity, add to cart, related products.
- Cart: slide-in drawer plus a full cart page. Change quantity, remove item, subtotal.
- Checkout: mock form (contact, address, payment fields that are not real), order summary, then an order confirmation page. No payment is processed and no data is sent.
**Features:** cart in React context saved to localStorage, totals in ₦, empty states, a header cart count.
**Images:** `hero.jpg`, `product-1.jpg` to `product-16.jpg`, `promo.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## saas
**Name:** Tallybase. Invoicing and payments software for small businesses, fictional.
**Mood:** crisp, modern software. White space, indigo gradient, rounded cards.
**Colors:** background #ffffff, surface #f6f7fb, text #14172b, muted #5b6178, accent indigo #5b5bf0, gradient end #8b5cf6.
**Fonts:** `@fontsource/space-grotesk` (headings), `@fontsource/inter` (body).
**Pages:**
- Home: hero with a product mockup built only with HTML and CSS (no screenshots), logo row (text names, not real logos), features, how it works in 3 steps, pricing preview, testimonials, FAQ, final call to action.
- Features: detailed sections.
- Pricing: monthly and yearly toggle, 3 plans, comparison table, FAQ.
- Login and Sign up: UI only, with validation. No accounts exist.
**Features:** pricing toggle that changes the prices, FAQ accordion, animated product mockup, sticky header.
**Images:** `og.jpg` only. Everything else is built with CSS and SVG.

## booking
**Name:** Halo Studio. A hair and beauty salon, fictional.
**Mood:** soft, friendly, feminine but not cliche. Blush and plum.
**Colors:** background #fdf4f2, surface #ffffff, text #2b1a28, muted #7a6573, plum #4a2545, accent rose #d9667a.
**Fonts:** `@fontsource/dm-serif-display` (headings), `@fontsource/dm-sans` (body).
**Pages:**
- Home: hero with a "Book now" button, services, team, reviews, location.
- Services: list with duration and price.
- Book: a 5-step flow (service, stylist, date and time, your details, confirm) with a summary panel that updates. Time slot grid with some slots already taken (mock). Validation at every step.
- Confirmation: shows the booking details and a fake reference code.
- Contact.
**Features:** stepper with back and next, slot grid built from mock availability, summary sidebar that becomes a bottom bar on mobile.
**Images:** `hero.jpg`, `stylist-1.jpg` to `stylist-4.jpg`, `service-1.jpg` to `service-6.jpg`, `salon.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## membership
**Name:** Pulse Fitness Club. A gym with monthly memberships, fictional.
**Mood:** bold, energetic, dark with a volt-yellow accent. Big condensed type.
**Colors:** background #0e0e10, surface #1a1a1d, text #f5f5f5, muted #a3a3a8, accent volt #d4ff3a.
**Fonts:** `@fontsource/bebas-neue` (headings), `@fontsource/inter` (body).
**Pages:**
- Home: hero, benefits, classes preview, trainers, plans, testimonials, call to action.
- Classes: weekly timetable with filters by day and class type. Data in `src/data/classes.js`.
- Plans: 3 tiers with a feature comparison.
- Join: sign-up form with plan selection and validation.
- Member area (`/account`): a fake login stored in localStorage. Shows the plan, next billing date (fake) and booked classes. Members can book or cancel classes.
**Features:** fake auth in localStorage with a clear "demo" note, class booking toggle, protected route that redirects to the join page.
**Images:** `hero.jpg`, `trainer-1.jpg` to `trainer-4.jpg`, `class-1.jpg` to `class-6.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## business
**Name:** Northbridge Advisory. A business consulting firm, fictional.
**Mood:** confident, corporate, clean. Navy and white with one bright accent.
**Colors:** background #ffffff, surface #f3f6fa, text #0f1c2e, muted #55657a, navy #0f2a4a, accent #2f7de1.
**Fonts:** `@fontsource/manrope` (headings), `@fontsource/inter` (body).
**Pages:**
- Home: hero, services, animated stats, process in 4 steps, text-based client names, testimonials, call to action.
- Services: 5 services, each with a short detail section.
- About: story, values, team of 6.
- Case studies: 4 cases with result numbers.
- Contact: form with validation and fake office details.
**Features:** stats that count up when visible, sticky header, contact form success state.
**Images:** `hero.jpg`, `team-1.jpg` to `team-6.jpg`, `case-1.jpg` to `case-4.jpg`, `office.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## portfolio
**Name:** Ada Okoro. A product designer, fictional.
**Mood:** dark, minimal, confident. Big type, lots of space, one lime accent.
**Colors:** background #0b0b0c, surface #151517, text #ededed, muted #9a9aa0, accent lime #c8f169.
**Fonts:** `@fontsource/space-grotesk` (headings), `@fontsource/dm-sans` (body).
**Pages:**
- Home: large intro statement, selected work (4 projects), skills, short testimonial strip, contact call to action.
- Work: grid of 8 projects with filter by discipline.
- Case study (`/work/:id`): overview, role, problem, process, results, image sections, next project link.
- About: short story, tools, experience timeline.
- Contact.
**Features:** project filter, smooth page-to-page transitions with CSS, hover reveals on project tiles, email copy-to-clipboard button.
**Images:** `portrait.jpg`, `work-1.jpg` to `work-8.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## blog
**Name:** The Margin Notes. A blog about work, design and ideas, fictional.
**Mood:** editorial and quiet. Great typography, generous line height, paper-like background.
**Colors:** background #fbfaf7, surface #ffffff, text #1c1c1c, muted #6a675f, accent brick #b3402a.
**Fonts:** `@fontsource/lora` (headings and body text), `@fontsource/work-sans` (UI and labels).
**Pages:**
- Home: featured post, latest posts list, category chips, newsletter form.
- Post (`/posts/:slug`): title, author, date, reading time, long body, share buttons (links only), related posts.
- Category (`/category/:name`).
- Archive: all posts by year, with search.
- About.
**Features:** 12 posts in `src/data/posts.js` with real-feeling body text (written by you, original, no copied text), reading progress bar, search that filters posts, reading time computed from the text.
**Images:** `cover-1.jpg` to `cover-12.jpg`, `author.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## entertainment
**Name:** Reelhouse. A streaming and events discovery site, fictional.
**Mood:** cinematic, dark, rich. Horizontal rows of posters, strong hero.
**Colors:** background #0a0a0f, surface #15151d, text #f2f2f5, muted #9b9bab, accent crimson #e5383b.
**Fonts:** `@fontsource/poppins` (headings and body).
**Pages:**
- Home: large featured hero, rows that scroll sideways (Trending, New this week, Comedy, Drama, Documentaries).
- Browse: genre filter, search, grid.
- Title page (`/title/:id`): backdrop, synopsis, cast, trailer placeholder, similar titles, add to watchlist.
- Watchlist: saved titles from localStorage.
**Important:** use only invented titles, cast and studios. Do not use real film or show names, real actors or real posters. Posters are made with CSS gradients and the title text.
**Features:** sideways scroll rows with arrow buttons on desktop, watchlist in localStorage, search.
**Images:** none required. Optional `backdrop-1.jpg` to `backdrop-4.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

## personal
**Name:** Dayo Bello. A writer and developer's personal site, fictional.
**Mood:** text-first, human, a little playful. Paper-like background, one bright blue accent. Different from the portfolio site: more words, fewer big images.
**Colors:** background #f5f3ee, surface #ffffff, text #111111, muted #666257, accent blue #2438e0.
**Fonts:** `@fontsource/fraunces` (headings), `@fontsource/inter` (body).
**Pages:**
- Home: a warm intro, what I do, a short list of projects, recent writing, links.
- About: story and a few fun facts.
- Projects: simple list with a sentence each.
- Writing: list of 8 short essays (titles and dates only, linking to `#`).
- Now: what I am doing this month.
- Contact: links (use example.com addresses).
**Features:** a live local time in the header, light and dark theme toggle, subtle hover underline animations.
**Images:** `portrait.jpg` only.

## wedding
**Name:** Tola & Femi. A fictional wedding on 12 June 2027 in Lagos.
**Mood:** romantic, soft, elegant. Ivory and sage with gold details. Script accents used lightly.
**Colors:** background #fbf7f0, surface #ffffff, text #3a3a36, muted #7b7a70, sage #8a9a7b, gold #b8975a.
**Fonts:** `@fontsource/great-vibes` (accents only), `@fontsource/playfair-display` (headings), `@fontsource/lato` (body).
**Pages (one long page with a sticky nav and smooth scroll, plus an RSVP page):**
- Hero with names, date, and a live countdown.
- Our story timeline.
- The day: schedule, venue (fake), dress code, travel notes.
- Gallery.
- Gifts: a short note about gifts with fake details.
- FAQ.
- RSVP: form with name, attending yes or no, number of guests, meal choice, message. Validation and a success message. No data is sent.
**Features:** countdown that updates every second and stops at zero, smooth scroll with an active section highlight, RSVP validation.
**Images:** `hero.jpg`, `story-1.jpg` to `story-4.jpg`, `gallery-1.jpg` to `gallery-8.jpg`, `venue.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.
