<template>
  <v-container tag="section" class="mt-10">
    <v-row justify="center" class="mt-10">
      <v-col lg="11" sm="8" xl="7">
        <v-card class="elevation-5" style="overflow: hidden">
          <v-row>
            <v-col lg="7" style="background-color: #f9f4d4" class="d-none d-md-flex align-center justify-center">
              <div class="d-none d-sm-block">
                <img src="@/assets/logo.svg" alt="Logo" class="d-md-block pl-6" />
                <div class="align-center pa-6">
                  <h2 class="text-h5 mb-2" style="line-height: 40px">{{ applicationTitle }}</h2>
                  <h6 class="text-subtitle-1 mt-0">{{ applicationSubtitle }}</h6>
                </div>
              </div>
            </v-col>
            <v-col lg="5">
              <div class="pa-7 pa-sm-8">
                <div style="background-color: #f9f4d4" class="pa-5 d-md-none">
                  <img src="@/assets/logo.svg" alt="Logo" class="d-md-inline" />
                  <h2 class="display-1 font-weight-medium" style="line-height: 40px">{{ applicationTitle }}</h2>
                  <h6 class="text-subtitle-1 mt-4 op-5 font-weight-regular">{{ applicationSubtitle }}</h6>
                </div>

                <h2 class="text-h4 font-weight-bold mt-4">Welcome!</h2>
                <h6 class="text-h6 font-weight-light mt-3 mb-5">
                  Apply for the following post-secondary student financial assistance programs through this portal:
                </h6>

                <ul class="ml-6 mb-5">
                  <li class="font-weight-regular">Yukon Grant</li>
                  <li>Yukon Excellence Awards</li>
                  <li>Student Training Allowance</li>
                  <li>Canada Student Financial Assistance</li>
                </ul>

                <v-btn @click="signInClick" color="primary">Sign in / Create Account</v-btn>

                <p class="mt-4 text-body-2">
                  New users can <a style="cursor: pointer" @click="signInClick">create an account</a>
                </p>
                <p class="text-body-2">
                  Get
                  <a
                    href="https://service.support.yukon.ca/servicedesk/customer/portal/3/create/49?from=student&page=sign-in-to-account"
                    target="_blank"
                    >help with your account or password</a
                  >
                </p>

                <v-alert color="yg_zinc" theme="light" class="mt-6 signin-message">
                  <strong>Classes starting on or after August 1, 2024?</strong><br />
                  <span class="font-weight-light"
                    >We'll begin accepting applications on July 2, 2024, for the 2024/25 academic year.</span
                  >
                </v-alert>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.signin-message .v-alert__prepend {
  color: white !important;
}
.signin-message .v-alert__content {
  color: white !important;
}
</style>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { useAuth0, AuthState } from "@/plugins/auth";

export default {
  name: "SignIn",
  data: () => ({
    applicationTitle: "Student Financial Assistance Portal",
    applicationSubtitle: "Department of Education",
  }),
  async mounted() {
    let userStore = useUserStore();

    userStore.isAuthenticated(false).then((isAuth) => {
      if (isAuth == true) this.$router.push("/");
    });
  },
  methods: {
    signInClick() {
      const { login } = useAuth0(AuthState);
      //window.location.replace(LOGIN_URL);

      login();
    },
  },
};
</script>
