<template>
  <router-view #="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="isRefresh" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import useLayOutSettingStore from "@/store/setting";
const isRefresh = ref(true);
const layOutSettingStore = useLayOutSettingStore();

watch(
  () => layOutSettingStore.refresh,
  () => {
    isRefresh.value = false;
    nextTick(() => {
      isRefresh.value = true;
    });
  }
);
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
