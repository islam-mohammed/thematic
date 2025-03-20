<template>
  <div
    class="rounded-md border border-dashed flex flex-col justify-center items-center text-center text-gray-700 hover:bg-gray-100 transition cursor-pointer h-full aspect-[3/4] min-h-[180px] relative"
  >
    <div class="w-full grid grid-cols-2 gap-px opacity-30 pointer-events-none">
      <div class="h-20 bg-gray-300"></div>
      <div class="h-20 bg-gray-300"></div>
      <div class="h-20 bg-gray-300"></div>
      <div class="h-20 bg-gray-300"></div>
    </div>
    <div class="absolute flex flex-col items-center justify-center mt-20">
      <div
        class="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mb-2 text-xl font-bold"
      >
        +
      </div>
      <div class="text-sm font-medium">Add new playlist</div>
    </div>
  </div>
</template>
