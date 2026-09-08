<script setup lang="ts">
import { ref, computed } from 'vue'
import PixiStage from '@/components/PixiStage.vue'
import TechnicalExpertise from '@/components/TechnicalExpertise.vue'
import { projects } from '@/data/profile'
import type { CabinetTheme } from '@/composables/usePixiFloor'
import { playReelClack, playWinChime } from '@/utils/audioSynth'

const stage = ref<{ spin: () => void; setTheme: (theme: CabinetTheme) => void } | null>(null)

// Cabinet Theme selection: 'springbok-rush', 'eye-of-ra' or 'covies-slots'
const selectedSlug = ref<'springbok-rush' | 'eye-of-ra' | 'covies-slots'>('springbok-rush')
const currentCabinetTheme = computed<CabinetTheme>(() => selectedSlug.value)

const currentProject = computed(() =>
  projects.find((p) => p.slug === selectedSlug.value) ?? projects[0],
)

// Interactive HUD State
const soundEnabled = ref<boolean>(true)
const turboEnabled = ref<boolean>(false)
const isSpinning = ref<boolean>(false)
const lastWinMessage = ref<string>('Ready for spin · Demo Session')
const spinCount = ref<number>(0)
const simulatedBalance = ref<number>(1000)

function selectCabinet(slug: 'springbok-rush' | 'eye-of-ra' | 'covies-slots') {
  selectedSlug.value = slug
  if (stage.value) {
    stage.value.setTheme(slug)
  }
}

function handleSpin() {
  if (!stage.value) return
  isSpinning.value = true
  spinCount.value++

  if (soundEnabled.value) {
    playReelClack(1)
    setTimeout(() => playReelClack(1.15), 150)
    setTimeout(() => playReelClack(1.3), 300)
  }

  stage.value.spin()

  const bet = 10
  simulatedBalance.value = Math.max(0, simulatedBalance.value - bet)

  setTimeout(() => {
    isSpinning.value = false
    const won = Math.random() > 0.45
    if (won) {
      const payout = Math.floor(Math.random() * 8 + 2) * 25
      simulatedBalance.value += payout
      lastWinMessage.value = `WIN! +R${payout}.00 (${selectedSlug.value === 'eye-of-ra' ? 'Deity Wild Match' : 'Treasure Chest Line'})`
      if (soundEnabled.value) {
        playWinChime()
      }
    } else {
      lastWinMessage.value = `Spin complete · Bet R${bet}.00 evaluated`
    }
  }, turboEnabled.value ? 400 : 900)
}

// Future Vision Roadmap Items
const visionPhases = [
  {
    phase: 'Phase 01',
    status: 'In Production',
    tag: 'MVP / White-Label',
    title: 'South African White-Label Slot Kit',
    summary:
      'A modular 5-reel presentation shell built with PixiJS 8, Express backend, and shared TypeScript paytable contracts.',
    highlights: [
      'B2B operatorId + gameId embed architecture for local SA operators (LulaBet, GBets, Betway SA)',
      'ZAR Cents integer math prevents floating point rounding drift',
      'Bilingual localization support: English ↔ isiZulu switchable in real-time',
      'Compliance-ready 18+ Responsible Gambling chrome and limits',
    ],
  },
  {
    phase: 'Phase 02',
    status: 'Roadmap Target',
    tag: 'GLI-19 Standard',
    title: 'Server-Authoritative .NET RNG Engine',
    summary:
      'Migrating from client-rendered prototypes to certified high-throughput ASP.NET Core & C# game math microservices.',
    highlights: [
      'Sub-10ms spin resolution with Cryptographically Secure RNG (CSPRNG)',
      'Reel strip configurations and paytable weightings isolated strictly server-side',
      'SQL Server transaction logging for deterministic replay and audit verification',
      'Entity Framework Core wallet session authority and anti-tamper validations',
    ],
  },
  {
    phase: 'Phase 03',
    status: 'R&D Track',
    tag: 'WebGL 2 & Shaders',
    title: 'Next-Gen WebGL Shaders & Dynamic Cabinets',
    summary:
      'Elevating 2D PixiJS cabinets with custom GLSL fragment shaders, particle physics, and responsive viewport scaling.',
    highlights: [
      'Volumetric deity god-rays and glowing gold edge illumination shaders',
      'GPU-accelerated coin burst physics during big win celebration sequences',
      'Expanding wild symbol animations with procedural displacement maps',
      'Adaptive mobile portrait layouts with 60 FPS capped low-battery modes',
    ],
  },
  {
    phase: 'Phase 04',
    status: 'FinTech Vision',
    tag: 'Regulatory Ledgers',
    title: 'FinTech Wallet & Regulatory Settlement Hub',
    summary:
      'End-to-end integration between casino gaming sessions, payment gateways, and regulatory auditing bodies.',
    highlights: [
      'Instant EFT cash-out pipelines powered by Ozow and PayFast webhooks',
      'Real-time bi-directional balance sync via WebSockets',
      'South African National Gambling Board (NGB) automated reporting schemas',
      'Multi-currency ledger capable of scaling from ZAR to Pan-African markets',
    ],
  },
]
</script>

