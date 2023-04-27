<template>
  <v-form @submit.prevent="submit" v-model="valid">
    <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
      <v-card-text>
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address") }}</h3>
        <v-divider class="my-3" />
        <AddressSelector v-model="student.HOME_ADDRESS1" :value="student.HOME_ADDRESS1 || {}" />
      </v-card-text>
    </v-card>

    <v-card color="#eee5d1" variant="elevated" elevation="0">
      <v-card-text>
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address_at_school") }}</h3>
        <p class="note">(Optional) If you do not have an address while at school yet just leave this form blank.</p>
        <v-divider class="my-3" />
        <AddressSelector v-model="student.HOME_ADDRESS2" :value="student.HOME_ADDRESS2 || {}" />

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
        <!-- </ValidationObserver> -->
      </v-card-text>
    </v-card>
    <Buttons :valid="valid" :next="next" back="true" />
  </v-form>
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
  },
  computed: {
    student: {
      get() {
        return {};
        //return this.$store.getters["student/GET"];
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
      //return this.localePath("/application/onboarding/statistical");
      return "/application/onboarding/statistical";
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
