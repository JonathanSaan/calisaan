<template>
  <div class="flex flex-col flex-wrap">
    <div class="flex mb-4 max-lg:min-h-[45rem] min-h-[50rem] max-lg:h-[70vw] h-[39vw]">
      <img :src="banner" alt="Banner Image" class="h-full w-screen max-lg:object-right object-cover pointer-events-none brightness-75" />
      <section class="absolute text-center text-white max-lg:mt-[8rem] mt-[11vw] max-lg:ml-0 ml-[9vw]">
        <h1 class="font-semibold max-lg:text-4xl text-7xl">Train Like a Pro. Exclusive Equipment!</h1>
        <h2 class="max-lg:text-xl text-4xl mx-auto mt-5 max-lg:w-11/12 w-[55rem]">Elevate Your Fitness Experience with Premium Gear for an Unparalleled Workout Journey.</h2>
      </section>
    </div>

    <ul v-if="!pending && !error" class="mt-14 max-sm:mx-[1rem] max-md:mx-[3rem] max-lg:mx-[6rem] p-3 md:p-0 grid max-md:grid-cols-2 md:grid-cols-3 gap-7 lg:gap-14 items-start mx-auto">
      <li v-for="product in allProducts" :key="product.id" class="flex group border-2 border-gray max-sm:min-h-[63vw]">
        <NuxtLink :to="`/product/${product.id}/${product.slug}`" class="p-5">
          <div class="rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
            <NuxtImg :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
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
    
    <HomeSkeleton v-if="pending" />
    
    <button @click="() => navigateTo({ path: '/search', query: { q: '' }})" class="my-14 mx-auto h-14 w-48 text-lg bg-black hover:bg-black/90 text-white rounded-lg shadow-md">
      See more
    </button>
  </div>
</template>

<script setup>
import banner from "~/assets/images/banner.webp";

const { data: allProducts, pending, error } = await useFetch("/api/getAllProducts");
</script>
