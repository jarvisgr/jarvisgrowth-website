/* ==========================================================================
   Nimbus Farm landing page: content data + Alpine components.
   Load order in index.html: Alpine plugins -> this file -> Alpine core.
   ========================================================================== */
(() => {
  'use strict';

  /* Motion is ON by default. The OS "reduce motion" flag is often switched on by
     Windows "Show animations: off", which silently killed every effect. Visitors who
     really want calm can add ?calm to the URL (remembered in localStorage). */
  const calmQuery = /[?&]calm\b/.test(location.search);
  if (calmQuery) { try { localStorage.setItem('nf-calm', '1'); } catch (_) {} }
  if (/[?&]motion\b/.test(location.search)) { try { localStorage.removeItem('nf-calm'); } catch (_) {} }
  let calmStored = false;
  try { calmStored = localStorage.getItem('nf-calm') === '1'; } catch (_) {}
  const reduce = calmQuery || calmStored;
  if (reduce) document.documentElement.classList.add('calm');
  const canHover = window.matchMedia('(hover: hover)').matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const ABORT = Symbol('abort');
  const fmt = (n) => Math.round(n).toLocaleString('en-US');

  /* ======================================================================
     CONTENT. Everything marketing-facing that is a number, price, review or
     claim lives here, so real values can be dropped in without touching
     markup.

     !!! PLACEHOLDER DATA !!!
     The numbers, reviews, review-site scores and prices below are SAMPLE
     content so the design can be judged. Replace them with real, verifiable
     figures before launch. Publishing invented testimonials or ratings is
     deceptive and illegal in many jurisdictions (e.g. FTC rules on fake
     reviews). Link every review-site badge to your live profile page.
     ====================================================================== */
  const DATA = {
    brand: 'Nimbus Farm',

    stats: [
      { value: 2400000, suffix: '+', compact: true, label: 'Followers grown for clients' },
      { value: 1850, suffix: '+', label: 'Active Instagram accounts managed' },
      { value: 38000000, suffix: '+', compact: true, label: 'Real-device actions completed' },
      { value: 99.9, suffix: '%', dec: 1, label: 'Fleet uptime, trailing 30 days' },
    ],

    sites: [
      { name: 'Trustpilot', score: 4.8, count: '1,240', label: 'Excellent', tone: 'ok', href: '#' },
      { name: 'G2', score: 4.7, count: '312', label: 'High Performer', tone: 'orange', href: '#' },
      { name: 'Capterra', score: 4.8, count: '205', label: 'Top Rated', tone: 'cyan', href: '#' },
      { name: 'Google', score: 4.9, count: '468', label: 'Customer reviews', tone: 'violet', href: '#' },
    ],

    reviews: [
      { src: 'Trustpilot', stars: 5, title: 'Finally, automation that does not feel like automation', body: 'We moved eleven client accounts over from an API tool. The difference in account stability was obvious inside a month, and being able to watch the phone live removed all the guessing.', name: 'Daniel R.', role: 'Agency founder', img: 12 },
      { src: 'G2', stars: 5, title: 'The live view sold me', body: 'I log in, pick the iPhone, and I am literally watching it follow and like. Support set up our limits on day one. Zero hardware to manage.', name: 'Priya S.', role: 'Growth lead, DTC brand', img: 47 },
      { src: 'Trustpilot', stars: 5, title: 'Went from 2k to 19k in a quarter', body: 'Posting, engagement and DMs on schedule while I focus on content. The daily stats email is the first thing I read each morning.', name: 'Marcus T.', role: 'Fitness coach', img: 33 },
      { src: 'Capterra', stars: 5, title: 'Real iPhones make a real difference', body: 'We tried emulators and Android farms first. Maintenance was a nightmare. Here it is just a dashboard and a result.', name: 'Elena V.', role: 'Social media manager', img: 5 },
      { src: 'Google', stars: 5, title: 'Fast onboarding, honest advice', body: 'They told us to warm accounts up slowly and keep caps conservative instead of promising miracles. That honesty is why we stayed.', name: 'Tom H.', role: 'Local business owner', img: 15 },
      { src: 'Trustpilot', stars: 4, title: 'Great tool, great team', body: 'Dashboard is clean, stats are detailed, and the action log makes client reporting trivial. Would love even more scheduling presets.', name: 'Aisha K.', role: 'Freelance marketer', img: 25 },
      { src: 'G2', stars: 5, title: 'Replaced three tools', body: 'Auto-posting, outreach and engagement in one place, running on actual hardware. Our team stopped fighting API changes.', name: 'Jonas B.', role: 'Head of social, agency', img: 52 },
      { src: 'Trustpilot', stars: 5, title: 'Support replies in minutes', body: 'A phone needed a refresh and it was handled before I noticed. This is what a managed service should feel like.', name: 'Camila O.', role: 'Creator', img: 9 },
      { src: 'Capterra', stars: 5, title: 'Reporting my clients actually read', body: 'Daily stats and a full action trail. I send screenshots from the dashboard and clients finally understand what they pay for.', name: 'Ryan P.', role: 'Agency owner', img: 60 },
      { src: 'Google', stars: 5, title: 'Pays for itself', body: 'Our bookings from Instagram DMs roughly doubled. Setup was painless and nothing to install on our side.', name: 'Sofia M.', role: 'Salon owner', img: 44 },
      { src: 'G2', stars: 4, title: 'Solid and transparent', body: 'I like that the limits and pacing are visible and adjustable. No black box. Wish there were more iPhone models to pick from.', name: 'Liam W.', role: 'E-commerce operator', img: 68 },
      { src: 'Trustpilot', stars: 5, title: 'Best decision for our brand account', body: 'Consistent daily activity without hiring another social manager. Engagement rate is up and the account looks naturally busy.', name: 'Hana L.', role: 'Brand manager', img: 21 },
    ],

    cases: [
      { handle: '@atelier.lune', niche: 'Fashion brand', start: 2140, end: 18900, seed: 7, kpis: [['Profile visits', '+412%'], ['Link clicks', '+298%'], ['Engagement rate', '4.9%'], ['Posts / week', '14']] },
      { handle: '@coach.marcus', niche: 'Fitness creator', start: 5300, end: 31400, seed: 21, kpis: [['Profile visits', '+365%'], ['DM leads', '+520%'], ['Engagement rate', '5.6%'], ['Posts / week', '10']] },
      { handle: '@brewhaus.local', niche: 'Local business', start: 640, end: 7250, seed: 33, kpis: [['Profile visits', '+640%'], ['Bookings via DM', '+180%'], ['Engagement rate', '6.2%'], ['Posts / week', '7']] },
    ],

    signals: {
      api: {
        label: 'API tools', blurb: 'Reverse-engineered requests, no real device.',
        rows: [
          ['Device identity', 'bad', 'Emulated device headers'],
          ['Motion sensors', 'bad', 'Nothing is sent'],
          ['Touch dynamics', 'bad', 'There are no touches'],
          ['Network', 'warn', 'Often datacenter or shared proxies'],
          ['App integrity', 'bad', 'Not the official app'],
          ['Runtime', 'warn', 'Private endpoints change often'],
        ],
      },
      emu: {
        label: 'Android emulators', blurb: 'Android app inside a virtual machine.',
        rows: [
          ['Device identity', 'bad', 'Virtual build props, generic serials'],
          ['Motion sensors', 'bad', 'Simulated or missing'],
          ['Touch dynamics', 'warn', 'Injected input events'],
          ['Network', 'warn', 'Host or datacenter IP unless proxied'],
          ['App integrity', 'warn', 'Official app in an emulated world'],
          ['Runtime', 'warn', 'Emulator artifacts are detectable'],
        ],
      },
      android: {
        label: 'Android phone farms', blurb: 'Real phones, usually modified.',
        rows: [
          ['Device identity', 'warn', 'Real hardware, often rooted or ID-spoofed'],
          ['Motion sensors', 'ok', 'Real sensors'],
          ['Touch dynamics', 'warn', 'Scripted input, uniform timing'],
          ['Network', 'warn', 'Shared or proxy IPs'],
          ['App integrity', 'warn', 'Modified OS or root-hiding patches'],
          ['Runtime', 'ok', 'Official app'],
        ],
      },
      ios: {
        label: 'Nimbus real iPhones', blurb: 'Stock iOS, official app, real hardware.',
        rows: [
          ['Device identity', 'ok', 'Genuine Apple hardware, unmodified iOS'],
          ['Motion sensors', 'ok', 'Real accelerometer, gyro and battery'],
          ['Touch dynamics', 'ok', 'Real touches with human-style pacing'],
          ['Network', 'ok', 'Dedicated network identity per device'],
          ['App integrity', 'ok', 'Official Instagram app from the App Store'],
          ['Runtime', 'ok', 'No hooks, no jailbreak, no patches'],
        ],
      },
    },

    compare: {
      cols: ['Nimbus real iPhones', 'Instagram API tools', 'Android emulators', 'Android phone farms'],
      rows: [
        ['Runs on real Apple iPhone hardware', ['y', 'n', 'n', 'n']],
        ['Official Instagram app, no private API', ['y', 'n', 'p', 'y']],
        ['Genuine sensors and device identity', ['y', 'n', 'n', 'p']],
        ['No root, jailbreak or fingerprint spoofing', ['y', 'n', 'n', 'p']],
        ['Human-style touch and scroll dynamics', ['y', 'n', 'p', 'p']],
        ['Per-device network identity', ['y', 'p', 'n', 'p']],
        ['Unaffected by Instagram API changes', ['y', 'n', 'p', 'y']],
        ['Watch every device live in your browser', ['y', 'n', 'p', 'p']],
        ['Zero hardware to buy, rack or repair', ['y', 'y', 'y', 'n']],
      ],
    },

    playbooks: [
      { icon: 'calendar', tone: 'orange', title: 'Auto Poster', body: 'Schedule feed posts, reels and stories from your content queue, at the best local time for each account.', steps: ['queue media', 'open app', 'attach + caption', 'post + log'] },
      { icon: 'heart', tone: 'pink', title: 'Smart Engagement', body: 'Likes and comments from hashtag, location and competitor audiences, with cooldowns and daily caps.', steps: ['pick pool', 'open feed', 'like / comment', 'cool down'] },
      { icon: 'userplus', tone: 'violet', title: 'Follow & Unfollow', body: 'Follow from your target lists and unfollow on a schedule, always inside the limits you set.', steps: ['load list', 'follow', 'wait', 'unfollow'] },
      { icon: 'send', tone: 'cyan', title: 'DM Outreach', body: 'Send messages from templates you write, with per-account caps and a trail of every conversation started.', steps: ['load template', 'open inbox', 'send', 'log'] },
      { icon: 'eye', tone: 'orange', title: 'Story Viewer', body: 'Watch stories from the accounts you target, at a steady human pace you choose.', steps: ['load targets', 'open stories', 'watch', 'log'] },
      { icon: 'sparkles', tone: 'pink', title: 'AI Captions', body: 'Generate captions, hooks and bios with your plan\'s AI credits, ready to attach in the Auto Poster.', steps: ['prompt', 'generate', 'review', 'attach'] },
    ],

    steps: [
      { n: '01', title: 'Choose your iPhones', body: 'Pick how many dedicated iPhones you want. Each one is a real device in our office, racked, powered and online 24/7.' },
      { n: '02', title: 'Connect your accounts', body: 'Add accounts from the web dashboard. Each account is bound to its own device and network identity, with credentials encrypted at rest.' },
      { n: '03', title: 'Pick playbooks and limits', body: 'Select what to run and set daily caps and pacing per account. Our operators review your setup before day one.' },
      { n: '04', title: 'Watch it live', body: 'Open the dashboard from anywhere. See the phone screen live, every action as it happens, and the daily stats.' },
    ],

    plans: [
      {
        name: 'Starter',
        blurb: 'One dedicated iPhone for a creator or small brand.',
        monthly: 109,
        yearly: 87,
        devices: '1 iPhone',
        accounts: 'Up to 5 accounts',
        feats: ['Live device view', 'Daily stats and action log', 'Auto Poster + Engagement', 'Email support'],
      },
      {
        name: 'Growth',
        blurb: 'A small fleet for serious, multi-account growth.',
        monthly: 449,
        yearly: 359,
        devices: '5 iPhones',
        accounts: 'Up to 25 accounts',
        pop: true,
        feats: ['Everything in Starter', 'All six playbooks + AI captions', 'Custom pacing profiles', 'Priority chat support', 'Up to 3 team seats'],
      },
      {
        name: 'Agency',
        blurb: 'Dedicated racks for agencies running client portfolios.',
        monthly: 1399,
        yearly: 1119,
        devices: '20 iPhones',
        accounts: 'Up to 100 accounts',
        pop: false,
        feats: ['Everything in Growth', 'White-label client reports', 'Custom workflows', 'Dedicated operator', 'SLA and 24/7 monitoring', 'Up to 10 team seats'],
      },
    ],

    included: [
      ['smartphone', 'Dedicated real iPhone', 'Your own physical device, not a shared pool.'],
      ['cloud', 'Cloud dashboard', 'Log in from any browser, nothing to install.'],
      ['eye', 'Live screen view', 'Watch the device in real time.'],
      ['bar', 'Daily stats and reports', 'Every action, every day, exportable.'],
      ['shield', 'Safety limits', 'Daily caps, cooldowns and pacing per account.'],
      ['wifi', 'Network identity', 'A dedicated connection per device.'],
      ['headset', 'Operator support', 'Real people who set up and monitor your fleet.'],
      ['lock', 'Encrypted credentials', 'AES-256 at rest, isolated per account.'],
    ],

    faqs: [
      ['How is this different from other Instagram automation tools?', 'Most tools talk to Instagram through a reverse-engineered API or run the Android app in an emulator. We operate real iPhones running the official Instagram app, tapping and scrolling like a person would. You control everything from a web dashboard and can watch the device live.'],
      ['Do I need to buy, ship or set up any hardware?', 'No. The iPhones live in our office. You sign up, pick a plan, and log in to the dashboard. We handle the devices, power, connectivity, updates and monitoring.'],
      ['Will my accounts get banned?', 'Real-device execution reduces the API, emulator and fingerprint signals associated with other approaches, but no honest provider can guarantee outcomes. Results depend on account age, configuration and use. We recommend warming accounts up gradually and keeping action limits conservative, and our operators will help you do exactly that.'],
      ['What can I see in the dashboard?', 'A live view of the iPhone screen, a real-time feed of every action taken, daily and weekly stats per account, schedules, health alerts and downloadable reports.'],
      ['Which workflows are supported?', 'Auto engagement (Story Views And Story Likes), follow they are verified on the current iOS and Instagram releases.'],
      ['How are my account credentials protected?', 'Credentials are encrypted at rest with AES-256 and isolated per account. Each account is bound to its own device and network identity and is never shared across customers.'],
      ['How quickly can I get started?', 'Most customers are running within 24 hours. Pick a plan, add accounts, choose playbooks and limits, and an operator reviews your setup before the first run.'],
      ['What if I want to cancel?', 'Cancel any time from Billing. New purchases are covered by a 14-day money-back guarantee.'],
    ],

    palette: [
      ['Why real iPhones', '#features', 'smartphone'],
      ['Playbooks', '#playbooks', 'zap'],
      ['Cloud dashboard', '#dashboard', 'cloud'],
      ['How it works', '#how', 'play'],
      ['Growth results', '#results', 'bar'],
      ['Our phone lab', '#lab', 'cpu'],
      ['Customer reviews', '#reviews', 'star'],
      ['Pricing', '#pricing', 'gauge'],
      ['FAQ', '#faq', 'search'],
      ['Start free trial', '/signup', 'arrow'],
      ['Sign in to dashboard', '/login', 'lock'],
    ],
  };

  /* ---------- Icons (Lucide-style, inline SVG, no emoji) ---------- */
  const ICON = {
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M12 14v4"/><path d="M10 16h4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    minus: '<path d="M5 12h14"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    bar: '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    plussq: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8M12 8v8"/>',
    battery: '<rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/>',
    server: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    headset: '<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/>',
    thermo: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
    dots: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  };
  const FILLED = new Set(['star']);
  const icon = (name, size = 20, cls = '') => {
    const p = ICON[name] || '';
    const fill = FILLED.has(name) ? 'currentColor' : 'none';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fill}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${cls}">${p}</svg>`;
  };

  /* ---------- Deterministic growth series for the chart ---------- */
  const makeSeries = (start, end, seed, n = 91) => {
    let s = seed * 9301 + 49297;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const out = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const e = 0.62 * t + 0.38 * t * t;
      const base = start + (end - start) * e;
      const wob = 1 + (rnd() - 0.5) * 0.05 * (1 - t * 0.5);
      out.push(Math.round(base * wob));
    }
    out[0] = start;
    out[n - 1] = end;
    return out;
  };

  const TONE = {
    ok: 'bg-ok/15 text-ok', orange: 'bg-orange/15 text-orange', pink: 'bg-pink/15 text-pink',
    violet: 'bg-violet/15 text-violet', cyan: 'bg-cyan/15 text-cyan', warn: 'bg-warn/15 text-warn',
  };
  const SRC_TONE = { Trustpilot: 'text-ok', G2: 'text-orange', Capterra: 'text-cyan', Google: 'text-warn' };
  window.NF = {
    data: DATA, icon, fmt,
    tone: (t) => TONE[t] || TONE.pink,
    srcTone: (s) => SRC_TONE[s] || 'text-warn',
  };

  /* ---------- Global pointer effects (rAF throttled, hover devices only) ---------- */
  if (canHover && !reduce) {
    let raf = 0, last = null;
    window.addEventListener('pointermove', (e) => {
      last = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const t = last.target instanceof Element ? last.target : null;
        if (!t) return;
        const card = t.closest('.spot');
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${last.clientX - r.left}px`);
          card.style.setProperty('--my', `${last.clientY - r.top}px`);
        }
        const hero = t.closest('[data-spot-root]');
        if (hero) {
          const r = hero.getBoundingClientRect();
          hero.style.setProperty('--mx', `${last.clientX - r.left}px`);
          hero.style.setProperty('--my', `${last.clientY - r.top}px`);
        }
      });
    }, { passive: true });
  }

  /* ======================================================================
     Alpine setup
     ====================================================================== */
  document.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine;

    /* x-reveal: fade-up once when scrolled into view */
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
      : null;
    Alpine.directive('reveal', (el) => {
      el.classList.add('reveal');
      if (!io || reduce) { el.classList.add('in'); return; }
      io.observe(el);
    });

    /* x-ic="name:size": inline SVG icon */
    Alpine.directive('ic', (el, { expression }) => {
      const [name, size, cls] = expression.split(':');
      el.style.display = el.style.display || 'inline-flex';
      el.style.flex = el.style.flex || 'none';
      el.innerHTML = icon(name, Number(size) || 20, cls || '');
    });

    /* x-magnet: CTA drifts toward the pointer (max 8px) */
    /* x-particles: drifting glow particles + constellation lines that react to the pointer.
       Pauses when off-screen or tab hidden. DPR capped at 2. */
    Alpine.directive('particles', (el) => {
      const ctx = el.getContext('2d');
      if (!ctx) return;
      const COLORS = ['255,154,61', '255,61,139', '139,92,246', '34,211,238'];
      let W = 0, H = 0, dpr = 1, parts = [], running = false, raf = 0;
      const mouse = { x: -9999, y: -9999 };
      const size = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const r = el.getBoundingClientRect();
        W = r.width; H = r.height;
        el.width = Math.round(W * dpr); el.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round(clamp((W * H) / 14000, 28, 90));
        parts = Array.from({ length: n }, () => ({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35, vy: -0.12 - Math.random() * 0.4,
          r: 1 + Math.random() * 2.2, c: COLORS[(Math.random() * COLORS.length) | 0],
          a: 0.35 + Math.random() * 0.55, ph: Math.random() * 6.28,
        }));
      };
      const frame = (t) => {
        raf = requestAnimationFrame(frame);
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 22000) { const f = (1 - d2 / 22000) * 0.9; p.x += (dx / Math.sqrt(d2 + 1)) * f * 2.2; p.y += (dy / Math.sqrt(d2 + 1)) * f * 2.2; }
          p.x += p.vx + Math.sin(t / 1800 + p.ph) * 0.12; p.y += p.vy;
          if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
          if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
          const tw = p.a * (0.65 + 0.35 * Math.sin(t / 700 + p.ph));
          ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${tw})`; ctx.shadowColor = `rgba(${p.c},.9)`; ctx.shadowBlur = 8;
          ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        }
        ctx.shadowBlur = 0;
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const a = parts[i], b = parts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
            if (d2 < 11000) { ctx.strokeStyle = `rgba(${a.c},${(1 - d2 / 11000) * 0.22})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
          }
        }
      };
      const start = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(frame); } };
      const stop = () => { running = false; cancelAnimationFrame(raf); };
      size();
      new ResizeObserver(size).observe(el);
      const host = el.parentElement;
      host.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
      host.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
      new IntersectionObserver(([en]) => (en.isIntersecting && !document.hidden ? start() : stop())).observe(el);
      document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    });

    /* x-fx: spawns floating "action" chips (like, follow, comment, DM...) that rise through the hero */
    Alpine.directive('fx', (el) => {
      if (reduce) return;
      const KINDS = [
        ['heart', '255,61,139', 'Liked a photo'], ['userplus', '255,154,61', '+1 follower'], ['send', '139,92,246', 'DM sent'],
        ['eye', '34,211,238', 'Story viewed'], ['heart', '255,61,139', '+248 likes'], ['userplus', '255,154,61', 'Followed @studio.kai'],
        ['message', '139,92,246', 'Comment posted'], ['check', '74,222,128', 'Reel published'],
      ];
      let n = 0, timer = 0, visible = true;
      const spawn = (warm = 0) => {
        if (!visible || document.hidden) return;
        if (el.childElementCount > 12) return;
        const [ic, rgb, text] = KINDS[n++ % KINDS.length];
        const chip = document.createElement('span');
        chip.className = 'fx-chip';
        const left = n % 2 ? 1 + Math.random() * 16 : 79 + Math.random() * 12;
        chip.style.left = `${left}%`;
        chip.style.setProperty('--c', rgb);
        chip.style.setProperty('--dur', `${8 + Math.random() * 5}s`);
        chip.style.setProperty('--rise', `${Math.max(320, el.clientHeight * 0.85)}px`);
        chip.style.setProperty('--sway', `${(Math.random() - 0.5) * 70}px`);
        chip.innerHTML = `<span class="dot">${icon(ic, 13)}</span>${text}`;
        if (warm) chip.style.animationDelay = `-${warm}s`;   /* start already mid-flight */
        chip.addEventListener('animationend', () => chip.remove());
        el.appendChild(chip);
      };
      new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(el);
      [5.2, 4, 2.8, 1.6, 0.6].forEach((w) => spawn(w));
      timer = setInterval(() => spawn(0), 1300);
    });

    Alpine.directive('magnet', (el) => {
      if (!canHover || reduce) return;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = clamp((e.clientX - (r.left + r.width / 2)) * 0.16, -8, 8);
        const y = clamp((e.clientY - (r.top + r.height / 2)) * 0.22, -8, 8);
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    /* ---------------- Nav ---------------- */
    Alpine.data('nav', () => ({
      scrolled: false, open: false, active: '', p: 0,
      init() {
        const onScroll = () => {
          this.scrolled = window.scrollY > 12;
          const max = document.documentElement.scrollHeight - innerHeight;
          this.p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
        };
        onScroll();
        let ticking = false;
        window.addEventListener('scroll', () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => { onScroll(); ticking = false; });
        }, { passive: true });
        const ids = ['features', 'playbooks', 'dashboard', 'results', 'reviews', 'pricing', 'faq'];
        const so = new IntersectionObserver((es) => {
          es.forEach((e) => { if (e.isIntersecting) this.active = e.target.id; });
        }, { rootMargin: '-40% 0px -55% 0px' });
        ids.forEach((id) => { const el = document.getElementById(id); if (el) so.observe(el); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.open = false; });
      },
      go() { this.open = false; },
    }));

    /* ---------------- Rotating word ---------------- */
    Alpine.data('rotator', (words) => ({
      words, i: 0,
      init() {
        if (reduce) return;
        setInterval(() => { this.i = (this.i + 1) % this.words.length; }, 2400);
      },
    }));

    /* ---------------- Count up ---------------- */
    Alpine.data('countUp', (target, opts = {}) => ({
      v: 0, target, done: false,
      get text() {
        const { dec = 0, compact = false, prefix = '', suffix = '' } = opts;
        let n = this.v;
        let s;
        if (compact && n >= 1e6) s = (n / 1e6).toFixed(1) + 'M';
        else if (compact && n >= 1e3) s = Math.round(n / 1e3) + 'K';
        else s = dec ? n.toFixed(dec) : fmt(n);
        return prefix + s + suffix;
      },
      run() {
        if (this.done) return;
        this.done = true;
        if (reduce) { this.v = this.target; return; }
        const dur = 1800, t0 = performance.now();
        const tick = (now) => {
          const k = clamp((now - t0) / dur, 0, 1);
          this.v = this.target * (1 - Math.pow(1 - k, 4));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
    }));

    /* ---------------- Hero: scripted live Instagram session ---------------- */
    Alpine.data('heroDemo', () => ({
      scene: 'feed',
      taps: [], tapId: 0,
      liked: false, likes: 1283, burst: false,
      followed: false, followers: 18240,
      seg: 0,
      chat: [], typing: false, draft: '',
      caption: '', post: 'idle',
      stats: { follows: 142, likes: 611, comments: 38, dms: 27 },
      caps: { follows: 200, likes: 800, comments: 60, dms: 40 },
      log: [], logId: 0,
      token: 0, running: false,
      latency: 112,

      init() {
        const now = Date.now();
        const seed = [
          ['POST', 'Posted story · @nova.studio', 'ok', 52],
          ['LIKE', 'Liked photo · @orbit.daily', '', 38],
          ['FOLLOW', 'Followed @sunset.pulse', 'violet', 21],
          ['DM', 'DM sent · template welcome-02', 'orange', 9],
        ];
        this.log = seed.map(([tag, text, cls, ago]) => ({ id: ++this.logId, t: this.clock(now - ago * 1000), tag, text, cls }));
        this.log.reverse();
        if (!reduce) setInterval(() => { this.latency = 96 + Math.round(Math.random() * 38); }, 2200);
      },
      clock(ms = Date.now()) { return new Date(ms).toLocaleTimeString('en-GB'); },
      start() {
        if (this.running) return;
        if (reduce) { this.liked = true; this.followed = true; return; }
        this.running = true;
        const t = ++this.token;
        this.loop(t);
      },
      stop() { this.running = false; this.token++; },
      async w(ms, t) { await sleep(ms); if (t !== this.token) throw ABORT; },
      tapAt(x, y) {
        const id = ++this.tapId;
        this.taps.push({ id, x, y });
        setTimeout(() => { this.taps = this.taps.filter((q) => q.id !== id); }, 800);
      },
      add(tag, text, cls = '') {
        this.log.unshift({ id: ++this.logId, t: this.clock(), tag, text, cls });
        this.log = this.log.slice(0, 6);
      },
      bump(key, tag, text, cls = '') {
        if (key) this.stats[key]++;
        this.add(tag, text, cls);
      },
      async loop(t) {
        try {
          for (;;) {
            await this.sFeed(t);
            await this.sProfile(t);
            await this.sStory(t);
            await this.sDm(t);
            await this.sPost(t);
          }
        } catch (e) { if (e !== ABORT) console.error(e); }
      },
      async sFeed(t) {
        this.scene = 'feed'; this.liked = false; this.likes = 1283; this.burst = false;
        await this.w(1200, t);
        this.tapAt(50, 58); await this.w(130, t);
        this.liked = true; this.likes = 1284; this.burst = true;
        this.bump('likes', 'LIKE', 'Liked photo · @maya.frames');
        await this.w(1100, t); this.burst = false;
        this.tapAt(20, 84); await this.w(900, t);
        this.bump('comments', 'COMMENT', 'Commented "Love this palette" · @maya.frames', 'cyan');
        await this.w(1100, t);
      },
      async sProfile(t) {
        this.scene = 'profile'; this.followed = false; this.followers = 18240;
        await this.w(1300, t);
        this.tapAt(26, 41); await this.w(140, t);
        this.followed = true; this.followers = 18241;
        this.bump('follows', 'FOLLOW', 'Followed @quiet.tide', 'violet');
        await this.w(1700, t);
      },
      async sStory(t) {
        this.scene = 'story'; this.seg = 0;
        await this.w(1200, t);
        this.tapAt(86, 52); this.seg = 1; await this.w(1100, t);
        this.tapAt(86, 52); this.seg = 2; await this.w(1100, t);
        this.bump(null, 'STORY', 'Viewed 3 stories · @orbit.daily', 'ok');
        await this.w(700, t);
      },
      async sDm(t) {
        this.scene = 'dm'; this.chat = []; this.draft = ''; this.typing = true;
        await this.w(1200, t);
        this.typing = false;
        this.chat = [{ me: false, text: 'Hey! Loved your latest reel. Open to a collab?' }];
        await this.w(900, t);
        for (const ch of 'Thanks! Sending details over now.') { this.draft += ch; await this.w(26, t); }
        await this.w(400, t);
        this.tapAt(89, 93); await this.w(140, t);
        this.chat = [...this.chat, { me: true, text: this.draft }]; this.draft = '';
        this.bump('dms', 'DM', 'DM sent · template collab-01', 'orange');
        await this.w(1500, t);
      },
      async sPost(t) {
        this.scene = 'post'; this.caption = ''; this.post = 'idle';
        await this.w(900, t);
        for (const ch of 'Golden hour drop is live') { this.caption += ch; await this.w(32, t); }
        await this.w(500, t);
        this.tapAt(50, 92); await this.w(140, t);
        this.post = 'sending'; await this.w(1500, t);
        this.post = 'done';
        this.add('POST', 'Posted reel · caption from queue', 'ok');
        await this.w(1900, t);
      },
      pct(k) { return Math.min(100, Math.round((this.stats[k] / this.caps[k]) * 100)); },
    }));

    /* ---------------- Signal explorer ---------------- */
    Alpine.data('signals', () => ({
      key: 'ios',
      keys: ['api', 'emu', 'android', 'ios'],
      get cur() { return DATA.signals[this.key]; },
      get score() { return this.cur.rows.filter((r) => r[1] === 'ok').length; },
      label(s) { return { ok: 'Looks real', warn: 'Mixed', bad: 'Synthetic' }[s]; },
    }));

    /* ---------------- Daily-cap slider ---------------- */
    Alpine.data('limits', () => ({
      cap: 150,
      get every() { const mins = (14 * 60) / this.cap; return mins >= 1 ? `${mins.toFixed(1)} min` : `${Math.round(mins * 60)} sec`; },
      get mode() { return this.cap <= 120 ? 'Gentle' : this.cap <= 240 ? 'Balanced' : 'Aggressive'; },
      get tone() { return this.cap <= 120 ? 'text-ok' : this.cap <= 240 ? 'text-warn' : 'text-bad'; },
    }));

    /* ---------------- Growth chart ---------------- */
    Alpine.data('growth', () => ({
      i: 0, go: false, hover: null,
      W: 640, H: 240, P: 18,
      cases: DATA.cases.map((c) => ({ ...c, series: makeSeries(c.start, c.end, c.seed) })),
      init() { this.$nextTick(() => this.replay()); },
      get c() { return this.cases[this.i]; },
      get min() { return Math.min(...this.c.series); },
      get max() { return Math.max(...this.c.series); },
      x(k) { return (k / (this.c.series.length - 1)) * this.W; },
      y(v) { return this.H - this.P - ((v - this.min) / (this.max - this.min || 1)) * (this.H - this.P * 2); },
      get d() { return this.c.series.map((v, k) => `${k ? 'L' : 'M'}${this.x(k).toFixed(1)} ${this.y(v).toFixed(1)}`).join(' '); },
      get area() { return `${this.d} L${this.W} ${this.H} L0 ${this.H} Z`; },
      get gain() { return Math.round((this.c.end / this.c.start - 1) * 100); },
      get cur() { return this.hover === null ? this.c.series.length - 1 : this.hover; },
      pick(n) { this.i = n; this.hover = null; this.replay(); },
      replay() {
        if (reduce) { this.go = true; return; }
        this.go = false;
        requestAnimationFrame(() => requestAnimationFrame(() => { this.go = true; }));
      },
      move(e) {
        const r = e.currentTarget.getBoundingClientRect();
        const k = Math.round(clamp((e.clientX - r.left) / r.width, 0, 1) * (this.c.series.length - 1));
        this.hover = k;
      },
    }));

    /* ---------------- Pricing ---------------- */
    Alpine.data('pricing', () => ({
      yearly: true,
      price(p) { return this.yearly ? p.yearly : p.monthly; },
    }));

    /* ---------------- How it works: scroll-synced sticky panel ---------------- */
    Alpine.data('steps', () => ({
      step: 0,
      init() {
        const root = this.$root;
        const pick = () => {
          const els = root.querySelectorAll('[data-step]');
          if (!els.length) return;
          const box = root.getBoundingClientRect();
          if (box.bottom < 80 || box.top > window.innerHeight) return;
          const line = window.innerHeight * 0.38;
          let best = 0;
          let dist = Infinity;
          els.forEach((el) => {
            const k = Number(el.dataset.step);
            const r = el.getBoundingClientRect();
            const anchor = r.top + r.height * 0.32;
            const d = Math.abs(anchor - line);
            if (d < dist) { dist = d; best = k; }
          });
          this.step = best;
        };
        const bind = () => {
          pick();
          let raf = 0;
          const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => { raf = 0; pick(); });
          };
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', pick, { passive: true });
          const io = new IntersectionObserver(() => pick(), { threshold: [0, 0.25, 0.5, 0.75, 1] });
          root.querySelectorAll('[data-step]').forEach((el) => io.observe(el));
        };
        /* x-for renders step rows after init — defer until the list exists */
        this.$nextTick(() => this.$nextTick(bind));
      },
      go(k) {
        this.step = k;
        const el = this.$root.querySelector(`[data-step="${k}"]`);
        if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      },
    }));

    /* ---------------- Command palette (easter egg: Ctrl/Cmd+K or "/") ---------------- */
    Alpine.data('palette', () => ({
      open: false, q: '', idx: 0,
      items: DATA.palette.map(([label, href, ic]) => ({ label, href, ic })),
      get list() {
        const q = this.q.trim().toLowerCase();
        return q ? this.items.filter((i) => i.label.toLowerCase().includes(q)) : this.items;
      },
      toggle(v = !this.open) {
        this.open = v; this.q = ''; this.idx = 0;
        document.documentElement.style.overflow = v ? 'hidden' : '';
        if (v) this.$nextTick(() => this.$refs.q && this.$refs.q.focus());
      },
      onKey(e) {
        const typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); this.toggle(); return; }
        if (e.key === '/' && !typing && !this.open) { e.preventDefault(); this.toggle(true); return; }
        if (!this.open) return;
        if (e.key === 'Escape') this.toggle(false);
        else if (e.key === 'ArrowDown') { e.preventDefault(); this.idx = (this.idx + 1) % Math.max(1, this.list.length); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); this.idx = (this.idx - 1 + this.list.length) % Math.max(1, this.list.length); }
        else if (e.key === 'Enter') { e.preventDefault(); const it = this.list[this.idx]; if (it) this.run(it); }
      },
      run(it) {
        this.toggle(false);
        if (it.href.startsWith('#')) {
          const el = document.querySelector(it.href);
          if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        } else {
          window.location.href = it.href;
        }
      },
    }));
  });

  /* ---------- Structured data for FAQ (built from the same DATA) ---------- */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DATA.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  });
  document.head.appendChild(ld);
})();
