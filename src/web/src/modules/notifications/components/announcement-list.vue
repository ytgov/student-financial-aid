<template>
  <div v-if="announcements.length > 0" class="">
    <h4 class="text-h5 mb-4">Announcements</h4>
    <AnnouncementCard v-for="announcement of announcements" :announcement="announcement"></AnnouncementCard>
    <v-divider class="mt-7 mb-7"></v-divider>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAnnouncementStore } from "../store";
import AnnouncementCard from "./announcement-card.vue";

export default {
  props: [],
  components: { AnnouncementCard },
  computed: {
    ...mapState(useAnnouncementStore, ["announcements"]),
  },
};
</script>
