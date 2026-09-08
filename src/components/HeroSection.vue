<script setup lang="ts">
import { ref } from 'vue'
import PixiStage from '@/components/PixiStage.vue'
import { profile } from '@/data/profile'
import { playReelClack, playWinChime } from '@/utils/audioSynth'

interface Props {
  showCanvas?: boolean
}

withDefaults(defineProps<Props>(), {
  showCanvas: true,
})

const pixiStageRef = ref<InstanceType<typeof PixiStage> | null>(null)
const isSpinning = ref(false)
const spinOutcome = ref<string | null>(null)

const heroSymbols = [
  {
    name: 'Springbok Rush',
    role: 'SA White-Label Slot (NEW)',
    tag: 'ZAR 5×3',
    imageUrl: 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/slot-projects/springbok-slot.png',
    liveUrl: 'https://white-label-slot.igamingdev.workers.dev/',
  },
  {
    name: 'Eye of Ra',
    role: 'Egyptian Jackpot Deity',
    tag: '5×3 Slot',
    imageUrl: 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-icons/king-tut.png',
    liveUrl: 'https://eye-of-ra-zeta.vercel.app/',
  },
  {
    name: 'Covies Slots',
    role: 'Bonus Vault Casino Matrix',
    tag: '5×5 Matrix',
    imageUrl: 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/gambling-symbols/mystic-lion-symbol.jpg',
    liveUrl: 'https://covies-slots.vercel.app/',
  },
]

const triggerSpin = () => {
  if (isSpinning.value) return
  isSpinning.value = true
  spinOutcome.value = 'Spinning reels...'

  playReelClack(1.0)
  setTimeout(() => playReelClack(1.2), 150)
  setTimeout(() => playReelClack(1.4), 300)

  if (pixiStageRef.value) {
    pixiStageRef.value.spin()
  }

  setTimeout(() => {
    isSpinning.value = false
    const won = Math.random() > 0.4
    if (won) {
      const payout = Math.floor(Math.random() * 5 + 2) * 50
      spinOutcome.value = `WIN! +R${payout}.00`
      playWinChime()
    } else {
      spinOutcome.value = 'Reels Stopped · 20 Winlines'
    }
  }, 900)
}
</script>

