<script setup lang="ts">
import Icon from "./Icon.vue";
import { useStore } from "vuex";
import { key } from "../../../../store/store";
import { computed } from "vue";
import { FileType } from "../../../../types/file";

const { state, getters } = useStore(key);
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
   <div class="main mt-4" v-if="state.files.length">
      <Icon
         v-for="file of currentFolder.files"
         :key="file.id"
         :file="file" />
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
