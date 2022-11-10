import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: "/",
    name: "",
    redirect: "/home",
    component: layout,
    children: [
      {
        path: "home",
        component: require("@/views/Home").default
      },
    ]
  }
];
const router = new VueRouter({
  routes
});
export default router;
