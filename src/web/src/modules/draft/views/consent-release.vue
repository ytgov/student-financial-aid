<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.consent_release.legends.consent") }}</h3>
      <p>
        {{ $t("application.onboarding.consent_release.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form>
        <v-radio-group v-model="application.draft.consent.allow_others">
          <v-radio label="I do not wish to allow anyone else to communicate on my behalf" :value="false"></v-radio>
          <v-radio label="I authorize the following people:" :value="true"></v-radio>
        </v-radio-group>

        <div v-if="application.draft.consent.allow_others">
          <v-row v-for="(item, key) in application.draft.consent.consents">
            <v-col cols="12" md="4"><TextField v-model="item.person" label="Consent person" /></v-col>
            <v-col cols="12" md="4"><TextField v-model="item.start_year" label="Academic year start" /></v-col>
            <v-col cols="12" md="4">
              <v-btn icon="mdi-delete" color="warning" size="small" @click="remove(key)" class="float-right"></v-btn>
              <TextField v-model="item.end_year" label="Academic year end" style="margin-right: 55px" />
            </v-col>
            <v-divider />
          </v-row>

          <v-btn class="mt-6" color="info" @click="addconsent()">Add Consent</v-btn>
        </div>
      </v-form>
      <!-- </ValidationObserver> -->
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
import TextField from "@/components/forms/TextField.vue";
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {
    TextField,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.consent.consents = this.application.draft.consent.consents || [];
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    addconsent() {
      this.application.draft.consent.consents.push({
        person: "",
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear(),
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.consent.consents.splice(key, 1); // 2nd parameter means remove one item only
      }
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Consent Release"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Consent Release"));
      });
    },
  },
};
</script>

<style>
.v-card .v-table {
  border: 1px #d7cfbe solid;
  border-radius: 4px;
}
</style>
