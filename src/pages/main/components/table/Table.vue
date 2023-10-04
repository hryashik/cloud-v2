<script setup lang="ts">
import { FileType } from "../../../../types/file";
import HeaderTable from "./HeaderTable.vue";

const { files, activeIds } = defineProps<{
   files: FileType[];
   activeIds: string[];
}>();

const emit = defineEmits<{ (e: "clickOnFile", payload: string): void }>();
function setActive(payload: string) {
   emit("clickOnFile", payload);
}
</script>

<template>
   <div>
      <HeaderTable />
      <StringOfTable
         v-for="element of files"
         :key="element.id"
         :id="element.id"
         :name="element.name"
         :date="element.date"
         :size="element.size"
         :type="element.type"
         :active-ids="activeIds"
         @click-on-file="setActive" />
   </div>
</template>
