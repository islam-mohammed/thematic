<template>
  <div
    class="rounded-md border shadow-sm hover:shadow-md transition overflow-hidden bg-white cursor-pointer group relative"
  >
    <!-- Thumbnails with hover overlay -->
    <div class="relative group/thumb">
      <div
        class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition z-10"
      >
        <button
          class="text-white border border-blue-500 px-4 py-1 rounded text-sm font-semibold hover:bg-blue-500 hover:text-white transition"
          @click.stop="goToProject(project.id)"
        >
          View Playlist
        </button>
      </div>

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
    </div>

    <!-- Info -->
    <div class="p-3">
      <div class="flex justify-between items-center">
        <h2 class="text-sm font-medium truncate">
          {{ project.name }}
        </h2>

        <!-- Switch -->
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="isEnabled" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"
          ></div>
          <div
            class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform peer-checked:translate-x-5"
          ></div>
        </label>
      </div>

      <p class="text-xs text-gray-500 mt-1">{{ project.project_songs_count || 0 }} Songs</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Playlist } from '@/types'
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'
const store = useSessionStore()

const { project } = defineProps<{ project: Playlist }>()
const isEnabled = computed({
  get: () => project.public,
  set: (val: boolean) => {
    store.toggleProjectPublic(project.id, val)
  },
})

const router = useRouter()

function goToProject(id: number) {
  router.push(`/playlists/${id}`)
}
</script>
