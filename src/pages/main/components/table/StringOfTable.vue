<script setup lang="ts">
import { useStore } from "vuex";
import { FileType } from "../../../../types/file";
import { key } from "../../../../store/store";
import {
   CHANGE_CURRENT_FOLDER,
   SELECT_FILE,
} from "../../../../store/mutations-types";
import { computed } from "vue";

const { file } = defineProps<{ file: FileType }>();
const { state, commit } = useStore(key);

const emit = defineEmits<{
   (e: "agree"): void;
}>();

function clickOnFile(e: MouseEvent) {
   if (e.altKey) {
      commit(SELECT_FILE, { id: file.id, key: e.altKey });
   } else {
      commit(SELECT_FILE, { id: file.id });
   }
}
const fileSize = computed(() => {
   if (file.size < 1024) {
      return `${file.size.toString()} b`;
   } else if (file.size >= 1024 && file.size < 1024 * 1024) {
      return `${(file.size / 1024).toFixed(2)} Kb`;
   } else {
      return `${(file.size / (1024 * 1024)).toFixed(2)} Mb`;
   }
});
</script>

<template>
   <div
      @click="clickOnFile"
      @dblclick="
         file.type === 'dir' ? commit(CHANGE_CURRENT_FOLDER, file.id) : ''
      "
      class="main relative mb-2 grid select-none justify-items-center py-2 text-lg hover:cursor-pointer"
      :class="
         state.selectedFiles.includes(file.id)
            ? 'rounded-md bg-emerald-200'
            : ''
      ">
      <div class="flex items-center justify-self-start">
         <img
            v-if="file.type === 'dir'"
            class="mr-2 w-10"
            src="assets/folder.png"
            alt="" />
         <img v-else class="mr-2 w-10" src="assets/file-icon.png" alt="" />
         <p class="break-all">
            {{ file.name }}
         </p>
      </div>
      <div class="flex items-center">
         {{ file.type }}
      </div>
      <div class="flex items-center">
         {{ new Date(file.createdAt).toLocaleString() }}
      </div>
      <div class="flex items-center">
         {{ fileSize }}
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