<template>
  <main class="studio-view">
    <!-- Studio Top Intro & Theme Chooser -->
    <section class="studio-hero-section">
      <div class="wrap">
        <div class="studio-header-row">
          <div>
            <p class="kicker">Interactive Studio / Cabinet Lab</p>
            <h1 class="studio-main-heading">iGaming Cabinet Engine & Vision</h1>
          </div>
          <p class="studio-lead">
            Select a live game cabinet below to test the presentation engine in real-time, review symbol art pipelines, and explore the future studio roadmap.
          </p>
        </div>

        <!-- Cabinet Selection Cards -->
        <div class="cabinet-selector-grid">
          <!-- Card 0: Springbok Rush (NEW) -->
          <div
            id="card-select-springbok-rush"
            class="cabinet-card featured-springbok"
            :class="{ active: selectedSlug === 'springbok-rush' }"
            @click="selectCabinet('springbok-rush')"
          >
            <div class="card-glow-indicator"></div>
            <div class="cabinet-card-top">
              <span class="cabinet-badge gold">🇿🇦 SA White-Label (NEW)</span>
              <span class="cabinet-rtp">96.2% RTP · 20 Lines</span>
            </div>
            <h2 class="cabinet-title serif">Springbok Rush</h2>
            <p class="cabinet-desc">
              Configurable 5×3 slot shell built for South African B2B operators with ZAR cents integer math, ?operatorId= embed params, and real-time EN ↔ isiZulu localization.
            </p>
            <div class="cabinet-card-foot">
              <span class="theme-status">
                <span class="status-dot"></span>
                {{ selectedSlug === 'springbok-rush' ? 'Active on Floor' : 'Click to Load Cabinet' }}
              </span>
              <a
                id="link-live-springbok-rush"
                class="card-external-link highlight-link"
                href="https://white-label-slot.igamingdev.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                @click.stop
              >
                Launch Game ↗
              </a>
            </div>
          </div>

          <!-- Card 1: Eye of Ra -->
          <div
            id="card-select-eye-of-ra"
            class="cabinet-card"
            :class="{ active: selectedSlug === 'eye-of-ra' }"
            @click="selectCabinet('eye-of-ra')"
          >
            <div class="card-glow-indicator"></div>
            <div class="cabinet-card-top">
              <span class="cabinet-badge gold">5×3 Cabinet</span>
              <span class="cabinet-rtp">96.4% RTP · 20 Lines</span>
            </div>
            <h2 class="cabinet-title serif">Eye of Ra</h2>
            <p class="cabinet-desc">
              Egyptian mythology slot with progressive jackpots, divine companion mechanics (Ra, King Tut, Temple Guardian), and expanding golden sphinx wilds.
            </p>
            <div class="cabinet-card-foot">
              <span class="theme-status">
                <span class="status-dot"></span>
                {{ selectedSlug === 'eye-of-ra' ? 'Active on Floor' : 'Click to Load Cabinet' }}
              </span>
              <a
                id="link-live-eye-of-ra"
                class="card-external-link"
                href="https://eye-of-ra-zeta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                @click.stop
              >
                Launch Game ↗
              </a>
            </div>
          </div>

          <!-- Card 2: Covies Slots -->
          <div
            id="card-select-covies-slots"
            class="cabinet-card"
            :class="{ active: selectedSlug === 'covies-slots' }"
            @click="selectCabinet('covies-slots')"
          >
            <div class="card-glow-indicator"></div>
            <div class="cabinet-card-top">
              <span class="cabinet-badge mint">5×5 Matrix</span>
              <span class="cabinet-rtp">95.8% RTP · 30 Lines</span>
            </div>
            <h2 class="cabinet-title serif">Covies Slots</h2>
            <p class="cabinet-desc">
              Interactive casino slot simulator with bonus treasure chest vault mini-games, mystic lion wild predators, and real-time ledger persistence.
            </p>
            <div class="cabinet-card-foot">
              <span class="theme-status">
                <span class="status-dot"></span>
                {{ selectedSlug === 'covies-slots' ? 'Active on Floor' : 'Click to Load Cabinet' }}
              </span>
              <a
                id="link-live-covies-slots"
                class="card-external-link"
                href="https://covies-slots.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                @click.stop
              >
                Launch Game ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live PixiJS Cabinet Floor & Interactive HUD -->
    <section class="live-cabinet-stage-section">
      <div class="wrap">
        <div class="stage-container">
          <!-- Canvas Layer -->
          <div class="canvas-wrap">
            <PixiStage ref="stage" interactive :theme="currentCabinetTheme" />
          </div>

          <!-- HUD Controls Overlay -->
          <div class="hud-control-bar">
            <!-- Left Info -->
            <div class="hud-info-cluster">
              <div class="hud-stat">
                <span class="stat-label">Active Cabinet</span>
                <span class="stat-val highlight">{{ currentProject.title }}</span>
              </div>
              <div class="hud-stat">
                <span class="stat-label">Demo Balance</span>
                <span class="stat-val">R{{ simulatedBalance }}.00</span>
              </div>
              <div class="hud-stat status-stat">
                <span class="stat-label">Engine Feed</span>
                <span class="stat-val feed-text">{{ lastWinMessage }}</span>
              </div>
            </div>

            <!-- Right Controls -->
            <div class="hud-actions-cluster">
              <!-- Sound Toggle -->
              <button
                id="btn-hud-sound"
                type="button"
                class="hud-btn toggle-btn"
                :class="{ active: soundEnabled }"
                :title="soundEnabled ? 'WebAudio Mute' : 'WebAudio Unmute'"
                @click="soundEnabled = !soundEnabled"
              >
                <span>{{ soundEnabled ? '🔊 Sound On' : '🔇 Muted' }}</span>
              </button>

              <!-- Turbo Toggle -->
              <button
                id="btn-hud-turbo"
                type="button"
                class="hud-btn toggle-btn"
                :class="{ active: turboEnabled }"
                :title="turboEnabled ? 'Turbo Mode Enabled' : 'Normal Spin Speed'"
                @click="turboEnabled = !turboEnabled"
              >
                <span>{{ turboEnabled ? '⚡ Turbo' : 'Normal' }}</span>
              </button>

              <!-- Spin Button -->
              <button
                id="btn-hud-spin"
                type="button"
                class="btn primary-spin-btn"
                :disabled="isSpinning"
                @click="handleSpin"
              >
                <span class="spin-icon" :class="{ rotating: isSpinning }">↻</span>
                <span>{{ isSpinning ? 'Evaluating...' : 'Spin Reel (R10)' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Rendered Symbol Strip for Currently Selected Cabinet -->
        <div class="selected-cabinet-symbols">
          <div class="symbols-bar-header">
            <span class="bar-title">Active Rendered Assets: {{ currentProject.title }}</span>
            <span class="bar-subtitle">{{ currentProject.symbols.length }} Rendered High-Resolution Sprites</span>
          </div>

          <div class="symbols-ribbon">
            <div
              v-for="sym in currentProject.symbols"
              :key="sym.name"
              class="ribbon-tile"
            >
              <div class="ribbon-img-box">
                <img :src="sym.imageUrl" :alt="sym.name" loading="lazy" />
                <span v-if="sym.tag" class="ribbon-tag">{{ sym.tag }}</span>
              </div>
              <div class="ribbon-meta">
                <span class="ribbon-name">{{ sym.name }}</span>
                <span class="ribbon-role">{{ sym.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Expertise & Architecture Sourced from CV -->
    <TechnicalExpertise />

    <!-- Future Vision & Studio Roadmap -->
    <section id="studio-vision" class="studio-vision-section">
      <div class="wrap">
        <div class="vision-header">
          <div>
            <p class="kicker">Strategic Vision / Architecture Roadmap</p>
            <h2 class="vision-title serif">Where I Want to Go in the Future</h2>
          </div>
          <p class="vision-desc">
            The studio roadmap bridges creative WebGL presentation with enterprise .NET math certification, South African market localization, and real-time FinTech settlement.
          </p>
        </div>

        <div class="vision-cards-grid">
          <article
            v-for="item in visionPhases"
            :key="item.phase"
            class="vision-card"
          >
            <div class="vision-card-header">
              <span class="phase-badge">{{ item.phase }}</span>
              <span class="status-badge">{{ item.status }}</span>
            </div>

            <h3 class="vision-card-title">{{ item.title }}</h3>
            <p class="vision-card-summary">{{ item.summary }}</p>

            <div class="vision-highlights-box">
              <span class="highlights-label">Architecture Milestones:</span>
              <ul class="highlights-list">
                <li v-for="hl in item.highlights" :key="hl" class="highlight-item">
                  <span class="hl-bullet">◆</span>
                  <span>{{ hl }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Closing Vision CTA -->
    <section class="vision-cta-section">
      <div class="wrap">
        <div class="cta-panel">
          <div>
            <p class="kicker">Ready for Production & B2B Collaboration</p>
            <h2 class="serif" style="font-size: clamp(2rem, 3.5vw, 2.8rem); margin: 0.3rem 0 0.8rem">
              Let's Build the Next Generation of iGaming & FinTech.
            </h2>
            <p class="note" style="max-width: 58ch">
              Whether you need server-authoritative .NET game math, high-performance PixiJS cabinets, or secure payment settlement desks, I am ready to ship.
            </p>
          </div>

          <div class="cta-actions">
            <router-link id="btn-vision-contact" class="btn" to="/contact">
              Initiate Discussion ↗
            </router-link>
            <router-link id="btn-vision-work" class="btn ghost" to="/work">
              Review Project Archive
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.studio-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Studio Hero & Cabinet Chooser */
.studio-hero-section {
  padding: 3.5rem 0 2rem;
}

.studio-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.studio-main-heading {
  font-family: var(--sans);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 600;
  margin: 0.3rem 0 0;
  color: var(--paper);
  letter-spacing: -0.01em;
}

.studio-lead {
  font-family: var(--sans);
  color: var(--mute);
  max-width: 52ch;
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
}

/* Cabinet Selector Grid */
.cabinet-selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.35rem;
}

.cabinet-card {
  position: relative;
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.35) 0%, rgba(16, 18, 24, 0.8) 50%, rgba(8, 9, 12, 0.95) 100%),
    var(--ink-2);
  border: 1px solid var(--line);
  padding: 1.6rem 1.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  transition: all 0.25s ease;
  overflow: hidden;
}

.cabinet-card:hover {
  transform: translateY(-3px);
  border-color: var(--gold);
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.55) 0%, rgba(22, 26, 35, 0.9) 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.cabinet-card.active {
  border-color: var(--gold);
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.7) 0%, rgba(16, 18, 24, 0.95) 100%);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(201, 164, 106, 0.15);
}

