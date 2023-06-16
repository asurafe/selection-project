import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginFormData, loginResData, userResData } from "@/api/user/type";
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
    async userLogin(data: loginFormData) {
      const { username, password } = data;
      const res: loginResData = await reqLogin({
        username: username,
        password: password,
      });
      const { token, message } = res.data;
      if (res.code == 200) {
        this.token = token as string;
        SET_TOKEN(token as string);
        return "ok";
      } else {
        return Promise.reject(message);
      }
    },
    async userInfor() {
      const res: userResData = await reqUserInfo();
      if (res.code == 200) {
        this.avatar = res.data.checkUser.avatar;
        this.username = res.data.checkUser.username;
        return "ok";
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    userLayout() {
      (this.token = ""), (this.avatar = ""), REMOVE_TOKEN();
    },
  },
  getters: {},
});
