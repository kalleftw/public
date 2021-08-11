<template>
  <a class="ui item" @click="handleSubmit">Logout</a>
</template>

<script>
import userData from "../composables/userData";
import { inject } from "vue";
import { useRouter } from "vue-router";

/**
 * @author Karl Ekberg
 */
export default {
  setup() {
    const store = inject("store");
    const router = useRouter();

    const handleSubmit = () => {
      const { logout } = userData();
      logout();
      store.methods.removeLocalStorage();
      router.push({ path: "/" });
    };
    return { handleSubmit, store };
  },
};
</script>

<style></style>
