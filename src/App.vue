<script setup lang="ts">
import { useStore } from "vuex";
import { key } from "./store/store";
import Header from "./components/Header.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";

const { state } = useStore(key);
const router = useRouter();

watch(
   () => state.isAuth,
   newValue => {
      if (newValue === false) {
         router.push("/auth");
      }
   },
);
</script>

<template>
   <Header v-if="state.isAuth" />
   <RouterView class="px-4 py-4 lg:px-16" />
</template>

<style>
body {
   background-color: rgba(206, 206, 206, 0.306);
}
</style>
