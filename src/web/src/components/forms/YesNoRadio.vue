<template>
  <div class="radio" @click="$emit('click')">
    <span v-for="radio in options" @click="select(radio.value)" :class="selected_radio == radio.value ? 'active' : ''">
      <span></span> {{ radio.text }}
    </span>
  </div>
</template>

<script>
export default {
  props: ["name", "value"],
  $_veeValidate: {
    // value getter
    value() {
      return this.selected_radio;
    },
    // name getter
    name() {
      return this.name;
    }
  },
  computed: {
    options() {
      if (this.$i18n.locale == "fr") {
        return [
          {
            value: "Yes",
            text: "Qui"
          },
          {
            value: "No",
            text: "Non"
          }
        ];
      } else {
        return [
          {
            value: "Yes",
            text: "Yes"
          },
          {
            value: "No",
            text: "No"
          }
        ];
      }
    }
  },
  data() {
    return {
      selected_radio: false
    };
  },
  mounted() {
    this.selected_radio = this.value;
  },
  watch: {
    selected_radio(from, to) {
      this.$emit("update:modelValue", this.selected_radio);
    }
  },
  methods: {
    select(radio) {
      this.selected_radio = radio;
    }
  }
};
</script>

<style lang="scss" scoped>
.radio {
  margin-bottom: 2rem;
  margin-top: 1rem;
  > span {
    display: block;
    margin: 20px 10px;
    margin-right: 0px;
    margin-left: 0;

    font-size: 20px;
    border: solid 1px #000;
    padding: 0.75rem;

    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;

    > span {
      display: inline-block;
      position: relative;
      bottom: -5px;
      display: inline-block;
      background: rgba(0, 0, 0, 0.1);
      color: rgba(255, 255, 255, 0.8);
      border: solid 1px rgba(0, 0, 0, 0.8);
      width: 25px;
      height: 25px;
      margin-right: 10px;

      border-radius: 100%;
    }

    &.active {
      background: #eee;
      > span {
        background: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>
