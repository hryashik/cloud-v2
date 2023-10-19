<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{ active: boolean }>();

const modal = ref<HTMLDialogElement>();

const input = ref();
const emit = defineEmits<{
   (e: "closeModal"): void;
   (e: "agree", dirName: string): void;
}>();
watch(
   () => props.active,
   newValue => {
      if (newValue === true) {
         modal?.value?.showModal();
      } else {
         modal?.value?.close();
      }
   },
);
function modalHandler(e: MouseEvent) {
   e.stopPropagation();
   const target = e.target as HTMLElement;
   if (target === modal.value) {
      emit("closeModal");
   }
}
</script>

<template>
   <dialog ref="modal" @click="modalHandler" class="rounded-md p-4 shadow-lg">
      <div class="flex w-[300px] flex-col items-center justify-around">
         <p class="mb-2 text-lg">Directory name</p>
         <input v-model="input" class="mb-4 px-4 py-2 shadow-md rounded-md"/>
         <div class="flex w-full justify-evenly">
            <button
               @click="emit('agree', input)"
               class="w-20 select-none rounded-md bg-emerald-400 px-4 py-2 active:bg-emerald-500">
               Create
            </button>
            <button
               class="w-20 select-none rounded-md bg-emerald-400 px-4 py-2 active:bg-emerald-500"
               @click="() => emit('closeModal')">
               Cancel
            </button>
         </div>
      </div>
   </dialog>
</template>

<style scoped></style>
