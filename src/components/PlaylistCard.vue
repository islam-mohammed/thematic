<template>
  <div
    class="rounded-md border shadow-sm hover:shadow-md transition overflow-hidden bg-white cursor-pointer group relative"
  >
    <!-- Hover Overlay with View Button -->
    <div
      class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
    >
      <button
        class="text-white border border-blue-500 px-4 py-1 rounded text-sm font-semibold hover:bg-blue-500 hover:text-white transition"
        @click.stop="goToProject(project.id)"
      >
        View Playlist
      </button>
    </div>

    <!-- Thumbnails -->
    <div class="grid grid-cols-2 gap-px">
      <div v-for="n in 4" :key="n" class="h-20 bg-gray-100">
        <img
          v-if="project.thumbnail_art_file_url"
          :src="project.thumbnail_art_file_url"
          alt="Project Thumbnail"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Info -->
    <div class="p-3">
      <div class="flex justify-between items-center">
        <h2 class="text-sm font-medium truncate">
          {{ project.name }}
        </h2>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" checked class="sr-only peer" />
          <div
            class="w-10 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full peer relative transition"
          >
            <div
              class="absolute left-1 top-1 bg-white w-3 h-3 rounded-full peer-checked:translate-x-5 transition"
            ></div>
          </div>
        </label>
      </div>
      <p class="text-xs text-gray-500 mt-1">{{ project.project_songs_count || 0 }} Songs</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Playlist } from '@/types'

defineProps<{ project: Playlist }>()
const router = useRouter()

function goToProject(id: number) {
  router.push(`/playlists/${id}`)
}
</script>
