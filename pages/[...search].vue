<template>
  <div class="flex max-sm:flex-col">
    <aside class="max-sm:hidden mt-6 pt-2 px-4 lg:px-8 border-r-2 border-gray sm:w-[27rem] lg:w-[21rem]">
      <Filters />
    </aside>
    
    <USlideover v-model="isSidebarVisible" side="left" class="sm:hidden" :ui="{ background: 'bg-white', overlay: { background: 'bg-black/60' } }">
      <UCard class="flex flex-col flex-1 text-black sm:hidden" :ui="{ background: 'bg-white', body: { base: 'flex-1', padding: 'py-4' }, ring: '', divide: 'divide-y divide-gray' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl leading-6">Filters</h3>
            <button label="Close" class="my-1" @click="isSidebarVisible = false">
              <Icon name="i-heroicons-x-mark-20-solid" color="black" size="25" title="Close sidebar" aria-hidden="true" />
            </button>
          </div>
        </template>

        <Filters />
      </UCard>
    </USlideover>
    
    <main class="flex flex-col mt-6 sm:mt-12 mb-8 mx-auto max-sm:mx-[1rem] max-md:mx-[3rem] max-lg:mx-[6rem] p-0 lg:p-5 lg:px-24 lg:py-0 sm:min-w-[30rem] lg:w-full">
      <button @click="isSidebarVisible = true" class="sm:hidden ml-auto h-14 w-48 text-lg bg-black hover:bg-black/90 text-white rounded-lg shadow-md">Filters</button>
      <h2 class="mr-auto text-lg font-semibold">{{ q ? `Results found for: ${q}` : "All Products" }}</h2>

      <ul v-if="!pending && !error" class="mt-8 relative grid grid-cols-2 max-sm:grid-cols-2 max-md:grid-cols-3 md:grid-cols-3 max-lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-7 items-start">
        <li v-for="product in allProducts" :key="product.id" class="flex group border-2 border-gray">
          <NuxtLink :to="`/product/${product.id}/${product.slug}`" class="p-5 w-full">
            <div class="rounded-md bg-gray-200 group-hover:opacity-75">
              <NuxtImg format="webp" :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="font-medium text-gray-900">
                  <span aria-hidden="true" class="inset-0" />
                  {{ product.name }}
                </h3>
              </div>
              <p class="font-medium text-gray-900">${{ product.price }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
      
      <SearchSkeleton v-if="pending" />
      
      <p v-if="allProducts.length === 0" class="mt-9 text-2xl text-center font-semibold">No results</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import useSearch from "~/utils/searchUtils";
import useFilter from "~/utils/filterUtils";

const { q } = useSearch();
const { category, price } = useFilter();
const isSidebarVisible = ref<boolean>(false);

const { data: allProducts, pending, error } = await useFetch("/api/search.get", {
  query: { q, category, price }
});

useSeoMeta({
  title: computed(() => `Search ${q.value ? `result for: ${q.value}` : "Result "} | CaliSaan`),
  ogTitle: computed(() => `Search ${q.value ? `result for: ${q.value}` : "Result "} | CaliSaan`),
  description: computed(() => "Explore a diverse range of high-quality products on our search page. Find exactly what you're looking for, from the latest trends to unbeatable prices. Your one-stop destination for an extensive selection. Start exploring now!"),
  ogDescription: computed(() => "Explore a diverse range of high-quality products on our search page. Find exactly what you're looking for, from the latest trends to unbeatable prices. Your one-stop destination for an extensive selection. Start exploring now!"),
});
</script>
