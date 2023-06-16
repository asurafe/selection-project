<template>
  <el-button circle icon="Refresh" @click="handleRefresh"></el-button>
  <el-button circle icon="FullScreen" @click="handleFullScreen"></el-button>
  <el-button circle icon="Setting"></el-button>
  <img :src="useUserStore.avatar" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link" style="cursor: pointer">
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLayout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { userStore } from "@/store/modules/user";
import useLayOutSettingStore from "@/store/setting";
import { useRouter } from "vue-router";

const $router = useRouter();
const useUserStore = userStore();

const layOutSettingStore = useLayOutSettingStore();
// 刷新
const handleRefresh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh;
};
// 全屏
const handleFullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
// 退出登陆
const handleLayout = async () => {
  try {
    await useUserStore.userLayout();
    $router.push("/login");
  } catch (e) {
    ElMessage.error(e);
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  border-radius: 50%;
}
</style>
