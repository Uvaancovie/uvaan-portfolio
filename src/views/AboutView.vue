<script setup lang="ts">
import { profile, timeline } from '@/data/profile'
</script>

<template>
  <main class="section">
    <div class="wrap about-hero">
      <div class="portrait">
        <img :src="profile.avatar" :alt="profile.name" />
      </div>
      <div>
        <p class="kicker">{{ profile.age }} · {{ profile.location }}</p>
        <h1>When I am doing iGaming, I am in a flow state — it is the only niche where I can be my most creative.</h1>
        <p>
          LinkedIn is gated to scrapers, so this site is built from the public record:
          GitHub <b style="color: var(--gold-2)">@{{ profile.githubUser }}</b>, the SAFS
          catalog, and the iGaming / .NET repos I actually commit to. I am {{ profile.age }},
          based in Durban, holding a {{ profile.degree }}, currently {{ profile.role }} at
          {{ profile.employer }}.
        </p>
        <p>
          Day job is enterprise commerce — caskets, inventory, APIs, newsletters. Night and
          studio work is the path I want hired for: iGaming development, FinTech ledgers,
          ASP.NET backends, and PixiJS cabinet design. {{ profile.studio }} is the name I
          ship client work under.
        </p>
      </div>
    </div>

    <div class="wrap" style="margin-top: 3.5rem">
      <p class="kicker">Path</p>
      <div class="timeline">
        <article v-for="item in timeline" :key="item.title" class="time-row">
          <p class="kicker" style="margin: 0">{{ item.period }}</p>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>
