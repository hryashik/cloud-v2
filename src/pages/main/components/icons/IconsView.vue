<script setup lang="ts">
import Icon from "./Icon.vue";
import { FileType } from "../../../../types/file";
const { files, activeIds } = defineProps<{
   files: FileType[];
   activeIds: string[];
}>();
const emit = defineEmits<{ (e: "clickOnFile", payload: string): void }>();

const clickOnFileHandler = (payload: string) => emit("clickOnFile", payload);
</script>

<template>
   <div class="mt-4 main">
      <Icon
         v-for="file of files"
         :key="file.id"
         :file="file"
         @click-on-file="clickOnFileHandler"
         :activeIds="activeIds.includes(file.id)" />
   </div>
</template>

<style scoped>
.main {
   display: grid;
   grid-template-columns: repeat(10, 100px);
   justify-items: center;
}
</style>