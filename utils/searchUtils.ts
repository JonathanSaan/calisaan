import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const useSearch = () => {
  const route = useRoute();
  const router = useRouter();
  const searchQuery = ref("");
  
  const search = computed({
    get: () => {
      return route.query.q
    },
    set: (val) => {
      router.push({ path: "/search", query: { q: val } })
    }
  })

  const doSearch = () => {
    search.value = searchQuery.value;
  }

  return {
    searchQuery,
    search,
    doSearch,
  };
};

export default useSearch;
