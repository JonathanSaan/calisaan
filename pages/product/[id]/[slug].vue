<template>
  <div class="flex justify-center">
    <div v-if="product && !pending" class="flex lg:mt-14 lg:h-[50rem] w-auto">
      <div>
        <NuxtImg :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" class="mr-7 h-[37rem] w-[31rem] pointer-events-none" />
      </div>
      <div class="flex flex-col pt-6 lg:h-[30rem] w-[27rem]">
        <h1 class="text-2xl font-medium text-gray-900">{{ product.name }}</h1>
        <h2 class="text-3xl font-medium my-1 text-gray-900">{{ product.price }}</h2>
        <h3 class="text-lg font-medium mt-4 text-gray-900">{{ product.description }}</h3>
        <button class="mt-auto mx-auto py-5 w-full uppercase text-lg bg-black hover:bg-zinc-900 focus:bg-zinc-800 text-white rounded-lg shadow-md outline-none">
          add to card
        </button>
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
