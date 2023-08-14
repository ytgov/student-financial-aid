import { useApiStore } from "@/store/ApiStore";
import { useNotificationStore } from "@/store/NotificationStore";
import { useUserStore } from "@/store/UserStore";
import { APPLICATION_URL } from "@/urls";
import { defineStore } from "pinia";

let m = useNotificationStore();

export const useApplicationStore = defineStore("application", {
  state: () => ({
    isLoading: false,
    academic_year: {
      id: 2023,
      year: "2023",
    },
    application: undefined as any,
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
  },
});
