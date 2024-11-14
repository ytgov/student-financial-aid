<template>
  <v-dialog persistent width="600">
    <v-card>
      <v-toolbar color="primary" variant="dark" title="Document Upload">
        <v-spacer></v-spacer>
        <v-btn icon @click="closeClick" color="white"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-select
          v-model="requirement_type_id"
          label="Document type"
          variant="outlined"
          :items="requirementTypeOptions"
          item-value="id"
          item-title="description"></v-select>

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

        <v-textarea
          v-model="notes"
          label="Notes"
          rows="3"
          variant="outlined"
          bg-color="white"
          density="comfortable"></v-textarea>

        <v-btn color="primary" class="my-3" @click="uploadClick" :disabled="!isValid">Upload</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { isArray } from "lodash";
import { File } from "buffer";
import { useNotificationStore } from "@/store/NotificationStore";
import { useReferenceStore } from "@/store/ReferenceStore";

const uploadExtensions = [".pdf", ".doc", ".docx", ".tif", ".tiff", ".gif", ".jpg", ".jpeg", ".png", ".bmp"];

export default {
  props: ["application"],
  data: () => ({
    show: false,
    file: undefined,
    requirement_type_id: null as any,
    notes: "",
    requirementTypeOptions: [] as any[],
  }),
  async mounted() {
    this.requirementTypeOptions = await this.loadRequirementTypes();
  },
  computed: {
    isValid() {
      return this.file && this.requirement_type_id;
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["uploadAdditional", "loadRequiredDocuments"]),
    ...mapActions(useReferenceStore, ["loadRequirementTypes"]),
    closeClick() {
      this.file = undefined;
      this.requirement_type_id = null;
      this.notes = "";
      this.$emit("close");
    },
    async uploadClick() {
      let t = (isArray(this.file) ? this.file[0] : this.file) as File | undefined;
      if (t) {
        let extension = t.name.substring(t.name.lastIndexOf("."));

        if (uploadExtensions.includes(extension.toLowerCase())) {
          this.uploadAdditional(t, this.application.id, this.requirement_type_id, this.notes).then(async (resp) => {
            //await this.loadRequiredDocuments();
            console.log("RESP", resp);
            this.closeClick();
          });
        } else {
          this.file = undefined;
          let m = useNotificationStore();
          m.notify({ variant: "error", text: "We only accept images, PDF or Word documents." });
        }
      }
    },
  },
};
</script>
