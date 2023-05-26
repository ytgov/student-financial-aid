<template>
  <v-alert
    :color="color"
    variant="tonal"
    :icon="icon"
    class="mb-5 pb-2"
    @click="openClick"
    elevation="0"
    style="cursor: pointer">
    <v-chip size="small" :color="chipColor" variant="flat" class="float-right">{{ application.status }}</v-chip>
    <v-alert-title class="mb-0">Academic Year {{ application.academic_year_id }}</v-alert-title>
    <div class="v-alert-subtitle">Last saved {{ formatDate(application.update_date) }}</div>
    {{ application.description }}
    <div style="margin-left: -16px" class="mt-2">
      <v-btn
        v-if="application.status == 'In Progress'"
        :to="`/draft/${application.id}`"
        color="primary"
        class="my-0"
        variant="text">
        Edit
      </v-btn>
      <v-btn v-else color="primary" class="my-0" variant="text"> View </v-btn>

      <v-btn
        v-if="application.status == 'In Progress'"
        color="error"
        class="my-0 float-right"
        variant="text"
        @click.stop="cancelClick">
        Cancel
      </v-btn>
    </div>
  </v-alert>
  <v-dialog width="500" v-model="showCancelDialog" persistent>
    <v-card>
      <v-toolbar color="warning" variant="dark" title="Cancel Application">
        <v-spacer></v-spacer>
        <v-btn icon @click="showCancelDialog = false" color="white"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text class="py-7">
        By clicking 'Yes' below, you will cancel and permanently delete this In Progress application.

        <br /><br />Would like to proceed?

        <div class="d-flex mt-5">
          <v-btn color="primary" @click="showCancelDialog = false">No</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="warning" @click="deleteClick">Yes</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import moment from "moment";
import { mapActions } from "pinia";
import { useDraftStore } from "../store";

export default {
  props: ["application"],
  data: () => ({ showCancelDialog: false }),
  computed: {
    color() {
      if (this.application.status == "In Progress") return "yg_moss";
      return "yg_lichen";
    },
    icon() {
      if (this.application.status == "In Progress") return "mdi-pencil";
      return "mdi-lock";
    },
    chipColor() {
      if (this.application.status == "In Progress") return "warning";
      return "mdi-lock";
    },
    isDraft() {
      if (this.application.application_json) return true;

      return false;
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["selectDraft", "resume", "delete"]),
    openClick() {
      if (this.isDraft) {
        this.selectDraft(this.application);
        this.$router.push(this.resume());
      } else this.$router.push(`/application/${this.application.id}`);
    },
    formatDate(input: any) {
      if (input) {
        return moment(input).format("YYYY/MM/DD @ h:mm A");
      }
      return "";
    },
    cancelClick() {
      this.showCancelDialog = true;
    },
    deleteClick() {
      this.delete(this.application.id).then((resp) => {
        this.showCancelDialog = false;
      });
    },
  },
};
</script>

<style>
.v-alert-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  opacity: var(--v-medium-emphasis-opacity);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
}
</style>
