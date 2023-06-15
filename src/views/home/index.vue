<template>
  <div>home👋</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "@/store/modules/user";

const useUserStore = userStore();
onMounted(() => {
  useUserStore.userInfor();
});
</script>

<style scoped lang="scss"></style>
