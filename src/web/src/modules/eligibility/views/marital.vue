<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.marital.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.marital.are_you_in_a_relationship") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.marital.are_you_in_a_relationship"
        :value="eligibility.marital.are_you_in_a_relationship"
      />
    </section>

    <section
      v-if="
        eligibility.marital.are_you_in_a_relationship == 'No' && eligibility.yukon_grant.out_of_school_4_years == 'No'
      "
    >
      <Question>
        {{ $t("eligibility.marital.have_you_ever_been_in_a_relationship") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.marital.have_you_ever_been_in_a_relationship"
        :value="eligibility.marital.have_you_ever_been_in_a_relationship"
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
        marital: {
          are_you_in_a_relationship: null,
          have_you_ever_been_in_a_relationship: null
        },
        yukon_grant: {
          out_of_school_4_years: null
        },
        enrollment: {
          time: null
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
        this.eligibility.marital.are_you_in_a_relationship ||
        (this.eligibility.marital.are_you_in_a_relationship == "No" &&
          this.eligibility.marital.have_you_ever_been_in_a_relationship) ||
        this.eligibility.yukon_grant.out_of_school_4_years == "Yes";

      return is_valid;
    },
    next() {
      if (
        this.eligibility.marital.are_you_in_a_relationship == "Yes" ||
        this.eligibility.marital.have_you_ever_been_in_a_relationship == "Yes"
      ) {
        if (this.eligibility.enrollment.time == "Part-time") {
          return { path: "/eligibility/part-time-eligibility" };
        } else {
          return { path: "/eligibility/full-time-eligibility" };
        }
      }
      return { path: "/eligibility/parent" };
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
