<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import TechnicalExpertise from '@/components/TechnicalExpertise.vue'
import { projects, tracks, stackGroups } from '@/data/profile'
</script>

<template>
  <main>
    <HeroSection />

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="kicker">01 / Tracks</p>
            <h2>Where the work is going.</h2>
          </div>
        </div>
        <div class="tracks">
          <article v-for="track in tracks" :key="track.id" class="track">
            <p class="kicker">{{ track.id }}</p>
            <h3>{{ track.label }}</h3>
            <p>{{ track.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Technical Expertise & Architecture Deep Dive -->
    <TechnicalExpertise />

    <section class="section" style="padding-top: 3.5rem">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="kicker">02 / Work</p>
            <h2>Selected cases.</h2>
          </div>
          <router-link class="btn ghost" to="/work">View full archive</router-link>
        </div>
        <div class="project-grid">
          <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
        </div>
      </div>
    </section>

    <section class="split">
      <article>
        <p class="kicker">03 / Backend</p>
        <h2>.NET that replaces glue.</h2>
        <p>
          ASP.NET Core, SQL Server, Razor Pages. Funeral catalog APIs, RAF case desks,
          municipality services. I want the same stack behind wallets, session authority,
          and operator tooling — not another Express demo.
        </p>
      </article>
      <article>
        <p class="kicker">04 / Design</p>
        <h2>Cabinets, not mockups.</h2>
        <p>
          PixiJS reels, symbol language, print and signage literacy from Pro Graphics.
          The studio page on this site is a live engine, not a screenshot. Click it.
        </p>
      </article>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="kicker">05 / Stack</p>
            <h2>Tools I actually ship with.</h2>
          </div>
        </div>
        <div class="stack-grid">
          <div v-for="group in stackGroups" :key="group.title" class="stack-card">
            <h3>{{ group.title }}</h3>
            <ul>
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
