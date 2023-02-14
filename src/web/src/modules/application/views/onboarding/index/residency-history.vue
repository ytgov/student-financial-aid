<template>
  <section v-if="student">
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t('legends.consent') }}</legend>

            <p>
              Student consent to release information to another person:
              Please provide a complete breakdown of where you were physically living for the 2 years immediately prior to starting classes. 
            </p>
            <p>
              <ul>
                <li>Separate the two years into periods of time when you were in high school or post-secondary including summer breaks as full-time, part-time or not in school at all. </li>
                <li>Include all absence and returns to Yukon.</li>
                <li>There should not be any gab in this two-year period.</li>
              </ul>
            </p>

            
            <table class="standard" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>City</th>
                  <th>Province</th>
                  <th>Country</th>
                  <th>In&nbsp;School?</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item, key in residency_history">
                  <td >
                    <input type="text" v-model="residency_history[key].start" maxlength="4" width="50" />
                  </td>
                  <td class="center">
                    <input type="text" v-model="residency_history[key].end" maxlength="2"  width="25" />
                  </td>
                  <td>
                    <input type="text" v-model="residency_history[key].city" placeholder="City" />
                  </td>
                  <td>
                    <input type="text" v-model="residency_history[key].province" placeholder="Province" />
                  </td>
                  <td>
                    <select v-model="residency_history[key].country" placeholder="Country">
                      <option>Canada</option>
                    </select>
                  </td>  
                  <td>
                    <select v-model="residency_history[key].in_school">
                      <option>Not in school</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                    </select>
                  </td>
                  <td>
                    <a @click="remove(key)">Remove</a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="buttons">
              <v-btn class="blue small" @click="add()">Add residence</v-btn>
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
import AddressSelector from "@/components/forms/AddressSelector.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import TextField from "@/components/forms/TextField.vue";
import RadioField from "@/components/forms/RadioField.vue";
import DateSelector from '@/components/forms/DateSelector.vue';
import SelectField from '@/components/forms/SelectField.vue';
import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

import Buttons from '@/components/forms/Buttons.vue';
import Question from '@/components/forms/Question.vue';

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
      return this.localePath('/application/onboarding/education-history')
    }
  },
  data() {
    return {
      residency_history: []
    }
  },
  mounted() {
    this.residency_history = this.student.RESIDENCY_HISTORY||[]

    Object.keys(this.residency_history).forEach(key=>{
      this.residency_history[key].start = this.$options.filters.formatDate(this.residency_history[key].start)
      this.residency_history[key].end = this.$options.filters.formatDate(this.residency_history[key].end)
    })
    
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
      this.residency_history.push({
        start:  this.$options.filters.formatDate(new Date()),
        end:  this.$options.filters.formatDate(new Date()),
        city: '',
        province: 'Yukon',
        country: 'Canada',
        in_school: 'Not in school'
      })
    },
    remove(key) {
      if (key > -1) {
        this.residency_history.splice(key, 1); // 2nd parameter means remove one item only
      }
    }
  }
