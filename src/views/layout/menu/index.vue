<template>
  <template v-for="item in menuList">
    <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>

    <el-menu-item
      v-if="item.children && item.children.length == 1 && !item.meta.hidden"
      :index="item.path"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>

    <el-sub-menu
      v-if="item.children && item.children.length > 1 && !item.meta.hidden"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="Menu">
defineProps(["menuList"]);
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>

<style scoped></style>