.card-glow-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: transparent;
  transition: background-color 0.25s ease;
}

.cabinet-card.active .card-glow-indicator {
  background: linear-gradient(90deg, var(--gold), var(--gold-2), var(--mint));
}

.cabinet-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cabinet-badge {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  font-weight: 600;
}

.cabinet-badge.gold {
  background: rgba(201, 164, 106, 0.15);
  border: 1px solid rgba(201, 164, 106, 0.4);
  color: var(--gold-2);
}

.cabinet-badge.mint {
  background: rgba(141, 255, 201, 0.12);
  border: 1px solid rgba(141, 255, 201, 0.4);
  color: var(--mint);
}

.cabinet-rtp {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: var(--mute);
}

.cabinet-title {
  font-family: var(--serif);
  font-size: 2.2rem;
  margin: 0;
  color: var(--paper);
  line-height: 1.1;
}

.cabinet-desc {
  font-family: var(--sans);
  font-size: 0.92rem;
  line-height: 1.5;
  color: color-mix(in srgb, var(--paper) 80%, var(--mute));
  margin: 0;
  font-weight: 300;
}

.cabinet-card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.7rem;
  border-top: 1px solid var(--hair);
  margin-top: auto;
}

.theme-status {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold-2);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.cabinet-card.active .theme-status {
  color: var(--mint);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
}

