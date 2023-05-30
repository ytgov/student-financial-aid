<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.csfa_expenses.legends.expenses") }}</h3>
      <p>
        {{ $t("application.onboarding.csfa_expenses.excerpt") }}
      </p>
      <v-divider class="my-3" />
      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form>
        <v-row v-for="(item, key) in application.draft.csfa_expenses.expenses">
          <v-col cols="12" md="6">
            <v-select
              v-model="item.type"
              :items="types"
              item-title="value"
              item-value="value"
              label="Type"
              :hint="item.note || note(item.type)"
              persistent-hint
              variant="outlined"
              bg-color="white"
              :readonly="item.required"
              density="comfortable">
            </v-select>
          </v-col>
          <v-col cols="12" md="2">
            <Currency v-model="item.amount" label="Amount" />
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              v-if="!item.required == true"
              icon="mdi-delete"
              size="small"
              color="warning"
              @click="remove(key)"
              class="float-right"></v-btn>
            <TextField v-model="item.comments" label="Comments" style="margin-right: 55px" />
          </v-col>
          <v-divider />
        </v-row>

        <v-btn class="mt-6" color="info" @click="add()">Add expense</v-btn>
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
import _ from "lodash";

import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import TextField from "@/components/forms/TextField.vue";
import Select from "@/components/forms/Select.vue";
import Currency from "@/components/forms/Currency.vue";

export default {
  components: { TextField, Select, Currency },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),

    note() {
      return (type) => {
        var item = _.find(this.types, (o) => {
          return o.value == type;
        });

        return item ? item.note : false;
      };
    },
  },
  data() {
    return {
      types: [
        /*  {
          value: "Tuition and compulsory fees",
          note: "(include even if someone else is paying on your behalf). Do not include residence fees",
          required: true,
        },
        {
          value: "Books and supplies",
          note: "(e.g. books, pencils, pens, photocopy services, etc.) ",
          required: true,
        }, */
        {
          value: "Computer costs",
          note: "(hardware, softwear, and supplies) ",
        },
        {
          value: "Child support payments",
          note: "(you may be required to provide supporting documentation) x (per month) ",
        },
        {
          value: "Alimony support payments",
          note: "(you may be required to provide supporting documentation) x (per month) ",
        },
        {
          value: "Daycare costs",
          note: "(enter the full cost before any subsidy amount you are eligible for) x (per month)",
        },
        {
          value: "Care costs for dependant(s) ",
          note: "with disabilities or other dependent children aged below 12 years. Provide supporting documentation from a doctor confirming the need for care",
        },
        {
          value: "Part-time tuition fees, books and supplies",
          note: " (actual amount) ",
        },
        {
          value: "Medical/dental/optical",
          note: "(out of pocket costs greater then covered under any insurance plan). Specify your medical/dental/optical costs: x (per month) ",
        },
        {
          value: "Canada Student Loan payments",
          note: "Spouse only. (full-time or part-time): x (per month) ",
        },
        {
          value: "Other expenses",
          note: "",
        },
      ],
    };
  },
  beforeMount() {
    this.application.draft.csfa_expenses.expenses = this.application.draft.csfa_expenses.expenses || [];

    if (this.application.draft.csfa_expenses.expenses.length == 0) {
      this.application.draft.csfa_expenses.expenses.push({
        type: "Tuition and compulsory fees",
        note: "(include even if someone else is paying on your behalf). Do not include residence fees",
        required: true,
      });
      this.application.draft.csfa_expenses.expenses.push({
        type: "Books and supplies",
        note: "(e.g. books, pencils, pens, photocopy services, etc.) ",
        required: true,
      });
    }
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    add() {
      this.application.draft.csfa_expenses.expenses.push({
        type: "Computer costs",
        amount: "",
        comments: "",
        required: false,
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.csfa_expenses.expenses.splice(key, 1); // 2nd parameter means remove one item only
      }
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("CSFA Expenses"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("CSFA Expenses"));
      });
    },
  },
};
</script>
