import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import i18n from "./i18n";
import { router } from "./routes";
import store from "./store";

// Plugins
import { registerPlugins } from "./plugins";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(store);

registerPlugins(app);

app.mount("#app");
