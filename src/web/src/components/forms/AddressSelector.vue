<template>
  <v-row>
    <v-col cols="12">
      <TextField
        v-model="output.first"
        :label="$t('components.address_selector.labels.address_first')"
        @input="catcher" />
    </v-col>
    <v-col cols="12">
      <TextField
        v-model="output.second"
        :label="$t('components.address_selector.labels.address_second')"
        @input="catcher" />
    </v-col>
    <v-col cols="12" md="4">
      <v-autocomplete
        variant="outlined"
        bg-color="white"
        density="comfortable"
        v-model="output.city"
        :label="$t('components.address_selector.labels.address_city')"
        clearable
        :items="cities"
        autocomplete="null"
        item-value="id"
        item-title="description"
        @input="catcher" />
    </v-col>
    <v-col cols="12" md="4">
      <v-autocomplete
        variant="outlined"
        bg-color="white"
        density="comfortable"
        v-model="output.region"
        :label="$t('components.address_selector.labels.address_province')"
        clearable
        :items="provinces"
        autocomplete="null"
        item-value="id"
        item-title="description"
        @input="catcher" />
    </v-col>
    <v-col cols="12" md="4">
      <TextField
        v-model="output.postal"
        :label="$t('components.address_selector.labels.zip_postal_code')"
        @input="catcher" />
    </v-col>
  </v-row>
</template>

<script>
import TextField from "@/components/forms/TextField.vue";
import { useReferenceStore } from "@/store/ReferenceStore";
import { mapState } from "pinia";

export default {
  props: ["modelValue"],
  components: {
    TextField,
  },
  data() {
    return {
      output: {},
    };
  },
  computed: {
    ...mapState(useReferenceStore, ["cities", "provinces"]),
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
    catcher() {
      this.$emit("input", this.output);
      this.$emit("update:modelValue", this.output);
    },
  },
};
</script>
