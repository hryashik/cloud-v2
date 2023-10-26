<script setup lang="ts">
import StringOfTable from "./StringOfTable.vue";
import HeaderTable from "./HeaderTable.vue";
import { useStore } from "vuex";
import { key } from "../../../../store/store";
import { computed } from "vue";
import { FileType } from "../../../../types/file";

const { state, getters } = useStore(key);

const emit = defineEmits<{ (e: "clickOnFile", payload: string): void }>();

const currentFolder = computed(() => {
   if (state.currentDir === undefined) {
      return {
         files: getters.files.filter(
            (file: FileType) => file.parentId === null,
         ),
      };
   } else {
      return {
         files: state.files.filter(
            file => file.parentId === state.currentDir?.id,
         ),
      };
   }
});
</script>

<template>
   <div>
      <HeaderTable />
      <StringOfTable
         v-for="element of currentFolder.files"
         :key="element.id"
         :file="element" />
   </div>
</template>
