<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.index.legends.personal_details") }}</h3>
      <v-divider class="my-3" />
      <section>
        <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
        <v-form @submit.prevent="submit" v-model="valid">
          <v-row>
            <v-col cols="12" md="4">
              <!--  <ValidationProvider name="First Name" rules="required|max:10" tag="span" v-slot="{ errors, valid }"> -->
              <TextField v-model="student.first_name" :label="$t('student.first_name')" />
              <!-- </ValidationProvider> -->
            </v-col>
            <v-col cols="12" md="4">
              <!-- <ValidationProvider name="Middle Name" rules="notrequired" tag="span" v-slot="{ errors, valid }"> -->
              <TextField v-model="student.middle_name" label="Middle name (optional)" />
              <!-- </ValidationProvider> -->
            </v-col>
            <v-col cols="12" md="4">
              <!--  <ValidationProvider name="Last Name" rules="required|max:10" tag="span" v-slot="{ errors, valid }"> -->
              <TextField v-model="student.last_name" :label="$t('student.last_name')" />
              <!--  </ValidationProvider> -->
            </v-col>

            <v-col cols="12" md="6">
              <!-- <ValidationProvider name="Home Email" rules="required|email" tag="span" v-slot="{ errors, valid }"> -->
              <TextField v-model="student.home_email" label="Email" />
              <!--  </ValidationProvider> -->
            </v-col>

            <v-col cols="12" md="6">
              <!--  <ValidationProvider name="Home Phone" rules="required|phone" tag="span" v-slot="{ errors, valid }"> -->
              <TextField name="Home Phone" v-model="student.home_phone" label="Phone Number" />
              <!-- </ValidationProvider> -->
            </v-col>

            <v-col cols="12" md="6">
              <!-- <ValidationProvider name="Social Insurance Number" rules="sin" tag="span" v-slot="{ errors, valid }"> -->
              <SinNumber
                name="sin"
                label="Social Insurance Number"
                v-model="student.sin"
                :value="student.sin"
                :errors="errors"
                :valid="valid" />
              <!--  </ValidationProvider> -->
            </v-col>
            <v-col cols="12" md="6">
              <!-- <ValidationProvider name="Date of Birth" rules="date" tag="span" v-slot="{ errors, valid }"> -->
              <DateSelector
                name="BIRTH_DATE"
                label="Date of birth"
                v-model="student.birth_date"
                :value="student.birth_date"
                :errors="errors"
                :valid="valid" />
              <!-- </ValidationProvider> -->
            </v-col>
          </v-row>

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
        <!--  </ValidationObserver> -->
      </section>
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
    Question,
  },
  data: () => ({
    student: { first_name: "", last_name: "", middle_name: "", sin: "", birth_date: "" },
    errors: [],
  }),
  computed: {
    valid() {
      var is_valid = true;
      return is_valid;
    },
    next() {
      return "/application/onboarding/addresses";
    },
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
