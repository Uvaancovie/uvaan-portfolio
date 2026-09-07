<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="site-footer">
    <span>{{ profile.name }} · {{ profile.location }}</span>
    <span>Vue 3 · PixiJS · Cloudflare Pages</span>
    <a :href="profile.github">GitHub</a>
  </footer>
</template>
