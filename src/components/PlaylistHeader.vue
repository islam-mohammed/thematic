<template>
  <div class="bg-white rounded-xl shadow p-6 flex gap-6 items-start max-w-5xl mx-auto">
    <!-- Thumbnail -->
    <img
      :src="playlist.thumbnail_art_file_url"
      alt="Thumbnail"
      class="w-48 h-48 object-cover rounded bg-gray-100"
    />

    <!-- Content -->
    <div class="flex-1">
      <h2 class="text-sm text-gray-500 uppercase mb-1">Playlist</h2>

      <!-- Playlist Name + Edit -->
      <div class="flex items-center gap-2 text-3xl font-bold">
        {{ playlist.name }}
        <button class="text-gray-500 hover:text-blue-500 text-base" title="Edit playlist name">
          ✏️
        </button>
      </div>

      <!-- Song Count -->
      <p class="text-sm text-gray-600 mt-1">
        {{ playlist.project_songs_count || 0 }}
        {{ playlist.project_songs_count === 1 ? 'song' : 'songs' }}
      </p>

      <!-- Description -->
      <p class="text-sm text-gray-500 italic mt-4">
        {{
          playlist.description ||
          'This test playlist from Islam Elbastaweesy features the best copyright-free songs for YouTube videos, social media, and podcasts.'
        }}
      </p>

      <a href="#" class="text-xs text-blue-500 mt-1 inline-block">Add Description</a>

      <!-- Public Toggle -->
      <div class="mt-6 flex items-center gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="localPublic" class="sr-only" />
          <div
            class="w-10 h-5 bg-gray-300 rounded-full relative transition-all duration-300"
            :class="{ 'bg-green-500': localPublic }"
          >
            <div
              class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300"
              :class="{ 'translate-x-5': localPublic }"
            ></div>
          </div>
          <span class="text-sm font-medium text-gray-700">
            {{ localPublic ? 'Public' : 'Private' }}
          </span>
        </label>

        <span class="text-sm italic text-gray-500 flex items-center gap-1">
          Inspire Others ✨
        </span>
      </div>
    </div>

    <!-- Share Button -->
    <button
      class="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm mt-1"
    >
      Share
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Playlist } from '@/types'

const props = defineProps<{ playlist: Playlist }>()
const emit = defineEmits(['toggle-public'])

const localPublic = ref(props.playlist.public)

watch(localPublic, (newVal) => {
  emit('toggle-public', newVal)
})
</script>
