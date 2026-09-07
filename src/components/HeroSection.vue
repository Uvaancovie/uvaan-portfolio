<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import PixiStage from '@/components/PixiStage.vue'
import { profile } from '@/data/profile'
import type { CabinetTheme } from '@/composables/usePixiFloor'
import { playReelClack, playWinChime } from '@/utils/audioSynth'

interface Props {
  showCanvas?: boolean
}

withDefaults(defineProps<Props>(), {
  showCanvas: true,
})

const pixiStageRef = ref<InstanceType<typeof PixiStage> | null>(null)
const selectedTheme = ref<CabinetTheme>('eye-of-ra')
const isSpinning = ref(false)
const soundEnabled = ref(true)
const lastSpinResult = ref<string | null>(null)
const emailCopied = ref(false)

// Real-time Durban / South African Standard Time (SAST, UTC+2)
const currentTimeStr = ref('')
let timerInterval: ReturnType<typeof setInterval> | null = null

const updateClock = () => {
  const now = new Date()
  currentTimeStr.value = now.toLocaleTimeString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

onMounted(() => {
  updateClock()
  timerInterval = setInterval(updateClock, 1000)
})

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const activeThemeLabel = computed(() => {
  return selectedTheme.value === 'eye-of-ra'
    ? 'Eye of Ra · 5×3 Egyptian Cabinet (96.4% RTP · 20 Lines)'
    : 'Covies Slots · 5×5 Casino Matrix (95.8% RTP · 30 Lines)'
})

const switchTheme = (theme: CabinetTheme) => {
  selectedTheme.value = theme
  if (pixiStageRef.value) {
    pixiStageRef.value.setTheme(theme)
  }
  if (soundEnabled.value) {
    playReelClack(1.2)
  }
}

const triggerSpin = () => {
  if (isSpinning.value) return
  isSpinning.value = true
  lastSpinResult.value = 'Evaluating Paylines...'

  if (soundEnabled.value) {
    playReelClack(1.0)
    setTimeout(() => playReelClack(1.2), 160)
    setTimeout(() => playReelClack(1.4), 320)
  }

  if (pixiStageRef.value) {
    pixiStageRef.value.spin()
  }

  setTimeout(() => {
    isSpinning.value = false
    const won = Math.random() > 0.4
    if (won) {
      const payout = Math.floor(Math.random() * 6 + 2) * 50
      lastSpinResult.value = `WIN! +R${payout}.00 (${selectedTheme.value === 'eye-of-ra' ? 'Ra Deity Scatter' : 'Vault Chest Match'})`
      if (soundEnabled.value) {
        playWinChime()
      }
    } else {
      lastSpinResult.value = 'Spin Evaluated · Fixed 20 Winlines Active'
    }
  }, 950)
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2400)
  } catch {
    // Fallback
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2400)
  }
}
</script>

