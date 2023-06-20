<template>
  <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="40%">
    <el-form
      ref="formRef"
      label-position="left"
      label-width="100px"
      :model="trademarkParams"
      style="width: 90%"
      :rules="rules"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="trademarkParams.tmName" />
      </el-form-item>
      <el-form-item label="LOGO" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, nextTick } from "vue";
import type { UploadProps } from "element-plus";
import {
  reqHasTradeMark,
  reqAddOrUpdateTrademark,
} from "@/api/product/trademark";
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from "@/api/product/trademark/type";

const props = defineProps({
  trademarkData: {
    type: Object,
    default: {},
  },
  pageNo: {
    type: Number,
    default: 0
  }
});

const dialogVisible = ref(false);

const trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});

const formRef = ref();

const emits = defineEmits(["upload"]);

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名称位数大于等于两位"));
  }
};

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error("Logo的图片务必上传"));
  }
};

const rules = {
  tmName: [
    {
      required: true,
      trigger: "blur",
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      trigger: "change",
      validator: validatorLogoUrl,
    },
  ],
};

const openPopups = () => {
  const { id, tmName, logoUrl } = props.trademarkData;
  dialogVisible.value = true;

  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });

  trademarkParams.id = id;
  trademarkParams.tmName = tmName;
  trademarkParams.logoUrl = logoUrl;
};

const cancel = () => {
  dialogVisible.value = false;
};

const confirm = async () => {
  await formRef.value.validate();
  let res = await reqAddOrUpdateTrademark(trademarkParams);
  if (res.code === 200) {
    dialogVisible.value = false;
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    emits("update", trademarkParams.id ? props.pageNo : 1);
  } else {
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
  }
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type === "image/png" ||
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传的文件大小应小于4M",
      });
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传的文件类型必须是PNG|JPG|GIF",
    });
    return false;
  }
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate("logoUrl");
};

defineExpose({
  openPopups,
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
