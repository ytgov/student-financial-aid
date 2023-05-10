<template>
  <section v-if="student">
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.study-period") }}</legend>

            <!-- <ValidationProvider name="Pre-study classification" rules="required" tag="span" v-slot="{ errors, valid }"> -->
              <SelectField
                name="Pre-study classification"
                v-model="(student.CSFA || {}).prestudy_classification"
                label="Pre-study classification"
                :options="[
                  'Single Dependent',
                  'Single Inependent - 2 year workforce',
                  'Single Inependent - 4 year highschool',
                  'Married / Common Law',
                  'Single PArent'
                ]"
                :errors="errors"
                :valid="valid"
              />
            <!-- </ValidationProvider>
 -->
            <!-- <ValidationProvider name="Study classification" rules="required" tag="span" v-slot="{ errors, valid }"> -->
              <SelectField
                name="Study classification"
                v-model="(student.CSFA || {}).study_classification"
                label="Study classification"
                :options="[
                  'Single Dependent',
                  'Single Inependent - 2 year workforce',
                  'Single Inependent - 4 year highschool',
                  'Married / Common Law',
                  'Single PArent'
                ]"
                :errors="errors"
                :valid="valid"
              />
            <!-- </ValidationProvider> -->
          </fieldset>
        </fieldset>

        <v-banner
          outlined
          icon="mdi-alert-circle"
          class="problem mt-4 error"
          v-if="invalid && errors.length"
          style="padding-right: 1rem"
        >
          <h3>{{ $t("problem.title") }}</h3>
          <br />
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
    <!-- </ValidationObserver> -->

    <Buttons :valid="valid" :next="next" back="true" />
  </section>
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
    Question
  },
  computed: {
    student: {
      get() {
        return this.$store.getters["student/GET"];
      },
      set(values) {
        this.$store.commit("student/SET")(values);
      }
    },
    valid() {
      var is_valid = true;
      return is_valid;
    },
    next() {
      return "/draft/onboarding/csfa-accomodation";
    }
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  }
};
</script>
