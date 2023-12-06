<template>
  <div class="DAC info">
    <el-row type="flex">
      <el-col :span="2" :offset="22" v-if="!showInfo">
        <el-button type="primary" plain @click="showInfo = true, visible = true">Modify</el-button>
      </el-col>
    </el-row>

    <el-col :span="22">
      <h2>Basic information</h2>
    </el-col>
    <el-row type="flex">
      <el-col :span="3">
        <h3>DAC Accession</h3>
      </el-col>
      <el-col :span="20" v-if="!showInfo">
        <h3 style="color:#4472C4;text-decoration:underline;" @click="toDac">{{ dacInfoList.dacAccession }}</h3>
      </el-col>
      <el-col :span="20" v-if="showInfo">
        <el-autocomplete v-model="form.dacAccession" :fetch-suggestions="querySearch" clearable
          placeholder="Please enter a dac accession" @select="handleSelect" style="width: 450px;">
          <template #default="{ item }">
            <el-row type="flex">
              <el-col :span="6">DAC Number:</el-col>
              <el-col :span="6">{{ item.value }}</el-col>
              <el-col :span="5">DAC name:</el-col>
              <el-col :span="2">{{ item.name }}</el-col>
            </el-row>
          </template>

        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="3">
        <h3>DAC Name</h3>
      </el-col>
      <el-col :span="20">
        <h3>{{ dacInfoList.dacName }}</h3>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="3">
        <h3>Description</h3>
      </el-col>
      <el-col :span="20">
        <h3>{{ dacInfoList.description }}</h3>
      </el-col>
    </el-row>
    <el-col :span="22">
      <h2>DAC Members</h2>
    </el-col>
    <el-col :span="22">
      <el-table :data="dacInfoList.dacMembers" style="width: 100%">
        <el-table-column type="index" label="No." align="center" />
        <el-table-column prop="dacMemberName" label="DAC members" width="180" align="center" />
        <el-table-column prop="email" label="Email" align="center" />
        <el-table-column prop="organization" label="Organization" align="center" />
        <el-table-column prop="department" label="Department" align="center" />
        <el-table-column prop="phone" label="Phone" width="180" align="center" />
        <el-table-column label="Is Contract Person" width="180" align="center">
          <template #default="scope">
            <div v-if="scope.row.isContractPerson == 1">Yes</div>
            <div v-if="scope.row.isContractPerson == 0">No</div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <br />
    <!-- 可更改 -->
    <div v-if="showInfo">
      <el-row type="flex">
        <el-col :span="1" :offset="22">
          <el-button type="primary" plain @Click="submitDacInfo">Submit</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" plain @Click="showInfo = false">Back</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- DAC 修改反馈信息 -->
  <el-dialog title="DAC modification feedback" width="50%" v-model="visible">
    <span>这是一个dialog</span>
    <el-row type="flex">
      <el-col :span="22" :offset="1">
        <span>Data set {{ feedbackList.accession }} has {{ feedbackList.number }} 2 unprocessed applications as of {{
          feedbackList.time }}.Please log in to the DAC contact account({{ feedbackList.email }}) for application
          processing, and then
          apply to modify the DAC number associated with this dataset after all processing is completed.</span>
      </el-col>
    </el-row>
    <el-table :data="feedbackList.toDoList" style="width: 100%">
      <el-table-column type="index" label="No." align="center" />
      <el-table-column prop="accession" label="Application number" width="180" align="center" />
      <el-table-column prop="data" label="Application date" width="180" align="center" />
      <el-table-column prop="state" label="Application status" width="180" align="center" />
    </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="feedback">
          Feedback
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import useGsaHumanStore from "@/store/modules/GsaHuman";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const GsaHumanStore = useGsaHumanStore();

const showInfo = ref(false)
const visible = ref(false)

const dacInfoList = ref({
  dacAccession: "HDAC001774",
  dacName: "short long bones sequencing",
  description: "short long bones sequencing",
  dacMembers: [{
    dacMemberName: 'Zhang Yan',
    email: 'zhangyan1981_2003@aliyun.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 1
  },
  {
    dacMemberName: 'ZhangSan',
    email: 'zhangsan@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0
  },
  {
    dacMemberName: 'LiSi',
    email: 'lisi@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0
  }]
})
const form = ref({
  dacAccession: "HDAC001774",
  dacName: "short long bones sequencing",
  description: "short long bones sequencing",
  dacMembers: [{
    dacMemberName: 'Zhang Yan',
    email: 'zhangyan1981_2003@aliyun.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 1
  },
  {
    dacMemberName: 'ZhangSan',
    email: 'zhangsan@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0
  },
  {
    dacMemberName: 'LiSi',
    email: 'lisi@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0
  }]
})

function compareObjects(obj1, obj2) {
  const differentProperties = [];

  for (let prop in obj1) {
    if (obj1.hasOwnProperty(prop) && obj2.hasOwnProperty(prop)) {
      if (obj1[prop] !== obj2[prop]) {
        differentProperties.push(prop);
      }
    }
  }

  return differentProperties;
}
const submitDacInfo = () => {
  showInfo.value = false
  console.log(compareObjects(dacInfoList.value, form.value));
  dacInfoList.value = form.value
  console.log(form.value);
}

const restaurants = ref([
  { value: 'HDAC000124', name: 'a2' },
  { value: 'HDAC000145', name: 'aa' },
  { value: 'HDAC000151', name: 'GSA' },
  { value: 'HDAC001085', name: 'aaa' },
])
const feedbackList = ref({
  accession: 'HREQ003400',
  number: 2,
  email: 'zhangyan1981_2003@aliyun.com',
  time: "2023-06-14 12:00:00",
  toDoList: [{
    accession: 'HREQ003400',
    data: '2023-04-23',
    state: 'Waiting for DAC Review'
  }, {
    accession: 'HREQ003450',
    data: '2023-04-25',
    state: 'Waiting for DAC Review'
  }]
})

const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const handleSelect = (item) => {
  console.log(item)
}
const feedback = () => {
  visible.value = false
}
const toDac = () => {
  router.push("/dac")
}
</script>

<style lang="less" scoped>
.custom-autocomplete .el-autocomplete-suggestion {
  width: 100px;
  /* 设置下拉框宽度与输入框相同 */
}
</style>