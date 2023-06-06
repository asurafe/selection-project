<template>
  <el-config-provider :locale="zhCn">
    <el-button type="primary" @click="handle">你好</el-button>
    <div class="hello">hello👋</div>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const handle = () => {
  ElMessage.warning("你好👋");
};
</script>
<style scoped lang="scss">
.hello {
  color: $color;
}
</style>
