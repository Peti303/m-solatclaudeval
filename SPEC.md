# KNKO / Kononenko Architectural Bureau — motion, typography and layout spec

Source: 30 s screen recording, 1280x720 frames, 10 fps. t = (frame-1)/10 s.

## 0. Conventions and measurement notes

- **Letterbox.** Every frame has an 8 px black bar at the top (rows 0-7) and an 8 px black bar at the bottom (rows 712-719).
  The real viewport is **1280 x 704**. All y values below are in *frame* coordinates; subtract 8 for CSS px.
  Viewport centre in frame coords is (640, 360). In CSS px it is (640, 352).
- vh = 704 px.
- **Background colours.** Light is #FDFDFD (253). Dark is #000 (about #010101 in the video).
- **Cursor.** The yellow-green OS arrow at about (1022, 248) and later (1250, 333) is the recorder's mouse cursor. **Ignore it.**
- **Scroll model.** The user scrolls in wheel bursts of about 250-350 px/s with pauses (3.0-4.4, 4.7-4.8, 22.1-23.3, 23.9-24.5 and others).
  Some animations keep running during pauses (the ring morph at 7.9-8.5 s, ring spin during holds).
  Treat them as `ScrollTrigger scrub` of roughly 1 s, or Lenis-style lerp smoothing. Text and layout scroll 1:1.
- **Recording duration.** Scroll starts at about t=3.0 s. The page hits bottom at about t=28.3 s and then rests.

## 1. Typography and colours

| Role | Face (observed) | Size / leading (px at 1280x704) | Tracking | Colour |
|---|---|---|---|---|
| Sans (all UI, hero, 2011 heading, stat numbers, footer values) | Neue Montreal / Helvetica-Now-like neo-grotesk. Tight, single-storey 't', ball-less terminals. **Free:** `Inter Tight` 400, or `Host Grotesk` / `Hanken Grotesk` 400. | see below | negative on display (-0.03 to -0.04em) | #fff on dark, #000 on light |
| Serif (long headlines, stat descriptions, "Bureau", footer labels, footer bottom row) | High-contrast transitional, ball terminals, slightly condensed (GT Super / Tiempos-like). **Free closest:** `Newsreader` (opsz 72, wght 400). Alternates: `Instrument Serif`, `Cormorant Garamond` 500, `Libre Caslon Text`. | see below | -0.02em on display | #fff |

### Sizes (cap-heights are measured, so calibrate the web font to them)

| Element | Cap height | Font-size est. | Line pitch | Alignment | Notes |
|---|---|---|---|---|---|
| Header logo | ~8 | 13 | 12.5 | left x=20 | "Kononenko / Architectural" sans; **"Bureau" is serif** |
| Header nav "Index, Work, About, Contact" | ~8 | 12.5 | - | right edge x=1262, baseline y≈30 | The commas are part of the text. "Index," has a 1 px underline. Gap between items is about 6 px. |
| Hero headline | 39 (R: 342→380) | 54-55 | 47-48 (0.87) | centered at x=640 | "Refined & Bold" is 308 px wide. |
| Marker numbers "01".."08" | - | 10 | - | - | |
| "People & Process" label | - | 11 | 12.5 | left x=20 | sans, 2 lines, #f2f2f2 |
| Serif headline "A studio shaped by…" | 'A' ≈ 54 | ~80 | **71** | left x=20 | First line indented to x=103 (indent ≈ 83 px). Max-width ≈ 740. "A studio shaped by" is 654 px wide. "collective pursuit of" is 688 px wide. |
| "2011 Year / of Foundation" | digits 84 | ~118 | **100** | centered | "of Foundation" is 642 px wide. |
| Paragraphs under 2011 | - | 11 | 13 | centered | See §3. Colour ≈ #8a8a8a (white at 50%). |
| Stat number (15+, 490+, 45+, 40K) | 84 | ~118 | - | left x=690 | "490+" is 255 px wide. |
| Stat description (serif) | 'C' ≈ 56 | ~80 | ~75 | left x=690 | First line indented to x=778 (≈ 88 px). |
| Logos headline (serif) | 'W' = 82 | ~120-124 | **95** | centered x=640 | Tight. "World's Most" is 680 px wide. "Work With Us" is 713 px wide. |
| Footer labels (Navigation, Media, Address, Hours) | - | 12 | - | - | serif, #fff |
| Footer values | - | 12 | 12.7 | - | sans, #fff. The Hours times are #808080. |
| Footer bottom row | - | 11.5 | - | - | serif, #808080 (white at 50%) |
| KNKO wordmark | 352 (316→668) | ≈ 500 | - | spans x=20→1262 | Sans regular, tracking ≈ -0.04em (K/O almost touch). Fit to width: `font-size ≈ 38.9vw`, 100vw minus 20 px each side. |

