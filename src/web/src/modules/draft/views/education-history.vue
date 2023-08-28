<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.education_history.legends.consent") }}</h3>
      <v-divider class="my-3" />

      <v-form>
        <label class="v-label my-4 d-block">Which Yukon high school(s) did you attended:</label>

        <v-row v-for="(item, key) in application.draft.education.education_history">
          <v-col cols="12" md="6">
            <v-autocomplete
              variant="outlined"
              hide-details
              bg-color="white"
              density="comfortable"
              v-model="item.school"
              label="School"
              maxlength="4"
              width="50"
              :items="yukonHighSchools"
              item-title="name"
              item-value="id" />
          </v-col>

          <v-col cols="12" md="6">
            <YearMonthSelector
              v-model="item.left_high_school"
              label="Date you left high school"
              :minYear="1980"
              style="margin-right: 55px"></YearMonthSelector>
            <div class="clear:both"></div>
          </v-col>
        </v-row>
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
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import Select from "@/components/forms/Select.vue";

import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { useReferenceStore } from "@/store/ReferenceStore";
import YearMonthSelector from "@/components/forms/YearMonthSelector.vue";

export default {
  components: {
    TextField,
    Select,
    DateSelector,
    YearMonthSelector,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useReferenceStore, ["yukonHighSchools"]),
  },
  data() {
    return {};
  },
  beforeMount() {
    this.application.draft.education.education_history = this.application.draft.education.education_history || [
      {
        school: "",
        left_high_school: "",
      },
    ];
  },
  watch: {},
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Education History"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Education History"));
      });
    },
  },
};
</script>
