<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import MainBodyFooter from "./MainBodyFooter.vue";
import IconsView from "./icons/IconsView.vue";
import MyModal from "../../../components/ui/MyModal.vue";
import Table from "./table/Table.vue";
import ViewTab from "./ui/ViewTab.vue";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import apiService from "../../../services/apiService";
import { GET_ALL_FILES } from "../../../store/mutations-types";
import { useToast } from "vue-toastification";
import { DELETE_FILES_ACTION } from "../../../store/actions-types";
import { useRoute } from "vue-router";

const { commit, dispatch } = useStore(key);
const route = useRoute();

const toast = useToast();
const activeModal = ref(false);
const activeIds = ref<string[]>([]);
const currentPath = ref("/");
const view = ref<"table" | "icons">("icons");

watch(() => route.query.path, newValue => {
   
})

onBeforeMount(async () => {
   const files = await apiService.getAllFiles();
   commit(GET_ALL_FILES, files);
});

function setActive({ id, key }: { id: string; key?: boolean }) {
   if (activeIds.value.includes(id)) {
      activeIds.value = activeIds.value.filter(el => el !== id);
   } else {
      if (key) activeIds.value.push(id);
      else activeIds.value = [id];
   }
}
async function deleteFilesHandler() {
   dispatch(DELETE_FILES_ACTION, activeIds.value).catch(() =>
      toast.error("Delete was failed"),
   );
   activeModal.value = false;
   activeIds.value = [];
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
   <Table v-if="view === 'table'" class="mt-4" :active-ids="activeIds" />
   <IconsView v-else @click-on-file="setActive" :active-ids="activeIds" />
   <MainBodyFooter
      :active-ids="activeIds"
      @cancel="activeIds = []"
      @click-on-delete="activeModal = true" />
</template>
