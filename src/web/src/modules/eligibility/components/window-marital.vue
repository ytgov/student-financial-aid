<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.marital.title") }}</h2>

    <v-radio-group
      v-model="eligibility.marital.are_you_in_a_relationship"
      inline
      :label="$t('eligibility.marital.are_you_in_a_relationship')">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>

    <section
      v-if="
        eligibility.marital.are_you_in_a_relationship == false && eligibility.yukon_grant.out_of_school_4_years == false
      ">
      <v-divider class="my-3"></v-divider>

      <v-radio-group
        v-model="eligibility.marital.have_you_ever_been_in_a_relationship"
        inline
        :label="$t('eligibility.marital.have_you_ever_been_in_a_relationship')">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
      </v-radio-group>
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
