<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { mountPixiFloor } from '@/composables/usePixiFloor'

const props = defineProps<{ interactive?: boolean }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let api: { destroy: () => void; spin: () => void } | null = null

onMounted(async () => {
  if (!canvas.value) return
  api = await mountPixiFloor(canvas.value, { interactive: props.interactive })
})

onBeforeUnmount(() => {
  api?.destroy()
  api = null
})

defineExpose({
  spin: () => api?.spin(),
})
</script>

<template>
  <canvas ref="canvas" aria-label="PixiJS studio floor" />
</template>
