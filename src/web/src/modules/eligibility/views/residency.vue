<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.residency.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.residency.living_in_yukon_for_2_years") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.living_in_yukon_for_2_years"
        :value="eligibility.residency.living_in_yukon_for_2_years"
      />
    </section>
    <section v-if="eligibility.residency.living_in_yukon_for_2_years == 'Yes'">
      <Question>
        {{ $t("eligibility.residency.did_you_move_during_2_years_more_4_months") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.did_you_move_during_2_years_more_4_months"
        :value="eligibility.residency.did_you_move_during_2_years_more_4_months"
      />
    </section>

    <section v-if="eligibility.residency.living_in_yukon_for_2_years == 'No'">
      <Question>
        {{ $t("eligibility.residency.did_you_move_during_2_years_more_12_months") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.did_you_move_during_2_years_more_12_months"
        :value="eligibility.residency.did_you_move_during_2_years_more_12_months"
      />
    </section>
    <section v-if="maybe_resident">
      <Question>
        {{ $t("eligibility.residency.do_you_file_with_cra_as_yukon_citizen") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.do_you_file_with_cra_as_yukon_citizen"
        :value="eligibility.residency.do_you_file_with_cra_as_yukon_citizen"
      />
    </section>

    <section v-if="maybe_resident && eligibility.residency.do_you_file_with_cra_as_yukon_citizen">
      <Question>
        {{ $t("eligibility.residency.valid_yukon_health_insurance") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.valid_yukon_health_insurance"
        :value="eligibility.residency.valid_yukon_health_insurance"
      />
    </section>

    <section
      v-if="
        maybe_resident &&
        eligibility.residency.do_you_file_with_cra_as_yukon_citizen &&
        eligibility.residency.valid_yukon_health_insurance
      "
    >
      <Question>
        {{ $t("eligibility.residency.drivers_lisence_another_jurisdiction") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.drivers_lisence_another_jurisdiction"
        :value="eligibility.residency.drivers_lisence_another_jurisdiction"
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
        residency: {
          living_in_yukon_for_2_years: null,
          did_you_move_during_2_years_more_4_months: null,
          did_you_move_during_2_years_more_12_months: null,
          do_you_file_with_cra_as_yukon_citizen: null,
          valid_yukon_health_insurance: null,
          drivers_lisence_another_jurisdiction: null
        }
      }
    };
  },
  computed: {
    // TODO Store
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
        !this.maybe_resident ||
        (this.maybe_resident &&
          this.eligibility.residency.do_you_file_with_cra_as_yukon_citizen &&
          this.eligibility.residency.valid_yukon_health_insurance &&
          this.eligibility.residency.drivers_lisence_another_jurisdiction);
      return is_valid;
    },
    next() {
      return { path: "/eligibility/program" };
    },
    maybe_resident() {
      return (
        this.eligibility.residency.living_in_yukon_for_2_years &&
        (this.eligibility.residency.did_you_move_during_2_years_more_4_months == "Yes" ||
          this.eligibility.residency.did_you_move_during_2_years_more_12_months == "Yes")
      );
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
