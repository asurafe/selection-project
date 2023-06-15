<template>
  <el-header class="tabbar">
    <div class="tabbar-left">
      <BreadCrumb />
    </div>
    <div class="tabbar-right">
      <Setting />
    </div>
  </el-header>
</template>

<script setup lang="ts">
import BreadCrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  &-left {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  &-right {
    display: flex;
    align-items: center;
  }
}
</style>
