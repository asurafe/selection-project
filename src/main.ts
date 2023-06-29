import { createApp } from "vue";
import App from "./App.vue";
import "virtual:svg-icons-register";
import router from "./router";
import pinia from "./store";
import globalComponent from "@/components/index";
import { isHasButton } from '@/directive/has'
import "@/style/index.scss";
import "@/permisstion.ts";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);

isHasButton(app)
app.use(globalComponent);
app.use(router);
app.use(pinia);
app.mount("#app");
