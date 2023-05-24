import { acceptHMRUpdate, defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { APPLICATION_URL } from "@/urls";
import { useUserStore } from "@/store/UserStore";

import blankDraft from "./blank-draft.json";
import { clone, isUndefined } from "lodash";

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
    fileUpload: undefined as FileUpload | undefined,
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
      if (this.application && this.application.draft) {
        let s = this.application.draft.program_details;
        return (
          s.program_name.length > 0 &&
          s.institution_id &&
          s.year_entering &&
          s.start_date_of_classes &&
          s.end_date_of_classes &&
          s.duration_of_program
        );
      }
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
      if (this.application && this.application.draft) {
        let s = this.application.draft.personal_details;
        return (
          s.first_name.length > 0 && s.last_name.length > 0 && s.home_email && s.home_phone && s.sin && s.birth_date
        );
      }
      return false;
    },
    availableSectionPersonal(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionAddress(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.addresses;
        return (
          s.home_address1 &&
          s.home_address1.first &&
          s.home_address1.first.length > 0 &&
          s.home_address1.city &&
          s.home_address1.city.length > 0 &&
          s.home_address1.region &&
          s.home_address1.region.length > 0 &&
          s.home_address1.postal &&
          s.home_address1.postal.length > 5
        );
      }
      return false;
    },
    availableSectionAddress(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionStatistical(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.statistical;
        return s.language && s.gender && s.marital_status && s.citizenship && s.aboriginal_status;
      }
      return false;
    },
    availableSectionStatistical(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionConsent(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.consent;

        if (s.allow_others == false) {
          return true;
        } else {
          if (s.consents.length == 0) return false;

          for (let c of s.consents) {
            if (!(c.person && c.start_year && c.end_year)) return false;
          }
          return true;
        }
      }
      return false;
    },
    availableSectionConsent(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionResidency(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.residency;

        for (let c of s.residency_history) {
          if (!(c.start && c.end && c.city && c.province && c.country && c.in_school)) return false;
        }

        return true;
      }
      return false;
    },
    availableSectionResidency(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionEducation(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.education;

        if (!s.highest_education_level) return false;

        for (let c of s.education_history) {
          if (!(c.city && c.country && c.last_grade_completed && c.left_high_school && c.school)) return false;
        }
        return true;
      }
      return false;
    },
    availableSectionEducation(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionOtherFunding(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.other_funding;

        if (s.has_funding == false) {
          return true;
        } else {
          if (s.other_fundings.length == 0) return false;

          for (let c of s.other_fundings) {
            if (!(c.agency && c.amount && c.purposes)) return false;
            if (c.purposes.includes("Other") && !c.other) return false;
          }
          return true;
        }
      }
      return false;
    },
    availableSectionOtherFunding(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionStudentDependants(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.student_dependants;

        if (s.has_dependants == false) {
          return true;
        } else {
          s.dependants = s.dependants || [];
          if (s.dependants.length == 0) return false;

          for (let c of s.dependants) {
            if (
              !(
                c.first_name &&
                c.last_name &&
                c.dob &&
                c.relationship &&
                !isUndefined(c.shared_custody) &&
                !isUndefined(c.resides_with) &&
                !isUndefined(c.in_post_secondary)
              )
            )
              return false;
            if (c.shared_custody == true && !c.custody_details) return false;
          }
          return true;
        }
      }
      return false;
    },
    availableSectionStudentDependants(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionParents(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.parents;

        if (
          !(s.mailing_address.first && s.mailing_address.city && s.mailing_address.region && s.mailing_address.postal)
        )
          return false;

        if (!(s.parents[0].first_name && s.parents[0].last_name && s.parents[0].relationship && s.parents[0].sin))
          return false;

        return true;
      }
      return false;
    },
    availableSectionParents(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionParentDependants(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.parent_dependants;

        if (s.has_dependants == false) {
          return true;
        } else {
          s.dependants = s.dependants || [];
          if (s.dependants.length == 0) return false;

          for (let c of s.dependants) {
            if (!(c.first_name && c.last_name && c.dob && c.relationship)) return false;
          }
          return true;
        }
      }
      return false;
    },
    availableSectionParentDependants(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionSpouse(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.spouse;

        if (s.has_spouse == false) {
          return true;
        } else {
          if (!(s.first_name && s.last_name && s.sin && s.employment_status)) return false;

          return true;
        }
      }
      return false;
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
      if (this.application && this.application.draft) {
        let s = this.application.draft.csfa_accomodation;
        if (
          !(s.accomodations[0] && s.accomodations[0].living && s.accomodations[0].city && s.accomodations[0].province)
        )
          return false;

        if (["Living at Parents", "Both"].includes(s.accomodations[0].living) && !s.accomodations[0].rent_to_parents)
          return false;

        if (s.accomodations[0].bus_service == false && !s.accomodations[0].distinct_from_school) return false;

        if (
          !(s.accomodations[1] && s.accomodations[1].living && s.accomodations[1].city && s.accomodations[1].province)
        )
          return false;

        if (["Living at Parents", "Both"].includes(s.accomodations[1].living) && !s.accomodations[1].rent_to_parents)
          return false;

        if (s.accomodations[1].bus_service == false && !s.accomodations[1].distinct_from_school) return false;

        return true;
      }
      return false;
    },
    availableSectionCSFAAccomodation(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionCSFAIncome(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.csfa_income;

        if (s.has_income == false) {
          return true;
        } else {
          s.incomes = s.incomes || [];
          if (s.incomes.length == 0) return false;

          for (let c of s.incomes) {
            if (!(c.type && c.amount)) return false;
          }
          return true;
        }
      }
      return false;
    },
    availableSectionCSFAIncome(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionCSFAExpenses(): boolean {
      if (this.application && this.application.draft) {
        let s = this.application.draft.csfa_expenses;

        if (s.has_expenses == false) {
          return true;
        } else {
          s.expenses = s.expenses || [];
          if (s.expenses.length == 0) return false;

          for (let c of s.expenses) {
            if (!(c.type && c.amount)) return false;
          }
          return true;
        }
      }
      return false;
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

      if (userStore.student) {
        let newDraft = clone(blankDraft);

        let pd = {
          first_name: userStore.student.first_name,
          middle_name: userStore.student.initials,
          last_name: userStore.student.last_name,
          home_email: userStore.student.email,
          home_phone: userStore.student.telephone,
          birth_date: userStore.student.birth_date,
          sin: userStore.student.sin,
        };

        newDraft.personal_details = pd;
        (newDraft.program_details as any).year_entering = "2023";

        return api
          .secureCall("post", `${APPLICATION_URL}/${userStore.user?.sub}`, {
            academic_year_id: this.academic_year.id,
            student_id: userStore.student.id,
            is_active: true,
            create_date: new Date(),
            update_date: new Date(),
            application_json: JSON.stringify(newDraft),
          })
          .then((resp) => {
            return resp.data;
          })
          .catch((err) => {
            console.log("ERROR HAPPENED", err);
            return {};
          });
      }
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

interface FileUpload {
  to_upload: any;
  document_type: string;
}
