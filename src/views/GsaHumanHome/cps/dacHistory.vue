<template>
    <div class="DAC History">
        <el-row type="flex">
            <el-col :span="22" :offset=2>Current position: <span style="color: #0070C0;">Data manager/DAC</span></el-col>
            <el-col :span="24"><br/></el-col>
            <el-col :span="2" :offset=18>
                <el-input v-model="searchInput" placeholder="Please input" clearable></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" plain>Search</el-button>
            </el-col>
        </el-row>
        <br/>
        <el-row type="flex">
            <el-col :span="20" :offset="2">
                <el-table :data="dachistoryList" style="width: 100%" border>
                    <el-table-column type="index" label="No." align=center />
                    <el-table-column label="User email" align=center>
                        <template #default="scope">
                            <span style="color: #07C4F6;">{{ scope.row.email }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="accession" label="Accession" align=center />
                    <el-table-column prop="name" label="Name" align=center />
                    <el-table-column label="Data sets" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24" v-for="item in scope.row.gsaHumanAccession">
                                    <span  style="color: #0070C0;">{{ item }}</span>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastTime" label="Last login Time" align=center />
                    <el-table-column fixed="right" label="Operations" width="120">
                        <template #default>
                            <el-button link type="primary" size="small" @click="viewDetail">View</el-button>
                            <el-button link type="primary" size="small">History</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import useGsaHumanStore from "@/store/modules/GsaHuman";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const gsaHumanStore = useGsaHumanStore();

const searchInput = ref('')

const dachistoryList = ref([{
    email: "paolo.kunderfranco@gmail.com",
    accession: "HDAC000001",
    name: "Jie Hu's sequencing datas",
    gsaHumanAccession: ["HRA003142", "HRA003147"],
    lastTime: "2022-12-12 10:00:00"
}, {
    email: "zllcaroline@163.com",
    accession: "HDAC000002",
    name: "Name2",
    gsaHumanAccession: ["HRA000022"],
    lastTime: "2022-12-12 10:00:00"
}, {
    email: "zhengzhe@fuwai.com",
    accession: "HDAC000003",
    name: "Name3",
    gsaHumanAccession: ["HRA000021"],
    lastTime: "2022-12-12 10:00:00"
}, {
    email: "tu276025@gird.cn",
    accession: "HDAC000004",
    name: "Name4",
    gsaHumanAccession: ["HRA000020"],
    lastTime: "2022-12-12 10:00:00"
}, {
    email: "zhangyan1981_2003@aliyun.com",
    accession: "HDAC000005",
    name: "short long bones sequencing",
    gsaHumanAccession: ["HRA003147"],
    lastTime: "2022-12-12 10:00:00"
}])
const viewDetail = ()=>{
    router.go(-1)
}
</script>

<style lang="less" scoped></style>