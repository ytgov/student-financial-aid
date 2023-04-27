import { defineStore } from "pinia";

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
    funding_sources: new Array<string>(),
    selectedApplication: {
      id: 12345,
      fiscal_year: "2023/24",
    },
  }),
  getters: {
    relevantSections() {
      let list = [
        {
          name: "Introduction",
          uri: "/application/program-details",
        },
        {
          name: "Program Details",
          uri: "/application/program-details",
        },
        {
          name: "Funding Sources",
          uri: "/application/onboarding/funding-sources",
          is_complete: true,
        },
        {
          name: "Personal Details",
          uri: "/application/onboarding/personal-details",
          is_complete: true,
        },
        {
          name: "Addresses",
          uri: "/application/onboarding/addresses",
          is_complete: true,
        },
        {
          name: "Statistical Information",
          uri: "/application/onboarding/statistical",
        },
        {
          name: "Consent Release",
          uri: "/application/onboarding/consent-release",
        },
        {
          name: "Residency",
          uri: "/application/onboarding/residency-history",
        },
        {
          name: "Education History",
          uri: "/application/onboarding/education-history",
        },
        {
          name: "Other Funding",
          uri: "/application/onboarding/other-funding",
        },
        {
          name: "Student Dependents",
          uri: "/application/onboarding/dependants",
        },
        /*
          {
            name: 'CSFA Study Period',
            uri: '/application/onboarding/csfa'
          },
          */
        {
          name: "CSFA Accomodation",
          uri: "/application/onboarding/csfa-accomodation",
        },
        /*
          {
            name: 'CSFA Employment',
            uri: '/application/onboarding/csfa-employment'
          },
          */

        {
          name: "CSFA Income",
          uri: "/application/onboarding/csfa-income",
        },
        {
          name: "CSFA Expenses",
          uri: "/application/onboarding/csfa-expenses",
        },
        {
          name: "Parents",
          uri: "/application/onboarding/parents",
        },
        {
          name: "Parent Dependants",
          uri: "/application/onboarding/parent-dependants",
        },
        {
          name: "Spouse",
          uri: "/application/onboarding/spouse",
          relevantTo: ["Canada"],
        },
        {
          name: "Documents",
          uri: "/application/documents",
        },
        {
          name: "Submit",
          uri: "/application/submit",
          relevantTo: ["Canada"],
        },
      ];

      if (this.funding_sources.indexOf("Canada") == -1) list = list.filter((i) => !i.name.startsWith("CSFA"));

      console.log(list.length);

      return list;
    },
  },
  actions: {
    create() {
      console.log("Creating aplicaiton for", ss.student);

      api.secureCall("post", APPLICATION_URL, {
        academic_year: "2023/24",
        student_id: ss.student.portal_id,
      }).then(resp => {
        console.log(resp.response.data)
      })
      .catch(err => {
        console.log("ERROR HAPPENED", err)
      })
    },
  },
});
