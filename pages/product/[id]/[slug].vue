<template>
  <div class="flex lg:justify-center">
    <ProductSkeleton v-if="pending" />
    
    <div v-else class="flex flex-col">
      <div class="flex mx-auto mb-28 lg:mb-[17rem] xl:mb-20 mt-5 lg:mt-8 max-lg:flex-col max-lg:px-4 w-screen lg:w-[70rem] xl:w-[86rem] lg:h-[54rem]">
        <div class="flex flex-col xl:flex-row-reverse max-sm:px-[2vw] sm:px-[5vw] lg:px-0">
          <NuxtImg
            format="webp"
            :src="activeImage"
            :alt="product.imageAlt"
            class="max-lg:mx-auto max-sm:h-full max-md:h-[48rem] max-lg:h-[52rem] lg:min-h-[54rem] w-[40rem] pointer-events-none"
          />
          <div class="flex xl:flex-col max-xl:mt-5 lg:mr-8">
            <button
              v-for="(image, index) in product.imageSrc"
              :key="index"
              @click="() => { setActiveImageOrSelectSize(image, 'image'); setSelectedStyle(index, 'image'); }"
              :class="[{'border-2': true, 'border-black': selectedImageIndex === index, 'border-transparent': selectedImageIndex !== index}]"
              class="max-lg:mr-5 max-xl:mr-6 xl:mr-1 max-lg:mb-3 mb-[1.8rem] rounded-md cursor-pointer"
            >
              <NuxtImg
                format="webp"
                :src="image"
                :alt="product.imageAlt"
                class="lg:h-34 max-md:h-40 md:h-40 max-sm:h-32 lg:w-32 max-md:w-32 max-sm:w-24 pointer-events-none rounded-md cursor-pointer"
              />
            </button>
          </div>
        </div>

        <div class="flex flex-col pt-4 lg:pt-6 max-sm:px-[2vw] sm:px-[5vw] lg:px-0 w-auto lg:w-[27rem] xl:w-[33rem] lg:ml-auto">
          <h1 class="text-3xl font-medium text-gray-900">{{ product.name }}</h1>
          <h2 class="text-4xl font-medium my-3 text-gray-900">${{ product.price }}</h2>
		  
          <div v-if="product.size" class="flex mt-1 flex-col">
            <label>
              <span class="font-semibold text-xl">Size: </span>
              <span class="selected-value font-medium text-xl">{{ selectedSize }}</span>
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
		  
          <button @click="() => { addToCart(product) }" class="mt-16 lg:mt-32 h-16 w-full uppercase bg-black hover:bg-black/90 transition duration-150 ease-in-out text-white text-lg rounded-lg shadow-md">
            add to cart
          </button>
        </div>
      </div>

      <div v-if="product.similarProducts && product.similarProducts.length > 0" class="pb-10 lg:pb-16">
        <h2 class="max-lg:px-4 mb-9 lg:mb-8 text-3xl font-semibold">Related Products</h2>
        <UCarousel v-slot="{ item }" :items="product.similarProducts" class="flex w-full pt-1 w-screen lg:w-[70rem] xl:w-[86rem]" :ui="{ item: 'basis-full max-sm:basis-1/3 sm:basis-1/3 md:basis-1/5 lg:basis-1/6' }" :prev-button="{ class: 'color: bg-black hover:bg-black/85 active:bg-black/75' }" :next-button="{ class: 'color: bg-black hover:bg-black/85 active:bg-black/75' }" arrows>
          <div :key="item.id" class="flex group max-lg:h-[25rem] max-lg:ml-5 lg:mr-5 border-2 border-gray" draggable="false">
            <NuxtLink :to="`/product/${item.id}/${item.slug}`" class="p-5">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 max-md:h-80 min-h-72 xl:h-80 min-w-[15rem]">
                <NuxtImg format="webp" :src="item.imageSrc" :alt="item.imageAlt" loading="lazy" class="h-full w-full object-cover object-center" />
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">
                    <span aria-hidden="true" class="inset-0" />
                    {{ item.name }}
                  </h3>
                </div>
                <p class="font-medium text-gray-900">${{ item.price }}</p>
              </div>
            </NuxtLink>
          </div>
        </UCarousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

interface Product {
  id: number;
  name: string;
  slug: string;
  imageSrc: Array<string>;
  imageAlt: string;
  description: string;
  price: number;
  tag: Array<string>;
  size?: Array<string> | null;
}

const cartStore = useCartStore();

const { id, slug } = useRoute().params;
const { data: product, pending, error } = await useFetch(`/api/product/${id}/${slug}`, {
  server: false,
});

const activeImage = ref<string | null>(null);
const selectedImageIndex = ref<number>(0);

const selectedSize = ref<string | null>(null);
const selectedSizeIndex = ref<number>(0);

watchEffect(() => {
  activeImage.value = product.value?.imageSrc[0] || null;
  selectedSize.value = product.value?.size[0] || null;
});

const addToCart = (item: Product) => {
  const itemToAdd = { ...product.value, size: selectedSize.value };
  cartStore.addToCart(itemToAdd);
};

const setActiveImageOrSelectSize = (newValue: string, type: "image"): void => {
  if (type === "image") {
    return activeImage.value = newValue;
  }
  selectedSize.value = newValue;
};

const setSelectedStyle = (index: number, type: "image"): void => {
  if (type === "image") {
    return selectedImageIndex.value = index;
  } 
  selectedSizeIndex.value = index;
};

useSeoMeta({
  title: `${product.value ? product.value.name + " | " : ""}CaliSaan`,
  ogTitle: `${product.value ? product.value.name + " | " : ""}CaliSaan`,
  description: `${product.value ? `Product: ${product.value.name} - ${product.value.description}` : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}`,
  ogDescription: `${product.value ? `Product: ${product.value.name} - ${product.value.description}` : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}`
});
</script>
