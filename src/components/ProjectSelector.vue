<template>
  <div class="relative">
    <!-- Toggle Button -->
    <button @click="toggle" class="flex items-center space-x-2 group">
      <!-- Project Thumbnail or Initial -->
      <div class="w-10 h-10 border border-yellow-400 rounded-full overflow-hidden flex-shrink-0">
        <img
          v-if="selectedProject?.thumbnail_art_file_url"
          :src="selectedProject.thumbnail_art_file_url"
          class="w-full h-full object-cover"
          alt="Project Thumbnail"
        />
        <div
          v-else
          class="w-full h-full bg-yellow-600 text-white flex items-center justify-center text-sm font-bold"
        >
          {{ selectedProject?.name?.charAt(0).toUpperCase() || 'P' }}
        </div>
      </div>

      <!-- Project Info -->
      <div class="text-left text-white">
        <div class="text-sm font-semibold truncate max-w-[120px]">
          {{ selectedProject?.name }}
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-300">
          <svg class="w-4 h-4 fill-red-500" viewBox="0 0 24 24">
            <path
              d="M10 15l5.19-3L10 9v6zm12-3c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"
            />
          </svg>
          {{ selectedProject?.youtube_stats?.subscribers || '36,000' }} Subscribers
        </div>
      </div>
    </button>

    <!-- Dropdown -->
    <Transition name="fade-slide">
      <div
        v-if="open"
        class="absolute right-0 mt-3 w-72 bg-black text-white rounded-md shadow-xl z-50 p-4"
      >
        <!-- Project Info -->
        <div class="text-right text-xs text-gray-300 mb-2">
          {{ selectedProject?.name }}
        </div>

        <!-- Avatar -->
        <div class="flex flex-col items-center mb-4">
          <div
            class="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center text-2xl font-bold"
          >
            {{ selectedProject?.name?.charAt(0).toUpperCase() }}
          </div>
          <button class="text-sm mt-2 text-white underline flex items-center gap-1">
            View Channel
          </button>
        </div>

        <!-- Switch Project Dropdown -->
        <ProjectSelector />

        <hr class="border-gray-600 my-4" />

        <!-- Menu Items -->
        <ul class="space-y-3 text-sm">
          <RouterLink
            v-for="item in menu"
            :key="item.label"
            :to="item.to"
            class="block hover:text-gray-300 cursor-pointer transition ease-in-out"
          >
            {{ item.label }}
          </RouterLink>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { RouterLink } from 'vue-router'
import ProjectSelector from '@/components/ProjectSelector.vue'

const store = useSessionStore()

const open = ref(false)
const toggle = () => (open.value = !open.value)

const selectedProject = computed(() => store.projects.find((p) => p.id === store.activeProjectId))

const menu = [
  { label: 'Licenses & Downloads', to: '/notfound' },
  { label: 'My Playlists', to: '/notfound' },
  { label: 'Trackfluencer', to: '/notfound' },
  { label: 'Your Points', to: '/notfound' },
  { label: 'Settings', to: '/notfound' },
  { label: 'Logout', to: '/logout' },
]
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
