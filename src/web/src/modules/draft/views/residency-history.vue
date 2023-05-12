<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
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
        <li>There should not be any gab in this two-year period.</li>
      </ul>

      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }" > -->
      <v-form @submit.prevent="submit" v-model="valid">
        <v-row v-for="(item, key) in application.draft.residency.residency_history">
          <v-col cols="12" md="4">
            <DateSelector v-model="item.start" label="From" />
          </v-col>
          <v-col cols="12" md="4">
            <DateSelector v-model="item.end" label="To" />
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
            <v-btn icon="mdi-delete" size="small" color="warning" @click="remove(key)" class="float-right"></v-btn>
            <Select v-model="item.country" label="Country" style="margin-right: 55px" />
          </v-col>
          <v-divider></v-divider>
        </v-row>

        <v-btn class="mt-6" color="info" @click="add()">Add residence</v-btn>
      </v-form>
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import moment from "moment";
import { useDraftStore } from "../store";
import { mapActions, mapWritableState } from "pinia";
import DateSelector from "@/components/forms/DateSelector.vue";
import TextField from "@/components/forms/TextField.vue";
import Select from "@/components/forms/Select.vue";

export default {
  components: { DateSelector, TextField, Select },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.residency.residency_history = this.application.draft.residency.residency_history || [];
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),
    add() {
      this.application.draft.residency.residency_history.push({
        start: this.formatDate(new Date()),
        end: this.formatDate(new Date()),
        city: "",
        province: "Yukon",
        country: "Canada",
        in_school: "Not in school",
      });
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
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Residency"));
      });
    },
  },
};
</script>
