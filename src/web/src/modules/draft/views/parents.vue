<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.parents.legends.address") }}</h3>
      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form>
        <AddressSelector v-model="application.draft.parents.mailing_address" />

        <v-divider class="my-4" />
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.parents.legends.information") }}</h3>

        <v-row v-for="(item, key) in application.draft.parents.parents">
          <v-col cols="12">
            <label class="v-label d-block">{{ item.heading }}</label>
          </v-col>
          <v-col cols="12" md="6">
            <TextField v-model="item.first_name" label="First name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField v-model="item.last_name" label="Last name" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :items="relationships"
              item-title="description"
              item-value="id"
              v-model="item.relationship"
              bg-color="white"
              variant="outlined"
              density="comfortable"
              label="Relationship" />
          </v-col>
          <v-col cols="12" md="6">
            <SinNumber v-model="item.sin" label="SIN"/>
          </v-col>
          <v-divider v-if="key == 0" />
        </v-row>
      </v-form>
      <!--  </ValidationObserver> -->
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
import AddressSelector from "@/components/forms/AddressSelector.vue";
import TextField from "@/components/forms/TextField.vue";
import { useReferenceStore } from "@/store/ReferenceStore";
import SinNumber from "@/components/forms/SinNumber.vue";

export default {
  components: { AddressSelector, TextField, SinNumber },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useReferenceStore, ["relationships"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.parents.parents = this.application.draft.parents.parents || [
      {
        heading: "Parent 1",
      },
      { heading: "Parent 2" },
    ];
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Parent Details"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Parent Details"));
      });
    },
  },
};
</script>
