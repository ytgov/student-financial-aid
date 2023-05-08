<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.spouse") }}</h3>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }" > -->
      <v-form submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <TextField label="First name" v-model="application.draft.spouse.first_name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="Last name" v-model="application.draft.spouse.last_name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="Initials" v-model="application.draft.spouse.initials" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="SIN" v-model="application.draft.spouse.sin" />
          </v-col>
        </v-row>

        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.study-period") }}</h3>
        <v-divider class="my-3" />

        <Select
          label="Study employment status"
          v-model="application.draft.spouse.employment_status"
          :items="['Employed', 'Not Employed']" />

        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.post-secondary") }}</h3>
        <v-divider class="my-3" />
        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td colspan="3">In school from</td>
              <td>
                <DateSelector v-model="application.draft.spouse.post_secondary" />
              </td>
            </tr>
            <tr>
              <td colspan="3">In school until</td>
              <td>
                <DateSelector v-model="application.draft.spouse.employment_information" />
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <label>
                  <input type="checkbox" v-model="application.draft.spouse.employment_information" value="true" />
                  Applying for Canada Student Loan.
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.employment-information") }}</h3>
        <v-divider class="my-3" />

        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr class="checkbox">
              <td colspan="3">Living with spouse</td>
              <td>
                <input type="checkbox" v-model="application.draft.spouse.living_with" value="true" />
              </td>
            </tr>
            <tr class="checkbox">
              <td colspan="3">Bus Service Available?</td>
              <td>
                <input type="checkbox" v-model="application.draft.spouse.bus_service" value="true" />
              </td>
            </tr>
            <tr class="checkbox" v-if="!application.draft.spouse.bus_service">
              <td colspan="3">Distance form school/work (km)</td>
              <td>
                <input type="text" v-model="application.draft.spouse.distance_from_school" placeholder="0" />
              </td>
            </tr>
          </tbody>
        </table>
      </v-form>
      <!-- </ValidationObserver> -->
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import Select from "@/components/forms/Select.vue";

import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {
    TextField,
    DateSelector,
    Select,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Spouse"));
      });
    },
  },
};
</script>
