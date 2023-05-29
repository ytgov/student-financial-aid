<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.documents.title") }}</h3>
      <p>
        {{ $t("application.documents.excerpt") }}
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
              <v-avatar color="success" v-if="doc.status == 'Accepted'">
                <v-icon color="white">mdi-file</v-icon>
              </v-avatar>
              <v-avatar color="error" v-else-if="doc.status == 'Rejected'">
                <v-icon color="white">mdi-alert-outline</v-icon>
              </v-avatar>
              <v-avatar color="warning" v-else-if="doc.status == 'Missing'">
                <v-icon color="white">mdi-upload</v-icon>
              </v-avatar>
              <v-avatar color="grey" v-else>
                <v-icon color="white">mdi-file</v-icon>
              </v-avatar>
            </template>
            <div class="d-flex">
              <div>
                <span style="font-size: 14px; font-weight: 700">{{ doc.description }}</span>
                <span v-if="doc.file_name" class="pl-1">: {{ doc.file_name }}</span>
                <br />
                {{ doc.status }}
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
                    <v-list-item>
                      <v-icon class="mr-2" color="primary">mdi-file-pdf-box</v-icon> Download Template
                    </v-list-item>

                    <v-list-item @click="doUpload(doc)" v-if="doc.status == 'Missing'">
                      <v-icon class="mr-2" color="primary">mdi-upload</v-icon> Upload
                    </v-list-item>

                    <v-list-item v-if="['Unreviewed', 'Rejected', 'Unreviewed'].includes(doc.status)">
                      <v-icon class="mr-2" color="primary">mdi-eye</v-icon> View Uploaded File
                    </v-list-item>

                    <v-list-item v-if="['Unreviewed', 'Rejected', 'Unreviewed'].includes(doc.status)">
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
    ],
  }),
  computed: {
    ...mapWritableState(useDraftStore, ["application", "requiredDocuments", "fileUpload"]),
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save", "upload"]),

    async doUpload(doc) {
      console.log(doc);
      this.fileUpload = { document_type: doc.type };
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
