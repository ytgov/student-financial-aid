import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "messages/inbox",
        component: () => import("../views/inbox.vue"),
        beforeEnter: authGuard
      },
      {
        path: "messages/compose",
        component: () => import("../views/compose.vue"),
        beforeEnter: authGuard
      }
    ]
  }
];

export default routes;
