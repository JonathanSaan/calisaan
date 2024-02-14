<template>
  <div>
    <h1>Detalhes do Produto {{ id }}</h1>
    <p>Link: {{ slug }}</p>
    <div v-if="product">
      <p>Product: {{ product.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { id, slug } = useRoute().params;
//const url = "/api/product";
const url = `/api/product/${id}/${slug}`;

const { data: product } = await useFetch(url, { key: id, slug })

//const { data: product } = await useFetch('/api/product', {
//  query: { id, slug }
//})

useHead({
  title: `${product ? product.name + ' | ' : ''}CaliSaan`,
  meta: [
    { name: 'description', content: `${product ? product.description : 'Discover high-quality products at CaliSaan. Explore our collection for the latest trends and timeless classics.'}` }
  ]
});
</script>
