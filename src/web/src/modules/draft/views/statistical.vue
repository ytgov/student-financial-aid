<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.statistical.legends.personal_details") }}</h3>

      <p>Student statistical information for the current year:</p>
      <v-divider class="my-3" />

      <v-form>
        <v-radio-group v-model="application.draft.statistical.language" inline :label="$t('Language')">
          <v-radio label="English" value="English"></v-radio>
          <v-radio label="French" value="French"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="application.draft.statistical.gender" inline :label="$t('Gender')">
          <v-radio label="Male" value="Male"></v-radio>
          <v-radio label="Female" value="Female"></v-radio>
          <v-radio label="Other Gender" value="Other"></v-radio>
          <v-radio label="Unspecified" value="Unspecified"></v-radio>
        </v-radio-group>

        <v-select
          :label="$t('eligibility.marital.title')"
          v-model="application.draft.statistical.marital_status"
          :items="maritalStatus"
          item-title="description"
          item-value="id"
          variant="outlined"
          bg-color="white"
          density="comfortable"></v-select>

        <Select
          class="mb-5"
          name="Citizenship"
          v-model="application.draft.statistical.citizenship"
          :label="$t('eligibility.citizenship.title')"
          item-title="description"
          item-value="id"
          :options="citizenship" />

        <v-select
          v-model="application.draft.statistical.aboriginal_status"
          label="Aboriginal Status"
          :items="aboriginalStatus"
          item-title="description"
          item-value="id"
          variant="outlined"
          bg-color="white"
          density="comfortable"></v-select>

        <Select
          v-if="application.draft.statistical.aboriginal_status && application.draft.statistical.aboriginal_status == 5"
          v-model="application.draft.statistical.first_nation"
          label="Yukon First Nation"
          item-title="description"
          item-value="id"
          :options="firstNations" />
      </v-form>
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
import Select from "@/components/forms/Select.vue";
import Buttons from "@/components/forms/Buttons.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "@/modules/draft/store";
import { useReferenceStore } from "@/store/ReferenceStore";

export default {
  components: {
    Select,
    Buttons,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useReferenceStore, ["firstNations", "maritalStatus", "aboriginalStatus", "citizenship"]),
  },
  mounted() {},
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Statistical Information"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Statistical Information"));
      });
    },
  },
};
</script>
