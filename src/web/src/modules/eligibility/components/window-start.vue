<template>
  <v-window-item :value="value" class="pa-6">
    <h2 class="text-h3 mb-7"> {{ $t("eligibility.index.title") }}</h2>

    <p class="text-body-1">
      {{ $t("eligibility.index.body") }}
    </p>
  </v-window-item>
</template>

<script lang="ts">
export default {
  props: ["value"],
};
</script>
