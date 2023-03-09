<template>
  <article data-layout="application">
    <h2 class="text-h3 mb-7">{{ $t("title") }}</h2>

    <section v-if="profile.tombstone.alias">
      <p>
        You have an existing alias? <strong>{{ profile.tombstone.alias }}</strong>
      </p>
    </section>

    <section v-if="profile.tombstone.alias">
      <Question>
        {{ $t("use_existing_alias") }}
      </Question>

      <YesNoRadio v-model="profile.tombstone.use_existing_alias" :value="profile.tombstone.use_existing_alias" />
    </section>

    <section v-if="!profile.tombstone.alias || profile.tombstone.use_existing_alias == 'No'">
      <Question>
        {{ $t("what_is_your_sin_number") }}
      </Question>
     <!--  <ValidationProvider name="SIN" rules="sin" tag="span" v-slot="{ errors, valid }"> -->
        <SinNumber
          name="SIN"
          v-model="student.SIN"
          :value="student.SIN"
          :errors="errors"
          :valid="valid"
          class="limit"
        />
     <!--  </ValidationProvider> -->
    </section>

    <section v-if="(!profile.tombstone.alias || profile.tombstone.use_existing_alias == 'No') && student.SIN">
      <Question>
        {{ $t("what_is_your_birthday") }}
      </Question>

      <div class="limit">
        <DateSelector v-model="student.DOB" :value="student.DOB" />
      </div>
    </section>

    <Buttons :valid="valid" :next="next" :back="true" />
  </article>
</template>

<script>
import Buttons from "@/components/forms/Buttons.vue";
import Question from "@/components/forms/Question.vue";
import RadioList from "@/components/forms/RadioList.vue";
import YesNoRadio from "@/components/forms/YesNoRadio.vue";
import SinNumber from "@/components/forms/SinNumber.vue";
import DateSelector from "@/components/forms/DateSelector.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    SinNumber,
    DateSelector,
    YesNoRadio
  },
  computed: {
    student: {
      get() {
        return this.$store.getters["student/GET"];
      },
      set(values) {
        return this.$store.commit("student/SET", values);
      }
    },
    profile: {
      get() {
        return this.$store.getters["profile/GET"];
      },
      set(values) {
        return this.$store.commit("profile/SET", values);
      }
    },
    valid() {
      var is_valid =
        (this.profile.tombstone.alias && this.profile.tombstone.use_existing_alias == "Yes") ||
        (!this.profile.tombstone.alias && this.valid_sin && this.student.SIN && this.student.DOB);
      return is_valid;
    },
    valid_sin() {
      return (this.student.SIN && this.student.SIN.length == 9) || false;
    },
    next() {
      return this.localePath("/application/personal-information/address/permanent");
    }
  },
  watch: {
    valid(to, from) {
      this.$store.commit("student/SET", this.student);
      this.$store.commit("profile/SET", this.profile);
      this.$emit("input", this.valid);
    }
  }
};
</script>

<style lang="scss" scoped>
.limit {
  width: 70%;
  @media only screen and (max-width: 640px) {
    width: 100%;
  }
}
</style>
