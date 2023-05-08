export const studentRoutes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/student",
        component: () => import("../views/StudentHome.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/student/edit",
        component: () => import("../views/StudentEdit.vue"),
      },
    ],
  },
];
