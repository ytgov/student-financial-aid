
const routes = [
  {
    path: "",
    component: () => import("@/layouts/Blank.vue"),
    children: [
      {
        path: "/sign-in",
        component: () => import("../views/SignIn.vue"),
      },
      {
        path: "/callback",
        component: () => import("../views/Callback.vue"),
      },
    ],
  },
];

export default routes;
