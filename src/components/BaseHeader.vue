<template>
  <header class="flex items-center justify-between bg-black text-white px-4 py-2">
    <!-- Left Section -->
    <div class="flex items-center space-x-4 text-xl font-bold tracking-widest uppercase">
      <span>THEMATIC</span>
    </div>

    <!-- Center: Search + Nav -->
    <div class="flex-1 flex items-center justify-center space-x-8">
      <SearchBar />
      <nav class="flex items-center space-x-6 text-sm">
        <RouterLink to="/notfound" class="hover:underline">Discover</RouterLink>
        <RouterLink to="/notfound" class="hover:underline">Songs</RouterLink>
        <RouterLink to="/notfound" class="hover:underline">Playlists</RouterLink>
      </nav>
    </div>

    <!-- Right Section -->
    <div class="flex items-center space-x-4 relative">
      <span class="text-pink-400 font-bold text-sm">0 Points</span>
      <!-- <FlyingIcon /> -->
      <UserMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SearchBar from './SearchBar.vue'
import UserMenu from './UserMenu.vue'
// import FlyingIcon from './FlyingIcon.vue'
</script>
