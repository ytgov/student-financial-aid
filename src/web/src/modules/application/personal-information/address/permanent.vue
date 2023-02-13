<template>
  <article data-layout="application">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
    <p>
      {{ $t('excerpt') }}
    </p>

    <section>
      <h4>{{ $t('legend.address') }}</h4>
      <AddressSelector v-model="student.HOME_ADDRESS1" :value="student.HOME_ADDRESS1" />
    </section>

    <Buttons :valid="valid" :next="next" :back="true" />
  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';
import AddressSelector from "~/components/forms/AddressSelector.vue";


export default {
  components: {
    Buttons,
    Question,
    RadioList,
    AddressSelector
  },
  computed: {
    student: {
      get() {
        return this.$store.getters['student/GET']
      },
      set(values) {
        return this.$store.commit('student/SET', values)
      }
    },
    valid() {
      var is_valid = this.student.HOME_ADDRESS1!=''

      return is_valid
    },
    next() {
      return  this.localePath('/application/personal-information/address/while-at-school')
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('student/SET', this.student)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Permanent address",
    "excerpt": "Please provide the address where you normally receive your mail.  This address will be used to send out T4A slips for tax purposes.",
    "legend": {
      "address": "Address"
    }
  },
  "fr": {
    "title": "Adresse permanente",
    "excerpt": "Veuillez fournir l’adresse où vous recevez normalement votre courrier postal. Cette adresse sera celle où l’on enverra vos feuillets T4A aux fins de l’impôt.",
    "legend": {
      "address": "Adresse"
    }
  }
}
</i18n>

<style lang="scss" scoped>
.balance {
  display: flex;
  width: 100%;
  background: #efefef;

  border: solid 1px #ccc;
  margin: 1rem 0;
  margin-bottom: 3rem;

  > div {
    padding: 1rem;
     font-size: 1.1em;
  
  }
}

.update {
  text-transform: uppercase;
  color: #fff;
  background:#244C5A;
  text-decoration: none;
  padding: 0.25rem  1rem;
  font-size: 1rem;
}
</style>
