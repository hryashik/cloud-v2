<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "../../store/store";
import AuthForm from "./components/AuthForm.vue";

const router = useRouter();
const { state } = useStore(key);

onBeforeMount(() => {
   if (state.isAuth) {
      router.push("/");
   }
});
</script>

<template>
   <div class="flex h-screen w-screen items-center justify-center">
      <div class="w-[400px]">
         <h2 class="mb-4 text-center text-3xl font-bold">
            Sign in to your account
         </h2>
         <AuthForm />
      </div>
   </div>
</template>

<style scoped>
input:focus {
   outline-color: rgba(0, 128, 0, 0.703);
}
</style>
