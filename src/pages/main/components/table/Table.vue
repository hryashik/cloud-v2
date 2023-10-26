<script setup lang="ts">
import StringOfTable from "./StringOfTable.vue";
import HeaderTable from "./HeaderTable.vue";
import { useStore } from "vuex";
import { key } from "../../../../store/store";

const {state} = useStore(key)

const emit = defineEmits<{ (e: "clickOnFile", payload: string): void }>();
function setActive(payload: string) {
   emit("clickOnFile", payload);
}
</script>

<template>
   <div>
      <HeaderTable />
      <StringOfTable
         v-for="element of state.files"
         :key="element.id"
         :id="element.id"
         :name="element.name"
         :size="element.size"
         :type="element.type"
         :active-ids="activeIds"
         @click-on-file="setActive" />
   </div>
</template>
