import { createApp } from "vue";
import App from "./App.vue";
import "virtual:svg-icons-register";
import globalComponent from "@/components/index";
import '@/style/index.scss'

const app = createApp(App);
app.use(globalComponent);
app.mount("#app");
