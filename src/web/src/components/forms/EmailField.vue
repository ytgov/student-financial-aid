<template>
  <div class="control">
    <div class="slot">
      <label :for="name">{{label}}</label>
      <div>
        <input type="text" 
          v-model="output" 
          :name="name" 
          :placeholder="placeholder" 
          @blur="blur" 
          @focus="focus" 
          @click="click" 
          @change="change"
        /> 

        <a @click="update">Update</a>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  name: 'TextField',
  props: ['name', 'label', 'value', "placeholder", "errors", "valid"],
  data() {
    return {
      output: ''
    }
  },
  mounted() {
    if (this.value) {
      this.output = this.value
    }
  },
  methods: {
    blur() {
      this.$emit('input', this.output)
      this.$emit('blur')
    },
    focus() {
      this.$emit('focus')
    },
    click(e) {
      this.$emit('click', e)
    },
    change() {
      this.$emit('change')
    },
    update() {
      this.$emit('input', this.output)
    }
  }
}

</script>

<style lang="scss" scoped>

div.control {
  margin: 1.25rem 0;
  > div.slot {

    input[type=text] {
      background: #FFFFFF;
      border-radius: 3px;
      border: 1px solid #D4C7CF !important;
      padding: 0.5rem !important;
      width: 100%;
      margin-top: 5px;
    }

    > div {
      position: relative;

      > a {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translate(0, -45%);
        line-height: 1;
        text-decoration: none;
      }
    }
  }
}
</style>