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
            persistent-hint
            hint="If your institution isn't listed, please select 'Not listed'"
            :label="$t('Institution')" />
        </v-col>

        <!--<v-col cols="12" md="6">
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
        </v-col> -->
        <v-col cols="12" md="12">
          <v-autocomplete
            label="Program name"
            v-model="application.draft.program_details.study_area"
            :items="studyAreas"
            item-title="description"
            item-value="id"
            variant="outlined"
            bg-color="white"
            persistent-hint
            hint="If your program isn't listed, please select 'Not listed'"
            density="comfortable"></v-autocomplete>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="Program type"
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
          <Select
            v-model="application.draft.program_details.attendance"
            :label="$t('application.program_details.details.attendance')"
            :options="['Full Time', 'Part Time']" />
        </v-col>
        <v-col cols="12" md="6">
          <TextField
            type="number"
            min="1"
            v-model="application.draft.program_details.duration_of_program"
            :label="$t('application.program_details.details.duration_of_program')" />
        </v-col>
        <v-col cols="12" md="6">
          <TextField
            type="number"
            min="1"
            v-model="application.draft.program_details.year_entering"
            :label="$t('application.program_details.details.year_entering')" />
        </v-col>
        <v-col cols="12" md="6">
          <DateSelector
            :min="startMinDate"
            :max="startMaxDate"
            v-model="application.draft.program_details.start_date_of_classes"
            :label="$t('application.program_details.details.start_date_of_classes')" />
        </v-col>
        <v-col cols="12" md="6">
          <DateSelector
            :min="endMinDate"
            :max="endMaxDate"
            v-model="application.draft.program_details.end_date_of_classes"
            :label="$t('application.program_details.details.end_date_of_classes')" />
        </v-col>
      </v-row>
      <v-alert v-if="badDates" type="error" class="mt-5"
        >The start date and end date must be within 12 months of eachother.</v-alert
      >
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
import moment from "moment";
import Select from "@/components/forms/Select.vue";
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { useReferenceStore } from "@/store/ReferenceStore";
import { useUserStore } from "@/store/UserStore";
import { nextTick } from "vue";

export default {
  components: {
    Select,
    TextField,
    DateSelector,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useDraftStore, ["availableSectionProgram"]),
    ...mapState(useReferenceStore, ["institutions", "studyAreas", "programs"]),
    ...mapState(useUserStore, ["academicYears"]),

    selectedAcademicYear() {
      if (this.academicYears) return this.academicYears.find((a) => a.id == this.application.academic_year_id);
      return null;
    },

    badDates() {
      if (
        this.application.draft.program_details.start_date_of_classes &&
        this.application.draft.program_details.end_date_of_classes
      ) {
        let start = moment(this.application.draft.program_details.start_date_of_classes);
        let end = moment(this.application.draft.program_details.end_date_of_classes);

        return start.add(1, "year").subtract(1, "day").isBefore(end);
      }

      return false;
    },

    startMinDate() {
      if (this.selectedAcademicYear) {
        return moment(this.selectedAcademicYear.start_date).add(8, "hours").toDate();
      }

      return new Date(`${this.application.academic_year_id}-8-1`);
    },
    startMaxDate() {
      if (this.selectedAcademicYear) {
        return moment(this.selectedAcademicYear.end_date).add(8, "hours").toDate();
      }

      return new Date(`${this.application.academic_year_id}-8-1`);
    },
    endMinDate() {
      if (this.application.draft.program_details.start_date_of_classes)
        return this.application.draft.program_details.start_date_of_classes;

      return this.startMinDate;
    },
    endMaxDate() {
      if (this.application.draft.program_details.start_date_of_classes) {
        return moment(this.application.draft.program_details.start_date_of_classes)
          .add(1, "year")
          .subtract(1, "day")
          .toDate();
      }

      return this.startMinDate;
    },
  },
  mounted() {
    if (!this.availableSectionProgram) this.$router.push(`/draft/${this.application.id}`);

    if (!this.application.draft.program_details.start_date_of_classes)
      this.application.draft.program_details.start_date_of_classes = new Date(
        `${this.application.academic_year_id}-8-1`
      );
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
