<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.index.title") }}</h2>

    <p class="text-body-1">
      {{ $t("eligibility.index.body") }}
    </p>

    <div class="buttons mt-14">
      <div>
        <v-btn class="continue" color="primary" :to="next" x-large>
          {{ $t("eligibility.index.buttons.check") }}
        </v-btn>
      </div>
    </div>
  </article>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    next() {
      return { path: "/eligibility/citizenship" };
    }
  }
};
</script>
