<template>
  <div>
    <Category />
    <el-card class="card-box">
      <el-button type="primary" icon="Plus">添加属性</el-button>
      <el-table class="table-box">
        <el-table-column prop="date" label="序号" width="180" />
        <el-table-column prop="date" label="属性名称" width="360" />
        <el-table-column prop="date" label="属性值名称"  />
        <el-table-column prop="date" label="操作" width="200" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card-box{
  margin-top: 24px;
  .table-box{
    margin-top: 12px;
  }
}
</style>
