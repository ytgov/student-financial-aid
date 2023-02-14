import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "application/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/index.vue"),
        beforeEnter: authGuard
      },
      {
        path: "details",
        component: () => import("../views/details/_id/index.vue"),
        beforeEnter: authGuard
      },
      {
        path: "documents/",
        component: () => import("../views/documents/index.vue"),
        beforeEnter: authGuard,
        children: [
          {
            path: "resource",
            component: () => import("../views/documents/_resource/index.vue"),
            beforeEnter: authGuard
          }
        ]
      },
      {
        path: "program-details",
        component: () => import("../views/program-details.vue"),
        beforeEnter: authGuard
      },
      {
        path: "submit",
        component: () => import("../views/submit.vue"),
        beforeEnter: authGuard
      }
    ]
  }
];

export default routes;