<template>
  <section id="hero-section" class="hero-section">
    <!-- Interactive Background PixiJS Canvas Floor -->
    <div v-if="showCanvas" class="hero-canvas">
      <PixiStage ref="pixiStageRef" interactive />
    </div>

    <!-- Clean, Focused Hero Content Overlay -->
    <div class="hero-copy wrap">
      <!-- Status Badge -->
      <div class="hero-status-row">
        <span class="status-pill">
          <span class="status-dot"></span>
          <span>{{ profile.location }}</span>
        </span>
        <span class="status-sep">/</span>
        <span class="status-role">Full-Stack & iGaming Engineer</span>
      </div>

      <!-- Main Headline (Simpler, Punchy) -->
      <div class="hero-intro-block">
        <p class="hero-greeting">Hi, I'm</p>
        <h1 id="hero-title" class="hero-name serif">
          Uvaan <em class="highlight-gold">Covenden</em>
        </h1>
        <p class="hero-statement serif">
          Building playable slot engines & enterprise .NET backends.
        </p>
      </div>

      <!-- Simplified, Clean Bio -->
      <p class="hero-bio">
        Enterprise .NET developer at <strong>South African Funeral Supplies</strong>. Studio engineer shipping live PixiJS slots like <a href="https://white-label-slot.igamingdev.workers.dev/" target="_blank" rel="noopener noreferrer" class="text-gold">Springbok Rush</a>, <a href="https://eye-of-ra-zeta.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-gold">Eye of Ra</a>, and <a href="https://covies-slots.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-gold">Covies Slots</a>.
      </p>

      <!-- Visual Slot Showcase Ribbon (Mobile Responsive & Touch Friendly) -->
      <div class="hero-assets-showcase">
        <div class="showcase-header">
          <span class="showcase-kicker">Live Shipped Games</span>
          <span class="showcase-hint">Tap to play ↗</span>
        </div>
        <div class="assets-ribbon">
          <a
            v-for="asset in heroSymbols"
            :key="asset.name"
            :href="asset.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="asset-badge-card"
            :title="`Launch ${asset.name} Live Demo`"
          >
            <div class="asset-thumb-wrap">
              <img :src="asset.imageUrl" :alt="asset.name" class="asset-thumb" loading="lazy" />
              <span class="asset-tag">{{ asset.tag }}</span>
            </div>
            <div class="asset-meta">
              <strong class="asset-title">{{ asset.name }}</strong>
              <span class="asset-role">{{ asset.role }}</span>
            </div>
            <span class="asset-launch-arrow">↗</span>
          </a>
        </div>
      </div>

      <!-- Spin Outcome Pill -->
      <div v-if="spinOutcome" class="spin-toast-bar">
        <span class="toast-dot"></span>
        <span class="toast-text">{{ spinOutcome }}</span>
      </div>

      <!-- Responsive Action Deck -->
      <div class="hero-actions">
        <!-- Play Live Game -->
        <a
          id="hero-btn-springbok"
          class="btn springbok-cta-btn"
          href="https://white-label-slot.igamingdev.workers.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="springbok-icon">🇿🇦</span>
          <span>Play Springbok Rush</span>
          <span class="btn-arrow">↗</span>
        </a>

        <!-- WhatsApp Quick Reach -->
        <a
          id="hero-btn-whatsapp"
          class="btn whatsapp-hero-btn"
          :href="profile.whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>WhatsApp ({{ profile.phone }})</span>
          <span class="btn-arrow">↗</span>
        </a>

        <!-- Explore Studio -->
        <router-link id="hero-btn-studio" class="btn ghost" to="/studio">
          <span>Slot Studio</span>
          <span class="btn-arrow">↗</span>
        </router-link>

        <!-- Spin Interactive Canvas -->
        <button
          id="btn-spin-canvas"
          type="button"
          class="btn ghost spin-canvas-btn"
          :class="{ spinning: isSpinning }"
          title="Spin the background PixiJS reels"
          @click="triggerSpin"
        >
          <span class="spin-icon" :class="{ rotating: isSpinning }">↻</span>
          <span>{{ isSpinning ? 'Spinning...' : 'Spin Floor' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 85vh;
  display: grid;
  place-items: end stretch;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: var(--ink);
}

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

.hero-copy {
  position: relative;
  z-index: 2;
  padding: 3.5rem 0 2.8rem;
  background: linear-gradient(
    to top,
    rgba(8, 9, 12, 0.98) 0%,
    rgba(8, 9, 12, 0.92) 60%,
    rgba(8, 9, 12, 0.35) 100%
  );
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

/* Status row */
.hero-status-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mint);
  background: rgba(141, 255, 201, 0.08);
  border: 1px solid rgba(141, 255, 201, 0.3);
  padding: 0.22rem 0.55rem;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 6px var(--mint);
}

.status-sep {
  color: var(--line);
  font-family: var(--mono);
  font-size: 0.75rem;
}

.status-role {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-2);
}

/* Name & Statement */
.hero-intro-block {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.hero-greeting {
  font-family: var(--mono);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0;
}

.hero-name {
  font-family: var(--serif);
  font-size: clamp(2.8rem, 6.5vw, 5.2rem);
  font-weight: 600;
  line-height: 0.95;
  margin: 0.1rem 0 0.25rem;
  letter-spacing: -0.025em;
  color: var(--paper);
}

.highlight-gold {
  font-style: italic;
  color: var(--gold-2);
  text-shadow: 0 0 30px rgba(201, 164, 106, 0.25);
}

.hero-statement {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2.4vw, 1.95rem);
  font-weight: 500;
  line-height: 1.25;
  color: color-mix(in srgb, var(--paper) 95%, var(--gold-2));
  max-width: 44rem;
  margin: 0.1rem 0 0;
}

