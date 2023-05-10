<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.statistical.legends.personal_details") }}</h3>

      <p>Student statistical information for the current year:</p>
      <v-divider class="my-3" />

      <v-form @submit.prevent="submit" v-model="valid">
        <v-radio-group v-model="application.draft.statistical.language" inline :label="$t('Langauge')">
          <v-radio label="English" value="English"></v-radio>
          <v-radio label="French" value="French"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="application.draft.statistical.gender" inline :label="$t('Gender')">
          <v-radio label="Male" value="Male"></v-radio>
          <v-radio label="Female" value="Female"></v-radio>
          <v-radio label="Other" value="Other"></v-radio>
        </v-radio-group>

        <Select
          class="mb-5"
          name="Marital status"
          v-model="application.draft.statistical.marital_status"
          :label="$t('eligibility.marital.title')"
          :options="['Married', 'Single', 'Divorced', 'Widowed']"
          :errors="errors"
          :valid="valid" />
        <!-- </ValidationProvider>
 -->
        <!--  <ValidationProvider name="Citizenship" rules="required" tag="span" v-slot="{ errors, valid }"> -->
        <Select
          class="mb-5"
          name="Citizenship"
          v-model="application.draft.statistical.citizenship"
          :label="$t('eligibility.citizenship.title')"
          :options="['Not recorded', 'Canadian citizen', 'Perminent resident', 'Protected person', 'Non citizen']"
          :errors="errors"
          :valid="valid" />

        <!--   <ValidationProvider name="Aboriginal Status" rules="required" tag="span" v-slot="{ errors, valid }"> -->
        <Select
          v-model="application.draft.statistical.aboriginal_status"
          label="Aboriginal Status"
          :options="[
            'Not recorded',
            'Non aboriginal',
            'Yukon first nation status',
            'Yukon first nation non-status',
            'Metis',
            'Inuit',
            'Other first nation status',
            'Other first nation non-status',
          ]"
          :errors="errors"
          :valid="valid" />
        <!-- </ValidationProvider> -->
      </v-form>
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import Select from "@/components/forms/Select.vue";
import Buttons from "@/components/forms/Buttons.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "@/modules/draft/store";

export default {
  components: {
    Select,
    Buttons,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  mounted() {},
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),

    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Statistical Information"));
      });
    },
  },
};
</script>
