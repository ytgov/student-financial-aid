<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.index.legends.personal_details") }}</h3>
      <v-divider class="my-3" />
      <section>
        <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <!--  <ValidationProvider name="First Name" rules="required|max:10" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                v-model="application.draft.personal_details.first_name"
                :label="$t('student.first_name')"
                append-inner-icon="mdi-lock"
                readonly />
              <!-- </ValidationProvider> -->
            </v-col>
            <v-col cols="12" md="4">
              <!-- <ValidationProvider name="Middle Name" rules="notrequired" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                v-model="application.draft.personal_details.middle_name"
                label="Middle name (optional)"
                append-inner-icon="mdi-lock"
                readonly />
              <!-- </ValidationProvider> -->
            </v-col>
            <v-col cols="12" md="4">
              <!--  <ValidationProvider name="Last Name" rules="required|max:10" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                v-model="application.draft.personal_details.last_name"
                :label="$t('student.last_name')"
                append-inner-icon="mdi-lock"
                readonly />
              <!--  </ValidationProvider> -->
            </v-col>

            <v-col cols="12" md="6">
              <!-- <ValidationProvider name="Social Insurance Number" rules="sin" tag="span" v-slot="{ errors, valid }"> -->
              <SinNumber
                label="Social Insurance Number"
                v-model="application.draft.personal_details.sin"
                append-inner-icon="mdi-lock"
                readonly />
              <!--  </ValidationProvider> -->
            </v-col>
            <v-col cols="12" md="6">
              <!-- <ValidationProvider name="Date of Birth" rules="date" tag="span" v-slot="{ errors, valid }"> -->
              <TextField
                label="Date of birth"
                :value="formatDate(application.draft.personal_details.birth_date)"
                append-inner-icon="mdi-lock"
                readonly />
              <!-- </ValidationProvider> -->
            </v-col>

            <v-col cols="12">
              To change any of the information above, you must request a change on
              <router-link to="/student">Student Home</router-link>
            </v-col>

            <v-divider></v-divider>

            <v-col cols="12" md="6">
              <!-- <ValidationProvider name="Home Email" rules="required|email" tag="span" v-slot="{ errors, valid }"> -->
              <TextField v-model="application.draft.personal_details.home_email" label="Email" />
              <!--  </ValidationProvider> -->
            </v-col>

            <v-col cols="12" md="6">
              <!--  <ValidationProvider name="Home Phone" rules="required|phone" tag="span" v-slot="{ errors, valid }"> -->
              <TextField v-model="application.draft.personal_details.home_phone" label="Phone number" />
              <!-- </ValidationProvider> -->
            </v-col>

            <v-col cols="12" md="12">
              <p class="mb-3">
                At the start of classes, which of the following options best describes you: <br />(From the top, choose
                the first selection that matches your situation)
              </p>
              <v-radio-group v-model="application.draft.personal_details.category" hide-details>
                <v-radio v-for="cat of studentCategories" :label="cat.description" :value="cat.id"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-form>
        <!--  </ValidationObserver> -->
      </section>
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
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import Select from "@/components/forms/Select.vue";

import { mapActions, mapState, mapWritableState } from "pinia";
import { useDraftStore } from "../store";
import { useReferenceStore } from "@/store/ReferenceStore";
import moment from "moment";

export default {
  components: {
    TextField,
    DateSelector,
    SinNumber,
    Select,
  },
  data: () => ({}),
  computed: {
    ...mapWritableState(useDraftStore, ["application"]),
    ...mapState(useReferenceStore, ["studentCategories"]),
  },
  mounted() {},
  methods: {
    ...mapActions(useDraftStore, ["getPrevious", "getNext", "save"]),

    async backClick() {
      this.save().then(() => {
        this.$router.push(this.getPrevious("Student Details"));
      });
    },
    async saveClick() {
      this.save().then(() => {});
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.getNext("Student Details"));
      });
    },
    formatDate(input) {
      if (input) return moment.utc(input).format("YYYY-MM-DD");
      return "";
    },
  },
};
</script>
