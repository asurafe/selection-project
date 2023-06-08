<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
          active-text-color="#fff"
          background-color="#001529"
          text-color="#959ea6"
          :router="true"
        >
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="container">
      <el-main>
        <el-scrollbar> </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-container-demo {
  height: 100%;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  position: absolute;
  padding: 20px;
  left: 200px;
  top: 60px;
  transition: all 0.3s;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - 60px);
}

.el-aside {
  background-color: #001529 !important;
  transition: all 0.3s;
}
.el-header {
  background-color: #fff !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 999;
}
.isCollapse {
  width: 56px;
}
</style>
