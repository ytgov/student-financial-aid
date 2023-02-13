<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.full_time_eligibility.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.full_time_eligibility.program_at_least_2_years") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.fulltimeeligibility.program_at_least_2_years"
        :value="eligibility.fulltimeeligibility.program_at_least_2_years"
      />
    </section>

    <section v-if="eligibility.fulltimeeligibility.program_at_least_2_years == 'Yes'">
      <Question>
        {{ $t("eligibility.full_time_eligibility.family_size") }}
      </Question>

      <NumberField
        v-model="eligibility.fulltimeeligibility.family_size"
        :value="eligibility.fulltimeeligibility.family_size"
      />
    </section>

    <section
      v-if="
        eligibility.fulltimeeligibility.program_at_least_2_years == 'Yes' && eligibility.fulltimeeligibility.family_size
      "
    >
      <Question>
        {{ $t("eligibility.full_time_eligibility.previous_year_gross_family_income") }}
      </Question>

      <Currency
        v-model="eligibility.fulltimeeligibility.previous_year_gross_family_income"
        :value="eligibility.fulltimeeligibility.previous_year_gross_family_income"
      />
    </section>

    <section
      v-if="
        eligibility.fulltimeeligibility.program_at_least_2_years == 'Yes' &&
        eligibility.fulltimeeligibility.family_size > 2 &&
        eligibility.fulltimeeligibility.previous_year_gross_family_income
      "
    >
      <Question>
        {{ $t("eligibility.full_time_eligibility.dependants_under_twelve") }}
      </Question>

      <NumberField
        v-model="eligibility.fulltimeeligibility.dependants_under_twelve"
        :value="eligibility.fulltimeeligibility.dependants_under_twelve"
      />
    </section>

    <section
      v-if="
        eligibility.fulltimeeligibility.program_at_least_2_years == 'Yes' &&
        eligibility.fulltimeeligibility.family_size > 2 &&
        eligibility.fulltimeeligibility.previous_year_gross_family_income &&
        eligibility.fulltimeeligibility.dependants_under_twelve
      "
    >
      <Question>
        {{ $t("eligibility.full_time_eligibility.dependants_with_disability") }}
      </Question>

      <NumberField
        v-model="eligibility.fulltimeeligibility.dependants_with_disability"
        :value="eligibility.fulltimeeligibility.dependants_with_disability"
      />
    </section>

    <Buttons :valid="valid" :next="next" :back="true" />
  </article>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import TextField from "@/components/forms/TextField.vue";
import NumberField from "@/components/forms/NumberField.vue";
import Currency from "@/components/forms/Currency.vue";
import YesNoRadio from "@/components/forms/YesNoRadio.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    TextField,
    NumberField,
    Currency,
    YesNoRadio
  },
  data() {
    return {
      eligibility: {
        fulltimeeligibility: {
          program_at_least_2_years: null,
          family_size: null,
          previous_year_gross_family_income: null,
          dependants_under_twelve: null,
          dependants_with_disability: null
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
        this.eligibility.fulltimeeligibility.program_at_least_2_years == "No" ||
        (this.eligibility.fulltimeeligibility.program_at_least_2_years == "Yes" &&
          this.eligibility.fulltimeeligibility.family_size &&
          this.eligibility.fulltimeeligibility.previous_year_gross_family_income);

      if (this.eligibility.fulltimeeligibility.family_size > 2) {
        if (
          this.eligibility.fulltimeeligibility.dependants_with_disability &&
          this.eligibility.fulltimeeligibility.dependants_under_twelve
        ) {
          is_valid = true;
        } else {
          is_valid = false;
        }
      }
      return is_valid;
    },
    next() {
      return { path: "/eligibility/disabilities" };
    }
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      // this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit("input", this.valid);
    }
  }
};
</script>
