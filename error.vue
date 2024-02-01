<template>
  <div class="flex justify-center flex-col items-center h-screen w-full text-center">
    <h1 class="text-9xl font-bold">404</h1>
    <h2 class="text-4xl">Page not found.</h2>
    <button class="btn max-lg:my-9 my-14 py-2 px-4 rounded text-2xl bg-black text-white" @click="handleClearError">Go back home</button>
  </div>
</template>

<script setup>
  defineProps(['error'])
  
  const handleClearError = () => clearError({ redirect: '/' })
</script>