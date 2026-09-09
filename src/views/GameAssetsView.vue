<script setup lang="ts">
import { ref, computed } from 'vue'
import { GAME_ASSETS, type GameAssetItem, type AssetPalette } from '@/data/gameAssets'
import Interactive3DViewer from '@/components/Interactive3DViewer.vue'
import RealGamePopups, { type PopupType } from '@/components/RealGamePopups.vue'
import {
  playTickSound,
  playColorSwapSound,
  playScatterTriggerSound,
  playWildExpandSound,
} from '@/utils/audioSynth'

type CategoryFilter = 'all' | 'character' | 'wild_scatter' | 'high_pay' | 'cabinet' | 'token'
type ThemeFilter = 'all' | 'eye-of-ra' | 'springbok-rush'

const selectedCategory = ref<CategoryFilter>('all')
const selectedTheme = ref<ThemeFilter>('all')
const selectedAssetId = ref<string>('ra-sun-god')
const activePalette = ref<AssetPalette | null>(null)
const activePopup = ref<PopupType>(null)
const modalAsset = ref<GameAssetItem | null>(null)

// Counts for quick pills
const eyeOfRaCount = computed(() => GAME_ASSETS.filter((item) => item.gameOrigin === 'eye-of-ra').length)
const springbokCount = computed(() => GAME_ASSETS.filter((item) => item.gameOrigin === 'springbok-rush').length)

// Filtered assets list
const filteredAssets = computed(() => {
  return GAME_ASSETS.filter((item) => {
    const matchCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value
    const matchTheme = selectedTheme.value === 'all' || item.gameOrigin === selectedTheme.value
    return matchCategory && matchTheme
  })
})

// Current selected main asset
const currentAsset = computed(() => {
  const found = GAME_ASSETS.find((item) => item.id === selectedAssetId.value)
  return found || filteredAssets.value[0] || GAME_ASSETS[0]
})

function selectAsset(asset: GameAssetItem) {
  selectedAssetId.value = asset.id
  activePalette.value = asset.palettes[0]
  playTickSound(1.2)
}

function handlePaletteChange(palette: AssetPalette) {
  activePalette.value = palette
}

function openInspectModal(asset: GameAssetItem) {
  modalAsset.value = asset
  activePopup.value = 'inspect_3d'
  playTickSound(1.4)
}

function triggerBigWin() {
  activePopup.value = 'big_win'
}

function triggerFreeSpins() {
  activePopup.value = 'free_spins'
}

function triggerWildExpand() {
  activePopup.value = 'wild_expand'
}

function playAssetAudio() {
  if (currentAsset.value.particleType === 'lightning') {
    playWildExpandSound()
  } else if (currentAsset.value.particleType === 'gold_coins' || currentAsset.value.particleType === 'fire') {
    playScatterTriggerSound()
  } else {
    playColorSwapSound()
  }
}
</script>