/* Personal Bio */
.hero-bio {
  font-family: var(--sans);
  font-size: 1rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
  font-weight: 300;
  max-width: 48rem;
  margin: 0;
}

.hero-bio strong {
  color: var(--paper);
  font-weight: 500;
}

.text-gold {
  color: var(--gold-2);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.text-gold:hover {
  color: var(--mint);
}

/* Visual Slot Assets Ribbon */
.hero-assets-showcase {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: 0.15rem;
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.showcase-kicker {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-2);
  font-weight: 500;
}

.showcase-hint {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: var(--mute);
}

.assets-ribbon {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.65rem;
}

.asset-badge-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  background: rgba(16, 18, 24, 0.85);
  border: 1px solid var(--line);
  text-decoration: none;
  color: inherit;
  min-height: 52px;
  transition: all 0.2s ease;
}

.asset-badge-card:hover {
  border-color: var(--gold);
  background: rgba(26, 30, 42, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.asset-thumb-wrap {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 2px;
  background: radial-gradient(circle, rgba(201, 164, 106, 0.2) 0%, rgba(8, 9, 12, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.asset-thumb {
  width: 88%;
  height: 88%;
  object-fit: contain;
  transition: transform 0.25s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7));
}

.asset-badge-card:hover .asset-thumb {
  transform: scale(1.12);
}

.asset-tag {
  position: absolute;
  top: 1px;
  right: 1px;
  font-family: var(--mono);
  font-size: 0.46rem;
  font-weight: 600;
  color: var(--ink);
  background: var(--gold);
  padding: 0.05rem 0.22rem;
  line-height: 1;
}

.asset-meta {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
  flex: 1;
}

.asset-title {
  font-family: var(--sans);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--paper);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.asset-role {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  color: var(--mute);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.asset-launch-arrow {
  font-size: 0.85rem;
  color: var(--gold-2);
  line-height: 1;
  opacity: 0.7;
}

/* Spin Feedback Toast */
.spin-toast-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--mint);
  background: rgba(141, 255, 201, 0.1);
  border: 1px solid rgba(141, 255, 201, 0.35);
  padding: 0.3rem 0.75rem;
  width: fit-content;
}

.toast-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 6px var(--mint);
}

/* Actions Deck */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
}

.springbok-cta-btn {
  background: linear-gradient(135deg, #ffd700 0%, #c9a46a 100%);
  color: #08090c;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid #ffd700;
  min-height: 44px;
  padding: 0 1.2rem;
  transition: all 0.2s ease;
}

.springbok-cta-btn:hover {
  background: #ffdf33;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.35);
}

.springbok-icon {
  font-size: 0.95rem;
}

.whatsapp-hero-btn {
  background: #25d366;
  color: #08090c;
  border-color: #25d366;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  padding: 0 1.1rem;
  transition: all 0.2s ease;
}

.whatsapp-hero-btn:hover {
  background: #20ba5a;
  border-color: #20ba5a;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.3);
  color: #08090c;
}

.btn-arrow {
  font-size: 0.9rem;
  line-height: 1;
}

.spin-canvas-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  padding: 0 1rem;
  cursor: pointer;
}

.spin-icon {
  font-size: 1rem;
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

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .hero-copy {
    padding: 2.5rem 0 2rem;
    gap: 1rem;
  }
  .assets-ribbon {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
  }
  .hero-actions .btn {
    width: 100%;
    min-height: 48px;
    text-align: center;
    justify-content: center;
    font-size: 0.74rem;
  }
}

@media (max-width: 480px) {
  .hero-status-row {
    font-size: 0.65rem;
  }
  .status-pill {
    padding: 0.2rem 0.45rem;
  }
  .hero-bio {
    font-size: 0.95rem;
    line-height: 1.55;
  }
}
</style>
