<template>
  <div class="flex flex-col flex-wrap">
    <div
      class="flex mb-4 max-lg:min-h-[45rem] min-h-[50rem] max-lg:h-[70vw] h-[39vw]"
    >
      <img
        :src="banner"
        alt="Banner Image"
        class="h-full w-screen max-lg:object-right object-cover pointer-events-none brightness-75"
      />
      <section
        class="absolute text-center text-white max-lg:mt-[8rem] mt-[11vw] max-lg:ml-0 ml-[9vw]"
      >
        <h1 class="font-semibold max-lg:text-4xl text-7xl">
          Train Like a Pro. Exclusive Equipment!
        </h1>
        <h2
          class="max-lg:text-xl text-4xl mx-auto mt-5 max-lg:w-11/12 w-[55rem]"
        >
          Elevate Your Fitness Experience with Premium Gear for an Unparalleled
          Workout Journey.
        </h2>
      </section>
    </div>

    <div class="max-w-7xl mx-auto w-full">
      <input class="px-3 py-2" v-model="searchState" type="text" placeholder="buscar..." @keydown.enter="doSearch" />
      <button class="border-2 px-3 py-2" @click="doSearch">Fazer pesquisa</button>
    </div>

    <ul
      v-if="!pending && !error"
      class="mt-14 mb-16 max-sm:mx-[1rem] max-md:mx-[3rem] max-lg:mx-[6rem] p-3 md:p-0 grid grid-cols-2 max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7 xl:gap-10 items-start mx-auto"
    >
      <li
        v-for="product in allProducts"
        :key="product.id"
        class="flex group border-2 border-gray max-sm:min-h-[63vw]"
      >
        <NuxtLink :to="`/product/${product.id}/${product.slug}`" class="p-5">
          <div class="rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
            <NuxtImg
              :src="product.imageSrc"
              :alt="product.imageAlt"
              loading="lazy"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
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

    <div v-if="pending">
      <HomeSkeleton />
    </div>
  </div>
</template>

<script setup>
import banner from "~/assets/images/banner.webp";

const searchState = ref("");

const route = useRoute();
const router = useRouter();

const search = computed({
  get: () => {
    return route.query.search
  },
  set: (val) => {
    router.push({ query: { search: val } })
  }
})

const doSearch = () => {
  search.value = searchState.value;
}

const {
  data: allProducts,
  pending,
  error,
} = await useFetch("/api/getAllProducts", {
  query: {search}
});
</script>

