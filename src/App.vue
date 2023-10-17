<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { key } from "./store/store";
import Header from "./components/Header.vue";

const {state} = useStore(key);


onBeforeMount(() => {
   
});
</script>

<template>
   <notifications position="top center"/>
   <Header v-if="state.isAuth" />
   <RouterView class="px-4 py-4 lg:px-16" />
</template>

<style>
body {
   background-color: rgba(206, 206, 206, 0.306);
}
</style>
