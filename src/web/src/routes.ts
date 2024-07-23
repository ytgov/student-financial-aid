import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import homeRoutes from "@/modules/home/router";
import authenticationRoutes from "@/modules/authentication/router";
import draftRoutes from "@/modules/draft/router";
import messageRoutes from "@/modules/messages/router";
import eligibilityRoutes from "@/modules/eligibility/router";
import { onboardingRoutes } from "@/modules/onboarding/router";
import { studentRoutes } from "@/modules/student/router";
import { applicationRoutes } from "@/modules/application/router";
import { useAuth0 } from "@auth0/auth0-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    children: [
      {
        path: "",
        component: () => import("@/views/Default.vue"),
      },
      ...authenticationRoutes,
      ...homeRoutes,
      ...draftRoutes,
      ...messageRoutes,
      ...eligibilityRoutes,

      ...onboardingRoutes,
      ...studentRoutes,
      ...applicationRoutes,

      {
        path: "/faq",
        component: () => import("@/components/Faq.vue"),
      },

      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.auth == true) {
    const u = useAuth0();
    let isAuth = await u.getAccessTokenSilently();

    if (isAuth) next();
    else {
      next("/sign-in");
    }
  } else {
    next();
  }
});
