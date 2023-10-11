<template>
  <v-dialog v-model="visible" persistent width="600">
    <v-card v-if="fileUpload">
      <v-toolbar color="primary" variant="dark" title="Document Upload">
        <v-spacer></v-spacer>
        <v-btn icon @click="closeClick" color="white"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <p class="mb-4">{{ fileUpload.description }}</p>

        <v-file-input
          label="Choose file"
          variant="outlined"
          bg-color="white"
          prepend-icon=""
          prepend-inner-icon="mdi-paperclip"
          accept="image/*,.pdf,.doc,.docx"
          hint="We accept files in image formats, PDF or Microsoft Word"
          persistent-hint
          class="mb-5"
          v-model="file">
        </v-file-input>

        <v-textarea label="Notes" rows="3" variant="outlined" bg-color="white" density="comfortable"></v-textarea>

        <v-btn color="primary" class="my-3" @click="uploadClick" :disabled="!file">Upload</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { isArray } from "lodash";

export default {
  data: () => ({
    show: false,
    file: undefined,
  }),
  computed: {
    ...mapState(useDraftStore, ["application"]),
    ...mapWritableState(useDraftStore, ["fileUpload"]),

    visible() {
      return this.fileUpload ? true : false;
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["upload", "loadRequiredDocuments"]),
    closeClick() {
      this.file = undefined;
      this.fileUpload = undefined;
    },
    async uploadClick() {
      let t = isArray(this.file) ? this.file[0] : this.file;

      this.upload(t).then(async (resp) => {
        await this.loadRequiredDocuments();
        this.closeClick();
      });
    },
  },
};
</script>
