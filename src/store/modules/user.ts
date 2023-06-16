import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
  userLogoutData
} from "@/api/user/type";
import type { UserState } from "./type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoutes } from "@/router/routes";

export const userStore = defineStore("user", {
  state(): UserState {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
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
        this.avatar = res.data.avatar;
        this.username = res.data.name;
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
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});
