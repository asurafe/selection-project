import SvgIcon from "./SvgIcon/index.vue";
import type { App, Component } from "vue";

const components: { [key: string]: Component } = { SvgIcon };
console.log(components);
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  },
};
