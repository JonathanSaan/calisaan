<template>
  <div class="flex justify-center flex-col items-center h-screen w-full text-center">
    <h1 class="text-9xl font-bold">404</h1>
    <h2 class="text-4xl">Page not found.</h2>
    <button class="btn max-lg:my-9 my-14 py-4 px-6 text-2xl bg-black hover:bg-black/90 text-white rounded-lg shadow-md outline-none" @click="handleClearError">Go back home</button>
  </div>
</template>

<script setup>
  defineProps(['error'])
  
  const handleClearError = () => clearError({ redirect: '/' })
</script>
