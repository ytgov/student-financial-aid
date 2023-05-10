<template>
  <section data-section="alerts">
    <section class="limit-width">
      <div>
        <i class="fa fa-2x fa-exclamation-triangle" />
      </div>
      <div>
        <p class="alert-title">{{ $t("components.ui.alerts.heading") }}</p>
        <ul>
          <li class="alert" v-for="(alert, index) in alerts" :key="index">
            <strong>{{ alert[locale].text }}</strong>
            <nuxt-link :to="alert[locale].link.url">{{ alert[locale].link.text }}</nuxt-link>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  computed: {
    alerts() {
      return this.$store.getters["alerts/list"];
    },
    locale() {
      return this.$i18n.locale;
    }
  }
};
</script>

<style lang="scss" swcoped>
p.alert-title {
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 0.5em;
  font-weight: 500;
  color: #444142;
}

section[data-section="alerts"] {
  background-color: #fff4e4;
  border-top: 4px solid #ffcd57;
  > section.limit-width {
    display: flex;
    padding: 2rem 0;
    > div {
      &:nth-of-type(1) {
        padding-left: 50px;
        padding-right: 50px;
      }

      ul {
        > li {
          > a {
            white-space: nowrap;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  section[data-section="alerts"] {
    > section.limit-width {
      padding: 1rem;
      > div {
        &:nth-of-type(1) {
          padding-left: 0rem;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
