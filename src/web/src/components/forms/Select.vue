<template>
  <v-select
    :label="label"
    v-model="selected"
    :items="options"
    variant="outlined"
    bg-color="white"
    density="comfortable"
    hide-details></v-select>
</template>

<script>
export default {
  props: ["name", "options", "value", "label"],
  data() {
    return {
      selected: "",
    };
  },
  mounted() {
    this.selected = this.value || "";
  },
  watch: {
    selected() {
      this.$emit("input", this.selected);
      this.$emit("update:modelValue", this.selected);
    },
  },
};
</script>
