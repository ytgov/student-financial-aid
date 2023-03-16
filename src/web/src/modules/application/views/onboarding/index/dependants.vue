<template>
  <section v-if="student">
   <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.dependants") }}</legend>

            <p>
              {{ $t("excerpt") }}
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
                  <td colspan="6" class="checkboxes">
                    <div>
                      <label
                        ><input type="checkbox" value="Resides with" v-model="dependants[key].other" /> Resides
                        with</label
                      >
                      <label
                        ><input type="checkbox" value="Shared Custody" v-model="dependants[key].other" /> Shared
                        Custody</label
                      >
                      <label
                        ><input type="checkbox" value="In post secondary" v-model="dependants[key].other" /> In post
                        secondary</label
                      >
                      <label v-if="false"
                        ><input type="checkbox" value="STA eligible" v-model="dependants[key].other" /> STA
                        eligible</label
                      >
                      <label v-if="false"
                        ><input type="checkbox" value="CSL eligible" v-model="dependants[key].other" /> CSL
                        eligible</label
                      >
                      <label v-if="false"
                        ><input type="checkbox" value="CSG eligible" v-model="dependants[key].other" /> CSG
                        eligable</label
                      >
                    </div>
                  </td>
                </tr>
                <tr v-if="dependants[key].other.includes('Shared Custody')">
                  <td colspan="4">
                    <textarea v-model="dependants[key].custody_details" placeholder="Shared custody details" />
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
   <!--  </ValidationObserver> -->

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
     // return this.localePath("/application/onboarding/csfa-accomodation");
      return "/application/onboarding/csfa-accomodation";
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
