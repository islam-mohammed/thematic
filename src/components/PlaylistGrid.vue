<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    <PlaylistCard v-for="project in store.projects" :key="project.id" :project="project" />
    <AddNewCard />
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import PlaylistCard from './PlaylistCard.vue'
import AddNewCard from './AddNewCard.vue'

const store = useSessionStore()
</script>
