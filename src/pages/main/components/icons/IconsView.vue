<script setup lang="ts">
import Icon from "./Icon.vue";
import { useStore } from "vuex";
import { key } from "../../../../store/store";
import { useRoute } from "vue-router";
import { computed, watch } from "vue";
import { CHANGE_CURRENT_FOLDER } from "../../../../store/mutations-types";

const { state, commit } = useStore(key);
const route = useRoute();

watch(
   () => route.query.path,
   newValue => {
      commit(CHANGE_CURRENT_FOLDER, newValue);
   },
);

const currentFolder = computed(() => {
   if (state.currentDir === undefined) {
      return { files: state.files.filter(file => file.parentId === null) };
   } else {
      return {
         files: state.files.filter(
            file => file.parentId === state.currentDir?.id,
         ),
      };
   }
});

const { activeIds } = defineProps<{
   activeIds: string[];
}>();
const emit = defineEmits<{
   (e: "clickOnFile", payload: { id: string; key?: boolean }): void;
}>();

const clickOnFileHandler = (payload: { id: string; key?: boolean }) =>
   emit("clickOnFile", payload);
</script>

<template>
   <div class="main mt-4" v-if="state.files.length">
      <Icon
         v-for="file of currentFolder.files"
         :key="file.id"
         :file="file"
         @click-on-file="clickOnFileHandler"
         :activeIds="activeIds.includes(file.id)" />
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
