<template>
  <h3 class="text-h3 mb-6">{{ $t("application.title") }}</h3>
  <p v-html="$t('application.note')"></p>
  <v-divider class="my-3" />

  <TermsWrapper>
    <ATIPP />
  </TermsWrapper>

  <div class="text-right mt-5">
    <v-btn v-if="this.application.terms_agree" color="primary" @click="this.application.terms_agree = false">
      Disagree
    </v-btn>
    <v-btn v-else color="primary" @click="continueClick"> Agree & Continue </v-btn>
  </div>
</template>

<script>
import TermsWrapper from "@/components/terms/wrapper.vue";
import ATIPP from "@/components/terms/atipp.vue";
import { mapActions, mapWritableState } from "pinia";
import { useApplicationStore } from "../store";

export default {
  components: {
    TermsWrapper,
    ATIPP,
  },
  computed: {
    ...mapWritableState(useApplicationStore, ["application"]),
  },
  mounted() {},
  methods: {
    ...mapActions(useApplicationStore, ["getNext"]),
    continueClick() {
      this.application.terms_agree = true;
      this.$router.push(this.getNext("terms"));
    },
  },
};
</script>
