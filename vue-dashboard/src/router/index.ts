import MainHome from "@/layouts/MainHome.vue";
import LoginHome from "@/layouts/LoginHome.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "MainHome",
    component: MainHome,
  },
  {
    path: "/login",
    name: "LoginHome",
    component: LoginHome,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
