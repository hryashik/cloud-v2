<script setup lang="ts">
const { name, type, date, size } = defineProps<{
   name: string;
   type: string;
   date: string;
   size: string;
}>();
</script>

<template>
   <div class="grid select-none grid-cols-4 justify-items-center">
      <div>
         {{ name }}
      </div>
      <div>
         {{ type }}
      </div>
      <div>
         {{ date }}
      </div>
      <div>
         {{ size }}
      </div>
   </div>
</template>

<style scoped>

</style>
