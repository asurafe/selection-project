import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import router from "@/router";
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
  userLogoutData,
} from "@/api/user/type";
import type { UserState } from "./type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";

// @ts-ignore
import cloneDeep from "lodash/cloneDeep";

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

export const userStore = defineStore("user", {
  state(): UserState {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      avatar: "",
      username: "",
    };
  },
  actions: {
    async userLogin(loginData: LoginFormData) {
      const { username, password } = loginData;
      const res: LoginResponseData = await reqLogin({
        username: username,
        password: password,
      });
      const { code, data, message } = res;
      if (code == 200) {
        this.token = data as string;
        SET_TOKEN(data as string);
        return "ok";
      } else {
        return Promise.reject(message);
      }
    },
    async userInfor() {
      const res: userInfoResponseData = await reqUserInfo();
      if (res.code == 200) {
        this.username = res.data.name as string;
        this.avatar = res.data.avatar as string;
        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes
        );
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
        return "ok";
      } else {
        return Promise.reject(res.message);
      }
    },
    async userLayout() {
      const res: userLogoutData = await reqLogout();
      if (res.code == 200) {
        this.token = "";
        this.avatar = "";
        this.username = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});
