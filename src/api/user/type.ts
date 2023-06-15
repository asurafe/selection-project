export interface loginFormData {
  username: string;
  password: string;
}

interface dataType {
  token?: string;
  message?: string;
}

export interface loginResData {
  code: number;
  data: dataType;
}

interface userType {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

interface Data {
  checkUser: userType;
}

export interface userResData {
  code: number;
  data: Data;
}
