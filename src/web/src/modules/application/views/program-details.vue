<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("application.program_details.title") }}</h2>

    <section>
      <TextField
        v-model="eligibility.designated_institution.details.campus"
        :value="eligibility.designated_institution.details.campus"
        :label="$t('application.program_details.details.campus')" />
    </section>
    <section>
      <TextField
        v-model="eligibility.designated_institution.details.program_name"
        :value="eligibility.designated_institution.details.program_name"
        :label="$t('application.program_details.details.program_name')" />
    </section>

    <section>
      <TextField
        v-model="eligibility.designated_institution.details.duration_of_program"
        :value="eligibility.designated_institution.details.duration_of_program"
        :label="$t('application.program_details.details.duration_of_program')" />
    </section>

    <section>
      <Select
        v-model="eligibility.designated_institution.details.year_entering"
        :value="eligibility.designated_institution.details.year_entering"
        :label="$t('application.program_details.details.year_entering')"
        :options="years" />
    </section>

    <section>
      <DateSelector
        v-model="eligibility.designated_institution.details.start_date_of_classes"
        :value="eligibility.designated_institution.details.start_date_of_classes || new Date()"
        :label="$t('application.program_details.details.start_date_of_classes')" />
    </section>

    <section>
      <DateSelector
        v-model="eligibility.designated_institution.details.end_date_of_classes"
        :value="eligibility.designated_institution.details.end_date_of_classes || new Date()"
        :label="$t('application.program_details.details.end_date_of_classes')" />
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
  </article>
</template>

<script>
import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import Select from "@/components/forms/Select.vue";
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    Select,
    TextField,
    DateSelector,
  },
  data() {
    return {
      eligibility: {
        designated_institution: { details: { end_date_of_classes: new Date(), start_date_of_classes: new Date() } },
      },
    };
  },
  computed: {
    /* eligibility: {
      get() {
        return this.$store.getters["eligibility/GET"];
      },
      set(values) {
        return this.$store.commit("eligibility/SET", values);
      } 
    },*/
    valid() {
      var is_valid = true;
      return is_valid;
    },
    years() {
      return [
        new Date().getFullYear(),
        new Date().getFullYear() + 1,
        new Date().getFullYear() + 2,
        new Date().getFullYear() + 2,
      ];
    },
    next() {
      //this.$store.commit("eligibility/SET", this.eligibility);
      //return this.localePath("/application/documents");
      return "/application/documents";
    },
  },
  mounted() {
    this.$emit("input", this.valid);

    if (!this.eligibility.designated_institution.post_secondary_enrolled_in) {
      //this.$router.push(this.localePath(`/application/documents`));
      //this.$router.push(`/application/documents`);
    }
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    },
  },
};
</script>
