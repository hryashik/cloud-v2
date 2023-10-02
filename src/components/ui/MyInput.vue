<script setup lang="ts">
const { type, value } = defineProps({
   value: { type: String },
   type: { type: String, required: true },
   placeholder: String,
});
const emit = defineEmits(["changeValue"]);
function changeValue(e: Event) {
   const target = e.target as HTMLInputElement;
   emit("changeValue", target.value);
}
</script>

<template>
   <input
      class="border border-neutral-300 p-2 first-letter:rounded-md"
      :type="type"
      :value="value"
      :id="type"
      :placeholder="placeholder"
      @change="changeValue"
      autocomplete="false" />
</template>
