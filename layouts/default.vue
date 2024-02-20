<template>
  <div class="flex flex-col min-h-screen">
    <header class="shadow-sm flex justify-between items-center max-lg:px-6 px-8 max-lg:h-24 h-24 text-center">
      <NuxtLink to="/" class="font-bold max-lg:text-3xl text-4xl">CaliSaan</NuxtLink>
      <ul class="flex mr-4 items-center">
        <li>
          <form class="min-md:w-[30rem]">
            <input type="text" placeholder="Search" class="outline-none border-b-2 border-gray-900 text-xl placeholder-gray-900 text-gray-900 h-9 max-sm:w-[70%] max-md:w-[20rem] max-lg:w-[25rem] w-[30rem]">
            <button class="max-lg:ml-5 ml-6">
              <i class="fa-solid fa-magnifying-glass fa-lg" title="Search" aria-hidden="true" ></i>
            </button>
          </form>
        </li>
        <li class="max-sm:ml-1 max-md:ml-5 ml-7 h-6">
          <button><i class="fa-solid fa-cart-shopping fa-lg" title="Add to cart" aria-hidden="true"></i></button>
        </li>
      </ul>
    </header>
    
    <NuxtLoadingIndicator :throttle=0 color="black" />
    <div class="flex-1">
      <slot />
    </div>
    
    <footer class="flex justify-center items-center outline-none h-20">
      <p>&copy; 2024 <NuxtLink class="underline" to="https://jonathansaan.github.io/portfolio" target="_blank">Jonathan Saan.</NuxtLink> All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
</script>
