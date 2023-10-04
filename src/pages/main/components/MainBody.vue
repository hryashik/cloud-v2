<script setup lang="ts">
import { ref } from "vue";
import { FileType } from "../../../types/file.ts";
import StringOfTable from "./StringOfTable.vue";
import HeaderTable from "./table/HeaderTable.vue";
import MainBodyFooter from "./MainBodyFooter.vue";
import MyModal from "../../../components/ui/MyModal.vue";
import Table from "./table/Table.vue";

const files = ref<FileType[]>([
   {
      name: "myphotoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      date: "10/10/10",
      size: "10MB",
      type: "jpg",
      id: "1",
   },
   { name: "sdasd", date: "10/10/10", size: "10MB", type: "dir", id: "2" },
]);

const activeModal = ref(false);
const activeIds = ref<string[]>([]);
const currentPath = ref("/");
const view = ref<"table" | "icons">("table");

function setActive(id: string) {
   if (activeIds.value.includes(id)) {
      activeIds.value = activeIds.value.filter(el => el !== id);
   } else {
      activeIds.value.push(id);
   }
}
function deleteFilesHandler() {
   activeModal.value = false;
   files.value = files.value.filter(el => !activeIds.value.includes(el.id));
   activeIds.value = [];
}
function toggleModal() {
   activeModal.value = !activeModal.value;
}
</script>

<template v-if="files">
   <button @click="view = 'icons'">CHANGE VIEW</button>
   <MyModal
      :active="activeModal"
      @close-modal="toggleModal"
      @agree="deleteFilesHandler"
      :text="'Delete this files?'" />
   <div>
      <span class="text-lg"><b>Path</b>: {{ currentPath }}</span>
   </div>
   <div class="mt-4" v-if="view === 'table'">
      <HeaderTable />
      <StringOfTable
         v-for="element of files"
         :key="element.id"
         :id="element.id"
         :name="element.name"
         :date="element.date"
         :size="element.size"
         :type="element.type"
         :active-ids="activeIds"
         @click-on-file="setActive" />
        <!--  <Table :files="files" :active-ids="activeIds"/> -->
   </div>
   <MainBodyFooter
      :active-ids="activeIds"
      @cancel="activeIds = []"
      @click-on-delete="activeModal = true" />
</template>
