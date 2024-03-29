<template>
  <div class="flex flex-col min-h-screen">
    <header class="shadow-sm flex justify-between items-center max-lg:pr-8 max-lg:pl-5 px-8 pr-10 max-lg:h-24 h-24 text-center">
      <NuxtLink to="/">
        <picture>
          <source media="(max-width: 768px)" srcset="~/assets/images/logoMobile.png" height="30" width="48" />
          <img src="~/assets/images/logo.png" alt="logo" height="70" width="82" />
        </picture>
      </NuxtLink>
      
      <form @submit.prevent="doSearch" class="max-sm:mr-1 max-md:mr-4 mr-5 ml-auto min-md:w-[30rem]">
        <input v-model="searchQuery" type="text" name="searchQuery" placeholder="Search" class="outline-none border-b-2 border-gray-900 text-xl placeholder-gray-900 text-gray-900 pb-1 max-sm:w-[70%] max-md:w-[20rem] max-lg:w-[25rem] w-[30rem]">
        <button type="submit" title="Search" class="mt-1 max-lg:ml-5 ml-6">
          <Icon name="carbon:search" color="black" size="23" />
        </button>
      </form>
      <UChip :text="cartStore.cart.length" :show="cartStore.cart.length > 0" :ui="{ background: 'bg-black/60' }" size="2xl">
        <button title="Add to cart" @click="isSidebarVisible = true">
          <Icon name="clarity:shopping-cart-solid" color="black" size="25" />
        </button>
      </UChip>
    </header>
    
    <USlideover v-model="isSidebarVisible" :prevent-close="isModalVisible" :ui="{ background: 'bg-white', overlay: { background: 'bg-black/65' } }">
      <UCard class="flex flex-col flex-1 text-black" :ui="{ background: 'bg-white', body: { base: 'flex-1', padding: 'p-0 sm:p-0' }, ring: '', divide: 'divide-y divide-gray-700' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl leading-6">Cart</h3>
            <button title="Close" class="my-1" @click="isSidebarVisible = false">
              <Icon name="i-heroicons-x-mark-20-solid" color="black" size="25" />
            </button>
          </div>
        </template>
              
        <h2 v-if="cartStore.cart.length === 0" class="mt-6 text-lg text-center">Your cart is empty</h2>
        
        <ul v-if="cartStore.cart" class="px-5 h-[76svh] lg:h-[74svh] overflow-auto divide-y divide-gray">
          <li v-for="product in cartStore.cart" :key="product.id" class="flex mr-2 py-6">
            <NuxtLink :to="`/product/${product.id}/${product.slug}`">
              <img :src="product.imageSrc[0]" :alt="product.imageAlt" class="h-40 mr-[1.5rem]" />
            </NuxtLink>
            <div class="flex flex-col">
              <NuxtLink :to="`/product/${product.id}/${product.slug}`">
                <h2 class="font-medium">{{ product.name }}</h2>
              </NuxtLink>
              <h3>{{ product.size }}</h3>
              <h4 class="font-medium">${{ product.price }}</h4>
                    
              <div class="flex mt-auto mb-3 h-8 font-semibold">
                <button @click="() => { decrementItemQuantity(product) }" class="rounded w-9 bg-black hover:bg-black/90 text-white">-</button>
                  <span class="flex items-center justify-center rounded text-gray-900 mx-2 px-4 min-w-12 w-auto bg-black/15">{{ product.quantity }}</span>
                <button @click="() => { addToCart(product) }" class="rounded w-9 bg-black hover:bg-black/90 text-white">+</button>
              </div>
            </div>
            <button @click="() => { removeItem(product) }" class="border-b-2 border-black/75 mt-auto mb-3 ml-auto px-1 h-7">Remove</button>
          </li>
        </ul>
              
        <template #footer v-if="cartStore.cart.length !== 0">
          <div class="py-2">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p class="font-medium">${{ cartStore.totalValue.toFixed(2) }}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <button @click="isModalVisible = true"class="flex items-center justify-center rounded-md border border-transparent bg-black mt-6 px-6 py-3 w-full text-base font-medium text-white shadow-sm hover:bg-black/90 shadow-md transition duration-150 ease-in-out">
              Checkout
            </button>
          </div>
        </template>
      </UCard>
    </USlideover>
          
    <UModal v-model="isModalVisible" @click="handleModalClose" :ui="{ background: 'bg-white', overlay: { background: 'bg-black/50' } }" :transition="false">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-700' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-medium leading-6">
              Purchase Successful
            </h3>
                  
            <button title="Close" class="my-1 ml-auto" @click="handleModalClose">
              <Icon name="i-heroicons-x-mark-20-solid" color="black" size="25" />
            </button>
          </div>
        </template>
              
        <div class="flex flex-col h-[17rem]">
          <p>Your purchase was successful! Thank you for choosing our store.</p>
                
          <button class="rounded-md border border-transparent text-white bg-black hover:bg-black/90 mt-auto ml-auto h-12 w-64 shadow-md transition duration-150 ease-in-out" @click="handleModalClose">
            Close
          </button>
        </div>
      </UCard>
    </UModal>

    <NuxtLoadingIndicator :throttle=0 color="black" />
    <div class="flex-1">
      <slot />
    </div>

    <footer class="flex justify-center items-center h-20">
      <p>&copy; 2024 <NuxtLink class="underline" to="https://jonathansaan.github.io/portfolio" target="_blank">Jonathan Saan.</NuxtLink> All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import useSearch from "~/utils/searchUtils";

const { searchQuery, doSearch } = useSearch();
const cartStore = useCartStore();
const isSidebarVisible = ref(false);
const isModalVisible = ref(false);

onMounted(() => {
  cartStore.initializeCartFromLocalStorage();
});

const handleModalClose = () => {
  clearCart();
  isModalVisible.value = false;
  isSidebarVisible.value = false;
};

const addToCart = (item) => {
  cartStore.addToCart(item);
};
const decrementItemQuantity = (item) => {
  cartStore.decrementItemQuantity(item);
};
const removeItem = (item) => {
  cartStore.removeItem(item);
};
const clearCart = () => {
  cartStore.clearCart();
};
</script>

<style>
@import "~/assets/style/main.css";
</style>
