<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="Plus" @click="addTradeMark"
        >添加品牌</el-button
      >
      <el-table :data="trademarkArr" class="box-table">
        <el-table-column label="序号" width="180" prop="id" />
        <el-table-column label="品牌名称" prop="tmName" />
        <el-table-column label="LOGO" prop="logoUrl">
          <template #="{ row }">
            <el-image
              style="width: 100px; height: 100px;"
              :src="row.logoUrl"
              :zoom-rate="1"
              :initial-index="1.2"
              preview-teleported
              hide-on-click-modal
              :preview-src-list="[row.logoUrl]"
              fit="fill"
            />
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
              @click="removeTradeMark(row.id)"
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
    <TradeDialog
      ref="trademark"
      @update="getHasTrademark"
      :trademarkData="trademarkParams"
      :pageNo="pageNo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { reqHasTrademark, reqDeleteTrademark } from "@/api/product/trademark";
import {
  TradeMarkResponseData,
  TradeMark,
  Records,
} from "@/api/product/trademark/type";
import TradeDialog from "./components/dialog.vue";

const pageNo = ref<number>(1);
const pageSize = ref<number>(5);
const trademarkTotal = ref<number>(0);
const trademarkArr = ref<Records>([]);
const trademark = ref();
const trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});

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

const addTradeMark = () => {
  trademarkParams.id = 0;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  trademark.value.openPopups();
};

const updateTradeMark = (row: any) => {
  Object.assign(trademarkParams, row);
  trademark.value.openPopups();
};

const removeTradeMark = async (id: number) => {
  const res = await reqDeleteTrademark(id);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
    //再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1
    );
  } else {
    ElMessage({
      type: "error",
      message: "删除品牌失败",
    });
  }
};

onMounted(() => {
  getHasTrademark();
});
</script>

<style scoped lang="scss">
.box-card {
  .box-table {
    margin: 24px 0;
  }
}
</style>
