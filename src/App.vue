<template>
  <el-config-provider :locale="zhCn">
    <el-button type="primary" @click="handle">登陆测试</el-button>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import request from "@/utils/request";
const handle = async () => {
  const res: any = await request({
    url: "/user/login",
    method: "post",
    data: {
      username: "admin",
      password: "111111",
    },
  });
  if (res.code == 200) {
    ElMessage.success("成功");
    return;
  }
  ElMessage.error(res.data.message);
};
</script>
<style scoped lang="scss">
.hello {
  color: $color;
}
</style>