<template>
  <section id="hero-section" class="hero-section">
    <!-- Interactive Background PixiJS Canvas Floor -->
    <div v-if="showCanvas" class="hero-canvas">
      <PixiStage ref="pixiStageRef" interactive :theme="selectedTheme" />
    </div>

    <!-- Hero Content Overlay -->
    <div class="hero-overlay wrap">
      <!-- Top Live Telemetry & Durban Status Bar -->
      <div class="hero-telemetry-bar">
        <div class="telemetry-left">
          <span class="live-beacon">
            <span class="beacon-pulse"></span>
            <span class="beacon-core"></span>
          </span>
          <span class="telemetry-text">
            <strong>DURBAN, SA</strong>
            <span class="time-readout">{{ currentTimeStr }} SAST</span>
          </span>
          <span class="telemetry-sep">/</span>
          <span class="telemetry-status">Available for B2B & Full-Stack Roles</span>
        </div>

        <div class="telemetry-right">
          <span class="engine-badge">
            <span class="badge-icon">⚡</span>
            <span>{{ activeThemeLabel }}</span>
          </span>
        </div>
      </div>

      <!-- Main Headline & Personal Identity -->
      <div class="hero-main-content">
        <div class="hero-kicker-row">
          <p class="hero-kicker">00 / Full-Stack & iGaming Engineer</p>
          <span class="hero-kicker-tag">23 Y/O · Durban Based</span>
        </div>

        <h1 id="hero-title" class="hero-name serif">
          Uvaan <em class="highlight-gold">Covenden</em>
        </h1>

        <p class="hero-statement serif">
          Building high-stakes iGaming engines, transactional FinTech ledgers, and enterprise .NET systems.
        </p>

        <!-- Concise & Impactful Narrative -->
        <p class="hero-bio">
          By day, I engineer mission-critical enterprise systems on the <strong>Microsoft .NET</strong> stack (ASP.NET Core & SQL Server) at <strong>South African Funeral Supplies</strong>. In the studio, I build server-authoritative <strong>PixiJS slot engines</strong> like <router-link to="/studio" class="gold-link">Eye of Ra</router-link> and <router-link to="/studio" class="gold-link">Covies Slots</router-link> with certified math models and high-throughput transactional ledgers.
        </p>

        <!-- Interactive Cabinet Floor Control Bar -->
        <div class="cabinet-interactive-bar">
          <div class="theme-switcher">
            <span class="bar-label">Floor Theme:</span>
            <button
              id="btn-theme-ra"
              type="button"
              class="theme-pill"
              :class="{ active: selectedTheme === 'eye-of-ra' }"
              @click="switchTheme('eye-of-ra')"
            >
              <span>🏛️ Eye of Ra (5×3)</span>
            </button>
            <button
              id="btn-theme-covies"
              type="button"
              class="theme-pill"
              :class="{ active: selectedTheme === 'covies-slots' }"
              @click="switchTheme('covies-slots')"
            >
              <span>🎰 Covies Slots (5×5)</span>
            </button>
          </div>

          <div class="spin-controls">
            <!-- Sound Toggle -->
            <button
              id="btn-hero-sound"
              type="button"
              class="icon-control-btn"
              :class="{ active: soundEnabled }"
              :title="soundEnabled ? 'WebAudio FX On' : 'WebAudio Muted'"
              @click="soundEnabled = !soundEnabled"
            >
              <span>{{ soundEnabled ? '🔊' : '🔇' }}</span>
            </button>

            <!-- Interactive Spin Trigger -->
            <button
              id="btn-hero-spin"
              type="button"
              class="btn spin-action-btn"
              :class="{ spinning: isSpinning }"
              :disabled="isSpinning"
              @click="triggerSpin"
            >
              <span class="spin-icon" :class="{ rotating: isSpinning }">↻</span>
              <span>{{ isSpinning ? 'Evaluating...' : 'Spin Canvas Floor' }}</span>
            </button>
          </div>
        </div>

        <!-- Spin Evaluation Ticker Toast -->
        <div v-if="lastSpinResult" class="spin-result-ticker">
          <span class="ticker-dot"></span>
          <span class="ticker-msg">{{ lastSpinResult }}</span>
        </div>

        <!-- Metric & Credential Bento Badges -->
        <div class="hero-bento-row">
          <div class="bento-badge">
            <span class="bento-label">Enterprise Role</span>
            <strong class="bento-val">{{ profile.role }}</strong>
            <span class="bento-sub">@ {{ profile.employer }}</span>
          </div>

          <div class="bento-badge">
            <span class="bento-label">Education Spine</span>
            <strong class="bento-val">B.AppDev Degree</strong>
            <span class="bento-sub">Distinction Graduate · 2025</span>
          </div>

          <div class="bento-badge">
            <span class="bento-label">iGaming Studio</span>
            <strong class="bento-val">{{ profile.studio }}</strong>
            <span class="bento-sub">2 Shipped WebGL Slot Engines</span>
          </div>

          <div class="bento-badge">
            <span class="bento-label">Core Tech Stack</span>
            <strong class="bento-val">.NET + PixiJS + SQL</strong>
            <span class="bento-sub">ASP.NET Core · TypeScript · ZAR</span>
          </div>
        </div>

        <!-- Call-to-Action Action Deck -->
        <div class="hero-cta-deck">
          <!-- WhatsApp Primary Contact -->
          <a
            id="hero-btn-whatsapp"
            class="btn cta-whatsapp"
            :href="profile.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="cta-icon">💬</span>
            <span>WhatsApp Me ({{ profile.phone }})</span>
            <span class="btn-arrow">↗</span>
          </a>

          <!-- Studio Navigation -->
          <router-link id="hero-btn-studio" class="btn ghost cta-studio" to="/studio">
            <span class="cta-icon">🎰</span>
            <span>Launch Slot Studio</span>
            <span class="btn-arrow">↗</span>
          </router-link>

          <!-- Playable Live Links -->
          <a
            id="hero-link-eye-of-ra"
            class="btn ghost playable-link"
            href="https://eye-of-ra-zeta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Play Eye of Ra</span>
            <span class="btn-arrow">↗</span>
          </a>

          <!-- Direct Copy Email -->
          <button
            id="hero-btn-copy-email"
            type="button"
            class="btn ghost copy-email-btn"
            :class="{ copied: emailCopied }"
            @click="copyEmail"
          >
            <span>{{ emailCopied ? '✓ Email Copied!' : '✉ Copy Email' }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 92vh;
  display: grid;
  place-items: end stretch;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: var(--ink);
}