<template>
  <div class="game-assets-page">
    <div class="wrap">
      <!-- Page Header -->
      <header class="assets-hero">
        <div class="hero-kicker-row">
          <div class="kicker-group">
            <span class="kicker">Studio Roster · Eye of Ra & Springbok Rush</span>
          </div>
          <div class="hero-stat-pills">
            <a
              href="https://eye-of-ra-zeta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              class="stat-pill live-game-pill"
            >
              <span>☀️ Play Eye of Ra (Live)</span>
              <span>↗</span>
            </a>
            <a
              href="https://white-label-slot.igamingdev.workers.dev/?operatorId=lulabet-demo&gameId=springbok-rush"
              target="_blank"
              rel="noopener noreferrer"
              class="stat-pill live-game-pill"
            >
              <span>🦌 Play Springbok Rush (Live)</span>
              <span>↗</span>
            </a>
            <span class="stat-pill">{{ GAME_ASSETS.length }} Game Assets</span>
            <span class="stat-pill">3D Multi-Layer Extrusion</span>
          </div>
        </div>

        <h1 class="serif assets-title">
          Cabinet Symbols & <em class="text-gold">3D Game Characters</em>
        </h1>
        <p class="assets-subtitle">
          Interactive 3D inspection studio for production characters, divine scatters, expanding wilds, high-pay sovereigns, and physical slot enclosures across <strong>Eye of Ra</strong> and <strong>Springbok Rush</strong>. Turn in 360° 3D, swap custom colorway skins in real time, inspect exact math models, and simulate in-game jackpots.
        </p>

        <!-- Theme Filters Row -->
        <div class="theme-switch-row">
          <span class="filter-group-label">Slot Theme:</span>
          <div class="theme-pill-buttons">
            <button
              type="button"
              class="theme-pill"
              :class="{ active: selectedTheme === 'all' }"
              @click="selectedTheme = 'all'; playTickSound(1.1)"
            >
              All Slots ({{ GAME_ASSETS.length }})
            </button>
            <button
              type="button"
              class="theme-pill gold-theme"
              :class="{ active: selectedTheme === 'eye-of-ra' }"
              @click="selectedTheme = 'eye-of-ra'; playTickSound(1.1)"
            >
              ☀️ Eye of Ra — Egyptian Gods ({{ eyeOfRaCount }})
            </button>
            <button
              type="button"
              class="theme-pill green-theme"
              :class="{ active: selectedTheme === 'springbok-rush' }"
              @click="selectedTheme = 'springbok-rush'; playTickSound(1.1)"
            >
              🦌 Springbok Rush — SA Highveld ({{ springbokCount }})
            </button>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="category-tabs-bar">
          <button
            type="button"
            class="cat-tab"
            :class="{ active: selectedCategory === 'all' }"
            @click="selectedCategory = 'all'; playTickSound(1.1)"
          >
            All Roles ({{ filteredAssets.length }})
          </button>
          <button
            type="button"
            class="cat-tab"
            :class="{ active: selectedCategory === 'character' }"
            @click="selectedCategory = 'character'; playTickSound(1.1)"
          >
            👑 Characters & Avatars
          </button>
          <button
            type="button"
            class="cat-tab"
            :class="{ active: selectedCategory === 'wild_scatter' }"
            @click="selectedCategory = 'wild_scatter'; playTickSound(1.1)"
          >
            ⚡ Wilds & Scatters
          </button>
          <button
            type="button"
            class="cat-tab"
            :class="{ active: selectedCategory === 'high_pay' }"
            @click="selectedCategory = 'high_pay'; playTickSound(1.1)"
          >
            💎 High Pay Sovereigns & Flora
          </button>
          <button
            type="button"
            class="cat-tab"
            :class="{ active: selectedCategory === 'cabinet' || selectedCategory === 'token' }"
            @click="selectedCategory = 'cabinet'; playTickSound(1.1)"
          >
            🎰 Cabinets & Coins
          </button>
        </div>
      </header>

      <!-- Main 3D Studio Inspection Deck -->
      <section class="main-studio-deck">
        <div class="deck-grid">
          <!-- 3D Turntable Stage Container -->
          <div class="deck-stage-column">
            <div class="stage-frame-header">
              <div class="stage-status-dot"></div>
              <span class="stage-label">Interactive 3D Turntable — Drag to Rotate 360°</span>
              <button
                type="button"
                class="fullscreen-inspect-btn"
                title="Open Fullscreen 3D Stage"
                @click="openInspectModal(currentAsset)"
              >
                <span>Fullscreen 3D</span>
                <span>⛶</span>
              </button>
            </div>

            <!-- The Live 3D Turntable Viewer -->
            <Interactive3DViewer
              :key="currentAsset.id"
              :asset="currentAsset"
              height="480px"
              :interactive="true"
              :show-controls="true"
              @palette-change="handlePaletteChange"
            />

            <!-- Game Feature Simulation Bar -->
            <div class="simulation-actions-bar">
              <span class="sim-label">Simulate Real Game Popups:</span>
              <div class="sim-buttons">
                <button
                  type="button"
                  class="btn sim-btn big-win-sim"
                  @click="triggerBigWin"
                >
                  <span>💰 Big Win Popup</span>
                </button>
                <button
                  type="button"
                  class="btn sim-btn scatter-sim"
                  @click="triggerFreeSpins"
                >
                  <span>⚡ Bonus Free Spins</span>
                </button>
                <button
                  type="button"
                  class="btn sim-btn wild-sim"
                  @click="triggerWildExpand"
                >
                  <span>👑 Expanding Wild</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Character Attributes & Intelligence Card -->
          <div class="deck-intel-column">
            <div class="intel-card">
              <!-- Top Header & Rarity -->
              <div class="intel-header">
                <div class="intel-title-group">
                  <div class="intel-badges-row">
                    <span
                      class="rarity-badge"
                      :class="currentAsset.rarity.toLowerCase()"
                    >
                      {{ currentAsset.rarity }}
                    </span>
                    <span class="role-badge">{{ currentAsset.role }}</span>
                    <span v-if="currentAsset.gameName" class="game-origin-badge">
                      {{ currentAsset.gameName }}
                    </span>
                  </div>
                  <h2 class="serif intel-name">{{ currentAsset.name }}</h2>
                  <p class="intel-subtitle">{{ currentAsset.subtitle }}</p>
                </div>

                <!-- Live Game Quick Link if available -->
                <div v-if="currentAsset.gameUrl" class="intel-live-game-link">
                  <a
                    :href="currentAsset.gameUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn intel-play-btn"
                  >
                    <span>Play in {{ currentAsset.gameName }}</span>
                    <span>▶</span>
                  </a>
                </div>
              </div>

              <!-- Lore & Game Design Notes -->
              <div class="intel-lore-box">
                <p class="intel-lore-text">{{ currentAsset.lore }}</p>
                <blockquote class="intel-quote">{{ currentAsset.quote }}</blockquote>
              </div>

              <!-- Real-Time Colorways / Skin Switcher -->
              <div class="intel-section skin-customizer-section">
                <div class="section-title-row">
                  <span class="section-title">Dynamic Colorway Skin:</span>
                  <span class="active-skin-tag">{{ activePalette?.name || currentAsset.palettes[0].name }}</span>
                </div>
                <div class="skin-picker-grid">
                  <button
                    v-for="palette in currentAsset.palettes"
                    :key="palette.id"
                    type="button"
                    class="skin-card"
                    :class="{ active: (activePalette?.id || currentAsset.defaultPaletteId) === palette.id }"
                    @click="handlePaletteChange(palette); playColorSwapSound()"
                  >
                    <div
                      class="skin-swatch-bar"
                      :style="{ background: `linear-gradient(90deg, ${palette.primaryColor}, ${palette.secondaryColor})` }"
                    ></div>
                    <span class="skin-title">{{ palette.badgeLabel }}</span>
                  </button>
                </div>
              </div>

              <!-- Mathematics & Volatility Attribute Matrix -->
              <div class="intel-section">
                <span class="section-title">Engine Math & Volatility Profile</span>
                <div class="attributes-grid">
                  <div class="attr-item">
                    <span class="attr-label">Volatility</span>
                    <span class="attr-val highlight-gold">{{ currentAsset.attributes.volatility }}</span>
                  </div>
                  <div class="attr-item">
                    <span class="attr-label">Max Multiplier</span>
                    <span class="attr-val highlight-mint">{{ currentAsset.attributes.maxMultiplier }}</span>
                  </div>
                  <div class="attr-item">
                    <span class="attr-label">Hit Frequency</span>
                    <span class="attr-val">{{ currentAsset.attributes.hitFrequency }}</span>
                  </div>
                  <div class="attr-item">
                    <span class="attr-label">RTP Weight</span>
                    <span class="attr-val">{{ currentAsset.attributes.rtpContribution }}</span>
                  </div>
                  <div class="attr-item">
                    <span class="attr-label">Reel Stacking</span>
                    <span class="attr-val">{{ currentAsset.attributes.reelStacking }}</span>
                  </div>
                  <div class="attr-item">
                    <span class="attr-label">Anim Frames</span>
                    <span class="attr-val">{{ currentAsset.attributes.animationFrames }} FPS</span>
                  </div>
                </div>
              </div>

              <!-- Paytable Line Payouts -->
              <div class="intel-section">
                <span class="section-title">Payline Evaluator (20 Lines)</span>
                <div class="payout-row-grid">
                  <div class="payout-box">
                    <span class="payout-match">3 of a Kind</span>
                    <span class="payout-num">{{ currentAsset.attributes.paylinePayouts.match3 }}</span>
                  </div>
                  <div class="payout-box">
                    <span class="payout-match">4 of a Kind</span>
                    <span class="payout-num">{{ currentAsset.attributes.paylinePayouts.match4 }}</span>
                  </div>
                  <div class="payout-box highlight-match5">
                    <span class="payout-match">5 of a Kind (Full Line)</span>
                    <span class="payout-num">{{ currentAsset.attributes.paylinePayouts.match5 }}</span>
                  </div>
                </div>
              </div>

              <!-- Audio Engine Profile -->
              <div class="intel-section audio-profile-section">
                <div class="audio-header">
                  <span class="section-title">Synthesized Audio Engine Profile</span>
                  <button
                    type="button"
                    class="btn audio-test-btn"
                    @click="playAssetAudio"
                  >
                    <span>🔊 Test Sound Cue</span>
                  </button>
                </div>
                <p class="audio-desc">{{ currentAsset.attributes.audioVoice }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Scrollable Asset Selector Carousel / Grid -->
      <section class="asset-selector-deck">
        <div class="selector-header">
          <div>
            <span class="kicker">Browse Production Roster</span>
            <h3 class="serif selector-title">Select Any Character or Symbol to Turn & Inspect</h3>
          </div>
          <div class="selector-meta">
            <span class="selector-count">{{ filteredAssets.length }} Assets Visible</span>
          </div>
        </div>

        <div class="assets-scroller-grid">
          <div
            v-for="asset in filteredAssets"
            :key="asset.id"
            class="asset-card"
            :class="{ active: asset.id === currentAsset.id }"
            @click="selectAsset(asset)"
          >
            <div class="card-thumb-frame">
              <img
                v-if="asset.artworkUrl"
                :src="asset.artworkUrl"
                :alt="asset.name"
                class="card-img"
              />
              <span v-else class="card-emoji">{{ asset.iconEmoji }}</span>
              <button
                type="button"
                class="card-3d-btn"
                title="Inspect in 3D Modal"
                @click.stop="openInspectModal(asset)"
              >
                3D ⛶
              </button>
              <span v-if="asset.gameOrigin" class="card-game-pill" :class="asset.gameOrigin">
                {{ asset.gameOrigin === 'eye-of-ra' ? '☀️ Eye of Ra' : '🦌 Springbok' }}
              </span>
            </div>
            <div class="card-info">
              <div class="card-top-row">
                <span class="card-rarity">{{ asset.rarity }}</span>
                <span class="card-mult">{{ asset.attributes.maxMultiplier }}</span>
              </div>
              <h4 class="card-name">{{ asset.name }}</h4>
              <p class="card-role">{{ asset.role }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Shop & Live Play Cross-Link Banner -->
      <section class="shop-link-banner">
        <div class="banner-left">
          <span class="kicker">Live Deployments & Commercial Licensing</span>
          <h3 class="serif banner-title">Play the Live Games or License the Source Engine</h3>
          <p class="banner-desc">
            Experience these production assets running in live playable clients. Source code, 3D WebGL assets, math models, and white-label packages available for B2B operators.
          </p>
        </div>
        <div class="banner-right">
          <a
            href="https://eye-of-ra-zeta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn banner-demo-btn eye-of-ra-live"
          >
            <span>Play Eye of Ra (Live)</span>
            <span>☀️ ▶</span>
          </a>
          <a
            href="https://white-label-slot.igamingdev.workers.dev/?operatorId=lulabet-demo&gameId=springbok-rush"
            target="_blank"
            rel="noopener noreferrer"
            class="btn banner-demo-btn springbok-live"
          >
            <span>Play Springbok Rush (Live)</span>
            <span>🦌 ▶</span>
          </a>
          <router-link to="/shop" class="btn banner-shop-btn">
            <span>View Source Licenses ($149 – $999)</span>
            <span>↗</span>
          </router-link>
        </div>
      </section>
    </div>

    <!-- Real Game Popups & 3D Inspect Modal Controller -->
    <RealGamePopups
      :active-popup="activePopup"
      :selected-asset="modalAsset || currentAsset"
      @close="activePopup = null; modalAsset = null"
    />
  </div>
</template>

<style scoped>
.game-assets-page {
  padding: clamp(2rem, 5vw, 4rem) 0 6rem;
  color: var(--paper);
}

.assets-hero {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-kicker-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.hero-stat-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.stat-pill {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: var(--gold-2);
  background: rgba(201, 164, 106, 0.12);
  border: 1px solid rgba(201, 164, 106, 0.25);
  padding: 0.25rem 0.65rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.live-game-pill {
  background: rgba(201, 164, 106, 0.18);
  border-color: var(--gold);
  color: #fff;
  font-weight: 600;
}

.live-game-pill:hover {
  background: var(--gold);
  color: var(--ink);
  transform: translateY(-1px);
}

.assets-title {
  font-size: clamp(2.4rem, 5.5vw, 4.4rem);
  font-weight: 600;
  line-height: 1.05;
  margin: 0;
  letter-spacing: -0.02em;
}

.text-gold {
  color: var(--gold-2);
  font-style: italic;
}

.assets-subtitle {
  font-family: var(--sans);
  font-size: 1.08rem;
  line-height: 1.65;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
  font-weight: 300;
  max-width: 52rem;
  margin: 0;
}

/* Theme Switcher */
.theme-switch-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(16, 18, 24, 0.85);
  border: 1px solid var(--line);
}

.filter-group-label {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mute);
}

.theme-pill-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.theme-pill {
  background: rgba(8, 9, 12, 0.8);
  border: 1px solid var(--hair);
  color: var(--mute);
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  padding: 0.4rem 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-pill:hover {
  border-color: var(--gold);
  color: var(--paper);
}

.theme-pill.active {
  background: rgba(201, 164, 106, 0.2);
  border-color: var(--gold);
  color: var(--gold-2);
  font-weight: 700;
}

.theme-pill.gold-theme.active {
  background: rgba(255, 215, 0, 0.2);
  border-color: #ffd700;
  color: #ffd700;
}

.theme-pill.green-theme.active {
  background: rgba(141, 255, 201, 0.2);
  border-color: #8dffc9;
  color: #8dffc9;
}

/* Category Tabs */
.category-tabs-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--line);
}

.cat-tab {
  background: rgba(16, 18, 24, 0.7);
  border: 1px solid var(--hair);
  color: var(--mute);
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.45rem 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-tab:hover {
  border-color: var(--gold);
  color: var(--paper);
}

.cat-tab.active {
  background: var(--gold);
  color: var(--ink);
  font-weight: 700;
  border-color: var(--gold);
}

/* Main Studio Deck Grid */
.main-studio-deck {
  margin-bottom: 4rem;
}

.deck-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 2rem;
  align-items: start;
}

.deck-stage-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stage-frame-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  background: rgba(8, 9, 12, 0.9);
  border: 1px solid var(--line);
}

