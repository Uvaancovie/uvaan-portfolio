<script setup lang="ts">
import { ref } from 'vue'
import { profile } from '@/data/profile'

const copied = ref(false)

function copyPhone() {
  navigator.clipboard.writeText('0810404713')
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2200)
}

interface QuickTopic {
  label: string
  tag: string
  message: string
}

const quickTopics: QuickTopic[] = [
  {
    label: 'iGaming & Slot Cabinet Project',
    tag: 'iGaming',
    message: 'Hi Uvaan, I saw your Eye of Ra and Covies Slots work and would like to discuss an iGaming cabinet project.',
  },
  {
    label: '.NET & ASP.NET Core Backend',
    tag: '.NET API',
    message: 'Hi Uvaan, I am looking for a C# / ASP.NET Core developer for an enterprise backend / API system.',
  },
  {
    label: 'FinTech & Payment Gateway Integration',
    tag: 'FinTech',
    message: 'Hi Uvaan, I would like to discuss payment gateway integration (Ozow / PayFast) and transaction ledgers.',
  },
  {
    label: 'Full-Time Role / Studio Contract',
    tag: 'Career',
    message: 'Hi Uvaan, I would like to discuss a role / contract opportunity with your studio.',
  },
]

function getWhatsAppUrl(customText?: string): string {
  const text = customText ?? "Hi Uvaan, I saw your portfolio and would like to connect."
  return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(text)}`
}
</script>

<template>
  <main class="section contact-page">
    <div class="wrap contact-layout">
      <!-- Left Column: Context & Direct Channels -->
      <div class="contact-intro">
        <p class="kicker">Direct Contact / Developer Line</p>
        <h1 class="serif contact-headline">
          Let's talk directly on WhatsApp.
        </h1>
        <p class="note contact-lead">
          No slow email forms or ticket queues. Connect directly with me on WhatsApp for immediate discussion on iGaming cabinets, .NET backends, and FinTech architecture.
        </p>

        <!-- Channel Breakdown -->
        <ul class="contact-list">
          <li class="contact-item highlight-item">
            <div class="item-meta">
              <span class="item-label">Direct WhatsApp</span>
              <span class="item-val phone-val">{{ profile.phone }}</span>
            </div>
            <a
              id="link-whatsapp-direct"
              class="btn-sm whatsapp-badge-btn"
              :href="getWhatsAppUrl()"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Chat Now</span>
              <span>↗</span>
            </a>
          </li>

          <li class="contact-item">
            <div class="item-meta">
              <span class="item-label">Personal Email</span>
              <a class="item-val" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            </div>
          </li>

          <li class="contact-item">
            <div class="item-meta">
              <span class="item-label">Studio Email</span>
              <a class="item-val" :href="`mailto:${profile.studioEmail}`">{{ profile.studioEmail }}</a>
            </div>
          </li>

          <li class="contact-item">
            <div class="item-meta">
              <span class="item-label">LinkedIn</span>
              <a class="item-val" :href="profile.linkedin" target="_blank" rel="noreferrer">
                uvaan-covenden
              </a>
            </div>
          </li>

          <li class="contact-item">
            <div class="item-meta">
              <span class="item-label">GitHub</span>
              <a class="item-val" :href="profile.github" target="_blank" rel="noreferrer">
                @{{ profile.githubUser }}
              </a>
            </div>
          </li>

          <li class="contact-item">
            <div class="item-meta">
              <span class="item-label">Location</span>
              <span class="item-val text-muted">{{ profile.location }} (SAST / UTC+2)</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Right Column: WhatsApp Direct Hub -->
      <div class="whatsapp-hub-card">
        <!-- Card Header -->
        <div class="hub-header">
          <div class="hub-status-row">
            <span class="live-dot pulse"></span>
            <span class="hub-status-text">Direct Line Active</span>
            <span class="hub-location-tag">Durban, SA</span>
          </div>
          <h2 class="hub-title">Instant WhatsApp Contact</h2>
          <p class="hub-phone-display">{{ profile.phone }}</p>
        </div>

        <!-- Primary Action Buttons -->
        <div class="hub-cta-block">
          <a
            id="btn-whatsapp-primary"
            class="btn whatsapp-primary-btn"
            :href="getWhatsAppUrl()"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="wa-icon">💬</span>
            <span class="wa-label">Start WhatsApp Chat</span>
            <span class="wa-arrow">↗</span>
          </a>

          <button
            id="btn-copy-phone"
            type="button"
            class="btn ghost copy-phone-btn"
            @click="copyPhone"
          >
            <span>{{ copied ? '✓ Number Copied (0810404713)' : '📋 Copy Phone Number' }}</span>
          </button>
        </div>

        <!-- Pre-filled Quick Topic Prompts -->
        <div class="quick-topics-section">
          <div class="topics-header">
            <span class="topics-title">One-Tap Conversation Starters</span>
            <span class="topics-subtitle">Click to open with pre-filled message</span>
          </div>

          <div class="topics-list">
            <a
              v-for="topic in quickTopics"
              :id="`wa-topic-${topic.tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`"
              :key="topic.label"
              class="topic-card"
              :href="getWhatsAppUrl(topic.message)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="topic-top">
                <span class="topic-tag">{{ topic.tag }}</span>
                <span class="topic-arrow">↗</span>
              </div>
              <span class="topic-label">{{ topic.label }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Summary Note -->
        <div class="hub-footer-note">
          <span class="note-bullet">⚡</span>
          <span>Usually replies within minutes during South African business hours. Available for remote or on-site discussions.</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page {
  padding-top: 3.5rem;
  padding-bottom: 5rem;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 3rem;
  align-items: start;
}

.contact-intro {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact-headline {
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  line-height: 1;
  margin: 0.2rem 0 0.5rem;
  color: var(--paper);
}

.contact-lead {
  max-width: 48ch;
  line-height: 1.6;
  font-size: 0.98rem;
  margin-bottom: 0.8rem;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--line);
}

.contact-item.highlight-item {
  border-bottom: 1px solid var(--gold);
  background: rgba(201, 164, 106, 0.05);
  padding: 0.9rem 0.8rem;
  margin: 0 -0.8rem;
}

.item-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.item-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mute);
}

.item-val {
  font-family: var(--sans);
  font-size: 0.95rem;
  color: var(--paper);
  font-weight: 400;
  transition: color 0.2s ease;
}

a.item-val:hover {
  color: var(--gold-2);
  text-decoration: underline;
}

.phone-val {
  font-family: var(--mono);
  font-weight: 600;
  color: var(--gold-2);
  font-size: 1.05rem;
}

.text-muted {
  color: var(--mute);
}

.btn-sm.whatsapp-badge-btn {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--gold);
  color: var(--ink);
  padding: 0.35rem 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: background-color 0.2s ease;
}

.btn-sm.whatsapp-badge-btn:hover {
  background: var(--gold-2);
}

/* WhatsApp Hub Card */
.whatsapp-hub-card {
  background:
    linear-gradient(165deg, rgba(22, 50, 38, 0.55) 0%, rgba(16, 18, 24, 0.85) 40%, rgba(8, 9, 12, 0.98) 100%),
    var(--ink-2);
  border: 1px solid var(--gold);
  padding: 2.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.5), 0 0 35px rgba(201, 164, 106, 0.1);
}

.whatsapp-hub-card::after {
  content: '';
  position: absolute;
  inset: -30% -30% auto auto;
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle, rgba(141, 255, 201, 0.12), transparent 70%);
  pointer-events: none;
}

.hub-header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
  z-index: 1;
}

.hub-status-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 10px var(--mint);
}

.live-dot.pulse {
  animation: pulse-dot 2s infinite ease-in-out;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
}

.hub-status-text {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mint);
  font-weight: 500;
}

.hub-location-tag {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
  margin-left: auto;
}

.hub-title {
  font-family: var(--sans);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--paper);
  margin: 0.2rem 0 0;
}

.hub-phone-display {
  font-family: var(--mono);
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 600;
  color: var(--gold-2);
  margin: 0;
  letter-spacing: 0.05em;
}

/* Primary CTA block */
.hub-cta-block {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.whatsapp-primary-btn {
  background: #25d366;
  color: #08090c;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid #25d366;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.4rem;
  flex: 1.3;
  justify-content: center;
  transition: all 0.2s ease;
}

.whatsapp-primary-btn:hover {
  background: #20ba5a;
  border-color: #20ba5a;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35);
}

.wa-icon {
  font-size: 1.15rem;
  line-height: 1;
}

.copy-phone-btn {
  flex: 1;
  justify-content: center;
  font-size: 0.85rem;
}

/* Quick Topics Section */
.quick-topics-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
  padding-top: 0.8rem;
  border-top: 1px solid var(--hair);
}

.topics-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topics-title {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-2);
  font-weight: 500;
}

.topics-subtitle {
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--mute);
}

.topics-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.topic-card {
  background: rgba(8, 9, 12, 0.7);
  border: 1px solid var(--line);
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.topic-card:hover {
  border-color: var(--gold);
  background: rgba(22, 26, 35, 0.95);
  transform: translateY(-2px);
}

.topic-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-tag {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(201, 164, 106, 0.12);
  padding: 0.1rem 0.4rem;
}

.topic-arrow {
  color: var(--mute);
  font-size: 0.85rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.topic-card:hover .topic-arrow {
  color: var(--gold-2);
  transform: translate(2px, -2px);
}

.topic-label {
  font-family: var(--sans);
  font-size: 0.85rem;
  line-height: 1.35;
  color: var(--paper);
  font-weight: 400;
}

/* Footer note */
.hub-footer-note {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--mute);
  line-height: 1.45;
  padding-top: 0.6rem;
  border-top: 1px solid var(--hair);
  position: relative;
  z-index: 1;
}

.note-bullet {
  color: var(--gold);
}

@media (max-width: 920px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .whatsapp-hub-card {
    padding: 1.8rem 1.6rem;
  }
  .topics-list {
    grid-template-columns: 1fr;
  }
}
</style>
