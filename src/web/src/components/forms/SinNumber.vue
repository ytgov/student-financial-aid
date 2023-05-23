<template>
  <v-text-field
    v-model="output"
    label="SIN"
    placeholder="999999999"
    variant="outlined"
    density="comfortable"
    bg-color="white"
    @update:model-value="sinChanged"
    hide-details></v-text-field>
</template>

<script lang="ts">
export default {
  props: ["modelValue", "label", "errors", "valid"],
  data() {
    return {
      output: "",
    };
  },
  mounted() {
    if (this.modelValue) {
      this.output = this.modelValue;
    }
  },
  watch: {
    output(to, from) {
      this.$emit("input", this.output);
      this.$emit("update:modelValue", this.output);
    },
  },
  methods: {
    sinChanged(newV: any) {
      this.output = newV.replace(/[^0-9.]/g, "").substring(0, 9);
    },
  },
};
</script>
