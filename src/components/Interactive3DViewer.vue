<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { GameAssetItem, AssetPalette } from '@/data/gameAssets'
import { playTickSound, playColorSwapSound } from '@/utils/audioSynth'

const props = withDefaults(
  defineProps<{
    asset: GameAssetItem
    initialPaletteId?: string
    height?: string
    interactive?: boolean
    showControls?: boolean
    compact?: boolean
  }>(),
  {
    initialPaletteId: '',
    height: '420px',
    interactive: true,
    showControls: true,
    compact: false,
  }
)

const emit = defineEmits<{
  (e: 'palette-change', palette: AssetPalette): void
  (e: 'open-fullscreen'): void
}>()

// 3D Angles and Transform State
const rotX = ref(15) // Pitch
const rotY = ref(-25) // Yaw
const rotZ = ref(0) // Roll
const zoom = ref(1)
const depth = ref(24) // 3D extrusion thickness in px
const autoSpin = ref(true)
const spinSpeed = ref(1)
const isWireframe = ref(false)
const activePaletteId = ref(props.initialPaletteId || props.asset.defaultPaletteId)

// Drag interaction state
const isDragging = ref(false)
const startMouseX = ref(0)
const startMouseY = ref(0)
const startRotX = ref(0)
const startRotY = ref(0)

// Active Palette
const currentPalette = computed(() => {
  const found = props.asset.palettes.find((p) => p.id === activePaletteId.value)
  return found || props.asset.palettes[0]
})

watch(
  () => props.asset,
  (newAsset) => {
    activePaletteId.value = newAsset.defaultPaletteId
    rotX.value = 12
    rotY.value = -20
  }
)

function setPalette(palette: AssetPalette) {
  activePaletteId.value = palette.id
  playColorSwapSound()
  emit('palette-change', palette)
}

function handleMouseDown(e: MouseEvent) {
  if (!props.interactive) return
  isDragging.value = true
  autoSpin.value = false
  startMouseX.value = e.clientX
  startMouseY.value = e.clientY
  startRotX.value = rotX.value
  startRotY.value = rotY.value
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  const deltaX = e.clientX - startMouseX.value
  const deltaY = e.clientY - startMouseY.value

  rotY.value = ((startRotY.value + deltaX * 0.7 + 180) % 360) - 180
  rotX.value = Math.max(-75, Math.min(75, startRotX.value - deltaY * 0.5))

  if (Math.abs(deltaX) % 15 < 2) {
    playTickSound(1.2)
  }
}

function handleMouseUp() {
  isDragging.value = false
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
}

// Touch Handling
function handleTouchStart(e: TouchEvent) {
  if (!props.interactive || e.touches.length === 0) return
  isDragging.value = true
  autoSpin.value = false
  const touch = e.touches[0]
  startMouseX.value = touch.clientX
  startMouseY.value = touch.clientY
  startRotX.value = rotX.value
  startRotY.value = rotY.value
}

function handleTouchMove(e: TouchEvent) {
  if (!isDragging.value || e.touches.length === 0) return
  const touch = e.touches[0]
  const deltaX = touch.clientX - startMouseX.value
  const deltaY = touch.clientY - startMouseY.value

  rotY.value = ((startRotY.value + deltaX * 0.8 + 180) % 360) - 180
  rotX.value = Math.max(-75, Math.min(75, startRotX.value - deltaY * 0.6))
}

function handleTouchEnd() {
  isDragging.value = false
}

function resetView() {
  rotX.value = 15
  rotY.value = -25
  rotZ.value = 0
  zoom.value = 1
  depth.value = 24
  autoSpin.value = true
  isWireframe.value = false
  playTickSound(1.5)
}

// Animation Loop for Auto-spin
let animationFrameId: number | null = null

function animateLoop() {
  if (autoSpin.value && !isDragging.value) {
    rotY.value = (rotY.value + 0.6 * spinSpeed.value) % 360
    if (rotY.value > 180) rotY.value -= 360
    if (rotY.value < -180) rotY.value += 360
  }
  animationFrameId = requestAnimationFrame(animateLoop)
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(animateLoop)
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
})

