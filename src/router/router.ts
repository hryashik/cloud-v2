import AuthPage from "../pages/auth/AuthPage.vue";
import Main from "../pages/main/Main.vue";
import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store/store";

const router = createRouter({
   routes: [
      {
         path: "/",
         name: "main",
         component: Main,
         meta: {
            requiresAuth: true,
         },
      },
      {
         path: "/auth",
         name: "auth",
         component: AuthPage,
         meta: {
            requiresAuth: false,
         },
      },
   ],
   history: createWebHistory(),
});
router.beforeEach((to, from, next) => {
   const isAuthenticated = store.state.isAuth;
   if (to.meta.requiresAuth && !isAuthenticated) {
      next("/auth");
   } else if (to.path === "/auth" && isAuthenticated) {
      next("/");
   } else {
      next();
   }
});

export default router;
