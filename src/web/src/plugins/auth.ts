import { Auth0Plugin, createAuth0 } from "@auth0/auth0-vue";
import { App, reactive, toRaw } from "vue";
import { router } from "@/routes";

export const AuthState = reactive({
  user: null,
  loading: false,
  isAuthenticated: false,
  auth0: undefined as Auth0Plugin | undefined,
  token: undefined,
});

const prodConfig = {
  domain: "https://yukon.eu.auth0.com",
  client_id: "A6tVdfAUUPREDQravpCKN3jPALQzBoC3",
  audience: "generic-production",
};

const uatConfig = {
  domain: "https://yukon-staging.eu.auth0.com",
  client_id: "gtJyuybItVW7gQOCIlAtECqYprL6yUCk",
  audience: "generic-uat",
};

const devConfig = {
  domain: "https://dev-0tc6bn14.eu.auth0.com",
  client_id: "ZGlOd5wvf0bL0USl6jD4QBqX6eiDsitQ",
  audience: "testing",
};

let config = prodConfig;
let tries = 0;

if (window.location.host == "localhost:8080") config = devConfig;
else if (window.location.host == "test.sfa-portal.ynet.gov.yk.ca") config = uatConfig;

export const useAuth0 = (state: any) => {
  const handleStateChange = async () => {
    state.isAuthenticated = !!state.auth0?.isAuthenticated;
    state.user = await state.auth0?.user;
    state.loading = state.auth0.isLoading;

    if (state.isAuthenticated) {
      state.token = await (state.auth0 as Auth0Plugin).getAccessTokenSilently();
    } else {
      state.token = undefined;

      if (tries < 5)
        setTimeout(() => {
          handleStateChange();
        }, 250);

      tries++;
    }

    if (state.isAuthenticated && state.token) {
      router.push("/");
    } else router.push("/sign-in");
  };

  const initAuth = async (app: App<Element>) => {
    console.log("Initializing Auth");

    state.loading = true;
    state.auth0 = createAuth0({
      domain: config.domain,
      clientId: config.client_id,
      cacheLocation: "localstorage",
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: config.audience,
      },
    });

    app.use(state.auth0);

    await state.auth0.checkSession();
    await handleStateChange();
  };

  const login = async () => {
    let a = toRaw(state.auth0);

    if (a) {
      //await a.loginWithPopup();
      await a.loginWithRedirect();
      //await handleStateChange();
    }

    /*  await toRaw(state.auth0).loginWithRedirect();
    await handleStateChange(); */
  };

  const logout = async () => {
    state.auth0?.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return {
    login,
    logout,
    initAuth,
  };
};

interface AuthSt {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  auth0: Auth0Plugin | undefined;
}
