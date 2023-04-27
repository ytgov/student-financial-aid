<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.full_time_eligibility.title") }}</h2>

    <v-divider class="my-3"></v-divider>

    <v-radio-group
      v-model="eligibility.fulltimeeligibility.program_at_least_2_years"
      inline
      :label="$t('eligibility.full_time_eligibility.program_at_least_2_years')">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>

    <section v-if="eligibility.fulltimeeligibility.program_at_least_2_years == true">
      <v-divider class="my-3"></v-divider>

      <NumberField
        :label="$t('eligibility.full_time_eligibility.family_size')"
        v-model="eligibility.fulltimeeligibility.family_size"
        :min="0"
        :max="10"
        :value="eligibility.fulltimeeligibility.family_size" />
    </section>

    <section
      v-if="
        eligibility.fulltimeeligibility.program_at_least_2_years == true &&
        eligibility.fulltimeeligibility.family_size > 0
      ">
      <v-divider class="my-3"></v-divider>

      <NumberField
        :label="$t('eligibility.full_time_eligibility.previous_year_gross_family_income')"
        v-model="eligibility.fulltimeeligibility.previous_year_gross_family_income"
        :value="eligibility.fulltimeeligibility.previous_year_gross_family_income" />
    </section>

    <section
      v-if="
        eligibility.fulltimeeligibility.program_at_least_2_years == true &&
        eligibility.fulltimeeligibility.family_size > 2 &&
        eligibility.fulltimeeligibility.previous_year_gross_family_income > 0
      ">
      <v-divider class="my-3"></v-divider>

      <NumberField
        :label="$t('eligibility.full_time_eligibility.dependants_under_twelve')"
        v-model="eligibility.fulltimeeligibility.dependants_under_twelve"
        :value="eligibility.fulltimeeligibility.dependants_under_twelve" />
    </section>

    <section
      v-if="
        eligibility.fulltimeeligibility.program_at_least_2_years == true &&
        eligibility.fulltimeeligibility.family_size > 2 &&
        eligibility.fulltimeeligibility.previous_year_gross_family_income &&
        eligibility.fulltimeeligibility.dependants_under_twelve
      ">
      <v-divider class="my-3"></v-divider>

      <NumberField
        :label="$t('eligibility.full_time_eligibility.dependants_with_disability')"
        v-model="eligibility.fulltimeeligibility.dependants_with_disability"
        :value="eligibility.fulltimeeligibility.dependants_with_disability" />
    </section>
  </v-window-item>
</template>

<script lang="ts">
import { mapWritableState } from "pinia";
import { useEligibilityState } from "../store";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import YesNoRadio from "@/components/forms/YesNoRadio.vue";
import NumberField from "@/components/forms/NumberField.vue";
import Currency from "@/components/forms/Currency.vue";

export default {
  props: ["value"],
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio,
    NumberField,
    Currency,
  },
  computed: {
    ...mapWritableState(useEligibilityState, ["eligibility"]),
  },
};
</script>
