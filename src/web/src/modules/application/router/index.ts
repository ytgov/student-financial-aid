export const applicationRoutes = [
  {
    path: "application",
    component: () => import("@/layouts/Default.vue"),
    meta: { auth: true },
    children: [
      {
        path: ":applicationId",
        component: () => import("../views/ApplicationHome.vue"),
        children: [
          {
            path: "",
            component: () => import("../views/Overview.vue"),
          },
          {
            path: "messages",
            component: () => import("../views/Messages.vue"),
          },
          {
            path: "details",
            component: () => import("../views/Details.vue"),
          },
          {
            path: "documents",
            component: () => import("../views/Documents.vue"),
          },
          {
            path: "status",
            component: () => import("../views/Status.vue"),
          }
        ]
      }


    ],
  },
];
