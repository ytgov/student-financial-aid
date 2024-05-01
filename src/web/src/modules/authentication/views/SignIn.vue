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
              <div class="pa-7 pa-sm-12">
                <div style="background-color: #f9f4d4" class="pa-5 d-md-none">
                  <img src="@/assets/logo.svg" alt="Logo" class="d-md-inline" />
                  <h2 class="display-1 font-weight-medium" style="line-height: 40px">{{ applicationTitle }}</h2>
                  <h6 class="text-subtitle-1 mt-4 op-5 font-weight-regular">{{ applicationSubtitle }}</h6>
                </div>

                <h2 class="text-h5 mt-4">Sign in</h2>
                <h6 class="text-subtitle-2 mt-3 mb-5">
                  This application is used by new and returning students to apply for higher education funding
                  assistance.
                </h6>

                <v-btn @click="signInClick" color="primary">Sign in</v-btn>

                <v-alert color="yg_zinc" type="info" theme="light" class="mt-6 signin-message">
                  Applications for the 2024 Academic Year (classes beginning on/after August 1<sup>st</sup>) will be
                  accepted starting July 2<sup>nd</sup>, 2024.
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
