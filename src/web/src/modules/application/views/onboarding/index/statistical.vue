<template>
  <section v-if="student">
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }">
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.personal_details") }}</legend>

            <p>Student statistical information for the current year:</p>

            <ValidationProvider name="Language" rules="required" tag="span" v-slot="{ errors, valid }">
              <RadioField
                name="Language"
                v-model="student.LANGUAGE"
                label="Language"
                :options="['English', 'French']"
                :error="errors"
                :valid="valid"
              />
            </ValidationProvider>

            <ValidationProvider name="Gender" rules="required" tag="span" v-slot="{ errors, valid }">
              <RadioField
                name="Gender"
                v-model="student.GENDER"
                label="Gender"
                :options="['Male', 'Female', 'Other']"
                :error="errors"
                :valid="valid"
              />
            </ValidationProvider>

            <ValidationProvider name="Marital Status" rules="required" tag="span" v-slot="{ errors, valid }">
              <SelectField
                name="Marital status"
                v-model="student.MARITAL_STATUS"
                label="Marital status"
                :options="['Married', 'Single', 'Divorced', 'Widowed']"
                :errors="errors"
                :valid="valid"
              />
            </ValidationProvider>

            <ValidationProvider name="Citizenship" rules="required" tag="span" v-slot="{ errors, valid }">
              <SelectField
                name="Citizenship"
                v-model="student.CITIZENSHIP"
                label="Citizenship"
                :options="['Not recorded', 'Canadian citizen', 'Perminent resident', 'Protected person', 'Non citizen']"
                :errors="errors"
                :valid="valid"
              />
            </ValidationProvider>

            <ValidationProvider name="Aboriginal Status" rules="required" tag="span" v-slot="{ errors, valid }">
              <SelectField
                name="Aboriginal Status"
                v-model="student.ABORIGINAL_STATUS"
                label="Aboriginal Status"
                :options="[
                  'Not recorded',
                  'Non aboriginal',
                  'Yukon first nation status',
                  'Yukon first nation non-status',
                  'Metis',
                  'Inuit',
                  'Other first nation status',
                  'Other first nation non-status'
                ]"
                :errors="errors"
                :valid="valid"
              />
            </ValidationProvider>
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
    </ValidationObserver>

    <Buttons :valid="valid" :next="next" back="true" />
  </section>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { ValidationProvider, ValidationObserver } from "vee-validate";
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
    ValidationProvider,
    ValidationObserver,
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
      return this.localePath("/application/onboarding/consent-release");
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
