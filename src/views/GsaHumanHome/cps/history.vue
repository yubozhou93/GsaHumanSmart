<template>
  <div class="history">
    <el-row type="flex">
      <el-col :span="12" :offset="1">
        <h2>Current position: {{ gsaHumanStore.$state.historyTableData[0].postion }}/{{
          gsaHumanStore.$state.historyTableData[0].ArchiveID }}</h2>
      </el-col>

      <el-col :span="22" :offset="1">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="time" label="Time" align="center" />
          <el-table-column prop="reviewer" label="Operator" align="center" />
          <el-table-column prop="event" label="Event" align="center" />
          <el-table-column prop="result" label="Result" align="center" />
          <el-table-column label="detail" align="center">
            <template #default>
              <el-button link type="primary" size="small" @click="viewDetail">view</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="Remarks" align="center" />
        </el-table>
      </el-col>

      <el-col :span="2" :offset="22" style="margin-top: 10px;">
        <el-button type="primary" @click="back">返回</el-button>
      </el-col>
    </el-row>
  </div>
  <!-- detail -->
  <el-dialog v-model="dialogVisible">
    <table class="my-table" border="1">
    <tr>
      <td class="blue-row">Message</td>
      <td class="blue-row">Details</td>
    </tr>
    <tr class="gray-row">
      <td>Time</td>
      <td>{{ gsaHumanStore.$state.historyTableData[0].time }}</td>
    </tr>
    <tr class="gray-row">
      <td>Operator</td>
      <td>{{ data.operator = gsaHumanStore.$state.historyTableData[0].operator }}</td>
    </tr>
    <tr class="gray-row">
      <td>Event</td>  
      <td>{{ gsaHumanStore.$state.historyTableData[0].event }}</td>
    </tr>
    <tr class="gray-row">
      <td>Details</td>
      <td>{{ gsaHumanStore.$state.historyTableData[0].detail }}</td>
    </tr>
  </table>
  <br>
    <el-row type="flex"  >
        <el-col :span="2" :offset="21">
          <el-button @click="dialogVisible=false"> Close</el-button>
        </el-col>
    </el-row>
  
  </el-dialog>
</template>

<script setup>
import useGsaHumanStore from '@/store/modules/GsaHuman';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter()
const gsaHumanStore = useGsaHumanStore()
const dialogVisible = ref(false)
const tableData1=ref([{}])
var tableData = []
var data = {}
data.time = gsaHumanStore.$state.historyTableData[0].time
data.operator = gsaHumanStore.$state.historyTableData[0].operator
data.event = gsaHumanStore.$state.historyTableData[0].event
data.detail = gsaHumanStore.$state.historyTableData[0].detail
data.remarks = gsaHumanStore.$state.historyTableData[0].remarks
tableData.push(data)
const back = () => {
  router.go(-1)
}
const viewDetail = () => {
  dialogVisible.value = true
}
</script>

<style lang="less" scoped>
table.my-table {
  border-collapse: collapse;
  width: 100%;
}
.blue-row {
  background-color: #75a3f3;
  height: 40px;
  color: #FFF;
  width: 10%;
}

.gray-row {
  background-color: #ececec;
  height: 30px;
}
</style>