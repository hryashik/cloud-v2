import AuthPage from "../pages/auth/AuthPage.vue";
import Main from "../pages/main/Main.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
   routes: [
      {
         path: "/",
         name: "main",
         component: Main,
      },
      {
         path: "/auth",
         name: "auth",
         component: AuthPage,
      },
   ],
   history: createWebHistory(),
});


export default router;
