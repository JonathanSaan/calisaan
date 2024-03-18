import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const useFilter = () => {
  const route = useRoute();
  const router = useRouter();
  const selectedCategory = ref(route.query.category || "");
  const selectedPrice = ref(route.query.price || "");
  
  const category = computed({
    get: () => {
      return route.query.category
    },
    set: (val) => {
      router.push({ path: route.path, query: { category: val } })
    }
  })
  
  const price = computed({
    get: () => {
      return route.query.price
    },
    set: (val) => {
      router.push({ path: route.path, query: { price: val } })
    }
  })

  const applyFilters = () => {
    const params = { ...route.query };

    if (selectedCategory.value) {
      params.category = selectedCategory.value;
    } else {
      delete params.category;
    }

    if (selectedPrice.value) {
      params.price = selectedPrice.value;
    } else {
      delete params.price;
    }
    
    category.value = selectedCategory.value;
    price.value = selectedPrice.value;
    router.replace({ path: route.path, query: params });
  };

  return {
    selectedCategory,
    selectedPrice,
    category,
    price,
    applyFilters,
  };
};

export default useFilter;
