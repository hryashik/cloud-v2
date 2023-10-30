<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useToast } from "vue-toastification";
import apiService from "../../../services/apiService";
import { useStore } from "vuex";
import { key } from "../../../store/store";

const content = ref<string | undefined>();

const sizes = [8, 10, 12, 14, 16, 18, 22, 26, 32, 36, 40, 44, 48, 52, 58];

const props = defineProps<{ fileId?: string }>();
const { state } = useStore(key);
const toast = useToast();
const fontSize = ref(18);
const wasChanged = ref(false);
const emit = defineEmits<{ (e: "close"): void }>();

const fileName = computed(
   () => state.files.find(file => file.id === props.fileId)?.name,
);

onBeforeMount(async () => {
   try {
      if (!props.fileId) return;
      const data = await apiService.getFileContent(props.fileId);
      content.value = data;
   } catch (error) {
      toast.error("Error with file");
   }
});

const saveChangeEvent = async () => {
   if (wasChanged) {
      try {
         if (!props.fileId || !content.value) return;
         await apiService.saveChangesFile(props.fileId, content.value);
         toast.success("Changes was saved");
      } catch (error) {
         toast.error("Changes was not saved");
      }
   }
};

const inputHandler = (e: Event) => {
   const target = e.target as HTMLTextAreaElement;
   if (!wasChanged.value) {
      wasChanged.value = true;
   }
   content.value = target.value;
};
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
                  @click="saveChangeEvent"
                  :disabled="!wasChanged"
                  :class="wasChanged ? 'bg-emerald-500' : 'bg-gray-600'"
                  class="h-full rounded-tl-md px-2 transition-colors">
                  Save changes
               </button>
            </div>
            <div class="flex">
               <div class="flex items-center overflow-hidden text-gray-100 mr-4">
                  {{ fileName }}
               </div>
               <div class="flex h-full items-center">
                  <select
                     class="bg-gray-400 px-2 hover:cursor-pointer"
                     v-model="fontSize">
                     <option v-for="size of sizes" :key="size" :value="size">
                        {{ size }}px
                     </option>
                  </select>
               </div>
            </div>

            <div @click="emit('close')">
               <img
                  src="assets/close-icon.svg"
                  class="w-8 rounded-tr-md bg-gray-600 p-1 transition-colors hover:cursor-pointer hover:bg-red-500" />
            </div>
         </div>
         <div class="h-full bg-gray-200">
            <textarea
               :style="{ fontSize: `${fontSize}px` }"
               v-if="content"
               @input="inputHandler"
               class="h-full w-full resize-none border-none bg-gray-200 p-1 outline-none selection:bg-emerald-400 focus:outline-none"
               >{{ content }}</textarea
            >
         </div>
      </div>
   </div>
</template>

<style scoped></style>
