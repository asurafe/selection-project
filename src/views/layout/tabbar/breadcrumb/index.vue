<template>
  <el-icon @click="changeIcon" :style="{ cursor: 'pointer' }">
    <component :is="layOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight" class="bread-crumb">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/setting";

const layOutSettingStore = useLayOutSettingStore();

const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold;
};
</script>

<style scoped lang="scss">
.bread-crumb {
  margin-left: 20px;
}
</style>
