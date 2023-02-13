<template>
  <section v-if="student">
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t('legends.consent') }}</legend>

            <p>
              {{ $t('excerpt') }}
            </p>

            
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
      
              <tbody v-for="item, key in other_funding">
                <tr>
                  <td>Agency Name</td>
                  <td>
                    <input type="text" v-model="other_funding[key].agency" placeholder="" />
                  </td>
                  <td>Amount</td>
                  <td>
                    <input type="text" v-model="other_funding[key].amount" placeholder="0.00" />
                  </td>
               
                  
                </tr>
                <tr>
                  <td colspan="6" class="checkboxes">
                    <label><input type="checkbox" value="Tuition" v-model="other_funding[key].purposes"/> Tuition</label>
                    <label><input type="checkbox" value="Books" v-model="other_funding[key].purposes"/> Books</label>
                    <label><input type="checkbox" value="Living Expenses" v-model="other_funding[key].purposes"/> Living&nbsp;Expenses</label>
                    <label><input type="checkbox" value="Transportation" v-model="other_funding[key].purposes"/> Transportation</label>
                    <label><input type="checkbox" value="Other" v-model="other_funding[key].purposes"/> Other</label>
                  </td>
                </tr>
                <tr v-if="other_funding[key].purposes.includes('Other')">
                  <td>
                    Other
                  </td>
                  <td colspan="2">
                    <input type="text" v-model="other_funding[key].other" placeholder="Describe other purposes" />

                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <textarea  v-model="other_funding[key].comments" placeholder="Comments" />
                  </td>
                </tr>
                <tr>
                  <td colspan="3"><a @click="remove(key)">Remove funding source</a></td>
                </tr>
              </tbody>
            </table>

            <p class="buttons">
              <v-btn class="blue small" @click="add()">Add funding</v-btn>
            </p> 

          </fieldset>
        </fieldset>

        <v-banner outlined icon="mdi-alert-circle" class="problem mt-4 error" v-if="invalid && errors.length" style="padding-right: 1rem;">
          <h3>{{ $t('problem.title') }}</h3>
          <br />
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
    </ValidationObserver>

    <Buttons :valid="valid" :next="next" back="true" />
  </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import AddressSelector from "~/components/forms/AddressSelector.vue";
import SinNumber from "~/components/forms/SinNumber.vue";
import TextField from "~/components/forms/TextField.vue";
import RadioField from "~/components/forms/RadioField.vue";
import DateSelector from '~/components/forms/DateSelector.vue';
import SelectField from '~/components/forms/SelectField.vue';
import BlackoutNotice from "~/components/utils/BlackoutNotice.vue";

import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
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
        return this.$store.getters['student/GET']
      },
      set(values) {
        this.$store.commit('student/SET')(values)
      }
    },
    valid() {
      var is_valid = true
      return is_valid
    },
    next() {
      return this.localePath('/application/onboarding/dependants')
    }
  },
  data() {
    return {
      other_funding: [],
      purposes: []
    }
  },
  mounted() {
    this.other_funding = this.student.OTHER_FUNDING||[]
    
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit('input', this.valid)
    }
  },
  methods: {
    add() {
      this.other_funding.push({
        agency: '',
        amount: '',
        purposes: [],
        other: ''
      })
    },
    remove(key) {
      if (key > -1) {
        this.other_funding.splice(key, 1); // 2nd parameter means remove one item only
      }
    }
  }
}
</script>


<i18n>
{
  "en": {
    "legends": {
      "consent": "Other funding" 
    },
    "excerpt": "Please indicate if you will be receiving funding from another funding source (ie: scholarship, Employment Insurance, etc.)",
    "help": {
      "title": "Need help?",
      "details": "Help text can go in here to make the form more"
    },
    "problem": {
      "title": "There is a problem"
    }  
  },
  "fr": {
    "legends": {
      "consent": "Autres financements" 
    },
    "excerpt": "Please indicate if you will be receiving funding from another funding source (ie: scholarship, Employment Insurance, etc.)",
    "help": {
      "title": "Need help?",
      "details": "Le texte d'aide peut aller ici pour rendre le formulaire plus"
    },
    "problem": {
      "title": "Il ya un problème"
    }
  }
}
</i18n>
