import AuthPage from "../pages/auth/AuthPage.vue";
import Main from "../pages/main/Main.vue";
import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store/store";
import apiService from "../services/apiService";

const router = createRouter({
   routes: [
      {
         path: "/space",
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
router.beforeEach(async (to, from, next) => {
   if (to.path === "/") {
      next("/space");
      return
   }
   const isAuthenticated = store.state.isAuth
   
   next();
});

export default router;
