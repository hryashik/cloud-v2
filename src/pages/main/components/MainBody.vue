<script setup lang="ts">
import { ref } from "vue";
import MainBodyFooter from "./MainBodyFooter.vue";
import IconsView from "./icons/IconsView.vue";
import MyModal from "../../../components/ui/MyModal.vue";
import Table from "./table/Table.vue";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import { useToast } from "vue-toastification";
import { DELETE_FILES_ACTION } from "../../../store/actions-types";
import PathComponent from "./ui/PathComponent.vue";
import FilterSection from "./ui/FilterSection.vue";

const { dispatch, state } = useStore(key);

const toast = useToast();
const activeModal = ref(false);
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
</script>

<template v-if="files">
   <FilterSection
      :view="view"
      @change-view="toggleView"/>
   <MyModal
      :active="activeModal"
      @close-modal="toggleModal"
      @agree="deleteFilesHandler"
      :text="'Delete this files?'" />
   <PathComponent />
   <Table v-if="view === 'table'" class="mt-4" />
   <IconsView v-else />
   <MainBodyFooter
      @click-on-delete="activeModal = true" />
</template>
