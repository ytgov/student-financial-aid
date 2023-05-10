<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.designated_institution.title") }}</h2>

    <v-divider class="my-3"></v-divider>

    <v-radio-group
      v-model="eligibility.designated_institution.are_you_enrolled_in_post_secondary"
      inline
      :label="$t('eligibility.designated_institution.are_you_enrolled_in_post_secondary')">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
    </v-radio-group>

    <section v-if="eligibility.designated_institution.are_you_enrolled_in_post_secondary == true">
      <Select
        :label="$t('eligibility.designated_institution.post_secondary_enrolled_in')"
        :options="institutions"
        v-model="eligibility.designated_institution.post_secondary_enrolled_in" />

      <p class="mt-5" v-html="$t('eligibility.designated_institution.notes')"></p>
    </section>
  </v-window-item>
</template>

<script lang="ts">
import { mapWritableState } from "pinia";
import { useEligibilityState } from "../store";

import Select from "@/components/forms/Select.vue";

export default {
  props: ["value"],
  components: {
    Select,
  },
  data: () => ({ institutions: ["test"] }),
  computed: {
    ...mapWritableState(useEligibilityState, ["eligibility"]),
  },
};
</script>
