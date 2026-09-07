<script setup lang="ts">
import type { Project } from '@/data/profile'

defineProps<{ project: Project; featured?: boolean }>()
</script>

<template>
  <a class="project-card" :class="{ featured }" :href="project.href" target="_blank" rel="noreferrer">
    <header>
      <p class="kicker">{{ project.year }} · {{ project.client }}</p>
      <h3>{{ project.title }}</h3>
      <p>{{ project.summary }}</p>
    </header>
    <div class="chips">
      <span v-for="item in project.stack" :key="item" class="chip">{{ item }}</span>
    </div>
  </a>
</template>
