<template>
  <DefaultLayout>
    <div class="p-4">
      <h1 class="text-xl font-semibold mb-4">Project Songs</h1>
      <draggable
        v-model="songs"
        item-key="id"
        tag="div"
        :component-data="{ on: { end: onDragEnd } }"
      >
        <template #item="{ element: song, index }">
          <div class="flex items-center justify-between py-2 border-b group">
            <!-- Song / Artist Section -->
            <div class="flex items-center gap-3">
              <img
                :src="song.album_art_thumbnail_url"
                class="w-12 h-12 object-cover rounded shadow-sm"
                alt="Song Art"
              />
              <div>
                <p class="font-semibold">{{ song.name }}</p>
                <p class="text-sm text-gray-500">{{ song.artist_name }}</p>
              </div>
            </div>

            <!-- Date / Duration / Delete -->
            <div class="text-sm text-gray-600 flex gap-8 items-center">
              <span>{{ formatDate(song.created_at) }}</span>
              <span>{{ song.duration }}</span>

              <!-- Delete Icon -->
              <span
                @click="handleRemove(song.id, index)"
                class="text-red-400 hover:text-red-600 cursor-pointer"
                title="Delete Song"
              >
                <span class="material-icons">delete</span>
              </span>
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
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(dateStr).toLocaleDateString(undefined, options)
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

      const projectIndex = store.projects.findIndex((p) => p.id === projectId)
      if (projectIndex !== -1) {
        const updatedProject = {
          ...store.projects[projectIndex],
          songs: [...songs.value],
        }

        store.projects.splice(projectIndex, 1, updatedProject)
        store.setProjects([...store.projects])
      }
    } else {
      console.error('Failed to delete song:', res.error)
    }
  } catch (e) {
    console.error('Unexpected error:', e)
  }
}
</script>

<style scoped>
.material-icons {
  font-size: 20px;
}
</style>
