import { defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PROFILE_URL, USERS_URL, STUDENT_URL } from "@/urls";
import { User } from "@/store/UserStore";

let m = useNotificationStore();
let api = useApiStore();

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
    createStudent: { first_name: "", last_name: "", sin: "", date_of_birth: "", email: "" },
  }),
  getters: {
    createIsValid(state) {
      if (
        state.createStudent.first_name.length < 1 ||
        state.createStudent.last_name.length < 1 ||
        state.createStudent.sin.length != 9 ||
        !state.createStudent.date_of_birth
      )
        return false;

      return true;
    },
    linkIsValid(state) {
      if (
        state.linkStudent.first_name.length < 1 ||
        state.linkStudent.last_name.length < 1 ||
        state.linkStudent.sin.length != 9 ||
        !state.linkStudent.date_of_birth
      )
        return false;

      return true;
    },
  },
  actions: {
    async tryCreateStudent(user: User) {
      this.createStudent.email = user.email;

      return api
        .secureCall("post", `${STUDENT_URL}/${user.sub}`, this.createStudent)
        .then((resp) => {
          return resp.data;
        })
        .catch((err) => {
          console.log("ERROR IN ", err.response.data);
        });
    },

    async tryLinkStudent(user: any): Promise<boolean> {
      return api
        .secureCall("post", `${STUDENT_URL}/${user.sub}/link`, this.linkStudent)
        .then((resp) => {
          return resp.data;
        })
        .catch((err) => {
          console.log("ERROR IN ", err.response.data);
          return false;
        });
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
  email: string;
}
