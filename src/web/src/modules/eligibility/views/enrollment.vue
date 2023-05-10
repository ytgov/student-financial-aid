<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.enrollement.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.enrollement.are_you_full_or_part_time") }}
      </Question>

      <RadioList
        :options="[$t('eligibility.enrollement.labels.full_time'), $t('eligibility.enrollement.labels.part_time')]"
        v-model="eligibility.enrollment.time"
        :value="eligibility.enrollment.time"
      />
    </section>

    <section>
      <p>
        <li>
          <strong>{{ $t("eligibility.enrollement.labels.full_time") }}</strong>
          {{ $t("eligibility.enrollement.notes.full_time") }}
        </li>
        <li>
          <strong>{{ $t("eligibility.enrollement.labels.part_time") }}</strong>
          {{ $t("eligibility.enrollement.notes.part_time") }}
        </li>
      </p>
      <p v-html="$t('eligibility.enrollement.notes.contact')"></p>
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
    //     //alert(values)
    //     //return this.$store.commit('eligibility/SET', values)
    //   }
    // },
    valid() {
      var is_valid = this.eligibility.enrollment.time;
      //return is_valid;
      return true;
    },
    next() {
      return { path: "/eligibility/residency" };
    }
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  }
};
</script>
