<script setup lang="ts">
import { ref } from "vue";
import { FileType } from "../../../types/file.ts";
import StringOfTable from "./StringOfTable.vue";

const files = ref<FileType[]>([
   { name: "myphoto", date: "10/10/10", size: "10MB", type: "jpg" },
]);
</script>

<template v-if="files">
   <div class="mt-4">
      <StringOfTable
         class="border-b-2 mb-4 border-black"
         v-if="files"
         :name="'name'"
         :date="'date'"
         :size="'size'"
         :type="'type'" />
      <StringOfTable
         v-for="element of files"
         :name="element.name"
         :date="element.date"
         :size="element.size"
         :type="element.type" />
   </div>
</template>
