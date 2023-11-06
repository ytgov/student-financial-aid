/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import BaseComponents from "./baseComponents";
import vuetify from "./vuetify";
import { useAuth0, AuthState } from "./auth";
//import axios from "axios";
import { App } from "vue";

export function registerPlugins(app: App<Element>) {
  BaseComponents.register(app);
  app.use(vuetify);
  //app.use(auth);

  const { initAuth } = useAuth0(AuthState);

  initAuth(app);
}

//axios.defaults.withCredentials = true;
