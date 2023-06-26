<template>
  <div>
    <Category :scene="scene" />
    <el-card class="card-box">
      <div v-if="scene">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table class="table-box" :data="attrArr">
          <el-table-column type="index" label="序号" width="180" />
          <el-table-column prop="attrName" label="属性名称" width="360" />
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag
                class="table-tag"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.attrName}?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请你输入属性名称"
              v-model="attrParams.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          type="primary"
          size="default"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button size="default" @click="cancel">取消</el-button>
        <el-table class="table-box" :data="attrParams.attrValueList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          />
          <el-table-column>
            <template #="{ row, $index }">
              <el-input
                v-if="row.flag"
                v-model="row.valueName"
                :ref="(vc:any)=>inputArr[$index]=vc"
                placeholder="请你输入属性值名称"
                @blur="toLook(row, $index)"
              />
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="button-box">
          <el-button
            type="primary"
            size="default"
            @click="save"
            :disabled="!attrParams.attrValueList.length"
          >
            保存
          </el-button>
          <el-button size="default" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from "vue";
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from "@/api/product/attr";
import type {
  AttrResponseData,
  Attr,
  AttrValue,
} from "@/api/product/attr/type";
import useCategoryStore from "@/store/modules/category";

const categoryStore = useCategoryStore();
const attrArr = ref<Attr[]>([]);
const scene = ref<number>(0);
const inputArr = ref<any>([]);
const attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = [];
    if (!categoryStore.c3Id) return;
    getAttr();
  }
);

onBeforeUnmount(() => {
  categoryStore.$reset();
});

const save = async () => {
  let res: any = await reqAddOrUpdateAttr(attrParams);
  if (res.code === 200) {
    scene.value = 0;
    ElMessage({
      type: "success",
      message: attrParams.id ? "修改成功" : "添加成功",
    });
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: attrParams.id ? "修改失败" : "添加失败",
    });
  }
};

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (res.code === 200) {
    attrArr.value = res.data;
  }
};

const updateAttr = (row: Attr) => {
  scene.value = 1;
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
};

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  });
  scene.value = 1;
};

const deleteAttr = async (attrId: number) => {
  let res: any = await reqRemoveAttr(attrId);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};

const cancel = () => {
  scene.value = 0;
};

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === "") {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    return;
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    return;
  }
  row.flag = false;
};

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};
</script>

<style scoped lang="scss">
.card-box {
  margin-top: 24px;
  .table-box {
    margin-top: 12px;
    .table-tag {
      margin: 0 5px;
    }
  }
  .button-box {
    margin-top: 12px;
  }
}
</style>
