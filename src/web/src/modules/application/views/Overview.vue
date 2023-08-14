<template>
  <h2 class="text-h2 mb-6">Overview</h2>

  <v-row>
    <v-col cols="12" md="4">
      <v-card color="#eee5d1" variant="elevated" elevation="0" :to="messagesUrl">
        <v-card-text>
          <h3 class="text-h3 mb-2">Messages</h3>
          <v-divider class="mb-3" />
          <p>You have no unread messages</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card color="#eee5d1" variant="elevated" elevation="0" :to="statusUrl">
        <v-card-text>
          <h3 class="text-h3 mb-2">Funding Status</h3>
          <v-divider class="mb-3" />
          <p>You have no unread messages</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card color="#eee5d1" variant="elevated" elevation="0">
        <v-card-text> 
          <h3 class="text-h3 mb-2">Notifications</h3>
          <v-divider class="mb-3" />
          <p>You have no unread notifications</p> </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/store/UserStore";
import { useApplicationStore } from "../store";

export default {
  data: () => ({}),
  mounted() {},
  computed: {
    ...mapState(useUserStore, ["student", "studentAddress"]),
    ...mapState(useApplicationStore, ["application"]),
    baseUrl(): string {
      if (this.application) return `/application/${this.application.id}`;
      return "";
    },
    messagesUrl():string {
      return this.baseUrl + "/messages"
    },
    statusUrl():string {
      return this.baseUrl + "/status"
    }
  },
  methods: {},
};
</script>
