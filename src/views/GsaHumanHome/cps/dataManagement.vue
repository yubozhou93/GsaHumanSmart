<template>
  <div class="dataManagement">
    <el-tabs>
      <el-tab-pane label="Pending review">
        <template v-slot:label>
          <span class="custom-label">Pending review</span>
        </template>
        <pendingReview></pendingReview>
      </el-tab-pane>
      <el-tab-pane label="In quality control">
        <template v-slot:label>
          <span class="custom-label">In quality control</span>
        </template>
        <in-quality-control></in-quality-control></el-tab-pane>
      <el-tab-pane label="Files not currently under review">
        <template v-slot:label>
          <span class="custom-label">Files not currently under review</span>
        </template>
        <not-under-review></not-under-review></el-tab-pane>
      <el-tab-pane label="Files being reviewed in batches">
        <template v-slot:label>
          <span class="custom-label">Files being reviewed in batches</span>
        </template>
        <review-in-batches></review-in-batches></el-tab-pane>
      <el-tab-pane label="Quality control failed">
        <template v-slot:label>
          <span class="custom-label">Quality control failed</span>
        </template>
        <control-failed></control-failed></el-tab-pane>
      <el-tab-pane label="Archiving in progress">
        <template v-slot:label>
          <span class="custom-label">Archiving in progress</span>
        </template>
        <in-progress></in-progress></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import pendingReview from './pendingReview.vue';
import inQualityControl from './inQualityControl.vue';
import notUnderReview from './notUnderReview.vue'
import reviewInBatches from './reviewInBatches.vue'
import controlFailed from './controlFailed.vue'
import inProgress from './inProgress.vue'
</script>

<style lang="less" scoped>
.dataManagement {
  padding: 20px;
  min-width: 1400px;
}
.custom-label {
  font-size: 18px;
}
</style>