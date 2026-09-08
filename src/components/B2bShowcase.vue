<script setup lang="ts">
import { ref, computed } from 'vue'

interface B2bCase {
  id: string
  title: string
  client: string
  category: 'enterprise' | 'igaming' | 'fintech'
  categoryLabel: string
  headline: string
  description: string
  impactMetrics: { label: string; value: string }[]
  techStack: string[]
  liveLink?: string
  liveLabel?: string
  repoLink?: string
  repoLabel?: string
  badge: string
}

const activeFilter = ref<'all' | 'enterprise' | 'igaming' | 'fintech'>('all')

const b2bCases: B2bCase[] = [
  {
    id: 'safs-enterprise',
    title: 'Enterprise ERP & Catalog Engine',
    client: 'South African Funeral Supplies (SAFS)',
    category: 'enterprise',
    categoryLabel: 'Enterprise .NET Backend',
    headline: 'Consolidated ASP.NET Core & SQL Server backend powering nationwide manufacturing & warehouse distribution.',
    description:
      'Engineered mission-critical software solutions on the Microsoft development stack. Built robust ASP.NET Core Web APIs and SQL Server stored procedures that manage high-volume manufacturing inventory, distributor ordering, and product catalog synchronization.',
    impactMetrics: [
      { label: 'Architecture', value: 'ASP.NET Core 8 & SQL Server' },
      { label: 'Scope', value: 'Nationwide Warehouse Catalog' },
      { label: 'Throughput', value: 'High-Volume Order Pipeline' },
    ],
    techStack: ['C#', '.NET 8', 'ASP.NET Core', 'SQL Server', 'SSMS', 'Entity Framework', 'REST APIs'],
    badge: 'Production Enterprise System',
  },
  {
    id: 'springbok-white-label',
    title: 'Springbok Rush — B2B White-Label Slot Kit',
    client: 'Multi-Tenant Operator Integration (SA Market)',
    category: 'igaming',
    categoryLabel: 'B2B iGaming Shell',
    headline: 'Server-authoritative 5×3 slot engine designed for instant embed across licensed South African operators.',
    description:
      'Engineered a complete white-label slot kit with `?operatorId=` & `?gameId=` query parameter routing. Features strict ZAR cents integer math to eliminate ledger rounding drift, real-time EN ↔ isiZulu dynamic localization, and 18+ Responsible Gambling compliance.',
    impactMetrics: [
      { label: 'Math Engine', value: 'ZAR Cents Integer Math' },
      { label: 'Winlines', value: '20 Evaluated Lines (96.2% RTP)' },
      { label: 'Compliance', value: '18+ Responsible Gambling' },
    ],
    techStack: ['PixiJS 8', 'TypeScript', 'Cloudflare Workers', 'ZAR Cents Math', 'Web Audio', 'i18n (isiZulu)'],
    liveLink: 'https://white-label-slot.igamingdev.workers.dev/?operatorId=lulabet-demo&gameId=springbok-rush',
    liveLabel: 'Launch White-Label Embed',
    repoLink: 'https://github.com/Uvaancovie/sa-white-label-slot',
    repoLabel: 'Inspect B2B Repo',
    badge: 'Live Playable B2B Demo',
  },
  {
    id: 'fintech-payments',
    title: 'Ozow Instant EFT & PayFast Transaction Ledgers',
    client: 'Cape Pharm, Pool Bean Bags & Legal Ops Desks',
    category: 'fintech',
    categoryLabel: 'FinTech & Gateways',
    headline: 'Production payment gateway integrations and automated transaction settlement desk.',
    description:
      'Delivered secure South African payment integrations using Ozow Instant EFT (direct bank authentication) and PayFast Webhooks. Implemented idempotent payment verification routines, automated receipt generation, and legal case file ledgers.',
    impactMetrics: [
      { label: 'Payment APIs', value: 'Ozow Instant EFT & PayFast' },
      { label: 'Ledger Audit', value: 'Zero-Drift Webhooks' },
      { label: 'Operations', value: 'Automated Settlement Triggers' },
    ],
    techStack: ['Ozow API', 'PayFast', 'PostgreSQL', 'Supabase', 'Node.js', 'Webhooks', 'Express'],
    badge: 'Production Payment Workflows',
  },
  {
    id: 'commercial-portals',
    title: 'Way2Fly Digital B2B Production Suite',
    client: '100+ Shipped Commercial Repositories',
    category: 'enterprise',
    categoryLabel: 'Client Portals',
    headline: 'Full-stack client management portals, jewellery commerce systems, and legal case claim trackers.',
    description:
      'Architected high-performance web applications across print manufacturing, commercial jewellery, travel booking, and Road Accident Fund (RAF) legal operations. Demonstrates breadth in taking raw business requirements to production deployments.',
    impactMetrics: [
      { label: 'Delivery', value: '100+ GitHub Repositories' },
      { label: 'Industries', value: 'Manufacturing, Legal & Commerce' },
      { label: 'Speed', value: 'Production Turnarounds' },
    ],
    techStack: ['Vue 3', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Pages', 'MongoDB'],
    liveLink: 'https://way2flydigital.info',
    liveLabel: 'Way2Fly Digital Portal',
    repoLink: 'https://github.com/Uvaancovie',
    repoLabel: 'View GitHub Profile',
    badge: 'Proven Delivery Track Record',
  },
]

const filteredCases = computed(() => {
  if (activeFilter.value === 'all') return b2bCases
  return b2bCases.filter((c) => c.category === activeFilter.value)
})
</script>

<template>
  <section id="b2b-showcase" class="b2b-section">
    <div class="wrap">
      <!-- Section Header -->
      <div class="b2b-head">
        <div class="head-left">
          <p class="kicker">B2B & Enterprise Portfolio / Dual Capability</p>
          <h2 class="b2b-title">I Engineer Both Sides of the Stack.</h2>
          <p class="b2b-lead">
            From <strong>high-performance WebGL slot engines</strong> to <strong>mission-critical enterprise .NET backends</strong> and <strong>transactional payment gateways</strong>. Real systems running in production.
          </p>
        </div>

        <!-- Filter Pills -->
        <div class="b2b-filters">
          <button
            type="button"
            class="filter-pill"
            :class="{ active: activeFilter === 'all' }"
            @click="activeFilter = 'all'"
          >
            All Work ({{ b2bCases.length }})
          </button>
          <button
            type="button"
            class="filter-pill"
            :class="{ active: activeFilter === 'enterprise' }"
            @click="activeFilter = 'enterprise'"
          >
            .NET & Enterprise
          </button>
          <button
            type="button"
            class="filter-pill"
            :class="{ active: activeFilter === 'igaming' }"
            @click="activeFilter = 'igaming'"
          >
            B2B iGaming Shells
          </button>
          <button
            type="button"
            class="filter-pill"
            :class="{ active: activeFilter === 'fintech' }"
            @click="activeFilter = 'fintech'"
          >
            FinTech & Payments
          </button>
        </div>
      </div>

      <!-- B2B Interactive Cards Grid -->
      <div class="b2b-grid">
        <article
          v-for="item in filteredCases"
          :key="item.id"
          class="b2b-card"
          :class="`b2b-theme-${item.category}`"
        >
          <!-- Top Badge & Category -->
          <div class="card-top-bar">
            <span class="category-tag">{{ item.categoryLabel }}</span>
            <span class="proof-badge">
              <span class="badge-dot"></span>
              <span>{{ item.badge }}</span>
            </span>
          </div>

          <!-- Title & Client -->
          <div class="card-main-info">
            <span class="client-name">{{ item.client }}</span>
            <h3 class="case-title">{{ item.title }}</h3>
            <p class="case-headline">{{ item.headline }}</p>
            <p class="case-desc">{{ item.description }}</p>
          </div>

          <!-- Impact Metrics Strip -->
          <div class="metrics-strip">
            <div
              v-for="metric in item.impactMetrics"
              :key="metric.label"
              class="metric-box"
            >
              <span class="metric-val">{{ metric.value }}</span>
              <span class="metric-lbl">{{ metric.label }}</span>
            </div>
          </div>

          <!-- Tech Stack Chips -->
          <div class="tech-chips-row">
            <span
              v-for="tech in item.techStack"
              :key="tech"
              class="tech-chip"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Actions Row -->
          <div v-if="item.liveLink || item.repoLink" class="card-actions">
            <a
              v-if="item.liveLink"
              :href="item.liveLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-b2b live-btn"
            >
              <span>{{ item.liveLabel || 'View Live' }}</span>
              <span>↗</span>
            </a>
            <a
              v-if="item.repoLink"
              :href="item.repoLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-b2b repo-btn"
            >
              <span>{{ item.repoLabel || 'View GitHub Repo' }}</span>
              <span>↗</span>
            </a>
          </div>
        </article>
      </div>

      <!-- Bottom Dual-Capability Banner -->
      <div class="dual-banner">
        <div class="dual-content">
          <div class="dual-icon">⚡</div>
          <div class="dual-text">
            <h4 class="dual-heading">Why Dual Capability Matters for Your Next Project</h4>
            <p class="dual-desc">
              Clients usually have to hire a frontend game designer <em>and</em> a separate backend engineer. I bridge that gap: delivering high-framerate WebGL game presentation layered directly on server-authoritative, audit-proof .NET/SQL APIs.
            </p>
          </div>
        </div>
        <div class="dual-cta">
          <router-link to="/contact" class="btn dual-btn">
            <span>Hire For Your Project</span>
            <span>↗</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.b2b-section {
  padding: 4.5rem 0 3.5rem;
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(800px 400px at 15% 10%, rgba(201, 164, 106, 0.05), transparent 60%),
    linear-gradient(180deg, var(--ink) 0%, rgba(13, 28, 22, 0.4) 100%);
}

.b2b-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.head-left {
  max-width: 46rem;
}

.b2b-title {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 600;
  margin: 0.3rem 0 0.8rem;
  letter-spacing: -0.02em;
  color: var(--paper);
}

.b2b-lead {
  font-family: var(--sans);
  font-size: 1.05rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--paper) 85%, var(--mute));
  font-weight: 300;
  margin: 0;
}

