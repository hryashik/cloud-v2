<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import MainBodyFooter from "./MainBodyFooter.vue";
import IconsView from "./icons/IconsView.vue";
import MyModal from "../../../components/ui/MyModal.vue";
import Table from "./table/Table.vue";
import ViewTab from "./ui/ViewTab.vue";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import apiService from "../../../services/apiService";

const { state, commit } = useStore(key);

const activeModal = ref(false);
const activeIds = ref<string[]>([]);
const currentPath = ref("/");
const view = ref<"table" | "icons">("icons");

onBeforeMount(async () => {
   const files = await apiService.getAllFiles();
   commit("getAllFiles", files);
});

function setActive(id: string) {
   if (activeIds.value.includes(id)) {
      activeIds.value = activeIds.value.filter(el => el !== id);
   } else {
      activeIds.value.push(id);
   }
}
function deleteFilesHandler() {
   /* activeModal.value = false;
   files.value = files.value.filter(el => !activeIds.value.includes(el.id));
   activeIds.value = []; */
}
function toggleModal() {
   activeModal.value = !activeModal.value;
}
function toggleView() {
   view.value === "icons" ? (view.value = "table") : (view.value = "icons");
}
</script>

<template v-if="files">
   <ViewTab :view="view" @change-view="toggleView" />
   <MyModal
      :active="activeModal"
      @close-modal="toggleModal"
      @agree="deleteFilesHandler"
      :text="'Delete this files?'" />
   <div>
      <span class="text-lg"><b>Path</b>: {{ currentPath }}</span>
   </div>
   <Table
      v-if="view === 'table'"
      class="mt-4"
      :active-ids="activeIds"
      @click-on-file="setActive" />
   <IconsView v-else @click-on-file="setActive" :active-ids="activeIds" />
   <MainBodyFooter
      :active-ids="activeIds"
      @cancel="activeIds = []"
      @click-on-delete="activeModal = true" />
</template>
