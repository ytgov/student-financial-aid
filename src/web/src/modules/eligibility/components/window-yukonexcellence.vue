<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-2">{{ $t("eligibility.yukon_excellence_award.title") }}</h2>

    <p>
      {{ $t("eligibility.yukon_excellence_award.note") }}
    </p>
    <v-divider class="my-3"></v-divider>

    <section>
      <Currency
        :label="$t('eligibility.yukon_excellence_award.how_much_would_like_to_apply_for')"
        v-model="eligibility.yukon_excellence_award.apply"
        :value="eligibility.yukon_excellence_award.apply"
        :max="balance" />
    </section>
  </v-window-item>
</template>

<script lang="ts">
import { mapWritableState } from "pinia";
import { useEligibilityState } from "../store";

import Currency from "@/components/forms/Currency.vue";

export default {
  props: ["value"],
  components: {
    Currency,
  },
  data: () => ({
    balance: 123.12,
  }),
  computed: {
    ...mapWritableState(useEligibilityState, ["eligibility"]),
  },
};
</script>
