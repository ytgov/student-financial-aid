<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("Funding Sources") }}</h3>
      <p>Please check any funding sources you would like to apply for fro the list below</p>
      <v-divider class="my-3" />
      <v-checkbox
        v-model="funding_sources"
        label="Scholarships administrated by Yukon Student Financial Assistance"
        value="Scholarships"
        hide-details
        density="comfortable"></v-checkbox>
      <v-checkbox
        v-model="funding_sources"
        label="Yukon Public School Excellence Award"
        value="Excellence"
        hide-details
        density="comfortable"></v-checkbox>
      <v-checkbox
        v-model="funding_sources"
        label="Yukon Grant and Student Training Allowance"
        value="YukonGrant"
        hide-details
        density="comfortable"></v-checkbox>
      <v-checkbox
        v-model="funding_sources"
        label="Canada Student Loans and Grants"
        value="Canada"
        hide-details
        density="comfortable"></v-checkbox>
    </v-card-text>
  </v-card>

  <v-btn color="primary" class="float-right" to="/application/onboarding/personal-details">Continue</v-btn>
</template>

<script>
import { mapWritableState } from "pinia";
import { useApplicationStore } from "../../../store";

export default {
  components: {},
  data: () => ({
    student: { first_name: "", last_name: "", middle_name: "", sin: "", birth_date: "" },
    errors: [],
  }),
  computed: {
    ...mapWritableState(useApplicationStore, ["funding_sources"]),
    valid() {
      var is_valid = true;
      return is_valid;
    },
    next() {
      return "/application/onboarding/addresses";
    },
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    },
  },
};
</script>
