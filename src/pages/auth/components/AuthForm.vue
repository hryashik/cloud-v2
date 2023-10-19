<script setup lang="ts">
import { ref } from "vue";
import MyInput from "../../../components/ui/MyInput.vue";
import { useToast } from "vue-toastification";
import { Form, useForm } from "vee-validate";
import { object, string } from "yup";
import { LoginDto, SignupDto } from "../../../services/types.dto";
import apiService, { ApiError } from "../../../services/apiService";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import { useRouter } from "vue-router";

const router = useRouter();
const pending = ref<boolean>(false);
const variant = ref<"LOGIN" | "REGISTER">("LOGIN");
const toast = useToast();
const { commit } = useStore(key);

const { values, defineInputBinds, errors, meta } = useForm({
   validationSchema: object({
      email: string()
         .email()
         .min(7, "Email must contain at least 7 symbols")
         .required("Email is required"),
      username: string()
         .min(4, "Username must contain at least 4 symbols")
         .notRequired(),
      password: string()
         .min(6, "Password must contain at least 6 symbols")
         .required("Password is required"),
   }),
});
const email = defineInputBinds("email");
const password = defineInputBinds("password");
const username = defineInputBinds("username");

function toggleVariant() {
   if (variant.value === "LOGIN") {
      variant.value = "REGISTER";
   } else {
      variant.value = "LOGIN";
   }
}

async function onSubmit() {
   if (meta.value.valid) {
      pending.value = true;
      // REGISTER VARIANT
      if (variant.value === "REGISTER") {
         const data: SignupDto = {
            email: values.email,
            password: values.password,
            username: values.username,
         };
         try {
            const token = await apiService.signup(data);
            localStorage.setItem("auth-token", token);
            const userData = await apiService.getUserInfo();
            commit("defineUser", userData);
            toast.success("You have been logged in");
            router.push("/space");
         } catch (error) {
            if (error instanceof ApiError) {
               toast.error(error.message);
            }
         }
      } else {
         try {
            const data: LoginDto = {
               email: values.email,
               password: values.password,
            };
            const token = await apiService.login(data);
            localStorage.setItem("auth-token", token);
            const userData = await apiService.getUserInfo();
            commit("defineUser", userData);
            toast.success("You have been logged in");
            router.push("/");
         } catch (error) {
            if (error instanceof ApiError) {
               toast.error(error.message);
            }
         }
      }
      pending.value = false;
   }
}
</script>

<template>
   <div class="flex flex-col rounded-md bg-white p-8 shadow-lg">
      <Form class="flex flex-col" @submit="onSubmit">
         <label class="mb-1" for="email">Email</label>
         <MyInput :type="'email'" v-bind="email" />
         <p class="error__input">{{ errors.email }}</p>
         <label v-if="variant === 'REGISTER'" class="mb-1" for="email"
            >Username</label
         >
         <MyInput
            v-if="variant === 'REGISTER'"
            :type="'text'"
            v-bind="username" />
         <p class="error__input">{{ errors.username }}</p>
         <label class="mb-1" for="password">Password</label>
         <MyInput :type="'password'" v-bind="password" />
         <p class="error__input">{{ errors.password }}</p>
         <button
            :disabled="pending"
            :class="pending === true && 'bg-emerald-100 text-gray-400'"
            class="my-3 w-full rounded-md bg-emerald-400 p-3 text-lg text-black transition-colors hover:cursor-pointer"
            type="submit">
            {{ variant === "LOGIN" ? "LOGIN" : "REGISTER" }}
         </button>
      </Form>
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

<style scoped>
.error__input {
   color: rgb(209, 2, 2);
   margin-bottom: 5px;
}
</style>
