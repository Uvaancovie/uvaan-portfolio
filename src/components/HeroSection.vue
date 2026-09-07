<script setup lang="ts">
import { ref } from 'vue'
import PixiStage from '@/components/PixiStage.vue'
import { profile } from '@/data/profile'

interface Props {
  showCanvas?: boolean
}

withDefaults(defineProps<Props>(), {
  showCanvas: true,
})

const pixiStageRef = ref<InstanceType<typeof PixiStage> | null>(null)
const isSpinning = ref(false)

const triggerSpin = () => {
  if (pixiStageRef.value) {
    pixiStageRef.value.spin()
    isSpinning.value = true
    setTimeout(() => {
      isSpinning.value = false
    }, 1200)
  }
}
</script>

<template>
  <section id="hero-section" class="hero-section">
    <!-- Interactive Background PixiJS Canvas Floor -->
    <div v-if="showCanvas" class="hero-canvas">
      <PixiStage ref="pixiStageRef" />
    </div>

    <!-- Hero Content Overlay -->
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

      <!-- Main Personal Greeting & Headline -->
      <div class="hero-intro-block">
        <p class="hero-greeting">Hi, I'm</p>
        <h1 id="hero-title" class="hero-name serif">
          Uvaan <em class="highlight-gold">Covenden</em>
        </h1>
        <p class="hero-statement serif">
          Building high-stakes iGaming engines, transactional FinTech ledgers, and enterprise .NET systems.
        </p>
      </div>

      <!-- Direct & Personal Bio -->
      <p class="hero-bio">
        By day, I engineer enterprise-grade solutions on the Microsoft .NET stack at South African Funeral Supplies.
        In the studio, I build server-authoritative PixiJS slot cabinets like <strong class="text-gold">Eye of Ra</strong> and <strong class="text-gold">Covies Slots</strong>.
        I focus on clean mathematics, resilient transaction ledgers, and responsive casino UX.
      </p>

      <!-- Personal Context Chips -->
      <div class="hero-chips-row">
        <span class="meta-chip">
          <span class="chip-icon">💼</span>
          <span>{{ profile.role }} @ {{ profile.employer }}</span>
        </span>
        <span class="meta-chip">
          <span class="chip-icon">🎓</span>
          <span>B.AppDev Distinction Graduate</span>
        </span>
        <span class="meta-chip">
          <span class="chip-icon">🎰</span>
          <span>Studio: {{ profile.studio }}</span>
        </span>
      </div>

      <!-- Clean Actions Row -->
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
          :class="{ active: isSpinning }"
          title="Spin the background PixiJS floor"
          @click="triggerSpin"
        >
          <span class="spin-icon" :class="{ rotating: isSpinning }">↻</span>
          <span>Spin Canvas</span>
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
  padding: 4.2rem 0 3.2rem;
  background: linear-gradient(
    to top,
    rgba(8, 9, 12, 0.98) 0%,
    rgba(8, 9, 12, 0.9) 55%,
    rgba(8, 9, 12, 0.35) 100%
  );
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mint);
  background: rgba(141, 255, 201, 0.1);
  border: 1px solid rgba(141, 255, 201, 0.35);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
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
  letter-spacing: 0.16em;
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
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0;
}

.hero-name {
  font-family: var(--serif);
  font-size: clamp(3.2rem, 7vw, 5.8rem);
  font-weight: 600;
  line-height: 0.95;
  margin: 0.15rem 0 0.4rem;
  letter-spacing: -0.02em;
  color: var(--paper);
}

.highlight-gold {
  font-style: italic;
  color: var(--gold-2);
  text-shadow: 0 0 35px rgba(201, 164, 106, 0.3);
}

.hero-statement {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 2.8vw, 2.1rem);
  font-weight: 500;
  line-height: 1.25;
  color: color-mix(in srgb, var(--paper) 95%, var(--gold-2));
  max-width: 46rem;
  margin: 0.2rem 0 0;
}

/* Personal Bio */
.hero-bio {
  font-family: var(--sans);
  font-size: 1.02rem;
  line-height: 1.65;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
  font-weight: 300;
  max-width: 48rem;
  margin: 0;
}

.text-gold {
  color: var(--gold-2);
  font-weight: 500;
}

/* Context Chips */
.hero-chips-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--mono);
  font-size: 0.72rem;
  padding: 0.35rem 0.75rem;
  background: rgba(16, 18, 24, 0.85);
  border: 1px solid var(--line);
  color: var(--paper);
}

.chip-icon {
  font-size: 0.85rem;
}

/* Actions */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
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
}

.btn-arrow {
  font-size: 0.95rem;
  line-height: 1;
}

.spin-canvas-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
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
    padding: 3rem 0 2.2rem;
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