.stage-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px var(--mint);
  animation: pulse-glow 1.5s infinite alternate;
}

.stage-label {
  font-family: var(--mono);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  color: var(--paper);
  flex: 1;
}

.fullscreen-inspect-btn {
  background: transparent;
  border: 1px solid var(--hair);
  color: var(--gold-2);
  font-family: var(--mono);
  font-size: 0.64rem;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.fullscreen-inspect-btn:hover {
  border-color: var(--gold);
  background: rgba(201, 164, 106, 0.15);
}

/* Simulation Actions Bar */
.simulation-actions-bar {
  padding: 1.2rem;
  background: rgba(16, 18, 24, 0.85);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.sim-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mute);
}

.sim-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.sim-btn {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 140px;
  white-space: nowrap;
}

.big-win-sim {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(201, 164, 106, 0.1) 100%);
  border: 1px solid #ffd700;
  color: #ffd700;
}

.big-win-sim:hover {
  background: #ffd700;
  color: var(--ink);
  font-weight: 700;
}

.scatter-sim {
  background: rgba(141, 255, 201, 0.12);
  border: 1px solid var(--mint);
  color: var(--mint);
}

.scatter-sim:hover {
  background: var(--mint);
  color: var(--ink);
  font-weight: 700;
}

.wild-sim {
  background: rgba(226, 61, 74, 0.15);
  border: 1px solid #e23d4a;
  color: #ff7582;
}

