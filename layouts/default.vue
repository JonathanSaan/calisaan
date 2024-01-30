<template>
  <div>
    <header class="shadow-sm bg-white">
	  <nav class="flex justify-between items-center px-10 h-28 text-center">
	    <NuxtLink to="/" class="font-bold text-5xl text-red-600">CaliSaan</NuxtLink>
	    <ul class="flex mr-4">
	      <li>
	      	<NuxtLink to="/"><i class="fa-solid fa-cart-shopping fa-lg ml-2.5" title="Add to cart" aria-hidden="true"></i></NuxtLink>
	      </li>
	    </ul>
	  </nav>
    </header>
    
    <div class="container px-20">
      <slot />
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
</style>
