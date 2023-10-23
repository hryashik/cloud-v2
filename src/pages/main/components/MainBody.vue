<script setup lang="ts">
import { ref } from "vue";
import MainBodyFooter from "./MainBodyFooter.vue";
import IconsView from "./icons/IconsView.vue";
import MyModal from "../../../components/ui/MyModal.vue";
import Table from "./table/Table.vue";
import ViewTab from "./ui/ViewTab.vue";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import { useToast } from "vue-toastification";
import { DELETE_FILES_ACTION } from "../../../store/actions-types";
import BackArrow from "./ui/BackArrow.vue";

const { dispatch } = useStore(key);

const toast = useToast();
const activeModal = ref(false);
const activeIds = ref<string[]>([]);
const currentPath = ref("/");
const view = ref<"table" | "icons">("icons");

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
   <div class="flex h-10 items-center">
      <BackArrow />
      <div class="ml-4">
         <span class="text-lg"><b>Path</b>: {{ currentPath }}</span>
      </div>
   </div>

   <Table v-if="view === 'table'" class="mt-4" :active-ids="activeIds" />
   <IconsView v-else @click-on-file="setActive" :active-ids="activeIds" />
   <MainBodyFooter
      :active-ids="activeIds"
      @cancel="activeIds = []"
      @click-on-delete="activeModal = true" />
</template>
