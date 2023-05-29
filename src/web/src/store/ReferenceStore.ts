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
    firstNations: new Array<any>(),
    studentCategories: new Array<any>(),
    yukonHighSchools: new Array<any>(),
    maritalStatus: new Array<any>(),
    aboriginalStatus: new Array<any>(),
  }),
  getters: {},
  actions: {
    async initialize() {
      if (this.isLoaded) {
        return;
      }

      console.log("Initializing reference store...");

      await this.loadInstitutions();
      //await this.loadEducationLevels();
      await this.loadRelationships();
      await this.loadFirstNations();
      await this.loadStudentCategories();
      await this.loadYukonHighSchools();
      await this.loadMaritalStatus();
      await this.loadAboriginalStatus();

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
    async loadFirstNations() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/first-nation`)
        .then((resp) => {
          this.firstNations = resp.data;
        })
        .catch();
    },
    async loadStudentCategories() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/student-category`)
        .then((resp) => {
          this.studentCategories = resp.data;
        })
        .catch();
    },
    async loadYukonHighSchools() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/high-school/3`)
        .then((resp) => {
          this.yukonHighSchools = resp.data;
          this.yukonHighSchools.push({ id: -1, name: "I did not attend a Yukon high school" });
        })
        .catch();
    },
    async loadMaritalStatus() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/marital_status`)
        .then((resp) => {
          this.maritalStatus = resp.data;
        })
        .catch();
    },
    async loadAboriginalStatus() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/aboriginal_status`)
        .then((resp) => {
          this.aboriginalStatus = resp.data;
        })
        .catch();
    },
  },
});
