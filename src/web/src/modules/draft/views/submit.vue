<template>
  <h2 class="text-h3 mb-7">{{ $t("application.submit.title") }}</h2>
  <p>
    <strong>{{ $t("application.submit.excerpt") }}</strong>
  </p>
  <v-divider class="my-3" />

  <v-alert v-if="!sectionsComplete" type="info" variant="tonal" class="mb-5">
    It appears that <strong>{{ sectionInfo }}</strong> sections are complete and you have uploaded
    <strong>{{ documentInfo }}</strong> documents. You may not submit the appication in the current state. All sections
    must be complete prior to submission.
  </v-alert>
  <v-alert v-else type="info" variant="tonal" class="mb-5">
    It appears that <strong>{{ sectionInfo }}</strong> sections are complete and you have uploaded
    <strong>{{ documentInfo }}</strong> documents. You may submit the appication in the current state, but we recommend
    completing all of the sections prior to submission.
  </v-alert>

  <p class="mb-5">
    To submit your application, you must now complete the Student Declaration section below and click "Submit".
  </p>

  <v-card color="#eee5d1" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">Student Declaration</h3>
      <v-divider class="my-3" />

      <v-text-field
        variant="outlined"
        bg-color="white"
        label="Type your name"
        :disabled="!sectionsComplete"></v-text-field>

      <v-btn
        color="primary"
        class="mr-3 mb-5 float-right"
        size="x-large"
        @click="saveClick"
        :disabled="!sectionsComplete"
        >Submit</v-btn
      >
    </v-card-text>
  </v-card>

  <v-btn color="info" @click="backClick" class="float-left pl-3">
    <v-icon class="mr-2">mdi-arrow-left</v-icon> Previous
  </v-btn>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useDraftStore } from "../store";

export default {
  mounted() {},
  computed: {
    ...mapState(useDraftStore, ["relevantSections", "requiredDocuments"]),

    sectionsComplete() {
      let sect = this.relevantSections.filter((s) => s.name != "Review and Submit");
      let totSect = sect.length;
      let comSect = sect.filter((s) => s.is_complete).length;
      return totSect == comSect;
    },
    documentsComplete() {
      let totSect = this.requiredDocuments.length;
      let comSect = this.requiredDocuments.filter((s) => s.status != "Missing").length;
      return totSect == comSect;
    },
    sectionInfo() {
      let sect = this.relevantSections.filter((s) => s.name != "Review and Submit");
      let totSect = sect.length;
      let comSect = sect.filter((s) => s.is_complete).length;

      return `${comSect} out of ${totSect}`;
    },
    documentInfo() {
      let totSect = this.requiredDocuments.length;
      let comSect = this.requiredDocuments.filter((s) => s.status != "Missing").length;

      return `${comSect} out of ${totSect}`;
    },
    isComplete() {
      let sect = this.relevantSections.filter((s) => s.name != "Review and Submit");
      let sectDone = sect.length == sect.filter((s) => s.is_complete).length;

      let docsDone =
        this.requiredDocuments.length == this.requiredDocuments.filter((s) => s.status != "Missing").length;

      return sectDone && docsDone;
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "save", "submit"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Review and Submit"));
      });
    },
    async saveClick() {
      this.save(false).then(async () => {
        this.submit().then((resp) => {
          this.$router.push("/student");
        });
      });
    },
  },
};
</script>
