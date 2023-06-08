import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { loginFormData, loginResData } from "@/api/user/type";
import type { UserState } from "./type";
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";

export const userStore = defineStore("user", {
  state(): UserState {
    return {
      token: GET_TOKEN(),
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
  },
  getters: {},
});
