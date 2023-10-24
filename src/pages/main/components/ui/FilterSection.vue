<script setup lang="ts">
import { useStore } from "vuex";
import { SortType } from "../../../../types/sortType";
import ViewTab from "./ViewTab.vue";
import { key } from "../../../../store/store";
import { CHANGE_SORT } from "../../../../store/mutations-types";

const {state, commit} = useStore(key)
const props = defineProps<{ view: "icons" | "table"}>();
const emit = defineEmits<{
   (e: "changeView"): void;
   (e: "changeSort", sortType: SortType): void;
}>();

const handlerEmit = () => {
   emit("changeView");
};
const handlerSelect = (e: Event) => {
   const target = e.target as HTMLSelectElement;
   const value = target.value as SortType;
   commit(CHANGE_SORT, value)
};
</script> 

<template>
   <div class="flex items-start">
      <div class="mr-4">
         <select
            :value="state.sortType"
            @change="handlerSelect"
            name=""
            id=""
            class="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-md hover:cursor-pointer focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <option value="name">By name</option>
            <option value="size">By size</option>
            <option value="type">By type</option>
            <option value="updatedAt">By date</option>
         </select>
      </div>
      <div>
         <ViewTab :view="props.view" @change-view="handlerEmit" />
      </div>
   </div>
</template>

<style></style>
