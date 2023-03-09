<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.designated_institution.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.designated_institution.are_you_enrolled_in_post_secondary") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.designated_institution.are_you_enrolled_in_post_secondary"
        :value="eligibility.designated_institution.are_you_enrolled_in_post_secondary"
      />
    </section>

    <section v-if="eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'">
      <Question>
        {{ $t("eligibility.designated_institution.post_secondary_enrolled_in") }}
      </Question>

      <p v-html="$t('eligibility.designated_institution.notes')"></p>

      <Select
        :options="institutions"
        v-model="eligibility.designated_institution.post_secondary_enrolled_in"
        :value="eligibility.designated_institution.post_secondary_enrolled_in"
      />
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
  </article>
</template>

<script>
import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import Select from "@/components/forms/Select.vue";
import YesNoRadio from "@/components/forms/YesNoRadio.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio,
    Select
  },
  data() {
    return {
      institutions: [
        "Yukon College",
        "Alcan Air",
        "McMaster University",
        "University of British Columbia",
        "University of Windsor"
      ]
    };
  },
  data() {
    return {
      eligibility: {
        designated_institution: {
          are_you_enrolled_in_post_secondary: null,
          post_secondary_enrolled_in: null
        }
      }
    };
  },
  computed: {
    // TODO: This is not working.
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
        this.eligibility.designated_institution.are_you_enrolled_in_post_secondary == "No" ||
        (this.eligibility.designated_institution.are_you_enrolled_in_post_secondary == "Yes" &&
          this.eligibility.designated_institution.post_secondary_enrolled_in);

      return is_valid;
    },
    next() {
      if (this.eligibility.designated_institution.are_you_enrolled_in_post_secondary == "No") {
        return { path: "/eligibility/review" };
      }
      return { path: "/eligibility/yukon-grant" };
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
