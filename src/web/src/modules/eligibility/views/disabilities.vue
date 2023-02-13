<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.disabilities.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.disabilities.permanent_disability") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.disabilities.permanent_disability"
        :value="eligibility.disabilities.permanent_disability"
      />
    </section>

    <section v-if="eligibility.disabilities.permanent_disability == 'Yes'">
      <Question>
        {{ $t("eligibility.disabilities.service_equipment") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.disabilities.service_equipment"
        :value="eligibility.disabilities.service_equipment"
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
        disabilities: {
          permanent_disability: null,
          service_equipment: null
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
        this.eligibility.disabilities.permanent_disability == "No" ||
        (this.eligibility.disabilities.permanent_disability == "Yes" &&
          this.eligibility.disabilities.service_equipment);

      return is_valid;
    },
    next() {
      return { path: "/eligibility/review" };
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
