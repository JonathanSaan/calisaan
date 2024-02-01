<template>
  <div class="flex flex-col min-h-screen">
    <header class="shadow-sm">
	  <nav class="flex justify-between items-center max-lg:px-7 px-10 max-lg:h-24 h-28 text-center">
	    <NuxtLink to="/" class="font-bold max-lg:text-3xl text-5xl ">CaliSaan</NuxtLink>
	    <ul class="flex mr-4">
	      <li>
	      	<NuxtLink to="/"><i class="fa-solid fa-cart-shopping fa-lg ml-2.5" title="Add to cart" aria-hidden="true"></i></NuxtLink>
	      </li>
	    </ul>
	  </nav>
    </header>
    
    <div class="py-14 flex-1">
      <slot />
    </div>
    
    <footer class="flex justify-center items-center h-20">
      <p>&copy; 2024 <a class="underline" href="https://jonathansaan.github.io/portfolio" target="_blank">Jonathan Saan.</a> All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
</script>
