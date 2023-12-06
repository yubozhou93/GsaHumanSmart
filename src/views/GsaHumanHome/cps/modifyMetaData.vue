<template>
    <div class="modifyMetaData">
        <el-row type="flex">
            <el-col :span="12" :offset="2">
                <h2>Current position: {{ position }}/{{ archiveID }}</h2>
            </el-col>
            <el-col :span="1" style="margin-right: 10px;" :offset="6"><el-button type="primary" plain
                    @click="showRecord">Record</el-button></el-col>
            <el-col :span="1"><el-button type="primary" plain @click="back">Back</el-button></el-col>
        </el-row>
        <br />
        <el-row type="flex">
            <el-col :span="20" :offset=2>

                <el-collapse v-model="activeNames">
                    <el-collapse-item name="1">
                        <template #title>
                            <span class="title">Basic Information</span>
                        </template>
                        <basicInfo/>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template #title>
                            <span class="title">Review Link</span>
                        </template>
                        <reviewLink/>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template #title>
                            <span class="title">HGRIP Information</span>
                        </template>
                        <hgripInformation/>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template #title>
                            <span class="title">User Information</span>
                        </template>
                        <submitter/>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template #title>
                            <span class="title">Contact Person</span>
                        </template>
                        <contactPerson/>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template #title>
                            <span class="title">Study type</span>
                        </template>
                        <studyType />
                    </el-collapse-item>
                    <el-collapse-item v-if="showControlledInformation">
                        <template #title>
                            <span class="title">Controlled Access</span>
                        </template>
                        <controlledInformation/>
                    </el-collapse-item>
                    <el-collapse-item v-if="showControlledInformation">
                        <template #title>
                            <span class="title">Data Access Committee</span>
                        </template>
                        <dacInfo />
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
        <br />
        <!-- <br/>
        <span> {{ gsaHumanStore.$state.historyTableData[0] }}</span>
        <br/>
        <span>{{ gsaHumanStore.$state.currentInfos }}</span>
        <br/> -->
        <!-- <el-row type="flex">
            <el-col :span="20" :offset="2" class="block">
                <el-row type="flex" style="background-color: #cfe5f8; border-radius: 0.5em;">
                    <h3 class="blockTitle">Review Information</h3>
                </el-row>
                <el-row type="flex" style="margin-top: 15px;">
                    <el-col :span="2" :offset="3">
                        <span>Title:</span>
                    </el-col>
                    <el-col :span="15">
                        {{ title }}
                    </el-col>
                    <el-col :span="15" :offset="5" v-if="showTitle">
                        <el-input v-model="inputTitle" placeholder="Please input a title" clearable />
                    </el-col>
                    <el-col :span="2" v-if="!showTitle"><el-button type="primary" plain @click="showTitle = true">
                            modify</el-button></el-col>
                    <el-col :span="2" v-if="showTitle"><el-button type="primary" plain @click="changeTitle">
                            Confirmed</el-button></el-col>
                    <el-col :span="2" v-if="showTitle"><el-button type="primary" plain
                            @click="showTitle = false">Cancel</el-button></el-col>
                </el-row>
                <br />
                <el-row type="flex">
                    <el-col :span="2" :offset="3">
                        <span>Description:</span>
                    </el-col>
                    <br />
                    <el-col :span="15">
                        {{ description }}
                    </el-col>
                    <el-col :span="15" v-if="showDescription" :offset="5">
                        <el-input v-model="inputDescription" placeholder="Please input description" clearable />
                    </el-col>
                    <el-col :span="2" v-if="!showDescription"><el-button type="primary" plain
                            @click="showDescription = true">
                            modify</el-button></el-col>
                    <el-col :span="2" v-if="showDescription"><el-button type="primary" plain @click="changeDescription">
                            Confirmed</el-button></el-col>
                    <el-col :span="2" v-if="showDescription"><el-button type="primary" plain
                            @click="showDescription = false">Cancel</el-button></el-col>
                </el-row>

            </el-col>
        </el-row> -->
        <el-row type="flex">
            <el-col :span="20" :offset="2">
                <el-tabs type="border-card" stretch>
                    <el-tab-pane label="Individual">
                        <individual></individual>
                    </el-tab-pane>
                    <el-tab-pane label="Family">
                        <family></family>
                    </el-tab-pane>
                    <el-tab-pane label="Sample">
                        <sample></sample>
                    </el-tab-pane>
                    <el-tab-pane label="Experiment">
                        <experiment></experiment>
                    </el-tab-pane>
                    <el-tab-pane label="Run">
                        <run></run>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </div>
    <!-- Modification record -->
    <el-dialog v-model="dialogTableVisible" title="Modification record" width="80%">
        <el-table :data="record" border>
            <el-table-column label="No." type="index" width="50" align="center"></el-table-column>
            <el-table-column property="time" label="Time" width="160" align="center" />
            <el-table-column property="operator" label="Operator" width="120" align="center" />
            <el-table-column property="location" label="Location" align="center" />
            <el-table-column property="result" label="Result" width="80" align="center" />
            <el-table-column property="needFeedback" label="Need feedback" width="150" align="center">
                <template #default="scope">
                    <div>{{ getFeedBack(scope.row.needFeedback) }}</div>
                </template>
            </el-table-column>
            <el-table-column property="remarks" label="Remarks" align="center" />
            <el-table-column fixed="right" label="Operations" align="center">
                <template #default="scope">
                    <el-button link type="primary" size="small" :disabled="getFeedbackDisable(scope.row.needFeedback)"
                        @click="scope.row.needFeedback = 2">No feedBack</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogTableVisible = false">Back</el-button>
                <el-button type="primary" @click="dialogTableVisible = false" :disabled="feedbackDisable">
                    Feedback
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import useGsaHumanStore from '@/store/modules/GsaHuman';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

