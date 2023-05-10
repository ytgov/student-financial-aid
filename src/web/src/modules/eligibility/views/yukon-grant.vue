<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.yukon_grant.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.yukon_grant.has_completed_two_years") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.yukon_grant.has_completed_two_years"
        :value="eligibility.yukon_grant.has_completed_two_years"
      />
    </section>

    <section v-if="eligibility.yukon_grant.has_completed_two_years">
      <Question>
        {{ $t("eligibility.yukon_grant.out_of_school_4_years") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.yukon_grant.out_of_school_4_years"
        :value="eligibility.yukon_grant.out_of_school_4_years"
      />
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
  </article>
</template>

<script>
import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import YesNoRadio from "@/components/forms/YesNoRadio.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio
  },
  data() {
    return {
      eligibility: {
        yukon_grant: {
          has_completed_two_years: null,
          out_of_school_4_years: null
        }
      }
    };
  },
  computed: {
    // eligibility: {
    //   get() {
    //     return this.$store.getters['eligibility/GET']
    //   },
    //   set(values) {
    //     return this.$store.commit('eligibility/SET', values)
    //   }
    // },
    valid() {
      var is_valid =
        this.eligibility.yukon_grant.has_completed_two_years == "Yes" ||
        (this.eligibility.yukon_grant.has_completed_two_years == "No" &&
          this.eligibility.yukon_grant.out_of_school_4_years);

      return is_valid;
    },
    next() {
      return { path: "/eligibility/marital" };
    }
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      // this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  }
};
</script>
