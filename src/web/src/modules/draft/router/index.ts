const routes = [
  {
    path: "draft",
    component: () => import("@/layouts/Default.vue"),
    meta: { auth: true },
    children: [
      {
        path: ":draftId/",
        component: () => import("../views/navigation.vue"),
        children: [
          {
            path: "",
            component: () => import("../views/terms.vue"),
          },
          {
            path: "details",
            component: () => import("../views/details.vue"),
          },
          {
            path: "documents/",
            component: () => import("../views/documents.vue"),
            children: [
              {
                path: "resource",
                component: () => import("../views/documents-item.vue"),
              },
            ],
          },
          {
            path: "program-details",
            component: () => import("../views/program-details.vue"),
          },
          {
            path: "submit",
            component: () => import("../views/submit.vue"),
          },
          {
            path: "funding-sources",
            component: () => import("../views/funding-sources.vue"),
          },
          {
            path: "student-details",
            component: () => import("../views/personal-details.vue"),
          },
          {
            path: "addresses",
            component: () => import("../views/addresses.vue"),
          },
          {
            path: "addresses",
            component: () => import("../views/addresses.vue"),
          },
          {
            path: "statistical",
            component: () => import("../views/statistical.vue"),
          },
          {
            path: "consent",
            component: () => import("../views/consent-release.vue"),
          },
          {
            path: "residency-history",
            component: () => import("../views/residency-history.vue"),
          },
          {
            path: "education-history",
            component: () => import("../views/education-history.vue"),
          },
          {
            path: "other-funding",
            component: () => import("../views/other-funding.vue"),
          },
          {
            path: "dependants",
            component: () => import("../views/dependants.vue"),
          },
          {
            path: "csfa-accomodation",
            component: () => import("../views/csfa-accomodation.vue"),
          },
          {
            path: "csfa-income",
            component: () => import("../views/csfa-income.vue"),
          },
          {
            path: "csfa-expenses",
            component: () => import("../views/csfa-expenses.vue"),
          },
          {
            path: "parent-details",
            component: () => import("../views/parents.vue"),
          },
          {
            path: "parent-dependants",
            component: () => import("../views/parent-dependants.vue"),
          },
          {
            path: "spouse",
            component: () => import("../views/spouse.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