Colour tokens:

- Active stat number #fff. Active stat description ≈ #d8d8d8 (215).
- Dim stat number ≈ #363636 (54). Dim stat description ≈ #2d2d2d (45).
- Hairline colour on light: #cdcdcd at the outer end, fading to 0 at the inner end.
- Hairline colour on dark: white at about 0.3-0.4 alpha.

## 2. Text content (exact)

- **Header.** Logo is three lines: `Kononenko` / `Architectural` / `Bureau`. Nav is `Index, Work, About, Contact`.
- **Hero.** `Refined & Bold Essential` is two lines, "Refined & Bold" then "Essential". Markers read `01`…`08`.
- **Hero line 2.** `Simplicity & Clarity of Approach` is two lines, "Simplicity & Clarity" then "of Approach".
- **Intro.** Label `People & Process`. Headline `A studio shaped by clarity, trust, and a collective pursuit of thoughtful design.`
  Line breaks are "A studio shaped by / clarity, trust, and a / collective pursuit of / thoughtful design."
- **Foundation.** Heading `2011 Year of Foundation`, broken "2011 Year / of Foundation".
  - Paragraph L: "Design approach grounded in passive strategies, / material logic, and environmental responsibility."
  - Paragraph R: "Lifecycle-focused architecture with efficient systems, / sustainable choices, and long-term value."
- **Stats.**

| Number | Description (first line is indented) |
|---|---|
| `15+` | "Years of / experience" |
| `490+` | "Completed / projects" |
| `45+` | "Professionals / on the team" |
| `40K` | "Total area / covered" |

- **Logos headline.** `The World's Most Ambitious Brands Choose to Work With Us`, with the apostrophe in "World's" typeset as ’.
  Lines are "The / World's Most / Ambitious / Brands / Choose to / Work With Us".
- **Logo badges.** There are 17 distinct round grayscale badges. In clockwise order from the top: `o.properties`, a TS monogram, a crest/shield (coat of arms), an ornate "M" emblem,
  `SHOW ME`, `HÓRSEKA`, `THE GAME premium lounge`, `ЗОРГЕ №9`, `BOLSHEVIK`, `A101`, `Whitewill` (W mark), `KAZAKOV Grand Loft`, `NAIMAN residence`, `Little`, `INGRAD`, `ERA DEVELOPMENTS`, `COLDY`.
  Placeholder discs with these wordmarks are fine.

### Footer (6 columns, all text 12 px; labels serif, values sans)

| x (left) | Label | Values |
|---|---|---|
| 20 | logo copy: `Kononenko / Architectural / Bureau` | |
| 271 | `Navigation` | x=355: **Index** (underlined), About, Work, Team, *(blank line)*, Contact, **Order desgin** (sic, typo present on the site) |
| 605 | `Media` | x=689: Behance, Pinterest, Telegram, WhatsApp, *(blank)*, Phone, Email, Channel |
| 857 | `Address` | x=940: "Via Giacomo Leopardi / 14, 20123, Milano / Italia", *(blank)*, "Keizersgracht 421, / 1016, Amsterdam / Netherlands" |
| 1107 | `Hours` | x=1191: "Mon to Fri" (white) / 10:00 AM (gray) / 7:00 PM (gray), *(blank)*, "Sat to Sun" (white) / 12:00 PM (gray) / 5:00 PM (gray) |

