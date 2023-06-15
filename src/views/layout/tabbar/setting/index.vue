<template>
  <el-button circle icon="Refresh" @click="handleRefresh"></el-button>
  <el-button circle icon="FullScreen" @click="handleFullScreen"></el-button>
  <el-button circle icon="Setting"></el-button>
  <img src="../../../../../public/logo.png" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link" style="cursor: pointer">
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/setting";
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
</script>

<style lang="scss" scoped>
img {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}
</style>
