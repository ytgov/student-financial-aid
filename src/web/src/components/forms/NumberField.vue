<template>
  <v-text-field
    type="number"
    :label="label"
    v-model="output"
    :name="name"
    :placeholder="placeholder"
    variant="outlined"
    bg-color="white"
    density="compact"
    hide-details
    :min="min"
    :max="max"
    @blur="blur"
    @focus="focus"
    @click="click"
    @change="change" />
</template>

<script>
export default {
  name: "TextField",
  props: ["name", "label", "value", "placeholder", "errors", "valid", "min", "max"],
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
