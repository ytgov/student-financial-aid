<template>
  <v-overlay :model-value="overlay" persistent> </v-overlay>
  <div class="text-center mt-12">
    <v-progress-circular indeterminate size="64" class="mb-5"></v-progress-circular>
    <h1 class="title">Loading {{ applicationTitle }}</h1>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { mapActions, mapState } from "pinia";

export default {
  name: "SignIn",
  data: () => ({
    applicationTitle: "Student Financial Assistance Portal",
    applicationSubtitle: "Department of Education",
    overlay: true,
  }),
  async mounted() {
    await this.initialize();

    if (this.user) {
      if (this.student) {
        this.$router.push("/student");
      } else {
        this.$router.push("/welcome");
      }
    } else {
      this.$router.push("/sign-in");
    }
  },
  methods: {
    ...mapActions(useUserStore, ["initialize"]),
  },
  computed: {
    ...mapState(useUserStore, ["user", "student"]),
  },
};
</script>
