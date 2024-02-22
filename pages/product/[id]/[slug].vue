<template>
  <div class="flex lg:justify-center">
    <div v-if="product && !pending" class="flex flex-col">
      <div class="flex mx-auto mt-5 lg:mt-5 max-lg:flex-col max-lg:px-4 w-screen lg:w-[70rem] xl:w-[76rem] lg:h-[54rem]">
        <div>
          <NuxtImg :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" class="max-lg:mx-auto max-sm:h-[38rem] max-md:h-[48rem] max-lg:h-[52rem] lg:h-[54rem] w-[40rem] pointer-events-none" />
        </div>
        <div class="flex flex-col pt-4 lg:pt-6 w-auto lg:w-[32rem] lg:ml-auto">
          <h1 class="text-3xl font-medium text-gray-900">{{ product.name }}</h1>
          <h2 class="text-4xl font-medium my-3 text-gray-900">{{ product.price }}</h2>
          <h3 class="text-2xl font-medium mt-5 text-gray-900">{{ product.description }}</h3>
        
          <button class="mt-16 lg:mt-32 h-16 w-full uppercase bg-black hover:bg-zinc-900 active:bg-zinc-800 transition duration-150 ease-in-out text-white text-lg rounded-lg shadow-md outline-none">
            add to card
          </button>
        </div>
      </div>
      
      <div class="pt-20 lg:pt-8 pb-10 lg:pb-16">
        <h2 class="max-lg:px-4 mb-9 lg:mb-8 text-3xl font-bold">Related Products</h2>
        <ul class="flex max-lg:px-4 w-full gap-4 overflow-x-auto pt-1 w-screen lg:w-[70rem] xl:w-[76rem]">
          <li v-for="product in product.similarProducts" :key="product.id" class="group max-lg:h-[23.1rem] p-5 mr-4 border-2 border-gray">
            <NuxtLink :to="`/product/${product.id}/${product.slug}`">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-72 xl:h-80 min-w-[15rem]">
                <NuxtImg :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" class="h-full w-full object-cover object-center" />
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="inset-0" />
                    {{ product.name }}
                  </h3>
                </div>
                <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
              </div>
        	  </NuxtLink>
      	  </li>
        </ul>
      </div>
    </div>
    
    <div v-if="pending">
      <p>loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { id, slug } = useRoute().params;
const { data: product, pending } = await useFetch(`/api/product/${id}/${slug}`);

useHead({
  title: `${product.value ? product.value.name + " | " : ""}CaliSaan`,
  meta: [
    { name: "description", content: `${product.value ? product.value.description : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}` },
    { name: "ogDescription", content: `${product.value ? product.value.description : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}` },
  ]
});
</script>
