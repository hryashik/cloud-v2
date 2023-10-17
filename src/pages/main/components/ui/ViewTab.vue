<script setup lang="ts">
const props = defineProps<{ view: "icons" | "table" }>();
const emit = defineEmits<{ (e: "changeView"): void }>();

function clickHandler(str: "icons" | "table") {
   if (str !== props.view) {
      emit("changeView");
   }
}
</script>

<template>
   <div class="inline-block select-none">
      <div class="flex hover:cursor-pointer">
         <div
            @click="clickHandler('icons')"
            class="p-1"
            :class="props.view === 'icons' ? 'rounded-md bg-indigo-200' : ''">
            <img class="w-8" src="assets/view-icons.png" alt="" />
         </div>
         <div
            @click="clickHandler('table')"
            class="p-1"
            :class="props.view === 'table' ? 'rounded-md bg-indigo-200' : ''">
            <img class="w-8" src="assets/view-table.png" alt="" />
         </div>
      </div>
   </div>
</template>

<style></style>
