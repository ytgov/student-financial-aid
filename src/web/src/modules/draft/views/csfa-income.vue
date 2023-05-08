<template>
  <section>
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
    <v-form @submit.prevent="submit" v-model="valid">
      <fieldset class="group">
        <fieldset>
          <legend class="text-h5">{{ $t("application.onboarding.csfa_income.legends.income") }}</legend>

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
              <tr v-for="(item, key) in application.draft.csfa_income.incomes">
                <td>
                  <input type="text" v-model="item.type" placeholder="Type" />
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
            <v-btn class="blue small" @click="add()">Add income</v-btn>
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
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.csfa_income.incomes = this.application.draft.csfa_income.incomes || [];
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),
    add() {
      this.application.draft.csfa_income.incomes.push({
        type: "",
        amount: "",
        comments: "",
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.csfa_income.incomes.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("CSFA Income"));
      });
    },
  },
};
</script>
