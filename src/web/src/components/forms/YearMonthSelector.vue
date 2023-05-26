<template>
  <div class="top" :class="has_focus ? 'hf' : ''">
    <div style="position: absolute; z-index: 22; height: 5px !important; width: 100%; top: -1px">
      <div class="inlay">
        <label>{{ label }}</label>
      </div>
    </div>
    <VueDatePicker
      v-model="month"
      month-picker
      :clearable="false"
      format="yyyy/MM"
      :teleport="true"
      :auto-apply="true"
      :text-input="true"
      @open="has_focus = true"
      @closed="has_focus = false" />
  </div>
</template>

<script lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  props: ["modelValue", "minYear", "maxYear", "label", "marginRight"],
  components: { VueDatePicker },
  data() {
    return {
      month: { month: 1, year: 2023 },
      has_focus: false,
    };
  },
  mounted() {
    if (this.modelValue) {
      let parts = this.modelValue.split("/");
      this.month.year = parts[0];
      this.month.month = parseInt(parts[1]) - 1;
    }
  },
  watch: {
    month(to, from) {
      this.$emit("update:modelValue", `${this.month.year}/${(this.month.month + 1).toString().padStart(2, "0")}`);
    },
  },
};
</script>
