# KNKO – scroll-driven site recreated from a screen recording

A dependency-free (plain HTML/CSS/JS) recreation of the Kononenko Architectural Bureau
scroll experience seen in the reference video.

Run it with any static server, e.g.

```bash
npx serve .      # or: python3 -m http.server
```

then open `index.html` and scroll.

## How it works
* `index.html` / `styles.css` – a fixed 1280px-wide stage, scaled to the viewport, plus a spacer
  that provides the native scrollbar (document height ≈ 6100 design px).
* `main.js` – every element is a pure function of the scroll position `S`:
  * layout (text blocks, stats, brands headline, footer) moves 1:1 with a lightly smoothed scroll,
  * animated pieces (photo ring morph and spin, brand-badge ellipse, active stat colours) follow a
    heavily smoothed scroll mapped back to the timing of the recording (`TS` table),
  * the hero light→dark flip, spoke curl and headline swap are a time-driven transition that is
    triggered by scrolling and reverses when scrolling back,
  * the KNKO wordmark letters lag the scroll with different time constants.
* `assets/photos` (17 team photos) and `assets/logos` (17 client badges) were cut out of the video
  frames; `SPEC.md` is the measured motion/typography spec the build is based on.
* Fonts: Inter Tight (sans) and Newsreader (serif), bundled in `assets/fonts`.

Debug helpers: `?s=<px>` opens the page snapped to a scroll position (`&freeze` stops the loop).
