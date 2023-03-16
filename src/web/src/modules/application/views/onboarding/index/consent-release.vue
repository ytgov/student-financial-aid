<template>
  <section v-if="student">
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.consent") }}</legend>

            <p>
              {{ $t("excerpt") }}
            </p>

            <table class="standard" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th width="50%">Consent person</th>
                  <th>Academic<br />year start</th>
                  <th>Academic<br />year end</th>
                  <th class="center">SFA</th>
                  <th class="center">CSL</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in consents">
                  <td>
                    <input type="text" v-model="consents[key].person" placeholder="Enter Name" />
                  </td>
                  <td class="center">
                    <input type="text" v-model="consents[key].start_year" maxlength="4" />
                  </td>
                  <td class="center">
                    <input type="text" v-model="consents[key].end_year" maxlength="4" />
                  </td>
                  <td class="center">
                    <input type="checkbox" v-model="consents[key].sfac" value="true" />
                  </td>
                  <td class="center">
                    <input type="checkbox" v-model="consents[key].csl" value="true" />
                  </td>
                  <td>
                    <a @click="remove(key)">Remove</a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="buttons">
              <v-btn class="blue small" @click="addconsent()">Add Consent</v-btn>
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
      //return this.localePath("/application/onboarding/residency-history");
      return "/application/onboarding/residency-history";
    }
  },
  data() {
    return {
      consents: []
    };
  },
  mounted() {
    this.consents = this.student.CONSENTS || [];
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  },
  methods: {
    addconsent() {
      this.consents.push({
        person: "",
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear()
      });
    },
    remove(key) {
      if (key > -1) {
        this.consents.splice(key, 1); // 2nd parameter means remove one item only
      }
    }
  }
};
</script>
