<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.statistical.legends.personal_details") }}</h3>

      <p>Student statistical information for the current year:</p>
      <v-divider class="my-3" />

      <v-form @submit.prevent="submit" v-model="valid">

        <v-radio-group v-model="student.language" inline :label="$t('Langauge')">
          <v-radio label="English" value="English"></v-radio>
          <v-radio label="French" value="French"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="student.gender" inline :label="$t('Gender')">
          <v-radio label="Male" value="Male"></v-radio>
          <v-radio label="Female" value="Female"></v-radio>
          <v-radio label="Other" value="Other"></v-radio>
        </v-radio-group>

        <Select
          class="mb-5"
          name="Marital status"
          v-model="student.marital_status"
          label="Marital status"
          :options="['Married', 'Single', 'Divorced', 'Widowed']"
          :errors="errors"
          :valid="valid" />
        <!-- </ValidationProvider>
 -->
        <!--  <ValidationProvider name="Citizenship" rules="required" tag="span" v-slot="{ errors, valid }"> -->
        <Select
          class="mb-5"
          name="Citizenship"
          v-model="student.citizenship"
          label="Citizenship"
          :options="['Not recorded', 'Canadian citizen', 'Perminent resident', 'Protected person', 'Non citizen']"
          :errors="errors"
          :valid="valid" />

        <!--   <ValidationProvider name="Aboriginal Status" rules="required" tag="span" v-slot="{ errors, valid }"> -->
        <Select
          v-model="student.aboriginal_status"
          label="Aboriginal Status"
          :options="[
            'Not recorded',
            'Non aboriginal',
            'Yukon first nation status',
            'Yukon first nation non-status',
            'Metis',
            'Inuit',
            'Other first nation status',
            'Other first nation non-status',
          ]"
          :errors="errors"
          :valid="valid" />
        <!-- </ValidationProvider> -->

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
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import Select from "@/components/forms/Select.vue";

import Buttons from "@/components/forms/Buttons.vue";
import { mapState, mapWritableState } from "pinia";
import { useStudentStore } from "@/modules/student/store";
import { useApplicationStore } from "@/modules/application/store";

export default {
  components: {
    TextField,
    Select,
    DateSelector,
    Buttons,
  },
  computed: {
    ...mapState(useStudentStore, ["student"]),
    ...mapWritableState(useApplicationStore, [""]),
    
    valid() {
      var is_valid = true;
      return is_valid;
    },
    next() {
      //return this.localePath("/application/onboarding/consent-release");
      return "/application/onboarding/consent-release";
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
