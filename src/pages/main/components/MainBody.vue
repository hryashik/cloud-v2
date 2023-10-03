<script setup lang="ts">
import { ref } from "vue";
import { FileType } from "../../../types/file.ts";
import StringOfTable from "./StringOfTable.vue";
import HeaderTable from "./ui/HeaderTable.vue";

const files = ref<FileType[]>([
   { name: "myphoto", date: "10/10/10", size: "10MB", type: "jpg", id: "1" },
   { name: "sdasd", date: "10/10/10", size: "10MB", type: "dir", id: "2" },
]);
const activeIds = ref<string[]>([]);
function setActive(id: string) {
   if (activeIds.value.includes(id)) {
      activeIds.value = activeIds.value.filter(el => el !== id);
   } else {
      activeIds.value.push(id);
   }
}
</script>

<template v-if="files">
   <div class="mt-4">
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
      <div
         v-if="activeIds.length"
         class="fixed bottom-0 left-1/3 mb-4 flex w-1/3 items-center justify-between rounded-lg bg-indigo-300 px-8 py-4">
         <p class="text-lg text-black">
            Selected: <b>{{ activeIds.length }}</b> files
         </p>
         <div class="flex">
            <p>Rename</p>
            <p class="underline hover:cursor-pointer">Delete?</p>
         </div>
      </div>
   </div>
</template>
