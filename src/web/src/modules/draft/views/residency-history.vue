<template>
  <v-card color="#eee5d1" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.residency_history.legends.consent") }}</h3>
      <p class="mb-3">
        Student consent to release information to another person: Please provide a complete breakdown of where you were
        physically living for the 2 years immediately prior to starting classes.
      </p>
      <ul style="margin-left: 20px">
        <li>
          Separate the two years into periods of time when you were in high school or post-secondary including summer
          breaks as full-time, part-time or not in school at all.
        </li>
        <li>Include all absence and returns to Yukon.</li>
        <li>There should not be any gap in this two-year period.</li>
        <li>
          You must account for the timeframe between <strong>{{ accountAfter }}</strong> and
          <strong>{{ residencyMaxDate }}</strong>
        </li>
      </ul>

      <v-divider class="my-3" />

      <v-form>
        <v-row v-for="(item, key) in application.draft.residency.residency_history">
          <v-col cols="12" md="4">
            <YearMonthSelector v-model="item.start" label="Residence: From - To" :maxDate="toFullDate(item.end)" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              hide-details
              append-inner-icon="mdi-lock"
              readonly
              label="To"
              v-model="item.end"
              density="comfortable"
              variant="outlined"
              bg-color="white" />
          </v-col>
          <v-col cols="12" md="4">
            <Select v-model="item.in_school" label="In School?" :items="['Not in school', 'Full-time', 'Part-time']" />
          </v-col>
          <v-col cols="12" md="4">
            <TextField v-model="item.city" label="City" />
          </v-col>
          <v-col cols="12" md="4">
            <TextField v-model="item.province" label="Province" />
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              v-if="key > 0"
              icon="mdi-delete"
              size="small"
              color="warning"
              @click="remove(key)"
              class="float-right"></v-btn>
            <Select v-model="item.country" label="Country" :style="key > 0 ? 'margin-right: 55px' : ''" />
          </v-col>
          <v-col cols="12" class="pt-0">
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
import YearMonthRangeSelector from "@/components/forms/YearMonthRangeSelector.vue";

export default {
  components: { DateSelector, TextField, Select, YearMonthSelector, YearMonthRangeSelector },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useDraftStore, ["residencyTotalMonths", "residencyMaxDate"]),

    accountAfter() {
      return moment(this.application.draft.program_details.start_date_of_classes)
        .startOf("month")
        .subtract(25, "month")
        .format("YYYY/MM");
    },
  },
  data() {
    return {
      isValid: false,
    };
  },
  mounted() {
    this.application.draft.residency.residency_history = this.application.draft.residency.residency_history || [];

    if (this.application.draft.residency.residency_history.length == 0) {
      console.log("INIT", this.residencyMaxDate);

      this.application.draft.residency.residency_history.push({
        end: this.residencyMaxDate,
        city: "",
        province: "Yukon",
        country: "Canada",
        in_school: "Not in school",
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
          province: "Yukon",
          country: "Canada",
          in_school: "Not in school",
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
