<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.parent.title") }}</h2>

    <v-radio-group
      v-model="eligibility.parent.responsible_for_child"
      inline
      :label="$t('eligibility.parent.responsible_for_child')">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>

    <section v-if="eligibility.parent.responsible_for_child == true">
      <v-divider class="my-3"></v-divider>

      <v-radio-group
        v-model="eligibility.parent.ever_been_a_single_parent"
        inline
        :label="$t('eligibility.parent.ever_been_a_single_parent')">
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
