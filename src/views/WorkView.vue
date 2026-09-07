<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/profile'
import type { TrackId } from '@/data/profile'

const filters: Array<{ id: 'all' | TrackId; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'igaming', label: 'iGaming' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'dotnet', label: '.NET' },
  { id: 'pixi', label: 'PixiJS' },
  { id: 'commerce', label: 'Commerce' },
]

const active = ref<(typeof filters)[number]['id']>('all')
const visible = computed(() =>
  active.value === 'all' ? projects : projects.filter((p) => p.tracks.includes(active.value as TrackId)),
)
</script>

<template>
  <main class="section">
    <div class="wrap">
      <p class="kicker">Archive</p>
      <h1 class="serif" style="font-size: clamp(2.4rem, 6vw, 4.2rem); margin: 0.3rem 0 0.8rem">
        Work that already exists.
      </h1>
      <p class="note" style="max-width: 46ch; margin-bottom: 1.6rem">
        Public GitHub cases. The through-line is shipping: slots, legal ops, funeral commerce,
        and the APIs underneath. Filter by the floor I am advancing onto.
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
          v-for="(project, index) in visible"
          :key="project.slug"
          :project="project"
          :featured="index === 0"
        />
      </div>
    </div>
  </main>
</template>
