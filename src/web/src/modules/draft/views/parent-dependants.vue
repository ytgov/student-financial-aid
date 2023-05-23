<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.parent_dependants.legends.dependants") }}</h3>
      <p>
        Enter your parent dependants inforamtion. A dependent child is defined as a child (including an adopted child,
        step-child or foster child) who is 17 years or younger and is wholly dependent on you or your spouse for
        support, and over whom you or your spouse has, in law or in fact, custody and control; or, a child who is in
        full-time attendance at a post-secondary institution and meets the definition of a Dependent Student found at
        <a href="https://www.education.gov.yk.ca/continued/student_loans.html" target="_blank"
          >https://www.education.gov.yk.ca/continued/student_loans.html</a
        >.
      </p>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form>
        <v-radio-group v-model="application.draft.parent_dependants.has_dependants">
          <v-radio label="My parents have no dependants" :value="false"></v-radio>
          <v-radio label="My parents have the following dependants:" :value="true"></v-radio>
        </v-radio-group>

        <div v-if="application.draft.parent_dependants.has_dependants">
          <v-row v-for="(item, key) in this.application.draft.parent_dependants.dependants">
            <v-col cols="12" md="3">
              <TextField type="text" v-model="item.first_name" label="First name" />
            </v-col>
            <v-col cols="12" md="3">
              <TextField v-model="item.last_name" label="Last name" />
            </v-col>
            <v-col cols="12" md="3">
              <DateSelector v-model="item.dob" label="Date of birth" />
            </v-col>
            <v-col cols="12" md="3">
              <TextField v-model="item.relationship" label="Relationship" />
            </v-col>
            <v-col>
              <v-btn icon="mdi-delete" size="small" color="warning" @click="remove(key)" class="float-right"></v-btn>
              <v-textarea
                v-model="item.comments"
                label="Comments"
                rows="2"
                variant="outlined"
                bg-color="white"
                density="comfortable"
                style="margin-right: 55px" />
            </v-col>
            <v-divider />
          </v-row>

          <v-btn class="mt-6" color="info" @click="add()">Add dependant</v-btn>
        </div>
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
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";

export default {
  components: { TextField, DateSelector },
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.application.draft.parent_dependants.dependants = this.application.draft.parent_dependants.dependants || [
      {
        first_name: "",
        last_name: "",
        dob: "",
        age: "",
        comments: "",
        custody_details: "",
        other: [],
      },
    ];
  },
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),
    add() {
      this.application.draft.parent_dependants.dependants.push({
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
        this.application.draft.parent_dependants.dependants.splice(key, 1); // 2nd parameter means remove one item only
      }
    },

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Parent Dependants"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Parent Dependants"));
      });
    },
  },
};
</script>
