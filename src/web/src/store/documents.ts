import { defineStore } from "pinia";
import { find } from "lodash";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";

//let m = useNotificationStore();

export const useDocumentStore = defineStore("document", {
  state: () => ({
    list: [
      {
        date: "2020/21",
        name: {
          en: "High School Transcript",
          fr: "Relevé de notes du secondaire",
        },
        status: "VERIFIED",
        resource: "2020-high-school-transcript",
      },
      {
        date: "2020/21",
        name: {
          en: "Letter of Acceptance",
          fr: "Lettre d'acceptation",
        },
        status: "UPLOADING",
        resource: "2020-letter-of-acceptance",
      },
      {
        date: "2020/21",
        name: {
          en: "Spouse Income Tax (2018)",
          fr: "Impôt sur le revenu du conjoint (2018)",
        },
        status: "PENDING",
        resource: "2018-spouse-income-tax",
      },
      {
        date: "2020/21",
        name: {
          en: "Student Income Tax (2018)",
          fr: "Impôt sur le revenu des étudiants (2018)",
        },
        status: "PENDING",
        resource: "2018-student-income-tax",
      },
    ],
  }),
  getters: {
    list(state) {
      return state.list;
    },
    by_resource: (state) => (resource: any) => {
      return find(state.list, { resource });
    },
  },
  actions: {
    async init() {
      let api = useApiStore();
      let { data } = await api.secureCall("get", "/SfaDocumentLinks", { student_id: 2 });
      this.list = data;
    },
    create(values: any) {
      let api = useApiStore();

      return api
        .secureCall("post", "/SfaDocumentLinks", { values })
        .then((response) => response)
        .catch((error) => {
          console.error(error);
        });
    },
    update(id: number, values: any) {
      let api = useApiStore();
      return api
        .secureCall("put", `/SfaDocumentLinks/${id}`, { values })
        .then((response) => {
          response;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    delete(app: any, id: any) {
      let api = useApiStore();
      return api
        .secureCall("delete", `/SfaDocumentLinks/${id}`)
        .then((response) => {})
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
