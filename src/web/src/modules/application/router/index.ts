import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "application/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/index.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "onboarding",
        //beforeEnter: authGuard
        children: [
          {
            path: "",
            component: () => import("../views/onboarding/index.vue"),
          },
          {
            path: "addresses",
            component: () => import("../views/onboarding/index/addresses.vue"),
          },
          {
            path: "statistical",
            component: () => import("../views/onboarding/index/statistical.vue"),
          },
          {
            path: "consent-release",
            component: () => import("../views/onboarding/index/consent-release.vue"),
          },
          {
            path: "residency-history",
            component: () => import("../views/onboarding/index/residency-history.vue"),
          },
          {
            path: "education-history",
            component: () => import("../views/onboarding/index/education-history.vue"),
          },
          {
            path: "other-funding",
            component: () => import("../views/onboarding/index/other-funding.vue"),
          },
          {
            path: "dependants",
            component: () => import("../views/onboarding/index/dependants.vue"),
          },
          {
            path: "csfa-accomodation",
            component: () => import("../views/onboarding/index/csfa-accomodation.vue"),
          },
          {
            path: "csfa-income",
            component: () => import("../views/onboarding/index/csfa-income.vue"),
          },
          {
            path: "csfa-expenses",
            component: () => import("../views/onboarding/index/csfa-expenses.vue"),
          },
          {
            path: "parents",
            component: () => import("../views/onboarding/index/parents.vue"),
          },
          {
            path: "parent-dependants",
            component: () => import("../views/onboarding/index/parent-dependants.vue"),
          },
          {
            path: "spouse",
            component: () => import("../views/onboarding/index/spouse.vue"),
          },
        ],
      },

      {
        path: "details",
        component: () => import("../views/details/_id/index.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "documents/",
        component: () => import("../views/documents/index.vue"),
        //beforeEnter: authGuard,
        children: [
          {
            path: "resource",
            component: () => import("../views/documents/_resource/index.vue"),
            //beforeEnter: authGuard
          },
        ],
      },
      {
        path: "program-details",
        component: () => import("../views/program-details.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "submit",
        component: () => import("../views/submit.vue"),
        //beforeEnter: authGuard
      },
    ],
  },
];

export default routes;
