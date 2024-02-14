<template>
  <div class="flex flex-col flex-wrap">
	  <div class="flex mb-4 max-lg:min-h-[45rem] min-h-[50rem] max-lg:h-[70vw] h-[39vw]">
      <img class="h-full w-screen max-lg:object-right object-cover pointer-events-none brightness-75 text-transparent" src="/banner.jpg" alt="Banner Image">
      <section class="absolute text-center text-white max-lg:mt-[8rem] mt-[11vw] max-lg:ml-0 ml-[9vw]">
        <h1 class="font-bold max-lg:text-3xl text-6xl">Train Like a Pro. Exclusive Equipment!</h1>
        <h2 class="max-lg:text-xl text-4xl mx-auto mt-5 max-lg:w-11/12 w-[55rem]">Elevate Your Fitness Experience with Premium Gear for an Unparalleled Workout Journey.</h2>
	    </section>
	  </div>

    <div class="my-14 p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14 items-start mx-auto">
      <div v-for="product in products" :key="product.id" class="group relative p-5 border-2 border-gray">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <NuxtLink :to="`/product/${product.id}/${product.slug}`">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.name }}
              </NuxtLink>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: products } = await useFetch('/api/products');
</script>
