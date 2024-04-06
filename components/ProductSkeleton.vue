<template>
  <div class="flex flex-col">
    <div class="flex mx-auto mb-28 lg:mb-[17rem] xl:mb-20 mt-5 lg:mt-8 max-lg:flex-col max-lg:px-4 w-screen lg:w-[70rem] xl:w-[86rem] lg:h-[54rem]">
      <div class="flex flex-col xl:flex-row-reverse">
        <USkeleton class="max-lg:mx-auto max-sm:h-[40rem] max-md:h-[48rem] max-lg:h-[52rem] lg:min-h-[54rem] max-sm:w-full max-md:w-[37rem] md:w-[40rem] pointer-events-none" :ui="{ background: 'bg-gray-300' }" />
          
        <div class="flex xl:flex-col lg:ml-0 max-sm:px-[2vw] sm:px-[5vw] lg:px-0 max-xl:mt-5 lg:mr-8">
          <USkeleton v-for="n in 4" class="max-lg:mr-5 max-xl:mr-6 xl:mr-1 max-lg:mb-3 mb-[1.8rem] lg:h-34 max-md:h-40 md:h-40 max-sm:h-32 md:w-32 max-md:w-32 max-sm:w-24" :ui="{ background: 'bg-gray-300' }" />
        </div>
      </div>

      <div class="flex flex-col pt-4 lg:pt-6 max-sm:px-[2vw] sm:px-[5vw] lg:px-0 w-auto lg:w-[27rem] xl:w-[33rem] lg:ml-auto">
        <div class="flex flex-col mb-1 pt-4 lg:pt-2 w-auto lg:w-[27rem] xl:w-[33rem] lg:ml-auto">
          <USkeleton class="h-8 w-full" :ui="{ background: 'bg-gray-300' }" />
          <USkeleton class="my-5 h-8 w-[11rem]" :ui="{ background: 'bg-gray-300' }" />
        </div>
		  
        <USkeleton v-for="n in 9" class="mt-1 h-6" :ui="{ background: 'bg-gray-300' }" />
		  
        <USkeleton class="mt-16 lg:mt-44 h-16 w-full" :ui="{ background: 'bg-gray-300' }" />
      </div>
    </div>
  </div>
</template>
