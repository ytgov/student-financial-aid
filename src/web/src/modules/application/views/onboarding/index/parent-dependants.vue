<template>
  <section v-if="student">
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.dependants") }}</legend>

            <p>
              Enter your parent dependants inforamtion. A dependent child is defined as a child (including an adopted
              child, step-child or foster child) who is 17 years or younger and is wholly dependent on you or your
              spouse for support, and over whom you or your spouse has, in law or in fact, custody and control; or, a
              child who is in full-time attendance at a post-secondary institution and meets the definition of a
              Dependent Student found at
              <a href="https://www.education.gov.yk.ca/continued/student_loans.html" target="_blank"
                >https://www.education.gov.yk.ca/continued/student_loans.html</a
              >.
            </p>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
              <tbody v-for="(item, key) in dependants">
                <tr>
                  <td>First Name</td>
                  <td>
                    <input type="text" v-model="dependants[key].first_name" placeholder="" />
                  </td>
                  <td>Last Name</td>
                  <td>
                    <input type="text" v-model="dependants[key].last_name" placeholder="" />
                  </td>
                </tr>
                <tr>
                  <td>Date of birth</td>
                  <td>
                    <input type="text" v-model="dependants[key].dob" placeholder="" />
                  </td>
                  <td>Relationship</td>
                  <td>
                    <input type="text" v-model="dependants[key].age" placeholder="" />
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <textarea v-model="dependants[key].comments" placeholder="Comments" />
                  </td>
                </tr>
                <tr v-if="key > 0">
                  <td colspan="3"><a @click="remove(key)">Remove dependant</a></td>
                </tr>
              </tbody>
            </table>

            <p class="buttons">
              <v-btn class="blue small" @click="add()">Add dependant</v-btn>
            </p>
          </fieldset>
        </fieldset>

        <v-banner
          outlined
          icon="mdi-alert-circle"
          class="problem mt-4 error"
          v-if="invalid && errors.length"
          style="padding-right: 1rem"
        >
          <h3>{{ $t("problem.title") }}</h3>
          <br />
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
    <!-- </ValidationObserver> -->

    <Buttons :valid="valid" :next="next" back="true" />
  </section>
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
    Question
  },
  computed: {
    student: {
      get() {
        //return this.$store.getters["student/GET"];
        return {}
      },
      set(values) {
        this.$store.commit("student/SET")(values);
      }
    },
    valid() {
      var is_valid = true;
      return is_valid;
    },
    next() {
      //return this.localePath("/application/onboarding/spouse");
      return "/application/onboarding/spouse";
    }
  },
  data() {
    return {
      dependants: [],
      purposes: []
    };
  },
  mounted() {
    this.dependants = this.student.DEPENDANTS || [
      {
        first_name: "",
        last_name: "",
        dob: "",
        age: "",
        comments: "",
        custody_details: "",
        other: []
      }
    ];

    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  },
  methods: {
    add() {
      this.dependants.push({
        first_name: "",
        last_name: "",
        dob: "",
        age: "",
        comments: "",
        custody_details: "",
        other: []
      });
    },
    remove(key) {
      if (key > -1) {
        this.dependants.splice(key, 1); // 2nd parameter means remove one item only
      }
    }
  }
};
</script>
