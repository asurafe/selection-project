// @ts-nocheck
import router from "@/router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store";
import { userStore } from "./store/modules/user";

const useUserStore = userStore(pinia);
nprogress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  const { token, username } = useUserStore;

  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (username) {
        next();
      } else {
        try {
          await useUserStore.userInfor();
          next();
        } catch (error) {
          await useUserStore.userLayout();
          next({ path: "/login" });
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login" });
    }
  }

  nprogress.start();
});

router.afterEach(() => {
  nprogress.done();
});
