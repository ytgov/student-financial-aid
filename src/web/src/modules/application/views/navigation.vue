<template>
  <v-card color="#eee5d1" variant="elevated" elevation="0" class="mb-5">
    <div class="px-4 py-4">
      <div class="d-flex justify-space-between">
        <div>
          <h3 class="text-h3 mb-1 ml-1">2023/24 Application</h3>
          <v-breadcrumbs
            :items="[{ title: 'Student Home', to: '/student' }, { title: '2023/24 Application' }]"
            class="py-0 px-0">
            <template v-slot:divider>
              <v-icon icon="mdi-square-small"></v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </div>
    </div>
  </v-card>

  <v-row class="mt-34">
    <v-col cols="3">
      <v-card elevation="0">
        <v-list density="compact" :lines="false">
          <v-list-item subtitle="">
            <v-list-item-subtitle class="d-flex">
              <div class="py-1">Application</div>
              <v-spacer />
              <v-chip color="warning" size="small" variant="elevated" class="pull-right mb-1">In-Progress</v-chip>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider class="mb-4" />

          <v-list-item
            v-for="(item, index) in relevantSections"
            :to="item.uri"
            exact
            active-color="primary"
            :disabled="item.disabled">
            <template v-slot:prepend>
              <v-icon
                :icon="item.is_complete ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'"
                :color="item.is_complete ? 'success' : 'info'"></v-icon>
            </template>

            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-divider class="mt-1" v-if="index < relevantSections.length - 1" />
          </v-list-item>
        </v-list>

        <v-list-item :subtitle="`Last saved ${application.last_saved}`"> </v-list-item>
      </v-card>
    </v-col>
    <v-col class="pt-3">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "pinia";
import { useApplicationStore } from "../store";

export default {
  name: "Navigation",
  data: () => ({}),
  computed: {
    ...mapState(useApplicationStore, ["relevantSections", "application"]),
  },
  methods: {
    localePath(val) {
      return val;
    },
  },
};
</script>
