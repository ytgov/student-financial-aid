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
  props: ["value", "label", "errors", "valid"],
  data() {
    return {
      output: "",
    };
  },
  mounted() {
    if (this.value) {
      this.output = this.value;
    }
  },
  watch: {
    output(to, from) {
      console.log("test")
      this.$emit("input", this.output);
    },
  },
  methods: {
    sinChanged(newV: any) {
      console.log("TESTIN1", newV)
      this.output = newV.replace(/[^0-9.]/g, "").substring(0, 9);
    },
  },
};
</script>
