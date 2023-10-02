<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "./store/store";
import Header from "./components/Header.vue";

const router = useRouter();
const { state, commit } = useStore(key);

onBeforeMount(() => {
   const token = localStorage.getItem("token");
   if (!state.isAuth) {
      if (!token) {
         router.push({ name: "auth" });
      } else {
         const user = { username: "hryashik", avatar: null };
         commit("defineUser", user);
      }
   }
});
</script>

<template>
   <Header v-if="state.isAuth" />
   <RouterView class="px-10 py-4"/>
</template>

<style>
body {
   background-color: rgba(206, 206, 206, 0.306);
}
</style>
