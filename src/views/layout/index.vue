<template>
  <el-container class="layout-container-demo">
    <el-aside :class="{ isCollapse: layOutSettingStore.fold }">
      <el-scrollbar>
        <el-menu
          active-text-color="#fff"
          background-color="#001529"
          text-color="#959ea6"
          :collapse="layOutSettingStore.fold"
          :default-active="$route.path"
          :router="true"
        >
          <Logo />
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="container">
      <Tabbar />
      <el-main :class="{ isCollapse: layOutSettingStore.fold }">
        <el-scrollbar>
          <Main />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";
import { useRoute } from "vue-router";
import { userStore as useUserStore } from "@/store/modules/user";
import useLayOutSettingStore from "@/store/setting";

const $route = useRoute();
const userStore = useUserStore();
const layOutSettingStore = useLayOutSettingStore();
</script>

<style lang="scss" scoped>
.layout-container-demo {
  height: 100vh;
  .el-aside {
    width: 200px;
    background-color: #001529 !important;
    transition: all 0.3s;
    &.isCollapse {
      width: $base-fold-menu-width;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-main {
    position: absolute;
    padding: 20px;
    left: $base-menu-width;
    top: 60px;
    transition: all 0.3s;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - 60px);
    &.isCollapse {
      left: $base-fold-menu-width;
      width: calc(100% - $base-fold-menu-width);
    }
  }
  .el-header {
    background-color: #fff !important;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    z-index: 999;
  }
}
</style>
