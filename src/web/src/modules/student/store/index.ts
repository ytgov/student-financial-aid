import { defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PROFILE_URL, USERS_URL } from "@/urls";
import { clone } from "lodash";

let m = useNotificationStore();

interface StudentState {
  student: any;
  editStudent: Student | undefined;
  isLoading: Boolean;
}

export const useStudentStore = defineStore("student", {
  state: (): StudentState => ({
    student: {
      sin: "",
      date_of_birth: "",
      home_phone: "",
      home_postal: "",
      email: "",
      first_name: "",
      last_name: "",
      portal_id: "",
    },
    editStudent: undefined,
    isLoading: false,
  }),
  getters: {},
  actions: {
    save() {
      this.student = this.editStudent || this.student;
      console.log("TRYING TO SVAE STUDENT", this.student);
      this.doneEdit();
    },
    edit() {
      this.editStudent = clone(this.student);
    },
    doneEdit() {
      this.editStudent = undefined;
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
