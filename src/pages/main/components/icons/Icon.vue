<script setup lang="ts">
import { FileType } from "../../../../types/file";
import { useStore } from "vuex";
import { key } from "../../../../store/store";
import { CHANGE_CURRENT_FOLDER } from "../../../../store/mutations-types";

const { commit } = useStore(key);
const { file, activeIds } = defineProps<{
   file: FileType;
   activeIds: boolean;
}>();
const emit = defineEmits<{
   (e: "clickOnFile", payload: { id: string; key?: boolean }): void;
}>();

const clickOnFile = (e: MouseEvent) => {
   if (e.altKey) {
      emit("clickOnFile", { id: file.id, key: true });
   } else {
      emit("clickOnFile", { id: file.id });
   }
};
</script>

<template>
   <div
      @click="clickOnFile"
      @dblclick="
         file.type === 'dir' ? commit(CHANGE_CURRENT_FOLDER, file.id) : ''
      "
      class="max-h-30 relative flex select-none flex-col items-center hover:cursor-pointer">
      <img
         :class="activeIds ? 'bg-emerald-200' : ''"
         class="w-11 rounded-md"
         :src="
            file.type === 'dir' ? 'assets/folder.png' : 'assets/file-icon.png'
         "
         alt="" />
      <p
         :class="activeIds ? 'overflow-visible bg-emerald-300' : ''"
         class="overflow-hidden rounded-md p-1">
         {{ file.name }}
      </p>
   </div>
</template>