- Row pitch is 12.7 px. The first row sits at the very top of the footer at final scroll (y≈10, frame coords).
- Bottom row at y≈697 (all serif, #808080). Items at x:
  - `All rights reserved` (20)
  - `License Number` (271), `IT-AR-2023-15847` (362), `NL-BA-08576321` (457)
  - `Visual Design` (605), `Artem Shcherban` (688)
  - `Development` (857), `Reksa Andhika` (941)
  - `Legal documents` (1107), `© 2026` (1228)
- KNKO wordmark: cap top y=316, baseline y=668 at final scroll. Bottom row is 29 px under the baseline.

## 3. Page structure and scroll map

Total scroll distance **S_max ≈ 5,400 px (≈ 7.7 vh)**. Document height ≈ 6,100 px (≈ 8.7 vh). Estimated error is ±250 px in the early half.

Build as a normal-flow page with these pinned or scrubbed pieces. S is the scroll offset in px. "Page y" is the element position at S=0, in frame coords.

| # | Section | Video t | S start→end (px) | vh | What is pinned or scrubbed |
|---|---|---|---|---|---|
| 1 | Hero (light) | 0-3.0 static; 3.0-4.4 exit | 0 → ~350 | 0 → 0.5 | Hero is fixed. The flip and text swap are *triggered*, not scrubbed. |
| 2 | Intro headline + photo bowl | 4.2-7.3 | 350 → ~1250 | 0.5 → 1.8 | Headline is in flow (page y_top ≈ 850). Card bowl is scrubbed. |
| 3 | Bowl→ring morph and "2011 Year of Foundation" | 7.3-12.5 | 1250 → ~2300 | 1.8 → 3.3 | Block (heading + paragraphs) is in flow. Block centre is at page y ≈ 1974 (= 202 + S(10.5)). Ring centre is locked to the block centre. |
| 4 | Pile and stats | 12.5-20.2 | 2300 → ~3900 | 3.3 → 5.5 | Stats list is in flow. The photo ring is centred on x=0 and is 0.86x the scroll rate. |
| 5 | Logos | 19.9-26.3 | ~3800 → ~4950 | 5.4 → 7.0 | Headline in flow (page y of "The" cap top ≈ 4560). Badge ring is scrubbed. |
| 6 | Footer (100vh, black) | 26.0-28.3 | 4700 → 5400 | | Normal flow. KNKO wordmark letters have a velocity stagger. |

### Time → scroll (S) reference

S(t) is anchored by tracked text. The 6.4→7.9 and 11.9→13.0 stretches are interpolated.

| t | S | t | S | t | S |
|---|---|---|---|---|---|
| 3.0 | 0 | 8.7 | 1,245 | 17.0 | 3,330 |
| 4.4 | 350 | 9.5 | 1,438 | 19.8 | 3,860 |
| 5.0 | 456 | 10.5 | 1,772 | 21.1 | 4,231 |
| 5.6 | 608 | 11.1 | 1,848 | 22.1-23.3 | 4,490 → 4,490 (pause) |
| 6.4 | 837 | 11.9 | 2,132 | 23.5 | 4,570 |
| 7.9 | ~1,212 | 13.0 | ~2,400 | 25.9 | 4,872 |
| 7.9-8.5 | flat (pause) | 14.6 | ~2,790 | 26.1 | 4,939 |
| | | | | 27.7 | 5,360 |
| | | | | 28.3 | 5,396 (end) |

A linear approximation of ≈ 250 px/s over 3-28 s is acceptable if exact tracking is not wanted.

## 4. Header

- `position: fixed`. Left logo at (20, 21-54). Right nav, baseline y≈30, right edge x=1262.
- **`mix-blend-mode: difference`, colour #fff.** This is why it is black on the white hero and white on black.
  During the flip at t=3.3 the header text measures 103/255 on a 150/255 background, i.e. exactly inverted.
  Over bright photos it greys out (frame 78, t=7.7).
- No hide-on-scroll anywhere until the footer. At t≈27.6-27.8 the nav slides up and out (clipped by a mask), the header logo disappears, and the footer's own logo copy is what remains in column 1.
- "Index," is underlined (active) throughout.

## 5. Hero (t = 0-3.0 s, static)

- Background #FDFDFD. Headline "Refined & Bold / Essential" is centred at (640, 362) and (640, 410), black.
- **8 spokes + labels** around the centre **C = (640, 359)** (frame coords). Angle is clockwise from 12 o'clock.
  Labels are 10 px sans, black, centred on the listed points.

| # | Label centre (x,y) | r (px) | angle | Line outer end | Line inner end (visible) |
|---|---|---|---|---|---|
| 01 | 388, 225 | 286 | -62° | 402, 234 | (505, 299), r≈148 |
| 02 | 574, 92 | 276 | -14° | 578, 109 | (617, 282), r≈81 |
| 03 | 800, 131 | 279 | 35° | 791, 146 | (711, 272), r≈113 |
| 04 | 932, 318 | 295 | 82° | 915, 321 | (800, 348), r≈160 |
| 05 | 894, 544 | 314 | 126° | 879, 535 | (756, 457), r≈151 |
| 06 | 707, 676 | 323 | 168° | 703, 659 | (667, 501), r≈144 |
| 07 | 481, 637 | 319 | 210° | 490, 623 | (584, 474), r≈127 |
| 08 | 349, 451 | 305 | 253° | 365, 447 | (480, 421), r≈171 |

- Spoke angles are 45° apart (±3°). Radii are deliberately uneven (276-323).
- Each line is straight and 1 px wide. It is a gradient from #cdcdcd (alpha ≈ 0.2) at the outer end to transparent over 130-170 px toward the centre.
  The outer end stops 17 px short of the label.
- The headline overlaps the inner ends.

## 6. Hero → dark transition (t = 3.0-4.4 s)

**The flip is a fast tween, not a hard cut.** Background luminance by frame:

| t | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 |
|---|---|---|---|---|---|
| bg | 253 | 150 | 52 | 5 | 0 |

- That is about 0.3 s of ease-out starting at t≈3.25. All text follows inverted (the header is difference-blended, and the hero text tweens the same way).
- It is triggered by scroll passing a few px (S≈50-100), not scrubbed.

### Marker ring (t = 3.0-5.2)

- At t≈3.0-3.2 the 8 radii snap to an equal radius of **R = 300** about C=(640,359). The ring stays centred at (640,359) until about 3.9.
- The ring rotates **counter-clockwise**, ease-out. Angle of marker 03: 35° (t=2.9) → 10° (3.2) → -13° (3.6) → -26° (3.9). Total ≈ -60°+.
- The spokes become **curved, swept strokes** (see below).
- From about t=3.9 the whole group translates up with the scroll. The group centre y is ≈ 262 at t=4.0 and ≈ 193 at t=4.1.
  It continues to rise and rotate, and exits through the top by about t=5.2. Markers 01 and 08 are still visible at the top at t=5.1.

### Spoke curl

- At t≈3.0-3.3 each spoke shows 2-3 ghost copies (a motion-trail look) with slightly different angles.
- Then they resolve into a single thin curve. The marker end stays near-radial, and the inner end lags clockwise by about 15-25°, giving a pinwheel / swirl.
- Implement as a polyline or quadratic Bézier from r_in to r_out with angular lag θ(r) = lag·(1-(r-r_in)/(r_out-r_in))², lag ramping 0 → ~20° over 3.0-3.6 s.
- On dark, stroke is white with 1 px width and α≈0.35. The inner third fades out.

### Headline swap (masked line slides)

- Each headline line sits in an `overflow:hidden` mask. Lines slide **up**: the outgoing line goes 0 → -110% and the incoming line goes +110% → 0. Stagger is about 0.1 s per line, duration about 0.5 s.
- 3.2: "Refined & Bold" at y≈337 and "Essential" at y≈385 (already 25 px above their rest positions).
- 3.5: "Refined & Bold" is clipped at its top edge and "Essential" is at y≈350.
- 3.6-3.7: "Essential" is clipped away. "Simplicity & Clarity" starts rising from the bottom of its mask.
- 3.9: "Simplicity & Clarity" at y≈344 and "of Approach" mostly clipped.
- 4.0: "Simplicity & Clarity" at y≈180 and "of Approach" at y≈237 (clipped bottom at ≈255). Both are centred at x=640, white, same size as the hero.
- 4.2: both lines have scrolled off the top with the hero group.

## 7. Intro headline + photo bowl (t = 4.2-8.5)

### Headline

- In normal flow. First line top at y≈500 at t=4.4. At t=6.1 the headline block's last-3-lines box starts at y=120, and the headline "A" top is at y=62. It is gone by about t=7.0.
- Label `People & Process` shares the first line's top and sits in the indent at x=20.
- Tracked offset of the headline block relative to its t=6.1 position (y_off):

| t | 4.4 | 4.6 | 4.8 | 5.0 | 5.2 | 5.4 | 5.6 | 5.8 | 6.0 | 6.2 | 6.4 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| y_off | +380 | +331 | +324 | +274 | +246 | +184 | +122 | +77 | +8 | -49 | -107 |

### Cards

- 18 square photo cards, sharp corners, no border (an overall dark vignette is not applied). All the same crop of "team in an office" photos, object-fit: cover.
- **Strip state (t≈4.3-7.3).** Cards are **252 x 252 px**, upright, on a large "bowl", which is the bottom of a ring whose centre is *above* the viewport.
  - Fitted circle at t=6.1-6.3: centre ≈ (216-295, -770 to -1090), R ≈ 1370-1640, **angular pitch ≈ 11°** (centre spacing ≈ 305 px).
  - Card rotation follows the tangent: rot ≈ 0° at the bowl bottom (x≈250) and about -11° per card to the right (rising ccw). Left of the bottom rot is positive (+3° at x=110).
  - Cards slide **leftwards along the bowl at ≈ 300 px/s** (clockwise on this ring). New cards enter from the bottom-right (first visible at t≈4.2, right edge at t=5.1).
  - Card centres at t=6.3: (339, 541), (643, 489), (948, 373). At t=6.1: (110, 595), (400, 590), (704, 538), (1012, 409), (1270, 190).
  - The bowl rises with scroll: bowl-bottom y is ≈ 598 at t=6.1, ≈ 480 at 6.5 and ≈ 380 at 6.9 (before the morph at 7.3).
- Card order along the strip (left→right at t=6.1): man sitting on floor, woman at monitor, three women at table, girl at orange door, blonde at desk, then hand with polaroid, two brunettes with plan, colour-swatch hands, woman in brown sweater, fabric hands, brick garden. Any 18 images will do.

### Morph strip → ring (t = 7.3-9.1)

Run time-based (ease-out, about 1.2 s), scrubbed with lag, **including during the scroll pause 7.9-8.5**. Each card travels from its strip pose to its ring pose.

- Cards translate to a V-shaped pile: at t=7.7 the left arm goes down-right from (100,60) to a bottom at ≈ (700,600) and the right arm rises to (1200,100). Cards overlap heavily (pitch ≈ 190-240 px, size ≈ 250, rotations ±40°).
- Card size 252 → 195 (t=7.7-7.9) → 172 (7.9) → 136 (8.3) → 133 (8.5).
- Card rotation changes by 180°: upright-at-bottom → "top of card points outward from ring centre". Rotation = polar angle + β, with β going 180 → 0 over 7.3-8.5.
- Fitted ring parameters during the morph:

| t | centre | R | card size |
|---|---|---|---|
| 7.9 | (746, 452) | 321 | 172 |
| 8.3 | (613, 646) | 452 | 136 |
| 8.5 | (638, 770) | ~500 | 133 |
| 8.7 | (635, 710) | 522 | 133 |
| 9.1 | (637, 641) | 533 | 133 |
| ≥ 9.3 | (640, cy(t)) | **537** | **132-133** |

## 8. "2011 Year of Foundation" + ring (t = 8.5-12.5)

### Ring (final form)

- **18 cards, 132 x 132, R = 537, pitch 20°, centre x = 640.**
- Polar angle α is clockwise from top. Card centre = (640 + 537·sinα, cy − 537·cosα). **Rotation = α** (card top points outward: top cards upright, left cards -90°, bottom cards upside-down).
- Ring centre = centre of the heading + paragraphs block. It scrolls with the page:

| t | 8.7 | 9.1 | 9.5 | 9.9 | 10.3 | 10.5 | 10.7 | 10.9 | 11.1 | 11.5 | 11.9 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| cy (frame y) | 710 | 646 | 535 | 388 | 241 | 200 | 194 | 187 | 126 | -22 | -160 |

- **Ring spin is counter-clockwise** (right side moves up). Phase p (card angles = p + 20k):

| t | 8.5 | 8.9 | 9.1 | 9.3 | 9.5 | 9.7 | 10.5 | 10.7 | 11.1 | 11.5 |
|---|---|---|---|---|---|---|---|---|---|---|
| p (mod 20) | 17.9 | 14.1 | 11.8 | 6.4 | 3.0 | 0.3 | 9.6 | 6.7 | 3.7 | 14.0 |

  That is about -22°/s during scroll bursts and slower during holds. Model it as **dψ ≈ -0.07° per scroll px** with 1 s smoothing.
- At t=10.5 (frame 106) the card centres are:

| Card | Centre (x, y) |
|---|---|
| A | (105, 155) |
| B | (125, 350) |
| C | (213, 527) |
| D | (360, 640) |
| E | (550, 690) |
| F | (735, 690) |
| G | (925, 640) |
| H | (1070, 520) |
| I | (1160, 345) |
| J | (1170, 148) |

### Heading block

- In normal flow, centred at x=640.
- Heading y offset relative to t=10.5 (y_off):

| t | 8.7 | 8.9 | 9.1 | 9.3 | 9.5 | 9.7 | 9.9 | 10.1 | 10.3 | 10.5 | 10.7 | 10.9 | 11.1 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| y_off | +527 | +495 | +445 | +364 | +334 | +258 | +190 | +108 | +41 | 0 | -6 | -13 | -76 |

- At t=10.5: line 1 "2011 Year" centre y≈115 (digits 73-156), line 2 "of Foundation" centre y≈215. The paragraphs are at y=316 and 329.
  Paragraph columns: L spans x 389-601 (centre 495). R spans x 671-902 (centre 786). Paragraph colour is white at 50%.
- The heading is pure white (255).

## 9. Pile and stats stage (t = 12.5-20.2)

### Pile

- t≈12.3-12.7: the old ring's bottom arc leaves the top.
- t=12.7-13.5: cards collapse into a **messy pile** with random rotations. Pile bounding-box centroid by time: 12.7 (435, 125) → 12.9 (390, 190) → 13.1 (340, 370) → 13.3 (300, 520) → 13.5 (300, 540).
  Bounding box at 13.1 is x 21-625, y 159-582.
- t=13.5-14.3: cards spread into the new ring.

### Stats ring

- Same 18 cards, same R=537. **Centre x = 0** (the ring is tangent to the left edge). Only its right-hand arc is visible, at x≈100-600.
- Centre y:

| t | 14.3 | 14.7 | 15.1 | 15.5 | 15.9 | 16.7 | 17.1 | 17.5 | 17.9 | 18.3 | 18.7 | 19.1 | 19.5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cy | 837 | 722 | 615 | 558 | 467 | 361 | 360 | 242 | 175 | 69 | -36 | -50 | -129 |

- Ring spin continues counter-clockwise at about -0.08° per scroll px (phase 11.7 at 14.3, 2.5 at 14.7, …).

### Stat list

- In flow. Left x=690 (numbers and 2nd lines), description first line indented to x=778.
- Item pitch **356 px**. Number height 84, then description 2 lines (~135 px tall).
  The block is about 235 px, leaving a ~120 px gap.
- Number top y by time (frame coords):

| t | 15+ | 490+ | 45+ | 40K |
|---|---|---|---|---|
| 13.0 | 500 | | | |
| 13.4 | 448 | | | |
| 13.8 | 336 | | | |
| 14.2 | 236 | | | |
| 14.6 | 125 | 483 | | |
| 15.0 | ≈10 | 333 | | |
| 15.4 | | 316 | | |
| 15.8 | | 205 | | |
| 16.2 | | 95 | 454 | |
| 16.6 | | 70 | 416 | |
| 17.0 | | 68 | 414 | |
| 17.4 | | | 339 | |
| 17.8 | | | 252 | |
| 18.2 | | | 170 | 526 |
| 18.6 | | | 29 | 372 |
| 19.0 | | | | 343 |
| 19.4 | | | | 265 |
| 19.8 | | | | 115 |

- **Active/dim state.** An item becomes active when its number top crosses **y≈360 (viewport centre)**. The previously active item dims at the same instant.
  The change is a ~0.3-0.4 s colour tween (number #fff ↔ ≈#363636, description ≈#d8d8d8 ↔ ≈#2d2d2d), not scrubbed.
  Example: at t=14.6 the top of 490+ is 483 (dim, 60), at 15.0 it is 333 (mid, 206 → bright), at 15.4 it is 316 (255).
- Item states over time: 15+ active 13.8-14.9; 490+ active 14.9-17.3; 45+ active 17.3-18.9; 40K active 18.9-20.0.
  At the end of the section 40K dims to ≈#3b3b3b by t≈20.2 (the whole list fades as the section exits).

## 10. Logos section (t = 19.9-26.3)

### Headline

- Centred x=640. 6 lines, pitch 95, serif ~120 px, white, tight. In normal flow.
- The text sits **above** the ring badges (z-order: badges behind).
- Offset (y_off) relative to its t=23.4 position:

| t | 21.1 | 21.3 | 21.5 | 21.7 | 21.9 | 22.1-23.3 | 23.5 | 23.7 | 23.9-24.5 | 24.7 | 24.9 | 25.1-25.3 | 25.5 | 25.9 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| y_off | +288 | +214 | +145 | +84 | +43 | +31 (hold) | -27 | -47 | -52 (hold) | -68 | -121 | -130 | -200 | -353 |

- At y_off=0 (t=23.4): "The" cap top ≈ y 45, "World's Most" baseline ≈ 225, "Work With Us" baseline ≈ 605.
- Headline first appears from the bottom edge at t≈19.9 and has fully exited at ≈26.3.

### Badge ring

- Fits an **ellipse**, as a tilted flat ring seen in perspective.
  - Centre (640, 384) at t=23.4 (57 px below the headline's centre). Semi-axes **461 (major) × 296 (minor)**, major axis rotated about -17° (right side up).
  - The centre moves up with the page (≈ 1:1).
- Badge diameter scales with depth, from **78 px (back/top) to 114 px (front/bottom)**.
- Badge fill and text brightness depend on depth: 25/255 at the back (top-left) to 246/255 at the front (bottom-right).
  Brightness ≈ linear in u = (y−384) + 0.35·(x−640): 25 at u=-300, ≈135 at u=0, 246 at u=+300.
  Implement as a CSS `filter: brightness()` or an opacity ramp.
- Badge centres at t=23.4 (frame coords), clockwise from the top:

| # | (x, y) | Ø |
|---|---|---|
| 1 | (708, 72) | 80 |
| 2 | (848, 78) | 84 |
| 3 | (980, 128) | 88 |
| 4 | (1074, 230) | 96 |
| 5 | (1080, 370) | 102 |
| 6 | (1010, 492) | 108 |
| 7 | (904, 584) | 112 |
| 8 | (778, 650) | 112 |
| 9 | (642, 688) | 114 |
| 10 | (500, 698) | 112 |
| 11 | (362, 672) | 108 |
| 12 | (244, 596) | 102 |
| 13 | (190, 470) | 94 |
| 14 | (228, 334) | 88 |
| 15 | (318, 228) | 82 |
| 16 | (436, 148) | 80 |
| 17 | (568, 96) | 78 |

- Badge disc is a light-gray/white circle with a dark logo. Back badges are near-black grey.
- **Spin: counter-clockwise** (right side moves up). Right-edge speed ≈ **460 px/s during scroll bursts, ≈ 115 px/s during holds**. That is roughly ≈ 0.3° per scroll px with smoothing, i.e. about one full turn per 1,200 px of scroll.
- The ring rises from the bottom with the headline. At t=20.7 the first badges (ERA, COLDY, "o.properties") are visible at the right of the first headline line.

## 11. Footer and KNKO (t = 26.0-28.3)

- Footer is normal flow, black, ≈ 100vh (704) tall.
- Footer top-row y over time: 26.1: 465, 26.3: 378, 26.5: 357, 26.7: 353, 26.9: 351, 27.1: 313, 27.3: 230, 27.5: 143, 27.7: 38, 27.9: 15, 28.1: 9, **28.3: 8 (final)**. The last stretch is a fast flick followed by an eased stop.
- **KNKO wordmark.** Normal flow with a per-letter lag. Letter-top y at t=27.9: K=362, N=375, K=392, O≈407. At 28.1: 329 / 335 / 342 / 345. At 28.3: 319 / 321 / 324 / 321.
  It settles at **316** (cap top) and **668** (baseline) by t=28.5. The O overshoots (round glyph, 309-675).
  Implement as `translateY(velocity * i * k)` per letter with smoothing, i=0..3, and decay ≈ 0.4 s.
- Not sticky and no reveal-from-under. It is a regular scrolling element.
- The footer is the last element. At the end the header is hidden (see §4).

## 12. Master timeline summary (video time → what happens)

| t (s) | Event |
|---|---|
| 0-3.0 | Static light hero. 8 spokes + labels, headline. |
| 3.0-3.25 | Spokes ghost/curl, radii equalise to R=300, ring rotates ccw. |
| 3.25-3.55 | Light → black tween. Header and text invert. |
| 3.2-4.2 | Headline swaps by masked line slides to "Simplicity & Clarity of Approach", which then scrolls out with the hero ring (gone by ≈ 5.2). |
| 4.2-7.0 | "A studio shaped…" scrolls up. Card bowl slides left under it. |
| 7.0-8.5 | Headline gone. Bowl → V-pile → small ring morph (252 → 133 px cards, β 180° → 0). |
| 8.5-12.5 | "2011 Year of Foundation" + ring R=537, 18 cards, ring spins ccw. |
| 12.5-14.3 | Ring leaves the top, pile forms (12.7-13.5), then reopens as a ring centred on x=0. |
| 13.8-20.0 | Stats list. Active state = item crossing viewport centre. Ring on the left, spinning ccw. |
| 19.9-26.3 | Logos headline over tilted ellipse badge ring, spinning ccw, with depth brightness. |
| 26.0-28.3 | Footer scrolls in. Nav hides ≈ 27.7. KNKO letters settle ≈ 28.5. |
| 28.3-30 | Rest at bottom. |
