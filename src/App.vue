<template>
  <el-config-provider :locale="zhCn">
    <el-button type="primary" @click="handle">登陆测试</el-button>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import axios from 'axios'
const handle = async () => {
  const res:any = await axios({
    url:"/api/user/login",
    method:"post",
    data:{
      username:"admin",
      password:"111111"
    }
  })
  if(res.data.code !== 200){
    ElMessage.error(res.data.data.message)
    return
  }
  ElMessage.success('成功')
  
};
</script>
<style scoped lang="scss">
.hello {
  color: $color;
}
</style>
