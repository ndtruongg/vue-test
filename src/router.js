import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import guest from "./middleware/guest";
import auth from "./middleware/auth";
import log from "./middleware/log";
import middlewarePipeline from "./middleware/middlewarePipeline";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./components/templates/OpenSidebar.vue"),
    meta: {
      middleware: [log],
    },
    children: [
      {
        path: "",
        component: () => import("./components/pages/Home.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("./components/pages/About.vue"),
      },
      {
        path: "/vuesax",
        name: "vuesax",
        component: () => import("./components/pages/vuesax/VueSax.vue"),
      },
      {
        path: "/blog",
        component: () => import("./components/pages/Blog.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/templates/OpenSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("./components/pages/Login.vue"),
      },
    ],
    meta: {
      middleware: [log, guest],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./components/pages/Dashboard.vue"),
    meta: {
      middleware: [auth],
    },
  },
];

const router = new VueRouter({ mode: "history", routes });

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    router,
    store,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
