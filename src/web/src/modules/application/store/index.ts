import { acceptHMRUpdate, defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { APPLICATION_URL } from "@/urls";
import { useStudentStore } from "@/modules/student/store";

let m = useNotificationStore();
let ss = useStudentStore();
const api = useApiStore();

export const useApplicationStore = defineStore("application", {
  state: () => ({
    isLoading: false,
    myApplications: [
      {
        id: 12345,
        status: "In Progress",
        academic_year: "2023/24",
        last_saved_date: "2023/04/23 @ 9:32pm",
        description:
          "This application has not yet been submitted. Please complete it before May 31, 2023 to be eligible for all funding programs.",
      },
      {
        id: 123,
        status: "Completed",
        academic_year: "2022/23",
        last_saved_date: "2023/04/23 @ 8:02am",
        description: "This application was submitted on May 19, 2022 and approved on May 23, 2022.",
      },
      {
        id: 124,
        status: "Cancelled",
        academic_year: "2022/23",
        last_saved_date: "2023/04/23 @ 7:56pm",
        description: "This application was cancelled by the student on May 18, 2022.",
      },
      {
        id: 125,
        status: "Completed",
        academic_year: "2021/22",
        last_saved_date: "2021/04/19 @ 2:19pm",
        description: "This application was submitted on May 16, 2021 and approved on May 25, 2021.",
      },
    ],
    application: {
      id: 12345,
      student_id: 123,
      academic_year: "2023/24",
      terms_agree: false,
      last_saved: "2023/04/12 @ 2:45pm",
      funding_sources: new Array<string>(),
      program_details: {
        institution: {
          id: 1,
          program_name: "",
          duration_of_program: "",
          year_entering: "",
          start_date_of_classes: "",
          end_date_of_classes: "",
        },
      },
    },
  }),
  getters: {
    relevantSections(): any[] {
      let app = this.application;

      let list = [
        {
          name: "Terms",
          uri: `/application/${app.id}`,
          is_complete: this.completeSectionTerms,
        },
        {
          name: "Program Details",
          uri: `/application/${app.id}/program-details`,
          is_complete: this.completeSectionProgram,
          disabled: !this.availableSectionProgram,
        },
        {
          name: "Funding Sources",
          uri: `/application/${app.id}/funding-sources`,
          is_complete: this.completeSectionFunding,
          disabled: !this.availableSectionFunding,
        },
        {
          name: "Personal Details",
          uri: `/application/${app.id}/personal-details`,
          is_complete: this.completeSectionPersonal,
          disabled: !this.availableSectionPersonal,
        },
        {
          name: "Addresses",
          uri: `/application/${app.id}/addresses`,
          is_complete: true,
        },
        {
          name: "Statistical Information",
          uri: `/application/${app.id}/statistical`,
        },
        {
          name: "Consent Release",
          uri: `/application/${app.id}/consent-release`,
        },
        {
          name: "Residency",
          uri: `/application/${app.id}/residency-history`,
        },
        {
          name: "Education History",
          uri: `/application/${app.id}/education-history`,
        },
        {
          name: "Other Funding",
          uri: `/application/${app.id}/other-funding`,
        },
        {
          name: "Student Dependents",
          uri: `/application/${app.id}/dependants`,
        },
        /*
          {
            name: 'CSFA Study Period',
            uri: '/application/csfa'
          },
          */
        {
          name: "CSFA Accomodation",
          uri: `/application/${app.id}/csfa-accomodation`,
        },
        /*
          {
            name: 'CSFA Employment',
            uri: '/application/csfa-employment'
          },
          */

        {
          name: "CSFA Income",
          uri: `/application/${app.id}/csfa-income`,
        },
        {
          name: "CSFA Expenses",
          uri: `/application/${app.id}/csfa-expenses`,
        },
        {
          name: "Parents",
          uri: `/application/${app.id}/parents`,
        },
        {
          name: "Parent Dependants",
          uri: `/application/${app.id}/parent-dependants`,
        },
        {
          name: "Spouse",
          uri: `/application/${app.id}/spouse`,
          relevantTo: ["Canada"],
        },
        {
          name: "Documents",
          uri: `/application/${app.id}/documents`,
        },
        {
          name: "Review and Submit",
          uri: `/application/${app.id}/submit`,
          relevantTo: ["Canada"],
        },
      ];

      if (this.application.funding_sources.indexOf("Canada") == -1)
        list = list.filter((i) => !i.name.startsWith("CSFA"));

      return list;
    },

    completeSectionTerms(): boolean {
      return this.application.terms_agree;
    },
    availableSectionTerms(): boolean {
      return this.completeSectionTerms;
    },

    completeSectionProgram(): boolean {
      return this.application.program_details.institution.program_name.length > 0;
    },
    availableSectionProgram(): boolean {
      return this.completeSectionTerms;
    },
    completeSectionFunding(): boolean {
      return this.application.funding_sources && this.application.funding_sources.length > 0;
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
  },
  actions: {
    async create(): Promise<any> {
      console.log("Creating aplicaiton for", ss.student);

      return api
        .secureCall("post", APPLICATION_URL, {
          academic_year: "2023/24",
          student_id: ss.student.portal_id,
        })
        .then((resp) => {
          console.log(resp.response.data);
          return { id: 2223 };
        })
        .catch((err) => {
          console.log("ERROR HAPPENED", err);
          return { id: 3334 };
        });
    },
    getNext(current: string): string {
      if (current == "terms") return `/application/${this.application.id}/program-details`;
      if (current == "program") return `/application/${this.application.id}/funding-sources`;
      if (current == "funding") return `/application/${this.application.id}/personal-details`;
      return "";
    },
  },
});

// hot reloading for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApplicationStore, import.meta.hot));
}
