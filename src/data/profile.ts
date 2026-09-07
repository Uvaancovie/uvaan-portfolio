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
}

export const projects: Project[] = [
  {
    slug: 'eye-of-ra',
    title: 'Eye of Ra',
    client: 'Personal / iGaming lab',
    year: '2026',
    tracks: ['igaming', 'pixi'],
    stack: ['TypeScript', 'Canvas', 'React', 'Slot math'],
    summary:
      'A 5-reel × 3-row Egyptian mythology slot with progressive jackpots, deity companions, and client/server-aware mathematics.',
    outcome: 'Shipped as a high-fidelity playable client — the flagship of the iGaming studio track.',
    href: 'https://github.com/Uvaancovie/Eye-of-Ra',
  },
  {
    slug: 'white-label-slot',
    title: 'White-label slot',
    client: 'Way2Fly / operator kit',
    year: '2026',
    tracks: ['igaming', 'pixi'],
    stack: ['PixiJS', 'Vite', 'Node', 'Shared math'],
    summary:
      'Embeddable reel engine with a spin service, session store, and a shared config so a brand can drop in a cabinet without forking the math.',
    outcome: 'The architecture I want to take into licensed B2B work: client art, server authority, one contract.',
    href: 'https://github.com/Uvaancovie/white-label-slot',
  },
  {
    slug: 'covies-slots',
    title: 'Covies Slots',
    client: 'Personal',
    year: '2026',
    tracks: ['igaming'],
    stack: ['TypeScript', 'React', 'Supabase', 'Web Audio'],
    summary:
      'A 5×5, 30-line video slot simulator with a custom engine, synthesized audio, and a PostgreSQL backend.',
    outcome: 'Proof I can own the full loop: reel feel, paylines, persistence — not just a CSS animation.',
    href: 'https://github.com/Uvaancovie/covies-slots',
  },
  {
    slug: 'raf-pnp',
    title: 'RAF case desk',
    client: 'Pather & Pather Attorneys',
    year: '2026',
    tracks: ['fintech', 'dotnet'],
    stack: ['ASP.NET Core', 'Razor Pages', 'C#', 'SQL Server'],
    summary:
      'Road Accident Fund case management from intake through settlement — the kind of ledger work FinTech actually looks like in South Africa.',
    outcome: 'A production-shaped legal ops system, not a CRUD tutorial.',
    href: 'https://github.com/Uvaancovie/raf-pnp',
  },
  {
    slug: 'sa-funeral-api',
    title: 'SA Funeral API',
    client: 'South African Funeral Supplies',
    year: '2026',
    tracks: ['dotnet', 'commerce'],
    stack: ['ASP.NET Core', '.NET 8', 'C#'],
    summary:
      'Catalog and administration API that replaced serverless functions with a full ASP.NET Core backend.',
    outcome: 'The .NET muscle I am building toward iGaming and FinTech services.',
    href: 'https://github.com/Uvaancovie/sa-funeral-api',
  },
  {
    slug: 'safs-catalog',
    title: 'SAFS catalog',
    client: 'South African Funeral Supplies',
    year: '2026',
    tracks: ['commerce'],
    stack: ['TypeScript', 'Angular', 'Supabase', 'Brevo'],
    summary:
      'Premium funeral-industry catalog for caskets, equipment, and requisites across South Africa and the continent.',
    outcome: 'Day-job product: enterprise commerce, newsletters, and the unglamorous work that keeps a real company selling.',
    href: 'https://github.com/Uvaancovie/sa-funerals-catalog',
  },
  {
    slug: 'municipality-api',
    title: 'Municipality API',
    client: 'Academic / civic',
    year: '2025',
    tracks: ['dotnet'],
    stack: ['C#', 'ASP.NET', 'SQL Server'],
    summary: 'Civic services API in C# — stored procedures, indexes, and the SSMS-to-API path I train on.',
    outcome: 'Backend discipline before the flashy client.',
    href: 'https://github.com/Uvaancovie/municipality-api-net-csharp',
  },
  {
    slug: 'pro-graphics',
    title: 'Pro Graphics',
    client: 'Pro Graphics',
    year: '2026',
    tracks: ['commerce'],
    stack: ['Vite', 'React', 'Supabase', 'Playwright'],
    summary:
      'Marketing and lead-gen site for a print and signage house sitting between high-volume copy shops and consultative signage firms.',
    outcome: 'Graphic production literacy plus a conversion-minded storefront.',
    href: 'https://github.com/Uvaancovie/pro-graphics',
  },
  {
    slug: 'house-of-parlay',
    title: 'House of Parlay',
    client: 'House of Parlay',
    year: '2026',
    tracks: ['commerce'],
    stack: ['Vite', 'TypeScript', 'Catalog'],
    summary: 'Luxury jewellery storefront — product photography, catalog discipline, and a quieter kind of wager.',
    outcome: 'Luxury UI that still has to sell SKUs.',
    href: 'https://github.com/Uvaancovie/house-of-parlay',
  },
  {
    slug: 'casino-api',
    title: 'Covies Casino API',
    client: 'Personal',
    year: '2025',
    tracks: ['igaming', 'fintech'],
    stack: ['Express', 'MongoDB', 'Mongoose'],
    summary: 'Session, wallet, and game-state API for casino clients — the ledger behind the reels.',
    outcome: 'Backend-first iGaming: if the wallet is wrong, the art does not matter.',
    href: 'https://github.com/Uvaancovie/covies-casino-api',
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
