import { authGuard } from "@auth0/auth0-vue";

export const onboardingRoutes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/welcome",
        component: () => import("../views/Welcome.vue"),
        //beforeEnter: authGuard,
      },
    ],
  },
];