.b2b-lead strong {
  color: var(--gold-2);
  font-weight: 500;
}

/* Filter Pills */
.b2b-filters {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.filter-pill {
  border: 1px solid var(--line);
  background: rgba(16, 18, 24, 0.8);
  padding: 0.45rem 0.85rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
  cursor: pointer;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
}

.filter-pill:hover,
.filter-pill.active {
  border-color: var(--gold);
  background: rgba(201, 164, 106, 0.12);
  color: var(--gold-2);
}

/* Cards Grid */
.b2b-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.b2b-card {
  position: relative;
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.3) 0%, rgba(16, 18, 24, 0.85) 50%, rgba(8, 9, 12, 0.95) 100%),
    var(--ink-2);
  border: 1px solid var(--line);
  padding: 1.8rem 1.8rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.3rem;
  transition: all 0.25s ease;
  overflow: hidden;
}

.b2b-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.4;
  transition: opacity 0.25s ease;
}

.b2b-card:hover {
  border-color: rgba(201, 164, 106, 0.55);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 164, 106, 0.1);
}

.b2b-card:hover::before {
  opacity: 1;
}

/* Card Top Bar */
.card-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.category-tag {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-2);
  background: rgba(201, 164, 106, 0.12);
  border: 1px solid rgba(201, 164, 106, 0.3);
  padding: 0.2rem 0.55rem;
}

