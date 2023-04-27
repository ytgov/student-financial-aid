<template>
  <v-alert :color="color" variant="tonal" :icon="icon" class="mb-5 pb-2" @click="openClick" elevation="0">
    <v-chip size="small" :color="chipColor" variant="flat" class="float-right">{{ application.status }}</v-chip>
    <v-alert-title class="mb-0">Academic Year {{ application.academic_year }}</v-alert-title>
    <div class="v-alert-subtitle">Last saved {{ application.last_saved_date }}</div>
    {{ application.description }}
    <div style="margin-left: -16px" class="mt-2">
      <v-btn
        v-if="application.status == 'In Progress'"
        :to="`/application/${application.id}`"
        color="primary"
        class="my-0"
        variant="text">
        Edit
      </v-btn>
      <v-btn v-else color="primary" class="my-0" variant="text"> View </v-btn>
    </div>
  </v-alert>
</template>
<script>
export default {
  props: ["application"],
  data: () => ({}),
  computed: {
    color() {
      if (this.application.status == "In Progress") return "yg_moss";
      return "yg_lichen";
    },
    icon() {
      if (this.application.status == "In Progress") return "mdi-pencil";
      return "mdi-lock";
    },
    chipColor() {
      if (this.application.status == "In Progress") return "warning";
      return "mdi-lock";
    },
  },
  methods: {
    openClick() {
      this.$router.push(`/application/${this.application.id}`);
    },
  },
};
</script>

<style>
.v-alert-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  opacity: var(--v-medium-emphasis-opacity);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
}
</style>
