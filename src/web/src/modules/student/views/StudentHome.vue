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
    <v-col>
      <h4 class="text-h5 mb-4">Student Information</h4>
      <v-card class="mb-5" elevation="0" v-if="student">
        <v-card-text style="font-size: 15px">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Full name"
                :model-value="`${student.first_name} ${student.initials} ${student.last_name}`"
                density="comfortable"
                variant="outlined"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Date of birth"
                :model-value="`${formatDate(student.birth_date)}`"
                density="comfortable"
                variant="outlined"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="SIN"
                :model-value="student.sin"
                density="comfortable"
                variant="outlined"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                :model-value="student.email"
                density="comfortable"
                variant="outlined"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                label="Home address"
                rows="2"
                density="comfortable"
                variant="outlined"
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
    <v-col>
      <AnnouncementList />

      <div>
        <v-btn variant="flat" color="success" class="float-right" @click="createApplicationClick"
          >Create New Application</v-btn
        >

        <h4 class="text-h5 mb-4">My Applications</h4>
      </div>

      <ApplicationCard v-for="(app, index) of myApplications" :application="app" class="mb-5"></ApplicationCard>
      <v-alert variant="tonal" type="info" elevation="0" v-if="myApplications.length == 0">
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
        You already have an application in progress for the current academic year. You cannot create a new one until the
        all other In Progress applications have been cancelled.
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useDraftStore } from "@/modules/draft/store";
import ApplicationCard from "@/modules/draft/components/application-card.vue";
import AnnouncementList from "@/modules/notifications/components/announcement-list.vue";
import RecentMessages from "@/modules/messages/components/recent-messages.vue";
import { useUserStore } from "@/store/UserStore";
import moment from "moment";
import { useStudentStore } from "../store";

export default {
  data: () => ({
    showCreateDialog: false,
  }),
  computed: {
    ...mapState(useUserStore, ["student", "studentAddress"]),
    ...mapState(useDraftStore, ["myApplications"]),
  },
  components: { ApplicationCard, AnnouncementList, RecentMessages },
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
    ...mapActions(useStudentStore, ["edit"]),
    
    createApplicationClick() {
      let inProgressCount = this.myApplications.filter((a) => a.status == "In Progress").length;

      if (inProgressCount > 0) {
        this.showCreateDialog = true;
      } else {
        this.create().then((resp) => {
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
