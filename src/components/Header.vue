<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/store";
import { LOGOUT_USER } from "../store/mutations-types";
import MySettings from "./ui/MySettings.vue";

const { commit, state } = useStore(key);
const isActiveMenu = ref(false);
const isActiveSettings = ref(false);
const root = ref<HTMLUListElement>();

const toggleMenu = () => (isActiveMenu.value = !isActiveMenu.value);
const toggleSettings = () => (isActiveSettings.value = !isActiveSettings.value);

function clickOnAvatar(event: Event) {
   event.stopPropagation();
   toggleMenu();
   const handler = (e: MouseEvent) => {
      if (e.target !== root.value) {
         isActiveMenu.value = false;
         document.body.removeEventListener("click", handler);
      }
   };

   document.body.addEventListener("click", handler);
}
function logout() {
   commit(LOGOUT_USER);
}
</script>

<template>
   <header class="h-16 bg-emerald-500">
      <div
         class="mx-auto flex h-full items-center justify-between px-4 text-white lg:px-16">
         <div>
            <p class="text-xl font-bold">CLOUD Service</p>
         </div>
         <div>
            <div
               class="relative h-14 w-14 rounded-full bg-emerald-200 shadow-md hover:cursor-pointer"
               @click="clickOnAvatar">
               <img
                  class="h-14 object-cover rounded-full"
                  :src="state.user?.avatar"
                  alt=";(" />
               <div
                  class="absolute right-0 top-[56px] h-auto w-36 rounded-md bg-neutral-300"
                  v-show="isActiveMenu">
                  <ul
                     class="menu select-none text-center text-black"
                     ref="root">
                     <li @click="isActiveSettings = true">Settings</li>
                     <li>Dashboard</li>
                     <li @click="logout">Logout</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </header>
   <MySettings :is-active="isActiveSettings" @close-modal="toggleSettings" />
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
