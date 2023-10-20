<script setup lang="ts">
import Icon from "./Icon.vue";
import { useStore } from "vuex";
import { key } from "../../../../store/store";

const { state } = useStore(key);

const { activeIds } = defineProps<{
   activeIds: string[];
}>();
const emit = defineEmits<{
   (e: "clickOnFile", payload: { id: string; key?: boolean }): void;
}>();

const clickOnFileHandler = (payload: { id: string; key?: boolean }) =>
   emit("clickOnFile", payload);
</script>

<template>
   <div class="main mt-4" v-if="state.files.length">
      <Icon
         v-for="file of state.files"
         :key="file.id"
         :file="file"
         @click-on-file="clickOnFileHandler"
         :activeIds="activeIds.includes(file.id)" />
   </div>
   <div
      v-else
      class="flex h-80 items-center justify-center text-center font-bold text-gray-500">
      Space is empty
   </div>
</template>

<style scoped>
.main {
   display: grid;
   grid-template-columns: repeat(10, 100px);
   justify-items: center;
}
</style>
