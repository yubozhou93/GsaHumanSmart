<template>
    <div class="experiment">
        <el-row>
            <el-col :span="2">
                <el-button type="primary" plain style="width: 120px;" @click="showDialog">Batch modification</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" plain @click="deletionDialogVisible = true" style="width: 100px;"
                    @Click="experimentBatchDeletionDialogVIsible = true">Batch
                    deletion</el-button>
            </el-col>
            <el-col :span="3" :offset="16">
                <el-input v-model="searchInput" placeholder="Please input" clearable />
            </el-col>
            <el-col :span="1">
                <el-button type="primary">Search</el-button>
            </el-col>
        </el-row>
        <br />
        <el-row type="flex">
            <el-col :span="24">
                <el-table :data="experimentData" style="width: 100%" border>
                    <el-table-column type="index" label="No." width="80" align="center" />
                    <el-table-column prop="experimentAccession" label="Experiment Accession" align="center" />
                    <el-table-column prop="experimentTitle" label="Experiment Title" align="center" />
                    <el-table-column prop="platform" label="Platform" align="center" />
                    <el-table-column prop="layout" label="Layout" align="center" />
                    <el-table-column prop="sampleAccession" label="Sample Accession" align="center" />
                    <el-table-column prop="sampleName" width="120" label="Sample Name" align="center" />
                    <el-table-column prop="experimentStatus" label="Experiment Status" align="center" />
                    <el-table-column fixed="right" label="Operations" align="center">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="experimentModify(scope)">Modify</el-button>
                            <el-button link type="primary" size="small" @click="experimentDelete(scope)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
    <!-- Experiment infromation modification -->
    <el-dialog v-model="experimentModificationDialogVisible" width="50%">
        <template #header>
            <h3>Experiment information modification</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="15" :offset="2">
                <span class="title"> Basic information : {{ form.runAccession }}</span>
            </el-col>
        </el-row>
        <el-form :model="form" class="layout">
            <el-row type="flex">
                <el-col :span="10" :offset="1">
                    <el-form-item label="Title: " :label-width="formLabelWidth">
                        <el-input v-model="form.experimentTitle" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="Project Accession: " label-width="140px">
                        <el-input v-model="form.experimentAccession" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="Platform: " :label-width="formLabelWidth">
                        <el-input v-model="form.platform" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="Sample Accession: " label-width="140px">
                        <el-input v-model="form.sampleAccession" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="20" :offset="1">
                    <el-form-item label="Layout: " :label-width="formLabelWidth">
                        <textarea rows="6" class="accessionTextArea" v-model="form.textAreaContext"></textarea>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="15" :offset="2">
                    <span class="title">Library</span>
                </el-col>
            </el-row>
            <el-row class="layout">
                <el-col :span="5" :offset="2">
                    <el-form-item label="Library name:" label-width="100px">
                        <el-input v-model="form.libraryName" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="Strategy:" label-width="100px">
                        <el-input v-model="form.strategy" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="Source:" label-width="100px">
                        <el-input v-model="form.source" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="Selection:" label-width="100px">
                        <el-input v-model="form.selection" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5" :offset="2">
                    <el-form-item label="Layout:" label-width="100px">
                        <el-input v-model="form.layout" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Insert Size(bp):" label-width="140px">
                        <el-input v-model="form.insertSize" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Nominal size (bp):" label-width="140px">
                        <el-input v-model="form.nominalSize" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item label="Nominal standard deviation(bp):" label-width="220px">
                        <el-input v-model="form.nominalStandardDeviation" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="15" :offset="2">
                    <span class="title">Processing</span>
                </el-col>
            </el-row>
            <el-row type="flex" class="layout">
                <el-col :span="20" :offset="2">
                    <el-form-item label="Planned read length of mate1(bp):" label-width="230px">
                        <el-input v-model="form.plannedReadLengthOfMate1" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="20" :offset="2">
                    <el-form-item label="Planned read length of mate2(bp):" label-width="230px">
                        <el-input v-model="form.plannedReadLengthOfMate2" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="experimentModificationDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="experimentModificationDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Experiment information Deletion -->
    <el-dialog v-model="experimentDeletionDialogVisible" width="50%">
        <template #header>
            <h3>Experiment information deletion</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="20" :offset="2">
                <el-table :data="experimentInformationDeletion" style="width: 100%" border>
                    <el-table-column type="index" label="No." width="80" align="center" />
                    <el-table-column prop="experimentAccession" label="Experiment  Accession" align="center" />
                    <el-table-column prop="experimentTitle" label="Experiment Title" align="center" />
                    <el-table-column prop="experimentStatus" label="Status" align="center" />
                </el-table>
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="experimentDeletionDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="experimentDeletionDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Batch Deletion -->
    <el-dialog v-model="experimentBatchDeletionDialogVIsible" width="50%">
        <template #header>
            <h3>Batch deletion</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="15" :offset="2">
                <span class="notification">Please enter the experiment accessions which need to be deleted</span>
            </el-col>
        </el-row>
        <el-row type="flex" style="margin-top: 10px;">
            <el-col :span="15" :offset="2">
                <textarea rows="12" class="accessionTextArea" v-model="textAreaContext"></textarea>
            </el-col>

            <el-col :span="15" :offset="2" style="margin-top: 10px;">
                <el-upload class="upload-demo" ref="upload" :auto-upload="false" action="interface" accept=".txt"
                    :on-change="onChange" drag-over-class="my-drag-over"><template #trigger>
                        <a class="el-upload__text">
                            <el-icon>
                                <UploadFilled />
                            </el-icon>
                            <em>Click here and upload a file</em>
                        </a>
                    </template>
                </el-upload>
            </el-col>
            <el-col :span="2" :offset=1 style="margin-top: 10px;">
                <el-button type="primary" plain @click="getFileListDelete">Confirm</el-button>
            </el-col>
        </el-row>
        <br />

        <el-row type="flex" v-if="showDeleteFile">
            <el-col :span="18" :offset="2">
                <span class="notification">Please confirm the experiment information to be deleted:</span>
            </el-col>
            <el-col :span="20" :offset="2" style="margin-top: 10px;">
                <el-table :data="deletionData" style="width: 100%" border>
                    <el-table-column type="index" label="No." align="center" />
                    <el-table-column prop="experimentAccession" label="Experiment Accession" align="center" />
                    <el-table-column prop="experimentTitle" label="Experiment Title" align="center" />
                    <el-table-column prop="status" label="Status" width="80" align="center" />
                </el-table>
                <el-pagination v-model:current-page="currentPage3" v-model:page-size="pageSize3" :small="small"
                    :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="300"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="experimentBatchDeletionDialogVIsible = false">Cancel</el-button>
                <el-button type="primary" @click="experimentBatchDeletionDialogVIsible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Batch modificaiton -->
    <batchModification ref="batchModificationVue"></batchModification>
