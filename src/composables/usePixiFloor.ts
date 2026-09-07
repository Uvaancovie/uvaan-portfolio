import { Application, Container, Graphics, Text } from 'pixi.js'
import type { TextStyleOptions } from 'pixi.js'

interface Reel {
  container: Container
  cells: Graphics[]
  offset: number
  speed: number
  target: number
}

const GOLD = 0xc9a46a
const GOLD_2 = 0xf0d9a0
const FELT = 0x0d1c16
const INK = 0x08090c
const MINT = 0x8dffc9
const CHIP = 0xe23d4a

const SYMBOLS = [GOLD, GOLD_2, MINT, CHIP, 0x3d6b55, 0x8a6a32]

export async function mountPixiFloor(
  canvas: HTMLCanvasElement,
  options: { interactive?: boolean } = {},
) {
  const app = new Application()
  await app.init({
    canvas,
    background: INK,
    antialias: true,
    resizeTo: canvas.parentElement ?? window,
    autoDensity: true,
    resolution: Math.min(window.devicePixelRatio, 2),
  })

  const root = new Container()
  app.stage.addChild(root)

  const grid = new Graphics()
  const felt = new Graphics()
  const cabinet = new Graphics()
  const hud = new Graphics()
  const reelsRoot = new Container()
  const chips = new Container()
  root.addChild(felt, grid, cabinet, reelsRoot, chips, hud)

  const labelStyle: TextStyleOptions = {
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 11,
    fill: GOLD,
    letterSpacing: 2,
  }
  const title = new Text({ text: 'STUDIO FLOOR  ·  PIXIJS', style: labelStyle })
  const rtp = new Text({
    text: 'RTP 96.4   VOLATILITY MED   MATH LOCAL',
    style: { ...labelStyle, fill: 0x9a917f },
  })
  root.addChild(title, rtp)

  const reels: Reel[] = []
  const reelCount = 5
  const cellCount = 12
  const cellH = 54
  const cellW = 62

  for (let r = 0; r < reelCount; r++) {
    const container = new Container()
    const cells: Graphics[] = []
    for (let i = 0; i < cellCount; i++) {
      const g = new Graphics()
      cells.push(g)
      container.addChild(g)
    }
    reelsRoot.addChild(container)
    reels.push({
      container,
      cells,
      offset: Math.random() * cellCount * cellH,
      speed: 0,
      target: 0,
    })
  }

  const chipDots: { g: Graphics; x: number; y: number; vx: number; vy: number; r: number }[] = []
  for (let i = 0; i < 28; i++) {
    const g = new Graphics()
    chips.addChild(g)
    chipDots.push({
      g,
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00018,
      r: 2 + Math.random() * 4,
    })
  }

  let pointer = { x: 0.5, y: 0.5 }
  const onMove = (e: PointerEvent) => {
    const b = canvas.getBoundingClientRect()
    pointer = {
      x: (e.clientX - b.left) / b.width,
      y: (e.clientY - b.top) / b.height,
    }
  }
  canvas.addEventListener('pointermove', onMove)

  const drawCell = (g: Graphics, color: number, w: number, h: number, glow: boolean) => {
    g.clear()
    g.roundRect(4, 4, w - 8, h - 8, 6)
    g.fill({ color: 0x101218, alpha: 0.92 })
    g.stroke({ width: 1, color, alpha: glow ? 0.95 : 0.45 })
    g.circle(w / 2, h / 2, glow ? 11 : 8)
    g.fill({ color, alpha: glow ? 0.9 : 0.55 })
    if (glow) {
      g.circle(w / 2, h / 2, 16)
      g.stroke({ width: 1, color, alpha: 0.25 })
    }
  }

  const layout = () => {
    const w = app.renderer.width
    const h = app.renderer.height
    const padX = Math.max(40, w * 0.08)
    const padY = Math.max(50, h * 0.12)
    const boardW = Math.min(w - padX * 2, 720)
    const boardH = Math.min(h - padY * 2, 420)
    const bx = (w - boardW) / 2
    const by = (h - boardH) / 2 + 10

    felt.clear()
    felt.roundRect(bx - 18, by - 18, boardW + 36, boardH + 36, 18)
    felt.fill({ color: FELT, alpha: 0.92 })
    felt.stroke({ width: 1.5, color: GOLD, alpha: 0.55 })

    cabinet.clear()
    cabinet.roundRect(bx - 28, by - 42, boardW + 56, boardH + 78, 22)
    cabinet.stroke({ width: 1, color: GOLD, alpha: 0.28 })
    cabinet.roundRect(bx - 8, by - 8, boardW + 16, boardH + 16, 10)
    cabinet.stroke({ width: 1, color: GOLD_2, alpha: 0.18 })

    grid.clear()
    const step = 42
    for (let x = 0; x < w; x += step) {
      grid.moveTo(x, 0)
      grid.lineTo(x, h)
    }
    for (let y = 0; y < h; y += step) {
      grid.moveTo(0, y)
      grid.lineTo(w, y)
    }
    grid.stroke({ width: 1, color: GOLD, alpha: 0.06 })

    const gap = 10
    const reelW = (boardW - gap * (reelCount - 1)) / reelCount
    reels.forEach((reel, i) => {
      reel.container.x = bx + i * (reelW + gap)
      reel.container.y = by
      const mask = new Graphics()
      mask.rect(0, 0, reelW, boardH)
      mask.fill(0xffffff)
      reel.container.removeChild(mask)
      reel.container.mask = mask
      reel.container.addChild(mask)
      reel.cells.forEach((cell, n) => {
        drawCell(cell, SYMBOLS[n % SYMBOLS.length], reelW, cellH, n % 4 === 0)
        cell.x = 0
      })
    })

    title.x = bx - 8
    title.y = by - 36
    rtp.x = bx - 8
    rtp.y = by + boardH + 22

    hud.clear()
    hud.roundRect(bx + boardW - 132, by + boardH + 14, 132, 22, 2)
    hud.fill({ color: GOLD, alpha: 0.12 })
    hud.stroke({ width: 1, color: GOLD, alpha: 0.4 })
  }

  layout()
  app.renderer.on('resize', layout)

  const tick = () => {
    const w = app.renderer.width
    const h = app.renderer.height
    const parallax = options.interactive ? 18 : 8
    root.x = (pointer.x - 0.5) * parallax
    root.y = (pointer.y - 0.5) * parallax

    reels.forEach((reel, i) => {
      if (reel.speed > 0.15) {
        reel.offset += reel.speed
        reel.speed *= 0.985
      } else if (reel.target) {
        reel.offset += (reel.target - (reel.offset % (cellCount * cellH))) * 0.08
        reel.speed *= 0.9
      } else {
        reel.offset += 0.35 + i * 0.08
      }
      const loop = cellCount * cellH
      reel.offset = ((reel.offset % loop) + loop) % loop
      reel.cells.forEach((cell, n) => {
        cell.y = ((n * cellH - reel.offset) % loop) - cellH
      })
    })

    chipDots.forEach((c, i) => {
      c.x += c.vx
      c.y += c.vy
      if (c.x < 0 || c.x > 1) c.vx *= -1
      if (c.y < 0 || c.y > 1) c.vy *= -1
      const color = i % 5 === 0 ? CHIP : GOLD
      c.g.clear()
      c.g.circle(c.x * w, c.y * h, c.r)
      c.g.fill({ color, alpha: 0.22 })
    })
  }

  app.ticker.add(tick)

  const spin = () => {
    reels.forEach((reel, i) => {
      reel.speed = 18 + i * 3 + Math.random() * 6
      reel.target = Math.floor(Math.random() * cellCount) * cellH
    })
  }

  canvas.addEventListener('pointerdown', spin)

  return {
    spin,
    destroy() {
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', spin)
      app.destroy(true, { children: true })
    },
  }
}
