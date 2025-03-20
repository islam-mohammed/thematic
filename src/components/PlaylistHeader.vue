<template>
  <div class="bg-white rounded-xl shadow p-6 mb-8 max-w-4xl mx-auto">
    <!-- Top Section -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <!-- Thumbnail -->
      <div
        class="w-40 h-40 border rounded overflow-hidden bg-gray-100 flex items-center justify-center"
      >
        <img
          v-if="playlist?.thumbnail_art_file_url"
          :src="playlist.thumbnail_art_file_url"
          alt="Thumbnail"
          class="w-full h-full object-cover"
        />
        <span v-else class="text-gray-400 text-sm">No Image</span>
      </div>

      <!-- Details -->
      <div class="flex-1">
        <!-- Title -->
        <div class="flex items-center gap-2 text-2xl font-bold">
          <template v-if="isEditingTitle">
            <input
              v-model="editedTitle"
              class="text-xl font-semibold border-b border-gray-400 outline-none px-1 py-0.5"
            />
            <button
              @click="saveTitle"
              class="ml-2 bg-black text-white text-sm px-3 py-1 rounded shadow"
            >
              Save
            </button>
            <button @click="cancelEditTitle" class="text-sm text-gray-500 ml-1">Cancel</button>
          </template>
          <template v-else>
            {{ playlist.name }}
            <button @click="isEditingTitle = true" class="text-sm text-gray-500">✏️</button>
          </template>
        </div>

        <div class="text-sm text-gray-500 mt-1">
          {{ playlist.project_songs_count || 0 }}
          {{ playlist.project_songs_count === 1 ? 'song' : 'songs' }}
        </div>

        <!-- Static & Custom Description -->
        <div class="mt-2 text-sm italic text-gray-600">
          <p>
            This {{ playlist.name }} playlist from {{ user?.profile_name }} features the best
            copyright-free songs for YouTube videos, social media, and podcasts.
          </p>

          <template v-if="isEditingDescription">
            <input
              v-model="editedDescription"
              class="border-b border-gray-400 outline-none mt-2 w-full px-1 py-0.5"
              placeholder="Enter description..."
            />
            <div class="mt-2">
              <button
                @click="saveDescription"
                class="bg-black text-white text-sm px-3 py-1 rounded shadow"
              >
                Save
              </button>
              <button @click="cancelEditDescription" class="text-sm text-gray-500 ml-2">
                Cancel
              </button>
            </div>
          </template>
          <template v-else>
            <p class="mt-2" v-if="playlist.description">
              {{ playlist.description }}
              <button @click="isEditingDescription = true" class="text-sm text-gray-500 ml-2">
                ✏️
              </button>
            </p>
            <button
              v-else
              @click="isEditingDescription = true"
              class="text-sm text-blue-500 hover:underline mt-2"
            >
              Add Description
            </button>
          </template>
        </div>

        <!-- Public Toggle -->
        <div class="mt-4 flex items-center gap-2 text-sm font-medium">
          <span>Public</span>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="isPublic"
              class="sr-only"
              @change="updatePublicStatus"
            />
            <div
              class="relative w-10 h-5 bg-gray-300 rounded-full transition peer-checked:bg-green-500"
            >
              <div
                class="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"
              ></div>
            </div>
          </label>
          <span class="italic text-gray-500">Inspire Others ✨</span>
        </div>
      </div>

      <!-- Share Button -->
      <div>
        <button class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded">
          Share
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Playlist } from '@/types'
import { useSessionStore } from '@/stores/session'
import { usePlaylistDetails } from '@/composables/usePlaylistDetails'

const props = defineProps<{ playlist: Playlist }>()

const store = useSessionStore()
const user = computed(() => store.user)

const editedTitle = ref(props.playlist.name)
const editedDescription = ref(props.playlist.description || '')
const isEditingTitle = ref(false)
const isEditingDescription = ref(false)
const isPublic = ref(!!props.playlist.public)

const { updatePlaylist } = usePlaylistDetails(String(props.playlist.id))

const saveTitle = async () => {
  const { data, error } = await updatePlaylist(editedTitle.value, props.playlist.description || '')
  if (!error && data) {
    store.updateProject(data)
    isEditingTitle.value = false
  }
}

const saveDescription = async () => {
  const { data, error } = await updatePlaylist(props.playlist.name, editedDescription.value)
  if (!error && data) {
    store.updateProject(data)
    isEditingDescription.value = false
  }
}

async function updatePublicStatus() {
  await updatePlaylist(props.playlist.name, props.playlist.description || '')
  store.rehydrate()
}

function cancelEditTitle() {
  isEditingTitle.value = false
  editedTitle.value = props.playlist.name
}

function cancelEditDescription() {
  isEditingDescription.value = false
  editedDescription.value = props.playlist.description || ''
}
</script>
