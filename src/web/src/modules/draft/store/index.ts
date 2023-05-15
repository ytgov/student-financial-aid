import { acceptHMRUpdate, defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { APPLICATION_URL } from "@/urls";
import { useUserStore } from "@/store/UserStore";

import blankDraft from "./blank-draft.json";

let m = useNotificationStore();

export const useDraftStore = defineStore("draft", {
  state: () => ({
    isLoading: false,
    academic_year: {
      id: 2023,
      year: "2023",
    },
    myApplications: new Array<any>(),
    application: undefined as Draft | undefined,
  }),
  getters: {
    relevantSections(): any[] {
      let app = this.application;

      if (!app) return [];

      let list = [
        {
          name: "Terms",
          uri: `/draft/${app.id}`,
          is_complete: this.completeSectionTerms,
        },
        {
          name: "Program Details",
          uri: `/draft/${app.id}/program-details`,
          is_complete: this.completeSectionProgram,
          disabled: !this.availableSectionProgram,
        },
        {
          name: "Funding Sources",
          uri: `/draft/${app.id}/funding-sources`,
          is_complete: this.completeSectionFunding,
          disabled: !this.availableSectionFunding,
        },
        {
          name: "Personal Details",
          uri: `/draft/${app.id}/personal-details`,
          is_complete: this.completeSectionPersonal,
          disabled: !this.availableSectionPersonal,
        },
        {
          name: "Addresses",
          uri: `/draft/${app.id}/addresses`,
          is_complete: this.completeSectionAddress,
          disabled: !this.availableSectionAddress,
        },
        {
          name: "Statistical Information",
          uri: `/draft/${app.id}/statistical`,
          is_complete: this.completeSectionStatistical,
          disabled: !this.availableSectionStatistical,
        },
        {
          name: "Consent Release",
          uri: `/draft/${app.id}/consent-release`,
          is_complete: this.completeSectionConsent,
          disabled: !this.availableSectionConsent,
        },
        {
          name: "Residency",
          uri: `/draft/${app.id}/residency-history`,
          is_complete: this.completeSectionResidency,
          disabled: !this.availableSectionResidency,
        },
        {
          name: "Education History",
          uri: `/draft/${app.id}/education-history`,
          is_complete: this.completeSectionEducation,
          disabled: !this.availableSectionEducation,
        },
        {
          name: "Other Funding",
          uri: `/draft/${app.id}/other-funding`,
          is_complete: this.completeSectionOtherFunding,
          disabled: !this.availableSectionOtherFunding,
        },
        {
          name: "Student Dependants",
          uri: `/draft/${app.id}/dependants`,
          is_complete: this.completeSectionStudentDependants,
          disabled: !this.availableSectionStudentDependants,
        },
        /*
          {
            name: 'CSFA Study Period',
            uri: '/draft/csfa'
          is_complete: this. ,
          disabled: !this
          },
          */
        {
          name: "CSFA Accomodation",
          uri: `/draft/${app.id}/csfa-accomodation`,
          is_complete: this.completeSectionCSFAAccomodation,
          disabled: !this.availableSectionCSFAAccomodation,
        },
        /*
          {
            name: 'CSFA Employment',
            uri: '/draft/csfa-employment'
          is_complete: this. ,
          disabled: !this
          },
          */

        {
          name: "CSFA Income",
          uri: `/draft/${app.id}/csfa-income`,
          is_complete: this.completeSectionCSFAIncome,
          disabled: !this.availableSectionCSFAIncome,
        },
        {
          name: "CSFA Expenses",
          uri: `/draft/${app.id}/csfa-expenses`,
          is_complete: this.completeSectionCSFAExpenses,
          disabled: !this.availableSectionCSFAExpenses,
        },
        {
          name: "Parents",
          uri: `/draft/${app.id}/parents`,
          is_complete: this.completeSectionParents,
          disabled: !this.availableSectionParents,
        },
        {
          name: "Parent Dependants",
          uri: `/draft/${app.id}/parent-dependants`,
          is_complete: this.completeSectionParentDependants,
          disabled: !this.availableSectionParentDependants,
        },
        {
          name: "Spouse",
          uri: `/draft/${app.id}/spouse`,
          relevantTo: ["Canada"],
          is_complete: this.completeSectionSpouse,
          disabled: !this.availableSectionSpouse,
        },
        {
          name: "Documents",
          uri: `/draft/${app.id}/documents`,
          is_complete: this.completeSectionDocuments,
          disabled: !this.availableSectionDocuments,
        },
        {
          name: "Review and Submit",
          uri: `/draft/${app.id}/submit`,
          relevantTo: ["Canada"],
          disabled: !this.availableSectionSubmit,
        },
      ];

      if (this.application?.draft.funding_sources.indexOf("Canada") == -1)
        list = list.filter((i) => !i.name.startsWith("CSFA"));

      return list;
    },

    completeSectionTerms(): boolean {
      return this.application?.draft.terms_agree;
    },
    availableSectionTerms(): boolean {
      return this.completeSectionTerms;
    },
    completeSectionProgram(): boolean {
      if (this.application && this.application.draft)
        return this.application.draft.program_details.program_name.length > 0;
      return false;
    },
    availableSectionProgram(): boolean {
      return this.completeSectionTerms;
    },
    completeSectionFunding(): boolean {
      return this.application?.draft.funding_sources && this.application?.draft.funding_sources.length > 0;
    },
    availableSectionFunding(): boolean {
      return this.completeSectionTerms;
    },
    completeSectionPersonal(): boolean {
      return true;
    },
    availableSectionPersonal(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionAddress(): boolean {
      return true;
    },
    availableSectionAddress(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionStatistical(): boolean {
      return true;
    },
    availableSectionStatistical(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionConsent(): boolean {
      return true;
    },
    availableSectionConsent(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionResidency(): boolean {
      return true;
    },
    availableSectionResidency(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionEducation(): boolean {
      return true;
    },
    availableSectionEducation(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionOtherFunding(): boolean {
      return true;
    },
    availableSectionOtherFunding(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionStudentDependants(): boolean {
      return true;
    },
    availableSectionStudentDependants(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionParents(): boolean {
      return true;
    },
    availableSectionParents(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionParentDependants(): boolean {
      return true;
    },
    availableSectionParentDependants(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionSpouse(): boolean {
      return true;
    },
    availableSectionSpouse(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionDocuments(): boolean {
      return true;
    },
    availableSectionDocuments(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionCSFAAccomodation(): boolean {
      return true;
    },
    availableSectionCSFAAccomodation(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionCSFAIncome(): boolean {
      return true;
    },
    availableSectionCSFAIncome(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionCSFAExpenses(): boolean {
      return true;
    },
    availableSectionCSFAExpenses(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionSubmit(): boolean {
      return false;
    },
    availableSectionSubmit(): boolean {
      return this.completeSectionTerms;
    },

    requiredDocuments(): any[] {
      return [
        {
          type: "Transcript",
          description: "Transcript",
          file_name: "MJ File of files.pdf",
          status: "Missing",
        },
        {
          type: "Transcript",
          description: "Transcript",
          status: "Missing",
        },
        {
          type: "Transcript",
          description: "Transcript",
          status: "Missing",
        },
        {
          type: "Transcript",
          description: "Transcript",
          status: "Verified",
        },
      ];
    },
  },
  actions: {
    async loadApplications(): Promise<void> {
      let userStore = useUserStore();
      const api = useApiStore();

      return api
        .secureCall("get", `${APPLICATION_URL}/${userStore.user?.sub}`)
        .then((resp) => {
          this.myApplications = resp.data;
        })
        .catch((err) => {
          console.log("ERROR HAPPENED", err);
        })
        .finally(() => {
          Promise.resolve();
        });
    },

    selectDraftById(id: number) {
      if (!this.application || this.application.id != id) {
        let match = this.myApplications.filter((a) => a.id == id);

        if (match.length == 1) {
          let app = match[0];
          if (app.application_json) {
            this.application = { ...app, draft: JSON.parse(app.application_json) };

            if (this.application) delete this.application.application_json;
          } else this.application = app;
        }
      }
    },

    selectDraft(app: any) {
      if (!this.application || this.application.id != app.id) {
        if (app.application_json) this.application = { ...app, draft: JSON.parse(app.application_json) };
        else this.application = app;
      }
    },

    async create(): Promise<any> {
      let userStore = useUserStore();
      const api = useApiStore();

      return api
        .secureCall("post", `${APPLICATION_URL}/${userStore.user?.sub}`, {
          academic_year_id: this.academic_year.id,
          student_id: userStore.student.id,
          is_active: true,
          create_date: new Date(),
          update_date: new Date(),
          application_json: JSON.stringify(blankDraft),
        })
        .then((resp) => {
          return resp.data;
        })
        .catch((err) => {
          console.log("ERROR HAPPENED", err);
          return {};
        });
    },

    async save(): Promise<any> {
      if (this.application) {
        const api = useApiStore();
        const userStore = useUserStore();

        return api
          .secureCall("put", `${APPLICATION_URL}/${userStore.user?.sub}/${this.application.id}`, {
            academic_year_id: this.academic_year.id,
            student_id: userStore.student.id,
            application_json: JSON.stringify(this.application.draft),
            is_active: true,
            create_date: new Date(),
            update_date: new Date(),
          })
          .then((resp) => {
            m.notify({ text: "Application Saved", variant: "success" });
            return resp.data;
          })
          .catch((err) => {
            console.log("ERROR HAPPENED", err);
            return {};
          });
      }
    },

    async upload(file: any): Promise<any> {
      if (this.application) {
        const api = useApiStore();
        const userStore = useUserStore();

        return api
          .secureCall("post", `${APPLICATION_URL}/${userStore.user?.sub}/${this.application.id}/upload`, { file })
          .then((resp) => {
            return resp.data;
          })
          .catch((err) => {
            console.log("ERROR HAPPENED", err);
            return {};
          });
      }
    },

    resume(current: string = ""): string {
      if (this.application) {
        if (current) return this.getNext(current);

        for (let sect of this.relevantSections) {
          if (!sect.is_complete) return sect.uri;
        }

        return `/draft/${this.application.id}`;
      }

      return "";
    },

    getNext(current: string): string {
      if (!this.application) return "";

      for (let i = 0; i < this.relevantSections.length; i++) {
        let sect = this.relevantSections[i];
        if (current == sect.name) return this.relevantSections[i + 1].uri;
      }
      return "";
    },

    getPrevious(current: string): string {
      if (!this.application) return "";

      for (let i = 0; i < this.relevantSections.length; i++) {
        let sect = this.relevantSections[i];
        if (current == sect.name) return this.relevantSections[i - 1].uri;
      }
      return "";
    },
  },
});

// hot reloading for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDraftStore, import.meta.hot));
}

interface Draft {
  id: number;
  student_id: number;
  academic_year_id: number;
  is_active: boolean;
  create_date: Date;
  update_date: Date;
  last_saved: string;
  application_json?: string;
  draft: any;
}
