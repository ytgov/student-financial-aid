<template>
  <h2 class="text-h2 mb-6">Status</h2>
  <v-card
    color="#eee5d1"
    variant="elevated"
    elevation="0"
    v-for="(item, idx) of application.fundingRequests"
    class="mb-5">
    <v-card-text>
      <h3 class="text-h3 mb-6">Request Type: {{ item.requestTypeId }}</h3>
      <v-divider class="my-3" />

      <div>
        {{ item.statusId }} {{ item.statusReasonId }}
        {{ item.statusDate }}

        <ul>
          <li v-for="a of item.assessments">
            {{ a }}
          </li>
        </ul>

        <v-divider class="my-4" v-if="idx < application.fundingRequests - 1"></v-divider>
      </div>
    </v-card-text>
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
    ...mapState(useUserStore, ["student", "studentAddress"]),
    ...mapState(useApplicationStore, ["application"]),
  },
  methods: {},
};
</script>
