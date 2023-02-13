<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.dependant_student_jurisdiction.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.dependant_student_jurisdiction.has_family_maintained_home") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.dependant_student_jurisdiction.has_family_maintained_home"
        :value="eligibility.dependant_student_jurisdiction.has_family_maintained_home"
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
        dependant_student_jurisdiction: {
          has_family_maintained_home: null
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
    //     return this.$store.getters["eligibility/GET"];
    //   },
    //   set(values) {
    //     return this.$store.commit("eligibility/SET", values);
    //   }
    // },
    valid() {
      var is_valid = this.eligibility.dependant_student_jurisdiction.has_family_maintained_home;

      return is_valid;
    },
    next() {
      if (this.eligibility.enrollment.time == "Part-time") {
        return { path: "/eligibility/part-time-eligibility" };
      } else {
        return { path: "/eligibility/full-time-eligibility" };
      }
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
