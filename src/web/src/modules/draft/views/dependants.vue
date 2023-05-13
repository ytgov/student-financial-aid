<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.dependants.legends.dependants") }}</h3>
      <p>
        {{ $t("application.onboarding.dependants.excerpt") }}
      </p>
      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <v-row v-for="(item, key) in this.application.draft.student_dependants.dependants">
          <v-col cols="12" md="6">
            <TextField v-model="item.first_name" label="First name" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField v-model="item.last_name" label="Last name" />
          </v-col>
          <v-col cols="12" md="6">
            <DateSelector v-model="item.dob" label="Date of birth" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField TextField v-model="item.relationship" label="Relationship" />
          </v-col>
          <v-col cols="12" md="4" class="py-0">
            <v-checkbox
              label="Shared custody"
              v-model="item.other"
              value="Shared Custody"
              density="compact"
              hide-details></v-checkbox>
          </v-col>
          <v-col cols="12" md="4" class="py-0">
            <v-checkbox
              label="Resides with"
              v-model="item.other"
              value="Resides with"
              density="compact"
              hide-details></v-checkbox>
          </v-col>
          <v-col cols="12" md="4" class="py-0">
            <v-checkbox
              label="In post secondary"
              v-model="item.other"
              value="In post secondary"
              density="compact"
              hide-details></v-checkbox>
          </v-col>

          <v-col cols="12" md="6">
            <v-textarea
              v-if="item.other.includes('Shared Custody')"
              v-model="item.custody_details"
              label="Shared custody details"
              density="compact"
              bg-color="white"
              variant="outlined"
              rows="3"
              hide-details />
          </v-col>

          <v-col cols="12" md="6">
            <v-btn icon="mdi-delete" size="small" color="warning" @click="remove(key)" class="float-right"></v-btn>
            <v-textarea
              v-model="item.comments"
              label="Comments"
              density="compact"
              bg-color="white"
              hide-details
              variant="outlined"
              style="margin-right: 55px"
              rows="3" />
          </v-col>

          <v-divider></v-divider>
        </v-row>

        <v-btn class="mt-6" color="info" @click="add()">Add dependant</v-btn>
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
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: { TextField, DateSelector },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {
      dependants: [],
    };
  },
  mounted() {
    this.application.draft.student_dependants.dependants = this.application.draft.student_dependants.dependants || [];

    this.$emit("input", this.valid);
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    add() {
      this.application.draft.student_dependants.dependants.push({
        first_name: "",
        last_name: "",
        dob: "",
        age: "",
        comments: "",
        custody_details: "",
        other: [],
      });
    },
    remove(key) {
      if (key > -1) {
        this.application.draft.student_dependants.dependants.splice(key, 1); // 2nd parameter means remove one item only
      }
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Student Dependants"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Student Dependants"));
      });
    },
  },
};
</script>
