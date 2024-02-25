<template>
  <div class="flex flex-col min-h-screen">
    <header class="shadow-sm flex justify-between items-center max-lg:px-6 px-8 max-lg:h-24 h-24 text-center">
      <NuxtLink to="/" class="font-medium text-4xl">CaliSaan</NuxtLink>
      <ul class="flex lg:mr-1 align-items items-center h-9">
        <li>
          <form class="min-md:w-[30rem]">
            <input type="text" placeholder="Search" class="outline-none border-b-2 border-gray-900 text-xl placeholder-gray-900 text-gray-900 h-9 max-sm:w-[70%] max-md:w-[20rem] max-lg:w-[25rem] w-[30rem]">
            <button class="max-lg:ml-5 ml-6">
              <Icon name="carbon:search" color="black" size="22" title="Search" aria-hidden="true" />
            </button>
          </form>
        </li>
        <li class="max-sm:ml-1 max-md:ml-4 ml-5">
          <button label="Open" @click="isOpen = true">
            <Icon name="clarity:shopping-cart-solid" color="black" size="22" title="Add to cart" aria-hidden="true" />
          </button>

          <USlideover v-model="isOpen" :ui="{ background: 'bg-white', overlay: { background: 'bg-black/65' } }">
            <UCard class="flex flex-col flex-1 text-black" :ui="{ background: 'bg-white', body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-700' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-2xl leading-6">Cart</h3>

                  <button label="Open" class="my-1 ml-auto" @click="isOpen = false">
                    <Icon name="i-heroicons-x-mark-20-solid" color="black" size="25" title="Add to cart" aria-hidden="true" />
                  </button>
                </div>
              </template>

              <h4 class="mt-3 text-lg text-center">Your cart is empty</h4>
            </UCard>
          </USlideover>
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

<script setup lang="ts">
const isOpen = ref(false)
</script>

<style>
@import "~/assets/style/main.css";
</style>
