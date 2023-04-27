import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "eligibility-checker/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/index.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "dependant-student-jurisdiction",
        component: () => import("../views/dependant-student-jurisdiction.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "designated-institution",
        component: () => import("../views/designated-institution.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "disabilities",
        component: () => import("../views/disabilities.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "full-time-eligibility",
        component: () => import("../views/full-time-eligibility.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "independent-student",
        component: () => import("../views/independent-student.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "marital",
        component: () => import("../views/marital.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "parent",
        component: () => import("../views/parent.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "part-time-eligibility",
        component: () => import("../views/part-time-eligibility.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "program",
        component: () => import("../views/program.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "residency",
        component: () => import("../views/residency.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "review",
        component: () => import("../views/review.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "scholarship",
        component: () => import("../views/scholarship.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "single-parent-student-jurisdiction",
        component: () => import("../views/single-parent-student-jurisdiction.vue"),
        //beforeEnter: authGuard
      },
      {
        path: "yukon-grant",
        component: () => import("../views/yukon-grant.vue"),
        //beforeEnter: authGuard
      }
    ]
  }
];

export default routes;
