<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("Funding Sources") }}</h3>
      <p>Please check any funding sources you would like to apply for fro the list below</p>
      <v-divider class="my-3" />
      <v-checkbox
        v-model="application.draft.funding_sources"
        label="Scholarships administrated by Yukon Student Financial Assistance"
        value="Scholarships"
        hide-details
        density="comfortable"></v-checkbox>
      <v-checkbox
        v-model="application.draft.funding_sources"
        label="Yukon Public School Excellence Award"
        value="Excellence"
        hide-details
        density="comfortable"></v-checkbox>
      <v-checkbox
        v-model="application.draft.funding_sources"
        label="Yukon Grant and Student Training Allowance"
        value="YukonGrant"
        hide-details
        density="comfortable"></v-checkbox>
      <v-checkbox
        v-model="application.draft.funding_sources"
        label="Canada Student Loans and Grants"
        value="Canada"
        hide-details
        density="comfortable"></v-checkbox>
    </v-card-text>
  </v-card>

  <div>
    <v-btn color="info" @click="backClick" class="float-left pl-3">
      <v-icon class="mr-2">mdi-arrow-left</v-icon> Previous
    </v-btn>
    <div class="text-right mt-5">
      <v-btn color="primary" class="mr-3" @click="saveClick">Save</v-btn>
      <v-btn color="primary" @click="nextClick" class="pr-3">
        Save and Next <v-icon class="ml-2">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {},
  data: () => ({}),
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    next() {
      return "/application/onboarding/addresses";
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Funding Sources"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Funding Sources"));
      });
    },
  },
};
</script>
