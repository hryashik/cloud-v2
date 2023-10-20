<script setup lang="ts">
import { useStore } from "vuex";
import { key } from "./store/store";
import Header from "./components/Header.vue";
import { onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import apiService from "./services/apiService";
import { DEFINE_USER } from "./store/mutations-types";

const { state, commit } = useStore(key);
const appIsReady = ref(false);
const router = useRouter();

onBeforeMount(async () => {
   try {
      const userInfo = await apiService.getUserInfo();
      commit(DEFINE_USER, userInfo);
   } catch (error) {
      router.push("/auth");
   }
   appIsReady.value = true;
});

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
   <div v-if="appIsReady">
      <Header v-if="state.isAuth" />
      <RouterView class="px-4 py-4 lg:px-16" />
   </div>
   <div v-else>Initialization</div>
</template>

<style>
body {
   background-color: rgba(206, 206, 206, 0.306);
}
</style>
