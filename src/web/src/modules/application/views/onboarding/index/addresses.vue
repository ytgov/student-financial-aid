<template>
  <section v-if="student">
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.address") }}</legend>
            <AddressSelector v-model="student.HOME_ADDRESS1" :value="student.HOME_ADDRESS1 || {}" />
          </fieldset>
          <fieldset>
            <legend class="text-h5">{{ $t("legends.address_at_school") }}</legend>
            <p class="note">(Optional) If you do not have an address while at school yet just leave this form blank.</p>
            <AddressSelector v-model="student.HOME_ADDRESS2" :value="student.HOME_ADDRESS2 || {}" />
          </fieldset>
        </fieldset>

        <v-banner
          outlined
          icon="mdi-alert-circle"
          class="problem mt-4 error"
          v-if="invalid"
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
    RadioList
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
      return this.localePath("/application/onboarding/statistical");
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
