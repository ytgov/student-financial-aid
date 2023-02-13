<template>
  <section v-if="student">
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t('legends.csfa-accomodation') }}</legend>

            <p>
              {{ $t('excerpt') }}
            </p>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
  
              <tbody v-for="item, key in accomodations">
                <tr>
                  <td colspan="4">
                    <h3>{{accomodations[key].heading}}</h3>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    {{accomodations[key].note}}
                  </td>
                </tr>
                <tr>
                  <td colspan="6" class="checkboxes">
                    <div>
                      <label><input type="radio" value="Living at Parents" v-model="accomodations[key].values.living"/> Living at Parents</label>
                      <label><input type="radio" value="Living on Own" v-model="accomodations[key].values.living"/> Living on Own</label>
                      <label><input type="radio" value="Both" v-model="accomodations[key].values.living"/> Both</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>
                    <input type="text" placeholder="" />
                  </td>
                  <td>Province</td>
                  <td>
                    <input type="text"  placeholder="" />
                  </td>
                </tr>
                <tr class="checkbox" v-if="['Living at Parents', 'Both'].includes(accomodations[key].values.living)">
                  <td colspan="3">Amount of Rent paid to parents</td>
                  <td>
                    <input type="text" v-model="accomodations[key].values.rent_to_parents" placeholder="0.00" />
                  </td>
                </tr>
                <tr class="checkbox" v-if="['Living on Own', 'Both'].includes(accomodations[key].values.living)">
                  <td colspan="3">I own my own home</td>
                  <td>
                    <input type="checkbox" v-model="accomodations[key].values.own_home" value="true" />
                  </td>
                </tr>
                <tr class="checkbox">
                  <td colspan="3">Bus Service Available?</td>
                  <td>
                    <input type="checkbox" v-model="accomodations[key].values.bus_service" value="true" />
                  </td>
                </tr>
                <tr class="checkbox" v-if="!accomodations[key].values.bus_service">
                  <td colspan="3">Distance form school/work (km)</td>
                  <td>
                    <input type="text" v-model="accomodations[key].values.rent_to_parents" placeholder="0" /> 
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </fieldset>
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
      return this.localePath('/application/onboarding/csfa-income')
    }
  },
  data() {
    return {
      accomodations: [],
      purposes: []
    }
  },
  mounted() {
    this.accomodations = this.student.ACCOMODATIONS||[
      {
        heading: 'Pre-study Accomodation',
        note: 'Your pre-study accommodations is the 4-month period just before your classes start in this academic year. ',
        values: {
          living: '',
          comments: ''
        }
      },
      {
        heading: 'Study Accomodation',
        note: 'Your study accommodations includes all months from your start to end date of classes for this application period.',
        values: {
          living: '',
          comments: ''
        }
      }

    ]
    
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit('input', this.valid)
    }
  }
}
</script>




<i18n>
{
  "en": {
    "legends": {
      "csfa-accomodation": "Accommodation" 
    },
    "excerpt": "Please indicate where you were living during your pre-study and study periods:",
    "buttons": {
      "save": "Save statistical information"
    }
  },
  "fr": {
    "legends": {
      "csfa-accomodation": "Accommodation" 
    },
    "excerpt": "Please indicate where you were living during your pre-study and study periods:",
    "buttons": {
      "save": "Enregistrer les informations statistiques"
    }
  }
}
</i18n>
