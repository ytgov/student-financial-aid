<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">Enrollment</h2>
    <p>
      <strong>{{ $t("eligibility.enrollement.labels.full_time") }}</strong>
      {{ $t("eligibility.enrollement.notes.full_time") }}
    </p>
    <p>
      <strong>{{ $t("eligibility.enrollement.labels.part_time") }}</strong>
      {{ $t("eligibility.enrollement.notes.part_time") }}
    </p>
    <v-divider class="my-3"></v-divider>
    <v-radio-group
      v-model="eligibility.enrollment.time"
      inline
      :label="$t('eligibility.enrollement.are_you_full_or_part_time')">
      <v-radio :label="$t('eligibility.enrollement.labels.full_time')" :value="true"></v-radio>
      <v-radio :label="$t('eligibility.enrollement.labels.part_time')" :value="false"></v-radio>
    </v-radio-group>

    <p v-html="$t('eligibility.enrollement.notes.contact')"></p>
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
