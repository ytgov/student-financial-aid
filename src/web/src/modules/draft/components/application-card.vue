<template>
  <v-alert
    :color="color"
    variant="tonal"
    :icon="icon"
    class="mb-5 pb-2"
    @click="openClick"
    elevation="0"
    style="cursor: pointer">
    <v-chip size="small" :color="chipColor" variant="flat" class="float-right">{{
      application.status || "Submitted"
    }}</v-chip>
    <v-alert-title class="mb-0">Academic Year {{ application.academicYearId }}</v-alert-title>
    <div class="v-alert-subtitle">
      {{ application.institutionName }}: {{ formatDate(application.classesStartDate) }} to
      {{ formatDate(application.classesEndDate) }}
    </div>
    {{ application.description }}
    <div style="margin-left: -16px" class="mt-2 d-flex">
      <v-btn color="primary" class="my-0" variant="text"> View </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isCurrent"
        color="info"
        class="my-0"
        variant="outlined"
        size="small"
        rounded
        @click.stop="showUpload = true"
        ><v-icon>mdi-upload</v-icon> &nbsp; Upload Documents
      </v-btn>
    </div>
    <UploadDialog v-model="showUpload" :application="application" @close="showUpload = false"></UploadDialog>
  </v-alert>
</template>
<script lang="ts">
import moment from "moment";
import { mapActions } from "pinia";
import { useDraftStore } from "../store";
import UploadDialog from "@/modules/draft/components/application-upload-dialog.vue";

export default {
  props: ["application", "isCurrent"],
  components: { UploadDialog },
  data: () => ({
    showUpload: false,
  }),
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
      return "success";
    },
    isDraft() {
      if (this.application.application_json && this.application.status == "In Progress") return true;

      return false;
    },
    applicationUrl() {
      return `/application/${this.application.id}/status`;
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["selectDraft", "resume", "delete"]),
    openClick() {
      // check if displaying a submitted draft. If so, don't navigate
      if (this.application.application_json) return;

      this.$router.push(this.applicationUrl);
    },
    formatDate(input: any) {
      if (input) {
        return moment(input).format("YYYY/MM/DD");
      }
      return "";
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
