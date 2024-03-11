<template>
  <ul class="mt-8 grid grid-cols-2 max-sm:grid-cols-2 max-md:grid-cols-3 md:grid-cols-3 max-lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-7 items-start">
    <li v-for="n in 20" class="flex border-2 border-gray">
      <div class="p-5 w-full">
        <USkeleton class="max-sm:h-[50vw] sm:h-[19vw] md:h-[15vw] lg:min-h-[15rem] lg:h-[17.3vw]" />
        <USkeleton class="mt-4 h-5 w-full" :ui="{ background: 'bg-gray-300' }" />
      </div>
    </li>
  </ul>
</template>
