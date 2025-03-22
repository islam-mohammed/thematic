<template>
  <header class="flex items-center justify-between bg-black text-white px-4 py-2">
    <!-- Left Section -->
    <div class="flex items-center space-x-4 text-xl font-bold tracking-widest uppercase">
      <span>THEMATIC</span>
    </div>

    <!-- Center: Search + Nav -->
    <div class="flex-1 flex items-center justify-center space-x-8">
      <SearchBar />
      <NavLinks />
    </div>

    <!-- Right Section -->
    <div class="flex items-center space-x-4 relative">
      <span class="text-pink-400 font-bold text-sm">0 Points</span>
      <UserMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import UserMenu from '@/components/UserMenu.vue'
import NavLinks from '@/components/ui/NavLinks.vue'
</script>