.cabinet-card.active .status-dot {
  background: var(--mint);
  box-shadow: 0 0 6px var(--mint);
}

.card-external-link {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  transition: color 0.2s ease;
}

.card-external-link:hover {
  color: var(--gold-2);
  text-decoration: underline;
}

/* Live Stage Section */
.live-cabinet-stage-section {
  padding: 1.5rem 0 3.5rem;
}

.stage-container {
  border: 1px solid var(--line);
  background: var(--ink-2);
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.5);
}

.canvas-wrap {
  width: 100%;
  height: clamp(340px, 46vh, 480px);
  position: relative;
}

.canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.hud-control-bar {
  background: rgba(8, 9, 12, 0.95);
  border-top: 1px solid var(--line);
  padding: 1rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hud-info-cluster {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  flex-wrap: wrap;
}

.hud-stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-label {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mute);
}

.stat-val {
  font-family: var(--mono);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--paper);
}

.stat-val.highlight {
  color: var(--gold-2);
}

.status-stat {
  min-width: 220px;
}

.feed-text {
  font-size: 0.82rem;
  color: var(--mint);
}

.hud-actions-cluster {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hud-btn.toggle-btn {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.5rem 0.85rem;
  background: rgba(22, 26, 35, 0.8);
  border: 1px solid var(--line);
  color: var(--mute);
  cursor: pointer;
  transition: all 0.2s ease;
}

.hud-btn.toggle-btn.active {
  background: rgba(201, 164, 106, 0.15);
  border-color: var(--gold);
  color: var(--gold-2);
}

.primary-spin-btn {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.4rem;
  border-color: var(--gold);
  cursor: pointer;
}

.primary-spin-btn:hover:not(:disabled) {
  background: var(--gold-2);
}

.primary-spin-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

.spin-icon {
  font-size: 1.1rem;
  line-height: 1;
  display: inline-block;
}

.spin-icon.rotating {
  animation: spin-turn 0.6s linear infinite;
}

@keyframes spin-turn {
  100% {
    transform: rotate(360deg);
  }
}

/* Selected Cabinet Symbols Ribbon */
.selected-cabinet-symbols {
  margin-top: 1.2rem;
  background: rgba(16, 18, 24, 0.7);
  border: 1px solid var(--hair);
  padding: 1.1rem 1.3rem;
}

.symbols-bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.6rem;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid var(--hair);
}

