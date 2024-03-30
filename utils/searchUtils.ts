import { ref } from "vue";
import { useRoute } from "vue-router";

const useSearch = () => {
  const route = useRoute();
  const searchQuery = ref(route.query.q || "");
  
  const q = computed({
    get: () => {
      return route.query.q
    },
    set: (val) => {
      navigateTo({ path: "/search", query: { q: val } })
    }
  });

  const doSearch = () => {
    q.value = searchQuery.value;
  };

  return {
    searchQuery,
    q,
    doSearch,
  };
};

export default useSearch;
