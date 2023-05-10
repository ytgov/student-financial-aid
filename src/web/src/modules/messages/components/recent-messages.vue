<template>
  <h4 class="text-h5 mb-4">Recent Messages</h4>

  <v-card elevation="0">
    <v-list lines="two" density="comfortable" @click:open="messageClick">
      <div v-for="(item, index) of recentMessages">
        <v-list-item-subtitle
          v-if="item.type == 'subheader'"
          v-html="item.title"
          class="ml-4 mt-2"></v-list-item-subtitle>
        <v-divider v-else-if="item.type == 'divider'" ></v-divider>

        <v-list-item v-else @click="messageClick" :prepend-icon="item.prependIcon">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "pinia";
import { useMessageStore } from "../store";

export default {
  computed: {
    ...mapState(useMessageStore, ["recentMessages"]),
  },
  methods: {
    messageClick() {
      this.$router.push("/messages/inbox");
    },
  },
};
</script>
