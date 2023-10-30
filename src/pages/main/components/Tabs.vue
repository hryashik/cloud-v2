<script setup lang="ts">
import { useRoute } from "vue-router";
import MyInput from "../../../components/ui/MyInput.vue";
import { ref } from "vue";
import CreateDirModal from "./ui/CreateDirModal.vue";
import { useToast } from "vue-toastification";
import apiService, { ApiError } from "../../../services/apiService";
import { createDirDto, saveFilesDto } from "../../../services/types.dto";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import {
   GET_FILES_ACTION,
   SAVE_FILES_ACTION,
} from "../../../store/actions-types";

const route = useRoute();
const toast = useToast();
const { dispatch } = useStore(key);
const modalDirActive = ref<boolean>(false);

async function submitHandler(e: Event) {
   e.preventDefault();
   const form = e.currentTarget as HTMLFormElement;
   const formdata = new FormData(form);
   const target = e.target as HTMLInputElement;
   const files = target.files;
   if (files) {
      console.log(files[0].name.length)
      try {
         formdata.append("files", files[0], encodeURI(files[0].name));
         const data: saveFilesDto = {
            formData: formdata,
            path: route.query.path?.toString(),
         };
         await dispatch(SAVE_FILES_ACTION, data);
         toast.success("the file was saved successfully");
      } catch (error) {
         if (error instanceof ApiError) {
            toast.error(error.message)
         }
      }
   }
}
async function createDir(name: string) {
   try {
      const path = route.query.path?.toString();
      const data: createDirDto = {
         name,
         path,
      };
      await apiService.createDir(data);
      modalDirActive.value = false;
      dispatch(GET_FILES_ACTION);
   } catch (error) {
      if (error instanceof ApiError && error.statusCode === 409) {
         toast.error(error.message);
      }
   }
}
</script>

<template>
   <div class="tab__menu flex w-[500px] justify-between">
      <CreateDirModal
         :active="modalDirActive"
         @close-modal="modalDirActive = false"
         @agree="createDir" />
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
                  accept="image/*, text/*, .json, .pdf" />
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
