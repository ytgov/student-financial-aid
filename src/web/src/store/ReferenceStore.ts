import { defineStore } from "pinia";

import { useApiStore } from "@/store/ApiStore";
import { REFERENCE_URL } from "@/urls";

//let m = useNotificationStore();

export const useReferenceStore = defineStore("reference", {
  state: () => ({
    isLoaded: false,
    institutions: new Array<any>(),
    educationLevels: new Array<any>(),
    relationships: new Array<any>(),
  }),
  getters: {},
  actions: {
    async initialize() {
      if (this.isLoaded) {
        return;
      }

      console.log("Initializing reference store...");

      await this.loadInstitutions();
      await this.loadEducationLevels();
      await this.loadRelationships();

      console.log("Initialized reference store");
    },
    async loadInstitutions() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/institution`)
        .then((resp) => {
          this.institutions = resp.data;
        })
        .catch();
    },

    async loadEducationLevels() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/education_level`)
        .then((resp) => {
          this.educationLevels = resp.data;
        })
        .catch();
    },
    async loadRelationships() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/relationship`)
        .then((resp) => {
          this.relationships = resp.data;
        })
        .catch();
    },
  },
});
