<script setup lang="ts">
import { ref } from 'vue'

interface ExpertisePillar {
  id: string
  title: string
  kicker: string
  roleEvidence: string
  cvHighlight: string
  academicOrMetric: string
  coreCompetencies: string[]
  architectureStack: string[]
  productionProof: string
}

const activePillar = ref<string>('dotnet')

const pillars: ExpertisePillar[] = [
  {
    id: 'dotnet',
    title: '.NET & Enterprise Architecture',
    kicker: 'Microsoft Ecosystem / Enterprise Backend',
    roleEvidence: 'Current Full-Stack Developer at South African Funeral Supplies',
    cvHighlight:
      'Engineering enterprise software solutions on the Microsoft development stack — backend business logic, ASP.NET Core Web APIs, and SQL Server databases.',
    academicOrMetric: 'Varsity College Distinction (Programming 3D: 89% · Info Systems 3D: 97%)',
    coreCompetencies: [
      'ASP.NET Core Web APIs, Minimal APIs & Razor Architecture',
      'C# / .NET 8 / LINQ / Async Task Pipeline Management',
      'SQL Server / SSMS: Stored Procedures, Indexes, & Transactions',
      'Entity Framework Core & Repository Design Patterns',
      'High-throughput Enterprise Catalog & Order Management Systems',
    ],
    architectureStack: ['C#', '.NET 8', 'ASP.NET Core', 'SQL Server', 'SSMS', 'Azure', 'Entity Framework'],
    productionProof:
      'Replaced disparate serverless functions with a consolidated ASP.NET Core backend to manage high-volume African manufacturing and supplier operations.',
  },
  {
    id: 'fintech',
    title: 'FinTech Architecture & Ledgers',
    kicker: 'Transactional Integrity / Settlement Engines',
    roleEvidence: 'G Bets Betting Operations & Multi-Gateway Integration',
    cvHighlight:
      'Hands-on operational experience with G Bets online betting and horse racing payout slips, paired with production payment gateways (Ozow Instant EFT, PayFast).',
    academicOrMetric: 'Production Payments (Ozow Instant EFT & PayFast Webhooks) · Legal Ops Settlement Desks',
    coreCompetencies: [
      'Session Ledger & Wallet Authority (Server-side Balance Verification)',
      'Payment Gateway Integration: Ozow Instant EFT, PayFast, Stripe',
      'Legal & Insurance Ops: Road Accident Fund (RAF) Case Management',
      'PostgreSQL / Supabase / MongoDB Transaction Ledgers',
      'Idempotent Payout Requests & Webhook Security Handlers',
    ],
    architectureStack: ['Ozow API', 'PayFast', 'PostgreSQL', 'Supabase', 'MongoDB', 'MERN', 'Webhooks'],
    productionProof:
      'Delivered production checkout solutions with automated settlement triggers for Cape Pharm, Pool Bean Bags, and RAF legal claim ledger desks.',
  },
  {
    id: 'pixijs',
    title: 'PixiJS & iGaming Development',
    kicker: 'WebGL Cabinets / Server-Authoritative Math',
    roleEvidence: 'Creator of Eye of Ra & Covies Slots Studio Engines',
    cvHighlight:
      'Custom 2D/WebGL slot cabinets utilizing PixiJS 8, ticker-driven deceleration physics, symbol atlas shaders, and server-authoritative winline evaluators.',
    academicOrMetric: '20 & 30 Line Evaluated Matrices · RTP Math Models · Web Audio Sound Synthesis',
    coreCompetencies: [
      'PixiJS 8 WebGL Display Lists, Masks, & Ticker Loops',
      'Slot Math Engines: 5×3 & 5×5 Matrices, 20-30 Evaluated Paylines',
      'Web Audio API Real-time Reel Clack & Win Jingle Synthesis',
      'White-Label B2B Architecture: operatorId + gameId Embed Parameters',
      'Responsible Gambling (18+ / RG) & Mobile-First Touch HUDs',
    ],
    architectureStack: ['PixiJS 8', 'TypeScript', 'WebGL', 'Web Audio API', 'Slot RNG Math', 'Vite'],
    productionProof:
      'Shipped playable production-grade clients with deity companion powers, expanding wilds, interactive vault bonus games, and ZAR currency architecture.',
  },
]
</script>

