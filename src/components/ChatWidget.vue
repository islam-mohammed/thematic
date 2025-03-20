<template>
  <!-- Chat floating container -->
  <div class="fixed bottom-6 left-6 z-50 flex flex-col items-start">
    <!-- Chat Panel -->
    <Transition name="fade-scale">
      <div
        v-if="store.isOpen"
        class="w-80 mb-3 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        <!-- Header -->
        <div class="p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold">Hello 👋</h3>
          <p class="text-sm text-gray-500">Got a question? We would love to help you!</p>
        </div>

        <!-- Chat body -->
        <div class="p-4 space-y-4">
          <!-- Start a conversation -->
          <div class="bg-gray-50 p-3 rounded-md">
            <div class="flex items-center space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <p class="text-sm text-gray-800 font-medium">
                  We’ll be back: <strong>18:00</strong>
                </p>
              </div>
            </div>
            <button
              class="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-2 text-sm font-medium"
            >
              ▶ Start conversation
            </button>
          </div>

          <!-- Help articles -->
          <div>
            <label class="font-semibold text-sm mb-1 block">Find an answer</label>
            <div class="relative mb-3">
              <input
                type="text"
                placeholder="Search for articles"
                class="w-full border rounded-md py-2 pl-3 pr-10 text-sm placeholder-gray-400"
              />
              <button class="absolute right-2 top-1/2 -translate-y-1/2 text-pink-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
                  />
                </svg>
              </button>
            </div>

            <div class="space-y-2">
              <button
                class="flex justify-between items-center w-full border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                Creator Help Center <span>›</span>
              </button>
              <button
                class="flex justify-between items-center w-full border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                Artist Help Center <span>›</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer link -->
        <div class="px-4 py-3 border-t border-gray-100">
          <a href="#" class="text-pink-500 text-sm hover:underline block text-center">
            Explore our knowledge base
          </a>
        </div>
      </div>
    </Transition>

    <!-- Floating Chat Toggle Button -->
    <button
      @click="store.toggle"
      class="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition"
    >
      <!-- Dynamic Icon: bubble when closed, X when open -->
      <svg v-if="!store.isOpen" class="w-6 h-6" fill="white" viewBox="0 0 24 24">
        <path
          d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 00-2 2v20l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2H4z"
        />
      </svg>
      <svg v-else class="w-6 h-6" fill="white" viewBox="0 0 24 24">
        <path
          d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 10-1.41 1.42L10.59 12l-4.89 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
const store = useChatStore()
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
