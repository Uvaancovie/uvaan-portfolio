<script setup lang="ts">
import { reactive } from 'vue'
import { profile } from '@/data/profile'

const form = reactive({
  name: '',
  email: '',
  track: 'iGaming',
  message: '',
})

function submit() {
  const subject = encodeURIComponent(`[${form.track}] ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <main class="section">
    <div class="wrap contact-grid">
      <div>
        <p class="kicker">Hire / collaborate</p>
        <h1 class="serif" style="font-size: clamp(2.4rem, 5vw, 4rem); margin: 0.3rem 0 1rem">
          Put me on a licensed floor.
        </h1>
        <p class="note">
          iGaming studios, FinTech teams, and .NET shops. Durban-based, remote-ready.
          I bring PixiJS clients, ASP.NET APIs, and the production habits of a company
          that actually ships product.
        </p>
        <ul class="contact-list">
          <li>
            <span>Email</span>
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          </li>
          <li>
            <span>Studio</span>
            <a :href="`mailto:${profile.studioEmail}`">{{ profile.studioEmail }}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a :href="profile.linkedin" target="_blank" rel="noreferrer">uvaan-covenden</a>
          </li>
          <li>
            <span>GitHub</span>
            <a :href="profile.github" target="_blank" rel="noreferrer">@{{ profile.githubUser }}</a>
          </li>
          <li>
            <span>X</span>
            <a :href="profile.x" target="_blank" rel="noreferrer">@WAY2FLYDIGITAL</a>
          </li>
        </ul>
      </div>
      <form @submit.prevent="submit">
        <label>
          Name
          <input v-model="form.name" required autocomplete="name" />
        </label>
        <label>
          Email
          <input v-model="form.email" type="email" required autocomplete="email" />
        </label>
        <label>
          Track
          <input v-model="form.track" />
        </label>
        <label>
          Message
          <textarea v-model="form.message" required />
        </label>
        <button class="btn" type="submit">Open mail</button>
      </form>
    </div>
  </main>
</template>
