<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.consent_release.legends.consent") }}</h3>
      <p>
        {{ $t("excerpt") }}
      </p>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit">
        <v-table density="comfortable">
          <thead>
            <tr>
              <th class="text-left">Consent person</th>
              <th class="text-left">Academic year start</th>
              <th class="text-left">Academic year end</th>
              <th style="width: 80px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in consents" :key="item.name">
              <td><TextField v-model="consents[key].person" label="" placeholder="Enter Name" /></td>
              <td><TextField v-model="consents[key].start_year" label="" placeholder="Enter Name" /></td>
              <td><TextField v-model="consents[key].end_year" label="" placeholder="Enter Name" /></td>
              <td><v-btn icon="mdi-delete" color="warning" size="small" @click="remove(key)"></v-btn></td>
            </tr>
          </tbody>
        </v-table>

        <v-btn class="mt-4" color="info" @click="addconsent()">Add Consent</v-btn>

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
  <Buttons :valid="valid" :next="next" back="true" />
</template>

<script>
import AddressSelector from "@/components/forms/AddressSelector.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import RadioField from "@/components/forms/RadioField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import SelectField from "@/components/forms/SelectField.vue";
import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";

export default {
  components: {
    BlackoutNotice,
    TextField,
    RadioField,
    SelectField,
    DateSelector,
    AddressSelector,
    SinNumber,
    Buttons,
    Question,
  },
  computed: {
    student: {
      get() {
        //return this.$store.getters["student/GET"];
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
      //return this.localePath("/application/onboarding/residency-history");
      return "/application/onboarding/residency-history";
    },
  },
  data() {
    return {
      consents: [],
    };
  },
  mounted() {
    this.consents = this.student.CONSENTS || [];
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    },
  },
  methods: {
    addconsent() {
      this.consents.push({
        person: "",
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear(),
      });
    },
    remove(key) {
      if (key > -1) {
        this.consents.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
  },
};
</script>

<style>
.v-card .v-table {
  border: 1px #d7cfbe solid;
  border-radius: 4px;
}
</style>
