<script setup lang="ts">
const { activeIds } = defineProps<{ activeIds: string[] }>();
const emit = defineEmits<{
   (e: "cancel"): void;
   (e: "click-on-delete"): void;
}>();

function clickOnCancel() {
   emit("cancel");
}
function clickOnDelete() {
   emit("click-on-delete");
}
</script>

<template>
   <div
      v-if="activeIds.length"
      class="fixed bottom-0 left-1/2 mb-4 flex sm:w-[500px] w-[300px] -translate-x-1/2 items-center justify-between rounded-lg bg-indigo-300 px-2 py-2 sm:px-4 sm:py-3">
      <div>
         <p class="text-lg text-black">
            Selected: <b>{{ activeIds.length }}</b> files
         </p>
      </div>
      <div class="sm:flex-none flex">
         <button
            @click="clickOnCancel"
            class="hover:cursor-pointe px-2 py-1 text-lg text-white transition-colors mr-2">
            Cancel
         </button>
         <button
            @click="clickOnDelete"
            class="rounded-md bg-rose-400 px-2 py-1 text-lg transition-colors hover:cursor-pointer active:bg-rose-500">
            Delete
         </button>
      </div>
   </div>
</template>
