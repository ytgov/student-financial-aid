<template>
  <h3 class="text-h3 mb-6">{{ $t("application.title") }}</h3>
  <p v-html="$t('application.note')"></p>
  <v-divider class="my-3" />

  <TermsWrapper>
    <ATIPP />
  </TermsWrapper>

  <div class="text-right mt-5">
    <v-btn v-if="this.application.draft.terms_agree" color="primary" @click="disagreeClick"> Disagree </v-btn>
    <v-btn v-else color="primary" @click="continueClick"> Agree &  Next <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn>
  </div>
</template>

<script>
import TermsWrapper from "@/components/terms/wrapper.vue";
import ATIPP from "@/components/terms/atipp.vue";
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {
    TermsWrapper,
    ATIPP,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  async mounted() {},
  methods: {
    ...mapActions(useDraftStore, ["getNext", "save"]),

    async continueClick() {
      this.application.draft.terms_agree = true;

      this.save().then(() => {
        this.$router.push(this.getNext("Terms"));
      });
    },
    async disagreeClick() {
      this.application.draft.terms_agree = false;

      this.save().then(() => {});
    },
  },
};
</script>
