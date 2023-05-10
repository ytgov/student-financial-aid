<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.residency_history.legends.consent") }}</h3>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }" > -->
      <v-form @submit.prevent="submit" v-model="valid">
        <p>
          Student consent to release information to another person: Please provide a complete breakdown of where you
          were physically living for the 2 years immediately prior to starting classes.
        </p>
        <ul>
          <li>
            Separate the two years into periods of time when you were in high school or post-secondary including summer
            breaks as full-time, part-time or not in school at all.
          </li>
          <li>Include all absence and returns to Yukon.</li>
          <li>There should not be any gab in this two-year period.</li>
        </ul>

        <table class="standard" cellpadding="0" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>City</th>
              <th>Province</th>
              <th>Country</th>
              <th>In&nbsp;School?</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in application.draft.residency.residency_history">
              <td>
                <input type="text" v-model="item.start" maxlength="4" width="50" />
              </td>
              <td class="center">
                <input type="text" v-model="item.end" maxlength="2" width="25" />
              </td>
              <td>
                <input type="text" v-model="item.city" placeholder="City" />
              </td>
              <td>
                <input type="text" v-model="item.province" placeholder="Province" />
              </td>
              <td>
                <select v-model="item.country" placeholder="Country">
                  <option>Canada</option>
                </select>
              </td>
              <td>
                <select v-model="item.in_school">
                  <option>Not in school</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                </select>
              </td>
              <td>
                <a @click="remove(key)">Remove</a>
              </td>
            </tr>
          </tbody>
        </table>

        <v-btn color="info" @click="add()">Add residence</v-btn>
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

export default {
  components: {},
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
