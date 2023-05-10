import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import i18n from "./i18n";
import { router } from "./routes";

// Plugins
import { registerPlugins } from "./plugins";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).use(router).use(i18n);
registerPlugins(app);

app.mount("#app");
