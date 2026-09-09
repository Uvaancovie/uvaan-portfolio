<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'
import type { GameAssetItem } from '@/data/gameAssets'
import Interactive3DViewer from './Interactive3DViewer.vue'
import { playBigWinSound, playScatterTriggerSound, playWildExpandSound, playTickSound } from '@/utils/audioSynth'

export type PopupType = 'big_win' | 'free_spins' | 'wild_expand' | 'inspect_3d' | null

const props = defineProps<{
  activePopup: PopupType
  selectedAsset?: GameAssetItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Animated Coin Counter for Big Win
const displayedWin = ref(0)
const targetWin = ref(125000) // R1,250.00
let counterInterval: number | null = null

watch(
  () => props.activePopup,
  (newPopup) => {
    if (newPopup === 'big_win') {
      displayedWin.value = 0
      targetWin.value = Math.floor(Math.random() * 150000) + 75000
      playBigWinSound()
      startCoinTally()
    } else if (newPopup === 'free_spins') {
      playScatterTriggerSound()
    } else if (newPopup === 'wild_expand') {
      playWildExpandSound()
    }
  }
)

function startCoinTally() {
  if (counterInterval !== null) clearInterval(counterInterval)
  const steps = 40
  const increment = targetWin.value / steps
  let count = 0

  counterInterval = window.setInterval(() => {
    count++
    displayedWin.value = Math.min(targetWin.value, Math.floor(count * increment))
    if (count % 4 === 0) {
      playTickSound(1.8)
    }
    if (count >= steps) {
      if (counterInterval !== null) clearInterval(counterInterval)
    }
  }, 35)
}

onUnmounted(() => {
  if (counterInterval !== null) clearInterval(counterInterval)
})

function formatZar(cents: number): string {
  const rands = (cents / 100).toFixed(2)
  return `R ${Number(rands).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="activePopup"
      class="game-popup-backdrop"
      @click.self="emit('close')"
    >
      <!-- 1. BIG WIN CELEBRATION POPUP -->
      <div v-if="activePopup === 'big_win'" class="popup-box big-win-box">
        <div class="glow-burst-fx"></div>
        <div class="particles-rain">
          <span v-for="n in 16" :key="n" class="coin-particle">🪙</span>
        </div>

        <div class="win-ribbon">
          <span class="ribbon-text">★ MEGA JACKPOT WIN ★</span>
        </div>

        <div class="win-character-preview" v-if="selectedAsset">
          <img
            v-if="selectedAsset.artworkUrl"
            :src="selectedAsset.artworkUrl"
            :alt="selectedAsset.name"
            class="win-thumb"
          />
          <span v-else class="win-emoji">{{ selectedAsset.iconEmoji }}</span>
        </div>

        <div class="win-tally-block">
          <div class="tally-label">TOTAL PAYOUT AWARDED</div>
          <div class="tally-amount">{{ formatZar(displayedWin) }}</div>
          <div class="tally-sub">20 Lines Evaluated · Server Validated</div>
        </div>

        <div class="popup-actions">
          <button type="button" class="btn collect-btn" @click="emit('close')">
            <span>COLLECT TO WALLET</span>
            <span>✓</span>
          </button>
        </div>
      </div>

      <!-- 2. FREE SPINS TRIGGER POPUP -->
      <div v-else-if="activePopup === 'free_spins'" class="popup-box free-spins-box">
        <div class="bonus-ring-aura"></div>
        <div class="bonus-scatter-badge">
          <img
            v-if="selectedAsset?.artworkUrl"
            :src="selectedAsset.artworkUrl"
            :alt="selectedAsset.name"
            class="scatter-thumb-icon"
          />
          <span v-else class="scatter-pulse-icon">{{ selectedAsset?.iconEmoji || '🦌' }}</span>
        </div>

        <h3 class="bonus-heading">
          {{ selectedAsset?.gameOrigin === 'eye-of-ra' ? 'EYE OF RA TOMB BONUS UNLOCKED!' : 'KALAHARI FREE SPINS UNLOCKED!' }}
        </h3>
        <p class="bonus-subtitle">
          {{ selectedAsset?.gameOrigin === 'eye-of-ra' ? '3x Divine Scatters Landed on Reels 1, 3, and 5' : '3x Sovereign Golden Scatters Landed on Reels 1, 3, and 5' }}
        </p>

        <div class="spins-award-counter">
          <div class="spins-num">15</div>
          <div class="spins-text">FREE SPINS AWARDED</div>
        </div>

        <div class="bonus-perks">
          <div class="perk-chip">⚡ 3x Multiplier Active</div>
          <div class="perk-chip">
            {{ selectedAsset?.gameOrigin === 'eye-of-ra' ? '🐺 Anubis Crypt Respins' : '🐆 Sticky Respins On' }}
          </div>
          <div class="perk-chip">
            {{ selectedAsset?.gameOrigin === 'eye-of-ra' ? '☀️ Solar Flare Multipliers' : '👑 Expanding Wilds Allowed' }}
          </div>
        </div>

        <div class="popup-actions">
          <button type="button" class="btn bonus-start-btn" @click="emit('close')">
            <span>START BONUS ROUND</span>
            <span>▶</span>
          </button>
        </div>
      </div>

      <!-- 3. EXPANDING WILD POPUP -->
      <div v-else-if="activePopup === 'wild_expand'" class="popup-box wild-expand-box">
        <div class="lightning-flash-fx"></div>
        <div class="wild-crest">
          <img
            v-if="selectedAsset?.artworkUrl"
            :src="selectedAsset.artworkUrl"
            :alt="selectedAsset.name"
            class="scatter-thumb-icon"
          />
          <span v-else class="wild-icon">{{ selectedAsset?.iconEmoji || '👑' }}</span>
          <span class="wild-beam-bar"></span>
        </div>

        <h3 class="wild-heading">
          {{ selectedAsset?.gameOrigin === 'eye-of-ra' ? (selectedAsset?.name.toUpperCase() + ' EXPANDING WILD!') : 'ZULU KING EXPANDING WILD!' }}
        </h3>
        <p class="wild-sub">
          {{ selectedAsset?.gameOrigin === 'eye-of-ra' ? 'Solar Ray Surge across Reel 3 · 3 Rows Substituted' : 'Vertical Assegai Strike across Reel 3 · 3 Rows Substituted' }}
        </p>

        <div class="wild-multiplier-badge">
          <span>5X WILD MULTIPLIER APPLIED TO ALL 20 WINLINES</span>
        </div>

        <div class="popup-actions">
          <button type="button" class="btn wild-confirm-btn" @click="emit('close')">
            <span>RESUME SPIN SEQUENCE</span>
            <span>▶</span>
          </button>
        </div>
      </div>

      <!-- 4. FULL 3D INSPECT MODAL -->
      <div v-else-if="activePopup === 'inspect_3d' && selectedAsset" class="popup-box inspect-3d-box">
        <div class="inspect-header">
          <div class="inspect-title-group">
            <span class="inspect-kicker">3D Geometric Studio Stage</span>
            <h3 class="inspect-title">{{ selectedAsset.name }}</h3>
          </div>
          <button type="button" class="inspect-close" @click="emit('close')">✕</button>
        </div>

        <div class="inspect-viewer-wrap">
          <Interactive3DViewer
            :asset="selectedAsset"
            height="460px"
            :interactive="true"
            :show-controls="true"
          />
        </div>

        <div class="inspect-footer">
          <div class="inspect-meta">
            <span>Role: {{ selectedAsset.role }}</span>
            <span>•</span>
            <span>Max Mult: {{ selectedAsset.attributes.maxMultiplier }}</span>
            <span>•</span>
            <span>Volatility: {{ selectedAsset.attributes.volatility }}</span>
          </div>
          <button type="button" class="btn inspect-done-btn" @click="emit('close')">
            Done
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.game-popup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: popup-fade-in 0.25s ease-out;
}

@keyframes popup-fade-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.popup-box {
  position: relative;
  background:
    radial-gradient(circle at center, rgba(22, 50, 38, 0.6) 0%, rgba(16, 18, 24, 0.98) 75%),
    var(--ink);
  border: 2px solid var(--gold);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(201, 164, 106, 0.35);
  width: 100%;
  max-width: 540px;
  padding: 2.2rem;
  text-align: center;
  overflow: hidden;
}

/* BIG WIN POPUP STYLING */
.big-win-box {
  border-color: #ffd700;
  background:
    radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, rgba(13, 28, 22, 0.9) 60%, rgba(8, 9, 12, 0.98) 95%),
    var(--ink);
}

.glow-burst-fx {
  position: absolute;
  inset: -50px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 60%);
  animation: pulse-glow 2s infinite alternate;
  pointer-events: none;
}

.particles-rain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.coin-particle {
  position: absolute;
  top: -20px;
  font-size: 1.4rem;
  animation: fall-coins 2.5s infinite linear;
}

.coin-particle:nth-child(1) { left: 10%; animation-delay: 0.1s; }
.coin-particle:nth-child(2) { left: 25%; animation-delay: 0.6s; }
.coin-particle:nth-child(3) { left: 40%; animation-delay: 0.3s; }
.coin-particle:nth-child(4) { left: 55%; animation-delay: 0.8s; }
.coin-particle:nth-child(5) { left: 70%; animation-delay: 0.2s; }
.coin-particle:nth-child(6) { left: 85%; animation-delay: 0.5s; }
.coin-particle:nth-child(7) { left: 18%; animation-delay: 1.1s; }
.coin-particle:nth-child(8) { left: 32%; animation-delay: 1.4s; }
.coin-particle:nth-child(9) { left: 62%; animation-delay: 1.2s; }
.coin-particle:nth-child(10) { left: 78%; animation-delay: 1.7s; }

@keyframes fall-coins {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
}

.win-ribbon {
  display: inline-block;
  background: linear-gradient(90deg, #ffd700, #ff9f1a, #ffd700);
  color: #08090c;
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 0.4rem 1.8rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  margin-bottom: 1.2rem;
  transform: rotate(-1deg);
}

.win-character-preview {
  margin: 0.8rem auto 1rem;
  width: 90px;
  height: 90px;
  background: rgba(8, 9, 12, 0.8);
  border: 2px solid var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
}

.win-thumb {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.win-emoji {
  font-size: 3rem;
}

.win-tally-block {
  margin-bottom: 1.5rem;
}

.tally-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--gold-2);
}

.tally-amount {
  font-family: var(--serif);
  font-size: 2.8rem;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  margin: 0.2rem 0;
}

.tally-sub {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--mute);
}

.collect-btn {
  background: linear-gradient(135deg, #ffd700 0%, #ff9f1a 100%);
  color: #08090c;
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8rem 2.2rem;
  width: 100%;
  box-shadow: 0 6px 25px rgba(255, 215, 0, 0.4);
  cursor: pointer;
}

/* FREE SPINS BOX */
.free-spins-box {
  border-color: var(--mint);
}

.bonus-scatter-badge {
  font-size: 3.5rem;
  margin-bottom: 0.6rem;
  filter: drop-shadow(0 0 20px var(--mint));
  display: flex;
  justify-content: center;
  align-items: center;
}

.scatter-thumb-icon {
  width: 90px;
  height: 90px;
  object-fit: contain;
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.6));
}

.bonus-heading {
  font-family: var(--serif);
  font-size: 1.8rem;
  color: var(--mint);
  margin: 0 0 0.3rem;
}

.bonus-subtitle {
  font-family: var(--sans);
  font-size: 0.92rem;
  color: var(--paper);
  margin: 0 0 1.2rem;
}

.spins-award-counter {
  background: rgba(8, 9, 12, 0.7);
  border: 1px solid var(--mint);
  padding: 1rem;
  margin-bottom: 1.2rem;
}

.spins-num {
  font-family: var(--serif);
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--mint);
  line-height: 1;
}

.spins-text {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--paper);
}

.bonus-perks {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.perk-chip {
  font-family: var(--mono);
  font-size: 0.64rem;
  background: rgba(141, 255, 201, 0.12);
  border: 1px solid var(--mint);
  color: var(--mint);
  padding: 0.25rem 0.6rem;
}

.bonus-start-btn {
  background: var(--mint);
  color: var(--ink);
  font-weight: 700;
  width: 100%;
  padding: 0.8rem 2rem;
}

/* WILD EXPAND BOX */
.wild-expand-box {
  border-color: #e23d4a;
}

.wild-crest {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
}

.wild-heading {
  font-family: var(--serif);
  font-size: 1.7rem;
  color: #ff6b81;
  margin: 0 0 0.3rem;
}

.wild-sub {
  font-family: var(--sans);
  font-size: 0.9rem;
  color: var(--paper);
  margin: 0 0 1.2rem;
}

.wild-multiplier-badge {
  background: rgba(226, 61, 74, 0.15);
  border: 1px solid #e23d4a;
  color: #ff7582;
  font-family: var(--mono);
  font-size: 0.72rem;
  padding: 0.6rem;
  margin-bottom: 1.4rem;
}

.wild-confirm-btn {
  background: #e23d4a;
  color: var(--paper);
  font-weight: 700;
  width: 100%;
  padding: 0.8rem 2rem;
}

/* 3D INSPECT MODAL */
.inspect-3d-box {
  max-width: 680px;
  padding: 0;
  text-align: left;
}

.inspect-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--line);
  background: rgba(8, 9, 12, 0.9);
}

.inspect-kicker {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-2);
}

.inspect-title {
  font-family: var(--serif);
  font-size: 1.4rem;
  margin: 0.1rem 0 0;
  color: var(--paper);
}

.inspect-close {
  background: transparent;
  border: 1px solid var(--hair);
  color: var(--mute);
  font-size: 1.1rem;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.inspect-close:hover {
  color: var(--paper);
  border-color: var(--gold);
}

.inspect-viewer-wrap {
  padding: 0;
  background: #08090c;
}

.inspect-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.6rem;
  border-top: 1px solid var(--line);
  background: rgba(8, 9, 12, 0.9);
  flex-wrap: wrap;
  gap: 0.8rem;
}

.inspect-meta {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--mute);
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.inspect-done-btn {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  font-size: 0.8rem;
}
</style>
