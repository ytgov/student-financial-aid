<template>
  <input :name="name" type="checkbox" v-model="output" @click="toggle();" />
</template>


<script>

export default {
  props: ["name", "value"],
  $_veeValidate: {
    // value getter
    value () {
      return this.output;
    },
    // name getter
    name () {
      return this.name;
    }
  },
  data() {
    return {
      output: false
    }
  },
  mounted() {
    this.output = this.value 
  },
  methods: {
    toggle(radio) {
      this.output = !this.output
      this.$emit('input', this.output)
      this.$emit('click')
    }
  }
}
</script>


<style lang="scss" scoped>

input[type=checkbox] {
  position: relative;
  bottom: -3px;
  margin-right: 20px;
  
  height: 22px;
  width: 22px;



  &:before {
    position: relative;
    display: block;
    width: 11px;
    height: 11px;
    border: 1px solid #808080;
    content: "";
    background: #FFF;
    display: none;
  }
  &:after {
    position: relative;
    display: block;
    left: 2px;
    top: -11px;
    width: 7px;
    height: 7px;
    border-width: 1px;
    border-style: solid;
    border-color: #B3B3B3 #dcddde #dcddde #B3B3B3;
    content: "";
    background-image: linear-gradient(135deg, #B1B6BE 0%, #FFF 100%);
    background-repeat: no-repeat;
    background-position: center;
    display: none;
  }
  &:checked:after {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC'), linear-gradient(135deg, #B1B6BE 0%, #FFF 100%);
  }
  &:disabled:after {
    -webkit-filter: opacity(0.4);
  }
  &:not(:disabled):checked:hover:after {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC'), linear-gradient(135deg, #8BB0C2 0%, #FFF 100%);
  }
  &:not(:disabled):hover:after {
    background-image: linear-gradient(135deg, #8BB0C2 0%, #FFF 100%);
    border-color: #85A9BB #92C2DA #92C2DA #85A9BB;
  }
  &:not(:disabled):hover:before {
    border-color: #3D7591;
  }

}

</style>