<script setup lang="ts">
import axios from "axios";
import { onBeforeMount, ref, watch } from "vue";
import { useToast } from "vue-toastification";

const content = ref();

const props = defineProps<{ fileId?: string }>();
const toast = useToast();
const wasChanged = ref(false);
const emit = defineEmits<{ (e: "close"): void }>();

onBeforeMount(async () => {
   try {
      const response = await axios.get(
         `http://localhost:3333/files/${props.fileId}`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            },
         },
      );
      content.value = JSON.stringify(response.data);
   } catch (error) {
      toast.error("Error with file");
   }
});
watch(() => content.value, (_, oldValue) => {
   if (oldValue !== undefined) {
      wasChanged.value = true
   }
})
</script>

<template>
   <div>
      <div
         @click="emit('close')"
         class="absolute left-0 top-0 h-screen w-screen bg-gray-600 opacity-80"></div>
      <div
         class="z-90 absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-300 md:w-1/2">
         <div
            class="flex h-8 justify-between rounded-tl-md rounded-tr-md bg-gray-800">
            <div>
               <button 
                  @click="console.log(content)"
                  :disabled="!wasChanged"
                  :class="wasChanged ? 'bg-emerald-400' : 'bg-gray-600'"
                  class="h-full rounded-tl-md px-2 transition-colors">
                  Save changes
               </button>
            </div>
            <div @click="emit('close')">
               <img
                  src="assets/close-icon.svg"
                  class="w-8 rounded-tr-md bg-gray-600 p-1 transition-colors hover:cursor-pointer hover:bg-red-500" />
            </div>
         </div>
         <div class="h-full">
            <textarea
               @change="console.log(1)"
               v-if="content"
               v-model="content"
               class="h-full w-full resize-none border-none bg-gray-200 p-1 outline-none selection:bg-emerald-400 focus:outline-none">
            </textarea>
            <p v-else>LOADING</p>
         </div>
      </div>
   </div>
</template>