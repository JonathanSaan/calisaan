import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const useSearch = () => {
  const route = useRoute();
  const router = useRouter();
  const searchQuery = ref<string>(route.query.q || "");
  
  const q = computed({
    get: () => {
      return route.query.q
    },
    set: (val) => {
      router.push({ path: "/search", query: { q: val } })
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
