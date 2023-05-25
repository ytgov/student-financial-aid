<template>
  <v-row class="mx-0" :style="`margin-right: ${marginRight} !important`">
    <v-col class="pl-0">
      <v-autocomplete
        v-model="outputYear"
        :label="`Year ${label}`"
        variant="outlined"
        density="comfortable"
        bg-color="white"
        :items="yearOptions"
        @update:model-value="changed"
        hide-details />
    </v-col>

    <v-col class="pr-0">
      <v-select
        v-model="outputMonth"
        :label="`Month ${label}`"
        variant="outlined"
        density="comfortable"
        bg-color="white"
        :items="monthOptions"
        @update:model-value="changed"
        hide-details />
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  props: ["modelValue", "minYear", "maxYear", "label", "marginRight"],
  data() {
    return {
      outputYear: 1900,
      outputMonth: 1,
      yearOptions: [1900],
      monthOptions: [
        { title: "January", value: "01" },
        { title: "February", value: "02" },
        { title: "March", value: "03" },
        { title: "April", value: "04" },
        { title: "May", value: "05" },
        { title: "June", value: "06" },
        { title: "July", value: "07" },
        { title: "August", value: "08" },
        { title: "September", value: "09" },
        { title: "October", value: "10" },
        { title: "November", value: "11" },
        { title: "December", value: "12" },
      ],
    };
  },
  mounted() {
    if (this.modelValue) {
      let parts = this.modelValue.split("/");

      this.outputYear = parseInt(parts[0]);
      this.outputMonth = parts[1];
    }

    let min = new Date().getFullYear() - 50;
    if (this.minYear) min = this.minYear;

    let max = new Date().getFullYear();
    if (this.maxYear) max = this.maxYear;

    console.log(this.minYear, min);
    console.log(this.maxYear, max);

    this.yearOptions = new Array<number>();

    for (; min <= max; min++) {
      this.yearOptions.push(min);
    }
  },
  watch: {
    outputYear(to, from) {
      this.$emit("update:modelValue", `${this.outputYear}/${this.outputMonth}`);
    },
    outputMonth(to, from) {
      this.$emit("update:modelValue", `${this.outputYear}/${this.outputMonth}`);
    },
  },
  methods: {
    changed(newV: any) {},
  },
};
</script>
