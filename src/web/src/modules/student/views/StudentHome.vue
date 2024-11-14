<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-8">
    <div class="px-4 py-4">
      <div class="d-flex justify-space-between">
        <div>
          <h3 class="text-h3 mb-1">Student Home</h3>

          <v-divider></v-divider>
          <p class="mt-2" style="color: #323232cc !important">
            Yukon students are encouraged to apply for various territorial and federal funding programs through this
            online portal. You can start a new application, continue with an existing application or review funding that
            has been previously awarded. Please have your documents ready as all required documents must be uploaded in
            order to submit a completed application.
          </p>
        </div>
      </div>
    </div>
  </v-card>

  <v-row>
    <v-col cols="12" md="6">
      <h4 class="text-h5 mb-4">Student Information</h4>
      <v-card class="mb-5" elevation="0" v-if="student">
        <v-card-text style="font-size: 15px">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Full name"
                :model-value="`${student.first_name} ${student.initials || ''} ${student.last_name}`"
                density="comfortable"
                variant="outlined"
                append-inner-icon="mdi-lock"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Date of birth"
                :model-value="`${formatDate(student.birth_date)}`"
                density="comfortable"
                variant="outlined"
                append-inner-icon="mdi-lock"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="SIN"
                :model-value="student.sin"
                density="comfortable"
                variant="outlined"
                append-inner-icon="mdi-lock"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                :model-value="student.email"
                density="comfortable"
                variant="outlined"
                append-inner-icon="mdi-lock"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-textarea
                label="Home address"
                rows="3"
                readonly
                density="comfortable"
                variant="outlined"
                append-inner-icon="mdi-lock"
                hide-details
                :model-value="studentAddress"></v-textarea>
            </v-col>
          </v-row>

          <v-btn color="primary" class="mt-5" @click="editStudentClick">Edit</v-btn>
        </v-card-text>
      </v-card>
      <!-- 
      <v-divider class="mt-7 mb-7"></v-divider>
      <RecentMessages></RecentMessages> -->
    </v-col>
    <v-col cols="12" md="6">
      <AnnouncementList />

      <div>
        <v-btn variant="flat" color="success" class="float-right" @click="createApplicationClick"
          >Create New Application</v-btn
        >

        <h4 class="text-h5 mb-4">My Applications</h4>
      </div>

      <div v-for="(app, index) of currentApplications">
        <DraftCard v-if="app.status == 'In Progress'" :application="app" class="mb-5"></DraftCard>
        <ApplicationCard v-else :application="app" :isCurrent="true" lass="mb-5"></ApplicationCard>
      </div>
      <v-expansion-panels value="null" variant="accordion" flat elevation="0" v-if="pastApplications?.length > 0">
        <v-expansion-panel :value="0" title="Previous Academic Years">
          <v-expansion-panel-text class="dense">
            <div v-for="(app, index) of pastApplications">
              <DraftCard v-if="app.status == 'In Progress'" :application="app" class="mb-5"></DraftCard>
              <ApplicationCard v-else :application="app" :isCurrent="false" class="mb-5"></ApplicationCard>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-alert variant="tonal" type="info" elevation="0" v-if="myApplications?.length == 0">
        Your student record doesn't currently have any applications for this academic year.
      </v-alert>
    </v-col>
  </v-row>

  <v-dialog width="600" v-model="showCreateDialog" persistent>
    <v-card>
      <v-toolbar color="warning" variant="dark" title="Create New Application">
        <v-spacer></v-spacer>
        <v-btn icon @click="showCreateDialog = false" color="white"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text class="py-7">
        <h4 class="text-h5 mb-4">Open Academic Years:</h4>

        <ul class="ml-5 mb-4">
          <li v-for="year of academicYears">
            <strong>{{ year.id }}</strong> - Classes start between {{ formatDate(year.start_date) }} and
            {{ formatDate(year.end_date) }}
          </li>
        </ul>

        <DateSelector
          class="mb-4"
          :min="minStartDate"
          :max="maxStartDate"
          v-model="startDate"
          :label="$t('application.program_details.details.start_date_of_classes')" />

        <div v-if="inProgressItem && startDateYear" class="text-warning">
          You already have an application in progress for {{ startDateYear }}. You cannot create a new one until the all
          other In Progress applications have been cancelled.
        </div>
        <div v-else-if="startDateYear">
          <v-btn color="success" @click="doCreateApplication"> Create Application for {{ startDateYear }} </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useDraftStore } from "@/modules/draft/store";
