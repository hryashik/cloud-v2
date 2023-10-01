<script setup lang="ts">
const { type, value } = defineProps({
   value: { type: String },
   type: { type: String, required: true },
});
const emit = defineEmits(["changeValue"]);
function changeValue(e: Event) {
   const target = e.target as HTMLInputElement;
   emit("changeValue", target.value);
}
</script>

<template>
   <input
      class="mb-2 rounded-md border border-neutral-300 p-2"
      :type="type"
      :value="value"
      :id="type"
      @change="changeValue"
      autocomplete="false" />
</template>