.proof-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mint);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 6px var(--mint);
}

/* Card Main Info */
.card-main-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.client-name {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mute);
}

.case-title {
  font-family: var(--serif);
  font-size: 1.85rem;
  font-weight: 600;
  margin: 0.1rem 0;
  color: var(--paper);
  letter-spacing: -0.01em;
}

.case-headline {
  font-family: var(--sans);
  font-size: 0.98rem;
  line-height: 1.5;
  color: color-mix(in srgb, var(--paper) 92%, var(--gold-2));
  font-weight: 400;
  margin: 0.2rem 0 0.4rem;
}

.case-desc {
  font-family: var(--sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--paper) 78%, var(--mute));
  font-weight: 300;
  margin: 0;
}

/* Metrics Strip */
.metrics-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  padding: 0.9rem;
  background: rgba(8, 9, 12, 0.75);
  border: 1px solid var(--hair);
}

.metric-box {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metric-val {
  font-family: var(--sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gold-2);
  line-height: 1.25;
}

.metric-lbl {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mute);
}

/* Tech Chips */
.tech-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tech-chip {
  font-family: var(--mono);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.18rem 0.45rem;
  background: rgba(243, 234, 216, 0.04);
  border: 1px solid var(--hair);
  color: var(--mute);
}

/* Card Actions */
.card-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--hair);
  flex-wrap: wrap;
}

.btn-b2b {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.5rem 0.9rem;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-b2b.live-btn {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  border: 1px solid var(--gold);
}

.btn-b2b.live-btn:hover {
  background: var(--gold-2);
}

.btn-b2b.repo-btn {
  background: transparent;
  color: var(--gold-2);
  border: 1px solid var(--line);
}

.btn-b2b.repo-btn:hover {
  border-color: var(--gold);
  background: rgba(201, 164, 106, 0.1);
}

/* Dual Capability Banner */
.dual-banner {
  background:
    linear-gradient(135deg, rgba(201, 164, 106, 0.15) 0%, rgba(22, 50, 38, 0.45) 100%),
    var(--ink-2);
  border: 1px solid rgba(201, 164, 106, 0.35);
  padding: 1.8rem 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.dual-content {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  max-width: 48rem;
}

.dual-icon {
  font-size: 2rem;
  color: var(--gold-2);
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(201, 164, 106, 0.12);
  border: 1px solid rgba(201, 164, 106, 0.3);
  display: grid;
  place-items: center;
}

.dual-heading {
  font-family: var(--serif);
  font-size: 1.45rem;
  margin: 0 0 0.25rem;
  color: var(--paper);
  font-weight: 600;
}

.dual-desc {
  font-family: var(--sans);
  font-size: 0.95rem;
  line-height: 1.55;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
  font-weight: 300;
  margin: 0;
}

.dual-desc em {
  font-style: italic;
  color: var(--gold-2);
}

.dual-btn {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  white-space: nowrap;
}

.dual-btn:hover {
  background: var(--gold-2);
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .b2b-grid {
    grid-template-columns: 1fr;
  }
  .dual-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
    gap: 1.2rem;
  }
  .dual-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
}

@media (max-width: 600px) {
  .b2b-section {
    padding: 3rem 0 2rem;
  }
  .b2b-card {
    padding: 1.4rem 1.2rem;
  }
  .metrics-strip {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .card-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-b2b {
    width: 100%;
    justify-content: center;
    min-height: 44px;
  }
}
</style>
