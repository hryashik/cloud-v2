<script setup lang="ts">
import MyInput from "../../../components/ui/MyInput.vue";
</script>

<template>
   <div class="tab__menu flex w-96 justify-between">
      <MyInput class="w-1/2 rounded-md shadow-md" :type="'text'" :placeholder="'find'"/>
      <button
         class="mx-2 rounded-md bg-emerald-100 px-4 transition-colors hover:bg-emerald-200 active:bg-emerald-300 shadow-md">
         Add
      </button>
      <button
         class="mx-2 rounded-md bg-emerald-100 px-4 transition-colors hover:bg-emerald-200 active:bg-emerald-300 shadow-md">
         Remove
      </button>
   </div>
</template>

<style scope>
.tab__menu {
   padding: 10px 0;
}
button {
   color: black;
}
</style>
