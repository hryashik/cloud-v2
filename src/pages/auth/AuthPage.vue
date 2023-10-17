<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import MyInput from "../../components/ui/MyInput.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "../../store/store";

const router = useRouter();
const email = ref("");
const password = ref("");
const username = ref("");
const { state } = useStore(key);
const variant = ref<"LOGIN" | "REGISTER">("LOGIN");

function submitForm(e: Event) {
   e.preventDefault();
   localStorage.setItem("token", "123");
   router.push("/");
}
function toggleVariant() {
   if (variant.value === "LOGIN") {
      variant.value = "REGISTER";
   } else {
      variant.value = "LOGIN";
   }
}

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
         <div class="flex flex-col rounded-md bg-white p-8 shadow-lg">
            <form class="flex flex-col" @submit="submitForm">
               <label v-if="variant === 'REGISTER'" class="mb-1" for="email"
                  >Username</label
               >
               <MyInput
                  v-if="variant === 'REGISTER'"
                  :type="'text'"
                  @change-value="data => (username = data)" />
               <label class="mb-1" for="email">Email</label>
               <MyInput
                  :type="'email'"
                  @change-value="data => (email = data)" />
               <label class="mb-1" for="password">Password</label>
               <MyInput
                  :type="'password'"
                  @change-value="data => (password = data)" />
               <button
                  class="my-3 w-full rounded-md bg-emerald-500 p-3 text-lg text-black transition-colors hover:cursor-pointer active:bg-emerald-600"
                  type="submit">
                  {{ variant === "LOGIN" ? "LOGIN" : "REGISTER" }}
               </button>
            </form>
            <div class="mt-6">
               <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                     <div class="w-full border-t border-gray-300" />
                  </div>
                  <div class="relative flex justify-center text-sm">
                     <span class="bg-white px-2 text-lg text-gray-500">
                        Or continue with
                     </span>
                  </div>
               </div>
            </div>
            <div
               v-if="variant === 'LOGIN'"
               class="mt-6 flex select-none justify-center gap-2 px-2 text-sm text-gray-500">
               <p>New to messenger?</p>
               <p class="cursor-pointer underline" @click="toggleVariant">
                  Create an account
               </p>
            </div>
            <div
               v-else
               class="mt-6 flex select-none justify-center gap-2 px-2 text-sm text-gray-500">
               <p>Already have an account?</p>
               <p class="cursor-pointer underline" @click="toggleVariant">
                  Login
               </p>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
input:focus {
   outline-color: rgba(0, 128, 0, 0.703);
}
</style>
