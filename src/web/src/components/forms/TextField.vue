<template>
  <v-text-field
    type="text"
    v-model="output"
    :label="label"
    :placeholder="placeholder"
    variant="outlined"
    bg-color="white"
    density="comfortable"
    hide-details
    @blur="blur"
    @focus="focus"
    @click="click"
    @change="change"
    :class="{ error: !valid }" />
</template>

<script>
export default {
  name: "TextField",
  props: ["name", "label", "value", "placeholder", "errors", "valid"],
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
      this.$emit("input", this.output);
      this.$emit("update:modelValue", this.output);
    },
  },
  methods: {
    blur() {
      this.$emit("blur");
    },
    focus() {
      this.$emit("focus");
    },
    click(e) {
      this.$emit("click", e);
    },
    change() {
      this.$emit("change");
    },
  },
};
</script>
