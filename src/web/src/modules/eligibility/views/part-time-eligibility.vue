<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.part_time_eligibility.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.part_time_eligibility.family_size") }}
      </Question>

      <NumberField
        v-model="eligibility.parttimeeligibility.family_size"
        :value="eligibility.parttimeeligibility.family_size"
      />
    </section>

    <section v-if="eligibility.parttimeeligibility.family_size">
      <Question>
        {{ $t("eligibility.part_time_eligibility.previous_year_gross_family_income") }}
      </Question>

      <Currency
        v-model="eligibility.parttimeeligibility.previous_year_gross_family_income"
        :value="eligibility.parttimeeligibility.previous_year_gross_family_income"
      />
    </section>

    <section
      v-if="
        eligibility.parttimeeligibility.family_size && eligibility.parttimeeligibility.previous_year_gross_family_income
      "
    >
      <Question>
        {{ $t("eligibility.part_time_eligibility.enrolled") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.parttimeeligibility.enrolled"
        :value="eligibility.parttimeeligibility.enrolled"
      />
    </section>

    <section
      v-if="
        eligibility.parttimeeligibility.family_size &&
        eligibility.parttimeeligibility.previous_year_gross_family_income &&
        eligibility.parttimeeligibility.enrolled
      "
    >
      <Question>
        {{ $t("eligibility.part_time_eligibility.lived_in_yukon") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.parttimeeligibility.lived_in_yukon"
        :value="eligibility.parttimeeligibility.lived_in_yukon"
      />
    </section>

    <section
      v-if="
        eligibility.parttimeeligibility.family_size &&
        eligibility.parttimeeligibility.previous_year_gross_family_income &&
        eligibility.parttimeeligibility.enrolled &&
        eligibility.parttimeeligibility.lived_in_yukon
      "
    >
      <Question>
        {{ $t("eligibility.part_time_eligibility.dependants_under_twelve") }}
      </Question>

      <NumberField
        v-model="eligibility.parttimeeligibility.dependants_under_twelve"
        :value="eligibility.parttimeeligibility.dependants_under_twelve"
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
import Currency from "@/components/forms/Currency.vue";
import NumberField from "@/components/forms/NumberField.vue";
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
        parttimeeligibility: {
          family_size: null,
          previous_year_gross_family_income: null,
          enrolled: null,
          lived_in_yukon: null,
          dependants_under_twelve: null
        }
      }
    };
  },
  computed: {
    // eligibility: {
    //   get() {
    //     return this.$store.getters["eligibility/GET"];
    //   },
    //   set(values) {
    //     return this.$store.commit("eligibility/SET", values);
    //   }
    // },
    valid() {
      var is_valid =
        this.eligibility.parttimeeligibility.family_size &&
        this.eligibility.parttimeeligibility.previous_year_gross_family_income &&
        this.eligibility.parttimeeligibility.enrolled &&
        this.eligibility.parttimeeligibility.lived_in_yukon &&
        this.eligibility.parttimeeligibility.dependants_under_twelve;

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
      // this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  }
};
</script>
