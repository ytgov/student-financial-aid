<template>
  <v-btn class="d-none" variant="text" @click="swapLanguage" color="primary">
    <span v-if="currentLocale == 'fr'" style="font-size: 0.9rem !important">English</span>
    <span v-else style="font-size: 0.9rem !important">Français</span>
  </v-btn>
</template>

<script lang="ts">
export default {
  name: "LanguageSwitcher",
  data: () => ({
    currentLocale: "en",
  }),
  async mounted() {
    let storedLocale = localStorage.getItem("user-locale");

    if (storedLocale) {
      this.$i18n.locale = storedLocale;
      this.currentLocale = storedLocale;
    }
  },
  methods: {
    swapLanguage() {
      if (this.currentLocale == "en") {
        this.currentLocale = "fr";
      } else {
        this.currentLocale = "en";
      }

      this.$i18n.locale = this.currentLocale;
      localStorage.setItem("user-locale", this.currentLocale);
    },
  },
};
</script>
