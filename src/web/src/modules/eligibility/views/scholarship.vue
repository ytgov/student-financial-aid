<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.scholarship.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.scholarship.are_you_a_high_school_student") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.scholarship.is_high_school_student"
        :value="eligibility.scholarship.is_high_school_student"
        @click="update()"
      />
    </section>

    <section v-if="eligibility.scholarship.is_high_school_student">
      <Question>
        {{ $t("eligibility.scholarship.are_you_a_high_school_graduate") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.scholarship.is_high_school_graduate"
        :value="eligibility.scholarship.is_high_school_graduate"
        @click="update()"
      />
    </section>
    <section v-if="eligibility.scholarship.is_high_school_student && eligibility.scholarship.is_high_school_graduate">
      <Question>
        {{ $t("eligibility.scholarship.are_you_pursuing_aviation") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.scholarship.is_pursuing_aviation"
        :value="eligibility.scholarship.is_pursuing_aviation"
        @click="update()"
      />
    </section>

    <section
      v-if="
        eligibility.scholarship.is_high_school_student &&
        eligibility.scholarship.is_high_school_graduate &&
        eligibility.scholarship.is_pursuing_aviation == 'No'
      "
    >
      <Question>
        {{ $t("eligibility.scholarship.are_you_entering_visual_arts") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.scholarship.are_you_entering_visual_arts"
        :value="eligibility.scholarship.are_you_entering_visual_arts"
        @click="update()"
      />
    </section>

    <section
      v-if="
        eligibility.scholarship.is_high_school_student &&
        eligibility.scholarship.is_high_school_graduate &&
        eligibility.scholarship.is_pursuing_aviation == 'No' &&
        eligibility.scholarship.are_you_entering_visual_arts == 'No'
      "
    >
      <Question>
        {{ $t("eligibility.scholarship.enrolled_vocational") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.scholarship.enrolled_vocational"
        :value="eligibility.scholarship.enrolled_vocational"
        @click="update()"
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
        scholarship: {
          is_high_school_student: null,
          is_high_school_graduate: null,
          is_pursuing_aviation: null,
          are_you_entering_visual_arts: null,
          enrolled_vocational: null
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

    valid() {
      var is_valid =
        this.eligibility.scholarship.is_high_school_student &&
        this.eligibility.scholarship.is_high_school_graduate &&
        (this.eligibility.scholarship.is_pursuing_aviation == "Yes" ||
          this.eligibility.scholarship.are_you_entering_visual_arts == "Yes" ||
          this.eligibility.scholarship.enrolled_vocational == "Yes" ||
          (this.eligibility.scholarship.is_pursuing_aviation == "No" &&
            this.eligibility.scholarship.are_you_entering_visual_arts == "No" &&
            this.eligibility.scholarship.enrolled_vocational == "No"));

      return is_valid;
    },
    next() {
      return { path: "/eligibility/enrollment" };
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
  },
  methods: {
    update() {
      // this.$store.commit("eligibility/SET", this.eligibility);
    }
  }
};
</script>