.wild-sim:hover {
  background: #e23d4a;
  color: var(--paper);
  font-weight: 700;
}

/* Character Intelligence Card */
.deck-intel-column {
  display: flex;
  flex-direction: column;
}

.intel-card {
  background: rgba(16, 18, 24, 0.9);
  border: 1px solid var(--line);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.intel-header {
  border-bottom: 1px solid var(--line);
  padding-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.intel-title-group {
  flex: 1;
  min-width: 240px;
}

.intel-live-game-link {
  display: flex;
  align-items: center;
}

.intel-play-btn {
  background: rgba(201, 164, 106, 0.15);
  border: 1px solid var(--gold);
  color: var(--gold-2);
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  padding: 0.4rem 0.85rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.intel-play-btn:hover {
  background: var(--gold);
  color: var(--ink);
  font-weight: 700;
  transform: translateY(-1px);
}

.intel-badges-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.game-origin-badge {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 0.15rem 0.55rem;
  font-weight: 600;
}

.card-game-pill {
  position: absolute;
  bottom: 6px;
  left: 6px;
  font-family: var(--mono);
  font-size: 0.55rem;
  padding: 0.1rem 0.4rem;
  background: rgba(8, 9, 12, 0.85);
  border: 1px solid var(--hair);
  color: var(--mute);
}

.card-game-pill.eye-of-ra {
  border-color: rgba(255, 215, 0, 0.4);
  color: #ffd700;
  background: rgba(16, 18, 24, 0.9);
}

.card-game-pill.springbok-rush {
  border-color: rgba(141, 255, 201, 0.4);
  color: #8dffc9;
  background: rgba(16, 18, 24, 0.9);
}

.eye-of-ra-live {
  border-color: #ffd700;
  color: #ffd700;
}

.eye-of-ra-live:hover {
  background: rgba(255, 215, 0, 0.2);
}

.springbok-live {
  border-color: var(--mint);
  color: var(--mint);
}

.springbok-live:hover {
  background: rgba(141, 255, 201, 0.2);
}

.rarity-badge {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
}

.rarity-badge.legendary {
  background: #ffd700;
  color: #08090c;
}

.rarity-badge.epic {
  background: #d980fa;
  color: #08090c;
}

.rarity-badge.rare {
  background: #00e5ff;
  color: #08090c;
}

.role-badge {
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--paper);
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.55rem;
}

.intel-name {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: var(--paper);
  letter-spacing: -0.01em;
}

.intel-subtitle {
  font-family: var(--mono);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  color: var(--gold-2);
  margin: 0.2rem 0 0;
}

.intel-lore-box {
  background: rgba(8, 9, 12, 0.6);
  border: 1px solid var(--hair);
  padding: 1rem 1.2rem;
}

.intel-lore-text {
  font-family: var(--sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: color-mix(in srgb, var(--paper) 88%, var(--mute));
  margin: 0 0 0.8rem;
}

.intel-quote {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-style: italic;
  color: var(--gold-2);
  margin: 0;
  border-left: 2px solid var(--gold);
  padding-left: 0.8rem;
}

/* Sections */
.intel-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.section-title {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active-skin-tag {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--gold-2);
}

/* Skin Picker Grid */
.skin-picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.5rem;
}

.skin-card {
  background: rgba(8, 9, 12, 0.8);
  border: 1px solid var(--hair);
  padding: 0.45rem 0.6rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: all 0.2s ease;
  text-align: left;
}

.skin-card:hover {
  border-color: var(--gold);
}

.skin-card.active {
  border-color: var(--gold);
  background: rgba(201, 164, 106, 0.15);
}

.skin-swatch-bar {
  height: 6px;
  width: 100%;
}

.skin-title {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--paper);
}

/* Attribute Grid */
.attributes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}

