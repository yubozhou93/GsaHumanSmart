<template>
  <div class="Publication">
    <h2>Publication</h2>
    <el-tabs type="border-card" class="demo-tabs" >
      <el-tab-pane label="Insert Publication"><insert-publication></insert-publication></el-tab-pane>
      <el-tab-pane label="Insert Journal"><journal></journal></el-tab-pane>
      <el-tab-pane label="Demo">Demo</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import insertPublication from '@/views/Publication/cps/insertPublication.vue';
import journal from '@/views/Journal/journal.vue/';
</script>

<style lang="less" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

</style>