<!-- src/components/UserFlyout.vue -->
<template>
  <div v-if="visible" class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-4">
    <h2 class="text-xl font-bold">User Info</h2>
    <button @click="switchProject">Switch Project</button>
    <ul>
      <li v-for="link in otherLinks" :key="link">
        <RouterLink :to="link">Link</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const visible = ref(true)
const router = useRouter()
const otherLinks = ['/broken1', '/broken2']

function switchProject() {
  sessionStorage.setItem('active_project', 'project_id_123')
  router.push('/switch-project')
}
</script>
