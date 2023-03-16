<template>
  <header>
    <section class="limit-width">
      <section>
        <nuxt-link :to="home_uri">
          <Logo />
        </nuxt-link>
      </section>
      <section>
        <div>
          <nuxt-link :to="switchLocalePath('en')" v-if="locale == 'fr'">English</nuxt-link>
          <nuxt-link :to="switchLocalePath('fr')" v-else>Français</nuxt-link>
        </div>
        <div v-if="false">
          <nuxt-link to="/messages">
            <i class="fas fa-2x fa-envelope" />
            <span>
              {{ messages }}
            </span>
          </nuxt-link>
        </div>
        <div>
          <a @click="toggleMenu()">
            <div>
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <g fill="#323232" fill-rule="evenodd">
                  <rect width="30" height="6" rx="2"></rect>
                  <rect y="12" width="30" height="6" rx="2"></rect>
                  <rect y="24" width="30" height="6" rx="2"></rect>
                </g>
              </svg>
            </div>
            <div>Menu</div>
          </a>
        </div>
      </section>
    </section>
  </header>
</template>

<script>
//import { mapState } from "pinia";
import Logo from "@/components/Logo.vue";

export default {
  components: {
    Logo,
  },
  computed: {
    language() {
      return this.$i18n.locale == "en" ? "Français" : "English";
    },
    locale() {
      return this.$i18n.locale;
    },
    home_uri() {
      return this.$i18n.locale == "fr" ? "/fr" : "/";
    },
    menu() {
      return false
      //return this.$store.getters["menu_open"];
    },

    /* ...mapState({
      messages: "messages/count",
    }), */
    messages() {return 0}
  },
  methods: {
    toggleMenu() {
      this.$store.commit("TOGGLE_MENU");
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgb(155 155 155 / 30%);

  > section.limit-width {
    display: flex;
    align-items: center;

    padding: 0.5rem 0;
    > section {
      width: 100%;
      &:last-of-type {
        width: 30%;
        min-width: 300px;
        text-align: right;
        display: flex;
        align-items: center;

        > div {
          width: 100%;

          a {
            color: #000;
            display: flex;
            align-items: center;

            &:link,
            &:visited,
            &:active {
              color: #000;
            }
            > div {
              padding: 0.1rem 0.5rem;
              line-height: 1;
            }
          }

          &:nth-of-type(2) {
            position: relative;
            padding-left: 40px;
            padding-right: 40px;

            > a {
              > span {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                left: 50%;
                top: 15px;

                background: #000;
                color: #fff;
                padding: 5px;
                width: 20px;
                height: 20px;

                border-radius: 100%;
                line-height: 0;

                font-size: 10px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  header {
    > section.limit-width {
      > section {
        padding: 0.5rem 2rem;
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  header {
    > section.limit-width {
      > section {
        padding: 0.5rem 1rem;
        &:last-of-type {
          width: 100%;
          min-width: auto;
          justify-self: end;

          > div {
            &:nth-of-type(1) {
              width: auto;
              display: none;
            }
            &:nth-of-type(2) {
              width: auto;
              padding: 0 20px;
            }
            &:nth-of-type(3) {
              width: auto;

              > a {
                display: block;
                > div {
                  &:nth-of-type(2) {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
