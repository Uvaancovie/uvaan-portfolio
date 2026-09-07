<script setup lang="ts">
import type { Project } from '@/data/profile'

defineProps<{ project: Project; featured?: boolean }>()
</script>

<template>
  <article :id="`case-${project.slug}`" class="project-card" :class="{ featured }">
    <header class="card-header">
      <div class="card-kicker-row">
        <span class="card-year">{{ project.year }}</span>
        <span class="card-sep">/</span>
        <span class="card-client">{{ project.client }}</span>
        <span class="live-pill">
          <span class="live-dot"></span>
          <span>Live Engine</span>
        </span>
      </div>

      <div class="card-title-row">
        <h3 class="card-title serif">{{ project.title }}</h3>
        <div class="card-specs-badges">
          <span class="spec-badge">{{ project.format }}</span>
          <span class="spec-badge">{{ project.lines }}</span>
          <span v-if="project.rtp" class="spec-badge rtp-badge">{{ project.rtp }}</span>
        </div>
      </div>

      <p class="card-summary">{{ project.summary }}</p>
    </header>

    <!-- Symbol & Deity Asset Gallery -->
    <div v-if="project.symbols && project.symbols.length" class="symbols-section">
      <div class="symbols-header">
        <span class="symbols-label">Cabinet Symbols & Game Assets</span>
        <span class="symbols-count">{{ project.symbols.length }} Rendered Assets</span>
      </div>

      <div class="symbols-grid">
        <div
          v-for="sym in project.symbols"
          :key="sym.name"
          class="symbol-tile"
          :title="`${sym.name} · ${sym.role}`"
        >
          <div class="symbol-img-wrap">
            <img
              :src="sym.imageUrl"
              :alt="sym.name"
              class="symbol-img"
              loading="lazy"
            />
            <span v-if="sym.tag" class="symbol-tag-pill">{{ sym.tag }}</span>
          </div>
          <div class="symbol-info">
            <span class="symbol-name">{{ sym.name }}</span>
            <span class="symbol-role">{{ sym.role }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Features & Mechanics Checklist -->
    <div v-if="project.features && project.features.length" class="features-section">
      <h4 class="features-title">Engine Architecture & Mechanics</h4>
      <ul class="features-list">
        <li v-for="feat in project.features" :key="feat" class="feature-item">
          <span class="feature-bullet">◆</span>
          <span>{{ feat }}</span>
        </li>
      </ul>
    </div>

    <!-- Outcome Note -->
    <div class="outcome-box">
      <span class="outcome-label">Production Outcome:</span>
      <span class="outcome-text">{{ project.outcome }}</span>
    </div>

    <!-- Footer Actions & Tech Stack -->
    <footer class="card-footer">
      <div class="chips">
        <span v-for="item in project.stack" :key="item" class="chip">{{ item }}</span>
      </div>

      <div class="action-buttons">
        <a
          :id="`btn-play-${project.slug}`"
          class="btn play-btn"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Play Live Slot</span>
          <span class="btn-arrow">↗</span>
        </a>
        <a
          :id="`btn-repo-${project.slug}`"
          class="btn ghost repo-btn"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Source Code</span>
          <span class="btn-arrow">↗</span>
        </a>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 2.2rem;
  border: 1px solid var(--line);
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.45) 0%, rgba(13, 20, 17, 0.6) 40%, rgba(8, 9, 12, 0.95) 100%),
    var(--ink-2);
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.project-card:hover {
  border-color: var(--gold);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), 0 0 30px rgba(201, 164, 106, 0.08);
}

.project-card::after {
  content: '';
  position: absolute;
  inset: auto -15% -25% auto;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(201, 164, 106, 0.14), transparent 70%);
  pointer-events: none;
}

.card-header {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-kicker-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.card-year {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  color: var(--gold-2);
  font-weight: 500;
}

.card-sep {
  color: var(--line);
  font-size: 0.75rem;
}

.card-client {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mute);
}

.live-pill {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  font-family: var(--mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mint);
  background: rgba(127, 217, 168, 0.1);
  border: 1px solid rgba(127, 217, 168, 0.35);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px var(--mint);
  animation: pulse-dot 2s infinite ease-in-out;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
}

.card-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
}

.card-title {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 600;
  line-height: 1;
  margin: 0;
  color: var(--paper);
}

.card-specs-badges {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.spec-badge {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--line);
  background: rgba(8, 9, 12, 0.6);
  color: var(--gold-2);
}

.rtp-badge {
  border-color: rgba(201, 164, 106, 0.4);
  background: rgba(201, 164, 106, 0.12);
  color: var(--gold);
  font-weight: 500;
}

.card-summary {
  margin: 0.4rem 0 0;
  color: color-mix(in srgb, var(--paper) 88%, var(--mute));
  line-height: 1.6;
  font-size: 1.02rem;
  font-weight: 300;
  max-width: 62ch;
}

/* Symbol Asset Gallery */
.symbols-section {
  position: relative;
  z-index: 1;
  padding: 1.2rem 1.3rem;
  background: rgba(8, 9, 12, 0.7);
  border: 1px solid var(--hair);
}

.symbols-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.9rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--hair);
}

.symbols-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-2);
  font-weight: 500;
}

.symbols-count {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.85rem;
}

.symbol-tile {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.65rem;
  background: rgba(16, 18, 24, 0.85);
  border: 1px solid var(--line);
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.symbol-tile:hover {
  transform: translateY(-2px);
  border-color: var(--gold);
  background: rgba(22, 26, 35, 0.95);
}

.symbol-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(201, 164, 106, 0.12) 0%, rgba(8, 9, 12, 0.85) 85%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.symbol-img {
  width: 86%;
  height: 86%;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6));
}

.symbol-tile:hover .symbol-img {
  transform: scale(1.08);
}

.symbol-tag-pill {
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: var(--mono);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  background: var(--gold);
  padding: 0.1rem 0.35rem;
  font-weight: 600;
  line-height: 1.2;
}

.symbol-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.symbol-name {
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--paper);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.symbol-role {
  font-size: 0.68rem;
  color: var(--mute);
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Features checklist */
.features-section {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.features-title {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold-2);
  margin: 0;
  font-weight: 500;
}

.features-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.45rem 1.2rem;
}

.feature-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.88rem;
  line-height: 1.5;
  color: color-mix(in srgb, var(--paper) 80%, var(--mute));
  font-weight: 300;
}

.feature-bullet {
  color: var(--gold);
  font-size: 0.65rem;
  flex-shrink: 0;
}

.outcome-box {
  position: relative;
  z-index: 1;
  padding: 0.85rem 1.1rem;
  background: rgba(13, 28, 22, 0.4);
  border-left: 2px solid var(--mint);
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--paper);
}

.outcome-label {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mint);
  margin-right: 0.5rem;
  font-weight: 500;
}

.outcome-text {
  font-weight: 300;
}

/* Footer & Actions */
.card-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
  padding-top: 0.8rem;
  border-top: 1px solid var(--hair);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.play-btn {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-color: var(--gold);
}

.play-btn:hover {
  background: var(--gold-2);
  color: var(--ink);
}

.repo-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-arrow {
  font-size: 0.95rem;
  line-height: 1;
}

@media (max-width: 768px) {
  .project-card {
    padding: 1.5rem 1.2rem;
  }
  .card-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .action-buttons {
    width: 100%;
    justify-content: stretch;
  }
  .action-buttons .btn {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
  .symbols-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
