<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("Funding Sources") }}</h3>
      <p>Please check any funding sources you would like to apply for fro the list below</p>
      <v-divider class="my-3" />

      <div v-for="(item, key) of fundingSources">
        <v-checkbox
          class="disableable"
          v-model="application.draft.funding_sources.sources"
          :label="item.name"
          :value="item.name"
          :error="!isError(item.message)"
          :disabled="!isError(item.message)"
          hide-details
          density="comfortable" />
        <div
          v-if="
            item.name == 'Canada Student Financial Assistance (Full-Time)' &&
            application.draft.funding_sources.sources.includes('Canada Student Financial Assistance (Full-Time)')
          ">
          <v-radio-group v-model="application.draft.funding_sources.csfa_amounts">
            <v-radio
              class="disableable ml-7"
              label="I want to apply for the full amount possible (loan and grants)"
              value="Full amount loans and grants"
              :error="!isError(item.message)"
              :disabled="!isError(item.message)"
              hide-details
              density="comfortable" />
            <v-radio
              class="disableable ml-7"
              label="I want to apply for grants only (I do not want a loan)"
              value="Grants only"
              :error="!isError(item.message)"
              :disabled="!isError(item.message)"
              hide-details
              density="comfortable" />
            <v-radio
              class="disableable ml-7"
              label="I want to apply for the full amount of grants, but only a maximum of 123 in loan"
              value="Grants and loans up to"
              :error="!isError(item.message)"
              :disabled="!isError(item.message)"
              hide-details
              density="comfortable">
              <template v-slot:label="{ props, item }">
                I want to apply for the full amount of grants, and loans up to:
                <text-field
                  type="number"
                  v-model="application.draft.funding_sources.csfa_loan_amount"
                  class="d-inline-flex ml-2"
                  prepend-inner-icon="mdi-currency-usd"
                  density="compact"
                  style="max-width: 150px"></text-field>
              </template>
            </v-radio>
          </v-radio-group>
        </div>

        <div class="text-error ml-9 d-flex" style="position: relative; margin-top: -10px">{{ item.message }}</div>
      </div>
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
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { isUndefined } from "lodash";
import TextField from "@/components/forms/TextField.vue";

export default {
  components: { TextField },
  data: () => ({}),
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useDraftStore, ["fundingSources"]),
    next() {
      return "/application/onboarding/addresses";
    },
  },
  mounted() {
    this.application.draft.funding_sources.sources = this.application.draft.funding_sources.sources || [];
    let newList = [];

    for (let fs of this.application.draft.funding_sources.sources) {
      let match = this.fundingSources.filter((f) => f.name == fs);
      if (!match[0].message) newList.push(fs);
    }
    this.application.draft.funding_sources.sources = newList;
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
      isUndefined;
      this.save().then(() => {
        this.$router.push(this.getNext("Funding Sources"));
      });
    },
    isError(val) {
      return isUndefined(val);
    },

  },
};
</script>

<style>
.disableable .v-selection-control--error .v-label {
  text-decoration: line-through !important;
  color: #9b1b27 !important;
}
.disableable .v-selection-control--disabled {
  opacity: 1 !important;
}
</style>
