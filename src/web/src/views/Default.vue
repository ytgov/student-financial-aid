<template>
  <v-overlay>
    <div class="text-center">
      <v-progress-circular indeterminate size="64" class="mb-5"></v-progress-circular>
      <h1 class="title">Loading</h1>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { mapActions, mapState } from "pinia";

export default {
  name: "Default",
  components: {},
  async mounted() {
    await this.initialize();

    if (this.student && this.student.id) this.$router.push("/student");
    else if (this.user && this.user.sub) this.$router.push("/welcome");
    else this.$router.push("/sign-in");
  },
  methods: {
    ...mapActions(useUserStore, ["initialize"]),
  },
  computed: {
    ...mapState(useUserStore, ["user", "student"]),
  },
};
</script>
