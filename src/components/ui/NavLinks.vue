<template>
  <nav class="flex items-center space-x-6 text-sm">
    <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="hover:underline">
      {{ link.label }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { to: '/notfound', label: 'Discover' },
  { to: '/notfound', label: 'Songs' },
  { to: '/notfound', label: 'Playlists' },
]
</script>
