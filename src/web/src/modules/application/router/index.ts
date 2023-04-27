import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "application/",
    component: () => import("@/layouts/Default.vue"),
    beforeEnter: authGuard,
    children: [
      {
        path: "",
        component: () => import("../views/navigation.vue"),
        children: [
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
      {
        path: "onboarding",
        component: () => import("../views/navigation.vue"),
        //beforeEnter: authGuard
        children: [
          {
            path: "funding-sources",
            component: () => import("../views/onboarding/index/funding-sources.vue"),
          },
          {
            path: "personal-details",
            component: () => import("../views/onboarding/index/personal-details.vue"),
          },
          {
            path: "addresses",
            component: () => import("../views/onboarding/index/addresses.vue"),
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
    ],
  },
];

export default routes;
