<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="handleChangeC1">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :value="c1.id"
            :label="c1.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="handleChangeC2">
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :value="c2.id"
            :label="c2.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :value="c3.id"
            :label="c3.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { ref, onMounted } from "vue";

const categoryStore = useCategoryStore();

onMounted(() => {
  getC1();
});

const getC1 = async () => {
  categoryStore.getC1();
};

const handleChangeC1 = async () => {
  categoryStore.c2Id = "";
  categoryStore.c3Id = "";
  categoryStore.c3Arr = [];
  categoryStore.getC2();
};

const handleChangeC2 = async () => {
  categoryStore.c3Id = "";
  categoryStore.getC3();
};
</script>

<style scoped></style>
