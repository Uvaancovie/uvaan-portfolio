export const profile = {
  name: 'Uvaan Covenden',
  monogram: 'UC',
  age: 23,
  location: 'Durban, South Africa',
  role: 'Junior Programmer',
  employer: 'South African Funeral Supplies',
  studio: 'Way2Fly Digital',
  degree: 'Bachelor in Application Development',
  headline: 'iGaming systems, .NET backends, PixiJS floors.',
  phone: '081 0404 713',
  phoneInternational: '+27 81 040 4713',
  whatsappNumber: '27810404713',
  whatsappUrl: 'https://wa.me/27810404713?text=Hi%20Uvaan,%20I%20saw%20your%20iGaming%20&%20.NET%20portfolio%20and%20would%20like%20to%20connect.',
  email: 'uvaancovenden@gmail.com',
  studioEmail: 'way2flyagency@gmail.com',
  github: 'https://github.com/Uvaancovie',
  linkedin: 'https://www.linkedin.com/in/uvaan-covenden-b365a726b/',
  x: 'https://x.com/WAY2FLYDIGITAL',
  site: 'https://way2flydigital.info',
  githubUser: 'Uvaancovie',
  avatar: 'https://avatars.githubusercontent.com/u/109968086?v=4',
}

export const tracks = [
  {
    id: 'igaming',
    label: 'iGaming',
    copy: 'Slot clients, crash games, RNG-aware math, operator dashboards, and the B2B path into licensed floors.',
  },
  {
    id: 'fintech',
    label: 'FinTech',
    copy: 'Case files, payments-shaped APIs, betting ledgers, and systems that treat money as a contract, not a UI.',
  },
  {
    id: 'dotnet',
    label: '.NET backend',
    copy: 'ASP.NET Core Web APIs, SQL Server, Razor Pages, C# services that replace serverless glue with a real backend.',
  },
  {
    id: 'pixi',
    label: 'PixiJS design',
    copy: 'Cabinets, reels, symbols, and motion that feel like a licensed game — not a weekend canvas toy.',
  },
] as const

export type TrackId = (typeof tracks)[number]['id'] | 'commerce'

export interface SymbolAsset {
  name: string
  role: string
  imageUrl: string
  tag?: string
}

export interface Project {
  slug: string
  title: string
  client: string
  year: string
  tracks: TrackId[]
  stack: string[]
  summary: string
  outcome: string
  href: string
  liveUrl: string
  repoUrl: string
  format: string
  lines: string
  rtp?: string
  volatility?: string
  bannerImage?: string
  features: string[]
  symbols: SymbolAsset[]
}

