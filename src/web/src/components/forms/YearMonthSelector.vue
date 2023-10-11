<template>
  <div class="top" :class="has_focus ? 'hf' : ''" style="height: 50px;">
    <div style="position: absolute; z-index: 22; height: 5px !important; width: 100%; top: -1px">
      <div class="inlay">
        <label>{{ label }}</label>
      </div>
    </div>
    <VueDatePicker
      v-model="month"
      month-picker
      format="yyyy/MM"
      :clearable="false"
      :max-date="maxDate"
      :teleport="true"
      :auto-apply="true"
      :text-input="true"
      :readonly="readonly"
      @open="has_focus = true"
      @closed="has_focus = false" />
  </div>
</template>

<script lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  props: ["modelValue", "minYear", "maxYear", "maxDate", "label", "marginRight", "readonly"],
  components: { VueDatePicker },
  data() {
    return {
      month: undefined as { month: number; year: number } | undefined,
      has_focus: false,
    };
  },
  mounted() {
    if (this.modelValue) {
      let parts = this.modelValue.split("/");

      if (parts.length == 2) {
        this.month = { year: parts[0], month: parseInt(parts[1]) - 1 };
      }
    }
  },
  watch: {
    month(to, from) {
      if (this.month && this.month)
        this.$emit("update:modelValue", `${this.month.year}/${(this.month.month + 1).toString().padStart(2, "0")}`);
      else this.$emit("update:modelValue", null);
    },
  },
};
</script>
