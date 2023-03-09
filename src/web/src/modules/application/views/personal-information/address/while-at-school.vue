<template>
  <article data-layout="application">
    <h2 class="text-h3 mb-7">{{ $t("title") }}</h2>
    <p>
      {{ $t("excerpt") }}
    </p>

    <section>
      <h4>Address:</h4>
      <AddressSelector v-model="student.HOME_ADDRESS2" :value="student.HOME_ADDRESS2" />
    </section>

    <div>
      <label>
        <input type="checkbox" @click="same()" :checked="student.HOME_ADDRESS1 == student.HOME_ADDRESS2" /> Same as
        permanent address
      </label>
    </div>

    <Buttons :valid="valid" :next="next" :back="true" />
  </article>
</template>

<script>
import Question from "@/components/forms/Question.vue";
import Buttons from "@/components/forms/Buttons.vue";
import RadioList from "@/components/forms/RadioList.vue";
import AddressSelector from "@/components/forms/AddressSelector.vue";

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    AddressSelector
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
    valid() {
      var is_valid = this.student.HOME_ADDRESS2 != "";

      return is_valid;
    },
    next() {
      return this.localePath("/application/program-details");
    }
  },
  mounted() {
    this.$emit("input", this.valid);
  },
  watch: {
    valid(to, from) {
      this.$store.commit("student/SET", this.student);
      this.$emit("input", this.valid);
    }
  },
  methods: {
    same() {
      this.student.HOME_ADDRESS2 = this.student.HOME_ADDRESS1;
      this.$store.commit("student/SET", this.student);
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

.update {
  text-transform: uppercase;
  color: #fff;
  background: #244c5a;
  text-decoration: none;
  padding: 0.25rem 1rem;
  font-size: 1rem;
}
</style>
