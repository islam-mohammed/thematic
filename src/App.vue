<script setup lang="ts">
import { RouterView } from 'vue-router'
import ChatWidget from '@/components/ui/ChatWidget.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <router-view />
    <ChatWidget />
  </div>
</template>
