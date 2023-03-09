<template>
  <section v-if="student">
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.personal_details") }}</legend>

           <!--  <ValidationProvider name="First Name" rules="required|max:10" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                name="First Name"
                v-model="student.FIRST_NAME"
                label="First name"
                :errors="errors"
                :valid="valid"
              />
            <!-- </ValidationProvider> -->

            <!-- <ValidationProvider name="Middle Name" rules="notrequired" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                name="Middle Name"
                v-model="student.MIDDLE_NAME"
                label="Middle name (optional)"
                :errors="errors"
                :valid="valid"
              />
            <!-- </ValidationProvider> -->

           <!--  <ValidationProvider name="Last Name" rules="required|max:10" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                name="Last Name"
                v-model="student.LAST_NAME"
                label="Last name"
                :error="errors"
                :valid="valid"
              />
           <!--  </ValidationProvider> -->

            <!-- <ValidationProvider name="Home Email" rules="required|email" tag="span" v-slot="{ errors, valid }"> -->
              <TextField name="Home Email" v-model="student.HOME_EMAIL" label="Email" :error="errors" :valid="valid" />
           <!--  </ValidationProvider> -->

           <!--  <ValidationProvider name="Home Phone" rules="required|phone" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                name="Home Phone"
                v-model="student.HOME_PHONE"
                label="Phone Number"
                :error="errors"
                :valid="valid"
              />
            <!-- </ValidationProvider> -->

            <!-- <ValidationProvider name="Social Insurance Number" rules="sin" tag="span" v-slot="{ errors, valid }"> -->
              <SinNumber
                name="sin"
                label="Social Insurance Number"
                v-model="student.SIN"
                :value="student.SIN"
                :errors="errors"
                :valid="valid"
              />
           <!--  </ValidationProvider> -->

            <!-- <ValidationProvider name="Date of Birth" rules="date" tag="span" v-slot="{ errors, valid }"> -->
              <DateSelector
                name="BIRTH_DATE"
                label="Date of Birth (optional)"
                v-model="student.BIRTH_DATE"
                :value="student.BIRTH_DATE"
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
   <!--  </ValidationObserver> -->

    <Buttons :valid="valid" :next="next" back="true" />
  </section>
</template>

<script>

import AddressSelector from "@/components/forms/AddressSelector.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import RadioField from "@/components/forms/RadioField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";

import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";

export default {
  components: {
    BlackoutNotice,
    TextField,
    RadioField,
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
      return this.localePath("/application/onboarding/addresses");
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
