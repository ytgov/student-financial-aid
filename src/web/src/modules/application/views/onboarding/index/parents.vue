<template>
  <section>
   <!--  <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.address") }}</legend>
            <AddressSelector v-model="parents.MAILING_ADDRESS" :value="parents.MAILING_ADDRESS" />
          </fieldset>
          <fieldset>
            <legend class="text-h5">{{ $t("legends.information") }}</legend>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
              <tbody v-for="(item, key) in parents.INFORMATION">
                <tr>
                  <td colspan="4">
                    <h3>{{ parents.INFORMATION[key].heading }}</h3>
                  </td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td>
                    <input type="text" v-model="parents.INFORMATION[key].first_name" placeholder="" />
                  </td>
                  <td>Last Name</td>
                  <td>
                    <input type="text" v-model="parents.INFORMATION[key].last_name" placeholder="" />
                  </td>
                </tr>
                <tr>
                  <td>Relationship</td>
                  <td>
                    <input type="text" v-model="parents.INFORMATION[key].relationship" placeholder="" />
                  </td>
                  <td>SIN</td>
                  <td>
                    <input type="text" v-model="parents.INFORMATION[key].sin" placeholder="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </fieldset>

        <v-banner
          outlined
          icon="mdi-alert-circle"
          class="problem mt-4 error"
          v-if="invalid"
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
import DateSelector from "@/components/forms/DateSelector.vue";

import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";

export default {
  components: {
    BlackoutNotice,
    TextField,
    DateSelector,
    AddressSelector,
    SinNumber,
    Buttons,
    Question,
    RadioList
  },
  computed: {
    student: {
      get() {
        return this.$store.getters["student/GET"];
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
      return this.localePath("/application/onboarding/parent-dependants");
    }
  },
  data() {
    return {
      parents: {
        MAILING_ADDRESS: "",
        INFORMATION: [
          {
            header: "Parent 1",
            values: {
              first_name: "",
              last_name: "",
              relationship: "",
              sin: ""
            }
          },
          {
            header: "Parent 2",
            values: {
              first_name: "",
              last_name: "",
              relationship: "",
              sin: ""
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  }
};
</script>
