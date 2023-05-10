<template>
  <v-row>
    <v-col cols="12">
      <TextField
        v-model="output.first"
        :label="$t('components.address_selector.labels.address_first')"
        @input="catcher"
    /></v-col>
    <v-col cols="12">
      <TextField
        v-model="output.second"
        :label="$t('components.address_selector.labels.address_second')"
        @input="catcher"
    /></v-col>
    <v-col cols="12" md="4">
      <TextField v-model="output.city" :label="$t('components.address_selector.labels.address_city')" @input="catcher"
    /></v-col>
    <v-col cols="12" md="4">
      <TextField v-model="output.region" :label="$t('components.address_selector.labels.address_province')" @input="catcher"
    /></v-col>
    <v-col cols="12" md="4">
      <TextField
        v-model="output.postal"
        :label="$t('components.address_selector.labels.zip_postal_code')"
        @input="catcher"
    /></v-col>
  </v-row>
</template>

<script>
import TextField from "@/components/forms/TextField.vue";

export default {
  props: ["value"],
  components: {
    TextField,
  },
  data() {
    return {
      output: {},
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
    catcher() {
      this.$emit("input", this.output);
      this.$emit("update:modelValue", this.output);
    },
  },
};
</script>
