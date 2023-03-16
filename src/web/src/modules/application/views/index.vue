<template>
  <v-container fluid>
    <article data-section="application-process" v-if="false">
      <nav>
        <div v-for="(section, index) in sections" :key="index">
          <nuxt-link :to="section.route">{{ section.name }}</nuxt-link>
        </div>
      </nav>
      <section>
        <div>
          <v-card class="mb-12" color="lighten-1">
            <nuxt-child :keep-alive-props="{ exclude: ['modal'] }" />
          </v-card>
        </div>
      </section>
    </article>
    <h2 class="text-h3 mb-7">{{ $t("title") }}</h2>
    <p v-html="$t('note')"></p>

    <TermsWrapper v-model="profile.atipp.read_terms" :value="profile.atipp.read_terms">
      <ATIPP />
    </TermsWrapper>

    <BlackoutNotice ref="blackout" />

    <div class="buttons mt-14" v-if="valid">
      <div class="text-left">
        <v-btn class="back" color="hollow" @click="cancel()" x-large>
          <span>Disagree</span>
        </v-btn>
      </div>
      <div class="text-center"></div>
      <div class="text-right">
        <v-btn :to="next" class="continue" color="primary" v-if="next" x-large>
          <span>Agree & Continue</span>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import Buttons from "@/components/forms/Buttons.vue";
import TermsWrapper from "@/components/terms/wrapper.vue";
import ATIPP from "@/components/terms/atipp.vue";
import BlackoutNotice from "@/components/utils/BlackoutNotice.vue";

export default {
  components: {
    Buttons,
    TermsWrapper,
    ATIPP,
    BlackoutNotice
  },
  head() {
    return {
      title: "Yukon Student Financial Portal - Application"
    };
  },
  computed: {
    profile: {
      get() {
        return {atipp:{read_terms: true}};
        //return this.$store.getters["profile/GET"];
      },
      set(values) {
        //return this.$store.commit("profile/SET", values);
      }
    },
    valid() {
      var is_valid = !!this.profile.atipp.read_terms;
      return is_valid;
    },
    next() {
      //return this.localePath("/application/onboarding");
      return "/application/onboarding"
    }
  },
  mounted() {
    this.profile.atipp.read_terms = false;
  },
  methods: {
    cancel() {
      var self = this;
      this.$refs.blackout.open({
        text: "Disagree?",
        message: "Disagreeing with the ATIPP Collection Statement will cancel your application.",
        options: [
          {
            text: "No, Agree and continue",
            callback: () => {
              self.$router.go(this.localePath("/application/onboarding"));
            }
          },
          {
            text: "Yes, Disagree and cancel",
            callback: () => {
              self.$router.go(-1);
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
article {
  display: flex;
  > nav {
    width: 30%;
    > div {
      padding: 0.5rem 2rem;
      padding-left: 0 !important;
      > span {
        font-size: 1em;
        &.active {
          font-weight: bold;
        }
      }
    }
  }
  > section {
    width: 70%;
    border-left: solid 1px rgba(0, 0, 0, 0.1);
    padding-left: 4rem;
  }
}
</style>

<style lang="scss">
article[data-section="application-process"] {
  > section {
    > div {
      h2 {
        font-size: 2rem;
      }
      article {
        display: block;
        pointer-events: all;
      }
    }
  }
}
</style>