<template>
  <section id="technical-expertise" class="tech-expertise-section">
    <div class="wrap">
      <!-- Section Header -->
      <div class="expertise-header">
        <div>
          <p class="kicker">Verified Capabilities / CV Sourced</p>
          <h2 class="expertise-title">Technical Expertise & Architecture</h2>
        </div>
        <p class="expertise-subtitle">
          Anchored in enterprise Microsoft development, live wagering and payment operations, and WebGL game engineering.
        </p>
      </div>

      <!-- Interactive Tab Selector -->
      <div class="pillar-nav">
        <button
          v-for="p in pillars"
          :id="`tab-${p.id}`"
          :key="p.id"
          type="button"
          class="pillar-tab-btn"
          :class="{ active: activePillar === p.id }"
          @click="activePillar = p.id"
        >
          <span class="tab-kicker">{{ p.kicker }}</span>
          <span class="tab-title">{{ p.title }}</span>
        </button>
      </div>

      <!-- Active Pillar Deep-Dive Card -->
      <div v-for="p in pillars" :key="p.id">
        <div v-if="activePillar === p.id" :id="`pillar-${p.id}`" class="pillar-card">
          <!-- Top Row: Role & Academic Badges -->
          <div class="pillar-top-bar">
            <div class="badge-role">
              <span class="badge-dot"></span>
              <span class="badge-text">{{ p.roleEvidence }}</span>
            </div>
            <div class="badge-metric">
              <span class="metric-icon">★</span>
              <span>{{ p.academicOrMetric }}</span>
            </div>
          </div>

          <!-- Main Title & Summary -->
          <div class="pillar-main-content">
            <h3 class="pillar-content-title">{{ p.title }}</h3>
            <p class="pillar-highlight">{{ p.cvHighlight }}</p>
          </div>

          <!-- Competencies & Production Grid -->
          <div class="pillar-details-grid">
            <!-- Left: Competencies -->
            <div class="details-box">
              <h4 class="details-heading">Core Competencies & Patterns</h4>
              <ul class="competencies-list">
                <li v-for="comp in p.coreCompetencies" :key="comp" class="competency-item">
                  <span class="comp-bullet">◆</span>
                  <span>{{ comp }}</span>
                </li>
              </ul>
            </div>

            <!-- Right: Production Proof & Architecture Stack -->
            <div class="details-box">
              <h4 class="details-heading">Production Deployment & Impact</h4>
              <p class="proof-text">{{ p.productionProof }}</p>

              <div class="stack-block">
                <span class="stack-label">Core Technologies:</span>
                <div class="stack-chips">
                  <span v-for="st in p.architectureStack" :key="st" class="stack-chip">{{ st }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-expertise-section {
  padding: 4rem 0;
  position: relative;
  background:
    linear-gradient(180deg, rgba(8, 9, 12, 0.4) 0%, rgba(13, 28, 22, 0.25) 50%, rgba(8, 9, 12, 0.6) 100%);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.expertise-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2.2rem;
  flex-wrap: wrap;
}

.expertise-title {
  font-family: var(--sans);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  margin: 0.3rem 0 0;
  color: var(--paper);
  letter-spacing: -0.01em;
}

.expertise-subtitle {
  font-family: var(--sans);
  color: var(--mute);
  max-width: 48ch;
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
}

/* Pillar Tabs */
.pillar-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.pillar-tab-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  padding: 1.2rem 1.4rem;
  background: rgba(16, 18, 24, 0.7);
  border: 1px solid var(--line);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  position: relative;
}

.pillar-tab-btn:hover {
  background: rgba(22, 26, 35, 0.9);
  border-color: var(--gold-2);
}

.pillar-tab-btn.active {
  background:
    linear-gradient(160deg, rgba(22, 50, 38, 0.6) 0%, rgba(16, 18, 24, 0.95) 100%);
  border-color: var(--gold);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(201, 164, 106, 0.1);
}

.pillar-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
}

.tab-kicker {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
}

.pillar-tab-btn.active .tab-kicker {
  color: var(--gold-2);
}

.tab-title {
  font-family: var(--sans);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--paper);
}

/* Deep Dive Card */
.pillar-card {
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.4) 0%, rgba(13, 20, 17, 0.6) 40%, rgba(8, 9, 12, 0.95) 100%),
    var(--ink-2);
  border: 1px solid var(--line);
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pillar-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--hair);
}

.badge-role {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mint);
  background: rgba(141, 255, 201, 0.08);
  border: 1px solid rgba(141, 255, 201, 0.3);
  padding: 0.3rem 0.7rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 6px var(--mint);
}

.badge-metric {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--gold-2);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(201, 164, 106, 0.1);
  border: 1px solid rgba(201, 164, 106, 0.25);
  padding: 0.3rem 0.7rem;
}

.metric-icon {
  color: var(--gold);
}

.pillar-main-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pillar-content-title {
  font-family: var(--sans);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 600;
  color: var(--paper);
  margin: 0;
}

.pillar-highlight {
  font-family: var(--sans);
  font-size: 1.05rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--paper) 90%, var(--mute));
  font-weight: 300;
  margin: 0;
  max-width: 72ch;
}

.pillar-details-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.8rem;
}

.details-box {
  background: rgba(8, 9, 12, 0.65);
  border: 1px solid var(--hair);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.details-heading {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold-2);
  margin: 0;
  font-weight: 500;
}

.competencies-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.competency-item {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  font-family: var(--sans);
  font-size: 0.92rem;
  line-height: 1.5;
  color: color-mix(in srgb, var(--paper) 85%, var(--mute));
  font-weight: 300;
}

.comp-bullet {
  color: var(--gold);
  font-size: 0.65rem;
  flex-shrink: 0;
}

.proof-text {
  font-family: var(--sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--paper);
  margin: 0;
  font-weight: 300;
}

.stack-block {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--hair);
}

.stack-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mute);
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.stack-chip {
  font-family: var(--mono);
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  background: rgba(201, 164, 106, 0.08);
  border: 1px solid rgba(201, 164, 106, 0.25);
  color: var(--gold-2);
}

@media (max-width: 860px) {
  .pillar-nav {
    grid-template-columns: 1fr;
  }
  .pillar-details-grid {
    grid-template-columns: 1fr;
  }
  .pillar-card {
    padding: 1.5rem;
  }
}
</style>
