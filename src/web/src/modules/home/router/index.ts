const routes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
    ],
  },
];

export default routes;
