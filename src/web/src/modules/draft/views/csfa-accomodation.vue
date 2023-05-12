<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.csfa_accommodation.legends.csfa-accomodation") }}</h3>
      <p>
        {{ $t("application.onboarding.csfa_accommodation.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <v-row v-for="(item, key) in this.application.draft.csfa_accomodation.accomodations">
          <v-col cols="12">
            <h3>{{ item.heading }}</h3>
            <label class="d-block v-label mt-2">{{ item.note }}</label>
          </v-col>
          <v-col cols="12" md="4">
            <Select
              :items="['Living at Parents', 'Living on Own', 'Both']"
              v-model="item.living"
              label="Living arrangement" />
          </v-col>
          <v-col cols="12" md="4"> <TextField v-model="item.city" label="City" /> </v-col>
          <v-col cols="12" md="4"> <TextField v-model="item.province" label="Province" /> </v-col>
          <v-col cols="12" md="3" v-if="['Living at Parents', 'Both'].includes(item.living)">
            <TextField v-model="item.rent_to_parents" placeholder="0.00" label="Rent paid to parents" />
          </v-col>
          <v-col cols="12" md="3" v-if="['Living on Own', 'Both'].includes(item.living)">
            <v-checkbox v-model="item.own_home" label="I own my own home" />
          </v-col>
          <v-col cols="12" md="3">
            <v-checkbox v-model="item.bus_service" label="Bus service available?" />
          </v-col>
          <v-col cols="12" md="3" v-if="!item.bus_service">
            <TextField type="text" v-model="item.distinct_from_school" label="Distance from school/work (km)" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import TextField from "@/components/forms/TextField.vue";
import Select from "@/components/forms/Select.vue";
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: { TextField, Select },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
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
    ...mapActions(useDraftStore, ["resume", "save"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("CSFA Accomodation"));
      });
    },
  },
};
</script>
