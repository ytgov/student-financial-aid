<template>
  <div class="control">
    <div class="slot">
      <label>{{label}}</label>
      <div class="sin-holder">
        <input type="text" v-model="sin[0]" placeholder="xxx" pattern="\d{1,3}" maxlength="3" @keyup="handleTab" /> 
        <span>-</span>
        <input type="text" v-model="sin[1]" placeholder="xxx" pattern="\d{1,3}" maxlength="3" @keyup="handleTab" /> 
        <span>-</span>
        <input type="text" v-model="sin[2]" placeholder="xxx" pattern="\d{1,3}" maxlength="3" @keyup="handleTabSave" />
      </div>
    </div>
    <div v-if="errors.length && !valid">
      <p :class="(valid) ? 'valid' : 'error'">
        {{errors[0]}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'label', 'errors', 'valid'],
  $_veeValidate: {
    // value getter
    value () {
      return this.sin.join("")
    },
    // name getter
    name () {
      return 'sin';
    }
  },
  computed: {
    output() {
      return this.sin.join("")
    }
  },
  data() {
    return {
      message: false,
      sin: ['', '', '']
    }
  },
  mounted() {
    if (this.value) {
      let value = String(this.value)
      this.sin = [value.slice(0,3), value.slice(3,6), value.slice(6,9)]
    }
  },
  watch: {
    sin(to, from) {
      if (this.output.length==9) {
        this.$emit('input', this.output)
      }
    }
  },
  methods: {
    handleTab(e) {
      let value = e.target.value;
      if (value.length==3) {
        if (e.target.nextElementSibling.nextElementSibling) {
          e.target.nextElementSibling.nextElementSibling.select()
        } else {
          this.$emit('input', this.output)
        }
      }
    },
    handleTabSave() {
      this.$emit('input', this.output)
    }
  }
}
</script>

<style lang="scss" scoped>

div.control {
  margin: 1.25rem 0;
  div.sin-holder {
    display: grid;
    grid-template-columns: 6fr 0.5fr 6fr 0.5fr 6fr;
    grid-gap: 1rem;
    input[type=text] {
      width: 100%;
      background: #FFFFFF;
      border-radius: 3px;
      border: 1px solid #D4C7CF !important;
      padding: 0.5rem !important;
    }
    span {
      display: flex;
      height: 100%;
      text-align: center;
      align-items: center;
      justify-content: center;
    }
  }
  .error, .valid {
    margin-top: 1rem;
    padding: 1rem;
  }
  .valid {
    background: #00cc00;
  }
}

</style>