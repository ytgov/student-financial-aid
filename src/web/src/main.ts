import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import i18n from "./i18n";
import { router } from "./routes";

// Plugins
import { registerPlugins } from "./plugins";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).use(router).use(i18n);

/* app.config.globalProperties.$auth = AuthHelper;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $auth: Auth0Plugin;
  }
} */

export {}; // Important! See note.

registerPlugins(app);

app.mount("#app");
