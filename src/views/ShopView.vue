<script setup lang="ts">
import { ref } from 'vue'
import { profile } from '@/data/profile'

type Currency = 'USD' | 'ZAR'
const currency = ref<Currency>('USD')
const isImageModalOpen = ref(false)

const slotArtworkUrl = 'https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/slot-projects/springbok-slot.png'

interface PricingTier {
  id: string
  name: string
  priceUsd: number
  priceZar: number
  badge: string
  popular?: boolean
  tagline: string
  includes: string[]
  support: string
  bestFor: string
  whatsappText: string
}

const tiers: PricingTier[] = [
  {
    id: 'tier-self-serve',
    name: 'Self-Serve Source Zip',
    priceUsd: 149,
    priceZar: 2750,
    badge: 'Developer License',
    tagline: 'Clean, unencumbered source code for engineers who want to build and deploy themselves.',
    includes: [
      'Full TypeScript source code (Client + Server + Shared math)',
      'PixiJS 8 WebGL presentation layer with reel physics',
      'Express & Cloudflare Workers spin evaluation backend',
      'Shared math package with 20 evaluated winlines (96.2% RTP)',
      'High-resolution symbol asset pack & Web Audio synth',
      'Real-time English ↔ isiZulu i18n localization engine',
      'Complete developer documentation & deployment README',
    ],
    support: 'None — self-serve download with full technical documentation',
    bestFor: 'Developers who just want clean, professional code to customize.',
    whatsappText: 'Hi Uvaan, I would like to buy the $149 (R2,750) Self-Serve Source Zip for Springbok Rush.',
  },
  {
    id: 'tier-bundle-call',
    name: 'Full Bundle + Onboarding Call',
    priceUsd: 399,
    priceZar: 7450,
    badge: 'Most Popular · Studio Pack',
    popular: true,
    tagline: 'Complete package with 1-on-1 engineer onboarding to get your slot live in under 48 hours.',
    includes: [
      'Everything in the Self-Serve Source Zip',
      '45-minute live 1-on-1 setup & deployment walkthrough call with Uvaan',
      'Assistance with Cloudflare Workers / Node.js hosting deployment',
      'Operator embed query configuration (?operatorId= & ?gameId=)',
      'Cashier & simulated balance ledger hookup guidance',
      '2 weeks of direct email & WhatsApp technical support',
      'Free updates for minor patches and documentation additions',
    ],
    support: '1 setup call + 2 weeks priority email & WhatsApp support',
    bestFor: 'Affiliates and small iGaming studios who want it running fast.',
    whatsappText: 'Hi Uvaan, I would like to purchase the $399 (R7,450) Full Bundle + Setup Call for Springbok Rush.',
  },
  {
    id: 'tier-white-label',
    name: 'White-Label Custom Build',
    priceUsd: 999,
    priceZar: 18500,
    badge: 'Turnkey Branded Game',
    tagline: 'A bespoke, ready-to-launch game fully reskinned and configured to your studio brand.',
    includes: [
      'Everything in the Full Bundle package',
      'Complete bespoke reskin with your studio branding & logo',
      'Custom symbol set & color palette integration',
      'Paytable and reel strip tuning to your custom RTP specification',
      'Custom sound FX integration or synthesized audio tuning',
      'Assistance integrating with your proprietary operator wallet API',
      'Dedicated integration support until smooth production launch',
    ],
    support: '1 kickoff call + 2 weeks dedicated engineering support + custom theme delivery',
    bestFor: 'Serious operators & studios wanting their own proprietary branded game.',
    whatsappText: 'Hi Uvaan, I would like to commission the $999 (R18,500) White-Label Custom Build for Springbok Rush.',
  },
]

