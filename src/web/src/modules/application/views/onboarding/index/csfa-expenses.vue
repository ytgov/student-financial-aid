<template>
  <section v-if="student">
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }">
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t("legends.expenses") }}</legend>

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
                <tr v-for="(item, key) in CSFA_EXPENSES.expenses">
                  <td>
                    <select v-model="CSFA_EXPENSES.expenses[key].type">
                      <option value="">--Select--</option>
                      <option v-for="type in types">{{ type.value }}</option>
                    </select>
                    <p v-if="note(CSFA_EXPENSES.expenses[key].type)">
                      <small>{{ note(CSFA_EXPENSES.expenses[key].type) }}</small>
                    </p>
                    <input type="text" v-model="CSFA_EXPENSES.expenses[key].type" v-if="false" />
                  </td>
                  <td>
                    <input type="text" v-model="CSFA_EXPENSES.expenses[key].amount" placeholder="0.00" />
                  </td>
                  <td>
                    <input type="text" v-model="CSFA_EXPENSES.expenses[key].comments" placeholder="Comments" />
                  </td>
                  <td>
                    <a @click="remove(key)"> Remove </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="buttons">
              <v-btn class="blue small" @click="add()">Add expense</v-btn>
            </p>
          </fieldset>
        </fieldset>
      </v-form>
    </ValidationObserver>

    <Buttons :valid="valid" :next="next" back="true" />
  </section>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { ValidationProvider, ValidationObserver } from "vee-validate";
import AddressSelector from "@/components/forms/AddressSelector.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import CurrencyField from "@/components/forms/CurrencyField.vue";
import RadioField from "@/components/forms/RadioField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";
import SelectField from "@/components/forms/SelectField.vue";
import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BlackoutNotice,
    TextField,
    CurrencyField,
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
      return this.localePath("/application/onboarding/parents");
    },
    note() {
      return type => {
        var item = _.find(this.types, o => {
          return o.value == type;
        });

        return item ? item.note : false;
      };
    }
  },
  data() {
    return {
      CSFA_EXPENSES: {
        expenses: []
      },
      types: [
        {
          value: "Tuition and compulsory fees",
          note: "(include even if someone else is paying on your behalf). Do not include residence fees"
        },
        {
          value: "Books and supplies",
          note: "(e.g. books, pencils, pens, photocopy services, etc.) "
        },
        {
          value: "Computer costs",
          note: "(hardware, softwear, and supplies) "
        },
        {
          value: "Child support payments",
          note: "(you may be required to provide supporting documentation) x (per month) "
        },
        {
          value: "Alimony support payments",
          note: "(you may be required to provide supporting documentation) x (per month) "
        },
        {
          value: "Daycare costs",
          note: "(enter the full cost before any subsidy amount you are eligible for) x (per month)"
        },
        {
          value: "Care costs for dependant(s) ",
          note: "with disabilities or other dependent children aged below 12 years. Provide supporting documentation from a doctor confirming the need for care"
        },
        {
          value: "Part-time tuition fees, books and supplies",
          note: " (actual amount) "
        },
        {
          value: "Medical/dental/optical",
          note: "(out of pocket costs greater then covered under any insurance plan). Specify your medical/dental/optical costs: x (per month) "
        },
        {
          value: "Canada Student Loan payments",
          note: "Spouse only. (full-time or part-time): x (per month) "
        },
        {
          value: "Other expenses",
          note: ""
        }
      ]
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
  },
  methods: {
    add() {
      this.CSFA_EXPENSES.expenses.push({
        type: "",
        amount: "",
        comments: ""
      });
    },
    remove(key) {
      if (key > -1) {
        this.CSFA_EXPENSES.expenses.splice(key, 1); // 2nd parameter means remove one item only
      }
    }
  }
};
</script>
