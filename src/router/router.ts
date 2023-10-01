import AuthPage from "../pages/auth/AuthPage.vue"
import Main from "../pages/main/Main.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
   routes: [
      {
         path: "/",
         component: Main,
      },
      {
         path: "/auth",
         component: AuthPage
      }
   ],
   history: createWebHistory(),
});

export default router;