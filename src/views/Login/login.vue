<template>
 <el-dialog
    v-model="dialogVisible"
    title="Login"
    width="30%"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import useLoginStore from "@/store/modules/login.js";

const loginStore = useLoginStore();

const dialogVisible = ref(false)

const show =()=>{
    dialogVisible.value = true
}


</script>

<style lang="less" scoped>
    
</style>