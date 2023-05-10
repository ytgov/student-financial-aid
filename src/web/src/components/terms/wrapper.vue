<template>
  <v-card elevation="0" class="mt-4">
    <v-card-text>
      <article>
        <slot></slot>
      </article>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
article {
  padding: 1rem;
  overflow-y: scroll;
  max-height: 400px;
}
</style>
