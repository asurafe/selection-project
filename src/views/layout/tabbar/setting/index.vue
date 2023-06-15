<template>
  <el-button circle icon="Refresh"></el-button>
  <el-button circle icon="FullScreen"></el-button>
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

<script setup lang="ts"></script>

<style lang="scss" scoped>
img {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}
</style>
