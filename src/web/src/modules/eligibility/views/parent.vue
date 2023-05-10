<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.parent.title") }}</h2>

    <section>
      <Question>
        {{ $t("eligibility.parent.responsible_for_child") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.parent.responsible_for_child"
        :value="eligibility.parent.responsible_for_child"
      />
    </section>

    <section v-if="eligibility.parent.responsible_for_child">
      <Question>
        {{ $t("eligibility.parent.ever_been_a_single_parent") }}
      </Question>

      <YesNoRadio
        v-model="eligibility.parent.ever_been_a_single_parent"
        :value="eligibility.parent.ever_been_a_single_parent"
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
        parent: {
          responsible_for_child: null,
          ever_been_a_single_parent: null
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
      var is_valid =
        this.eligibility.parent.responsible_for_child == "No" ||
        (this.eligibility.parent.responsible_for_child == "Yes" && this.eligibility.parent.ever_been_a_single_parent);

      return is_valid;
    },
    next() {
      if (this.eligibility.parent.responsible_for_child == "Yes") {
        return { path: "/eligibility/single-parent-student-jurisdiction" };
      }
      return { path: "/eligibility/independent-student" };
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
