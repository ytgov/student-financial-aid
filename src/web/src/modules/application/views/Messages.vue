<template>
  <h2 class="text-h2 mb-6">Messages</h2>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="7">
          <v-list style="border: 1px #bbb solid; border-radius: 4px">
            <div v-for="(item, idx) of messages">
              <v-list-item lines="three" :subtitle="item.subtitle" :title="item.title"> </v-list-item>
              <v-divider class="mt-1" v-if="idx < messages.length - 1"></v-divider>
            </div>
          </v-list>
        </v-col>
        <v-divider vertical class="d-none d-md-flex" />
        <v-col>
          <div class="body-text mb-4">
            Have questions about this application? Use the form below to send us a message.
          </div>

          <v-textarea
            v-model="messageText"
            label="Questions or comments"
            variant="outlined"
            density="comfortable"
            bg-color="white"></v-textarea>

          <v-btn color="primary" :disabled="!messageText" @click="sendMessage"> Send Message</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/store/UserStore";
import { useApplicationStore } from "../store";

export default {
  data: () => ({
    messageText: "",
  }),
  mounted() {},
  computed: {
    ...mapState(useUserStore, ["student", "studentAddress"]),
    ...mapState(useApplicationStore, ["application"]),
    messages() {
      return [
        {
          title: "From Michael Johnson on July 12, 2023 at 9:15 am",
          subtitle:
            "Thanks for submitting, but you missed all the required files. Please send them to us ASAP or else things will be delayed and you will have to drop out of school and get a job at Starbucks",
        },
        {
          title: "From Michael Johnson on July 12, 2023 at 9:15 am",
          subtitle: "Thanks for submitting, but you missed all the required files. Please send them to us ASAP or else",
        },
      ];
    },
  },
  methods: {
    sendMessage() {
      this.messageText = "";
    },
  },
};
</script>
