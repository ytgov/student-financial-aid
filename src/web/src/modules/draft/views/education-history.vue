<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.education_history.legends.consent") }}</h3>
      <v-divider class="my-3" />

      <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <p>Add your highest education level:</p>
        <!-- <ValidationProvider name="Highest Education Level" rules="required" tag="span" v-slot="{ errors, valid }"> -->
        <TextField v-model="this.application.draft.education.highest_education_level" label="Highest Education Level" />
        <!-- </ValidationProvider> -->

        <p>Add your attended high schools:</p>

        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody v-for="(item, key) in this.application.draft.education.education_history">
            <tr>
              <td>High School Attended</td>
              <td>
                <input type="text" v-model="item.school" maxlength="4" width="50" />
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <input type="text" v-model="item.city" placeholder="City" />
              </td>
            </tr>
            <tr>
              <td>Province</td>
              <td>
                <input type="text" v-model="item.province" placeholder="Province" />
              </td>
            </tr>
            <tr>
              <td>Country</td>
              <td>
                <select v-model="item.country" placeholder="Country">
                  <option>Canada</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Left High School</td>
              <td><input type="text" v-model="item.left_high_school" /></td>
            </tr>
            <tr>
              <td>Last Grade Completed</td>
              <td>
                <input type="text" v-model="item.last_grade_completed" />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><a @click="remove(key)">Remove School</a></td>
            </tr>
          </tbody>
        </table>

        <v-btn color="info" @click="add()">Add another school</v-btn>
      </v-form>
      <!-- </ValidationObserver> -->
    </v-card-text>
  </v-card>

  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import AddressSelector from "@/components/forms/AddressSelector.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import RadioField from "@/components/forms/RadioField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import SelectField from "@/components/forms/SelectField.vue";
import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {
    BlackoutNotice,
    TextField,
    RadioField,
    SelectField,
    DateSelector,
    AddressSelector,
    SinNumber,
    Buttons,
    Question,
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
      if (key > -1) {
        this.application.draft.education.education_history.splice(key, 1); // 2nd parameter means remove one item only
      }
    },
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Education History"));
      });
    },
  },
};
</script>
