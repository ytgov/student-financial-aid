<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.spouse.legends.spouse") }}</h3>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }" > -->
      <v-form submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <TextField label="First name" v-model="application.draft.spouse.first_name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="Last name" v-model="application.draft.spouse.last_name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="Initials" v-model="application.draft.spouse.initials" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField label="SIN" v-model="application.draft.spouse.sin" />
          </v-col>
          <v-col cols="12" md="6">
            <Select
              label="Study period employment status"
              v-model="application.draft.spouse.employment_status"
              :items="['Employed', 'Not Employed']" />
          </v-col>
        </v-row>

        <v-divider class="my-3" />
        <label class="v-label mb-6">{{ $t("application.onboarding.spouse.legends.post-secondary") }}</label>

        <v-row>
          <v-col cols="12" md="4">
            <DateSelector :label="$t('In school from')" v-model="application.draft.spouse.post_secondary" />
          </v-col>
          <v-col cols="12" md="4">
            <DateSelector :label="$t('In school until')" v-model="application.draft.spouse.employment_information" />
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox
              v-model="application.draft.spouse.employment_information"
              label="Applying for Canada Student Loan" />
          </v-col>
        </v-row>
        <v-divider class="my-3" />

        <label class="v-label mb-6">{{
          $t("application.onboarding.spouse.legends.employment-information")
        }}</label>

        <v-row>
          <v-col cols="12" md="4">
            <v-checkbox v-model="application.draft.spouse.living_with" label="Living with spouse" />
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox v-model="application.draft.spouse.bus_service" label="Bus service available?" />
          </v-col>
          <v-col cols="12" md="4">
            <TextField
              v-if="!application.draft.spouse.bus_service"
              v-model="application.draft.spouse.distance_from_school"
              label="Distance form school/work (km)" />
          </v-col>
        </v-row>
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
import DateSelector from "@/components/forms/DateSelector.vue";
import Select from "@/components/forms/Select.vue";

import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {
    TextField,
    DateSelector,
    Select,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Spouse"));
      });
    },
  },
};
</script>
