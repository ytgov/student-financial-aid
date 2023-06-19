import { defineStore } from "pinia";

export const useAnnouncementStore = defineStore("announcement", {
  state: () => ({
    announcements: [
     /*  {
        title: "Academic Year 2023/24",
        description:
          "Run though this quick tool to check your eligibility for our various programs and see what funding you qualify for this year.",
        type: "info",
        action: "Check My Eligibility",
        action_link: "/eligibility-checker",
      }, */
     /*  {
        title: "Houston, we have a problem",
        description:
          "Your application is seriously late.",
        type: "warning",
        action: "",
        action_link: "/eligibility-checker",
      }, */
    ],
  }),
  getters: {},
  actions: {},
});
