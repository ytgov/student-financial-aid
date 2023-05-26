<template>
  <v-form>
    <v-radio-group v-model="application.draft.addresses.primary">
      <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
        <v-card-text>
          <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address") }}</h3>
          <v-divider class="my-3" />
          <v-radio value="Permanent" label="This is my primary address" class="mb-3 ml-0 pl-0"></v-radio>
          <AddressSelector v-model="application.draft.addresses.home_address1" />
        </v-card-text>
      </v-card>

      <v-card color="#eee5d1" variant="elevated" elevation="0">
        <v-card-text>
          <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address_at_school") }}</h3>
          <p class="note">(Optional) If you do not have an address while at school yet just leave this form blank.</p>
          <v-divider class="my-3" />
          <v-radio value="School" label="This is my primary address"></v-radio>
          <AddressSelector v-model="application.draft.addresses.home_address2" />
        </v-card-text>
      </v-card>
    </v-radio-group>
  </v-form>

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
import AddressSelector from "@/components/forms/AddressSelector.vue";
import { useDraftStore } from "../store";
import { mapActions, mapWritableState } from "pinia";

export default {
  components: {
    AddressSelector,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  mounted() {
    this.application.draft.addresses.home_address1 = this.application.draft.addresses.home_address1 || {};
    this.application.draft.addresses.home_address2 = this.application.draft.addresses.home_address2 || {};
    this.application.draft.addresses.primary = this.application.draft.addresses.primary || "Permanent";
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Addresses"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Addresses"));
      });
    },
  },
};
</script>
