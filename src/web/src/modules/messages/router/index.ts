const routes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "messages/inbox",
        component: () => import("../views/inbox.vue"),
      },
      {
        path: "messages/compose",
        component: () => import("../views/compose.vue"),
      },
    ],
  },
];

export default routes;
