<script setup lang="ts">
import Tabs from "./components/Tabs.vue";
import MainBody from "./components/MainBody.vue";
import { watch } from "vue";
import { useStore } from "vuex";
import { key } from "../../store/store";
import { CHANGE_CURRENT_FOLDER } from "../../store/mutations-types";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { commit, state } = useStore(key);

watch(
   () => state.currentDir,
   value => {
      if (value) {
         router.push(`/space?path=${value.path}`)
      } else {
         router.push("/space")
      }
   },
);
watch(
   () => route.query.path,
   newValue => {
      commit(CHANGE_CURRENT_FOLDER, newValue)
   }
)
</script>

<template>
   <div>
      <Tabs />
      <MainBody />
   </div>
</template>
