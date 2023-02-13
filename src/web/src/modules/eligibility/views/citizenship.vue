<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.citizenship.title") }}</h2>

    <p>
      {{ $t("eligibility.citizenship.body") }}
    </p>

    <section>
      <Question>
        {{ $t("eligibility.citizenship.are_you_a_canadian_citizen") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.citizenship.is_canadian_citizen"
        :value="eligibility.citizenship.is_canadian_citizen"
      />
    </section>

    <section v-if="eligibility.citizenship.is_canadian_citizen == 'No'">
      <Question>
        {{ $t("eligibility.citizenship.are_you_a_permanent_resident") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.citizenship.are_you_a_permanent_resident"
        :value="eligibility.citizenship.are_you_a_permanent_resident"
      />
    </section>

    <section
      v-if="eligibility.citizenship.is_canadian_citizen == 'No' && eligibility.citizenship.are_you_a_permanent_resident"
    >
      <Question>
        {{ $t("eligibility.citizenship.are_you_a_protected_person") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.citizenship.are_you_a_protected_person"
        :value="eligibility.citizenship.are_you_a_protected_person"
      />
    </section>

    <section
      v-if="
        eligibility.citizenship.is_canadian_citizen == 'No' &&
        eligibility.citizenship.are_you_a_permanent_resident &&
        eligibility.citizenship.are_you_a_protected_person == 'No'
      "
    >
      <Question>
        {{ $t("eligibility.citizenship.are_you_registered_as_indigenous") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.citizenship.are_you_registered_as_indigenous"
        :value="eligibility.citizenship.are_you_registered_as_indigenous"
      />
    </section>

    <Buttons :valid="valid" :next="next" :back="true" />
    <!-- Create a button to console log all values -->
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
      //TODO: Remove this when we have a store
      eligibility: {
        citizenship: {
          is_canadian_citizen: null,
          are_you_a_permanent_resident: null,
          are_you_a_protected_person: null,
          are_you_registered_as_indigenous: null
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
        this.eligibility.citizenship.is_canadian_citizen == "Yes" ||
        (this.eligibility.citizenship.is_canadian_citizen == "No" &&
          this.eligibility.citizenship.are_you_a_permanent_resident) ||
        (this.eligibility.citizenship.is_canadian_citizen == "No" &&
          this.eligibility.citizenship.are_you_a_permanent_resident &&
          this.eligibility.citizenship.are_you_a_protected_person == "No" &&
          this.eligibility.citizenship.are_you_registered_as_indigenous);

      return is_valid;
    },
    next() {
      if (this.eligibility.citizenship.are_you_registered_as_indigenous == "Yes") {
        return { path: "/eligibility/enrollment" };
      }
      return { path: "/eligibility/yukon-excellence-award" };
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
