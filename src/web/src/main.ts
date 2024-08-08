import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import i18n from "./i18n";
import { router } from "./routes";
import VueMatomo from "vue-matomo";

// Plugins
import { registerPlugins } from "./plugins";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).use(router).use(i18n);

app.use(VueMatomo, {
  // Configure your matomo server and site by providing
  host: "https://analytics.gov.yk.ca",
  siteId: 82,
  router: router,
});

registerPlugins(app);

app.mount("#app");
