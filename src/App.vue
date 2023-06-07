<template>
  <el-config-provider :locale="zhCn">
    <el-button type="primary" @click="handle">测试</el-button>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { reqLogin } from "@/api/user";
import type { loginResData } from "@/api/user/type";
const handle = async () => {
  const res: loginResData = await reqLogin({
    username: "admin",
    password: "111111",
  });
  console.log(res);
};
</script>
<style scoped lang="scss">
.hello {
  color: $color;
}
</style>