.bar-title {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold-2);
  font-weight: 500;
}

.bar-subtitle {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mute);
}

.symbols-ribbon {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;
}

.ribbon-tile {
  background: rgba(8, 9, 12, 0.8);
  border: 1px solid var(--line);
  padding: 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ribbon-img-box {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(201, 164, 106, 0.12) 0%, rgba(8, 9, 12, 0.9) 85%);
  overflow: hidden;
}

.ribbon-img-box img {
  width: 85%;
  height: 85%;
  object-fit: contain;
}

.ribbon-tag {
  position: absolute;
  top: 3px;
  right: 3px;
  font-family: var(--mono);
  font-size: 0.52rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--gold);
  color: var(--ink);
  padding: 0.08rem 0.3rem;
  font-weight: 600;
}

.ribbon-meta {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.ribbon-name {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--paper);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ribbon-role {
  font-size: 0.65rem;
  color: var(--mute);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Future Vision Section */
.studio-vision-section {
  padding: 4.5rem 0;
  background:
    radial-gradient(900px 500px at 50% 0%, rgba(22, 50, 38, 0.3) 0%, transparent 60%);
}

.vision-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.vision-title {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 600;
  margin: 0.3rem 0 0;
  color: var(--paper);
}

.vision-desc {
  font-family: var(--sans);
  color: var(--mute);
  max-width: 48ch;
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
}

.vision-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.8rem;
}

.vision-card {
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.4) 0%, rgba(13, 20, 17, 0.6) 40%, rgba(8, 9, 12, 0.95) 100%),
    var(--ink-2);
  border: 1px solid var(--line);
  padding: 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.vision-card:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.vision-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phase-badge {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
}

.status-badge {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  background: rgba(141, 255, 201, 0.1);
  border: 1px solid rgba(141, 255, 201, 0.35);
  color: var(--mint);
}

.vision-card-title {
  font-family: var(--sans);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--paper);
  margin: 0;
}

.vision-card-summary {
  font-family: var(--sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--paper) 85%, var(--mute));
  font-weight: 300;
  margin: 0;
}

.vision-highlights-box {
  background: rgba(8, 9, 12, 0.6);
  border: 1px solid var(--hair);
  padding: 1rem 1.1rem;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.highlights-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-2);
}

.highlights-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.highlight-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: var(--sans);
  font-size: 0.85rem;
  line-height: 1.45;
  color: color-mix(in srgb, var(--paper) 80%, var(--mute));
  font-weight: 300;
}

.hl-bullet {
  color: var(--gold);
  font-size: 0.6rem;
  flex-shrink: 0;
}

/* Vision CTA Panel */
.vision-cta-section {
  padding: 2rem 0 5rem;
}

.cta-panel {
  background:
    linear-gradient(160deg, rgba(22, 50, 38, 0.6) 0%, rgba(16, 18, 24, 0.9) 100%),
  var(--ink-2);
  border: 1px solid var(--gold);
  padding: 2.6rem 2.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 860px) {
  .cabinet-selector-grid,
  .vision-cards-grid {
    grid-template-columns: 1fr;
  }
  .hud-control-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .hud-actions-cluster {
    justify-content: stretch;
  }
  .hud-actions-cluster .btn {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
}
</style>
