import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import homeRoutes from "@/modules/home/router";
import adminstrationRoutes from "@/modules/administration/router";
import authenticationRoutes from "@/modules/authentication/router";
import applicationRoutes from "@/modules/application/router";
import messageRoutes from "@/modules/messages/router";
import eligibilityRoutes from "@/modules/eligibility/router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    children: [
      {
        path: "",
        component: () => import("@/views/Default.vue")
      },
      ...authenticationRoutes,
      ...homeRoutes,
      ...adminstrationRoutes,
      ...applicationRoutes,
      ...messageRoutes,
      ...eligibilityRoutes,

      {
        path: "*",
        component: () => import("@/views/NotFound.vue")
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
