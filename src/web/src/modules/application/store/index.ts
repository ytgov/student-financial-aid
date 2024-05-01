import { useApiStore } from "@/store/ApiStore";
import { useNotificationStore } from "@/store/NotificationStore";
import { useUserStore } from "@/store/UserStore";
import { APPLICATION_URL } from "@/urls";
import { defineStore } from "pinia";

let m = useNotificationStore();

export const useApplicationStore = defineStore("application", {
  state: () => ({
    isLoading: false,
    application: undefined as any,
    letters: undefined as any[] | undefined,
    documents: undefined as any[] | undefined,
  }),
  getters: {},

  actions: {
    async loadApplication(applicationId: number): Promise<void> {
      let userStore = useUserStore();
      const api = useApiStore();

      return api
        .secureCall("get", `${APPLICATION_URL}/${userStore.user?.sub}/application/${applicationId}`)
        .then((resp) => {
          this.application = resp.data;
        })
        .catch((err) => {
          console.log("ERROR HAPPENED", err);
        })
        .finally(() => {
          Promise.resolve();
        });
    },

    async loadLetters(applicationId: number) {
      let userStore = useUserStore();
      const api = useApiStore();

      return api
        .secureCall("get", `${APPLICATION_URL}/${userStore.user?.sub}/application/${applicationId}/letters`)
        .then((resp) => {
          this.letters = resp.data;
        })
        .catch((err) => {
          console.log("ERROR HAPPENED", err);
        })
        .finally(() => {
          Promise.resolve();
        });
    },

    async loadDocuments(applicationId: number) {
      let userStore = useUserStore();
      const api = useApiStore();

      return api
        .secureCall("get", `${APPLICATION_URL}/${userStore.user?.sub}/application/${applicationId}/documents`)
        .then((resp) => {
          this.documents = resp.data;
        })
        .catch((err) => {
          console.log("ERROR HAPPENED", err);
        })
        .finally(() => {
          Promise.resolve();
        });
    },

    async downloadLetter(applicationId: number, letter: any) {
      let userStore = useUserStore();
      const api = useApiStore();

      return api
        .secureCall(
          "get",
          `${APPLICATION_URL}/${userStore.user?.sub}/application/${applicationId}/files/${letter.object_key}`,
          undefined,
          { responseType: "blob" }
        )
        .then((resp) => {
          return resp;
        })
        .catch((err) => {
          console.log("ERROR HAPPENED", err);
        })
        .finally(() => {
          Promise.resolve();
        });
    },
  },
});
