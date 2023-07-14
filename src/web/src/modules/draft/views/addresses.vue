<template>
  <v-form>
    <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
      <v-card-text>
        <v-checkbox
          v-model="application.draft.addresses.primary"
          value="Permanent"
          label="This is my primary address"
          hide-details
          class="float-right" />
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address") }}</h3>
        <v-divider class="my-3" />

        <v-select
          label="Use existing address?"
          v-model="application.draft.addresses.home_address1_id"
          variant="outlined"
          bg-color="white"
          density="comfortable"
          :items="[{ address_display: 'Add New Address', id: -1 }, ...addresses]"
          item-title="address_display"
          item-value="id"></v-select>

        <AddressSelector
          v-if="application.draft.addresses.home_address1_id == -1"
          v-model="application.draft.addresses.home_address1" />
      </v-card-text>
    </v-card>

    <v-checkbox
      label="I want my letters to be mailed to an address that is different from my Permanent mailing address"
      name="showSchool"
      @update:modelValue="showSchoolChanged"
      v-model="showSchoolAddress"></v-checkbox>

    <v-card color="#eee5d1" variant="elevated" elevation="0" v-if="showSchoolAddress">
      <v-card-text>
        <v-checkbox
          v-model="application.draft.addresses.primary"
          value="School"
          label="This is my primary address"
          hide-details
          class="float-right" />
        <h3 class="text-h3 mb-6">{{ $t("application.onboarding.addresses.legends.address_at_school") }}</h3>
        <p class="note">(Optional) If you do not have an address while at school yet just leave this form blank.</p>
        <v-divider class="my-3" />

        <v-select
          label="Use existing address?"
          v-model="application.draft.addresses.home_address2_id"
          variant="outlined"
          bg-color="white"
          density="comfortable"
          :items="[{ address1: 'Add New Address', id: -1 }, ...addresses]"
          item-title="address1"
          item-value="id"></v-select>

        <AddressSelector
          v-if="application.draft.addresses.home_address2_id == -1"
          v-model="application.draft.addresses.home_address2" />
      </v-card-text>
    </v-card>
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
import { mapActions, mapState, mapWritableState } from "pinia";
import { useStudentStore } from "@/modules/student/store";

export default {
  components: {
    AddressSelector,
  },
  data: () => ({
    showSchoolAddress: false,
  }),
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useStudentStore, ["addresses"]),
  },
  async mounted() {
    this.application.draft.addresses.home_address1 = this.application.draft.addresses.home_address1 || {};
    this.application.draft.addresses.home_address2 = this.application.draft.addresses.home_address2 || {};
    this.application.draft.addresses.primary = this.application.draft.addresses.primary || "Permanent";

    this.application.draft.addresses.home_address1_id = this.application.draft.addresses.home_address1_id || -1;
    this.application.draft.addresses.home_address2_id = this.application.draft.addresses.home_address2_id || -1;

    await this.loadAddresses();
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    ...mapActions(useStudentStore, ["loadAddresses"]),

    showSchoolChanged(n, o) {
      if (n == false) this.application.draft.addresses.primary = "Permanent";
    },

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
