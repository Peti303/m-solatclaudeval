/* KNKO — scroll-driven recreation.
 *
 * Everything is drawn on a fixed 1280px-wide "stage" that is scaled to the viewport. A normal-height
 * spacer provides the native scrollbar; S (design px) is the scroll position. All motion below is a
 * function of S — "layout" things move 1:1 with Sf (lightly smoothed S), "animated" things (ring
 * morph, spin, active states) follow Ss (heavily smoothed S, ~0.45s) mapped back to the timing of the
 * reference recording via T(S).
 */
(() => {
'use strict';

/* ------------------------------------------------------------------ helpers */
const $ = (s, r = document) => r.querySelector(s);
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
const easeInOut = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
const D2R = Math.PI / 180;

// piece-wise linear lookup, tbl = [[x,y],...] ascending in x
function pw(tbl, x) {
  if (x <= tbl[0][0]) return tbl[0][1];
  for (let i = 1; i < tbl.length; i++) {
    if (x <= tbl[i][0]) {
      const [x0, y0] = tbl[i - 1], [x1, y1] = tbl[i];
      return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
    }
  }
  return tbl[tbl.length - 1][1];
}
function rng(seed) { // tiny deterministic PRNG
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/* ------------------------------------------------- scroll <-> recording time */
// [video time (s), scroll S (design px)] measured from the recording
const TS = [
  [3.0, 0], [3.2, 20], [3.9, 60], [4.2, 175], [4.4, 328], [5.0, 434], [5.6, 586], [6.0, 700], [6.4, 815], [7.3, 1055], [7.9, 1212], [8.5, 1224],
  [8.7, 1245], [9.5, 1438], [10.5, 1772], [11.1, 1848], [11.9, 2132], [13.0, 2415], [14.6, 2790],
  [17.0, 3205], [19.8, 3860], [21.1, 4231], [22.1, 4490], [23.3, 4496], [23.5, 4570], [25.9, 4872],
  [26.1, 4939], [26.3, 5026], [26.5, 5047], [26.9, 5053], [27.1, 5091], [27.3, 5174], [27.5, 5261], [27.7, 5366], [27.9, 5389], [28.1, 5395], [28.3, 5396]
];
const S_OF_T = t => pw(TS, t);
const TS_INV = TS.map(([t, s]) => [s, t]);
const T_OF_S = s => pw(TS_INV, s);

/* ---------------------------------------------------------------- page data */
const DOC = 6100;              // total document height (design px)
const PAGE = {                 // page-y of things (design px, i.e. recording frame y - 8)
  intro: 770,                  // top of intro block
  found: 1829,                 // top of "2011 Year" block
  ringCY: 1966,                // centre of the photo ring in section 3
  stat0: 2900, statPitch: 356, // top of first stat + pitch
  brands: 4575,                // top of brands headline
  badgeCY: 4897                // centre of badge ellipse
};

/* ------------------------------------------------------------------ elements */
const stage = $('#stage'), scroller = $('#scroller'), bg = $('#bg'), hero = $('#hero'),
  spokesSvg = $('#spokes'), markersEl = $('#markers'), intro = $('#intro'), found = $('#found'),
  cardsEl = $('#cards'), statsEls = [...document.querySelectorAll('.stat')], badgesEl = $('#badges'),
  brands = $('#brands'), footer = $('#footer'), knko = $('#knko'), knkoLetters = [...knko.children],
  heroA = [...document.querySelectorAll('#hero-a .ml>span')], heroB = [...document.querySelectorAll('#hero-b .ml>span')];

/* photo cards: strip order left→right is p03, p04 … p17, p01, p02 */
const N = 17;
const cards = [];
for (let j = 0; j < N; j++) {
  const f = ((j + 2) % N) + 1;
  const d = document.createElement('div');
  d.className = 'card';
  d.innerHTML = `<img alt="" draggable="false" src="assets/photos/p${String(f).padStart(2, '0')}.jpg">`;
  cardsEl.appendChild(d);
  cards.push(d);
}
// pile pose of each card (used between the two ring layouts)
const rnd = rng(7);
const pileOff = cards.map(() => ({ x: (rnd() - .5) * 470, y: (rnd() - .5) * 280, r: (rnd() - .5) * 150 }));

/* hero markers + spokes */
const SPOKE = [ // label angle (deg, clockwise from 12 o'clock), radius, inner end radius
  [-62, 286, 148], [-14, 276, 81], [35, 279, 113], [82, 295, 160],
  [126, 314, 151], [168, 323, 144], [210, 319, 127], [253, 305, 171]
];
const svgNS = 'http://www.w3.org/2000/svg';
const defs = document.createElementNS(svgNS, 'defs');
spokesSvg.appendChild(defs);
const markers = [], spokes = [];
SPOKE.forEach((_, i) => {
  const m = document.createElement('span');
  m.textContent = String(i + 1).padStart(2, '0');
  markersEl.appendChild(m); markers.push(m);
  const g = document.createElementNS(svgNS, 'linearGradient');
  g.setAttribute('gradientUnits', 'userSpaceOnUse');
  g.innerHTML = '<stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>';
  defs.appendChild(g);
  const p = document.createElementNS(svgNS, 'path');
  p.setAttribute('fill', 'none'); p.setAttribute('stroke-width', '1');
  p.setAttribute('stroke', `url(#g${i})`); g.id = 'g' + i;
  spokesSvg.appendChild(p);
  spokes.push({ p, g });
});

/* brand badges */
const BADGE_PTS = [ // [x,y] at t=23.4 in recording-frame coordinates, clockwise from the top
  [708, 72], [848, 78], [980, 128], [1074, 230], [1080, 370], [1010, 492], [904, 584], [778, 650], [642, 688],
  [500, 698], [362, 672], [244, 596], [190, 470], [228, 334], [318, 228], [436, 148], [568, 96]
];
const BE = { cx: 640, cy: 384, a: 461, b: 296, tilt: -17 * D2R };
const BADGE_SHIFT = 1; // which logo sits on the first table point
const badges = BADGE_PTS.map(([x, y], i) => {
  const rx = x - BE.cx, ry = y - BE.cy;
  const c = Math.cos(-BE.tilt), s = Math.sin(-BE.tilt);
  const ux = rx * c - ry * s, uy = rx * s + ry * c;
  const phi0 = Math.atan2(uy / BE.b, ux / BE.a) / D2R;
  const el = document.createElement('div');
  el.className = 'badge';
  const n = ((i + BADGE_SHIFT) % 17) + 1;
  el.innerHTML = `<img alt="" draggable="false" src="assets/logos/l${String(n).padStart(2, '0')}.png">`;
  badgesEl.appendChild(el);
  return { el, phi0 };
});

/* ------------------------------------------------------------------- layout */
const KNKO_TOP = 242;
let k = 1, Wd = 1280, Hd = 704, CX = 640, HC = 352;
function resize() {
  k = innerWidth / 1280;
  if (innerHeight / k < 520) k = innerHeight / 520;
  Wd = innerWidth / k; Hd = innerHeight / k; CX = Wd / 2; HC = Hd / 2;
  stage.style.width = Wd + 'px'; stage.style.height = Hd + 'px';
  stage.style.transform = `scale(${k})`;
  stage.style.setProperty('--hc', HC); stage.style.setProperty('--cx', CX);
  scroller.style.height = DOC * k + 'px';
  spokesSvg.setAttribute('viewBox', `0 0 ${Wd} ${Hd}`);
  // KNKO wordmark: cap height 352, stretched horizontally to span the page width
  knko.style.fontSize = '484px'; knko.style.transform = 'none';
  const w = knko.getBoundingClientRect().width / k;
  knko.style.transformOrigin = '0 0';
  const sc = (Wd - 38) / (w - 28.8);
  knko.style.transform = `scaleX(${sc})`;
  knko.style.left = (20 - 31.6 * sc) + 'px';
  knko.style.top = KNKO_TOP + 'px';
}
addEventListener('resize', resize);
resize();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);

/* -------------------------------------------------------------------- state */
const q = new URLSearchParams(location.search);
let S = 0, Sf = 0, Ss = 0, u = 0, last = performance.now(), prevSf = 0, vel = 0;
const act = [0, 0, 0, 0];
const lagS = [0, 0, 0, 0];
const getS = () => scrollY / k;

function snapTo(s, uo) {
  scrollTo(0, s * k);
  S = Sf = Ss = prevSf = s; vel = 0; lagS.fill(s);
  u = uo !== undefined ? uo : (s > 25 ? clamp(T_OF_S(s) - 3.2 + 0.15, 0, 1.7) : 0);
  act.fill(0);
  statsActive(Sf, true);
  frame(0);
}
window.__snap = snapTo;

const HERO_DY = [[0, 0], [60, 0], [100, 97], [140, 166], [175, 240], [328, 560], [490, 900], [700, 1200]];
/* -------------------------------------------------------------------- hero */
function drawHero(dyScroll) {
  const bgl = easeOut((u - .25) / .3);
  const lum = 253 * (1 - bgl);
  bg.style.background = `rgb(${lum | 0},${lum | 0},${lum | 0})`;
  const ink = Math.round(255 - lum);
  stage.style.setProperty('--ink', `rgb(${ink},${ink},${ink})`);

  const snap = easeOut(u / .25), rot = easeOut(u / .9), curl = easeOut(u / .6);
  const extra = -0.15 * Math.max(0, Sf - 60);
  const Cx = CX, Cy = HC - 1;
  const a = 0.3 + 0.3 * bgl;
  SPOKE.forEach(([a0, r0, rin0], i) => {
    const r = lerp(r0, 300, snap);
    const ang = (a0 - 62 * rot + extra) * D2R;
    markers[i].style.transform = `translate(${Cx + r * Math.sin(ang)}px,${Cy - r * Math.cos(ang)}px)`;
    const rOut = r - 17, rIn = lerp(rin0, 110, snap);
    const lag = 22 * curl;
    let d = '';
    const n = 18;
    for (let s = 0; s <= n; s++) {
      const t = s / n, rr = lerp(rIn, rOut, t);
      const th = ang + lag * Math.pow(1 - t, 2) * D2R;
      d += (s ? 'L' : 'M') + (Cx + rr * Math.sin(th)).toFixed(1) + ' ' + (Cy - rr * Math.cos(th)).toFixed(1);
    }
    const { p, g } = spokes[i];
    p.setAttribute('d', d);
    const th1 = ang + lag * D2R;
    g.setAttribute('x1', Cx + rOut * Math.sin(ang)); g.setAttribute('y1', Cy - rOut * Math.cos(ang));
    g.setAttribute('x2', Cx + rIn * Math.sin(th1)); g.setAttribute('y2', Cy - rIn * Math.cos(th1));
    const st = g.children[0];
    st.setAttribute('stop-color', bgl > .5 ? '#fff' : '#000');
    st.setAttribute('stop-opacity', a * (bgl > .5 ? 1 : .9));
  });
  heroA.forEach((el, i) => { el.style.transform = `translateY(${-110 * easeInOut((u - .2 - .1 * i) / .5)}%)`; });
  heroB.forEach((el, i) => { el.style.transform = `translateY(${110 * (1 - easeOut((u - .55 - .1 * i) / .5))}%)`; });
  hero.style.transform = `translateY(${-dyScroll}px)`;
  hero.style.display = dyScroll > 900 ? 'none' : '';
}

/* ------------------------------------------------------------- photo cards */
// strip → "V" bowl (t = 7.3 … 7.7), described as a ring seen from below
const KR = [[7.3, 1500], [7.7, 600]];
const KP = [[7.3, 11.5], [7.7, 19]];
const KS = [[7.3, -1], [7.7, -.9]];
const KSIZE = [[7.3, 252], [7.7, 195]];
const KCX = [[7.3, 250], [7.7, 700]];
const V_JC = 3.7, V_CY = 76;
const PILE = [[12.4, 435, 117], [12.7, 435, 117], [12.9, 390, 182], [13.1, 340, 362], [13.3, 300, 512], [13.5, 300, 532], [14.5, 300, 532]];
const CY2 = [[13.5, 1000], [14.3, 829], [14.7, 714], [15.1, 607], [15.5, 550], [15.9, 459], [16.7, 353], [17.1, 352],
  [17.5, 234], [17.9, 167], [18.3, 61], [18.7, -44], [19.1, -58], [19.5, -137], [21.1, -456]]
  .map(([t, y]) => [S_OF_T(t), y]);
const SPIN = 0.08; // deg per scroll px
const jc0 = ss => 0.47 - 0.9 * (1 - sstep(420, 640, ss)) + 0.004 * Math.max(0, ss - 708);
const jcF = ss => 14 + (SPIN / 21.18) * (ss - 1420);

function placeCards() {
  const tau = T_OF_S(Ss);
  const vis = tau < 21.6 && Sf > 250;
  cardsEl.style.display = vis ? '' : 'none';
  if (!vis) return;

  const morph = tau < 8.7;
  // pose A: the bowl / V (frozen at t=7.7 once reached)
  let R, P, s, size, cx, cy, jc;
  if (morph) {
    const t = clamp(tau, 7.3, 7.7);
    R = pw(KR, t); P = pw(KP, t); s = pw(KS, t); size = pw(KSIZE, t); cx = pw(KCX, t);
    const yb = (598 - 8) - 0.7 * (Sf - 708) + 70 * (1 - clamp((Sf - 420) / 300));        // bottom of the strip (design px)
    const w = sstep(7.3, 7.7, tau);
    cy = lerp(yb - 1500, V_CY, w);
    if (tau < 7.3) { cy = yb - 1500; cx = 250; }
    jc = lerp(jc0(Ss), V_JC, w);
  }
  const ring1 = tau < 13.3;
  const rho = tau < 12.4 ? 0 : tau < 13.1 ? sstep(12.4, 13.1, tau) : tau < 13.5 ? 1 : 1 - sstep(13.5, 14.5, tau);
  const pcx = pw(PILE.map(r => [r[0], r[1]]), tau), pcy = pw(PILE.map(r => [r[0], r[2]]), tau);
  const cy2 = pw(CY2, Sf);

  for (let j = 0; j < N; j++) {
    let x, y, rot, sz;
    const ringPose = (rcx, rcy) => {
      const al = 21.18 * (j - jcF(Ss)) * D2R;
      return [rcx + 537 * Math.sin(al), rcy - 537 * Math.cos(al), al / D2R];
    };
    if (morph) {
      const al = P * (j - jc) * D2R;
      x = cx + R * Math.sin(al); y = cy - s * R * Math.cos(al);
      rot = Math.atan2(s * Math.sin(al), Math.cos(al)) / D2R; sz = size;
      const e = easeInOut((tau - 7.65 - 0.02 * Math.abs(j - V_JC)) / 0.45);
      if (e > 0) {                                    // cards peel off the V and fly onto the ring
        const [bx, by, br] = ringPose(CX, PAGE.ringCY - Sf);
        let dr = br - rot; dr -= 360 * Math.round(dr / 360);
        x = lerp(x, bx, e); y = lerp(y, by, e); rot += dr * e; sz = lerp(sz, 132, e);
      }
    } else {
      const rcx = ring1 ? CX : 0, rcy = ring1 ? PAGE.ringCY - Sf : cy2;
      [x, y, rot] = ringPose(rcx, rcy); sz = 132;
      if (rho > 0) {
        const po = pileOff[j];
        x = lerp(x, pcx + po.x, rho); y = lerp(y, pcy + po.y, rho);
        let dr = po.r - rot; dr -= 360 * Math.round(dr / 360);
        rot += dr * rho;
      }
    }
    const el = cards[j];
    if (x < -300 || x > Wd + 300 || y < -300 || y > Hd + 300) { el.style.display = 'none'; continue; }
    el.style.display = '';
    el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${(sz / 252).toFixed(4)})`;
  }
}

/* ------------------------------------------------------------------- stats */
function statsActive(sf, instant) {
  const tops = statsEls.map((_, i) => PAGE.stat0 + PAGE.statPitch * i - sf);
  let idx = -1;
  tops.forEach((t, i) => { if (t <= HC + 8) idx = i; });
  if (idx === 3 && tops[3] < 40) idx = -1;
    statsEls.forEach((el, i) => {
    const tgt = i === idx ? 1 : 0;
    if (instant) act[i] = tgt;
    const a = act[i];
    const n = Math.round(lerp(0x36, 255, a)), d = Math.round(lerp(0x2d, 0xd8, a));
    el.style.setProperty('--a-num', `rgb(${n},${n},${n})`);
    el.style.setProperty('--a-desc', `rgb(${d},${d},${d})`);
  });
  return idx;
}

/* ------------------------------------------------------------------ badges */
function placeBadges() {
  const sp = -0.25 * (Ss - 4521);
  const cy = PAGE.badgeCY - Sf, cxx = CX + 5;
  const on = cy > -500 && cy < Hd + 500;
  badgesEl.style.display = on ? '' : 'none';
  if (!on) return;
  const c = Math.cos(BE.tilt), s = Math.sin(BE.tilt);
  badges.forEach(b => {
    const ph = (b.phi0 + sp) * D2R;
    const ex = BE.a * Math.cos(ph), ey = BE.b * Math.sin(ph);
    const rx = ex * c - ey * s, ry = ex * s + ey * c;
    const uu = ry + 0.35 * rx;
    const t = clamp((uu + 300) / 600);
    const size = 78 + 36 * t, bright = (25 + 221 * t) / 246;
    b.el.style.transform = `translate3d(${(cxx + rx).toFixed(1)}px,${(cy + ry).toFixed(1)}px,0) scale(${(size / 114).toFixed(3)})`;
    b.el.style.filter = `brightness(${bright.toFixed(3)})`;
    b.el.style.zIndex = Math.round(t * 10);
  });
}

/* -------------------------------------------------------------------- frame */
function frame(dt) {
  const dyScroll = pw(HERO_DY, Sf);
  drawHero(dyScroll);

  const place = (el, py) => { el.style.transform = `translate3d(0,${(py - Sf).toFixed(1)}px,0)`; };
  place(intro, PAGE.intro);
  place(found, PAGE.found);
  statsEls.forEach((el, i) => place(el, PAGE.stat0 + PAGE.statPitch * i));
  place(brands, PAGE.brands);
  place(footer, DOC - Hd);

  placeCards();
  placeBadges();

  // KNKO: per-letter lag while scrolling
  knkoLetters.forEach((l, i) => {
    lagS[i] += (Sf - lagS[i]) * (1 - Math.exp(-dt / (0.3 + 0.1 * i)));
    l.style.transform = `translate3d(0,${clamp(Sf - lagS[i], -320, 320).toFixed(1)}px,0)`;
  });

  document.body.classList.toggle('at-end', Sf > 5330);
}

function tick(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  S = getS();
  Sf += (S - Sf) * (1 - Math.exp(-dt / 0.07));
  Ss += (S - Ss) * (1 - Math.exp(-dt / 0.45));
  if (Math.abs(S - Sf) < .01) Sf = S;
  // hero: time-driven transition triggered by scrolling
  const target = Sf > 25 ? 1.7 : 0;
  u += clamp(target - u, -dt, dt);
  vel += (((Sf - prevSf) / Math.max(dt, 1e-3)) - vel) * (1 - Math.exp(-dt / 0.25));
  prevSf = Sf;
  // smooth the active transitions
  const idx = statsActive(Sf, false);
  statsEls.forEach((_, i) => { act[i] += ((i === idx ? 1 : 0) - act[i]) * (1 - Math.exp(-dt / 0.14)); });
  frame(dt);
  requestAnimationFrame(tick);
}

if (q.has('s')) snapTo(parseFloat(q.get('s')));
else { S = Sf = Ss = getS(); lagS.fill(S); u = S > 25 ? 1.7 : 0; }
if (!q.has('freeze')) requestAnimationFrame(t => { last = t; tick(t); });
else frame(0);
})();
