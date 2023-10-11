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
      <p style="font-weight: bold">
        You must agree to the content on this page in order for this application form to be considered complete. Read
        before checking the box at the bottom of this page.
      </p>
      <v-divider class="my-3" />

      <v-row>
        <v-col cols="12">
          <p class="mb-2">
            By checking the box below, I authorize Student Financial Assistance officers and the person(s) under Consent
            page to discuss my personal/financial information as it relates to this application.
          </p>
          <p class="mb-2">
            This information is being collected under the authority of the Yukon Student Financial Assistance Act, the
            Occupational Training Act and respective regulations, the Canada Student Loans Act, the Canada Student
            Financial Assistance Act for the purpose of administering territorial, federal or other student funding
            programs and scholarships. This may include determining eligibility, sharing information with other agencies
            as required and establishing related databases and disclosing information to sponsoring agencies.
          </p>
          <p class="mb-2">
            For further information please contact the Student Financial Assistance office at (867) 667-5929 or visit
            our office at the Education Building, 1000 Lewes Blvd., Whitehorse, Yukon.
          </p>
          <ol class="ml-4">
            <li class="pl-2">
              I hereby consent to Employment and Social Development Canada, Social Assistance and other government
              departments to release, disclose and collect my personal information to and from the Student Financial
              Assistance Unit. This may include information relating to my Employment Insurance claim, employment
              related issues and/or training-related income support, which will be used to verify my eligibility for
              Yukon Student Training Allowance.
            </li>
            <li class="pl-2">
              I hereby authorize Student Financial Assistance, the Student Financial Assistance Committee, educational
              institutions and applicable sponsoring agencies to disclose and collect my personal/financial information
              as needed to process and audit this application.
            </li>
            <li class="pl-2">
              I confirm that I will not be eligible, have not been eligible, and do not reasonably expect to be eligible
              to apply for Student Financial Assistance from the government of a jurisdiction outside Yukon, including a
              loan or a loan guarantee for any portion of the academic term indicated in this application form. I
              understand and agree that in order to be eligible for Yukon Grant or Student Training Allowance, I must be
              considered a full-time student for the entire period for which I receive funding, and that it is my
              responsibility to ensure that I am considered a full-time student for that period. I further understand
              and agree that if I cease to be a full-time student for any reason, I may be required to repay any or all
              Yukon Grant or Student Training Allowance funding that I have received as a result of this application.
            </li>
            <li class="pl-2">
              I understand and agree that if I receive Yukon Grant or Student Training Allowance funding for online or
              distance education courses and I arrange for extensions for any of my online or distance educations
              courses, I may no longer be considered a full-time student for Yukon Grant or Student Training Allowance
              purposes, and may be required to repay any or all Yukon Grant or Student Training Allowance funding that I
              have received as a result of this application.
            </li>
            <li class="pl-2">
              I confirm that Canada may directly remit all or a portion of my financial assistance to my educational
              institution, where my educational institution requests the payment of my academic fees.
            </li>

            <li class="pl-2">
              I will use any financial assistance to pay my academic fees first; then I will pay other educational and
              living costs associated with my program of studies.
            </li>
            <li class="pl-2">
              I understand that it is my responsibility to provide accurate personal and financial information on this
              application form. If the information I provide is inaccurate this may result in an over-award, which will
              be recovered from future loans.
            </li>
          </ol>
        </v-col>
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
            I make this declaration conscientiously believing that the information in this application is true and
            correct, and knowing that it is of the same force and effect as if made under oath. I understand that
            knowingly providing false or misleading information in relation to this application constitutes an offence
            pursuant to the provisions of the Criminal Code of Canada.
          </p>
        </v-col>
      </v-row>
      <v-text-field
        bg-color="white"
        variant="outlined"
        density="comfortable"
        readonly
        :value="`${student.first_name} ${student.last_name}`"
        append-inner-icon="mdi-lock"></v-text-field>

      <v-row>
        <v-col cols="12" sm="1">
          <v-checkbox
            variant="outlined"
            v-model="application.step_consent"
            bg-color="white"
            label=""
            :disabled="!allowConsent"></v-checkbox>
        </v-col>
        <v-col>
          <p class="mb-5">
            I consent to Student Financial Assistance disclosing my contact information for the purpose of receiving
            information on Student Employment Programs including but not limited to STEP, Grad Corps and Y2C2. (Leave
            this box blank if you are not interested in receiving further information about such programs.)
          </p>
        </v-col>
      </v-row>

      <v-btn
        color="primary"
        class="mr-3 mb-5 float-right"
        size="x-large"
        @click="saveClick"
        :disabled="!sectionsComplete || consent1 == false || isLoading"
        >Submit</v-btn
      >
      <v-alert
        type="error"
        density="compact"
        v-if="errorText"
        style="clear: both"
        title="We ran into a problem submitting your application">
        <v-icon>mdi-chevron-right</v-icon><strong>{{ errorText }}</strong><br>
        Please review your application for any possible errors and contact the Student Financial Assistance office at 867-667-5929 if this problem persists.
      </v-alert>
    </v-card-text>
  </v-card>

  <v-btn color="info" @click="backClick" class="float-left pl-3">
    <v-icon class="mr-2">mdi-arrow-left</v-icon> Previous
  </v-btn>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { useUserStore } from "@/store/UserStore";

export default {
  mounted() {},
  data: () => ({
    consent1: false,
    consent2: false,
    isLoading: false,
    errorText: null,
  }),
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useDraftStore, ["relevantSections", "requiredDocuments"]),
    ...mapState(useUserStore, ["student"]),

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
      this.isLoading = true;
      this.errorText = null;

      this.save(false).then(async () => {
        this.submit()
          .then((resp) => {
            console.log("SAVE RESP", resp);

            if (resp.error) {
              console.log("I HAD AN ERROR");
              this.errorText = resp.error;
            } else this.$router.push("/student");
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
    },
  },
};
</script>