import basicInfo from "@/views/GsaHumanHome/cps/basicInfo.vue";
import contactPerson from "@/views/GsaHumanHome/cps/contactPerson.vue";
import controlledInformation from "@/views/GsaHumanHome/cps/controlledInformation.vue";
import studyType from "@/views/GsaHumanHome/cps/studyType.vue";
import submitter from "@/views/GsaHumanHome/cps/submitter.vue";
import hgripInformation from '@/views/GsaHumanHome/cps/hgripInformation.vue'
import dacInfo from '@/views/GsaHumanHome/cps/dacInfo.vue'
import reviewLink from '@/views/GsaHumanHome/cps/reviewLink.vue'

import individual from "@/views/GsaHumanHome/cps/individual.vue";
import run from "@/views/GsaHumanHome/cps/run.vue";
import experiment from "@/views/GsaHumanHome/cps/experiment.vue";
import family from "@/views/GsaHumanHome/cps/family.vue";
import sample from "@/views/GsaHumanHome/cps/sample.vue";


const router = useRouter()
const gsaHumanStore = useGsaHumanStore()

const position = ref(gsaHumanStore.$state.historyTableData[0].position)
const archiveID = ref(gsaHumanStore.$state.historyTableData[0].ArchiveID)
const title = ref(gsaHumanStore.$state.historyTableData[0].title)
const description = ref(gsaHumanStore.$state.historyTableData[0].description)


const inputTitle = ref("")
const inputDescription = ref("")

const activeNames = ref(['0'])

const showControlledInformation = ref(gsaHumanStore.$state.currentInfos.viewStyle == 0)
const record = ref([
    {
        time: "20230521 12:05:00",
        operator: "Admin1 Chentt",
        location: "Description",
        result: "Finished",
        needFeedback: 0,
        remarks: "",
    },
    {
        time: "20230521 12:05:00",
        operator: "Admin1 Chentt",
        location: "Title",
        result: "Finished",
        needFeedback: 1,
        remarks: "",
    }, {
        time: "",
        operator: "",
        location: "",
        result: "",
        needFeedback: 0,
        remarks: "",
    }
])

const showTitle = ref(false)
const showDescription = ref(false)
const dialogTableVisible = ref(false)
//从后端返回一个sql值  
const feedbackDisable = ref(false)


const back = () => {
    router.go(-1)
}
const changeTitle = () => {
    ElMessageBox.confirm(
        'proxy will permanently change the title. Continue?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            if (inputTitle.value == "") {
                ElMessage({
                    type: 'warning',
                    message: 'Please input a title',
                })
                return null
            }
            title.value = inputTitle.value
            showTitle.value = false
            ElMessage({
                type: 'success',
                message: 'Title changed',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Canceled',
            })
        })
}
const showRecord = () => {
    dialogTableVisible.value = true
}
const getFeedBack = (value) => {
    if (value == 0) {
        return 'Yes'
    } else if (value == 1) {
        return "No"
    } else if (value == 2) {
        return "No need feedback"
    }
}
const getFeedbackDisable = (value) => {
    if (value == 1 || value == 2) {
        return true
    } else if (value == 0) {
        return false
    }
}
</script>

<style lang="less" scoped>
.title{
    font-size: 16px;
    color:#0070C0;
}
.el-collapse-item__header{
    background-color: red !important;
}
</style>