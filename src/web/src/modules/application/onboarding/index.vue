<template>
  <v-container fluid>
    <header>
      <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
    </header>
    <section>
      <aside>
        <nuxt-link :to="item.uri" v-for="item, index in menu" v-if="index<=currentIndex">
          {{item.name}}
        </nuxt-link>
        <span v-else>{{item.name}}</span>
      </aside>
      <nuxt-child  :keep-alive-props="{ exclude: ['modal'] }" />
    </section>
  </v-container>
</template>


<script>
export default {
  scrollToTop: true,
  computed: {
    currentIndex() {
      return _.findIndex(this.menu, (o)=>{
        return o.uri == this.$route.path
      })
    }
  },
  data() {
    return {
      menu: [
        {
          name: 'Personal Details',
          uri: this.localePath('/application/onboarding')
        },
        {
          name: 'Addresses',
          uri: this.localePath('/application/onboarding/addresses')
        },
        {
          name: 'Statistical Information',
          uri: this.localePath('/application/onboarding/statistical')
        },
        {
          name: 'Consent Release',
          uri: this.localePath('/application/onboarding/consent-release')
        },
        {
          name: 'Residency',
          uri: this.localePath('/application/onboarding/residency-history')
        },
        {
          name: 'Education History',
          uri: this.localePath('/application/onboarding/education-history')
        },
        {
          name: 'Other Funding',
          uri: this.localePath('/application/onboarding/other-funding')
        },
        {
          name: 'Student Dependents',
          uri: this.localePath('/application/onboarding/dependants')
        },
        /*
        {
          name: 'CSFA Study Period',
          uri: '/application/onboarding/csfa'
        },
        */        
        {
          name: 'CSFA Accomodation',
          uri: this.localePath('/application/onboarding/csfa-accomodation')
        },
        /*
        {
          name: 'CSFA Employment',
          uri: '/application/onboarding/csfa-employment'
        },
        */

        {
          name: 'CSFA Income',
          uri: this.localePath('/application/onboarding/csfa-income')
        },
        {
          name: 'CSFA Expenses',
          uri: this.localePath('/application/onboarding/csfa-expenses')
        },
        {
          name: 'Parents',
          uri: this.localePath('/application/onboarding/parents')
        },
         {
          name: 'Parent Dependants',
          uri: this.localePath('/application/onboarding/parent-dependants')
        },
        {
          name: 'Spouse',
          uri: this.localePath('/application/onboarding/spouse')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
div.container {
  > section {
    display: grid;
    grid-template-columns: 3fr 9fr;
    grid-gap: 2rem;

    > aside {
      > a, > span {
        display: block;
        text-decoration: none;

        border-left: solid 2px #fff;
        padding-left: 1rem;

        margin: 1rem 0;

        &.nuxt-link-exact-active {
          font-weight: bold;

          border-left: solid 2px #1976d2;
          padding-left: 1rem;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    > section {
      grid-template-columns: 12fr;
      grid-gap: 0;
      > aside {
        display: none;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Your Application Information"
  },
  "fr": {
    "title": "Your Application Information"
  }
}
</i18n>