import { defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PROFILE_URL, USERS_URL } from "@/urls";

let m = useNotificationStore();

interface StudentState {
  student: Student;
  isLoading: Boolean;
}

export const useStudentStore = defineStore("student", {
  state: (): StudentState => ({
    student: {
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
  }),
  getters: {},
  actions: {
    save() {
      console.log("TRYING TO SVAE STUDENT", this.student);
    },
  },
});

export interface Student {
  sin: string;
  date_of_birth: string;
  home_phone: string;
  home_postal: string;
  email_address: string;
  first_name: string;
  last_name: string;
  portal_id: string;
}
