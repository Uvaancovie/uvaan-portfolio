<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="site-footer">
    <span>{{ profile.name }} · {{ profile.location }}</span>
    <router-link to="/game-assets" style="color: var(--mint)">3D Game Assets ⛶</router-link>
    <router-link to="/shop" style="color: var(--gold)">Buy Slot Licenses ($149 – $999) ↗</router-link>
    <a
      id="footer-whatsapp"
      :href="profile.whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      style="color: var(--gold-2)"
    >
      WhatsApp: {{ profile.phone }} ↗
    </a>
    <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
    <a :href="profile.github" target="_blank" rel="noreferrer">GitHub</a>
  </footer>
</template>
