<script setup lang="ts">
import { ref } from 'vue'
import PixiStage from '@/components/PixiStage.vue'

const stage = ref<{ spin: () => void } | null>(null)
</script>

<template>
  <main class="studio">
    <div class="studio-stage">
      <PixiStage ref="stage" interactive />
      <div class="studio-hud">
        <button class="btn" type="button" @click="stage?.spin()">Spin</button>
        <p class="note" style="margin: 0; max-width: 34ch">
          Live PixiJS cabinet. Click the canvas or the button. This is the graphic / iGaming
          design track — reels, felt, gold inlay, local math labels.
        </p>
      </div>
    </div>
    <section class="section">
      <div class="wrap">
        <p class="kicker">Studio notes</p>
        <h2 class="serif" style="font-size: 2.4rem; margin: 0.3rem 0 1rem">Why Pixi, not CSS.</h2>
        <p class="note" style="max-width: 62ch">
          Slot cabinets need a display list, masks, ticker-driven offsets, and symbol language.
          CSS can fake a reel. PixiJS is what you ship when the art has to sit on a licensed
          floor later — white-label configs, server-authoritative spin, WebGL when the device
          can take it. This page is the portfolio arguing that in motion.
        </p>
      </div>
    </section>
  </main>
</template>
