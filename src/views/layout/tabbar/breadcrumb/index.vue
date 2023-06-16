<template>
  <el-icon @click="changeIcon" :style="{ cursor: 'pointer' }">
    <component :is="layOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight" class="bread-crumb">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
    >
      <el-icon class="breadcrumb-icon">
        <component :is="item.meta.icon" />
      </el-icon>
      {{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/setting";
import { useRoute } from "vue-router";

const layOutSettingStore = useLayOutSettingStore();
const $route = useRoute();
// 收起左侧菜单
const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold;
};
</script>

<style scoped lang="scss">
.bread-crumb {
  margin-left: 20px;
}
.breadcrumb-icon {
  transform: translateY(1.5px);
}
</style>
