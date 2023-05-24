<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.documents.title") }}</h3>
      <p>
        {{ $t("application.documents.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <v-row class="mb-1">
        <v-col cols="12" md="2"><label class="v-label pl-2">Status</label></v-col>
        <v-col cols="12" md="10"><label class="v-label">Document type</label></v-col>
      </v-row>
      <v-divider class="mb-3" />

      <v-row v-for="(doc, key) in requiredDocuments">
        <v-col cols="12" md="2">
          <v-chip :color="statusColor(doc.status)" variant="flat">{{ doc.status }}</v-chip>
        </v-col>
        <v-col cols="12" md="8" class="pt-4">
          {{ doc.description }}
        </v-col>

        <v-col v-if="doc.status == 'Missing'" cols="12" md="12" class="pt-1">
          <v-btn @click="doUpload(doc)">Upload</v-btn>
        </v-col>

        <v-col v-else cols="12" md="2" class="pt-1 text-right">
          <v-btn color="warning" size="small">
            {{ $t("application.documents.buttons.delete") }}
          </v-btn>
        </v-col>
        <v-divider v-if="key < requiredDocuments.length - 1" />
      </v-row>
    </v-card-text>
  </v-card>

  <div>
    <v-btn color="info" @click="backClick" class="float-left pl-3">
      <v-icon class="mr-2">mdi-arrow-left</v-icon> Previous
    </v-btn>
    <div class="text-right mt-5">
      <v-btn color="primary" class="mr-3" @click="saveClick">Save</v-btn>
      <v-btn color="primary" @click="nextClick" class="pr-3">
        Save and Next <v-icon class="ml-2">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>

  <UploadDialog></UploadDialog>
</template>

<script>
import UploadDialog from "../components/upload-dialog.vue";
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: { UploadDialog },
  data: () => ({
    to_upload: undefined,
  }),
  computed: {
    ...mapWritableState(useDraftStore, ["application", "requiredDocuments", "fileUpload"]),
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save", "upload"]),

    async doUpload(doc) {
      this.fileUpload = { document_type: "TESING" };
      //await this.upload(doc).then(() => {});
    },

    docChanged(doc) {
      if (doc) {
        console.log(doc);
      }
    },

    statusColor(status) {
      if (status == "Missing") return "warning";
      else if (status == "Verified") return "success";
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Documents"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Documents"));
      });
    },
  },
};
</script>