</template>

<script setup>
import { ref } from 'vue'
import { UploadFilled } from "@element-plus/icons-vue";
import batchModification from '@/commentComponent/batchModification.vue';
import useGsaHumanStore from "../../../store/modules/GsaHuman";

const GsaHumanStore = useGsaHumanStore();

const experimentData = ref([{
    experimentAccession: "HRX555465",
    experimentTitle: "title1",
    platform: "MGISEQ-2000RS",
    layout: "FRAGMENT",
    sampleAccession: "HRS453275",
    sampleName: "91995603",
    experimentStatus: "Checked OK Confidential",
}, {
    experimentAccession: "HRX555466",
    experimentTitle: "title2",
    platform: "MGISEQ-2000RS",
    layout: "FRAGMENT",
    sampleAccession: "HRS453274",
    sampleName: "91714603",
    experimentStatus: "Checked OK Confidential",
}, {
    experimentAccession: "",
    experimentTitle: "",
    platform: "",
    layout: "",
    sampleAccession: "",
    sampleName: "",
    experimentStatus: "",
},])
const deletionData = ref([{
    experimentAccession: "HRX555465",
    experimentTitle: "title1",
    status: 10
}, {
    experimentAccession: "HRX555466",
    experimentTitle: "title2",
    status: 10
}, {
    experimentAccession: "",
    experimentTitle: "",
    status: 0
}
])
const currentPage3 = ref(5)
const pageSize3 = ref(100)

const searchInput = ref('')
const textAreaContext = ref('')

const batchModificationVue = ref()

const form = ref({ textAreaContext: "" })
const experimentInformationDeletion = ref([])

const deletionDialogVisible = ref(false)
const experimentModificationDialogVisible = ref(false)
const experimentDeletionDialogVisible = ref(false)
const experimentBatchDeletionDialogVIsible = ref(false)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const showDeleteFile = ref(false)
const showConfirmButton = ref(true)

const formLabelWidth = '80px'
var fileDatas = [];

const experimentDelete = (val) => {
    experimentInformationDeletion.value = []
    experimentInformationDeletion.value.push(experimentData.value[val.$index])
    experimentDeletionDialogVisible.value = true
}
const experimentModify = (val) => {
    form.value = { textAreaContext: "" }
    form.value = experimentData.value[val.$index]
    console.log(form.value);
    experimentModificationDialogVisible.value = true
}
const onChange = (file, fileList) => {
    if (fileList.length > 1) {
        fileList.splice(0, 1);
    }
    var reader = new FileReader();
    reader.readAsText(file.raw, "UTF-8");
    reader.onload = function () {
        fileDatas.unshift(reader.result);
    };
};
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
}
const getFileListDelete = () => {
    if (fileDatas != "") {
        textAreaContext.value = fileDatas
    }
    if (textAreaContext.value == "") {
        ElMessage({
            message: 'Warning, please upload a file or put accessions in the text box.',
            type: 'warning',
        })
        return
    }
    showConfirmButton.value = false
    showDeleteFile.value = true
    console.log(textAreaContext.value);
}
const showDialog=()=>{
    GsaHumanStore.$state.currentTable='experiment'
    batchModificationVue.value.show()
}
</script>

<style lang="less" scoped>
.accessionTextArea {
    width: 120%;
    resize: none;
}

.accessionTextArea {
    width: 120%;
    resize: none;
}

.upload-demo {
    .el-upload__text {
        font-family: "微软雅黑", Arial;
        font-size: 20px;
        color: var(--el-color-primary);
        text-decoration: underline;
    }
}

.notification {
    font-size: large;
}

.title {
    font-size: large;
    font-weight: bold;
}

.layout {
    margin-top: 10px;
}
</style>