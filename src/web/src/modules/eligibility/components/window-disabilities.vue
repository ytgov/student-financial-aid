<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.disabilities.title") }}</h2>

    <v-divider class="my-3"></v-divider>
    <v-radio-group
      v-model="eligibility.disabilities.permanent_disability"
      inline
      :label="$t('eligibility.disabilities.permanent_disability')">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>

    <section v-if="eligibility.disabilities.permanent_disability == true">
      <v-radio-group
        v-model="eligibility.disabilities.service_equipment"
        inline
        :label="$t('eligibility.disabilities.service_equipment')">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
      </v-radio-group>
    </section>
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
