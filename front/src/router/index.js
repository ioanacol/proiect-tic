import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PostDetail from "../views/posts/PostDetail.vue";
import PostEdit from "../views/posts/PostEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/posts/:id",
    name: "post-detail",
    component: PostDetail,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/posts/:id/edit",
    name: "post-edit",
    component: PostEdit,
    props: true,
  },
  {
    path: "/add-post",
    name: "add-post",
    component: () => import("../views/posts/AddPostView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
