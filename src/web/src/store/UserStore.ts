import { defineStore } from "pinia";
import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PROFILE_URL, STUDENT_URL } from "@/urls";
import { isArray } from "lodash";

export const useUserStore = defineStore("user", {
  state: (): UserStore => ({
    isLoaded: false,
    user: undefined,
    student: undefined,
    lastLoaded: undefined,
    feedback: undefined,
    feedbackVisible: false,
    contactInfo: undefined,
    addresses: new Array<any>(),
    currentAcademicYear: 2023,
  }),
  getters: {
    student_id(state) {
      return state.user?.student_id;
    },
    studentAddress(state) {
      if (state.contactInfo && state.contactInfo.address_display) {
        return state.contactInfo.address_display;
      }
      return "";
    },
  },
  actions: {
    async initialize() {
      if (this.isLoaded) {
        return;
      }

      console.log("Initializing user store...");

      await this.loadCurrentUser();
      await this.loadCurrentStudent();

      console.log("Initialized user store");
    },
    async loadCurrentUser() {
      let api = useApiStore();
      await api
        .secureCall("get", PROFILE_URL)
        .then((resp) => {
          this.isLoaded = true;
          this.lastLoaded = new Date();
          this.user = resp.data;
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    },
    async loadCurrentStudent() {
      let api = useApiStore();
      if (this.user) {
        await api.secureCall("get", `${STUDENT_URL}`).then(async (resp) => {
          this.student = resp.data;

          if (this.student) {
            this.contactInfo = {
              email: this.student.email,
              telephone: this.student.telephone,
              address: {},
            };

            await this.loadAddresses();
          }
        });
      } else {
        this.student = undefined;
      }
    },
    async isAuthenticated(doCheck = true): Promise<boolean> {
      let that = this;

      return new Promise(async (resolve, reject) => {
        if (this.user && this.user.sub) {
          resolve(true);
          return;
        }

        if (!doCheck) {
          resolve(false);
          return;
        }

        that.$subscribe((mutation, state) => {
          let event = isArray(mutation.events) ? mutation.events[0] : mutation.events;

          if (event && mutation.storeId == "user" && event.key == "user" && event.newValue && event.newValue.sub) {
            resolve(true);
          } else resolve(false);
        });

        await this.initialize();
      });
    },

    loadAddresses() {
      let u = useUserStore();
      let user = u.user;

      const api = useApiStore();

      api
        .secureCall("get", `${STUDENT_URL}/${user?.sub}/addresses`)
        .then((resp) => {
          this.addresses = resp.data;
          let address = {};
          let address_display = "";

          if (this.addresses && this.addresses.length > 0) {
            let homeAddresses = this.addresses.filter((a) => a.address_type_id == 1);
            if (homeAddresses.length > 0)
              address = {
                id: homeAddresses[0].id,
                address_type_id: homeAddresses[0].address_type_id,
                first: homeAddresses[0].address1,
                second: homeAddresses[0].address2,
                city: homeAddresses[0].city_id,
                region: homeAddresses[0].province_id,
                postal: homeAddresses[0].postal_code,
              };
            address_display = homeAddresses[0].address_display;
          }

          if (this.contactInfo) {
            this.contactInfo.address = address;
            this.contactInfo.address_display = address_display;
          }
        })
        .catch();
    },

    editStudentContactInfo() {},

    saveStudentContactInfo() {
      if (this.contactInfo) {
        const api = useApiStore();
        const m = useNotificationStore();

        return api
          .secureCall("put", `${STUDENT_URL}/${this.user?.sub}`, this.contactInfo)
          .then((resp) => {
            m.notify({ text: "Contact Information Saved", variant: "success" });
            this.loadCurrentStudent();
            return resp.data;
          })
          .catch((err) => {
            console.log("ERROR HAPPENED", err);
            return {};
          });
      }
    },

    showFeedback() {
      this.feedback = { date: new Date(), text: "" };
      this.feedbackVisible = true;
    },
    closeFeedback() {
      this.feedback = undefined;
      this.feedbackVisible = false;
    },
    async sendFeedback() {
      this.feedback.date = new Date();
      this.feedback.url = window.location.href;

      let api = useApiStore();
      let m = useNotificationStore();

      await api.secureCall("post", `${STUDENT_URL}/feedback`, this.feedback).then((resp) => {
        this.student = resp.data;
        this.closeFeedback();
        m.notify({ variant: "success", text: "Thank you for your feedback" });
      });
    },
  },
});

interface UserStore {
  isLoaded: boolean;
  user: User | undefined;
  student: any | undefined;
  lastLoaded: Date | undefined;
  feedback: any | undefined;
  feedbackVisible: boolean;
  contactInfo: { email: string; telephone: string; address: any; address_display?: string } | undefined;
  addresses: any[];
  currentAcademicYear: number;
}

export interface User {
  birthdate: string; // "N/A";
  email: string; // "michael@icefoganalytics.com";
  email_verified: boolean; // true;
  family_name: string; // "Johnson";
  gender: string; // "N/A";
  given_name: string; // "Michael";
  middle_name: string; // "Unknown";
  name: string; // "Michael Johnson";
  preferred_username: string; // "Michael Johnson";
  sid: string; // "dc475c53-d839-4537-8874-8d487e33b586";
  sub: string; // "6b21cd73-7aa5-4542-8f0e-2b39e49c8f9f";
  student_id?: number;
}
interface Student {
  id: number;
}
