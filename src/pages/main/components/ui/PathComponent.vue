<script lang="ts" setup>
import { useStore } from "vuex";
import BackArrow from "./BackArrow.vue";
import { key } from "../../../../store/store";

const { state } = useStore(key);

</script>
<template>
   <div>
      <div class="flex items-center">
         <BackArrow />
         <div class="ml-4">
            <span class="text-lg">main/{{ state.currentDir?.path }}</span>
         </div>
      </div>
   </div>
</template>
