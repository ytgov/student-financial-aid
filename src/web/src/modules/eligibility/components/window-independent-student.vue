<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.independant_student.title") }}</h2>

    <section>
      <v-radio-group
        v-model="eligibility.independentstudent.out_of_school"
        inline
        :label="$t('eligibility.independant_student.out_of_school')">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
      </v-radio-group>
    </section>

    <section v-if="eligibility.independentstudent.out_of_school == true">
      <v-divider class="my-3"></v-divider>
      <v-radio-group
        v-model="eligibility.independentstudent.in_labour_force"
        inline
        :label="$t('eligibility.independant_student.in_labour_force')">
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
