<script setup lang="ts">
import PixiStage from '@/components/PixiStage.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { profile, projects, tracks, stackGroups } from '@/data/profile'

const featured = projects.slice(0, 5)
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-canvas">
        <PixiStage />
      </div>
      <div class="hero-copy wrap">
        <p class="kicker">{{ profile.location }} · {{ profile.role }}</p>
        <h1>Uvaan<br /><em>Covenden</em></h1>
        <p class="hero-lead">
          I build the systems behind the spin — PixiJS cabinets, ASP.NET APIs, and
          product UI with the same discipline I use on a live warehouse catalog.
          iGaming, FinTech, and .NET are the floor I am advancing onto.
        </p>
        <div class="hero-meta">
          <span><b>Now</b> {{ profile.employer }}</span>
          <span><b>Studio</b> {{ profile.studio }}</span>
          <span><b>Degree</b> {{ profile.degree }}</span>
        </div>
        <div class="cta-row">
          <router-link class="btn" to="/studio">Spin the floor</router-link>
          <router-link class="btn ghost" to="/work">Selected work</router-link>
        </div>
      </div>
    </section>

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

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="kicker">02 / Work</p>
            <h2>Selected cases.</h2>
          </div>
          <router-link class="btn ghost" to="/work">All projects</router-link>
        </div>
        <div class="project-grid">
          <ProjectCard :project="featured[0]" featured />
          <ProjectCard v-for="project in featured.slice(1)" :key="project.slug" :project="project" />
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
