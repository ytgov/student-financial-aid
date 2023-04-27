import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [
      { type: "subheader", title: "March 4, 2023" },
      {
        id: "123",
        prependIcon: "mdi-email",
        title: "Academic Year 2023/24",
        date: "TESTING",
        subtitle: '<span class="text-primary">Amy Andison</span> &mdash; This application is approved!',
      },
      { type: "divider" },
      { type: "subheader", title: "April 19, 2021" },
      {
        id: "124",
        prependIcon: "mdi-email-open",
        title: "Academic Year 2023/24",
        subtitle: '<span class="text-primary">Shelly Wang</span> &mdash; That sounds fine. Please submit',
      },
      {
        id: "124",
        prependIcon: "mdi-email-open",
        title: "Academic Year 2023/24",
        subtitle: '<span class="text-primary">Shelly Wang</span> &mdash; We have a couple of questions...',
      },
    ],
  }),
  getters: {
    recentMessages(): Array<any> {
      return this.messages;
    },
  },
  actions: {},
});
