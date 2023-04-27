<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-7">Review</h2>

    <p class="text-body-1">
      {{ $t("eligibility.index.body") }}
    </p>
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
