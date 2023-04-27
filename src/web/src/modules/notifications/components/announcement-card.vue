<template>
  <v-alert :color="color" :type="announcement.type" class="mb-5" elevation="0">
    <v-alert-title class="mb-2">{{ announcement.title }}</v-alert-title>
    {{ announcement.description }}

    <div v-if="announcement.action && announcement.action_link">
      <br />
      <v-btn :to="announcement.action_link" color="primary" class="float-right">
        {{ announcement.action }}
      </v-btn>
    </div>
  </v-alert>
</template>

<script>
export default {
  props: ["announcement"],
  computed: {
    color() {
      if (this.announcement.type == "warning") return "#fc9a71";

      return "#eee5d1";
    },
    type() {
      if (this.announcement.type == "warning") return "warning";

      return "yg_sun";
    },
  },
};
</script>

<style>
.v-alert .v-alert__Tiel {
}
</style>
