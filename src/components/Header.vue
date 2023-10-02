<script setup lang="ts">
import { ref } from "vue";
const isActiveMenu = ref(false);
const root = ref<HTMLUListElement>();
function clickOnAvatar(event: Event) {
   event.stopPropagation();
   isActiveMenu.value = true;
   const handler = (e: MouseEvent) => {
      if (e.target !== root.value) {
         isActiveMenu.value = false;
         document.body.removeEventListener("click", handler);
      }
   };
   document.body.addEventListener("click", handler);
}
</script>

<template>
   <header class="h-16 bg-emerald-500">
      <div
         class="mx-auto flex h-full max-w-sm items-center justify-between text-white md:max-w-2xl lg:max-w-5xl">
         <div>
            <p class="text-lg">Navigation</p>
         </div>
         <div>
            <div
               class="relative h-14 w-14 rounded-full bg-emerald-200 shadow-md hover:cursor-pointer"
               @click="clickOnAvatar">
               <div
                  class="absolute right-0 top-[56px] h-auto w-36 rounded-md bg-neutral-300"
                  v-show="isActiveMenu">
                  <ul class="menu text-center text-black" ref="root">
                     <li>Settings</li>
                     <li>Dashboard</li>
                     <li>Logout</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </header>
</template>

<style scoped>
.menu > li {
   padding: 10px;
}
.menu > li:hover {
   cursor: pointer;
   background-color: rgb(184, 184, 184);
}
</style>
