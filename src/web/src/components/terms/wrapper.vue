<template>
  <article @scroll="onScroll">
    <slot></slot>
  </article>
</template>


<script>
export default {
  methods: {
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      var self = this;
      if (scrollTop + clientHeight >= scrollHeight) {
        self.$emit('input', true)
      }
    }
  }
}
</script>



<style lang="scss" scoped>

article {
  border: solid 1px #eee;
  padding: 2rem;
  overflow-y: scroll;
  max-height: 500px;
  background: #efefef;
}

</style>
