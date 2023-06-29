import { RouteRecordRaw } from "vue-router";
import type { CategoryObj } from "@/api/product/attr/type";

export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  avatar: string;
  username: string;
  buttons:[]
}

export interface CategoryState {
  c1Id: string | number;
  c2Id: string | number;
  c3Id: string | number;
  c1Arr: CategoryObj[];
  c2Arr: CategoryObj[];
  c3Arr: CategoryObj[];
}
