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
console.log(useUserStore);
const layOutSettingStore = useLayOutSettingStore();
const handleRefresh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh;
};

const handleFullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const handleLayout = () => {
  useUserStore.userLayout();
  $router.push("/login");
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
