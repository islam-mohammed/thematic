<template>
  <div class="relative">
    <!-- MAIN USER BUTTON (Project Avatar + Info) -->
    <button @click="toggleUserMenu" class="flex items-center space-x-2 group">
      <div class="w-10 h-10 border border-yellow-400 rounded-full overflow-hidden flex-shrink-0">
        <img
          v-if="selectedProject?.thumbnail_art_file_url"
          :src="selectedProject.thumbnail_art_file_url"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full bg-yellow-600 text-white flex items-center justify-center text-sm font-bold"
        >
          {{ selectedProject?.name?.charAt(0).toUpperCase() || 'P' }}
        </div>
      </div>

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

    <!-- USER MENU DROPDOWN -->
    <Transition name="fade-slide">
      <div
        v-if="userMenuOpen"
        class="absolute right-0 mt-3 w-72 bg-black text-white rounded-md shadow-xl z-50 p-4"
      >
        <!-- Project Name -->
        <div class="text-right text-xs text-gray-300 mb-2">
          {{ selectedProject?.user.profile_name }}
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

        <!-- Switch Project (Opens second flyout) -->
        <button
          @click="openProjectSelector"
          class="bg-white text-black px-4 py-1 rounded-md font-semibold text-sm mb-2 hover:bg-gray-100 w-full"
        >
          Switch Project
        </button>

        <hr class="border-gray-600 my-4" />

        <!-- Menu Links -->
        <ul class="space-y-3 text-sm">
          <RouterLink
            v-for="item in menu"
            :key="item.label"
            :to="item.to"
            class="block hover:text-gray-300 cursor-pointer transition ease-in-out"
          >
            {{ item.label }}
          </RouterLink>
          <button
            @click="store.logout"
            class="block hover:text-gray-300 cursor-pointer transition ease-in-out"
          >
            Logout
          </button>
        </ul>
      </div>
    </Transition>

    <!-- PROJECT SWITCHER DROPDOWN -->
    <Transition name="fade-slide">
      <div
        v-if="projectMenuOpen"
        class="absolute right-0 mt-3 w-72 bg-gray-900 text-white rounded-md shadow-xl z-50 p-4"
      >
        <div class="text-sm font-semibold mb-3">Select a Project</div>
        <ul class="space-y-2 max-h-64 overflow-y-auto">
          <li
            v-for="project in store.projects"
            :key="project.id"
            @click="selectProject(project.id)"
            class="px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-sm"
            :class="{ 'bg-gray-700': project.id === store.activeProjectId }"
          >
            {{ project.name }}
          </li>
        </ul>
        <button
          @click="closeProjectSelector"
          class="mt-4 w-full text-xs text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const store = useSessionStore()

const userMenuOpen = ref(false)
const projectMenuOpen = ref(false)

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
  if (projectMenuOpen.value) projectMenuOpen.value = false
}

const openProjectSelector = () => {
  userMenuOpen.value = false
  projectMenuOpen.value = true
}

const closeProjectSelector = () => {
  projectMenuOpen.value = false
}

const selectProject = (id: number) => {
  store.setActiveProject(id)
  closeProjectSelector()
}

const selectedProject = computed(() => store.projects.find((p) => p.id === store.activeProjectId))

const menu = [
  { label: 'Licenses & Downloads', to: '/notfound' },
  { label: 'My Playlists', to: '/playlists/mine' },
  { label: 'Trackfluencer', to: '/notfound' },
  { label: 'Your Points', to: '/notfound' },
  { label: 'Settings', to: '/notfound' },
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
