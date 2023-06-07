import request from "@/utils/request";
import type { loginFormData, loginResData, userResData } from "./type";
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResData>(API.LOGIN_URL, data);
};

export const reqUserInfo = () => {
  return request.get<any, userResData>(API.USERINFO_URL);
};
