import { defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PROFILE_URL, USERS_URL } from "@/urls";

let m = useNotificationStore();

interface OnboardingState {
  linkStudent: LinkStudent;
  createStudent: CreateStudent;
  isLoading: Boolean;
}

export const useOnboardingStore = defineStore("onboarding", {
  state: (): OnboardingState => ({
    linkStudent: {
      sin: "",
      date_of_birth: "",
      home_phone: "",
      home_postal: "",
      email_address: "",
      first_name: "",
      last_name: "",
      portal_id: "",
    },
    isLoading: false,
    createStudent: { first_name: "", last_name: "", sin: "", date_of_birth: "" },
  }),
  getters: {},
  actions: {
    tryCreateStudent() {
      console.log("TRYING TO CREATE STUDENT", this.createStudent);
    },
    tryLinkStudent() {
      console.log("TRYING TO LINK STUDENT", this.linkStudent);
    },
  },
});

export interface LinkStudent {
  sin: string;
  date_of_birth: string;
  home_phone: string;
  home_postal: string;
  email_address: string;
  first_name: string;
  last_name: string;
  portal_id: string;
}

export interface CreateStudent {
  first_name: string;
  last_name: string;
  sin: string;
  date_of_birth: string;
}
