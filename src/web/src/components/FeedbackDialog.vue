<template>
  <v-dialog v-model="feedbackVisible" width="600" persistent>
    <v-card v-if="feedback">
      <v-toolbar color="warning" variant="dark" title="Send us your feedback">
        <!-- <v-spacer></v-spacer> -->
        <v-btn icon @click="closeClick" color="white"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text class="pb-7">
        <p class="mb-4">
          We will use this information to improve our services. The feedback you send will be anonymous.
        </p>
        <v-textarea
          v-model="feedback.text"
          variant="outlined"
          bg-color="white"
          density="comfortable"
          persistent-hint
          hint="For security and privacy reasons, do not include personal or financial information."
          label="What's your feedback?"></v-textarea>

        <v-textarea
          v-model="feedback.improve"
          class="mt-7"
          variant="outlined"
          bg-color="white"
          density="comfortable"
          label="What should we do to improve this service?"></v-textarea>

        <div class="d-flex mt-1">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="sendClick" :disabled="!(feedback.text && feedback.text.length > 1)">Send Feedback</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { mapActions, mapState, mapWritableState } from "pinia";

export default {
  data: () => ({}),
  computed: {
    ...mapState(useUserStore, ["feedbackVisible"]),
    ...mapWritableState(useUserStore, ["feedback"]),
  },
  methods: {
    ...mapActions(useUserStore, ["sendFeedback", "closeFeedback"]),
    closeClick() {
      this.closeFeedback();
    },
    async sendClick() {
      await this.sendFeedback();
    },
  },
};
</script>

<style scoped>
.v-list-item__prepend > .v-icon {
  margin-inline-end: 12px;
}
</style>
