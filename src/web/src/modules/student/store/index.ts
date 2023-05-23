import { defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PORTAL_URL } from "@/urls";
import { clone } from "lodash";
import { useUserStore } from "@/store/UserStore";

let m = useNotificationStore();

interface StudentState {
  editStudent: Student | undefined;
  isLoading: Boolean;
}

export const useStudentStore = defineStore("student", {
  state: (): StudentState => ({
    editStudent: undefined,
    isLoading: false,
  }),
  getters: {},
  actions: {
    save() {
      let u = useUserStore();
      let api = useApiStore();

      api.secureCall("put", `${PORTAL_URL}`, this.editStudent).then(async (resp) => {
        await u.loadCurrentStudent();
        m.notify({ text: "Student saved", variant: "success" });

        this.doneEdit();
      });
    },
    edit() {
      let u = useUserStore();
      this.editStudent = clone(u.student);
    },
    doneEdit() {
      this.editStudent = undefined;
    },
  },
});

export interface Student {
  sin: string;
  birth_date: string;
  home_phone: string;
  home_postal: string;
  email: string;
  first_name: string;
  last_name: string;
  portal_id: string;
}
