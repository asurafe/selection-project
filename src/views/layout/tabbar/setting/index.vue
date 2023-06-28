<template>
  <el-button circle icon="Refresh" @click="handleRefresh"></el-button>
  <el-button circle icon="FullScreen" @click="handleFullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          size="small"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          size="small"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button circle icon="Setting"></el-button>
    </template>
  </el-popover>
  <img :src="useUserStore.avatar" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link" style="cursor: pointer">
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLayout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from "@/store/modules/user";
import useLayOutSettingStore from "@/store/setting";
import { useRouter } from "vue-router";

const dark = ref<boolean>(false)
const $router = useRouter();
const useUserStore = userStore();
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])


const layOutSettingStore = useLayOutSettingStore();
// 刷新
const handleRefresh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh;
};
// 全屏
const handleFullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
// 退出登陆
const handleLayout = async () => {
  try {
    await useUserStore.userLayout();
    $router.push("/login");
  } catch (e) {
    ElMessage.error(e);
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  border-radius: 50%;
}
</style>
