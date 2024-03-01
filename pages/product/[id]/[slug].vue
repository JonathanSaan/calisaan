<template>
  <div class="flex lg:justify-center">
    <div v-if="!pending && product" class="flex flex-col">
      <div class="flex mx-auto mb-28 lg:mb-[17rem] xl:mb-20 mt-5 lg:mt-8 max-lg:flex-col max-lg:px-4 w-screen lg:w-[70rem] xl:w-[86rem] lg:h-[54rem]">
        <div class="flex flex-col xl:flex-row-reverse">
          <NuxtImg
            :src="activeImage"
            :alt="product.imageAlt"
            class="max-lg:mx-auto max-sm:h-[38rem] max-md:h-[48rem] max-lg:h-[52rem] lg:min-h-[54rem] w-[40rem] pointer-events-none"
          />
          <div class="flex xl:flex-col lg:ml-0 md:ml-[5vw] max-xl:mt-5 lg:mr-8">
            <NuxtImg
              v-for="(image, index) in product.imageSrc"
              :key="index"
              :src="image"
              :alt="product.imageAlt"
              @click="() => { setActiveImageOrSelectSize(image, 'image'); setSelectedStyle(index, 'image'); }"
              :class="[{'border-2': true, 'border-black': selectedImageIndex === index, 'border-transparent': selectedImageIndex !== index}]"
              class="max-lg:mr-5 max-xl:mr-6 xl:mr-1 max-lg:mb-3 mb-[1.8rem] lg:h-34 max-md:h-40 md:h-40 max-sm:h-32 lg:w-32 max-md:w-32 max-sm:w-24 rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div class="flex flex-col pt-4 lg:pt-6 w-auto lg:w-[27rem] xl:w-[33rem] lg:ml-auto">
          <h1 class="text-3xl font-medium text-gray-900">{{ product.name }}</h1>
          <h2 class="text-4xl font-medium my-3 text-gray-900">{{ product.price }}</h2>
		  
          <div v-if="product.size" class="flex mt-2 flex-col">
            <label>
              <span class="font-semibold text-xl">Size: </span>
              <span class="selected-value font-medium text-xl option-label">{{ selectedSize }}</span>
            </label>
		    
            <div class="mt-3 mb-5">
              <button
                v-for="(size, index) in product.size"
                :key="index"
                @click="() => { setActiveImageOrSelectSize(size); setSelectedStyle(index)}"
                :class="{ 'bg-black border-black text-white': selectedSizeIndex === index, 'bg-white border-black/70': selectedSizeIndex !== index }"
                class="border rounded-lg font-medium mr-3 py-4 w-14"
              >
                {{ size }}
              </button>
            </div>
          </div>
		  
          <p class="text-2xl font-medium mt-2 text-gray-900">{{ product.description }}</p>
		  
          <button class="mt-16 lg:mt-32 h-16 w-full uppercase bg-black hover:bg-black/90 transition duration-150 ease-in-out text-white text-lg rounded-lg shadow-md outline-none">
            add to cart
          </button>
        </div>
      </div>

      <div v-if="product.similarProducts && product.similarProducts.length > 0" class="pb-10 lg:pb-16">
        <h2 class="max-lg:px-4 mb-9 lg:mb-8 text-3xl font-semibold">Related Products</h2>
        <UCarousel v-slot="{ item }" :items="product.similarProducts" class="flex w-full pt-1 w-screen lg:w-[70rem] xl:w-[86rem]" :ui="{ item: 'basis-full max-sm:basis-1/3 sm:basis-1/3 md:basis-1/5 lg:basis-1/6' }" :prev-button="{ class: 'color: bg-black hover:bg-black/85 active:bg-black/75' }" :next-button="{ class: 'color: bg-black hover:bg-black/85 active:bg-black/75' }" arrows>
          <div :key="item.id" class="flex group max-lg:h-[23rem] max-lg:ml-5 lg:mr-5 border-2 border-gray" draggable="false">
            <NuxtLink :to="`/product/${item.id}/${item.slug}`" class="p-5">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-72 xl:h-80 min-w-[15rem]">
                <NuxtImg :src="item.imageSrc" :alt="item.imageAlt" loading="lazy" class="h-full w-full object-cover object-center" />
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="inset-0" />
                    {{ item.name }}
                  </h3>
                </div>
                <p class="text-sm font-medium text-gray-900">{{ item.price }}</p>
              </div>
            </NuxtLink>
          </div>
        </UCarousel>
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

const activeImage = ref(product.value.imageSrc[0]);
const selectedImageIndex = ref(0);

const selectedSize = ref(product.value.size ? product.value.size[0] : null);
const selectedSizeIndex = ref(0);

const setActiveImageOrSelectSize = (newValue, type) => {
  if (type === "image") {
    return activeImage.value = newValue;
  }
  selectedSize.value = newValue;
};

const setSelectedStyle = (index, type) => {
  if (type === "image") {
    return selectedImageIndex.value = index;
  } 
  selectedSizeIndex.value = index;
};

useHead({
  title: `${product.value ? product.value.name + " | " : ""}CaliSaan`,
  meta: [
    { name: "description", content: `${product.value ? product.value.description : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}` },
    { name: "ogDescription", content: `${product.value ? product.value.description : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}` },
  ]
});
</script>