export const projects: Project[] = [
  {
    slug: 'springbok-rush',
    title: 'Springbok Rush',
    client: 'South African White-Label Slot Kit / B2B Operator Demo',
    year: '2026',
    tracks: ['igaming', 'pixi', 'fintech'],
    stack: ['PixiJS 8', 'TypeScript', 'Cloudflare Workers / Express', 'ZAR Cents Math', 'Web Audio API', 'i18n (EN / isiZulu)'],
    summary:
      'Configurable 5-reel × 3-row slot engine engineered for the South African iGaming market. Built with server-authoritative win evaluations, strict ZAR cents integer math to prevent floating point drift, operatorId & gameId embed parameters, and real-time bilingual English ↔ isiZulu localization.',
    outcome:
      'Live B2B cabinet deployed on Cloudflare Workers featuring dynamic paytables, staggered reel stops, coin burst celebrations, and 18+ Responsible Gambling compliance.',
    href: 'https://white-label-slot.igamingdev.workers.dev/',
    liveUrl: 'https://white-label-slot.igamingdev.workers.dev/',
    repoUrl: 'https://github.com/Uvaancovie/sa-white-label-slot',
    format: '5 Reels × 3 Rows',
    lines: '20 Fixed Winlines',
    rtp: '96.2% RTP',
    volatility: 'Medium-High',
    bannerImage:
      'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/slot-projects/springbok-slot.png',
    features: [
      'B2B White-Label Architecture: ?operatorId= & ?gameId= embed query configuration for licensed SA operators',
      'Strict ZAR Cents Integer Math ensuring zero floating-point ledger rounding drift',
      'Bilingual Dynamic Localization: English ↔ isiZulu switchable in real-time',
      'Staggered Reel Spin Deceleration Physics with Payline Multi-Highlight Animations',
      'Responsible Gambling Compliant: 18+ badge, session clock, bet limits, and autoplay stop criteria',
    ],
    symbols: [
      {
        name: 'Springbok Golden Crest',
        role: 'Top Tier Wild & Scatter',
        tag: 'Wild',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/slot-projects/springbok-slot.png',
      },
      {
        name: 'King Tut',
        role: 'Pharaoh Sovereign High Pay',
        tag: 'High Pay',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/king-tut.png',
      },
      {
        name: 'Temple Guardian',
        role: 'Protector Multiplier Wild',
        tag: 'Deity',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/guardian.png',
      },
      {
        name: 'Mystic Lion',
        role: 'Predator Wild Symbol',
        tag: 'Wild',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/mystic-lion-symbol.jpg',
      },
      {
        name: 'Treasure Chest',
        role: 'Bonus Vault Scatter',
        tag: 'Bonus',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/bonus-treasure-chest.jpg',
      },
    ],
  },
  {
    slug: 'eye-of-ra',
    title: 'Eye of Ra',
    client: 'Personal / iGaming Studio',
    year: '2026',
    tracks: ['igaming', 'pixi'],
    stack: ['TypeScript', 'Canvas / WebGL', 'React', 'Slot RNG Math', 'Dynamic Audio FX'],
    summary:
      'A 5-reel × 3-row Egyptian mythology slot game engineered with progressive jackpots, divine companion mechanics, cascading line evaluations, and server-authoritative math models.',
    outcome:
      'Shipped as a high-fidelity playable slot client featuring deity powers, scatter bonuses, and 20-winline evaluations.',
    href: 'https://eye-of-ra-zeta.vercel.app/',
    liveUrl: 'https://eye-of-ra-zeta.vercel.app/',
    repoUrl: 'https://github.com/Uvaancovie/Eye-of-Ra',
    format: '5 Reels × 3 Rows',
    lines: '20 Fixed Winlines',
    rtp: '96.4% RTP',
    volatility: 'High Volatility',
    features: [
      'Divine Deity Companions: Ra, Anubis, and Cleopatra with active gameplay triggers',
      '20 Fixed Evaluated Paylines with Staggered Reel Spin and Deceleration Physics',
      'Golden Sphinx Expanding Wild with Multiplier Stacks',
      'Golden Sarcophagus Mystery Reel Respins & Relic Scatters',
      'Progressive Jackpot Tiers with Real-time Win Interpolation',
    ],
    symbols: [
      {
        name: 'King Tut',
        role: 'Pharaoh Sovereign High Pay',
        tag: 'High Pay',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/king-tut.png',
      },
      {
        name: 'Temple Guardian',
        role: 'Protector Multiplier Wild',
        tag: 'Wild',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/guardian.png',
      },
      {
        name: 'Ra — Sun God',
        role: 'Wild & Jackpot Deity',
        tag: 'Deity',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/ra.png',
      },
      {
        name: 'Anubis — Guide',
        role: 'Scatter Trigger',
        tag: 'Deity',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/anubis.png',
      },
      {
        name: 'Cleopatra — Sovereign',
        role: 'High Tier Pay',
        tag: 'Deity',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/cleopatra.png',
      },
      {
        name: 'Golden Sphinx',
        role: 'Expanding Wild',
        tag: 'Wild',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/golden-sphinx-symbol.png',
      },
      {
        name: 'Golden Sarcophagus',
        role: 'Mystery Scatter / High Pay',
        tag: 'Relic',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/golden-sarcophagus-symbol-bg-removebg-preview(1).png',
      },
    ],
  },
  {
    slug: 'covies-slots',
    title: 'Covies Slots',
    client: 'Personal / iGaming & FinTech Suite',
    year: '2026',
    tracks: ['igaming', 'fintech'],
    stack: ['TypeScript', 'React', 'Supabase / PostgreSQL', 'Web Audio API', 'State Ledger'],
    summary:
      'A dynamic 5×5, 30-payline video slot simulator featuring custom reel animation physics, interactive bonus chest mini-games, synthesized audio, and a real-time PostgreSQL session ledger.',
    outcome:
      'Complete casino loop: reel feel, 30 evaluated paylines, interactive bonus pick rounds, and real-time ledger persistence.',
    href: 'https://covies-slots.vercel.app/',
    liveUrl: 'https://covies-slots.vercel.app/',
    repoUrl: 'https://github.com/Uvaancovie/covies-slots',
    format: '5 Reels × 5 Rows',
    lines: '30 Evaluated Paylines',
    rtp: '95.8% RTP',
    volatility: 'Medium-High',
    features: [
      'Interactive Bonus Treasure Chest Vault Mini-Game & Free Spins',
      'Mystic Lion High-Paying Wild Predator Symbol',
      '30 Evaluated Paylines with Multi-Line Highlight Animations',
      'Web Audio Real-Time Reel Clack & Win Jingle Synthesis',
      'PostgreSQL / Supabase Session Balance & History Ledger',
    ],
    symbols: [
      {
        name: 'Treasure Chest',
        role: 'Bonus Vault / Free Spins',
        tag: 'Bonus',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/bonus-treasure-chest.jpg',
      },
      {
        name: 'Mystic Lion',
        role: 'Top Tier Wild Predator',
        tag: 'Wild',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/mystic-lion-symbol.jpg',
      },
      {
        name: 'Golden Sphinx',
        role: 'Multiplier Wild',
        tag: 'Wild',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/golden-sphinx-symbol.png',
      },
      {
        name: 'Golden Sarcophagus',
        role: 'Relic Scatter',
        tag: 'Scatter',
        imageUrl:
          'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/golden-sarcophagus-symbol-bg-removebg-preview(1).png',
      },
    ],
  },
]

