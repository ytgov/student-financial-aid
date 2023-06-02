<template>
  <v-card color="#eee5d1" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.csfa_accommodation.legends.csfa-accomodation") }}</h3>
      <p>
        {{ $t("application.onboarding.csfa_accommodation.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form>
        <div v-for="(item, key) in application.draft.csfa_accomodation.accomodations">
          <v-row>
            <v-col cols="12">
              <h3>{{ item.heading }}</h3>
              <label class="d-block v-label mt-2">{{ item.note }}</label>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :items="housingOptions"
                item-title="description"
                variant="outlined"
                bg-color="white"
                density="comfortable"
                hide-details
                item-value="id"
                v-model="item.living"
                label="Living arrangement" />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                variant="outlined"
                bg-color="white"
                density="comfortable"
                v-model="item.city"
                :label="$t('components.address_selector.labels.address_city')"
                clearable
                :items="cities"
                autocomplete="null"
                item-value="id"
                item-title="description" />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                variant="outlined"
                bg-color="white"
                density="comfortable"
                v-model="item.province"
                :label="$t('components.address_selector.labels.address_province')"
                clearable
                :items="provinces"
                autocomplete="null"
                item-value="id"
                item-title="description" />
            </v-col>

            <v-col cols="12" md="4" v-if="[1, 3].includes(item.living)">
              <v-text-field
                type="number"
                variant="outlined"
                bg-color="white"
                density="comfortable"
                hide-details
                v-model="item.rent_to_parents"
                placeholder="0.00"
                label="Rent paid to parents" />
            </v-col>
            <v-col cols="12" md="6" v-if="[2, 3].includes(item.living)">
              <v-checkbox hide-details v-model="item.own_home" label="I own my own home" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="py-0">
              <v-checkbox v-model="item.bus_service" label="Bus service available?" hide-details />
            </v-col>
            <v-col cols="12" md="8" class="py-0" v-if="!item.bus_service">
              <v-text-field
                type="number"
                variant="outlined"
                bg-color="white"
                density="comfortable"
                hide-details
                v-model="item.distinct_from_school"
                label="Distance from school/work (km)" />
            </v-col>
          </v-row>
          <v-divider class="my-4" v-if="key == 0" />
        </div>
      </v-form>
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
import Select from "@/components/forms/Select.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { useReferenceStore } from "@/store/ReferenceStore";

export default {
  components: { TextField, Select },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useReferenceStore, ["cities", "provinces"]),
  },
  data() {
    return {
      housingOptions: [
        { id: 1, description: "Living at Parents" },
        { id: 2, description: "Living on Own" },
        { id: 3, description: "Both" },
      ],
    };
  },
  mounted() {
    this.application.draft.csfa_accomodation.accomodations = this.application.draft.csfa_accomodation.accomodations || [
      {
        heading: "Pre-study Accomodation",
        note: "Your pre-study accommodations is the 4-month period just before your classes start in this academic year. ",
        living: "Living at Parents",
        bus_service: true,
      },
      {
        heading: "Study Accomodation",
        note: "Your study accommodations includes all months from your start to end date of classes for this application period.",
        living: "Living at Parents",
        bus_service: true,
      },
    ];

    this.$emit("input", this.valid);
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("CSFA Accomodation"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("CSFA Accomodation"));
      });
    },
  },
};
</script>
