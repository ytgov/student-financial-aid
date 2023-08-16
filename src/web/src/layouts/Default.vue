<template>
  <v-app-bar app color="#fff" flat height="70" style="left: 0; border-bottom: 3px #f3b228 solid">
    <img src="/yukon.svg" style="margin: -10px 85px 0 14px" height="44" />
    <!-- <v-img class="ml-0m pl-0" src="src/assets/yukon.svg" height="44" /> -->
    <v-app-bar-title class="pt-0 font-weight-bold" style="margin-left: -20px">{{ $t("system.name") }}</v-app-bar-title>

    <template v-slot:append>
      <v-btn color="primary" class="mr-1" @click="goHome" icon="mdi-home"></v-btn>

      <!-- <v-divider vertical inset></v-divider> -->

      <LangaugeSwitcher></LangaugeSwitcher>

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" color="primary" v-bind="props"></v-btn>
        </template>

        <v-list density="compact">
          <v-list-item @click="openFeedbackClick">
            <template v-slot:prepend>
              <v-icon>mdi-comment-quote-outline</v-icon>
            </template>
            <v-list-item-title style="font-size: 0.9rem !important">Feedback</v-list-item-title>
          </v-list-item>

          <!-- <v-list-item to="/student">
              <template v-slot:prepend>
                <v-icon>mdi-account</v-icon>
              </template>
              <v-list-item-title style="font-size: 0.9rem !important">My profile</v-list-item-title>
            </v-list-item> -->

           <!-- <v-list-item to="/messages/inbox">
            <template v-slot:prepend>
              <v-icon>mdi-message</v-icon>
            </template>
            <v-list-item-title style="font-size: 0.9rem !important">My Messages</v-list-item-title>
          </v-list-item> -->
          <!-- 
          <v-list-item to="/faq">
            <template v-slot:prepend>
              <v-icon>mdi-frequently-asked-questions</v-icon>
            </template>
            <v-list-item-title style="font-size: 0.9rem !important">FAQs</v-list-item-title>
          </v-list-item> -->

          <v-list-item href="mailto:sfa@yukon.ca">
            <template v-slot:prepend>
              <v-icon>mdi-phone</v-icon>
            </template>
            <v-list-item-title style="font-size: 0.9rem !important">Contact</v-list-item-title>
          </v-list-item>

          <v-divider />
          <v-list-item @click="logoutClick">
            <template v-slot:prepend>
              <v-icon>mdi-exit-run</v-icon>
            </template>
            <v-list-item-title style="font-size: 0.9rem !important">Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-main>
    <!-- Provides the application the proper gutter -->
    <!-- fill-height causes the main content to fill the entire page -->
    <v-container fluid class="page-wrapper">
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-overlay v-model="showOverlay" class="align-center justify-center">
    <div class="text-center">
      <v-progress-circular indeterminate size="64" class="mb-5" color="#f3b228" width="6"></v-progress-circular>
      <h2>Loading {{ title }}</h2>
    </div>
  </v-overlay>
  <FeedbackDialog></FeedbackDialog>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { useNotificationStore } from "@/store/NotificationStore";
import LangaugeSwitcher from "../i18n/language-switcher.vue";
import { LOGOUT_URL } from "../urls";

import { mapState, mapActions, mapWritableState } from "pinia";
import FeedbackDialog from "@/components/FeedbackDialog.vue";

export default {
  name: "Default",
  components: { LangaugeSwitcher, FeedbackDialog },
  data() {
    return {
      showOverlay: true,
    };
  },
  computed: {
    ...mapWritableState(useNotificationStore, ["showNotification"]),
    ...mapState(useUserStore, ["user", "student"]),

    title() {
      return "Student Financial Assistance Portal";
    },
  },

  async mounted() {
    await this.initialize();
    this.showOverlay = false;
  },
  methods: {
    ...mapActions(useUserStore, ["initialize", "showFeedback"]),

    goHome() {
      if (this.student && this.student.id) this.$router.push("/student");
      else this.$router.push("/welcome");
    },

    logoutClick() {
      window.location.replace(LOGOUT_URL);
    },

    openFeedbackClick() {
      this.showFeedback();
    },
  },
};
</script>

<style scoped>
.v-list-item__prepend > .v-icon {
  margin-inline-end: 12px;
}
</style>
