<template>
  <div class="control">
    <div class="slot">
      <label :for="name">{{label}}</label>
      <div class="radio" @click="$emit('click')">
        <span v-for="radio in options" @click="select(radio||radio.value)" :class="(selected_radio == (radio||radio.value)) ? 'active' : ''">
          <span></span> {{radio.text||radio}} 
        </span>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'RadioField',
  props: ['name', 'label', 'value', "options", "errors", "valid", ],
  $_veeValidate: {
    // value getter
    value () {
      return this.selected_radio;
    },
    // name getter
    name () {
      return this.name;
    }
  },
  data() {
    return {
      selected_radio: []
    }
  },
  mounted() {
    this.selected_radio = this.value 
  },
  watch:{
    selected_radio(from, to) {
      this.$emit('input', this.selected_radio)
    }
  },
  methods: {
    select(radio) {
      this.selected_radio = radio
    }
  }
}
</script>




<style lang="scss" scoped>

div.control {
  margin: 1.25rem 0;
  > div.slot {

    .radio {
      display: grid;
      grid-template-columns: 3fr 3fr 3fr 3fr;
      grid-gap: 1rem;
      > span {
        display: flex;
        align-items: center;

        margin: 20px 10px;
        
        margin: 0;
        padding: 0;

        font-size: 16px;

        line-height: 1.5;
   
        padding: 0.75rem;


        background: #FFFFFF;

        border: 1px solid #D4C7CF !important;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;

        min-width: 100px;


        > span {
          display: inline-block;
          position: relative;
          bottom: 0px;
          display: inline-block;
          background: rgba(0,0,0,0.1);
          color: rgba(255,255,255,0.8);
          border: none;
          width: 20px;
          height: 20px;
          margin-right: 10px;

          border-radius: 100%;
        }

        &.active {
          background: #eee;
          > span {
            background: #00818F;
          }
        }
      }

      @media only screen and (max-width: 768px) {
        grid-template-columns: 6fr 6fr;
      }
        
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
        background: rgba(0,0,0,0.1);
        color: rgba(255,255,255,0.8);
        border: solid 1px rgba(0,0,0,0.8);
        width: 25px;
        height: 25px;
        margin-right: 10px;

        border-radius: 100%;
      }

      &.active {
        background: #eee;
        > span {
          background: rgba(0,0,0,0.8);
        }
      }
    }
      
  }

</style>