<template>
  <v-card color="#eee5d1" elevation="0">
    <v-card-text>
      <v-form>
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.residency_history.legends.consent") }}</h3>
        <p class="mb-3">
          Please provide a complete breakdown of where you were physically living for the 2 years immediately prior to
          starting classes.
        </p>

        <v-divider class="my-3" />

        <v-row>
          <v-col cols="12">
            <v-select
              label="Travel from school to Yukon"
              v-model="application.draft.residency.has_traveled"
              variant="outlined"
              bg-color="white"
              density="comfortable"
              :items="travelOptions"></v-select>
            <YearMonthSelector
              v-if="application.draft.residency.has_traveled == 1"
              v-model="application.draft.residency.last_return_date"
              label="When was the last time you have returned to the Yukon?"></YearMonthSelector>
          </v-col>
        </v-row>

        <v-divider class="mt-5 mb-3" />
        <ul style="margin-left: 20px">
          <li>
            Separate the two years into periods of time when you were in high school or post-secondary including summer
            breaks as full-time, part-time or not in school at all.
          </li>
          <li>Include all absences and returns to Yukon.</li>
          <li>There should not be any gap in this two-year period.</li>
          <li>
            You must account for the time frame between <strong>{{ accountAfter }}</strong> and
            <strong>{{ residencyMaxDate }}</strong>
          </li>
        </ul>

        <v-divider class="mt-3 mb-5" />

        <v-row v-for="(item, key) in application.draft.residency.residency_history">
          <v-col cols="12" md="4">
            <YearMonthSelector v-model="item.start" label="Residence: From" :maxDate="toFullDate(item.end)" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              hide-details
              append-inner-icon="mdi-lock"
              readonly
              label="Residence: To"
              v-model="item.end"
              density="comfortable"
              variant="outlined"
              bg-color="white" />
          </v-col>
          <v-col cols="12" md="4">
            <Select
              v-model="item.in_school"
              label="In School?"
              :items="[
                { value: 0, title: 'Not in school' },
                { value: 1, title: 'Full-time' },
                { value: 2, title: 'Part-time' },
              ]" />
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              variant="outlined"
              bg-color="white"
              density="comfortable"
              v-model="item.city"
              :label="$t('components.address_selector.labels.address_city')"
              clearable
              :items="cities"
              autocomplete="null"
              hide-details
              item-value="id"
              item-title="description" />
          </v-col>
          <v-col cols="12" md="4"
            ><v-autocomplete
              variant="outlined"
              bg-color="white"
              density="comfortable"
              v-model="item.province"
              :label="$t('components.address_selector.labels.address_province')"
              clearable
              :items="provinces"
              autocomplete="null"
              hide-details
              item-value="id"
              item-title="description" />
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              v-if="key > 0"
              icon="mdi-delete"
              size="small"
              color="warning"
              @click="remove(key)"
              class="float-right"></v-btn>

            <v-autocomplete
              variant="outlined"
              bg-color="white"
              density="comfortable"
              v-model="item.country"
              :label="$t('Country')"
              clearable
              hide-details
              :items="countries"
              autocomplete="null"
              item-value="id"
              item-title="description"
              :style="key > 0 ? 'margin-right: 55px' : ''" />
          </v-col>
          <v-col cols="12" class="pt-0 pl-6">
            <v-label>Duration: {{ calcDate(item) }} months</v-label>
          </v-col>
          <v-divider></v-divider>
        </v-row>

        <v-btn class="mt-6" color="info" @click="add()">Add residence</v-btn>
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
import moment from "moment";
import { useDraftStore } from "../store";
import { mapActions, mapState, mapWritableState } from "pinia";
import DateSelector from "@/components/forms/DateSelector.vue";
import TextField from "@/components/forms/TextField.vue";
import Select from "@/components/forms/Select.vue";
import YearMonthSelector from "@/components/forms/YearMonthSelector.vue";
import { useNotificationStore } from "@/store/NotificationStore";
import { useReferenceStore } from "@/store/ReferenceStore";

export default {
  components: { DateSelector, TextField, Select, YearMonthSelector },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useDraftStore, ["residencyTotalMonths", "residencyMaxDate", "residencyRequireMonths"]),
    ...mapState(useReferenceStore, ["cities", "provinces", "countries"]),

    accountAfter() {
      return moment(this.application.draft.program_details.start_date_of_classes)
        .startOf("month")
        .subtract(25, "month")
        .format("YYYY/MM");
    },
    travelOptions() {
      return [
        { title: `I have returned to the Yukon in the last ${this.residencyRequireMonths} months`, value: 1 },
        { title: `I have not returned to the Yukon in the last ${this.residencyRequireMonths} months`, value: 0 },
        { title: `I have not left Yukon in the last ${this.residencyRequireMonths} months`, value: -1 },
      ];
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.residency.has_traveled = this.application.draft.residency.has_traveled || 1;
    this.application.draft.residency.residency_history = this.application.draft.residency.residency_history || [];

    if (this.application.draft.residency.residency_history.length == 0) {
      this.application.draft.residency.residency_history.push({
        start: this.accountAfter,
        end: this.residencyMaxDate,
        city: "",
        province: 3,
        country: 1,
        in_school: 0,
      });
    }
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    add() {
      let last =
        this.application.draft.residency.residency_history[
          this.application.draft.residency.residency_history.length - 1
        ];

      if (last && last.start) {
        let newEnd = moment(`${last.start}/01`).subtract(1, "month").format("YYYY/MM");
        let newStart = moment(`${last.start}/01`).subtract(13, "month").format("YYYY/MM");

        this.application.draft.residency.residency_history.push({
          start: newStart,
          end: newEnd,
          readonly: true,
          city: "",
          province: 3,
          country: 1,
          in_school: 0,
        });
      } else {
        let notify = useNotificationStore();
        notify.notify({ variant: "error", text: "You must enter a From date on the previous residence" });
      }
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.residency.residency_history.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
    formatDate(input) {
      if (input) return moment(input).format("YYYY-MM-DD");
      return "";
    },
    isAfter(start, end) {
      return start < end;
    },
    calcDate(item) {
      if (item.start && item.end) return moment(item.end).diff(moment(item.start), "months");
      return 0;
    },
    toFullDate(input) {
      if (input) return moment(`${input}/01`).subtract(1, "day").toDate();
      return null;
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Residency"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Residency"));
      });
    },
  },
};
</script>
