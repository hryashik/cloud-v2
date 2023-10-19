<script setup lang="ts">
import { useRoute } from "vue-router";
import MyInput from "../../../components/ui/MyInput.vue";
import { ref } from "vue";
import CreateDirModal from "./ui/CreateDirModal.vue";
import { useToast } from "vue-toastification";
import apiService from "../../../services/apiService";

const route = useRoute();
const toast = useToast();

const modalDirActive = ref<boolean>(false);

function submitHandler(e: Event) {
   e.preventDefault();
   const form = e.currentTarget as HTMLFormElement;
   const formdata = new FormData(form);
   const target = e.target as HTMLInputElement;
   const files = target.files;
   if (files) {
      formdata.append("files", files[0], encodeURI(files[0].name));
      const fetchOptions: RequestInit = {
         method: "POST",
         body: formdata,
         headers: {
            authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp4Y0BtYWlsLnJ1IiwiaWF0IjoxNjk3MTA1NjM0LCJleHAiOjE2OTcxOTIwMzR9.XC0n959HdY5jYKdDo6JTrnE-Ief61C3fKrnz24aQix8",
         },
      };
      fetch("http://localhost:3333/files", fetchOptions)
         .then(data => console.log(data))
         .catch(e => console.log(e));
   }
}
async function createDir() {
try {
   const path = route.query
   console.log(path)
} catch (error) {
   
}
}
</script>

<template>
   <div class="tab__menu flex w-[500px] justify-between">
      <CreateDirModal :active="modalDirActive" @close-modal="modalDirActive = false" @agree="createDir"/>
      <MyInput
         class="w-1/2 rounded-md shadow-md"
         :type="'text'"
         :placeholder="'find'" />
      <form class="ml-2" @change="submitHandler" enctype="multipart/form-data">
         <label for="fileinput" class="block h-full cursor-pointer">
            <div
               class="border-grey flex h-full select-none items-center rounded-md shadow-md transition-colors active:bg-emerald-300">
               <span class="px-4">Upload files</span>
               <input
                  multiple
                  type="file"
                  id="fileinput"
                  class="hidden"
                  accept="image/*, text/*, .json" />
            </div>
         </label>
      </form>

      <button
         @click="modalDirActive = true"
         class="mx-2 rounded-md bg-emerald-300 px-4 shadow-md transition-colors active:bg-emerald-400">
         Create dir
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
