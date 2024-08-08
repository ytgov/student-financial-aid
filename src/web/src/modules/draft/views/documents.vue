<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.documents.title") }}</h3>
      <p class="d-none">
        {{ $t("application.documents.excerpt") }}
      </p>
      <p class="mb-3">
        Please upload the following documents before submitting your application. If a document doesn't apply to you,
        you do not need to upload it. As a temporary measure, the Portal will allow you to submit the application
        without attaching all listed documents.
      </p>
      <p class="mb-3">The <strong>Program Info Form</strong> is mandatory for all applications.</p>
      <p class="mb-3">
        There may be a delay in assessing your application if a required document is uploaded incorrectly or missing.
      </p>

      <v-divider class="my-3" />

      <v-list lines="two" style="border: 1px #ccc solid; border-radius: 4px">
        <!--      <v-list-item>
          <div class="d-flex ml-15">
            File
            <v-spacer></v-spacer>
            <v-btn size="small" color="info">Template</v-btn>
            <v-btn size="small" color="info">Upload</v-btn>
          </div>
        </v-list-item> -->

        <div v-for="(doc, key) in requiredDocuments">
          <v-list-item>
            <template v-slot:prepend>
              <v-avatar color="success" v-if="doc.status_description == 'Accepted'">
                <v-icon color="white">mdi-file</v-icon>
              </v-avatar>
              <v-avatar color="error" v-else-if="doc.status_description == 'Rejected'">
                <v-icon color="white">mdi-alert-outline</v-icon>
              </v-avatar>
              <v-avatar color="warning" v-else-if="doc.status_description == 'Missing'">
                <v-icon color="white">mdi-upload</v-icon>
              </v-avatar>
              <v-avatar color="grey" v-else>
                <v-icon color="white">mdi-file</v-icon>
              </v-avatar>
            </template>
            <div class="d-flex">
              <div>
                <span style="font-size: 14px; font-weight: 700">{{ doc.description }}</span>
                <span v-if="doc.upload" class="pl-1">: {{ doc.upload.file_name }}</span>
                <br />
                {{ doc.status_description }}
                <span v-if="doc.upload"> - Uploaded on {{ formatDate(doc.upload.upload_date) }}</span>
              </div>
              <v-spacer></v-spacer>

              <v-menu v-model="menu[key]" transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn color="" variant="flat" size="small" v-bind="props">
                    Actions <v-icon class="ml-1">mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item v-if="doc.document_location" @click="openTemplate(doc)">
                      <v-icon class="mr-2" color="primary">mdi-file-pdf-box</v-icon> Download Template
                    </v-list-item>

                    <v-list-item @click="doUpload(doc)" v-if="doc.status_description == 'Missing'">
                      <v-icon class="mr-2" color="primary">mdi-upload</v-icon> Upload
                    </v-list-item>

                    <v-list-item @click="doUpload(doc)" v-if="doc.status_description != 'Missing'">
                      <v-icon class="mr-2" color="primary">mdi-upload</v-icon> Upload Another
                    </v-list-item>

                    <v-list-item @click="doReplace(doc)" v-if="doc.status_description != 'Missing'">
                      <v-icon class="mr-2" color="primary">mdi-upload</v-icon> Replace
                    </v-list-item>

                    <v-list-item
                      @click="doDownload(doc)"
                      v-if="['Unreviewed', 'Rejected', 'Unreviewed', 'Pending'].includes(doc.status_description)">
                      <v-icon class="mr-2" color="primary">mdi-eye</v-icon> View Uploaded File
                    </v-list-item>

                    <v-list-item v-if="['Unreviewed', 'Rejected', 'Unreviewed'].includes(doc.status_description)">
                      <v-icon class="mr-2" color="primary">mdi-delete</v-icon> Remove
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </v-list-item>
          <v-divider v-if="key < requiredDocuments.length - 1" />
        </div>
      </v-list>
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
import moment from "moment";

export default {
  components: { UploadDialog },
  data: () => ({
    to_upload: undefined,
    menu: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  }),
  computed: {
    ...mapWritableState(useDraftStore, ["application", "requiredDocuments", "fileUpload"]),
  },
  async mounted() {
    await this.loadRequiredDocuments();
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save", "loadRequiredDocuments", "downloadFile"]),

    async doUpload(doc) {
      this.fileUpload = doc;
      this.fileUpload.replace = false;
    },

    async doReplace(doc) {
      this.fileUpload = doc;
      this.fileUpload.replace = true;
      this.fileUpload.replace_id = doc.upload.object_key;
    },

    async doDownload(doc) {
      let file = await this.downloadFile(this.application.id, doc.upload);

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file);
      link.download = doc.upload.file_name;
      link.click();
    },

    statusColor(status) {
      if (status == "Missing") return "warning";
      else if (status == "Verified") return "success";
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD @ h:mm A");
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
    openTemplate(doc) {
      window.open(doc.document_location, "_blank");
    },
  },
};
</script>
