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
      range
      format="yyyy/MM"
      :clearable="true"
      :teleport="true"
      :auto-apply="true"
      :text-input="false"
      :readonly="readonly"
      @open="has_focus = true"
      @closed="has_focus = false" />
  </div>
</template>

<script lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  props: ["modelValue", "minYear", "maxYear", "label", "marginRight", "readonly"],
  components: { VueDatePicker },
  data() {
    return {
      month: [{}, {}],
      has_focus: false,
    };
  },
  mounted() {
    if (this.modelValue) {
      this.month = this.modelValue;
      /*     let parts = this.modelValue.split("/");

      if (parts.length == 2) {
        this.month.year = parts[0];
        this.month.month = parseInt(parts[1]) - 1;
      } */
    } else {
      this.month = null;
    }
  },
  watch: {
    month(to, from) {
      if (this.month) this.$emit("update:modelValue", this.month);
      else this.$emit("update:modelValue", null);
    },
  },
};
</script>
