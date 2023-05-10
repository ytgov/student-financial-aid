<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.consent_release.legends.consent") }}</h3>
      <p>
        {{ $t("application.onboarding.consent_release.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit">
        <v-table density="comfortable">
          <thead>
            <tr>
              <th class="text-left">Consent person</th>
              <th class="text-left">Academic year start</th>
              <th class="text-left">Academic year end</th>
              <th style="width: 80px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in this.application.draft.consent.consents">
              <td><TextField v-model="item.person" label="" placeholder="Enter Name" /></td>
              <td><TextField v-model="item.start_year" label="" placeholder="Enter Name" /></td>
              <td><TextField v-model="item.end_year" label="" placeholder="Enter Name" /></td>
              <td><v-btn icon="mdi-delete" color="warning" size="small" @click="remove(key)"></v-btn></td>
            </tr>
          </tbody>
        </v-table>

        <v-btn class="mt-4" color="info" @click="addconsent()">Add Consent</v-btn>

        <v-banner
          outlined
          icon="mdi-alert-circle"
          class="problem mt-4 error"
          v-if="invalid && errors.length"
          style="padding-right: 1rem">
          <h3>{{ $t("problem.title") }}</h3>
          <br />
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
      <!-- </ValidationObserver> -->
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
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
    ...mapActions(useDraftStore, ["resume", "save"]),
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
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Consent Release"));
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
