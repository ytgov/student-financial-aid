<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.program_details.title") }}</h3>
      <v-divider class="my-3" />

      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="application.draft.program_details.institution_id"
            :items="institutions"
            item-title="name"
            item-value="id"
            bg-color="white"
            density="comfortable"
            variant="outlined"
            hide-details
            :label="$t('Institution')" />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="Study field"
            v-model="application.draft.program_details.study_field"
            :items="studyFields"
            item-title="description"
            item-value="id"
            variant="outlined"
            bg-color="white"
            hide-details
            @update:model-value="application.draft.program_details.study_area = undefined"
            density="comfortable"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Study area"
            v-model="application.draft.program_details.study_area"
            :items="studyAreas"
            item-title="description"
            item-value="id"
            variant="outlined"
            bg-color="white"
            hide-details
            density="comfortable"></v-select>
        </v-col>

        <v-col cols="12">
          <v-select
            label="Program"
            v-model="application.draft.program_details.program"
            :items="programs"
            item-title="description"
            item-value="id"
            variant="outlined"
            bg-color="white"
            hide-details
            density="comfortable"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <TextField
            type="number"
            v-model="application.draft.program_details.duration_of_program"
            :label="$t('application.program_details.details.duration_of_program')" />
        </v-col>
        <v-col cols="12" md="6">
          <TextField
            type="number"
            v-model="application.draft.program_details.year_entering"
            :label="$t('application.program_details.details.year_entering')" />
        </v-col>
        <v-col cols="12" md="12">
          <Select
            v-model="application.draft.program_details.attendance"
            :label="$t('application.program_details.details.attendance')"
            :options="['Full Time', 'Part Time']" />
        </v-col>
        <v-col cols="12" md="6">
          <DateSelector
            v-model="application.draft.program_details.start_date_of_classes"
            :label="$t('application.program_details.details.start_date_of_classes')" />
        </v-col>
        <v-col cols="12" md="6">
          <DateSelector
            v-model="application.draft.program_details.end_date_of_classes"
            :label="$t('application.program_details.details.end_date_of_classes')" />
        </v-col>
      </v-row>
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
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { useReferenceStore } from "@/store/ReferenceStore";

export default {
  components: {
    Select,
    TextField,
    DateSelector,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useDraftStore, ["availableSectionProgram"]),
    ...mapState(useReferenceStore, ["institutions", "studyFields", "programs"]),
    studyAreas() {
      if (this.application.draft.program_details.study_field) {
        let t = this.studyFields.filter((s) => s.id == this.application.draft.program_details.study_field);

        return this.studyFields
          .filter((s) => s.id == this.application.draft.program_details.study_field)
          .flatMap((s) => s.areas);
      } else return [];
    },
  },
  mounted() {
    if (!this.availableSectionProgram) this.$router.push(`/draft/${this.application.id}`);
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Program Details"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Program Details"));
      });
    },
  },
};
</script>
