<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <header class="site-nav">
    <router-link class="brand" to="/">
      <strong>{{ profile.monogram }}</strong>
      <span>{{ profile.name }}</span>
    </router-link>
    <nav class="nav-links">
      <router-link to="/work">Work</router-link>
      <router-link to="/studio">Studio</router-link>
      <router-link to="/game-assets" class="assets-nav-link">Game Assets</router-link>
      <router-link to="/shop" class="shop-nav-link">Shop</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
  </header>
</template>
