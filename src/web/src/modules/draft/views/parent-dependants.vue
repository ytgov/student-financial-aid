<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text>
      <h3 class="text-h3 mb-6">{{ $t("application.onboarding.parent_dependants.legends.dependants") }}</h3>
      <v-divider class="my-3" />

      <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <p>
          Enter your parent dependants inforamtion. A dependent child is defined as a child (including an adopted child,
          step-child or foster child) who is 17 years or younger and is wholly dependent on you or your spouse for
          support, and over whom you or your spouse has, in law or in fact, custody and control; or, a child who is in
          full-time attendance at a post-secondary institution and meets the definition of a Dependent Student found at
          <a href="https://www.education.gov.yk.ca/continued/student_loans.html" target="_blank"
            >https://www.education.gov.yk.ca/continued/student_loans.html</a
          >.
        </p>
        <table class="form" cellpadding="0" cellspacing="0" width="100%">
          <tbody v-for="(item, key) in this.application.draft.parent_dependants.dependants">
            <tr>
              <td>First Name</td>
              <td>
                <input type="text" v-model="item.first_name" placeholder="" />
              </td>
              <td>Last Name</td>
              <td>
                <input type="text" v-model="item.last_name" placeholder="" />
              </td>
            </tr>
            <tr>
              <td>Date of birth</td>
              <td>
                <input type="text" v-model="item.dob" placeholder="" />
              </td>
              <td>Relationship</td>
              <td>
                <input type="text" v-model="item.age" placeholder="" />
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <textarea v-model="item.comments" placeholder="Comments" />
              </td>
            </tr>
            <tr v-if="key > 0">
              <td colspan="3"><a @click="remove(key)">Remove dependant</a></td>
            </tr>
          </tbody>
        </table>

          <v-btn color="info" @click="add()">Add dependant</v-btn>
     
      </v-form>
      <!-- </ValidationObserver> -->
    </v-card-text>
  </v-card>
  <div class="text-right mt-5">
    <v-btn color="primary" @click="nextClick">Next</v-btn>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useDraftStore } from "../store";

export default {
  components: {},
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
    ...mapActions(useDraftStore, ["resume", "save"]),
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
    async nextClick() {
      this.save().then(() => {
        this.$router.push(this.resume("Parent Dependants"));
      });
    },
  },
};
</script>