export const stackGroups = [
  {
    title: 'Game floor',
    items: ['PixiJS', 'HTML5 Canvas', 'Slot math / RNG', 'Web Audio', 'TypeScript clients'],
  },
  {
    title: 'Backend',
    items: ['ASP.NET Core', 'C#', 'SQL Server / SSMS', 'Entity-style APIs', 'Express', 'Laravel'],
  },
  {
    title: 'Product UI',
    items: ['Vue 3', 'React', 'Angular', 'Vite', 'Tailwind when it earns it'],
  },
  {
    title: 'Ops & cloud',
    items: ['Cloudflare Pages', 'MongoDB', 'Supabase', 'MCP servers', 'Playwright'],
  },
]

export const timeline = [
  {
    period: 'Now',
    title: 'Junior Programmer — SA Funeral Supplies',
    body: 'Enterprise catalog, APIs, inventory, and the production systems of a real Durban manufacturer. This is where I learned that software has to survive a warehouse, a sales team, and a Monday morning.',
  },
  {
    period: '2022 — now',
    title: 'Way2Fly Digital',
    body: 'Studio work across print, jewellery, travel, legal ops, and betting clients. 100+ public repositories. The through-line is shipping, not collecting tutorials.',
  },
  {
    period: 'Degree',
    title: 'Bachelor in Application Development',
    body: 'Varsity College / Emeris track: PROG, SAND, SOEN, CLDV, DBAS, INSYS. C#, SQL Server, systems analysis — the academic spine under the iGaming work.',
  },
  {
    period: 'Next',
    title: 'iGaming · FinTech · .NET · PixiJS',
    body: 'Moving from commerce APIs into licensed-looking game clients, ASP.NET services, and graphic design that belongs on a cabinet — B2B first, operator later.',
  },
]
