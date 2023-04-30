<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.spouse") }}</h3>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }" > -->
      <v-form submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <TextField label="First name" v-model="spouse.first_name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="Last name" v-model="spouse.first_name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="Initials" v-model="spouse.first_name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="SIN" v-model="spouse.first_name" />
          </v-col>
        </v-row>

        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.study-period") }}</h3>
        <v-divider class="my-3" />

        <Select
          label="Study employment status"
          v-model="spouse.employment_status"
          :items="['Employed', 'Not Employed']" />

        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.post-secondary") }}</h3>
        <v-divider class="my-3" />
        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td colspan="3">In school from</td>
              <td>
                <DateSelector v-model="spouse.post_secondary" />
              </td>
            </tr>
            <tr>
              <td colspan="3">In school until</td>
              <td>
                <DateSelector v-model="spouse.employment_information" />
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <label>
                  <input type="checkbox" v-model="spouse.employment_information" value="true" />
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
                <input type="checkbox" v-model="spouse.living_with" value="true" />
              </td>
            </tr>
            <tr class="checkbox">
              <td colspan="3">Bus Service Available?</td>
              <td>
                <input type="checkbox" v-model="spouse.bus_service" value="true" />
              </td>
            </tr>
            <tr class="checkbox" v-if="!spouse.bus_service">
              <td colspan="3">Distance form school/work (km)</td>
              <td>
                <input type="text" v-model="spouse.distance_from_school" placeholder="0" />
              </td>
            </tr>
          </tbody>
        </table>

        <v-banner
          outlined
          icon="mdi-alert-circle"
          class="problem mt-4 error"
          v-if="invalid"
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

  <Buttons :valid="valid" :next="next" back="true" />
</template>

<script>
import AddressSelector from "@/components/forms/AddressSelector.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";

import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import Select from "@/components/forms/Select.vue";

export default {
  components: {
    BlackoutNotice,
    TextField,
    DateSelector,
    AddressSelector,
    SinNumber,
    Buttons,
    Question,
    RadioList,
    Select,
  },
  computed: {
    student: {
      get() {
        //return this.$store.getters['student/GET']
        return {};
      },
      set(values) {
        this.$store.commit("student/SET")(values);
      },
    },
    valid() {
      var is_valid = true;
      return is_valid;
    },
    next() {
      // return this.localePath('/application/documents')
      return "/application/documents";
    },
  },
  data() {
    return {
      spouse: {},
    };
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    },
  },
};
</script>
