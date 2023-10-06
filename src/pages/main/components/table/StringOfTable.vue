<script setup lang="ts">
import { FileType } from "../../../../types/file";

const { name, type, date, size, activeIds, id } = defineProps<
   FileType & { activeIds: string[] }
>();
const emit = defineEmits<{
   (e: "clickOnFile", id: string): void;
   (e: "agree"): void;
}>();
function clickOnFile() {
   emit("clickOnFile", id);
}
</script>

<template>
   <div
      @click="clickOnFile"
      class="main relative grid select-none justify-items-center py-2 text-lg hover:cursor-pointer"
      :class="[
         activeIds.includes(id) ? 'bg-emerald-200 transition-colors' : '',
      ]">
      <div class="flex items-center justify-self-start">
         <img
            v-if="type === 'dir'"
            class="mr-2 w-10"
            src="assets/folder.png"
            alt="" />
         <img v-else class="mr-2 w-10" src="assets/file-icon.png" alt="" />
         <p class="break-all">
            {{ name }}
         </p>
      </div>
      <div class="flex items-center">
         {{ type }}
      </div>
      <div class="flex items-center">
         {{ date }}
      </div>
      <div class="flex items-center">
         {{ size }}
      </div>
   </div>
</template>

<style scoped>
.main {
   grid-template-columns: 2fr 1fr 1fr 1fr;
}
.main > div {
   display: flex;
   justify-items: center;
}
</style>
