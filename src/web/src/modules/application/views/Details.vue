<template>
  <h2 class="text-h2 mb-6">Application Details</h2>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-2">Student Details</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row
          label="Name"
          :value="`${application.student.person.firstName ?? ''} ${application.student.person.initials ?? ''} ${
            application.student.person.lastName ?? ''
          }`" />
        <display-row label="Date of birth" :value="formatDate(application.student.person.birthDate)" />
        <display-row label="Email" :value="application.student.person.email" />
        <display-row label="Phone number" :value="application.student.person.telephone" />
        <display-row label="Classification" :value="application.cslClassificationDescription" />
        <display-row label="Primary address" :value="application.primaryAddress?.addressDisplay" />
        <display-row label="Language" :value="application.student.person.language.description" />
        <display-row label="Marital status" :value="application.maritalStatusDescription" />
        <display-row label="Citizenship" :value="application.citizenshipStatusDescription" />
        <display-row
          label="Permanent or prolonged disability"
          :value="application.permanentDisability || application.persOrProlongDisability ? 'Yes' : 'No'" />
      </table>

      <h3 class="text-h3 mb-2">Program Details</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row
          label="Institution"
          :value="`${application.institutionCampus.name} - ${application.institutionCampus.campusName} Campus`" />
        <display-row label="Program type" :value="application.program.description" />
        <display-row label="Study area" :value="application.studyAreaDescription" />
        <display-row label="Entering year" :value="`${application.programYear} of ${application.programYearTotal}`" />
        <display-row label="Attendance" :value="application.attendance.description" />
        <display-row label="Classes start" :value="formatDate(application.classesStartDate)" />
        <display-row label="Classes end" :value="formatDate(application.classesEndDate)" />
      </table>

      <h3 class="text-h3 mb-2">Education History</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="High School" :value="application.student.highSchool.name" />
        <display-row
          label="Year Left"
          :value="`${application.student.highSchoolLeftYear}/${application.student.highSchoolLeftMonth}`" />
      </table>

      <section v-if="application.student.studentConsents && application.student.studentConsents.length > 0">
        <h3 class="text-h3 mb-2">Consent</h3>
        <table class="table display-table text-left mb-4" border="0" cellspacing="0">
          <display-row v-for="item of application.student.studentConsents" label="Name" :value="item.consentPerson" />
        </table>
      </section>

      <section v-if="application.student.dependents && application.student.dependents.length > 0">
        <h3 class="text-h3 mb-2">Dependants</h3>
        <table class="table display-table text-left mb-4" border="0" cellspacing="0">
          <display-row
            v-for="item of application.student.dependents"
            label="Name"
            :value="`${item.firstName ?? ''} ${item.lastName ?? ''}`" />
        </table>
      </section>

      <!-- <h3 class="text-h3 mb-2">CSFA Accomodation</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name" />
      </table>

      <h3 class="text-h3 mb-2">CSFA Income</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name"  />
      </table>

      <h3 class="text-h3 mb-2">CSFA Expenses</h3>
      <table class="table display-table text-left mb-4" border="0" cellspacing="0">
        <display-row label="First name"  />
      </table> -->
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
