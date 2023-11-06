<template>
  <h2 class="text-h2 mb-2">Documents</h2>
  <p class="mb-3">These are the documents submitted with this application.</p>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <v-list style="border: 1px #bbb solid; border-radius: 4px" v-if="documents && documents.length > 0">
        <div v-for="(item, idx) of documents">
          <v-list-item
            @click="downloadClick(item)"
            class="py-1"
            style="min-height: auto"
            :title="item.file_name"
            prepend-icon="mdi-download"
            :subtitle="`Uploaded on: ${formatDate(item.upload_date)} - ${item.requirementTypeDescription}`">
          </v-list-item>

          <v-divider class="mt-1" v-if="idx < documents.length - 1"></v-divider>
        </div>
      </v-list>
      <div v-else>No documents found.</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useApplicationStore } from "../store";
import moment from "moment";

export default {
  data: () => ({}),
  mounted() {},
  computed: {
    ...mapState(useApplicationStore, ["application", "documents"]),
  },
  methods: {
    ...mapActions(useApplicationStore, ["downloadLetter"]),

    async downloadClick(item: any) {
      let file = await this.downloadLetter(this.application.id, item);

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file);
      link.download = item.file_name;
      link.click();
    },

    formatDate(input: Date | undefined): string {
      if (input) return moment.utc(input).format("YYYY-MM-DD");
      return "";
    },
  },
};
</script>
