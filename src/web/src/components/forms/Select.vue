<template>
  <div class="select">
    <select :name="name" v-model="selected" class="minimal">
      <option value="">- SELECT -</option>
      <option v-for="o in options" :selected="(selected == (o||o.value)) ? 'selected' : ''">
        {{o.text||o}} 
      </option>
    </select>
  </div>
</template>


<script>

export default {
  props: ["name", "options", "value"],
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
.select {
  margin-bottom: 2rem;
  margin-top: 1rem;

  > select {
    background: #eee;
    color: #333;
    border: solid 1px rgba(0,0,0,0.8);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 20px;

    padding-right: 5rem;

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

</style>