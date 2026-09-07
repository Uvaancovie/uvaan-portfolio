<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/profile'
import type { TrackId } from '@/data/profile'

const filters: Array<{ id: 'all' | TrackId; label: string }> = [
  { id: 'all', label: 'All Cases' },
  { id: 'igaming', label: 'iGaming Engines' },
  { id: 'pixi', label: 'PixiJS & Canvas' },
  { id: 'fintech', label: 'FinTech & Ledgers' },
]

const active = ref<(typeof filters)[number]['id']>('all')
const visible = computed(() =>
  active.value === 'all' ? projects : projects.filter((p) => p.tracks.includes(active.value as TrackId)),
)
</script>

<template>
  <main class="section">
    <div class="wrap">
      <p class="kicker">Archive / Case Studies</p>
      <h1 class="serif" style="font-size: clamp(2.4rem, 6vw, 4.2rem); margin: 0.3rem 0 0.8rem">
        Selected Slot Engines & Architecture.
      </h1>
      <p class="note" style="max-width: 58ch; margin-bottom: 1.6rem">
        Comprehensive playable slot cases with server-authoritative reel physics, interactive bonus vaults,
        rendered symbol asset galleries, and real-time ledger persistence.
      </p>
      <div class="filters">
        <button
          v-for="filter in filters"
          :key="filter.id"
          class="filter"
          :class="{ active: active === filter.id }"
          type="button"
          @click="active = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>
      <div class="project-grid">
        <ProjectCard
          v-for="project in visible"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>
  </main>
</template>
