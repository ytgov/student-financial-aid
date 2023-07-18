<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="justify-center">
      <h1 class="mb-3 mt-2 text-h4">Hello {{ user?.preferred_username }}</h1>

      <h3 class="mb-3 text-h6" style="font-weight: 300">
        To sign in and use the Student Financial Assistance Portal, we must first know a little more about you.
      </h3>
      <v-card variant="outlined" style="border: 1px #f2a90088 solid; background-color: white">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <p class="mb-4">
                Before we begin, we need to know whether you have ever accessed any Student Financial Assistance
                programs in the Yukon.
              </p>
              <v-radio-group v-model="first_time">
                <v-radio label="Yes, I have applied for Student Financial Assistance in the Yukon" value="1"></v-radio>
                <v-radio
                  label="No, I have never applied for Student Financial Assistance in the Yukon"
                  value="0"
                ></v-radio>
              </v-radio-group>
              <v-divider class="mb-4"></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="first_time == '1'" color="primary" variant="flat" @click="step = 2"> Next </v-btn>
                <v-btn v-else color="primary" variant="flat" @click="step = 3"> Next </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <p class="mb-5">
                Now we need to link your new account to your existing student record. To do that, you must answer a few
                questions and we will do our best to link our account to the information we already know about you from
                your previous applications. Please answer as many of these as you can.
              </p>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="linkStudent.first_name"
                    label="First name"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="linkStudent.last_name"
                    label="Last name"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="linkStudent.sin"
                    label="SIN"
                    placeholder="999999999"
                    variant="outlined"
                    density="comfortable"
                    @update:model-value="sinChanged2"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <DateSelector v-model="linkStudent.date_of_birth" label="Date of birth" max="today" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="linkStudent.home_phone"
                    label="Home phone"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="linkStudent.home_postal"
                    label="Home postal code"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="linkStudent.email_address"
                    label="Email address"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="linkStudent.year_completed"
                    type="number"
                    min="1900"
                    max="2100"
                    label="Year completed high school"
                    variant="outlined"
                    density="comfortable"
                    hint=""
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-divider class="my-4"></v-divider>
              <v-card-actions>
                <v-btn variant="text" @click="step = 1"> Back </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="flat" @click="findMatchClick" :disabled="!linkIsValid"> Next </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card-text>
              <p class="mb-5">
                OK, let's get your account created. We will start with some basic information to setup your student
                record. After we get collect a few details, we can create your student record and you start your
                applications.
              </p>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="createStudent.first_name"
                    label="First name"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="createStudent.last_name"
                    label="Last name"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="createStudent.sin"
                    label="SIN"
                    placeholder="999999999"
                    variant="outlined"
                    density="comfortable"
                    @update:model-value="sinChanged"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <DateSelector v-model="createStudent.date_of_birth" label="Date of birth" max="today" />
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>

              <v-alert variant="tonal" type="error" v-if="showCreateError" class="mb-3">
                There is an error that is blocking the account from being created. Please contact the SFA office @
                867-667-5929 for assistance setting up your account.
              </v-alert>

              <v-card-actions>
                <v-btn variant="text" @click="step = 1"> Back </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" variant="flat" @click="createStudentClick" :disabled="!createIsValid">
                  Save my Details</v-btn
                >
              </v-card-actions>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="4">
            <v-card-text>
              <p style="font-size: 1.2em" class="mb-4">
                Sorry, we were unable to finding a matching student record given the details you entered.
              </p>
              <p class="mb-2">
                This step is required before you can use the portal to update your information or submit applications.
              </p>
              <p>
                You can go back and try again or contact the SFA office for additional assistance at
                <a href="mailto:sfa@yukon.ca">sfa@yukon.ca</a> or call
                <a href="tel: 8676675929"> (867) 667-5929</a> during regular business hours.
              </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn variant="text" @click="step = 2"> Back </v-btn>
            </v-card-actions>
          </v-window-item>

          <v-window-item :value="5">
            <v-card-text>
              <p style="font-size: 1.2em" class="mb-4">
                Excellent! We have located your existing student record and have successfully linked your new portal
                account.
              </p>
              <p>You can now proceed to the portal to see your previous applications or submit new ones.</p>

              <div class="mt-7 text-center mb-3">
                <v-btn color="success" size="large" to="/student">Take me to the portal</v-btn>
              </div>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="6">
            <v-card-text>
              <p style="font-size: 1.2em" class="mb-4">Excellent! We have created your student account.</p>
              <p>You can now proceed to the portal to complete your student record and submit applications.</p>

              <div class="mt-7 text-center mb-3">
                <v-btn color="success" size="large" to="/student">Take me to the portal</v-btn>
              </div>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useNotificationStore } from "@/store/NotificationStore";
import { useOnboardingStore } from "../store";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useUserStore } from "@/store/UserStore";
import DateSelector from "@/components/forms/DateSelector.vue";

export default {
  name: "Welcome",
  components: { DateSelector },
  data: () => ({
    step: 1,
    first_time: "1",
    showCreateError: false
  }),
  computed: {
    ...mapWritableState(useOnboardingStore, ["createStudent", "linkStudent"]),
    ...mapState(useOnboardingStore, ["createIsValid", "linkIsValid"]),
    ...mapState(useUserStore, ["user", "student"]),
    matchFound() {
      return this.linkStudent.sin.length > 0;
    }
  },
  async mounted() {
    if (this.user) {
      this.createStudent.first_name = this.user.given_name;
      this.createStudent.last_name = this.user.family_name;
      this.linkStudent.first_name = this.user.given_name;
      this.linkStudent.last_name = this.user.family_name;
    }

    if (this.student && this.student.id) {
      console.log("YOU have a student match already");
      this.$router.push("/student");
    } else {
      console.log("Allowing in to welcome");
    }
  },
  watch: {
    student(val) {
      console.log("STUDNET WATCH", val);
      if (val.id) {
        console.log("YOU have been onboarded already");
        this.$router.push("/student");
      }
    }
  },
  methods: {
    ...mapActions(useNotificationStore, ["notify"]),
    ...mapActions(useOnboardingStore, ["tryCreateStudent", "tryLinkStudent"]),
    ...mapActions(useUserStore, ["loadCurrentStudent"]),

    async findMatchClick() {
      if (this.user) {
        let result = await this.tryLinkStudent(this.user);

        if (result && result == true) {
          await this.loadCurrentStudent();
          this.step = 5;
        } else this.step = 4;
      }
    },

    async createStudentClick() {
      if (this.user) {
        this.showCreateError = false;
        let result = await this.tryCreateStudent(this.user).then(resp => resp);

        if (result && result.id) {
          await this.loadCurrentStudent();
          this.notify({ variant: "success", text: "Student record created" });
          this.step = 6;
        } else {
          this.notify({ variant: "error", text: "Student record not created" });
          this.showCreateError = true;
        }
      }
    },

    sinChanged(newV: any) {
      this.createStudent.sin = this.createStudent.sin.replace(/[^0-9.]/g, "").substring(0, 9);
    },
    sinChanged2(newV: any) {
      this.linkStudent.sin = this.linkStudent.sin.replace(/[^0-9.]/g, "").substring(0, 9);
    }
  }
};
</script>
