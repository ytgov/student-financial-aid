<template>

  <div class="control">
    <div class="slot">
      <label :for="name">{{label}}</label>
      <div class="select">
        <select :name="name" v-model="selected" class="minimal">
          <option value="">- SELECT -</option>
          <option v-for="o in options" :selected="(selected == (o||o.value)) ? 'selected' : ''">
            {{o.text||o}} 
          </option>
        </select>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: ["name", "label", "options", "value"],
  $_veeValidate: {
    // value getter
    value () {
      return this.selected;
    },
    // name getter
    name () {
      return this.name;
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  mounted() {
    this.selected = this.value || ''
  },
  watch: {
    selected() {
      this.$emit('input', this.selected)
    }
  }
}
</script>


<style lang="scss" scoped>

div.control {
  margin: 1.25rem 0;
  > div.slot {

    .select {
      margin-bottom: 2rem;
      margin-top: 1rem;

       width: 100%;

      > select {
        background: #FFFFFF;
        border: 1px solid #D4C7CF !important;
        color: #333;

         padding: 0.75rem;

        border-radius: 5px;
        font-size: 16px;

        padding-right: 5rem;

        width: 100%;


      }      
    }



    select.minimal {
      background-image:
        linear-gradient(45deg, transparent 50%, gray 50%),
        linear-gradient(135deg, gray 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
      background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        calc(100% - 2.5em) 0.5em;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;
    }

    select.minimal:focus {
      background-image:
        linear-gradient(45deg, green 50%, transparent 50%),
        linear-gradient(135deg, transparent 50%, green 50%),
        linear-gradient(to right, #ccc, #ccc);
      background-position:
        calc(100% - 15px) 1em,
        calc(100% - 20px) 1em,
        calc(100% - 2.5em) 0.5em;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;

      outline: 0;
    }
  }
}
</style>