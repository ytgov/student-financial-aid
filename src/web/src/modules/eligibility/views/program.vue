<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.program.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.program.at_least_twelve_weeks") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.program.at_least_twelve_weeks"
        :value="eligibility.program.at_least_twelve_weeks"
      />
    </section>

    <section v-if="eligibility.program.at_least_twelve_weeks == 'No'">
      <Question>
        {{ $t("eligibility.program.at_least_three_weeks") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.program.at_least_three_weeks"
        :value="eligibility.program.at_least_three_weeks"
      />
    </section>

    <section v-if="eligibility.program.at_least_three_weeks == 'Yes'">
      <Question>
        {{ $t("eligibility.program.what_type_of_program") }}
      </Question>

      <RadioList
        :options="$t('eligibility.program.options')"
        v-model="eligibility.program.what_type_of_program"
        :value="eligibility.program.what_type_of_program"
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
        program: {
          at_least_twelve_weeks: null,
          at_least_three_weeks: null,
          what_type_of_program: null
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
        this.eligibility.program.at_least_three_weeks == "No" ||
        (this.eligibility.program.at_least_three_weeks == "Yes" && this.eligibility.program.what_type_of_program);

      return is_valid;
    },
    next() {
      return { path: "/eligibility/designated-institution" };
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
