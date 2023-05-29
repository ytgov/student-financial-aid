<template>
  <v-dialog v-model="visible" persistent width="600">
    <v-card v-if="fileUpload">
      <v-toolbar color="primary" variant="dark" title="Document Upload">
        <v-spacer></v-spacer>
        <v-btn icon @click="closeClick" color="white"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          label="Document type"
          variant="outlined"
          bg-color="white"
          readonly
          density="comfortable"
          v-model="fileUpload.document_type" />

        <v-file-input
          label="Choose file"
          variant="outlined"
          bg-color="white"
          prepend-icon=""
          prepend-inner-icon="mdi-paperclip"
          v-model="file">
        </v-file-input>

        <v-textarea label="Notes" rows="3" variant="outlined" bg-color="white" density="comfortable"></v-textarea>

        <v-btn color="primary" class="my-3" @click="uploadClick" :disabled="!this.file">Upload</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

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
    ...mapActions(useDraftStore, ["upload"]),
    closeClick() {
      this.file = undefined;
      this.fileUpload = undefined;
    },
    uploadClick() {
      console.log();
      this.upload(this.file).then((resp) => {
        this.show = false;
      });
    },
  },
};
</script>
