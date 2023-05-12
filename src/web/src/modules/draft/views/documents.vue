<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.documents.title") }}</h3>
      <p>
        {{ $t("application.documents.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <v-row>
        <v-col>Type or Purpose</v-col>
        <v-col>File name</v-col>
        <v-col>File name</v-col>
      </v-row>


      <label class="v-label mb-5">Required documents</label>

      <v-row v-for="(doc, key) in requiredDocuments">
        <v-col>
          <strong>{{ doc.description }}</strong> <br />
          {{doc.file_name}}
          <!-- <a :href="doc.location" target="_blank">{{ doc.location }}</a> -->
        </v-col>

        <v-col v-if="['Verified', 'Vérifié'].includes(doc.status)">
          <a>{{ $t("buttons.delete") }}</a>
        </v-col>
        <v-col v-else-if="['Uploading', 'Téléchargement'].includes(doc.status)">
          <a>{{ $t("buttons.cancel") }}</a>
        </v-col>
        <v-col v-else>
          <v-btn color="info" size="small" :to="`/application/documents/upload/${doc.resource}`">
            {{ $t("application.documents.buttons.upload") }}
          </v-btn>
        </v-col>
        <v-divider />
      </v-row>

      <label class="v-label mt-8 mb-5">Recommended or optional documents</label>

      <v-row v-for="(doc, key) in requiredDocuments">
        <v-col>
          <strong>{{ doc.description }}</strong> <br />
          <a :href="doc.location" target="_blank">{{ doc.location }}</a>
        </v-col>

        <v-col v-if="['Verified', 'Vérifié'].includes(doc.status)">
          <a>{{ $t("buttons.delete") }}</a>
        </v-col>
        <v-col v-else-if="['Uploading', 'Téléchargement'].includes(doc.status)">
          <a>{{ $t("buttons.cancel") }}</a>
        </v-col>
        <v-col v-else>
          <v-btn color="info" size="small" :to="`/application/documents/upload/${doc.resource}`">
            {{ $t("application.documents.buttons.upload") }}
          </v-btn>
        </v-col>
        <v-divider />
      </v-row>


    </v-card-text>
  </v-card>
  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

//import { mapState } from "pinia";

export default {
  components: {},
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useDraftStore, ["requiredDocuments"]),
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save", "upload"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Addresses"));
      });
    },
  },
};
</script>
