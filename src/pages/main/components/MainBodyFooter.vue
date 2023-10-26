<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import { CLEAR_SELECTED_FILES } from "../../../store/mutations-types";

const { state, commit } = useStore(key);
const link = ref<HTMLLinkElement>();
const emit = defineEmits<{
   (e: "click-on-delete"): void;
}>();

function clickOnCancel() {
   commit(CLEAR_SELECTED_FILES);
}
function clickOnDelete() {
   emit("click-on-delete");
}
async function download() {
   const response = await fetch("http://localhost:3333/files/upload", {
      method: "POST",
      body: JSON.stringify({ files: state.selectedFiles }),
      headers: {
         authorization: `Bearer ${localStorage.getItem("auth-token")}`,
         "content-type": "application/json",
      },
   });

   if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      if (!link.value) throw new Error();
      link.value.href = downloadUrl;
      link.value.click();
      link.value.remove();
   }
}
</script>

<template>
   <div
      v-if="state.selectedFiles.length"
      class="fixed bottom-0 left-1/2 mb-4 flex w-[300px] -translate-x-1/2 items-center justify-between rounded-lg bg-indigo-300 px-2 py-2 sm:w-[500px] sm:px-4 sm:py-3">
      <div>
         <p class="text-lg text-black">
            Selected: <b>{{ state.selectedFiles.length }}</b> files
         </p>
      </div>
      <div class="flex sm:flex-none">
         <a ref="link"></a>
         <button
            @click="clickOnCancel"
            class="hover:cursor-pointe mr-2 px-2 py-1 text-lg text-white transition-colors">
            Cancel
         </button>
         <button
            @click="download"
            class="hover:cursor-pointe mr-2 px-2 py-1 text-lg text-white transition-colors">
            Download
         </button>
         <button
            @click="clickOnDelete"
            class="rounded-md bg-rose-400 px-2 py-1 text-lg transition-colors hover:cursor-pointer active:bg-rose-500">
            Delete
         </button>
      </div>
   </div>
</template>
