<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.dependant_student_jurisdiction.title") }}</h2>

    <v-divider class="my-3"></v-divider>

    <v-radio-group
      v-model="eligibility.dependant_student_jurisdiction.has_family_maintained_home"
      inline
      :label="$t('eligibility.dependant_student_jurisdiction.has_family_maintained_home')">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>
  </v-window-item>
</template>

<script lang="ts">
import { mapWritableState } from "pinia";
import { useEligibilityState } from "../store";

export default {
  props: ["value"],
  components: {},
  computed: {
    ...mapWritableState(useEligibilityState, ["eligibility"]),
  },
};
</script>
