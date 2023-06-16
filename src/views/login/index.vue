<template>
  <div class="container">
    <div class="login-box">
      <div class="login-title">Vue-Admin</div>
      <el-form class="form-box" :model="loginForm">
        <el-form-item>
          <el-input :prefix-icon="User" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="loginForm.password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" :loading="loading" @click="login"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { userStore } from "@/store/modules/user";
import { getTime } from "@/utils/time";
onMounted(() => {});

const store = userStore();
const $router = useRouter();

const loading = ref(false);

const loginForm = reactive({
  username: "admin",
  password: "atguigu123",
});

const login = async () => {
  loading.value = true;
  try {
    await store.userLogin(loginForm);
    $router.push("/");
    ElNotification({
      title: `Hi! ${getTime()}`,
      message: "登陆成功",
      type: "success",
    });
  } catch (errorMsg) {
    ElNotification({
      title: "Error",
      message: errorMsg,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    .login-title {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 50px;
    }
    .form-box {
      width: 80%;
      .el-input {
        height: 40px;
      }
      .login-button {
        margin-top: 24px;
        height: 40px;
        width: 100%;
        height: 36px;
      }
    }
  }
}
</style>