// Dynamic 3D lighting specular highlights based on angles
const specularHighlightStyle = computed(() => {
  const normX = (rotY.value + 180) / 360
  const normY = (rotX.value + 90) / 180
  return {
    background: `radial-gradient(circle at ${normX * 100}% ${normY * 100}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`,
  }
})

// Depth layers array for real 3D extrusion slicing
const depthSlices = computed(() => {
  const count = 7
  const step = depth.value / count
  return Array.from({ length: count }, (_, i) => -i * step)
})
</script>

<template>
  <div class="viewer-3d-root" :class="{ 'compact-mode': compact }">
    <!-- Main 3D Interactive Stage -->
    <div
      ref="stageRef"
      class="stage-3d"
      :style="{ height: height }"
      @mousedown="handleMouseDown"
      @touchstart.passive="handleTouchStart"
      @touchmove.passive="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- Background Ambient Grid & Radial Aura -->
      <div
        class="ambient-aura"
        :style="{
          background: `radial-gradient(circle at center, ${currentPalette.glowColor} 0%, rgba(8, 9, 12, 0.98) 70%)`,
        }"
      ></div>

      <div class="hologram-grid" :class="{ visible: isWireframe }"></div>

      <!-- 3D Turntable Origin -->
      <div
        class="turntable-pivot"
        :style="{
          transform: `perspective(900px) scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
        }"
      >
        <!-- 3D Shadow Cast Plane -->
        <div
          class="shadow-plane"
          :style="{
            boxShadow: `0 30px 60px ${currentPalette.glowColor}, 0 20px 40px rgba(0, 0, 0, 0.95)`,
          }"
        ></div>

        <!-- 3D Multi-Layer Extruded Model -->
        <div
          class="model-3d-assembly"
          :class="{ 'wireframe-mode': isWireframe }"
          :style="{
            '--theme-primary': currentPalette.primaryColor,
            '--theme-secondary': currentPalette.secondaryColor,
            '--theme-accent': currentPalette.accentColor,
            '--theme-glow': currentPalette.glowColor,
          }"
        >
          <!-- Extruded Depth Slices (Giving physical 3D thickness) -->
          <div
            v-for="(offsetZ, index) in depthSlices"
            :key="index"
            class="extrusion-slice"
            :style="{
              transform: `translateZ(${offsetZ}px)`,
              opacity: index === 0 ? 1 : 0.85 - index * 0.08,
              filter: index === 0 ? 'none' : `brightness(${0.8 - index * 0.08}) saturate(0.9)`,
            }"
          >
            <!-- Render custom artwork image if available, else bespoke 3D geometric symbol -->
            <div v-if="asset.artworkUrl" class="symbol-art-layer">
              <img
                :src="asset.artworkUrl"
                :alt="asset.name"
                class="model-art-img"
                draggable="false"
              />
            </div>
            <div v-else class="symbol-vector-layer">
              <div class="symbol-crest-frame">
                <span class="symbol-hero-emoji">{{ asset.iconEmoji }}</span>
                <div class="crest-accent-ring"></div>
              </div>
            </div>
          </div>

          <!-- Front Face Specular Glass & Bevel Rim -->
          <div
            class="front-specular-face"
            :style="{ transform: `translateZ(2px)` }"
          >
            <div class="specular-reflection" :style="specularHighlightStyle"></div>
            <div class="bevel-border"></div>
          </div>

          <!-- Back Face Plate -->
          <div
            class="back-plate-face"
            :style="{ transform: `translateZ(${-depth}px) rotateY(180deg)` }"
          >
            <div class="back-plate-content">
              <div class="back-logo">{{ asset.gameName ? asset.gameName.toUpperCase() : 'IGAMING ASSET' }}</div>
              <div class="back-sub">SLOT STUDIO 3D ASSET</div>
              <div class="back-id">#{{ asset.id.toUpperCase() }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage Overlay Floating HUD Info -->
      <div class="stage-hud-top">
        <div class="hud-asset-badge">
          <span class="hud-dot" :style="{ background: currentPalette.primaryColor }"></span>
          <span class="hud-name">{{ asset.name }}</span>
          <span class="hud-rarity">{{ asset.rarity }}</span>
        </div>
        <div class="hud-angles">
          <span>X: {{ Math.round(rotX) }}°</span>
          <span>Y: {{ Math.round(rotY) }}°</span>
          <span>Z: {{ Math.round(rotZ) }}°</span>
        </div>
      </div>

      <!-- Interactive Drag Hint -->
      <div v-if="!isDragging && autoSpin" class="drag-hint-pill">
        <span>🖱️ Drag to rotate 360°</span>
      </div>
    </div>

    <!-- Controls Panel -->
    <div v-if="showControls" class="viewer-controls-bar">
      <!-- Color Palette Switcher -->
      <div class="control-group palette-group">
        <span class="control-label">Skin Colorway:</span>
        <div class="palette-chips">
          <button
            v-for="p in asset.palettes"
            :key="p.id"
            type="button"
            class="palette-btn"
            :class="{ active: p.id === activePaletteId }"
            :title="p.name"
            @click="setPalette(p)"
          >
            <span
              class="palette-swatch"
              :style="{ background: `linear-gradient(135deg, ${p.primaryColor}, ${p.secondaryColor})` }"
            ></span>
            <span class="palette-name">{{ p.badgeLabel }}</span>
          </button>
        </div>
      </div>

      <!-- 3D Physics & View Mode Toggles -->
      <div class="control-group view-toggles">
        <button
          type="button"
          class="tool-btn"
          :class="{ active: autoSpin }"
          @click="autoSpin = !autoSpin; playTickSound(1.1)"
        >
          <span>🔄 Auto-Spin</span>
        </button>
        <button
          type="button"
          class="tool-btn"
          :class="{ active: isWireframe }"
          @click="isWireframe = !isWireframe; playTickSound(1.3)"
        >
          <span>📐 Hologram Grid</span>
        </button>
        <button
          type="button"
          class="tool-btn reset-btn"
          title="Reset Camera Angle"
          @click="resetView"
        >
          <span>⏮ Reset View</span>
        </button>
      </div>

      <!-- Sliders for Fine-Tuned Perspective -->
      <div class="control-sliders-row">
        <div class="slider-item">
          <label>Depth Extrusion: {{ depth }}px</label>
          <input
            v-model.number="depth"
            type="range"
            min="6"
            max="48"
            step="2"
            class="hud-slider"
          />
        </div>
        <div class="slider-item">
          <label>Zoom Scale: {{ zoom.toFixed(1) }}x</label>
          <input
            v-model.number="zoom"
            type="range"
            min="0.7"
            max="1.4"
            step="0.05"
            class="hud-slider"
          />
        </div>
        <div class="slider-item">
          <label>Spin Speed: {{ spinSpeed.toFixed(1) }}x</label>
          <input
            v-model.number="spinSpeed"
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            class="hud-slider"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewer-3d-root {
  display: flex;
  flex-direction: column;
  background: var(--ink-2);
  border: 1px solid var(--line);
  position: relative;
  user-select: none;
}

.stage-3d {
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.stage-3d:active {
  cursor: grabbing;
}

.ambient-aura {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 0.4s ease;
}

.hologram-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 229, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 255, 0.08) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: center center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hologram-grid.visible {
  opacity: 1;
}

/* Turntable Pivot */
.turntable-pivot {
  position: relative;
  width: 220px;
  height: 220px;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.05s ease-out;
}

.shadow-plane {
  position: absolute;
  bottom: -40px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  transform: rotateX(90deg) translateZ(-80px);
  background: transparent;
  pointer-events: none;
  transition: box-shadow 0.3s ease;
}

/* 3D Assembly */
.model-3d-assembly {
  position: relative;
  width: 180px;
  height: 180px;
  transform-style: preserve-3d;
}

.extrusion-slice {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.symbol-art-layer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background:
    radial-gradient(circle at center, var(--theme-glow) 0%, rgba(16, 18, 24, 0.95) 75%),
    var(--ink);
  border: 2px solid var(--theme-primary);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9), 0 0 20px var(--theme-glow);
}

.model-art-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.9));
}

.symbol-vector-layer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at center, var(--theme-glow) 0%, rgba(16, 18, 24, 0.98) 75%),
    var(--ink);
  border: 2px solid var(--theme-primary);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9), 0 0 20px var(--theme-glow);
}

.symbol-crest-frame {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol-hero-emoji {
  font-size: 5rem;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.9));
}

.crest-accent-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px dashed var(--theme-accent);
  opacity: 0.4;
  animation: rotate-ring 12s linear infinite;
}

@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Front Specular Face */
.front-specular-face {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform-style: preserve-3d;
}

.specular-reflection {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.bevel-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 10px var(--theme-glow);
}

/* Back Face */
.back-plate-face {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #101218 0%, #1e222d 100%);
  border: 2px solid var(--theme-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}

.back-plate-content {
  text-align: center;
  font-family: var(--mono);
  color: var(--theme-primary);
  padding: 1rem;
}

.back-logo {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.back-sub {
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  color: var(--mute);
  margin: 0.2rem 0;
}

.back-id {
  font-size: 0.55rem;
  color: var(--theme-accent);
  border: 1px solid var(--theme-accent);
  padding: 0.1rem 0.4rem;
  display: inline-block;
  margin-top: 0.4rem;
}

/* Wireframe Mode */
.wireframe-mode .symbol-art-layer,
.wireframe-mode .symbol-vector-layer {
  background: transparent !important;
  border: 2px dashed #00e5ff !important;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.4) !important;
}

.wireframe-mode .model-art-img {
  opacity: 0.6;
  filter: grayscale(1) drop-shadow(0 0 8px #00e5ff);
}

/* HUD Top Overlays */
.stage-hud-top {
  position: absolute;
  top: 12px;
  left: 14px;
  right: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  font-family: var(--mono);
}

.hud-asset-badge {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(8, 9, 12, 0.85);
  border: 1px solid var(--line);
  padding: 0.25rem 0.65rem;
}

.hud-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.hud-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--paper);
}

.hud-rarity {
  font-size: 0.58rem;
  text-transform: uppercase;
  color: var(--gold-2);
  background: rgba(201, 164, 106, 0.15);
  padding: 0.05rem 0.35rem;
}

.hud-angles {
  font-size: 0.62rem;
  color: var(--mute);
  background: rgba(8, 9, 12, 0.85);
  border: 1px solid var(--hair);
  padding: 0.25rem 0.55rem;
  display: flex;
  gap: 0.6rem;
}

.drag-hint-pill {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(8, 9, 12, 0.85);
  border: 1px solid var(--line);
  padding: 0.25rem 0.8rem;
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: var(--gold-2);
  pointer-events: none;
  animation: float-pulse 2s infinite ease-in-out;
}

@keyframes float-pulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, 0); }
  50% { opacity: 1; transform: translate(-50%, -4px); }
}

/* Controls Bar */
.viewer-controls-bar {
  padding: 1rem 1.4rem;
  background: rgba(8, 9, 12, 0.92);
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.control-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--mute);
  text-transform: uppercase;
}

.palette-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.palette-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(16, 18, 24, 0.8);
  border: 1px solid var(--line);
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.palette-btn:hover {
  border-color: var(--gold);
}

.palette-btn.active {
  border-color: var(--gold);
  background: rgba(201, 164, 106, 0.2);
}

.palette-swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.palette-name {
  font-family: var(--mono);
  font-size: 0.64rem;
  color: var(--paper);
}

.view-toggles {
  display: flex;
  gap: 0.5rem;
}

.tool-btn {
  background: rgba(16, 18, 24, 0.8);
  border: 1px solid var(--line);
  color: var(--paper);
  font-family: var(--mono);
  font-size: 0.66rem;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  border-color: var(--gold);
}

.tool-btn.active {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  border-color: var(--gold);
}

.tool-btn.reset-btn {
  color: var(--mute);
}

.tool-btn.reset-btn:hover {
  color: var(--paper);
}

.control-sliders-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.8rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--hair);
}

.slider-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.slider-item label {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--mute);
}

.hud-slider {
  width: 100%;
  accent-color: var(--gold);
  cursor: pointer;
}

/* Compact Mode */
.compact-mode .viewer-controls-bar {
  padding: 0.6rem 0.8rem;
}

@media (max-width: 600px) {
  .control-group {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
