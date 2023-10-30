<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import MainBodyFooter from "./MainBodyFooter.vue";
import IconsView from "./icons/IconsView.vue";
import MyModal from "../../../components/ui/MyModal.vue";
import Table from "./table/Table.vue";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import { useToast } from "vue-toastification";
import {
   DELETE_FILES_ACTION,
   GET_FILES_ACTION,
} from "../../../store/actions-types";
import PathComponent from "./ui/PathComponent.vue";
import FilterSection from "./ui/FilterSection.vue";
import ImageManager from "./ImageManager.vue";
import FileContent from "./FileContent.vue";

const { dispatch, state } = useStore(key);

const toast = useToast();
const activeModal = ref(false);
const activeWindow = ref<{
   status: boolean;
   type: "text" | "img";
   fileId: string | undefined;
}>({
   status: false,
   type: "text",
   fileId: undefined,
});
const view = ref<"table" | "icons">("icons");

async function deleteFilesHandler() {
   dispatch(DELETE_FILES_ACTION, state.selectedFiles).catch(() =>
      toast.error("Delete was failed"),
   );
   activeModal.value = false;
}
function toggleModal() {
   activeModal.value = !activeModal.value;
}
function toggleView() {
   view.value === "icons" ? (view.value = "table") : (view.value = "icons");
}
function openFile(fileId: string) {
   const file = state.files.find(file => file.id === fileId)!!;
   if (file.type === ".jpg" || file.type === ".png" || file.type === ".gif") {
      activeWindow.value = { fileId, status: true, type: "img" };
   } else {
      activeWindow.value = { fileId, status: true, type: "text" };
   }
}
onBeforeMount(() => {
   dispatch(GET_FILES_ACTION);
});
onBeforeMount(() => {
   
})
</script>

<template v-if="files">
   <div id="board">
      <FilterSection :view="view" @change-view="toggleView" />
      <MyModal
         :active="activeModal"
         @close-modal="toggleModal"
         @agree="deleteFilesHandler"
         :text="'Delete this files?'" />
      <PathComponent />
      <Table v-if="view === 'table'" class="mt-4" @open-file="openFile" />
      <IconsView v-else @open-file="openFile" />
      <FileContent
         v-if="activeWindow.type === 'text' && activeWindow.status"
         @close="activeWindow.status = false"
         :file-id="activeWindow.fileId" />
      <ImageManager
         v-if="activeWindow.type === 'img' && activeWindow.status"
         :file-id="activeWindow.fileId"
         @close="activeWindow.status = false" />
      <MainBodyFooter @click-on-delete="activeModal = true" />
   </div>
</template>
