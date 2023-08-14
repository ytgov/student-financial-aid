<template>
  <h2 class="text-h2 mb-6">Documents</h2>
  <v-card color="#eee5d1" variant="elevated" elevation="0">
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/store/UserStore";
import { useApplicationStore } from "../store";

export default {
  data: () => ({}),
  mounted() {},
  computed: {
    ...mapState(useApplicationStore, ["application"]),
  },
  methods: {},
};
</script>