.attr-item {
  background: rgba(8, 9, 12, 0.6);
  border: 1px solid var(--hair);
  padding: 0.55rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.attr-label {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mute);
}

.attr-val {
  font-family: var(--mono);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--paper);
}

.highlight-gold {
  color: #ffd700;
}

.highlight-mint {
  color: var(--mint);
}

/* Paytable Rows */
.payout-row-grid {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.payout-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0.8rem;
  background: rgba(8, 9, 12, 0.6);
  border: 1px solid var(--hair);
  font-family: var(--mono);
  font-size: 0.68rem;
}

.payout-match {
  color: var(--mute);
}

.payout-num {
  color: var(--paper);
  font-weight: 600;
}

.highlight-match5 {
  border-color: rgba(255, 215, 0, 0.35);
  background: rgba(201, 164, 106, 0.12);
}

.highlight-match5 .payout-match {
  color: var(--gold-2);
}

.highlight-match5 .payout-num {
  color: #ffd700;
  font-weight: 700;
}

/* Audio Profile Section */
.audio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.audio-test-btn {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold-2);
  font-family: var(--mono);
  font-size: 0.65rem;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
}

.audio-test-btn:hover {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
}

.audio-desc {
  font-family: var(--sans);
  font-size: 0.86rem;
  color: var(--mute);
  margin: 0;
  line-height: 1.45;
}

