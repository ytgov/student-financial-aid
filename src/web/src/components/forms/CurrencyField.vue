<template>
  <div class="control">
    <div class="slot">
      <label :for="name">{{label}}</label>
      <input type="number" v-model="output" placeholder="$0" :max="max" @focus="focus()" v-if="focused" />
      <input type="text" v-model="rendered" placeholder="$0"  @blur="blur()" v-else />
    </div>
  </div>
</template>
<script>
export default {
  props: ['name', "label", 'value', 'max'],
  data() {
    return {
      focused: false,
      rendered: '$0',
      output: 0
    }
  },
  mounted() {
    this.rendered = `$${this.value}`
    this.output = this.value
  },
  methods: {
    focus() {
      this.focused = true
    },
    blur() {
      this.focused = false
      this.output = this.rendered.replaceAll('$', '')
      this.$emit('input', this.output)
    }
  },
  watch: {
    rendered(to, from) {
      if (to.length==0) {
        this.rendered = '$'
      } else {
        var value = parseInt(to.replace('$', ''))
        if (value>this.max) {
          this.rendered = `$${this.max}`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.control {
  margin: 1.25rem 0;
  > div.slot {

    input[type=text], input[type=number] {
      background: #FFFFFF;
      border-radius: 3px;
      border: 1px solid #D4C7CF !important;
      padding: 0.5rem !important;
      width: 100%;
      margin-top: 5px;
    }
  }
}
</style>