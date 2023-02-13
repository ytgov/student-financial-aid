<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.single_parent_student_jurisdiction.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.single_parent_student_jurisdiction.most_recently_in_yukon") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.singleparentjurisdiction.most_recently_in_yukon"
        :value="eligibility.singleparentjurisdiction.most_recently_in_yukon"
      />
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
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
        singleparentjurisdiction: {
          most_recently_in_yukon: null
        },
        enrollment: {
          are_you_full_or_part_time: null
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
      var is_valid = this.eligibility.singleparentjurisdiction.most_recently_in_yukon;

      return is_valid;
    },
    next() {
      return this.eligibility.enrollment.are_you_full_or_part_time == "Part-time"
        ? { path: "/eligibility/part-time-eligibility" }
        : { path: "/eligibility/full-time-eligibility" };
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
