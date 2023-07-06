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

  <p class="mb-5"></p>

  <v-card color="#eee5d1" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">Student Declaration</h3>
      <v-divider class="my-3" />

      <v-row>
        <v-col cols="12" sm="1">
          <v-checkbox
            variant="outlined"
            v-model="consent1"
            bg-color="white"
            label=""
            :disabled="!allowConsent"></v-checkbox>
        </v-col>
        <v-col>
          <p class="mb-5">
            By checking this box, I make this declaration conscientiously that I, as the applicant, believing that the
            information in this application is true and correct, and acknowledge that it is of the same force and effect
            as if made under oath. I understand that knowingly providing false or misleading information in relation to
            this application constitutes an offence pursuant to the provisions of the Criminal Code of Canada.
          </p>
        </v-col>
      </v-row>

      <v-btn
        color="primary"
        class="mr-3 mb-5 float-right"
        size="x-large"
        @click="saveClick"
        :disabled="!sectionsComplete || consent1 == false"
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
  data: () => ({
    consent1: false,
  }),
  computed: {
    ...mapState(useDraftStore, ["relevantSections", "requiredDocuments"]),

    sectionsComplete() {
      let sect = this.relevantSections.filter((s) => s.name != "Review and Submit" && s.name != "Documents");
      let totSect = sect.length;
      let comSect = sect.filter((s) => s.is_complete).length;
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
      let comSect = this.requiredDocuments.filter((s) => s.status_description != "Missing").length;

      return `${comSect} out of ${totSect}`;
    },
    isComplete() {
      let sect = this.relevantSections.filter((s) => s.name != "Review and Submit");
      let sectDone = sect.length == sect.filter((s) => s.is_complete).length;

      let docsDone =
        this.requiredDocuments.length == this.requiredDocuments.filter((s) => s.status_description != "Missing").length;

      return sectDone && docsDone;
    },
    allowConsent() {
      return this.isComplete || true;
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
