<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus" @click="addTradeMark"
      >添加品牌</el-button
    >
    <el-table :data="trademarkArr" class="box-table">
      <el-table-column label="序号" width="180" prop="id" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="LOGO" prop="logoUrl">
        <template #="{ row }">
          <img :src="row.logoUrl" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTradeMark(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Delete"
            @click="removeTradeMark(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total "
      :total="trademarkTotal"
      @size-change="onPageSizeChange"
      @current-change="getHasTrademark"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHasTrademark } from "@/api/product/trademark";
import { TradeMarkResponseData, Records } from "@/api/product/trademark/type";

const pageNo = ref<number>(1);
const pageSize = ref<number>(5);
const trademarkTotal = ref<number>(0);
const trademarkArr = ref<Records>([]);

const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  const res: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value
  );
  if (res.code == 200) {
    const { records, total } = res.data;
    trademarkTotal.value = total;
    trademarkArr.value = records;
  }
};
const onPageSizeChange = () => {
  getHasTrademark();
};

const addTradeMark = () => {};

const updateTradeMark = (row: any) => {
  console.log(row);
};

const removeTradeMark = (row: any) => {
  console.log(row);
};

onMounted(() => {
  getHasTrademark();
});
</script>

<style scoped lang="scss">
.box-card {
  .box-table {
    margin: 24px 0;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
