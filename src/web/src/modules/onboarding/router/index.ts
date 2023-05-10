export const onboardingRoutes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    meta: { auth: true },
    children: [
      {
        path: "/welcome",
        component: () => import("../views/Welcome.vue"),
      },
    ],
  },
];
