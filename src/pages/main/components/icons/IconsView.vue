<script setup lang="ts">
import Icon from "./Icon.vue";
import { useStore } from "vuex";
import { key } from "../../../../store/store";

const { state } = useStore(key);

const { activeIds } = defineProps<{
   activeIds: string[];
}>();
const emit = defineEmits<{ (e: "clickOnFile", payload: string): void }>();

const clickOnFileHandler = (payload: string) => emit("clickOnFile", payload);
</script>

<template>
   <div class="main mt-4">
      <Icon
         v-for="file of state.files"
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
