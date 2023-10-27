<script setup lang="ts">
import { FileType } from "../../../../types/file";
import { useStore } from "vuex";
import { key } from "../../../../store/store";
import {
   CHANGE_CURRENT_FOLDER,
   SELECT_FILE,
} from "../../../../store/mutations-types";

const { commit, state } = useStore(key);
const { file } = defineProps<{
   file: FileType;
}>();
const emit = defineEmits<{ (e: "openFile", payload: string): void }>();

const clickOnFile = (e: MouseEvent) => {
   if (e.altKey) {
      commit(SELECT_FILE, { id: file.id, key: e.altKey });
   } else {
      commit(SELECT_FILE, { id: file.id });
   }
};
const openFile = () => {
   emit("openFile", file.id);
};
</script>

<template>
   <div
      @click="clickOnFile"
      @dblclick="
         file.type === 'dir'
            ? commit(CHANGE_CURRENT_FOLDER, file.id)
            : openFile()
      "
      class="max-h-30 relative flex select-none flex-col items-center hover:cursor-pointer">
      <img
         :class="state.selectedFiles.includes(file.id) ? 'bg-emerald-200' : ''"
         class="w-11 rounded-md"
         :src="
            file.type === 'dir' ? 'assets/folder.png' : 'assets/file-icon.png'
         "
         alt="" />
      <p
         :class="
            state.selectedFiles.includes(file.id)
               ? 'h-auto overflow-visible bg-emerald-300'
               : ''
         "
         class="h-14 overflow-hidden break-all rounded-md p-1">
         {{ file.name }}
      </p>
   </div>
</template>
