import { authGuard } from "@auth0/auth0-vue";

export const studentRoutes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/student",
        component: () => import("../views/StudentHome.vue"),
        //beforeEnter: authGuard,
      },
    ],
  },
];