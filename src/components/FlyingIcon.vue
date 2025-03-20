<template>
  <div class="relative">
    <span
      class="material-icons text-white animate-bounce"
      title="Notifications"
    >
      notifications
    </span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(3px);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
