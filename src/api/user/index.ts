import request from "@/utils/request";
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
  userLogoutData,
} from "./type";
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

export const reqLogin = (data: LoginFormData) => {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data);
};

export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL);
};

export const reqLogout = () => {
  return request.post<any, userLogoutData>(API.LOGOUT_URL);
};
