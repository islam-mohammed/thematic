<template>
  <DefaultLayout>
    <div class="p-4 max-w-5xl mx-auto">
      <!-- Return Link -->
      <router-link
        to="/playlists/mine"
        class="flex items-center text-sm text-gray-600 hover:text-black mb-4"
      >
        ← Return to My Playlists
      </router-link>

      <!-- Playlist Header Component -->
      <PlaylistHeader :playlist="currentProject" @toggle-public="togglePublic" />

      <!-- Empty State -->
      <div v-if="songs.length === 0" class="text-center py-20">
        <p class="text-2xl font-semibold mb-8">You haven't added any songs to this playlist yet!</p>
        <RouterLink
          to="/notfound"
          class="border px-5 py-2 rounded hover:bg-gray-100 transition text-sm"
        >
          Browse Songs
        </RouterLink>
      </div>

      <!-- Draggable List -->
      <draggable
        v-else
        v-model="songs"
        item-key="id"
        tag="div"
        :component-data="{ on: { end: onDragEnd } }"
      >
        <template #item="{ element: song, index }">
          <div class="flex justify-between items-center py-4 border-b group mt-16">
            <!-- Song Details -->
            <div class="flex items-center gap-4">
              <img
                :src="song.album_art_thumbnail_url"
                alt="Song"
                class="w-12 h-12 object-cover rounded shadow-sm"
              />
              <div>
                <p class="font-semibold">{{ song.name }}</p>
                <p class="text-sm text-gray-500">{{ song.artist_name }}</p>
              </div>
            </div>

            <!-- Date / Duration / Delete -->
            <div class="flex items-center gap-6 text-sm text-gray-600">
              <span>{{ formatDate(song.created_at) }}</span>
              <span>{{ song.duration }}</span>
              <button
                @click="handleRemove(song.id, index)"
                class="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PlaylistHeader from '@/components/PlaylistHeader.vue'
import { useSessionStore } from '@/stores/session'
import { useSongs } from '@/composables/useSongs'
import draggable from 'vuedraggable'

const route = useRoute()
const store = useSessionStore()
const projectId = Number(route.params.id)
const { removeSong } = useSongs(projectId.toString())

const songs = ref<any[]>([])
const currentProject = computed(() => store.projects.find((p) => p.id === projectId))

onMounted(() => {
  if (currentProject.value) {
    songs.value = [...(currentProject.value.songs || [])]
  }
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function onDragEnd() {
  const project = store.projects.find((p) => p.id === projectId)
  if (project) {
    project.songs = [...songs.value]
    store.setProjects([...store.projects])
  }
}

async function handleRemove(songId: string, index: number) {
  try {
    const res = await removeSong(songId)
    if (!res.error) {
      songs.value.splice(index, 1)
      const i = store.projects.findIndex((p) => p.id === projectId)
      if (i !== -1) {
        const updatedProject = {
          ...store.projects[i],
          songs: [...songs.value],
        }
        store.projects.splice(i, 1, updatedProject)
        store.setProjects([...store.projects])
      }
    }
  } catch (e) {
    console.error('Unexpected error:', e)
  }
}

function togglePublic(newVal: boolean) {
  if (currentProject.value) {
    currentProject.value.public = newVal
    store.setProjects([...store.projects])
  }
}
</script>
