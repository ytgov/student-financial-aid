<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.other_funding.legends.consent") }}</h3>
      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <p>
          {{ $t("excerpt") }}
        </p>

        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody v-for="(item, key) in application.draft.other_funding.other_fundings">
            <tr>
              <td>Agency Name</td>
              <td>
                <input type="text" v-model="item.agency" placeholder="" />
              </td>
              <td>Amount</td>
              <td>
                <input type="text" v-model="item.amount" placeholder="0.00" />
              </td>
            </tr>
            <tr>
              <td colspan="6" class="checkboxes">
                <label><input type="checkbox" value="Tuition" v-model="item.purposes" /> Tuition</label>
                <label><input type="checkbox" value="Books" v-model="item.purposes" /> Books</label>
                <label
                  ><input type="checkbox" value="Living Expenses" v-model="item.purposes" /> Living&nbsp;Expenses</label
                >
                <label><input type="checkbox" value="Transportation" v-model="item.purposes" /> Transportation</label>
                <label><input type="checkbox" value="Other" v-model="item.purposes" /> Other</label>
              </td>
            </tr>
            <tr v-if="item.purposes.includes('Other')">
              <td>Other</td>
              <td colspan="2">
                <input type="text" v-model="item.other" placeholder="Describe other purposes" />
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <textarea v-model="item.comments" placeholder="Comments" />
              </td>
            </tr>
            <tr>
              <td colspan="3"><a @click="remove(key)">Remove funding source</a></td>
            </tr>
          </tbody>
        </table>

        <v-btn color="info" @click="add()">Add funding</v-btn>

        <v-banner
          outlined
          icon="mdi-alert-circle"
          class="problem mt-4 error"
          v-if="invalid && errors.length"
          style="padding-right: 1rem">
          <h3>{{ $t("problem.title") }}</h3>
          <br />
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
      <!-- </ValidationObserver> -->
    </v-card-text>
  </v-card>
  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {},
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.other_funding.other_fundings = this.application.draft.other_funding.other_fundings || [];
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),
    add() {
      this.application.draft.other_funding.other_fundings.push({
        agency: "",
        amount: "",
        purposes: [],
        other: "",
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.other_funding.other_fundings.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Other Funding"));
      });
    },
  },
};
</script>