/* Background Canvas */
.hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-canvas canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Overlay & Glass Gradient */
.hero-overlay {
  position: relative;
  z-index: 2;
  padding: 3.2rem 0 3.2rem;
  background: linear-gradient(
    to top,
    rgba(8, 9, 12, 0.98) 0%,
    rgba(8, 9, 12, 0.92) 48%,
    rgba(8, 9, 12, 0.55) 85%,
    rgba(8, 9, 12, 0.2) 100%
  );
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

/* Top Live Telemetry Bar */
.hero-telemetry-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--hair);
}

.telemetry-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.live-beacon {
  position: relative;
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.beacon-core {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px var(--mint);
}

.beacon-pulse {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--mint);
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.telemetry-text {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--paper);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.time-readout {
  color: var(--gold);
  font-weight: 500;
}

.telemetry-sep {
  color: var(--line);
  font-family: var(--mono);
  font-size: 0.75rem;
}

.telemetry-status {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--mint);
  background: rgba(141, 255, 201, 0.08);
  border: 1px solid rgba(141, 255, 201, 0.25);
  padding: 0.15rem 0.55rem;
  border-radius: 2px;
}

.telemetry-right {
  display: flex;
  align-items: center;
}

.engine-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--gold-2);
  background: rgba(201, 164, 106, 0.1);
  border: 1px solid rgba(201, 164, 106, 0.3);
  padding: 0.2rem 0.65rem;
}

.badge-icon {
  color: var(--gold);
  font-size: 0.75rem;
}

/* Main Content Block */
.hero-main-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hero-kicker-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.hero-kicker {
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0;
  font-weight: 500;
}

.hero-kicker-tag {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
  border: 1px solid var(--line);
  padding: 0.15rem 0.5rem;
}

.hero-name {
  font-family: var(--serif);
  font-size: clamp(3.2rem, 7.5vw, 6.2rem);
  font-weight: 600;
  line-height: 0.95;
  margin: 0.1rem 0 0.3rem;
  letter-spacing: -0.025em;
  color: var(--paper);
}

.highlight-gold {
  font-style: italic;
  color: var(--gold-2);
  text-shadow: 0 0 35px rgba(201, 164, 106, 0.35);
}

