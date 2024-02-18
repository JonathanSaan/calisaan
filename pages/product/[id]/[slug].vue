<template>
  <div class="flex justify-center">
    <div v-if="product && !pending" class="flex lg:mt-14 lg:h-[50rem] w-auto">
      <div>
        <NuxtImg :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" class="mr-7 h-[37rem] w-[31rem] pointer-events-none" />
      </div>
      <div class="flex flex-col pt-6 lg:h-[32rem] w-[27rem]">
        <h1 class="text-2xl font-medium text-gray-900">{{ product.name }}</h1>
        <h2 class="text-3xl font-medium my-1 text-gray-900">{{ product.price }}</h2>
        <h3 class="text-lg font-medium mt-4 text-gray-900">{{ product.description }}</h3>
        
        <form class="flex flex-col mt-auto">
          <div class="relative flex">
          	<button type="button" @click="decrementQuantity" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-black hover:bg-zinc-900 active:bg-zinc-800 border-none rounded-s-lg p-3 px-8 h-11 focus:outline-none">
              <svg class="w-3 h-3 text-gray-900 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
              </svg>
          	</button>
          	
          	<input
        	  type="number"
        	  v-model="quantity"
        	  @input="handleInput"
        	  aria-describedby="helper-text-explanation"
        	  class="outline-none bg-gray-50 py-2.5 h-11 w-28 text-center text-black text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none block bg-white border-y-2 border-black"
        	  placeholder="1"
        	  required
      		/>
      		
          	<button type="button" @click="incrementQuantity" id="increment-button" data-input-counter-increment="quantity-input" class="bg-black hover:bg-zinc-900 active:bg-zinc-800 border-none rounded-e-lg p-3 px-8 h-11 focus:outline-none">
              <svg class="w-3 h-3 text-white text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
              </svg>
          	</button>
          </div>
          
          <button class="mt-9 h-16 w-full uppercase bg-black hover:bg-zinc-900 active:bg-zinc-800 transition duration-150 ease-in-out text-white text-lg rounded-lg shadow-md outline-none">
            add to card
          </button>
        </form>
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

const quantity = ref(1);

const handleInput = () => {
  if (quantity.value < 1) {
    quantity.value = 1;
  }
};

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

useHead({
  title: `${product.value ? product.value.name + " | " : ""}CaliSaan`,
  meta: [
    { name: "description", content: `${product.value ? product.value.description : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}` },
    { name: "ogDescription", content: `${product.value ? product.value.description : "Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics."}` },
  ]
});
</script>
