<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t("eligibility.yukon_excellence_award.title") }}</h2>
    <p>
      {{ $t("eligibility.yukon_excellence_award.note") }}
    </p>

    <div class="balance">
      <div>Balance:</div>
      <div>${{ balance }}</div>
    </div>

    <section>
      <Question>
        {{ $t("eligibility.yukon_excellence_award.how_much_would_like_to_apply_for") }}
      </Question>

      <Currency
        v-model="eligibility.yukon_excellence_award.apply"
        :value="eligibility.yukon_excellence_award.apply"
        :max="balance"
      />
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
  </article>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Question from "@/components/forms/Question.vue";
import Buttons from "@/components/forms/Buttons.vue";
import RadioList from "@/components/forms/RadioList.vue";
import YesNoRadio from "@/components/forms/YesNoRadio.vue";

import Currency from "@/components/forms/Currency.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    Currency,
    YesNoRadio
  },
  data() {
    return {
      eligibility: {
        yukon_excellence_award: {
          apply: ""
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
      var is_valid = true;

      return is_valid;
    },
    next() {
      return { path: "/eligibility/scholarship" };
    },
    balance() {
      return 1023;
    }
  },
  mounted() {
    this.$emit("input", this.valid);

    if (!this.eligibility.yukon_excellence_award.apply) {
      this.eligibility.yukon_excellence_award.apply = "";
    }
  },
  watch: {
    valid(to, from) {
      // this.$store.commit("eligibility/SET", this.eligibility);
      this.$emit("input", this.valid);
    }
  }
};
</script>

<style lang="scss" scoped>
.balance {
  display: flex;
  width: 100%;
  background: #efefef;

  border: solid 1px #ccc;
  margin: 1rem 0;
  margin-bottom: 3rem;

  > div {
    padding: 1rem;
    font-size: 1.1em;
  }
}

.email,
.input {
  width: 100%;
  background: #efefef;
  padding: 1rem;
  border: solid 1px #ccc;
  font-size: 1.1em;
  margin: 1rem 0;
  margin-bottom: 3rem;
}
</style>
