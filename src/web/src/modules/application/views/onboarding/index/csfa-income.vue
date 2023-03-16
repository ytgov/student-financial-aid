<template>
  <section v-if="student">
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid, errors }"> -->
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.income") }}</legend>

            <p>
              {{ $t("excerpt") }}
            </p>

            <table class="standard" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Comments</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in income">
                  <td>
                    <input type="text" v-model="income[key].type" placeholder="Type" />
                  </td>
                  <td>
                    <input type="text" v-model="income[key].amount" placeholder="0.00" />
                  </td>
                  <td>
                    <input type="text" v-model="income[key].comments" placeholder="Comments" />
                  </td>
                  <td>
                    <a @click="remove(key)"> Remove </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="buttons">
              <v-btn class="blue small" @click="add()">Add income</v-btn>
            </p>
          </fieldset>
        </fieldset>
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
      //return this.localePath("/application/onboarding/csfa-expenses");
      return "/application/onboarding/csfa-expenses";
    }
  },
  data() {
    return {
      income: []
    };
  },
  mounted() {
    this.income = this.student.CSFA_INCOME || [];

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
      this.income.push({
        type: "",
        amount: "",
        comments: ""
      });
    },
    remove(key) {
      if (key > -1) {
        this.income.splice(key, 1); // 2nd parameter means remove one item only
      }
    }
  }
};
</script>
