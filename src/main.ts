import { createApp } from "vue";
import App from "./App.vue";
import "virtual:svg-icons-register";
import router from "./router";
import pinia from "./store";
import globalComponent from "@/components/index";
import "@/style/index.scss";

const app = createApp(App);
app.use(globalComponent);
app.use(router);
app.use(pinia);
app.mount("#app");
