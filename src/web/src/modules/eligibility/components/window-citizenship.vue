<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.citizenship.title") }}</h2>

    <p>
      {{ $t("eligibility.citizenship.body") }}
    </p>
    <v-divider class="my-3"></v-divider>

      <v-radio-group
        v-model="eligibility.citizenship.is_canadian_citizen"
        inline
        :label="$t('eligibility.citizenship.are_you_a_canadian_citizen')">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
      </v-radio-group>

    <section v-if="eligibility.citizenship.is_canadian_citizen == false">
      <v-divider class="my-3"></v-divider>
      <v-radio-group
        v-model="eligibility.citizenship.are_you_a_permanent_resident"
        inline
        :label="$t('eligibility.citizenship.are_you_a_permanent_resident')">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
      </v-radio-group>
    </section>

    <section
      v-if="
        eligibility.citizenship.is_canadian_citizen == false &&
        eligibility.citizenship.are_you_a_permanent_resident == false
      ">
      <v-divider class="my-3"></v-divider>
      <v-radio-group
        v-model="eligibility.citizenship.are_you_a_protected_person"
        inline
        :label="$t('eligibility.citizenship.are_you_a_protected_person')">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
      </v-radio-group>
    </section>

    <section
      v-if="
        eligibility.citizenship.is_canadian_citizen == false &&
        eligibility.citizenship.are_you_a_permanent_resident == false &&
        eligibility.citizenship.are_you_a_protected_person == false
      ">
      <v-divider class="my-3"></v-divider>

      <v-radio-group
        v-model="eligibility.citizenship.are_you_registered_as_indigenous"
        inline
        :label="$t('eligibility.citizenship.are_you_registered_as_indigenous')">
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
