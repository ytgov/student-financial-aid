<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.other_funding.legends.consent") }}</h3>
      <p>
        {{ $t("application.onboarding.other_funding.excerpt") }}
      </p>

      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <v-row v-for="(item, key) in application.draft.other_funding.other_fundings">
          <v-col cols="12" md="8"><TextField type="text" v-model="item.agency" label="Agency Name" /></v-col>
          <v-col cols="12" md="4">
            <TextField type="text" v-model="item.amount" placeholder="0.00" label="Amount" />
          </v-col>
          <v-col cols="12" md="8">
            <v-autocomplete
              multiple
              chips
              closable-chips
              v-model="item.purposes"
              :items="['Tuition', 'Books', 'Living Expenses', 'Transportation', 'Other']"
              label="Funding Purpose"
              bg-color="white"
              density="compact"
              variant="outlined"></v-autocomplete>
            <TextField
              type="text"
              v-model="item.other"
              placeholder="Describe other purposes"
              v-if="item.purposes.includes('Other')" />
          </v-col>
          <v-col>
            <v-btn icon="mdi-delete" size="small" color="warning" @click="remove(key)" class="float-right"></v-btn>
            <v-textarea
              v-model="item.comments"
              label="Comments"
              hide-details
              bg-color="white"
              density="compact"
              rows="4"
              style="margin-right: 55px"
              variant="outlined" />
          </v-col>

          <v-divider></v-divider>
        </v-row>

        <v-btn class="mt-6" color="info" @click="add()">Add funding</v-btn>

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
  components: { TextField },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.other_funding.other_fundings = this.application.draft.other_funding.other_fundings || [];
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    add() {
      this.application.draft.other_funding.other_fundings.push({
        agency: "",
        amount: "",
        purposes: [],
        other: "",
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.other_funding.other_fundings.splice(key, 1); // 2nd parameter means remove one item only
      }
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Other Funding"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Other Funding"));
      });
    },
  },
};
</script>
