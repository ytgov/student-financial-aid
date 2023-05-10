<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.independant_student.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.independant_student.out_of_school") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.independentstudent.out_of_school"
        :value="eligibility.independentstudent.out_of_school"
      />
    </section>

    <section v-if="eligibility.independentstudent.out_of_school == 'Yes'">
      <Question>
        {{ $t("eligibility.independant_student.in_labour_force") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.independentstudent.in_labour_force"
        :value="eligibility.independentstudent.in_labour_force"
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
        independentstudent: {
          out_of_school: null,
          in_labour_force: null
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
      var is_valid = this.eligibility.independentstudent.out_of_school;
      return is_valid;
    },
    next() {
      if (this.eligibility.independentstudent.out_of_school == "Yes") {
        if (this.eligibility.enrollment.time == "Part-time") {
          return { path: "/eligibility/part-time-eligibility" };
        } else {
          return { path: "/eligibility/full-time-eligibility" };
        }
      }
      return { path: "/eligibility/dependant-student-jurisdiction" };
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
