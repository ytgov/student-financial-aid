<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <div class="px-4 py-4">
      <div class="d-flex justify-space-between">
        <div>
          <h3 class="text-h3 mb-1 ml-1">Application for Academic Year 2023</h3>
          <v-breadcrumbs
            :items="[{ title: 'Student Home', to: '/student' }, { title: 'Application Information' }]"
            class="py-0 px-0">
            <template v-slot:divider>
              <v-icon icon="mdi-square-small"></v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </div>
    </div>
  </v-card>
  <v-row class="mt-34" v-if="application">
    <v-col cols="3">
      <v-card elevation="0">
        <v-list density="compact" :lines="false" class="pb-0">
          <v-list-item subtitle="">
            <v-list-item-subtitle class="d-flex">
              <div class="py-1">Application Navigation</div>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider class="mb-1" />

          <div v-for="(item, index) in relevantSections">
            <v-list-item :to="`${baseUrl}${item.url}`" exact color="primary">
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
            <v-divider class="mt-0 mr-3" v-if="index < relevantSections.length - 1" />
          </div>
        </v-list>
      </v-card>
    </v-col>
    <v-col class="pt-3" cols="9">
      <router-view></router-view>
    </v-col>
  </v-row>

  <!--  <hr class="mt-10" />
  {{ application }} -->
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/store/UserStore";
import { useApplicationStore } from "../store";
import { isArray } from "lodash";

export default {
  data: () => ({
    showCreateDialog: false,
    relevantSections: [
      { url: "", name: "Overview" },
      { url: "/status", name: "Status" },
      { url: "/messages", name: "Messages" },
      { url: "/details", name: "Application Details" },
      { url: "/documents", name: "Documents" },
    ],
  }),
  mounted() {
    let applicationId = parseInt(
      isArray(this.$route.params.applicationId) ? this.$route.params.applicationId[0] : this.$route.params.applicationId
    );

    this.loadApplication(applicationId);
  },
  computed: {
    ...mapState(useUserStore, ["student", "studentAddress"]),
    ...mapState(useApplicationStore, ["application"]),
    baseUrl() {
      return `/application/${this.$route.params.applicationId}`;
    },
  },
  methods: {
    ...mapActions(useApplicationStore, ["loadApplication"]),
  },
};
</script>
