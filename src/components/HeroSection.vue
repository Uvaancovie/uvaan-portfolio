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

const triggerSpin = () => {
  if (isSpinning.value) return
  isSpinning.value = true

  playReelClack(1.0)
  setTimeout(() => playReelClack(1.2), 150)
  setTimeout(() => playReelClack(1.4), 300)

  if (pixiStageRef.value) {
    pixiStageRef.value.spin()
  }

  setTimeout(() => {
    isSpinning.value = false
    if (Math.random() > 0.45) {
      playWinChime()
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
        <span class="status-role">Full-Stack Application Developer</span>
      </div>

      <!-- Main Headline & Narrative -->
      <div class="hero-intro-block">
        <p class="hero-greeting">Hi, I'm</p>
        <h1 id="hero-title" class="hero-name serif">
          Uvaan <em class="highlight-gold">Covenden</em>
        </h1>
        <p class="hero-statement serif">
          Building high-stakes iGaming engines, transactional FinTech ledgers, and enterprise .NET systems.
        </p>
      </div>

      <!-- Clean Narrative Bio -->
      <p class="hero-bio">
        By day, I engineer mission-critical enterprise systems on the <strong>Microsoft .NET</strong> stack (ASP.NET Core & SQL Server) at <strong>South African Funeral Supplies</strong>. In the studio, I build server-authoritative <strong>PixiJS slot engines</strong> like <router-link to="/studio" class="text-gold">Eye of Ra</router-link> and <router-link to="/studio" class="text-gold">Covies Slots</router-link> with certified math models and high-throughput transactional ledgers.
      </p>

      <!-- Streamlined Action Deck -->
      <div class="hero-actions">
        <a
          id="hero-btn-whatsapp"
          class="btn whatsapp-hero-btn"
          :href="profile.whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>WhatsApp Me ({{ profile.phone }})</span>
          <span class="btn-arrow">↗</span>
        </a>

        <router-link id="hero-btn-studio" class="btn ghost" to="/studio">
          <span>Explore Slot Studio</span>
          <span class="btn-arrow">↗</span>
        </router-link>

        <button
          id="btn-spin-canvas"
          type="button"
          class="btn ghost spin-canvas-btn"
          :class="{ spinning: isSpinning }"
          title="Spin the background PixiJS reels"
          @click="triggerSpin"
        >
          <span class="spin-icon" :class="{ rotating: isSpinning }">↻</span>
          <span>{{ isSpinning ? 'Spinning...' : 'Spin Reel Floor' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 88vh;
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
  padding: 4.5rem 0 3.8rem;
  background: linear-gradient(
    to top,
    rgba(8, 9, 12, 0.98) 0%,
    rgba(8, 9, 12, 0.9) 60%,
    rgba(8, 9, 12, 0.3) 100%
  );
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

/* Status row */
.hero-status-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mint);
  background: rgba(141, 255, 201, 0.08);
  border: 1px solid rgba(141, 255, 201, 0.3);
  padding: 0.25rem 0.65rem;
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
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-2);
}

/* Name & Statement */
.hero-intro-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.hero-greeting {
  font-family: var(--mono);
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0;
}

.hero-name {
  font-family: var(--serif);
  font-size: clamp(3.2rem, 7.5vw, 6rem);
  font-weight: 600;
  line-height: 0.95;
  margin: 0.15rem 0 0.4rem;
  letter-spacing: -0.025em;
  color: var(--paper);
}

.highlight-gold {
  font-style: italic;
  color: var(--gold-2);
  text-shadow: 0 0 35px rgba(201, 164, 106, 0.3);
}

.hero-statement {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 2.7vw, 2.1rem);
  font-weight: 500;
  line-height: 1.28;
  color: color-mix(in srgb, var(--paper) 95%, var(--gold-2));
  max-width: 48rem;
  margin: 0.2rem 0 0;
}

/* Personal Bio */
.hero-bio {
  font-family: var(--sans);
  font-size: 1.05rem;
  line-height: 1.7;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
  font-weight: 300;
  max-width: 50rem;
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

/* Actions Deck */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.whatsapp-hero-btn {
  background: #25d366;
  color: #08090c;
  border-color: #25d366;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.2s ease;
}

.whatsapp-hero-btn:hover {
  background: #20ba5a;
  border-color: #20ba5a;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35);
  color: #08090c;
}

.btn-arrow {
  font-size: 0.95rem;
  line-height: 1;
}

.spin-canvas-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
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

@media (max-width: 768px) {
  .hero-copy {
    padding: 3.2rem 0 2.6rem;
    gap: 1.2rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-actions .btn {
    text-align: center;
    justify-content: center;
  }
}
</style>
