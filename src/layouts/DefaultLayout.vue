<template>
  <div>
    <BaseHeader />
    <main class="container mx-auto px-24 md:20 sm:10 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue'
</script>
