<script setup lang="ts">
import { ref } from "vue";
import MyInput from "../../../components/ui/MyInput.vue";
import { SignupDto } from "../../../services/types.dto";
import apiService from "../../../services/apiService";
import { useNotification } from "@kyvg/vue3-notification";

const email = ref("");
const password = ref("");
const username = ref("");
const pending = ref<boolean>(false);
const variant = ref<"LOGIN" | "REGISTER">("LOGIN");
const { notify } = useNotification();

function toggleVariant() {
   if (variant.value === "LOGIN") {
      variant.value = "REGISTER";
   } else {
      variant.value = "LOGIN";
   }
}

async function submitForm(e: Event) {
   e.preventDefault();
   pending.value = true;
   // REGISTER VARIANT
   if (variant.value === "REGISTER") {
      const data: SignupDto = {
         email: email.value,
         password: password.value,
         username: username.value,
      };
      const response = await apiService.signup(data);
      notify({
         type: "error",
         title: "Error",
         text: "asdasd"
      });
      pending.value = false;
      console.log(response);
   }
}
</script>

<template>
   <div class="flex flex-col rounded-md bg-white p-8 shadow-lg">
      <form class="flex flex-col" @submit="submitForm">
         <label class="mb-1" for="email">Email</label>
         <MyInput
            :type="'email'"
            @change-value="(data: string) => (email = data)" />
         <label v-if="variant === 'REGISTER'" class="mb-1" for="email"
            >Username</label
         >
         <MyInput
            v-if="variant === 'REGISTER'"
            :type="'text'"
            @change-value="(data: string) => (username = data)" />
         <label class="mb-1" for="password">Password</label>
         <MyInput
            :type="'password'"
            @change-value="(data: string) => (password = data)" />
         <button
            :disabled="pending"
            :class="pending === true && 'bg-emerald-100 text-gray-400'"
            class="my-3 w-full rounded-md bg-emerald-400 p-3 text-lg text-black transition-colors hover:cursor-pointer"
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
         <p class="cursor-pointer underline" @click="toggleVariant">Login</p>
      </div>
   </div>
</template>

<style scoped></style>
