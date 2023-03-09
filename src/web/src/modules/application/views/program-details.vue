<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("title") }}</h2>

    <section>
      <Question>
        {{ $t("details.campus") }}
      </Question>

      <TextField
        v-model="eligibility.designated_institution.details.campus"
        :value="eligibility.designated_institution.details.campus"
      />
    </section>

    <section>
      <Question>
        {{ $t("details.program_name") }}
      </Question>

      <TextField
        v-model="eligibility.designated_institution.details.program_name"
        :value="eligibility.designated_institution.details.program_name"
      />
    </section>

    <section>
      <Question>
        {{ $t("details.duration_of_program") }}
      </Question>

      <TextField
        v-model="eligibility.designated_institution.details.duration_of_program"
        :value="eligibility.designated_institution.details.duration_of_program"
      />
    </section>

    <section>
      <Question>
        {{ $t("details.year_entering") }}
      </Question>

      <Select
        v-model="eligibility.designated_institution.details.year_entering"
        :value="eligibility.designated_institution.details.year_entering"
        :options="years"
      />
    </section>

    <section>
      <Question>
        {{ $t("details.start_date_of_classes") }}
      </Question>

      <DateSelector
        v-model="eligibility.designated_institution.details.start_date_of_classes"
        :value="eligibility.designated_institution.details.start_date_of_classes || new Date()"
      />
    </section>

    <section>
      <Question>
        {{ $t("details.end_date_of_classes") }}
      </Question>

      <DateSelector
        v-model="eligibility.designated_institution.details.end_date_of_classes"
        :value="eligibility.designated_institution.details.end_date_of_classes || new Date()"
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
import TextField from "@/components/forms/TextField.vue";
import DateSelector from "@/components/forms/DateSelector.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    Select,
    TextField,
    DateSelector
  },
  data() {
    return {};
  },
  computed: {
    eligibility: {
      get() {
        return this.$store.getters["eligibility/GET"];
      },
      set(values) {
        return this.$store.commit("eligibility/SET", values);
      }
    },
    valid() {
      var is_valid = true;
      return is_valid;
    },
    years() {
      return [
        new Date().getFullYear(),
        new Date().getFullYear() + 1,
        new Date().getFullYear() + 2,
        new Date().getFullYear() + 2
      ];
    },
    next() {
      this.$store.commit("eligibility/SET", this.eligibility);
      return this.localePath("/application/documents");
    }
  },
  mounted() {
    this.$emit("input", this.valid);

    if (!this.eligibility.designated_institution.post_secondary_enrolled_in) {
      this.$router.push(this.localePath(`/application/documents`));
    }
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  }
};
</script>
