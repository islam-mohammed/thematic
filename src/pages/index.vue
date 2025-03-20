<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Login with Access Token</h1>
    <input
      v-model="token"
      placeholder="Enter Access Token"
      class="border px-4 py-2 w-full mb-4 rounded"
    />
    <button @click="login" class="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLoginWithToken } from '@/composables/useLogin'
import { useRouter } from 'vue-router/auto'
import { useSessionStore } from '@/stores/session'

const token = ref('')
const router = useRouter()

const session = useSessionStore();


onMounted(() => {
  if (session.token && session.user && session.projects.length) {
    router.push('/playlists')
  }
})


async function login() {
  try {
    await useLoginWithToken(token.value)
    router.push('/playlists') // ✅ redirect after login
  } catch (e: any) {
    alert(e.message)
  }
}
</script>
