<template>
  <div class="container">
    <div class="login-box">
      <div class="login-title">👋 Hello</div>
      <el-form class="form-box" label-width="80px" :model="loginForm">
        <el-form-item label="账号">
          <el-input :prefix-icon="User" v-model="loginForm.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="loginForm.password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" @click="handle">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { reqLogin } from "@/api/user";
import type { loginResData } from "@/api/user/type";
import { useRouter } from "vue-router";

const $router = useRouter();

const loginForm = reactive({
  name: "admin",
  password: "111111",
});

const handle = async () => {
  const res: loginResData = await reqLogin({
    username: loginForm.name,
    password: loginForm.password,
  });
  if (res.code == 200) {
    ElMessage.success("登陆成功");
    $router.push("/");
    return;
  }
  ElMessage.error(res.data.message);
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpeg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 650px;
    height: 40vh;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    position: relative;
    .login-title {
      font-size: 36px;
      position: absolute;
      top: 36px;
      left: 36px;
    }
    .form-box {
      position: absolute;
      top: 60%;
      left: 60%;
      transform: translate(-60%, -60%);
      width: 80%;
      .login-button {
        margin-top: 36px;
        width: 100%;
        height: 36px;
      }
    }
  }
}
</style>
