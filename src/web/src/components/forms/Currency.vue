<template>
  <v-text-field
    :label="label"
    :placeholder="placeholder"
    variant="outlined"
    bg-color="white"
    density="comfortable"
    hide-details
    v-model="innerValue"
    @focus="focus"
    @blur="blur">
  </v-text-field>
</template>

<script>
export default {
  props: ["name", "label", "value", "placeholder"],
  data() {
    return {
      output: "23.12",
      isInFocus: false,
    };
  },
  mounted() {
    if (this.value) {
      this.output = this.value;
    }
  },
  watch: {
    output(to, from) {
      this.$emit("input", this.output);
    },
  },
  computed: {
    innerValue: {
      get: function () {
        console.log("HERE")
        return "TESTINGING"
      },
      set: function (v) {
        console.log("SETTYING", v)

        if (v === "") {
          this.output = "";
          this.$emit("input", null);
        }
        if (/^\-?\d+(\.|\,)?\d*$/.test(v)) {
          this.output = v.replace(",", ".");
          this.$emit("input", Number(Number(this.output).toFixed(2)));
        } else {
          this.output = v.replace(/([^ \d\.\,\-\s]+)|((\.|\,|\-){2,})/g, "");
        }
      },
    },
  },
  methods: {
    blur() {
      this.isInFocus = false;
      this.output = !!this.value ? this.value.toString() : "";
    },
    focus() {
      this.output = !!this.value ? this.value.toString() : "";
      this.isInFocus = true;
    },
    format(v) {
      return !isNaN(+v)
        ? new Intl.NumberFormat(this.localeCode, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(+v)
        : "";
    },
  },
};
</script>
