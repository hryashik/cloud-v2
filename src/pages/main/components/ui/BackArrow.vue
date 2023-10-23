<script lang="ts" setup>
import { useStore } from "vuex";
import { key } from "../../../../store/store";
import { computed } from "vue";
import { GO_BACK_PATH_ACTION } from "../../../../store/actions-types";

const { state, dispatch } = useStore(key);
const currentDir = computed(() => state.currentDir);

function backInPath() {
   if (currentDir) dispatch(GO_BACK_PATH_ACTION);
}
</script>

<template>
   <div
      @click="backInPath"
      :class="currentDir ? '' : 'opacity-20 hover:cursor-default'"
      class="flex h-auto items-center rounded-full border-2 border-transparent p-1 transition-colors hover:cursor-pointer hover:border-sky-500">
      <img class="h-8" src="assets/left-arrow.png" alt=";(" />
   </div>
</template>

<style scoped></style>
