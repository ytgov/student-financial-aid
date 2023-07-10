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
    citizenship: new Array<any>(),
    incomeTypes: new Array<any>(),
    cities: new Array<any>(),
    provinces: new Array<any>(),
    countries: new Array<any>(),
    studyAreas: new Array<any>(),
    programs: new Array<any>(),
    agencies: new Array<any>(),
    expenseCategories: new Array<any>(),
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
      await this.loadCitizenship();
      await this.loadIncomeTypes();
      await this.loadProvinces();
      await this.loadCities();
      await this.loadCountries();
      await this.loadStudyAreas();
      await this.loadPrograms();
      await this.loadAgencies();
      await this.loadExpenseCategories();

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
        .secureCall("get", `${REFERENCE_URL}/education-level`)
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
          this.yukonHighSchools.unshift({ id: -1, name: "I did not attend a Yukon high school" });
        })
        .catch();
    },

    async loadMaritalStatus() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/marital-status`)
        .then((resp) => {
          this.maritalStatus = resp.data;
        })
        .catch();
    },

    async loadAboriginalStatus() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/aboriginal-status`)
        .then((resp) => {
          this.aboriginalStatus = resp.data;
        })
        .catch();
    },

    async loadCitizenship() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/citizenship`)
        .then((resp) => {
          this.citizenship = resp.data;
        })
        .catch();
    },

    async loadIncomeTypes() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/income-type`)
        .then((resp) => {
          this.incomeTypes = resp.data;
        })
        .catch();
    },

    async loadCities() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/city`)
        .then((resp) => {
          this.cities = resp.data;
        })
        .catch();
    },

    async loadProvinces() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/province`)
        .then((resp) => {
          this.provinces = resp.data;
        })
        .catch();
    },

    async loadCountries() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/country`)
        .then((resp) => {
          this.countries = resp.data;
        })
        .catch();
    },

    async loadStudyAreas() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/study-area`)
        .then((resp) => {
          this.studyAreas = resp.data;
        })
        .catch();
    },

    async loadPrograms() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/program`)
        .then((resp) => {
          this.programs = resp.data;
        })
        .catch();
    },

    async loadAgencies() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/agency`)
        .then((resp) => {
          this.agencies = resp.data;
        })
        .catch();
    },

    async loadExpenseCategories() {
      const api = useApiStore();

      api
        .secureCall("get", `${REFERENCE_URL}/expense-category`)
        .then((resp) => {
          this.expenseCategories = resp.data;
        })
        .catch();
    },
  },
});
