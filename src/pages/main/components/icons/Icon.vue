<script setup lang="ts">
import { FileType } from "../../../../types/file";

const { file, activeIds } = defineProps<{
   file: FileType;
   activeIds: boolean;
}>();
const emit = defineEmits<{
   (e: "clickOnFile", payload: typeof file.id): void;
}>();

const clickOnFile = () => {
   emit("clickOnFile", file.id);
};
</script>

<template>
   <div
      @click="clickOnFile"
      class="relative flex h-20 select-none flex-col items-center hover:cursor-pointer">
      <img
         :class="activeIds ? 'bg-emerald-200' : ''"
         class="w-10"
         :src="
            file.type === 'dir' ? 'assets/folder.png' : 'assets/file-icon.png'
         "
         alt="" />
      <p
         :class="activeIds ? 'overflow-visible bg-emerald-300' : ''"
         class="overflow-clip break-all">
         {{ file.name }}
      </p>
   </div>
</template>
