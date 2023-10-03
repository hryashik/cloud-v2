<script setup lang="ts">
import { FileType } from "../../../types/file";

const { name, type, date, size, activeIds, id } = defineProps<
   FileType & { activeIds: string[] }
>();
const emit = defineEmits<{ (e: "clickOnFile", id: string): void }>();
function clickOnFile() {
   emit("clickOnFile", id)
}
</script>

<template>
   <div
      @click="clickOnFile"
      class="grid select-none grid-cols-4 justify-items-center hover:cursor-pointer text-lg py-2 relative"
      :class="[activeIds.includes(id) ? 'bg-emerald-200 transition-colors' : '']">
      <div class="ml-12 justify-self-start">
         <img v-if="type === 'dir'" class="w-8 absolute bottom-2 left-1" src="assets/folder.png" alt="" >
         <img v-else class="w-10 absolute bottom-1 left-0" src="assets/file-icon.png" alt="">
         <p>{{ name }}</p>
      </div>
      <div>
         {{ type }}
      </div>
      <div>
         {{ date }}
      </div>
      <div>
         {{ size }}
      </div>
   </div>
</template>

<style scoped>
.main > div {
   border-right: 2px solid black;
}
</style>
