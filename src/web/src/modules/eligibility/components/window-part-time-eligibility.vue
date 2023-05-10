<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.part_time_eligibility.title") }}</h2>

    

<section>
  <Question>
    {{ $t("eligibility.part_time_eligibility.family_size") }}
  </Question>

  <NumberField
    v-model="eligibility.parttimeeligibility.family_size"
    :value="eligibility.parttimeeligibility.family_size"
  />
</section>

<section v-if="eligibility.parttimeeligibility.family_size">
  <Question>
    {{ $t("eligibility.part_time_eligibility.previous_year_gross_family_income") }}
  </Question>

  <Currency
    v-model="eligibility.parttimeeligibility.previous_year_gross_family_income"
    :value="eligibility.parttimeeligibility.previous_year_gross_family_income"
  />
</section>

<section
  v-if="
    eligibility.parttimeeligibility.family_size && eligibility.parttimeeligibility.previous_year_gross_family_income
  "
>
  <Question>
    {{ $t("eligibility.part_time_eligibility.enrolled") }}
  </Question>

  <YesNoRadio
    v-model="eligibility.parttimeeligibility.enrolled"
    :value="eligibility.parttimeeligibility.enrolled"
  />
</section>

<section
  v-if="
    eligibility.parttimeeligibility.family_size &&
    eligibility.parttimeeligibility.previous_year_gross_family_income &&
    eligibility.parttimeeligibility.enrolled
  "
>
  <Question>
    {{ $t("eligibility.part_time_eligibility.lived_in_yukon") }}
  </Question>

  <YesNoRadio
    v-model="eligibility.parttimeeligibility.lived_in_yukon"
    :value="eligibility.parttimeeligibility.lived_in_yukon"
  />
</section>

<section
  v-if="
    eligibility.parttimeeligibility.family_size &&
    eligibility.parttimeeligibility.previous_year_gross_family_income &&
    eligibility.parttimeeligibility.enrolled &&
    eligibility.parttimeeligibility.lived_in_yukon
  "
>
  <Question>
    {{ $t("eligibility.part_time_eligibility.dependants_under_twelve") }}
  </Question>

  <NumberField
    v-model="eligibility.parttimeeligibility.dependants_under_twelve"
    :value="eligibility.parttimeeligibility.dependants_under_twelve"
  />
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

export default {
  props: ["value"],
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio,
  },
  computed: {
    ...mapWritableState(useEligibilityState, ["eligibility"]),
  },
};
</script>
