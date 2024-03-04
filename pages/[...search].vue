<template>
  <div class="flex max-sm:flex-col">
    <aside class="mt-6 pt-2 px-8 border-r-2 border-gray w-[21rem]">
      <h3 class="mb-3 text-lg font-medium">Category</h3>
      <UCheckbox v-for="(label, index) in categoryLabels" :key="index" :label="label" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }" />
      
      <h3 class="border-t-2 border-gray my-3 pt-3 text-lg font-medium">Price:</h3>
      <UCheckbox v-for="(label, index) in priceLabels" :key="index" :label="label" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }" />
    </aside>
    
    <main class="flex flex-col mt-12 mb-8 mx-auto max-sm:mx-[1rem] max-md:mx-[3rem] max-lg:mx-[6rem] p-0 lg:p-5 lg:px-24 lg:py-0 lg:w-full">
      <h2 class="mr-auto text-lg font-semibold">{{ q ? `Results found for: ${q}` : "All Products" }}</h2>
      
      <ul class="mt-8 relative grid grid-cols-2 max-sm:grid-cols-2 max-md:grid-cols-3 md:grid-cols-3 max-lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-7 items-start">
        <li v-if="allProducts" v-for="product in allProducts" :key="product.id" class="flex group border-2 border-gray">
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
      
      <div v-if="allProducts.length === 0" class="mt-auto h-full w-full">
        <p class="text-lg text-center font-semibold">No results</p>
      </div>
    </main>
  </div>
</template>

<script setup>
const { q } = useRoute().query;
const categoryLabels = ["Fitness Equipment", "Clothing", "Tops Wear", "Bottom Wear", "Other"];
const priceLabels = ["Under $50.00", "$50.00 - $100.00", "$100.00 - $200.00"];

const { data: allProducts, pending } = await useFetch("/api/search.get", {
  query: { q }
});

useHead({
  title: `Search ${q ? `result for: ${q}` : "Result "} | CaliSaan`,
});
</script>
