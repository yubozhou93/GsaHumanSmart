<template>
    <div class="pendingReview">
        <el-row type="flex">
            <el-form :model="searchForm">
                <el-row type="flex" style="padding-top: 10px;padding-bottom: 10px;" :gutter="50">
                    <el-col :span="6">
                        <el-form-item>
                            <template v-slot:label>
                                <span class="custom-label" >MetaData status:</span>
                            </template>
                            <el-select v-model="searchForm.meataDataStatus" class="m-2" placeholder="Select" size="large">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <template v-slot:label>
                                <span class="custom-label" >Data status:</span>
                            </template>
                            <el-select v-model="searchForm.dataStatus" class="m-2" placeholder="Select" size="large">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <template v-slot:label>
                                <span class="custom-label">Release Status:</span>
                            </template>
                            <el-select v-model="searchForm.ReleaseStatus" class="m-2" placeholder="Select" size="large">
                                <el-option v-for="item in options3" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-input v-model="searchForm.keyWord" placeholder="Enter search content" style="width: 100%"
                                size="large" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="margin-left: -40px;">
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch" size="large">Search</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-table ref="table" :data="tableData" style="width: 100%" height="950" @row-click="handleRowClick" border>
            <el-table-column prop="ID" type="index" label="No." width="70" align="center" />
            <el-table-column prop="SubmissionID" label="Submission ID" align="center" width="125"/>
            <el-table-column prop="ArchiveID" label="Archive ID" align="center" width="105"/>
            <el-table-column prop="BioProject" label="BioProject" align="center" width="120"/>
            <el-table-column prop="SubmitterEmail" label="Submitter email" align="center" width="135"/>
            <el-table-column prop="MetadataSubmissionTime" label="Metadata submission time" align="center" width="170"/>
            <el-table-column prop="MetadataReviewTime" label="Metadata review time" align="center" width="170"/>
            <el-table-column prop="SubmissionStatus" label="Submission Status" align="center" width="170">
                <template #default="scope">
                    <div>{{ getSubmissionStatus(scope.row.SubmissionStatus) }}</div>
                    <div>{{ getMetaAndDataStatus(scope.row) }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="MetadataStatus" label="Metadata status" width="130" align="center" /> -->
            <!-- <el-table-column prop="DataStatus" label="Data status" width="100" align="center" /> -->
            <!-- <el-table-column prop="CreatTime" label="Creat time" width="100" align="center" /> -->
            <el-table-column prop="RunStatus" label="Run status" align="center" width="170">
                <template #default="scope">
                    <el-row>
                        <el-col :span="2" :offset="6">
                            <div style="background-color: #00FF00">1</div>
                        </el-col>
                        <el-col :span="2">
                            <div style="background-color: red">2</div>
                        </el-col>
                        <el-col :span="2">
                            <div style="background-color: #00FFFF;">3</div>
                        </el-col>
                        <el-col :span="2">
                            <div style="background-color: #C0C0C0;">4</div>
                        </el-col>
                        <el-col :span="2">
                            <div>5</div>
                        </el-col>
                        <el-col :span="2">
                            <div> /6</div>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="ViewStyle" label="View Style" align="center" width="95">
                <template #default="scope">
                    <div> {{ getViewStyle(scope.row.viewStyle) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="ReleaseStatus" label="Release Status" align="center" width="90">
                <template #default="scope">
                    <div>{{ getReleaseStyle(scope.row.ReleaseStatus) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="Reviewer" label="Reviewer" align="center" width="90"/>
            <el-table-column prop="Frequency" label="Frequency of feedback" width="120" align="center" />
            <el-table-column prop="FinalTime" label="Final feedback time" width="125" align="center" />
            <el-table-column fixed="right" label="Operations" width="100" align="center">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row)">View</el-button>
                    <el-button link type="primary" size="small" @click="toHistory">History</el-button>
                    <el-button link type="primary" size="small">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" style="font-size: 18px;"/>
        </div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useGsaHumanStore from '@/store/modules/GsaHuman';

const gsaHumanStore = useGsaHumanStore()
const router = useRouter()

const searchForm = ref({})
const table = ref()
const data = ref()
const currentPage = ref(4)
const pageSize = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
var form = []

const options1 = [
    {
        value: 'Unsubmitted',
        label: 'Unsubmitted',
    },
    {
        value: 'Pending review',
        label: 'Pending review',
    },
    {
        value: 'Not under review',
        label: 'Not under review',
    },
    {
        value: 'Pass',
        label: 'Pass',
    },
    {
        value: 'Failed',
        label: 'Failed',
    }, {
        value: 'Deleted',
        label: 'Deleted',
    }, {
        value: 'Archived',
        label: 'Archived',
    }
]
const options2 = [
    {
        value: 'Pending',
        label: 'Pending',
    },
    {
        value: 'In progress',
        label: 'In progress',
    },
    {
        value: 'Leave aside',
        label: 'Leave aside',
    },
    {
        value: 'Pending archiving',
        label: 'Pending archiving',
    },
    {
        value: 'Archiving',
        label: 'Archiving',
    }, {
        value: 'Archived',
        label: 'Archived',
    },
    {
        value: 'Processing failed',
        label: 'Processing failed',
    }, {
        value: 'Deleted',
        label: 'Deleted',
    }
]
const options3 = [
    {
        value: 'Private',
        label: 'Private',
    },
    {
        value: 'Pending release',
        label: 'Pending release',
    },
    {
        value: 'Publishing',
        label: 'Publishing',
    },
    {
        value: 'Published',
        label: 'Published',
    }
]
const tableData = [{
    ID: "1",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004833",
    ArchiveID: "HRA003386",
    BioProject: "PRJCA013020",
    SubmitterEmail: "paolo.kunderfranco@gmail.com",
    MetadataSubmissionTime: "--",
    MetadataStatus: 1,
    MetadataReviewTime: "--",
    DataStatus: 1,
    ReleaseStatus: 1,
    Reviewer: "--",
    SubmissionStatus: 1,
    viewStyle: 1,
    Frequency: 2,
    FinalTime: "2022-11-01 12:45:00"
}, {
    ID: "2",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004832",
    ArchiveID: "HRA003385",
    BioProject: "PRJCA012776",
    SubmitterEmail: "zllcaroline@163.com",
    MetadataSubmissionTime: "2022-11-07 10:45:00",
    MetadataStatus: 1,
    MetadataReviewTime: "--",
    DataStatus: 1,
    ReleaseStatus: 1,
    Reviewer: "--",
    SubmissionStatus: 1,
    viewStyle: 1,
    Frequency: 2,
    FinalTime: "2022-11-01 12:45:00"
}, {
    ID: "3",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004765",
    ArchiveID: "HRA003380",
    BioProject: "PRJCA012810",
    SubmitterEmail: "zhengzhe@fuwai.com",
    MetadataSubmissionTime: "2022-10-27 10:45:00",
    MetadataStatus: 1,
    MetadataReviewTime: "--",
    DataStatus: 1,
    ReleaseStatus: 1,
    Reviewer: "--",
    SubmissionStatus: 1,
    viewStyle: 1,
    Frequency: 2,
    FinalTime: "2022-11-01 12:45:00"
}, {
    ID: "4",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004821",
    ArchiveID: "HRA003379",
    BioProject: "PRJCA012538",
    SubmitterEmail: "tu276025@gird.cn",
    MetadataSubmissionTime: "2022-11-04 10:45:00",
    MetadataStatus: 1,
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: 3,
    ReleaseStatus: 0,
    Reviewer: "dll",
    SubmissionStatus: 1,
    viewStyle: 1,
    Frequency: 4,
    FinalTime: "2022-11-01 12:45:00"
}, {
    ID: "5",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004795",
    ArchiveID: "HRA003378",
    BioProject: "PRJCA012914",
    SubmitterEmail: "chenchun@mail.sysu.edu.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: 1,
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: 4,
    ReleaseStatus: 1,
    Reviewer: "dll",
    SubmissionStatus: 1,
    Frequency: 5,
    FinalTime: "2022-11-01 12:45:00"
}, {
    ID: "6",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004539",
    ArchiveID: "HRA003246",
    BioProject: "PRJCA012206",
    SubmitterEmail: "lrm0819@nyfy.com.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: 1,
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: 5,
    ReleaseStatus: 2,
    Reviewer: "dll/ctt",
    SubmissionStatus: 1
}, {
    ID: "7",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004399",
    ArchiveID: "HRA003217",
    BioProject: "PRJCA011749",
    SubmitterEmail: "qiumantang@163.com",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: 6,
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: 6,
    ReleaseStatus: "--",
    Reviewer: "dll",
    SubmissionStatus: 1
}, {
    ID: "8",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004883",
    ArchiveID: "HRA003421",
    BioProject: "PRJCA013161",
    SubmitterEmail: "hongliscmc@163.com",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: 7,
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: 7,
    ReleaseStatus: "--",
    Reviewer: "dll",
    SubmissionStatus: 1
}, {
    ID: "9",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004899",
    ArchiveID: "HRA003429",
    BioProject: "PRJCA013192",
    SubmitterEmail: "yisheng_pan@126.com",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: 8,
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: 8,
    ReleaseStatus: "--",
    Reviewer: "dll",
    SubmissionStatus: 1
}, {
    ID: "10",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004867",
    ArchiveID: "HRA003409",
    BioProject: "PRJCA013106",
    SubmitterEmail: "chenjian2014@suda.edu.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: 9,
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: 9,
    ReleaseStatus: "--",
    Reviewer: "dll",
    SubmissionStatus: 1
}, {
    ID: "11",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004843",
    ArchiveID: "HRA003413",
    BioProject: "PRJCA013033",
    SubmitterEmail: "chenjian2014@suda.edu.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: "pass",
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: "Archived",
    ReleaseStatus: "private",
    Reviewer: "dll",
    SubmissionStatus: 1
}, {
    ID: "12",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004864",
    ArchiveID: "HRA003410",
    BioProject: "PRJCA013104",
    SubmitterEmail: "zhuhaichuan@wust.edu.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: "pass",
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: "Archived",
    ReleaseStatus: "Publishing",
    Reviewer: "dll"
}, {
    ID: "13",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004874",
    ArchiveID: "HRA003414",
    BioProject: "PRJCA013136",
    SubmitterEmail: "zhuhaichuan@wust.edu.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: "pass",
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: "Archived",
    ReleaseStatus: "Published",
    Reviewer: "dll"
}, {
    ID: "14",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004874",
    ArchiveID: "HRA003414",
    BioProject: "PRJCA013136",
    SubmitterEmail: "zhuhaichuan@wust.edu.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: "Deleted",
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: "--",
    ReleaseStatus: "--",
    Reviewer: "dll"
}, {
    ID: "15",
    CreatTime: "2022-11-01 12:45:00",
    SubmissionID: "subHRA004874",
    ArchiveID: "HRA003414",
    BioProject: "PRJCA013136",
    SubmitterEmail: "zhuhaichuan@wust.edu.cn",
    MetadataSubmissionTime: "2022-11-01 10:45:00",
    MetadataStatus: "Deleted",
    MetadataReviewTime: "2022-11-04 14:00:00",
    DataStatus: "Review faild",
    ReleaseStatus: "--",
    Reviewer: "dll"
}
]
const getSubmissionStatus = (value) => {
    if (value === 0) {
        return '未提交';
    } else if (value === 1) {
        return '待审核';
    } else if (value === 2) {
        return '审核中';
    } else if (value === 3) {
        return '元数据审核通过';
    } else if (value === 4) {
        return '元数据审核不通过';
    } else if (value === 5) {
        return '数据审核中';
    } else if (value === 6) {
        return '等待归档';
    } else if (value === 7) {
        return '追加待审核';
    } else if (value === 8) {
        return '删除';
    } else if (value === 9) {
        return '已归档';
    } else if (value === 10) {
        return '数据审核失败';
    } else {
        return '未知';
    }
}
const getMetaAndDataStatus = (row) => {
    let dataStatus = ""
    let metaStatus = ""
    if (row.MetadataStatus == 0) {
        metaStatus = '文件上传 '
    } else if (row.MetadataStatus == 1) {
        metaStatus = '已提交'
    } else if (row.MetadataStatus == 2) {
        metaStatus = '审核中'
    } else if (row.MetadataStatus == 3) {
        metaStatus = '通过'
    } else if (row.MetadataStatus == 4) {
        metaStatus = '不通过'
    } else if (row.MetadataStatus == 5) {
        metaStatus = '已提交'
    } else if (row.MetadataStatus == 6) {
        metaStatus = '已提交'
    } else {
        metaStatus = '--'
    }
    if (row.DataStatus == 0) {
        dataStatus = '待处理'
    } else if (row.DataStatus == 1) {
        dataStatus = '暂不处理'
    } else if (row.DataStatus == 2) {
        dataStatus = '审核中'
    } else if (row.DataStatus == 3) {
        dataStatus = '成功'
    } else if (row.DataStatus == 4) {
        dataStatus = '归档成功'
    } else if (row.DataStatus == 6) {
        dataStatus = '归档中'
    } else if (row.DataStatus == 7) {
        dataStatus = '已归档'
    } else if (row.DataStatus == 8) {
        dataStatus = '失败'
    } else {
        dataStatus = '--'
    }
    return metaStatus + '|' + dataStatus
}
const getViewStyle = (value) => {
    if (value === 0) {
        return '受控';
    } else if (value === 1) {
        return '公开';
    } else {
        return '--'
    }
}
const getReleaseStyle = (value) => {
    if (value === 0) {
        return '私有';
    } else if (value === 1) {
        return '发布中';
    } else if (value === 2) {
        return '已发布'
    }
    else {
        return '--'
    }
}
function handleRowClick(row) {
    gsaHumanStore.$state.currentInfos = tableData[row.ID - 1]
}
const handleClick = (value) => {
    gsaHumanStore.$state.currentInfos = value
    // table.handleRowClick
    router.push("/review")
}
const searchValue = () => {

}
const handleSearch = () => {

}
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
}
const toHistory = () => {
    router.push("/history")
}
</script>

<style lang="less" scoped>
// .pendingReview {
//     margin-left: 100px;
//     margin-right: 100px;
// }
.demo-pagination-block {
    margin-top: 15px
}
.custom-label{
    margin-top: 5px;
    font-size: 18px;
}
</style>