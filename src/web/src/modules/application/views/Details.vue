<template>
  <h2 class="text-h2 mb-6">Application Details</h2>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-2">Student details</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
        <display-row label="Middle name" :value="application.student.person.initials" />
        <display-row label="Last name" :value="application.student.person.lastName" />
        <display-row label="SIN" :value="application.student.person.sin" />
        <display-row label="Date of birth" :value="formatDate(application.student.person.birthDate)" />
        <display-row label="Email" :value="application.student.person.email" />
        <display-row label="Phone number" :value="application.student.person.telephone" />
        <display-row label="Situation" :value="application.categoryId" />
      </table>

      <h3 class="text-h3 mb-2">Addresses</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">Statistical Information</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="Language" :value="application.student.person.languageId" />
      </table>

      {{ application.student.studentConsents }}adsfa

      <section v-if="application.student.studentConsents && application.student.studentConsents.length > 0">
        <h3 class="text-h3 mb-2">Consent</h3>
        <table class="table display-table text-left mb-4" border="0" cellspacing="0">
          <display-row label="First name" :value="application.student.person.firstName" v="" />
        </table>
      </section>

      <h3 class="text-h3 mb-2">Program Details</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">Funding Sources</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">Residency</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">Education History</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">Student Dependants</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">CSFA Accomodation</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">CSFA Income</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>

      <h3 class="text-h3 mb-2">CSFA Expenses</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" :value="application.student.person.firstName" />
      </table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/store/UserStore";
import { useApplicationStore } from "../store";
import moment from "moment";
import DisplayRow from "../components/DisplayRow.vue";

export default {
  data: () => ({}),
  components: { DisplayRow },
  mounted() {},
  computed: {
    ...mapState(useApplicationStore, ["application"]),
  },
  methods: {
    formatDate(input: Date | undefined): string {
      if (input) return moment.utc(input).format("YYYY-MM-DD");
      return "";
    },
  },
};
</script>
