import { defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PROFILE_URL, STUDENT_URL } from "@/urls";
import { isArray } from "lodash";

//let m = useNotificationStore();

export const useUserStore = defineStore("user", {
  state: (): UserStore => ({
    isLoaded: false,
    user: undefined,
    student: undefined,
    lastLoaded: undefined,
    studentAddress: undefined,
  }),
  getters: {
    student_id(state) {
      return state.user?.student_id;
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
      await api.secureCall("get", PROFILE_URL).then((resp) => {
        this.isLoaded = true;
        this.lastLoaded = new Date();
        this.user = resp.data;
      });
    },
    async loadCurrentStudent() {
      let api = useApiStore();
      if (this.user) {
        await api.secureCall("get", `${STUDENT_URL}`).then((resp) => {
          this.student = resp.data;
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

    editStudent() {
      this.editStudent = this.student;
    },
  },
});

interface UserStore {
  isLoaded: boolean;
  user: User | undefined;
  student: any | undefined;
  lastLoaded: Date | undefined;
  studentAddress: string | undefined;
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
