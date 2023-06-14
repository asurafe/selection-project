<template>
  <el-header class="tabbar">
    <div class="tabbar-left">
      <el-icon><Expand /></el-icon>
      <el-breadcrumb separator-icon="ArrowRight" class="bread-crumb">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button circle icon="Refresh"></el-button>
      <el-button circle icon="FullScreen"></el-button>
      <el-button circle icon="Setting"></el-button>
      <img src="../../../../public/logo.png" alt="" />
      <el-dropdown>
        <span class="el-dropdown-link" style="cursor: pointer">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  &-left {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .bread-crumb {
      margin-left: 20px;
    }
  }
  &-right {
    display: flex;
    align-items: center;
  }
}
img {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}

</style>
