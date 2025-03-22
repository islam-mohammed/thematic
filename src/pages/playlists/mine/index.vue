<template>
  <DefaultLayout>
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold flex items-center gap-2">My Playlists</h1>

        <div class="text-sm text-gray-600 cursor-pointer flex items-center gap-1 hover:text-black">
          Sort by Newest
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <!-- Playlist Grid Component -->
      <PlaylistGrid />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import PlaylistGrid from '@/components/playlist/PlaylistGrid.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
