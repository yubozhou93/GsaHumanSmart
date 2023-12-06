<template>
    <div class="HGRIP_Information">
        <el-row type="flex">
            <el-col :span="2" v-if="!showInfo" :offset="22">
                <el-button type="primary" plain @click="showInfo = true">Modify</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" style="padding: 20px;">
            <el-col :span="22">
                <el-table :data="hgripInformationList" style="width: 100%" border>
                    <el-table-column type="index" label="No." align="center" width="90">
                    </el-table-column>
                    <el-table-column label="Backup Number" align="center">
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24" v-if="!showInfo"><span>{{ scope.row.backupNumber }}</span></el-col>
                                <el-col :span="24" v-if="showInfo"><el-input v-model="scope.row.backupNumber"
                                        placeholder="Please input" clearable /></el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column prop="backupCreateTime" label="backup Create Time" align="center" />
                    <el-table-column align="center" />
                    <el-table-column label="Registration Number" align="center">
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24" v-if="!showInfo"><span>{{ scope.row.registrationNumber }}</span></el-col>
                                <el-col :span="24" v-if="showInfo"><el-input v-model="scope.row.registrationNumber"
                                        placeholder="Please input" clearable /></el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column prop="registrationCreateTime" label="Registration Create Time" align="center" />
                    <el-table-column label="Status" align="center">
                        <template #default="scope">
                            <span v-if="scope.row.status == 0" style="color:red">Deleted</span>
                            <span v-if="scope.row.status == 1" style="color: greenyellow;">Effectual</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <template v-if="showInfo">
            <el-row type="flex">
                <el-col :span="10"><span style="color: #0070C0; font-size: medium;" @click="addNewInformation">+
                        Add</span></el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="1" :offset="22">
                    <el-button type="primary" plain @Click="submitInfo">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @Click="showInfo = false">Back</el-button>
                </el-col>
            </el-row>
        </template>

    </div>
</template>

<script setup>
import useGsaHumanStore from "@/store/modules/GsaHuman";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const GsaHumanStore = useGsaHumanStore();

const showInfo = ref(false)

const hgripInformationList = ref([
    {
        backupNumber: "BF2019010100002",
        backupCreateTime: "2020-01-01",
        registrationNumber: "2023BAT0001 ",
        registrationCreateTime: "2020-01-01",
        status: 0
    },
    {
        backupNumber: "BF2019010100002",
        backupCreateTime: "2020-01-01",
        registrationNumber: "2023BAT00012",
        registrationCreateTime: "2020-01-01",
        status: 1
    }
])

const submitInfo = () => {
    showInfo.value = true
}
const addNewInformation = () => {
    let information = {
        backupNumber: "",
        backupCreateTime: "",
        registrationNumber: "",
        registrationCreateTime: "",
        status: 1
    }
    let currentDate = new Date();
    let year = currentDate.getFullYear().toString();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');

    let formattedDate = `${year}-${month}-${day}`;
    information.backupCreateTime = formattedDate
    information.registrationCreateTime = formattedDate
    
    showInfo.value = true
    hgripInformationList.value.push(information)
}

</script>

<style lang="less" scoped>

</style>