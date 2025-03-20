<template>
  <div class="relative flex items-center rounded-full bg-white w-full max-w-sm shadow">
    <!-- Search Input -->
    <input
      v-model="query"
      type="text"
      placeholder="Search"
      class="flex-1 px-4 py-2 text-sm text-black placeholder-gray-400 outline-none bg-transparent"
      @keydown.enter="submit"
    />

    <!-- Type Dropdown -->
    <div class="relative">
      <button
        @click="toggleDropdown"
        class="flex items-center text-sm px-3 h-full text-black focus:outline-none"
      >
        {{ selected }}
        <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0l-4.24-4.25a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Dropdown List -->
      <ul
        v-if="open"
        class="absolute right-0 top-full mt-2 w-36 bg-white text-black rounded-md shadow-lg border z-50 overflow-hidden text-sm"
      >
        <li
          v-for="item in options"
          :key="item"
          @click="select(item)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          :class="{ 'bg-green-500 text-white': item === selected }"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- Search Button -->
    <button
      @click="submit"
      class="bg-green-500 text-white rounded-full p-2 ml-1 hover:bg-green-600 transition"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const query = ref('')
const selected = ref('Songs')
const open = ref(false)

const options = ['All', 'Songs', 'Photos', 'Videos', 'SFX']

function toggleDropdown() {
  open.value = !open.value
}

function select(option: string) {
  selected.value = option
  open.value = false
}

function submit() {
  if (!query.value) return
  router.push({
    path: '/notfound',
    query: {
      q: query.value,
    },
  })
}
</script>
