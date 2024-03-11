<template>
  <div class="flex max-sm:flex-col">
    <aside class="mt-6 pt-2 px-8 border-r-2 border-gray w-[21rem]">
      <h3 class="mb-3 text-lg font-medium">Category</h3>
      <UCheckbox v-for="(label, index) in categoryLabels" :key="index" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }">
        <template #label>
          <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
        </template>
      </UCheckbox>

      <h3 class="border-t-2 border-gray my-3 pt-3 text-lg font-medium">Price:</h3>
      <UCheckbox v-for="(label, index) in priceLabels" :key="index" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }">
        <template #label>
          <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
        </template>
      </UCheckbox>
    </aside>

    <main class="flex flex-col mt-12 mb-8 mx-auto max-sm:mx-[1rem] max-md:mx-[3rem] max-lg:mx-[6rem] p-0 lg:p-5 lg:px-24 lg:py-0 sm:min-w-[30rem] lg:w-full">
      <h2 class="mr-auto text-lg font-semibold">{{ search ? `Results found for: ${search}` : "All Products" }}</h2>

      <ul v-if="!pending && !error" class="mt-8 relative grid grid-cols-2 max-sm:grid-cols-2 max-md:grid-cols-3 md:grid-cols-3 max-lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-7 items-start">
        <li v-for="product in allProducts" :key="product.id" class="flex group border-2 border-gray">
          <NuxtLink :to="`/product/${product.id}/${product.slug}`" class="p-5">
            <div class="rounded-md bg-gray-200 group-hover:opacity-75">
              <NuxtImg :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <span aria-hidden="true" class="inset-0" />
                  {{ product.name }}
                </h3>
              </div>
              <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
      
      <SearchSkeleton v-if="pending" />
		
      <div v-if="allProducts.length === 0" class="mt-auto h-full w-full">
        <p class="text-lg text-center font-semibold">No results</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import useSearch from "~/utils/searchUtils";
const { search, doSearch } = useSearch();

const categoryLabels = ["Fitness Equipment", "Clothing", "Tops Wear", "Bottom Wear", "Other"];
const priceLabels = ["Under $50.00", "$50.00 - $100.00", "$100.00 - $200.00"];

const { data: allProducts, pending, error } = await useFetch("/api/search.get", {
  query: { q: search }
});

useSeoMeta({
  title: computed(() => `Search ${search.value ? `result for: ${search.value}` : "Result "} | CaliSaan`),
  ogTitle: computed(() => `Search ${search.value ? `result for: ${search.value}` : "Result "} | CaliSaan`),
  description: computed(() => "Explore a diverse range of high-quality products on our search page. Find exactly what you're looking for, from the latest trends to unbeatable prices. Your one-stop destination for an extensive selection. Start exploring now!"),
  ogDescription: computed(() => "Explore a diverse range of high-quality products on our search page. Find exactly what you're looking for, from the latest trends to unbeatable prices. Your one-stop destination for an extensive selection. Start exploring now!"),
});
</script>