import DraftCard from "@/modules/draft/components/draft-card.vue";
import ApplicationCard from "@/modules/draft/components/application-card.vue";
import AnnouncementList from "@/modules/notifications/components/announcement-list.vue";
import RecentMessages from "@/modules/messages/components/recent-messages.vue";
import { AcademicYear, useUserStore } from "@/store/UserStore";
import moment from "moment";
import { useStudentStore } from "../store";
import DateSelector from "@/components/forms/DateSelector.vue";
import { isArray, maxBy, minBy } from "lodash";

export default {
  components: { ApplicationCard, DraftCard, AnnouncementList, RecentMessages, DateSelector },
  data: () => ({
    showCreateDialog: false,

    startDate: null,
    inProgressItem: null,
    startDateYear: null as number | null,
  }),
  computed: {
    ...mapState(useUserStore, ["student", "studentAddress", "currentAcademicYear", "academicYears"]),
    ...mapState(useDraftStore, ["myApplications"]),
    currentApplications() {
      return this.myApplications?.filter(
        (a) => a.academicYearId >= this.currentAcademicYear || a.academic_year_id >= this.currentAcademicYear
      );
    },
    pastApplications() {
      return this.myApplications?.filter(
        (a) => a.academicYearId < this.currentAcademicYear || a.academic_year_id < this.currentAcademicYear
      );
    },
    minStartDate(): string | null {
      if (this.academicYears && isArray(this.academicYears)) {
        const minYear = minBy(this.academicYears, "id") as AcademicYear;

        if (minYear) {
          return this.formatDate(minYear.start_date);
        }
      }

      return null;
    },
    maxStartDate(): string | null {
      if (this.academicYears && isArray(this.academicYears)) {
        const maxYear = maxBy(this.academicYears, "id") as AcademicYear;

        if (maxYear) {
          return this.formatDate(maxYear.end_date);
        }
      }

      return null;
    },
  },
  watch: {
    startDate(nv) {
      this.startDateYear = null;

      if (nv) {
        const result = this.determineAcademicYear(nv);

        if (result) {
          this.startDateYear = result.id;

          let inProgressInYear = this.myApplications.filter(
            (a) => (a.academic_year_id == result.id || a.academicYearId == result.id) && a.status == "In Progress"
          );

          if (inProgressInYear.length > 0) {
            this.inProgressItem = inProgressInYear[0];
          } else this.inProgressItem = null;
        }
      }

      return null;
    },
  },
  async mounted() {
    if (this.student) await this.loadApplications();
    else {
      let interval = window.setInterval(async () => {
        if (this.student) {
          window.clearInterval(interval);
          await this.loadApplications();
        }
      }, 250);
    }
  },
  methods: {
    ...mapActions(useDraftStore, ["create", "loadApplications"]),
    ...mapActions(useUserStore, ["determineAcademicYear"]),
    ...mapActions(useStudentStore, ["edit"]),

    createApplicationClick() {
      this.showCreateDialog = true;
    },
    doCreateApplication() {
      if (this.startDateYear) {
        this.create(this.startDateYear).then((resp) => {
          if (resp && resp.id) this.$router.push(`/draft/${resp.id}`);
        });
      }
    },
    formatDate(input: Date): string {
      return moment.utc(input).format("YYYY/MM/DD");
    },
    editStudentClick() {
      this.$router.push("/student/edit");
    },
  },
};
</script>

<style>
.dense .v-expansion-panel-text__wrapper {
  padding: 12px 12px 0 12px;
  margin: 5px 0 0 0;
}
</style>
