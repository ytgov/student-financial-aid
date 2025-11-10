<template>
  <v-container tag="section" class="mt-10">
    <v-row justify="center" class="mt-10">
      <v-col lg="11" sm="9" xl="8">
        <v-card class="elevation-5" style="overflow: hidden">
          <v-row>
            <v-col lg="6" style="background-color: #f9f4d4" class="d-none d-md-flex align-center justify-center">
              <div class="d-none d-sm-block">
                <img src="@/assets/logo.svg" alt="Logo" class="d-md-block pl-6" />
                <div class="align-center pa-6">
                  <h2 class="text-h5 mb-2" style="line-height: 40px">{{ applicationTitle }}</h2>
                  <h6 class="text-subtitle-1 font-weight-light mt-0 mb-5">{{ applicationSubtitle }}</h6>

                  <h4>Use this Portal to:</h4>

                  <ul class="ml-6 mt-2">
                    <li>Start a new application</li>
                    <li>Upload documents</li>
                    <li>Update contact information</li>
                  </ul>
                </div>
              </div>
            </v-col>
            <v-col lg="6">
              <div class="pa-7 pa-sm-8">
                <div style="background-color: #f9f4d4" class="pa-5 d-md-none">
                  <img src="@/assets/logo.svg" alt="Logo" class="d-md-inline" />
                  <h2 class="display-1 font-weight-medium" style="line-height: 40px">{{ applicationTitle }}</h2>
                  <h6 class="text-subtitle-1 font-weight-light mt-4 mb-3 op-5">{{ applicationSubtitle }}</h6>

                  <h4>Use this Portal to:</h4>

                  <ul class="ml-6 mt-2">
                    <li>Start a new application</li>
                    <li>Upload documents</li>
                    <li>Update contact information</li>
                  </ul>
                </div>

                <h2 class="text-h4 font-weight-bold mt-4">Welcome!</h2>
                <h6 class="text-h6 font-weight-light mt-3 mb-5">
                  Apply for the following post-secondary student financial assistance programs:
                </h6>

                <ul class="ml-6 mb-5">
                  <li class="font-weight-regular">Yukon Grant</li>
                  <li>Yukon Excellence Awards</li>
                  <li>Student Training Allowance</li>
                  <li>Canada Student Financial Assistance</li>
                </ul>

                <v-btn @click="signInClick" color="primary">Sign in</v-btn>

                <p class="mt-4 text-body-2">
                  New users can
                  <a style="cursor: pointer" @click="signUpClick">create an account</a>
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
                  <strong class="font-weight-medium">Classes starting on or after August 1, 2025</strong><br />
                  <span class="font-weight-thin"
                    >Applications for the 2025-26 academic year will be accepted starting June 16, 2025.</span
                  >
                </v-alert>

                <v-alert color="yg_zinc" theme="light" class="mt-6 signin-message">
                  <strong class="font-weight-medium">Already have an application?</strong><br />
                  <span class="font-weight-thin"
                    >You don't need to re-apply for the winter semester. Sign in and upload your new PIF.</span
                  ><br /><br />
                  <strong class="font-weight-medium">Haven't applied yet?</strong><br />
                  <span class="font-weight-thin">Please sign in to submit your application.</span>
                </v-alert>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <p class="mt-6">
          Students can apply through this online portal for the 2025-2026 academic year in English only. If you would
          like to apply in French, please contact <a href="mailto:sfa@yukon.ca">sfa@yukon.ca</a> to request a PDF French
          application form.
        </p>

        <p class="mt-6">
          Le service en ligne de demande d’aide financière pour l’année scolaire 2025-2026 n’est disponible qu’en
          anglais. Pour obtenir un formulaire en français (en format PDF), veuillez écrire à
          <a href="mailto:sfa@yukon.ca">sfa@yukon.ca</a>.
        </p>
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
      login();
    },
    signUpClick() {
      const { signUp } = useAuth0(AuthState);
      signUp();
    },
  },
};
</script>
