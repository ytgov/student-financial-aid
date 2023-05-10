/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import BaseComponents from "./baseComponents";
import vuetify from "./vuetify";
import axios from "axios";
import { App } from "vue";

export function registerPlugins(app: App<Element>) {
  BaseComponents.register(app);
  app.use(vuetify);
}

axios.defaults.withCredentials = true;
