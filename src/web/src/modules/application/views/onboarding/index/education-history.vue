<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.education_history.legends.consent") }}</h3>
      <v-divider class="my-3" />

      

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <p>Add your highest education level:</p>
        <!-- <ValidationProvider name="Highest Education Level" rules="required" tag="span" v-slot="{ errors, valid }"> -->
        <TextField
          name="Highest Education Level"
          v-model="(student.EDUCATION || {}).highest_education_level"
          label="Highest Education Level"
          :error="errors"
          :valid="valid" />
        <!-- </ValidationProvider> -->

        <p>Add your attended high schools:</p>

        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody v-for="(item, key) in education_history">
            <tr>
              <td>High School Attended</td>
              <td>
                <input type="text" v-model="education_history[key].school" maxlength="4" width="50" />
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <input type="text" v-model="education_history[key].city" placeholder="City" />
              </td>
            </tr>
            <tr>
              <td>Province</td>
              <td>
                <input type="text" v-model="education_history[key].province" placeholder="Province" />
              </td>
            </tr>
            <tr>
              <td>Country</td>
              <td>
                <select v-model="education_history[key].country" placeholder="Country">
                  <option>Canada</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Left High School</td>
              <td><input type="text" v-model="education_history[key].left_high_school" /></td>
            </tr>
            <tr>
              <td>Last Grade Completed</td>
              <td>
                <input type="text" v-model="education_history[key].last_grade_completed" />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><a @click="remove(key)">Remove School</a></td>
            </tr>
          </tbody>
        </table>

        <p class="buttons">
          <v-btn class="blue small" @click="add()">Add another school</v-btn>
        </p>

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
        // return this.$store.getters["student/GET"];
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
      // return this.localePath("/application/onboarding/other-funding");
      return "/application/onboarding/other-funding";
    },
  },
  data() {
    return {
      education_history: [],
    };
  },
  mounted() {
    this.education_history = this.student.EDUCATION_HISTORY || [
      {
        school: "",
        city: "",
        province: "Yukon",
        country: "Canada",
      },
    ];

    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    },
  },
  methods: {
    add() {
      this.education_history.push({
        school: "",
        city: "",
        province: "Yukon",
        country: "Canada",
      });
    },
    remove(key) {
      if (key > -1) {
        this.education_history.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
  },
};
</script>
