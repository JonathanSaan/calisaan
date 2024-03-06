<template>
  <ul class="mt-14 mb-16 max-sm:mx-[1rem] max-md:mx-[3rem] max-lg:mx-[6rem] p-3 md:p-0 grid grid-cols-2 max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7 xl:gap-10 items-start mx-auto lg:w-[83%] xl:w-[73%]">
    <li v-for="n in 10" class="flex group border-2 border-gray max-sm:h-[20rem] sm:h-[27rem] md:h-[22rem] lg:h-[26rem] w-auto lg:w-[18.5rem]">
      <div class="p-5 w-full">
        <USkeleton class="h-[82%] w-full lg:h-80" />
        <USkeleton class="mt-4 h-8 w-full" :ui="{ background: 'bg-gray-300' }" />
      </div>
    </li>
  </ul>
</template>
