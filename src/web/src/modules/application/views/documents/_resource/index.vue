<template>
  <article data-layout="documents">
    <v-flex xs9 v-if="doc">
      <h2 class="text-h3 mb-7">{{ $t("title") }}</h2>
      <p>
        {{ $t("excerpt") }}
      </p>

      <h3>{{ doc.name[locale] }}</h3>

      <file-upload :resource="resource" />

      <v-banner icon="mdi-alert-circle" class="problem mt-4">
        {{ $t("error") }}
      </v-banner>

      <Buttons :valid="valid" :next="next" :back="true" />
    </v-flex>
  </article>
</template>

<style lang="scss" scoped></style>

<script>
import FileUpload from "@/components/FileUpload.vue";
import Buttons from "@/components/forms/Buttons.vue";

export default {
  components: {
    FileUpload,
    Buttons
  },
  computed: {
    resource() {
      return this.$route.params.resource;
    },
    doc() {
      return {};
      //return this.$store.getters["documents/by_resource"](this.resource);
    },
    locale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    upload() {}
  }
};
</script>

<style lang="scss" scoped>
[data-layout="documents"] {
  max-width: 1024px;
  margin: 4rem 0;

  @media only screen and (max-width: 1024px) {
    max-width: 100%;
    margin: 2rem;
  }
  @media only screen and (max-width: 1024px) {
    margin: 1rem;
    > div.xs9 {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
}
</style>
