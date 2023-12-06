<template>
  <div class="dac">
    <el-row type="flex">
      <el-col :span="18" :offset=2>Current position: <span style="color: #0070C0;">Data manager/DAC/{{ position
      }}</span></el-col>
      <el-col :span="1" style="margin-left: 58px;">
        <el-button type="info" plain @Click="toHistory">History</el-button>
      </el-col>
      <el-col :span="2"><el-button type="primary" plain @click="back">Back</el-button></el-col>
    </el-row>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <el-col :span="5">
          <h3 class="blockTitle">User Infotmation</h3>
        </el-col>
        <el-col :span="2" :offset="17" style="margin-top: 3px;" v-if="!showChange">
          <el-button type="primary" plain @click="showChange = true">Modify</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="24"><span style="color: #0070C0;">Basic information</span></el-col>
        <br />
        <el-col :span="6">DAC Accession : </el-col>
        <el-col :span="10">{{ dacList.dacAccession }}</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">DAC Name: </el-col>
        <el-col :span="10" v-if="!showChange">{{ dacList.dacName }}</el-col>
        <el-col :span="10" v-if="showChange"><el-input v-model="form.dacName" placeholder="Please input DAC accession"
            clearable /></el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Description : </el-col>
        <el-col :span="10" v-if="!showChange">{{ dacList.description }}</el-col>
        <el-col :span="10" v-if="showChange"><el-input v-model="form.description" placeholder="Please input DAC accession"
            clearable /></el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">DAC contract : </el-col>
        <el-col :span="10">{{ dacList.dacContractPerson }}</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">DAC Contact Email : </el-col>
        <el-col :span="10">{{ dacList.email }}</el-col>

      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Last login time : </el-col>
        <el-col :span="10">{{ dacList.lastTime }}</el-col>
      </el-row>
      <!-- 没修改时的表格 -->
      <el-row type="flex" v-if="!showChange">
        <el-col :span="22">
          <el-table :data="dacList.dacMembers" style="width: 100%" border>
            <el-table-column type="index" label="No." align="center" />
            <el-table-column prop="email" label="Email" align="center" />
            <el-table-column prop="firstName" label="First Name" align="center" />
            <el-table-column prop="lastName" label="Last Name" align="center" />
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
      </el-row>
      <!-- 修改时的表格 -->
      <el-row type="flex" v-if="showChange">
        <el-col :span="22">
          <el-radio-group v-model="selectedMember" style="width: 100%;">
            <el-table :data="form.dacMembers" style="width: 100%" border>
              <el-table-column type="index" label="No." align="center" />
              <el-table-column label="Email" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.email" placeholder="Please input" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="First Name" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.firstName" placeholder="Please input" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Last Name" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.lastName" placeholder="Please input" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Organization" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.organization" placeholder="Please input" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Department" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.department" placeholder="Please input" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Phone" width="180" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.phone" placeholder="Please input" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Is Contract Person" width="180" align="center">
                <template #default="scope">
                  <el-radio :label="scope.$index" size="large">{{ '' }}</el-radio>
                </template>
              </el-table-column>
            </el-table>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="showChange">
        <el-col :span="10"><span style="color: #0070C0; font-size: medium;" @click="addDacMember">+ Add a new DAC
            member</span></el-col>
      </el-row>
      <div v-if="showChange">
        <el-row type="flex">
          <el-col :span="1" :offset="21">
            <el-button type="primary" plain @Click="submitDacInfo">Submit</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" plain @Click="showChange = false">Back</el-button>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter()

const showChange = ref(false)


const position = ref('HDAC001774')
const dacList = ref({
  dacAccession: 'HDAC001774',
  dacName: 'short long bones sequencing',
  description: 'short long bones sequencing',
  dacContractPerson: 'Zhang Yan',
  email: 'zhangyan1981_2003@aliyun.com',
  lastTime: '2023-01-01 15:00:00',
  dacMembers: [{
    dacMemberName: 'Zhang Yan',
    email: 'zhangyan1981_2003@aliyun.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0,
    firstName: 'Yan',
    lastName: 'Zhang'
  },
  {
    dacMemberName: 'ZhangSan',
    email: 'zhangsan@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 1,
    firstName: 'San',
    lastName: 'Zhang'
  },
  {
    dacMemberName: 'LiSi',
    email: 'lisi@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0,
    firstName: 'Si',
    lastName: 'Li'
  }]
})

const form = ref({
  dacAccession: 'HDAC001774',
  dacName: 'short long bones sequencing',
  description: 'short long bones sequencing',
  dacContractPerson: 'Zhang Yan',
  email: 'zhangyan1981_2003@aliyun.com',
  lastTime: '2023-01-01 15:00:00',
  dacMembers: [{
    dacMemberName: 'Zhang Yan',
    email: 'zhangyan1981_2003@aliyun.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0,
    firstName: 'Yan',
    lastName: 'Zhang'
  },
  {
    dacMemberName: 'ZhangSan',
    email: 'zhangsan@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 1,
    firstName: 'San',
    lastName: 'Zhang'
  },
  {
    dacMemberName: 'LiSi',
    email: 'lisi@gmail.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    phone: '1234567890123',
    isContractPerson: 0,
    firstName: 'Si',
    lastName: 'Li'
  }]
})

const submitDacInfo = () => {
}
const back = () => {
  router.go(-1)
}
const addDacMember = () => {
  var member = {
    dacMemberName: '',
    email: '',
    organization: '',
    department: '',
    phone: '',
    isContractPerson: 0,
    firstName: '',
    lastName: ''
  }
  form.value.dacMembers.push(member)
}
const toHistory = () => {
  router.push("/dachistory")
}

//设置被选中的值
const selectedMember = ref()
const showSelected = () => {

  for (var item in dacList.value.dacMembers) {
    for (var itemx in dacList.value.dacMembers[item]) {
      if (itemx == 'isContractPerson') {
        if (dacList.value.dacMembers[item][itemx] == 1) {
          var index = parseInt(item)
          selectedMember.value = index
        }
      }
    }
  }
}
showSelected()

</script>

<style lang="less" scoped>
.block {
  margin-bottom: 30px;
  margin-left: 150px;
  margin-right: 150px;
  border-radius: 0.5em;
  border: dotted;
  border-width: 0.1px;
  border-color: rgb(203, 200, 200);

  // border-top-style: none;
  .blockTitle {
    color: #0070C0;
    margin: 8px;
  }
}

.context {
  margin: 7px;
}
</style>