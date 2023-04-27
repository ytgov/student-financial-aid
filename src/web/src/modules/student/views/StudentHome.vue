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
      <v-card class="mb-5" elevation="0">
        <v-card-text style="font-size: 15px">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Full name"
                model-value="Michael Ryan Johnson"
                density="comfortable"
                variant="outlined"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Date of birth"
                model-value="1980/11/02"
                density="comfortable"
                variant="outlined"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="SIN"
                model-value="xxxxxx789"
                density="comfortable"
                variant="outlined"
                hide-details
                readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                model-value="michael@icefoganalytics.com"
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
                :model-value="`2 Stope Way
Whitehorse, Yukon Y1A0B3`"></v-textarea>
            </v-col>
          </v-row>

          <v-btn to="/student/edit" color="primary" class="mt-5">Edit</v-btn>
        </v-card-text>
      </v-card>

      <v-divider class="mt-7 mb-7"></v-divider>
      <RecentMessages></RecentMessages>
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

      <v-card class="mb-5">
        <v-card-text>
          <h4 class="text-h5">Academic Year 2023/24</h4>
          <v-btn color="primary" to="/application">Start a new Application</v-btn>
          <v-btn>Request a change</v-btn>
          <br />
          ** 1 active application but multiples possible within an academic year
          <v-list> </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useStudentStore } from "../store";
import { useApplicationStore } from "@/modules/application/store";
import ApplicationCard from "@/modules/application/components/application-card.vue";
import AnnouncementList from "@/modules/notifications/components/announcement-list.vue";
import RecentMessages from "@/modules/messages/components/recent-messages.vue";

export default {
  computed: {
    ...mapState(useStudentStore, ["student"]),
    ...mapState(useApplicationStore, ["myApplications"]),
  },
  components: { ApplicationCard, AnnouncementList, RecentMessages },
  methods: {
    ...mapActions(useApplicationStore, ["create"]),
    createApplicationClick() {
      this.create();
    },
  },
};
</script>
