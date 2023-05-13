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
          <v-file-input
            label="Choose file"
            variant="outlined"
            bg-color="white"
            prepend-icon=""
            prepend-inner-icon="mdi-paperclip"
            hide-details
            v-model="to_upload"
            @update:model-value="docChanged">
            <template v-slot:append>
              <v-btn color="info" size="small" @click="doUpload(doc)" :disabled="!doc.to_upload">
                {{ $t("application.documents.buttons.upload") }}
              </v-btn>
            </template>
          </v-file-input>
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
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

//import { mapState } from "pinia";

export default {
  components: {},
  data: () => ({
    to_upload: undefined
  }),
  computed: {
    ...mapWritableState(useDraftStore, ["application", "requiredDocuments"]),
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save", "upload"]),

    async doUpload(doc) {
      console.log("UP", doc.to_upload);

      await this.upload(doc).then(() => {});
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
