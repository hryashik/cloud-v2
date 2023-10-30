<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { key } from "../../../store/store";

const props = defineProps<{ fileId: string | undefined }>();
const dataImg = ref<string | undefined>();
const toast = useToast();

const { state } = useStore(key);

const fileName = computed(
   () => state.files.find(file => file.id === props.fileId)?.name,
);

const emit = defineEmits<{ (e: "close"): void }>();

onBeforeMount(async () => {
   try {
      const response = await fetch(
         `http://localhost:3333/files/${props.fileId}`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            },
         },
      );
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      dataImg.value = imgUrl;
   } catch (error) {
      console.log(error);
      toast.error("Some error");
   }
});
</script>
<template>
   <div v-if="dataImg">
      <div
         @click="emit('close')"
         class="absolute left-0 top-0 h-screen w-screen bg-gray-600 opacity-80"></div>
      <div
         class="z-90 absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-300 md:w-1/2">
         <div
            class="flex h-8 justify-center rounded-tl-md rounded-tr-md bg-gray-800">
            <div class="ml-auto flex items-center overflow-hidden text-white">
               {{ fileName }}
            </div>
            <div @click="emit('close')" class="ml-auto">
               <img
                  src="assets/close-icon.svg"
                  class="w-8 rounded-tr-md bg-gray-600 p-1 transition-colors hover:cursor-pointer hover:bg-red-500" />
            </div>
         </div>
         <div
            class="flex h-full min-h-[100px] items-center justify-center bg-gray-200">
            <img :src="dataImg" alt="" />
         </div>
      </div>
   </div>
   <div v-else></div>
</template>
