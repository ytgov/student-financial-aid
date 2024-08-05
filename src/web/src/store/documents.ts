import { defineStore } from "pinia";
import { find } from "lodash";

import { useApiStore } from "@/store/ApiStore";

//let m = useNotificationStore();

export const useDocumentStore = defineStore("document", {
  state: () => ({
    list: [],
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