function getWhatsAppUrl(customText: string): string {
  return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(customText)}`
}

const faqs = [
  {
    q: 'Why is this priced higher than $20–$50 CodeCanyon slot templates?',
    a: 'Cheap marketplace templates are almost entirely fake client-side animations with zero math models or backends—they roll outcomes in browser memory, making them impossible to run on a real operator floor. Springbok Rush includes an authentic server-authoritative Express/Cloudflare backend that computes RNG spins, validates 20 winlines, maintains session state, handles ZAR integer cents math (preventing float rounding errors), supports real-time English ↔ isiZulu translation, and includes 18+ Responsible Gambling compliance.',
  },
  {
    q: 'How do I receive the codebase upon purchase?',
    a: 'Immediately upon payment confirmation, you receive an invitation to the private GitHub repository and a secure direct download link containing the full modular ZIP archive with clean TypeScript code, assets, and documentation.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept South African Instant EFT (Ozow / Capitec Pay / Direct Bank Transfer), PayFast, International Credit/Debit Cards, Wire Transfers, and USDT/Crypto for international studio buyers.',
  },
  {
    q: 'Are there any recurring royalties or revenue share fees?',
    a: 'No. All licenses are 100% royalty-free. You pay once and own the right to deploy, brand, modify, and run the game across your own domains and operator integrations without any revenue share.',
  },
  {
    q: 'Can I integrate this with an existing operator wallet or player database?',
    a: 'Yes. The backend spin service is designed to be decoupled. It provides straightforward hooks to debit bets, credit winnings, and verify session balance against any external REST or SQL database.',
  },
]
</script>

<template>
  <main class="shop-page section">
    <div class="wrap">
      <!-- Shop Header & Overview -->
      <header class="shop-hero">
        <div class="hero-top-row">
          <p class="kicker">Commercial Source Licenses & White-Label iGaming</p>
          <!-- Currency Toggle -->
          <div class="currency-toggle">
            <span class="currency-label">Currency:</span>
            <button
              type="button"
              class="curr-btn"
              :class="{ active: currency === 'USD' }"
              @click="currency = 'USD'"
            >
              $ USD
            </button>
            <button
              type="button"
              class="curr-btn"
              :class="{ active: currency === 'ZAR' }"
              @click="currency = 'ZAR'"
            >
              R ZAR
            </button>
          </div>
        </div>

        <h1 class="serif shop-title">
          Springbok Rush · <em class="text-gold">White-Label Slot Kit</em>
        </h1>
        <p class="shop-subtitle">
          Configurable 5-reel × 3-row slot shell for the South African and international iGaming market. Server-authoritative spin evaluations, strict ZAR cents integer math, PixiJS 8 WebGL presentation, and English ↔ isiZulu real-time localization.
        </p>

        <!-- Grand Product Showcase & Live Demo Banner -->
        <div class="demo-banner-card grand-showcase">
          <!-- Large High-Resolution Media Stage -->
          <div class="banner-media large-media">
            <div
              class="slot-image-wrap large-slot-wrap"
              title="Click to view full resolution artwork"
              @click="isImageModalOpen = true"
            >
              <img
                :src="slotArtworkUrl"
                alt="Springbok Rush Red & Black Diamond White-Label Slot Artwork"
                class="slot-preview-img large-img"
                loading="eager"
              />
              <div class="img-overlay-hint">
                <span>🔍 Click to Enlarge HD Asset</span>
              </div>
              <span class="slot-img-badge gold-glow-badge">★ Production Asset Included</span>
            </div>
            <div class="asset-meta-strip">
              <span class="meta-label">Atlas Pack · High-Res PNG</span>
              <button
                type="button"
                class="expand-btn"
                @click="isImageModalOpen = true"
              >
                Expand ↗
              </button>
            </div>
          </div>

          <div class="banner-left">
            <div class="banner-badge">
              <span class="pulse-dot"></span>
              <span>Live Production Demo & Turnkey Engine</span>
            </div>
            <h2 class="banner-title">Springbok Rush · Red & Black Diamond Edition</h2>
            <p class="banner-desc">
              A bespoke, server-authoritative 5×3 slot shell built specifically for the South African and African iGaming market. Features realistic reel deceleration physics, 20 evaluated winlines, synthesized Web Audio FX, and real-time operator query parameter switching.
            </p>
            <div class="banner-tags">
              <span class="btag">5×3 Matrix</span>
              <span class="btag">20 Winlines</span>
              <span class="btag">96.2% RTP</span>
              <span class="btag">ZAR Cents Math</span>
              <span class="btag">EN ↔ isiZulu</span>
              <span class="btag">Cloudflare & Express</span>
            </div>
          </div>

          <div class="banner-actions">
            <a
              id="shop-btn-launch-demo"
              href="https://white-label-slot.igamingdev.workers.dev/?operatorId=lulabet-demo&gameId=springbok-rush"
              target="_blank"
              rel="noopener noreferrer"
              class="btn demo-launch-btn"
            >
              <span>Launch Playable Slot Demo</span>
              <span class="btn-arrow">↗</span>
            </a>
            <router-link
              to="/game-assets"
              class="btn view-3d-btn"
            >
              <span>Inspect 3D Assets & Symbols</span>
              <span>⛶</span>
            </router-link>
            <button
              type="button"
              class="btn view-art-btn"
              @click="isImageModalOpen = true"
            >
              <span>Inspect Artwork HD</span>
              <span>🔍</span>
            </button>
          </div>
        </div>

        <!-- Fullscreen Artwork Lightbox Modal -->
        <Teleport to="body">
          <div
            v-if="isImageModalOpen"
            class="artwork-modal-backdrop"
            @click.self="isImageModalOpen = false"
          >
            <div class="artwork-modal-dialog">
              <div class="modal-header">
                <div class="modal-title-group">
                  <span class="modal-kicker">High-Resolution Asset Preview</span>
                  <h3 class="modal-title">Springbok Rush · Golden Crest Emblem</h3>
                </div>
                <button
                  type="button"
                  class="modal-close-btn"
                  title="Close modal"
                  @click="isImageModalOpen = false"
                >
                  ✕
                </button>
              </div>
              <div class="modal-body">
                <img
                  :src="slotArtworkUrl"
                  alt="Springbok Rush High Resolution Asset"
                  class="modal-artwork-img"
                />
              </div>
              <div class="modal-footer">
                <span class="modal-spec">Format: High-Res PNG / WebP · Included in all license tiers ($149 – $999)</span>
                <a
                  :href="slotArtworkUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn modal-direct-btn"
                >
                  <span>Open Raw File</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </Teleport>
      </header>

      <!-- Market Comparison / Valuation Insight -->
      <section class="valuation-insight">
        <div class="insight-header">
          <div class="insight-icon">⚖️</div>
          <div>
            <h3 class="insight-title">Why Server-Authoritative Architecture Commands Value</h3>
            <p class="insight-subtitle">
              Understanding the difference between amateur marketplace templates and a production-grade slot engine.
            </p>
          </div>
        </div>
        <div class="comparison-grid">
          <div class="comp-card standard">
            <div class="comp-head">
              <span class="comp-tag">Marketplace Templates ($20 – $100)</span>
              <h4 class="comp-name">Client-Side Toy Scripts</h4>
            </div>
            <ul class="comp-list">
              <li>❌ Fake browser-side spin outcome evaluation</li>
              <li>❌ Vulnerable to client-side memory inspection & tampering</li>
              <li>❌ No real operator embedding (`?operatorId=&gameId=`)</li>
              <li>❌ Floating-point arithmetic prone to rounding drift</li>
              <li>❌ Monolingual with no localization models</li>
            </ul>
          </div>

          <div class="comp-card premium">
            <div class="comp-head">
              <span class="comp-tag gold-tag">Springbok Rush Kit ($149 – $999)</span>
              <h4 class="comp-name">Server-Authoritative Engine</h4>
            </div>
            <ul class="comp-list">
              <li>✅ True Express / Cloudflare RNG spin evaluation backend</li>
              <li>✅ Tamper-proof server session state & wallet authority</li>
              <li>✅ Multi-tenant operator embed query configuration</li>
              <li>✅ Strict ZAR cents integer math with zero rounding drift</li>
              <li>✅ Real-time bilingual English ↔ isiZulu dynamic i18n</li>
              <li>✅ 18+ Responsible Gambling compliance & session clocks</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Pricing Tiers Grid -->
      <section class="pricing-section">
        <div class="section-kicker-row">
          <p class="kicker">Choose Your License Tier</p>
          <span class="kicker-hint">All tiers are 100% royalty-free one-time purchases</span>
        </div>

        <div class="pricing-grid">
          <div
            v-for="tier in tiers"
            :key="tier.id"
            :id="tier.id"
            class="pricing-card"
            :class="{ featured: tier.popular }"
          >
            <div v-if="tier.popular" class="popular-ribbon">
              ★ MOST POPULAR FOR STUDIOS ★
            </div>

            <!-- Tier Header -->
            <div class="card-header">
              <span class="tier-badge">{{ tier.badge }}</span>
              <h3 class="tier-name">{{ tier.name }}</h3>
              <p class="tier-tagline">{{ tier.tagline }}</p>
            </div>

            <!-- Price Display -->
            <div class="price-box">
              <div class="price-main">
                <span class="currency-sym">{{ currency === 'USD' ? '$' : 'R' }}</span>
                <span class="amount">
                  {{ currency === 'USD' ? tier.priceUsd : tier.priceZar.toLocaleString() }}
                </span>
              </div>
              <span class="price-period">One-time payment · Royalty-free license</span>
            </div>

            <!-- What's Included -->
            <div class="includes-block">
              <h4 class="block-label">Includes:</h4>
              <ul class="features-list">
                <li v-for="(feat, idx) in tier.includes" :key="idx">
                  <span class="check-icon">✓</span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <!-- Support & Target -->
            <div class="meta-block">
              <div class="meta-row">
                <strong class="meta-lbl">Support:</strong>
                <span class="meta-val">{{ tier.support }}</span>
              </div>
              <div class="meta-row">
                <strong class="meta-lbl">Best for:</strong>
                <span class="meta-val">{{ tier.bestFor }}</span>
              </div>
            </div>

            <!-- Buy Action -->
            <div class="card-action">
              <a
                :id="`btn-buy-${tier.id}`"
                :href="getWhatsAppUrl(tier.whatsappText)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn buy-btn"
                :class="{ 'buy-featured': tier.popular }"
              >
                <span>Purchase via WhatsApp</span>
                <span class="btn-arrow">↗</span>
              </a>
              <span class="instant-delivery-hint">⚡ Fast repo access upon payment</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Architecture Breakdown -->
      <section class="tech-specs-section">
        <div class="specs-header">
          <p class="kicker">Technical Architecture & Deliverables</p>
          <h3 class="specs-title">What You'll Find in the Repository</h3>
        </div>

        <div class="specs-grid">
          <div class="spec-card">
            <h4 class="spec-heading">1. Client Layer (PixiJS 8)</h4>
            <p class="spec-desc">
              High-performance WebGL display lists, staggered reel deceleration physics, payline multi-highlight shaders, coin burst celebration particle systems, and touch-optimized mobile portrait HUD.
            </p>
            <div class="spec-stack">PixiJS 8 · Vite · TypeScript · Web Audio</div>
          </div>

          <div class="spec-card">
            <h4 class="spec-heading">2. Server Layer (Express / Cloudflare)</h4>
            <p class="spec-desc">
              Server-authoritative spin service that generates RNG grid states, computes winning combinations against the 20-line paytable, and stores session state securely without client tampering.
            </p>
            <div class="spec-stack">Express · Cloudflare Workers · Node.js · REST APIs</div>
          </div>

          <div class="spec-card">
            <h4 class="spec-heading">3. Shared Math & Localization</h4>
            <p class="spec-desc">
              Decoupled math models, certified RTP calculations (96.2%), strict ZAR cents integer math (zero float rounding drift), and dynamic English ↔ isiZulu real-time localization dictionaries.
            </p>
            <div class="spec-stack">ZAR Integer Math · 20 Winlines · i18n (EN/ZU)</div>
          </div>

          <div class="spec-card asset-spec-card">
            <h4 class="spec-heading">4. Graphics & Symbol Atlas Pack</h4>
            <p class="spec-desc">
              Complete production asset pack including the Springbok Golden Crest wild/scatter emblem, payline indicators, coin particle textures, and UI button sprite atlas.
            </p>
            <div class="spec-asset-preview">
              <img
                src="https://vydleiyxfqrhxoddbcpi.supabase.co/storage/v1/object/public/slot-projects/springbok-slot.png"
                alt="Springbok Crest Asset"
                class="spec-thumb"
              />
              <span class="spec-asset-tag">High-Res PNG / WebP Atlas</span>
            </div>
            <div class="spec-stack">Textures · Sprites · Audio Synth Presets</div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <div class="faq-head">
          <p class="kicker">Frequently Asked Questions</p>
          <h3 class="faq-title">Licensing, Delivery & Integration</h3>
        </div>

        <div class="faq-grid">
          <div v-for="(item, idx) in faqs" :key="idx" class="faq-card">
            <h4 class="faq-q">{{ item.q }}</h4>
            <p class="faq-a">{{ item.a }}</p>
          </div>
        </div>
      </section>

      <!-- Direct Contact & Custom Quotes -->
      <section class="custom-quote-banner">
        <div class="quote-content">
          <h3 class="quote-title">Need a Custom Slot Suite or Bespoke Casino Math Model?</h3>
          <p class="quote-desc">
            If you need multiple cabinets, custom math volatility models (High/Low RTP), custom bonus rounds, or specialized payment gateways (Ozow, PayFast), let's discuss a custom studio contract.
          </p>
        </div>
        <div class="quote-actions">
          <a
            id="btn-shop-custom-inquiry"
            :href="getWhatsAppUrl('Hi Uvaan, I would like to discuss a custom slot suite / casino engineering contract.')"
            target="_blank"
            rel="noopener noreferrer"
            class="btn quote-btn"
          >
            <span>Message Uvaan on WhatsApp</span>
            <span>↗</span>
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.shop-page {
  min-height: 100vh;
  padding-bottom: 5rem;
}

/* Shop Hero */
.shop-hero {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.hero-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.currency-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(16, 18, 24, 0.9);
  border: 1px solid var(--line);
  padding: 0.25rem;
}

.currency-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
  padding: 0 0.4rem;
}

.curr-btn {
  border: 1px solid transparent;
  background: transparent;
  color: var(--mute);
  font-family: var(--mono);
  font-size: 0.68rem;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.curr-btn.active {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  border-color: var(--gold);
}

.shop-title {
  font-size: clamp(2.4rem, 5.5vw, 4.4rem);
  font-weight: 600;
  line-height: 1;
  margin: 0;
  color: var(--paper);
  letter-spacing: -0.02em;
}

.text-gold {
  color: var(--gold-2);
  font-style: italic;
}

.shop-subtitle {
  font-family: var(--sans);
  font-size: 1.08rem;
  line-height: 1.65;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
  font-weight: 300;
  max-width: 52rem;
  margin: 0;
}

/* Grand Demo Showcase Banner */
.demo-banner-card {
  margin-top: 1rem;
  background:
    linear-gradient(135deg, rgba(22, 50, 38, 0.65) 0%, rgba(16, 18, 24, 0.96) 100%),
    var(--ink-2);
  border: 1px solid rgba(141, 255, 201, 0.35);
  padding: 2rem 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.2rem;
  flex-wrap: wrap;
  position: relative;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 164, 106, 0.1);
}

.demo-banner-card.grand-showcase {
  align-items: stretch;
}

.banner-media.large-media {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 240px;
}

.slot-image-wrap.large-slot-wrap {
  position: relative;
  width: 100%;
  height: 220px;
  background:
    radial-gradient(circle at center, rgba(201, 164, 106, 0.35) 0%, rgba(13, 28, 22, 0.8) 55%, rgba(8, 9, 12, 0.98) 95%),
    var(--ink);
  border: 2px solid rgba(201, 164, 106, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(201, 164, 106, 0.25);
  transition: all 0.3s ease;
}

.slot-image-wrap.large-slot-wrap:hover {
  border-color: #ffd700;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 215, 0, 0.35);
  transform: translateY(-2px);
}

.slot-preview-img.large-img {
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 12px rgba(201, 164, 106, 0.3));
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.slot-image-wrap.large-slot-wrap:hover .slot-preview-img.large-img {
  transform: scale(1.1) rotate(1deg);
}

.img-overlay-hint {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(8, 9, 12, 0.8);
  border: 1px solid rgba(201, 164, 106, 0.3);
  padding: 0.18rem 0.45rem;
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  color: var(--gold-2);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.slot-image-wrap.large-slot-wrap:hover .img-overlay-hint {
  opacity: 1;
}

.slot-img-badge.gold-glow-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  background: linear-gradient(90deg, #ffd700, #c9a46a);
  font-weight: 700;
  padding: 0.18rem 0.6rem;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

.asset-meta-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.6rem;
  background: rgba(8, 9, 12, 0.6);
  border: 1px solid var(--hair);
}

.meta-label {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: var(--mute);
}

.expand-btn {
  background: transparent;
  border: none;
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--gold-2);
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.expand-btn:hover {
  color: #ffd700;
}

.banner-left {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
}

.banner-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.85rem;
}

.btag {
  font-family: var(--mono);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold-2);
  background: rgba(201, 164, 106, 0.12);
  border: 1px solid rgba(201, 164, 106, 0.3);
  padding: 0.2rem 0.55rem;
}

.banner-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mint);
  margin-bottom: 0.2rem;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px var(--mint);
  animation: pulse-glow 1.5s infinite alternate;
}

@keyframes pulse-glow {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

.banner-title {
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  color: var(--paper);
  letter-spacing: -0.01em;
}

.banner-desc {
  font-family: var(--sans);
  font-size: 0.96rem;
  line-height: 1.55;
  color: color-mix(in srgb, var(--paper) 85%, var(--mute));
  margin: 0.2rem 0 0;
}

.banner-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.demo-launch-btn {
  background: linear-gradient(135deg, #ffd700 0%, #c9a46a 100%);
  color: #08090c;
  font-weight: 600;
  border-color: #ffd700;
  white-space: nowrap;
  min-height: 46px;
  padding: 0 1.4rem;
  box-shadow: 0 4px 18px rgba(201, 164, 106, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.demo-launch-btn:hover {
  background: #ffdf33;
  transform: translateY(-2px);
}

.view-3d-btn {
  background: rgba(141, 255, 201, 0.1);
  color: var(--mint);
  border: 1px solid rgba(141, 255, 201, 0.35);
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  min-height: 42px;
  padding: 0 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.view-3d-btn:hover {
  background: rgba(141, 255, 201, 0.2);
  border-color: var(--mint);
  transform: translateY(-1px);
}

.view-art-btn {
  background: transparent;
  color: var(--gold-2);
  border: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  min-height: 42px;
  padding: 0 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-art-btn:hover {
  border-color: var(--gold);
  background: rgba(201, 164, 106, 0.1);
  color: var(--paper);
}

/* Lightbox Modal */
.artwork-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: modal-fade-in 0.25s ease;
}

@keyframes modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.artwork-modal-dialog {
  background:
    radial-gradient(circle at center, rgba(22, 50, 38, 0.4) 0%, rgba(16, 18, 24, 0.98) 80%),
    var(--ink);
  border: 1px solid rgba(201, 164, 106, 0.45);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(201, 164, 106, 0.2);
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid var(--line);
  background: rgba(8, 9, 12, 0.6);
}

.modal-kicker {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-2);
}

.modal-title {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0.1rem 0 0;
  color: var(--paper);
}

.modal-close-btn {
  background: transparent;
  border: 1px solid var(--hair);
  color: var(--mute);
  font-size: 1rem;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  border-color: var(--gold);
  color: var(--paper);
}

.modal-body {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(201, 164, 106, 0.15) 0%, rgba(8, 9, 12, 0.95) 80%);
}

.modal-artwork-img {
  max-width: 100%;
  max-height: 380px;
  object-fit: contain;
  filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(201, 164, 106, 0.3));
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--line);
  background: rgba(8, 9, 12, 0.8);
  flex-wrap: wrap;
  gap: 0.8rem;
}

.modal-spec {
  font-family: var(--mono);
  font-size: 0.64rem;
  color: var(--mute);
}

.modal-direct-btn {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--gold-2);
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  text-decoration: none;
}

.modal-direct-btn:hover {
  border-color: var(--gold);
  background: rgba(201, 164, 106, 0.1);
}

/* Valuation Insight */
.valuation-insight {
  margin-bottom: 3.5rem;
  padding: 2rem 2.2rem;
  background: rgba(16, 18, 24, 0.85);
  border: 1px solid var(--line);
}

.insight-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.insight-icon {
  font-size: 1.8rem;
}

.insight-title {
  font-family: var(--serif);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--paper);
}

.insight-subtitle {
  font-family: var(--sans);
  font-size: 0.9rem;
  color: var(--mute);
  margin: 0.15rem 0 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.comp-card {
  padding: 1.4rem;
  border: 1px solid var(--hair);
  background: rgba(8, 9, 12, 0.6);
}

.comp-card.premium {
  border-color: rgba(201, 164, 106, 0.4);
  background: rgba(22, 50, 38, 0.25);
}

.comp-tag {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}

.gold-tag {
  color: var(--gold-2);
}

.comp-name {
  font-family: var(--serif);
  font-size: 1.25rem;
  margin: 0.3rem 0 0.8rem;
}

.comp-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comp-list li {
  font-family: var(--sans);
  font-size: 0.88rem;
  line-height: 1.45;
  color: color-mix(in srgb, var(--paper) 80%, var(--mute));
}

/* Pricing Grid */
.pricing-section {
  margin-bottom: 4rem;
}

.section-kicker-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.kicker-hint {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--gold-2);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.pricing-card {
  position: relative;
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.25) 0%, rgba(16, 18, 24, 0.9) 50%, rgba(8, 9, 12, 0.98) 100%),
    var(--ink-2);
  border: 1px solid var(--line);
  padding: 2rem 1.8rem 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  transition: all 0.25s ease;
}

.pricing-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(201, 164, 106, 0.15);
}

.pricing-card.featured {
  border-color: var(--gold);
  background:
    linear-gradient(165deg, rgba(201, 164, 106, 0.12) 0%, rgba(22, 50, 38, 0.4) 40%, rgba(8, 9, 12, 0.98) 100%),
    var(--ink-2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 164, 106, 0.12);
}

.popular-ribbon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #ffd700, #c9a46a);
  color: #08090c;
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-align: center;
  padding: 0.3rem 0;
}

.tier-badge {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-2);
  background: rgba(201, 164, 106, 0.12);
  border: 1px solid rgba(201, 164, 106, 0.3);
  padding: 0.2rem 0.55rem;
  display: inline-block;
  margin-bottom: 0.6rem;
}

.tier-name {
  font-family: var(--serif);
  font-size: 1.85rem;
  font-weight: 600;
  margin: 0 0 0.35rem;
  color: var(--paper);
}

.tier-tagline {
  font-family: var(--sans);
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--mute);
  margin: 0;
}

.price-box {
  padding: 1.1rem 1.2rem;
  background: rgba(8, 9, 12, 0.75);
  border: 1px solid var(--hair);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.currency-sym {
  font-family: var(--serif);
  font-size: 1.6rem;
  color: var(--gold-2);
}

.amount {
  font-family: var(--sans);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--paper);
  line-height: 1;
}

.price-period {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mute);
}

.includes-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.block-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-2);
  margin: 0;
}

.features-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: var(--sans);
  font-size: 0.88rem;
  line-height: 1.45;
  color: color-mix(in srgb, var(--paper) 86%, var(--mute));
}

.check-icon {
  color: var(--mint);
  font-weight: bold;
  flex-shrink: 0;
}

.meta-block {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.9rem;
  background: rgba(8, 9, 12, 0.6);
  border: 1px solid var(--hair);
}

.meta-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-lbl {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}

.meta-val {
  font-family: var(--sans);
  font-size: 0.84rem;
  color: var(--mute);
  line-height: 1.4;
}

.card-action {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.buy-btn {
  width: 100%;
  min-height: 46px;
  background: transparent;
  color: var(--gold-2);
  border: 1px solid var(--gold);
  font-weight: 600;
  transition: all 0.2s ease;
}

.buy-btn:hover {
  background: var(--gold);
  color: var(--ink);
}

.buy-featured {
  background: var(--gold);
  color: var(--ink);
}

.buy-featured:hover {
  background: var(--gold-2);
}

.instant-delivery-hint {
  font-family: var(--mono);
  font-size: 0.62rem;
  text-align: center;
  color: var(--mute);
  letter-spacing: 0.05em;
}

/* Tech Specs Grid */
.tech-specs-section {
  margin-bottom: 4rem;
  padding: 2.2rem;
  background: rgba(16, 18, 24, 0.7);
  border: 1px solid var(--line);
}

.specs-header {
  margin-bottom: 1.8rem;
}

.specs-title {
  font-family: var(--serif);
  font-size: 1.8rem;
  margin: 0.2rem 0 0;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.4rem;
}

.spec-card {
  padding: 1.3rem;
  background: rgba(8, 9, 12, 0.6);
  border: 1px solid var(--hair);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
}

.spec-asset-preview {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 0.8rem;
  background: rgba(16, 18, 24, 0.8);
  border: 1px solid rgba(201, 164, 106, 0.25);
  margin: 0.4rem 0;
}

.spec-thumb {
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7));
}

.spec-asset-tag {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold-2);
}

.spec-heading {
  font-family: var(--serif);
  font-size: 1.25rem;
  margin: 0;
  color: var(--gold-2);
}

.spec-desc {
  font-family: var(--sans);
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--mute);
  margin: 0;
}

.spec-stack {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mint);
  padding-top: 0.6rem;
  border-top: 1px solid var(--hair);
}

/* FAQ Section */
.faq-section {
  margin-bottom: 4rem;
}

.faq-head {
  margin-bottom: 1.8rem;
}

.faq-title {
  font-family: var(--serif);
  font-size: 2rem;
  margin: 0.2rem 0 0;
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
}

.faq-card {
  padding: 1.4rem 1.6rem;
  background: rgba(16, 18, 24, 0.8);
  border: 1px solid var(--line);
}

.faq-q {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--gold-2);
}

.faq-a {
  font-family: var(--sans);
  font-size: 0.9rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--paper) 80%, var(--mute));
  font-weight: 300;
  margin: 0;
}

/* Custom Quote Banner */
.custom-quote-banner {
  background:
    linear-gradient(135deg, rgba(201, 164, 106, 0.15) 0%, rgba(22, 50, 38, 0.5) 100%),
    var(--ink-2);
  border: 1px solid rgba(201, 164, 106, 0.35);
  padding: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.quote-title {
  font-family: var(--serif);
  font-size: 1.6rem;
  margin: 0 0 0.35rem;
  color: var(--paper);
}

.quote-desc {
  font-family: var(--sans);
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--mute);
  margin: 0;
  max-width: 48rem;
}

.quote-btn {
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  white-space: nowrap;
  min-height: 48px;
  padding: 0 1.4rem;
}

.quote-btn:hover {
  background: var(--gold-2);
}

/* Mobile Responsiveness */
@media (max-width: 980px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .comparison-grid,
  .specs-grid,
  .faq-grid {
    grid-template-columns: 1fr;
  }
  .demo-banner-card.grand-showcase {
    flex-direction: column;
    align-items: stretch;
  }
  .banner-media.large-media {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
  .slot-image-wrap.large-slot-wrap {
    height: 240px;
  }
}

@media (max-width: 600px) {
  .shop-hero {
    gap: 0.8rem;
  }
  .demo-banner-card {
    padding: 1.4rem;
    gap: 1.5rem;
  }
  .banner-media.large-media {
    width: 100%;
    max-width: 100%;
  }
  .slot-image-wrap.large-slot-wrap {
    height: 200px;
  }
  .banner-actions {
    width: 100%;
  }
  .demo-launch-btn,
  .view-art-btn {
    width: 100%;
    justify-content: center;
  }
  .pricing-card {
    padding: 1.5rem 1.2rem;
  }
  .custom-quote-banner {
    padding: 1.5rem;
  }
  .quote-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
