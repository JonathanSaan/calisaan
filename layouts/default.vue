<template>
  <div>
    <header class="shadow-sm bg-white">
	  <nav class="flex justify-between items-center px-20 h-28 text-center">
	    <NuxtLink to="/" class="font-bold text-5xl text-red-600">CaliSaan</NuxtLink>
	    <ul class="flex mr-4">
	      <li><NuxtLink to="/">Home</NuxtLink></li>
	    </ul>
	  </nav>
    </header>
    
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

</script>

<style scoped>
</style>
