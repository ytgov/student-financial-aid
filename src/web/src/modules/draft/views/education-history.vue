<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.education_history.legends.consent") }}</h3>
      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <!-- <ValidationProvider name="Highest Education Level" rules="required" tag="span" v-slot="{ errors, valid }"> -->
        <Select v-model="this.application.draft.education.highest_education_level" label="Highest education level" />
        <!-- </ValidationProvider> -->

        <label class="v-label my-4 d-block">What high schools did you attended:</label>

        <div v-if="application.draft.education.education_history.length == 0">
          <v-alert type="warning">You have no high schools defined - you probably should have at least one.</v-alert>
        </div>

        <v-row v-for="(item, key) in application.draft.education.education_history">
          <v-col cols="12" md="8">
            <TextField v-model="item.school" label="School" maxlength="4" width="50" />
          </v-col>

          <v-col cols="12" md="4">
            <TextField v-model="item.left_high_school" label="Date left" />
          </v-col>
          <v-col cols="12" md="4">
            <TextField v-model="item.city" label="City" />
          </v-col>
          <v-col cols="12" md="4">
            <Select v-model="item.country" label="Country" />
          </v-col>
          <v-col cols="12" md="4">
            <v-btn icon="mdi-delete" size="small" color="warning" @click="remove(key)" class="float-right"></v-btn>
            <TextField v-model="item.last_grade_completed" label="Last grade completed" style="margin-right: 55px" />
          </v-col>
          <v-divider></v-divider>
        </v-row>

        <v-btn class="mt-6" color="info" @click="add()">Add another school</v-btn>
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
    Select,
    DateSelector,
  },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.education.education_history = this.application.draft.education.education_history || [
      {
        school: "",
        city: "",
        province: "Yukon",
        country: "Canada",
      },
    ];

    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    },
  },
  methods: {
    ...mapActions(useDraftStore, ["resume", "save"]),
    add() {
      this.application.draft.education.education_history.push({
        school: "",
        city: "",
        province: "Yukon",
        country: "Canada",
      });
    },
    remove(key) {
      this.application.draft.education.education_history.splice(key, 1);
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Education History"));
      });
    },
  },
};
</script>
