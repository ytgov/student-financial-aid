<template>
  <article data-layout="application" v-if="profile">
    <h2 class="text-h3 mb-7">{{ $t("title") }}</h2>

    <section v-if="profile.email.value">
      <div class="email">
        {{ profile.email.value || "No email address on file." }}
      </div>
    </section>

    <section v-if="profile.email.value && valid_email && new_email == ''">
      <Question>
        {{ $t("would_you_like_to_use_existing_address") }}
      </Question>

      <YesNoRadio v-model="use_existing" :value="use_existing" />
    </section>

    <section v-if="(use_existing == 'No' || !profile.email.value) && new_email == ''">
      <Question>
        {{ $t("enter_your_email_address") }}
      </Question>
      <EmailField v-model="new_email" :value="new_email" />
    </section>

    <section v-if="profile.email.value && valid">
      <CheckboxQuestion v-model="profile.email.is_primary" :value="profile.email.is_primary">
        {{ $t("is_primary_email_address") }}
      </CheckboxQuestion>
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
import CheckboxQuestion from "@/components/forms/CheckboxQuestion.vue";
import TextField from "@/components/forms/TextField.vue";
import EmailField from "@/components/forms/EmailField.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio,
    CheckboxQuestion,
    TextField,
    EmailField
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters["profile/GET"];
      },
      set(values) {
        return this.$store.commit("profile/SET", values);
      }
    },
    new() {
      return this.new_email;
    },
    valid() {
      var is_valid = this.validateEmail(this.profile.email.value);
      return is_valid;
    },
    valid_email() {
      const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(this.profile.email.value);
    },
    next() {
      this.$store.commit("profile/SET", this.profile);
      return this.localePath("/application/personal-information/address/permanent");
    }
  },
  data() {
    return {
      new_email: "",
      use_existing: "Yes"
    };
  },
  mounted() {
    /*
    this.$emit('input', this.valid)
    if (!this.profile.email.value) {
      this.profile.email.use_existing = true
      this.profile.email.value = ''
    } else {
      this.profile.email.use_existing = false
    }
    */
  },
  watch: {
    valid(to, from) {
      //this.$store.commit('profile/SET', this.profile)
      //this.$emit('input', this.valid)
    },
    new(to, from) {
      this.profile.email.value = this.new_email;
      //this.$store.commit('profile/SET', this.profile)
    }
  },
  methods: {
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style lang="scss" scoped>
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
