<template>
  <section>
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
    <v-form @submit.prevent="submit" v-model="valid">
      <fieldset class="group">
        <fieldset>
          <legend class="text-h5">{{ $t("application.onboarding.csfa_expenses.legends.expenses") }}</legend>

          <p>
            {{ $t("excerpt") }}
          </p>
          <table class="standard" cellpadding="0" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Comments</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in application.draft.csfa_expenses.expenses">
                <td>
                  <select v-model="item.type">
                    <option value="">--Select--</option>
                    <option v-for="type in types">{{ type.value }}</option>
                  </select>
                  <p v-if="note(item.type)">
                    <small>{{ note(item.type) }}</small>
                  </p>
                  <input type="text" v-model="item.type" v-if="false" />
                </td>
                <td>
                  <input type="text" v-model="item.amount" placeholder="0.00" />
                </td>
                <td>
                  <input type="text" v-model="item.comments" placeholder="Comments" />
                </td>
                <td>
                  <a @click="remove(key)"> Remove </a>
                </td>
              </tr>
            </tbody>
          </table>

          <p class="buttons">
            <v-btn class="blue small" @click="add()">Add expense</v-btn>
          </p>
        </fieldset>
      </fieldset>
    </v-form>
    <!-- </ValidationObserver> -->
  </section>
  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import _ from "lodash";

import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {},
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
        {
          value: "Tuition and compulsory fees",
          note: "(include even if someone else is paying on your behalf). Do not include residence fees",
        },
        {
          value: "Books and supplies",
          note: "(e.g. books, pencils, pens, photocopy services, etc.) ",
        },
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
  mounted() {
    this.application.draft.csfa_expenses.expenses = this.application.draft.csfa_expenses.expenses || [];
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),
    add() {
      this.application.draft.csfa_expenses.expenses.push({
        type: "",
        amount: "",
        comments: "",
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.csfa_expenses.expenses.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("CSFA Expenses"));
      });
    },
  },
};
</script>
