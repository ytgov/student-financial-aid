import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import i18n from "./i18n";
import { router } from "./routes";
import { AuthHelper } from "@/plugins/auth";

// Plugins
import { registerPlugins } from "./plugins";
import { Auth0Plugin } from "@auth0/auth0-vue";

const pinia = createPinia();

const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(AuthHelper as any);

app.config.globalProperties.$auth = AuthHelper;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $auth: Auth0Plugin;
  }
}

export {}; // Important! See note.

registerPlugins(app);

app.mount("#app");
