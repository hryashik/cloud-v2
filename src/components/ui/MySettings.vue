<script lang="ts" setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { key } from "../../store/store";
import { ApiError } from "../../services/apiService";
import { updateUserDto } from "../../services/types.dto";
import { useToast } from "vue-toastification";
import { UPDATE_USER_ACTION } from "../../store/actions-types";

const { state, dispatch } = useStore(key);

const props = defineProps<{ isActive: boolean }>();

const username = ref(state.user?.username);
const email = ref(state.user?.email);
const avatar = ref(state.user?.avatar);
const errors = ref<string[]>([]);

const dialog = ref<HTMLDialogElement>();
const toast = useToast();

watch(
   () => props.isActive,
   newValue => {
      if (newValue === true) {
         dialog.value?.showModal();
      } else {
         dialog.value?.close();
      }
   },
);
const closeModal = (e: MouseEvent) => {
   if (e.target === dialog?.value) {
      emit("closeModal");
   }
};
const emit = defineEmits<{ (e: "closeModal"): void }>();

async function onSubmit(e: Event) {
   e.preventDefault();
   if (username.value!!.length < 4) {
      errors.value.push("username");
   } else {
      errors.value = errors.value.filter(value => value !== "username");
   }
   if (email.value!!.length < 6) {
      errors.value.push("email");
   } else {
      errors.value = errors.value.filter(value => value !== "email");
   }
   if (!errors.value.length) {
      errors.value = [];
      const data: updateUserDto = {
         username: username.value,
         email: email.value,
         avatar: avatar.value,
      };
      emit("closeModal");
      try {
         dispatch(UPDATE_USER_ACTION, data);
         toast.success("Info was updated");
      } catch (error) {
         if (error instanceof ApiError) {
            toast.error(error.message);
         }
      }
   }
}
</script>

<template>
   <dialog ref="dialog" @click="closeModal">
      <form @submit="onSubmit">
         <div class="flex w-80 flex-col p-4">
            <h3 class="mb-4 self-center text-xl font-bold">Settings</h3>
            <label for="settingsusername">Username</label>
            <input type="text" class="px-2 py-1" v-model="username" id="settingsusername"/>
            <p class="error" v-if="errors.includes('username')">
               email must contain minimum 6 characters
            </p>
            <label for="settingsid">Email</label>
            <input type="text" class="px-2 py-1" v-model="email" id="settingsid"/>
            <p class="error" v-if="errors.includes('email')">
               email must contain minimum 6 characters
            </p>
            <label for="settingsavatar">Avatar link</label>
            <input type="text" class="px-2 py-1" v-model="avatar" id="settingsavatar"/>
            <button class="rounded-md bg-indigo-400 p-4">save</button>
         </div>
      </form>
   </dialog>
</template>

<style scoped>
input {
   margin-bottom: 10px;
   border-radius: 5px;
   border: 2px solid grey;
}
.error {
   color: red;
}
</style>
