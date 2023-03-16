<template>
  <aside :class="menu_open ? 'open' : ''">
    <header>
      <section class="title">
        {{ $t("components.menu.heading") }}
      </section>
      <section>
        <a href="javascript:void(0)" @click="toggleMenu()">
          <div>{{ $t("components.menu.close") }}</div>
          <div>
            <svg viewBox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
            </svg>
          </div>
        </a>
      </section>
    </header>
    <v-list-item two-line>
      <v-list-item-avatar v-if="$auth.loggedIn">
        <img :src="$auth.user.picture" v-if="$auth.user.picture" />
      </v-list-item-avatar>

      <v-list-item-content v-if="$auth.loggedIn">
        <v-list-item-title>
          {{ $auth.user.nickname }}<br />
          ({{ $auth.user.email }})
        </v-list-item-title>
        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="(item, index) in nav[locale].items" :key="index">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <a @click="item.click()" v-if="item.click">{{ item.title }}</a>
            <nuxt-link :to="item.to" @click.native="off()" v-else>{{ item.title }}</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </aside>
</template>

<script>
//import { mapState } from "pinia";

export default {
  computed: {
    /* ...mapState({
      login_url: "user/login_url",
      menu_open: "menu_open",
    }), */
    login_url() {return ""},
    menu_open() {return false;},


    locale() {
      return this.$i18n.locale;
    },
  },
  data() {
    return {
      nav: {
        en: {
          items: [
            { title: "Applications", icon: "mdi-home-city", to: "/" },
            { title: "Profile", icon: "mdi-account-group-outline", to: "/profile" },
            { title: "Documents", icon: "mdi-account", to: "/application/documents" },
            { title: "FAQ", icon: "mdi-account", to: "/faq" },
            { title: "Contact", icon: "mdi-account", to: "/contact" },
            {
              title: "Logout",
              icon: "mdi-account",
              click: () => {
                this.$auth.logout();
                this.off();
              },
            },
          ],
        },
        fr: {
          items: [
            { title: "Applications", icon: "mdi-home-city", to: "/fr" },
            { title: "Profil", icon: "mdi-account-group-outline", to: "/fr/profile" },
            { title: "Dcouments", icon: "mdi-account", to: "/fr/application/documents" },
            { title: "FAQ", icon: "mdi-account", to: "/fr/faq" },
            { title: "Contact", icon: "mdi-account", to: "/fr/contact" },
            {
              title: "Logout",
              icon: "mdi-account",
              click: () => {
                this.$auth.logout();
                this.off();
              },
            },
          ],
        },
      },
    };
  },
  created() {
    //this.$store.commit("user/SET_STATE");
  },
  methods: {
    toggleMenu() {
      this.$store.commit("TOGGLE_MENU");
    },
    off() {
      this.$store.commit("TOGGLE_MENU_OFF");
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  width: 30%;
  height: 100%;
  min-width: 400px;

  background: #fff;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;

  -webkit-box-shadow: -2px 0 5px 0 rgb(0 0 0 / 20%);
  box-shadow: -2px 0 5px 0 rgb(0 0 0 / 20%);

  z-index: 1100;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-transform: translateX(0);
  transform: translateX(0);

  -webkit-transform: translateX(100%);
  transform: translateX(100%);

  > * {
    width: 100%;
  }
  > header {
    border-bottom: 4px solid #ffcd57;
    padding: 2rem;
    display: flex;
    > section {
      width: 100%;
      height: 60px;
      &.title {
        font-family: "Montserrat", Helvetica, Arial, sans-serif;
        font-size: 22px;
        font-weight: 500;
        line-height: 1.2;
      }
      &:nth-of-type(2) {
        max-width: 70px;
        text-align: right;
        align-self: end;
        > a {
          position: relative;
          display: flex;
          align-items: center;

          color: #000;
          text-decoration: none;

          div {
            color: #333;
            line-height: 1;
            svg {
              width: 50px;
              height: 50px;

              stroke: #333;
              stroke-width: 2;
              fill: transparent;
            }
          }
        }
      }
    }
  }

  &.open {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
  }
}

@media only screen and (max-width: 640px) {
  aside {
    width: 100%;
    min-width: 100%;
  }
}
</style>
