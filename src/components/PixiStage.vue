<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { mountPixiFloor, type CabinetTheme } from '@/composables/usePixiFloor'

const props = defineProps<{ interactive?: boolean; theme?: CabinetTheme }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let api: { destroy: () => void; spin: () => void; setTheme: (theme: CabinetTheme) => void } | null = null

onMounted(async () => {
  if (!canvas.value) return
  api = await mountPixiFloor(canvas.value, { interactive: props.interactive, theme: props.theme })
})

watch(
  () => props.theme,
  (newTheme) => {
    if (newTheme && api) {
      api.setTheme(newTheme)
    }
  },
)

onBeforeUnmount(() => {
  api?.destroy()
  api = null
})

defineExpose({
  spin: () => api?.spin(),
  setTheme: (theme: CabinetTheme) => api?.setTheme(theme),
})
</script>

<template>
  <canvas ref="canvas" aria-label="PixiJS studio floor" />
</template>
