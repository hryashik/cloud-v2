<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{ active: boolean; text: string }>();

const modal = ref<HTMLDialogElement>();
const emit = defineEmits<{ (e: "closeModal"): void; (e: "agree"): void }>();
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
         <p class="mb-4 text-lg">{{ text }}</p>
         <div class="flex w-full justify-evenly">
            <button
               @click="emit('agree')"
               class="w-20 select-none rounded-md bg-emerald-400 px-4 py-2 active:bg-emerald-500">
               Yes
            </button>
            <button
               class="w-20 select-none rounded-md bg-emerald-400 px-4 py-2 active:bg-emerald-500"
               @click="() => emit('closeModal')">
               No
            </button>
         </div>
      </div>
   </dialog>
</template>

<style scoped></style>