/* Asset Selector Deck */
.asset-selector-deck {
  margin-bottom: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.8rem;
}

.selector-title {
  font-size: 1.8rem;
  margin: 0.2rem 0 0;
}

.selector-count {
  font-family: var(--mono);
  font-size: 0.68rem;
  color: var(--gold-2);
}

.assets-scroller-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
}

.asset-card {
  background: rgba(16, 18, 24, 0.8);
  border: 1px solid var(--hair);
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: all 0.25s ease;
}

.asset-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}

.asset-card.active {
  border-color: #ffd700;
  background: rgba(22, 50, 38, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(255, 215, 0, 0.2);
}

.card-thumb-frame {
  position: relative;
  width: 100%;
  height: 130px;
  background: radial-gradient(circle at center, rgba(201, 164, 106, 0.2) 0%, rgba(8, 9, 12, 0.95) 75%);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.asset-card:hover .card-img {
  transform: scale(1.1);
}

.card-emoji {
  font-size: 3.8rem;
  transition: transform 0.3s ease;
}

.asset-card:hover .card-emoji {
  transform: scale(1.15) rotate(4deg);
}

.card-3d-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(8, 9, 12, 0.85);
  border: 1px solid var(--line);
  color: var(--gold-2);
  font-family: var(--mono);
  font-size: 0.58rem;
  padding: 0.15rem 0.4rem;
  cursor: pointer;
}

.card-3d-btn:hover {
  background: var(--gold);
  color: var(--ink);
  font-weight: 700;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  font-size: 0.6rem;
}

.card-rarity {
  color: var(--gold-2);
  text-transform: uppercase;
}

.card-mult {
  color: var(--mint);
}

.card-name {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  color: var(--paper);
}

.card-role {
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--mute);
  margin: 0;
}