.hero-statement {
  font-family: var(--serif);
  font-size: clamp(1.45rem, 2.9vw, 2.25rem);
  font-weight: 500;
  line-height: 1.25;
  color: color-mix(in srgb, var(--paper) 95%, var(--gold-2));
  max-width: 48rem;
  margin: 0;
}

.hero-bio {
  font-family: var(--sans);
  font-size: 1.05rem;
  line-height: 1.68;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
  font-weight: 300;
  max-width: 52rem;
  margin: 0;
}

.hero-bio strong {
  color: var(--paper);
  font-weight: 500;
}

.gold-link {
  color: var(--gold-2);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.gold-link:hover {
  color: var(--mint);
}

/* Cabinet Interactive Bar */
.cabinet-interactive-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  background: rgba(16, 18, 24, 0.85);
  border: 1px solid var(--line);
  padding: 0.75rem 1.1rem;
  margin-top: 0.2rem;
}

.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.bar-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}

.theme-pill {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.8rem;
  background: rgba(8, 9, 12, 0.7);
  border: 1px solid var(--line);
  color: var(--paper);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-pill:hover {
  border-color: var(--gold);
  color: var(--gold-2);
}

.theme-pill.active {
  background: rgba(201, 164, 106, 0.16);
  border-color: var(--gold);
  color: var(--gold-2);
  font-weight: 500;
  box-shadow: 0 0 15px rgba(201, 164, 106, 0.18);
}

.spin-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.icon-control-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 9, 12, 0.8);
  border: 1px solid var(--line);
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.icon-control-btn:hover {
  border-color: var(--gold);
}

.spin-action-btn {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.5rem;
  padding: 0 1.2rem;
  cursor: pointer;
}

.spin-action-btn:hover:not(:disabled) {
  background: var(--gold-2);
  box-shadow: 0 0 20px rgba(201, 164, 106, 0.35);
}

.spin-action-btn:disabled {
  opacity: 0.75;
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

/* Spin Result Ticker */
.spin-result-ticker {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  color: var(--mint);
  background: rgba(141, 255, 201, 0.1);
  border: 1px solid rgba(141, 255, 201, 0.35);
  padding: 0.35rem 0.8rem;
  width: fit-content;
}

.ticker-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 6px var(--mint);
}

/* Bento Metrics Grid */
.hero-bento-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.85rem;
  margin-top: 0.4rem;
}

.bento-badge {
  background: rgba(16, 18, 24, 0.75);
  border: 1px solid var(--line);
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.bento-badge:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.bento-label {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mute);
}

.bento-val {
  font-family: var(--sans);
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--paper);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bento-sub {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  color: var(--gold-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* CTA Deck */
.hero-cta-deck {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
}

.cta-whatsapp {
  background: #25d366;
  color: #08090c;
  border-color: #25d366;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.2s ease;
}

.cta-whatsapp:hover {
  background: #20ba5a;
  border-color: #20ba5a;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35);
  color: #08090c;
}

.cta-studio {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.playable-link {
  color: var(--gold-2);
  border-color: var(--line);
}

.copy-email-btn {
  font-family: var(--mono);
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-email-btn.copied {
  background: rgba(141, 255, 201, 0.15);
  border-color: var(--mint);
  color: var(--mint);
}

.cta-icon {
  font-size: 0.95rem;
}

.btn-arrow {
  font-size: 0.95rem;
  line-height: 1;
}

/* Responsiveness */
@media (max-width: 980px) {
  .hero-bento-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-overlay {
    padding: 2.2rem 0 2.2rem;
  }
  .hero-telemetry-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .cabinet-interactive-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .spin-controls {
    justify-content: stretch;
  }
  .spin-action-btn {
    flex: 1;
    justify-content: center;
  }
  .hero-bento-row {
    grid-template-columns: 1fr;
  }
  .hero-cta-deck {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-cta-deck .btn {
    text-align: center;
    justify-content: center;
  }
}
</style>