/* Shop Cross-Link Banner */
.shop-link-banner {
  background:
    linear-gradient(135deg, rgba(22, 50, 38, 0.6) 0%, rgba(16, 18, 24, 0.95) 100%),
    var(--ink-2);
  border: 1px solid rgba(141, 255, 201, 0.35);
  padding: 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.shop-link-banner .banner-left {
  flex: 1;
  min-width: 280px;
}

.shop-link-banner .banner-title {
  font-size: 1.8rem;
  margin: 0.3rem 0;
}

.shop-link-banner .banner-desc {
  font-family: var(--sans);
  font-size: 0.95rem;
  line-height: 1.55;
  color: color-mix(in srgb, var(--paper) 85%, var(--mute));
  margin: 0;
  max-width: 46rem;
}

.shop-link-banner .banner-right {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex-shrink: 0;
}

.banner-shop-btn {
  background: linear-gradient(135deg, #ffd700 0%, #c9a46a 100%);
  color: #08090c;
  font-weight: 700;
  padding: 0.75rem 1.6rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.banner-shop-btn:hover {
  background: #ffdf33;
}

.banner-demo-btn {
  background: transparent;
  color: var(--mint);
  border: 1px solid var(--mint);
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.6rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.banner-demo-btn:hover {
  background: rgba(141, 255, 201, 0.15);
}

/* Responsiveness */
@media (max-width: 980px) {
  .deck-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .assets-hero {
    gap: 0.8rem;
  }
  .attributes-grid {
    grid-template-columns: 1fr;
  }
  .shop-link-banner {
    padding: 1.5rem;
  }
  .banner-shop-btn,
  .banner-demo-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
