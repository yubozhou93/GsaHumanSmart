<template>
    <div class="individual">
        <el-row >
            <el-col :span="2" style="min-width: 125px;">
                <el-button type="primary" plain style="width: 120px;" @click="showDialog">Batch modification</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" plain @click="deletionDialogVisible = true" style="width: 100px;">Batch
                    deletion</el-button>
            </el-col>
            <el-col :span="3" :offset="15">
                <el-input v-model="searchInput" placeholder="Please input" clearable />
            </el-col>
            <el-col :span="1">
                <el-button type="primary">Search</el-button>
            </el-col>
        </el-row>
        <br />
        <el-row type="flex">
            <el-col :span="24">
                <el-table :data="individualData" style="width: 100%">
                    <el-table-column type="index" label="No." width="90" align="center" />
                    <el-table-column prop="individualAccession" label="Individual Accession" align="center" />
                    <el-table-column prop="individual_name" label="*individual_name" align="center" />
                    <el-table-column prop="gender" label="*gender" align="center" />
                    <el-table-column prop="existed_individual_accession" label="existed_individual_accession" width="240"
                        align="center" />
                    <el-table-column prop="experiment_group" label="*experiment_group" align="center" />
                    <el-table-column fixed="right" label="Operations" align="center">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="individualModify(scope)">Modify</el-button>
                            <el-button link type="primary" size="small" @click="individualDelete(scope)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
    <!-- Batch Deletion -->
    <el-dialog title="Batch Deletion" v-model="deletionDialogVisible" width="50%">
        <el-row type="flex">
            <el-col :span="15" :offset="2">
                <span>Please enter the individual accessions which need to be deleted</span>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="15" :offset="2">
                <textarea rows="12" class="accessionTextArea" v-model="textAreaContext"></textarea>
            </el-col>

            <el-col :span="15" :offset="2" style="margin-top: 10px;">
                <el-upload class="upload-demo" ref="upload" :auto-upload="false" action="interface" accept=".txt"
                    :on-change="onChange" drag-over-class="my-drag-over"><template #trigger>
                        <a class="el-upload__text">
                            <el-icon class="uploadIcon">
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
                <span>Please confirm the individual information to be deleted:</span>
            </el-col>
            <el-col :span="20" :offset="2">
                <el-table :data="deletionData" style="width: 100%" border>
                    <el-table-column type="index" label="No." width="90" align="center" />
                    <el-table-column prop="runAccession" label="Run Accession" width="130" align="center" />
                    <el-table-column prop="runAlias" label="Run Alias" width="90" align="center" />
                    <el-table-column prop="type" label="Run data file type" width="145" align="center" />
                    <el-table-column label="File Name" align="center">
                        <template #default="scope">
                            <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.fileName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="File status" width="95" align="center">
                        <template #default="scope">
                            <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.status }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="Status" width="80" align="center" />
                </el-table>
                <el-pagination v-model:current-page="currentPage3" v-model:page-size="pageSize3" :small="small"
                    :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="300"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="deletionDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitDelete">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Batch modification -->
    <batchModification ref="batchModificationVue"></batchModification>
    <!-- Individual infromation modification -->
    <el-dialog v-model="individualModificationDialogVisible" width="50%" style="height: 700px;overflow-y: auto;">
        <template #header>
            <h3>Individual information modification</h3>
            <el-divider />
        </template>
        <!-- general -->
        <div v-if="gsaHumanStore.$state.individualType===1">
            <el-row type="flex" class="modificationFiled" style="margin-top: -50px;">
                <el-col :span="24">
                    <h3>Required modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in generalListRequired" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="generalForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Optional modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in generalListOptional" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="generalForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>Is smoker?</span>
                        </el-col>
                        <el-col :span="20">
                            <el-select v-model="generalForm.isSmoker" placeholder="Select">
                                <el-option label="Yes" value="1" />
                                <el-option label="No" value="0" />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>Is drinker?</span>
                        </el-col>
                        <el-col :span="20">
                            <el-select v-model="generalForm.isDrinker" placeholder="Select">
                                <el-option label="Yes" value="1" />
                                <el-option label="No" value="0" />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <el-checkbox v-model="addNewkeywordGeneral" label="Add a new keyword" size="large" />
                </el-col>
                <el-col :span="18" v-if="addNewkeywordGeneral">
                    <el-row>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>New keyword: </span>
                            <el-input v-model="generalNewKeyword" placeholder="Please enter a new keyword" clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>Value: </span>
                            <el-input v-model="generalNewKeywordValue" placeholder="Please enter the value of new keyword"
                                clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <el-button type="primary" plain>Add</el-button>
                            <el-button plain>Cancel</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- Cellline -->
        <div v-if="gsaHumanStore.$state.individualType===2">
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Required modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in cellLineListRequired" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="cellLineForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Optional modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in cellLineListOptional" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="cellLineForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <el-checkbox v-model="addNewkeywordCellLine" label="Add a new keyword" size="large" />
                </el-col>
                <el-col :span="18" v-if="addNewkeywordCellLine">
                    <el-row>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>New keyword: </span>
                            <el-input v-model="cellLineNewKeyword" placeholder="Please enter a new keyword" clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>Value: </span>
                            <el-input v-model="cellLineNewKeywordValue" placeholder="Please enter the value of new keyword"
                                clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <el-button type="primary" plain>Add</el-button>
                            <el-button plain>Cancel</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- Clinical_pathogen -->
        <div v-if="gsaHumanStore.$state.individualType===3">
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Required modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in clinicalPathogenListRequired" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="clinicalPathogenForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Optional modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in clinicalPathogenListOptional" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="clinicalPathogenForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <el-checkbox v-model="addNewkeywordclinicalPathogen" label="Add a new keyword" size="large" />
                </el-col>
                <el-col :span="18" v-if="addNewkeywordclinicalPathogen">
                    <el-row>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>New keyword: </span>
                            <el-input v-model="clinicalPathogenNewKeyword" placeholder="Please enter a new keyword" clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>Value: </span>
                            <el-input v-model="clinicalPathogenNewKeywordValue" placeholder="Please enter the value of new keyword"
                                clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <el-button type="primary" plain>Add</el-button>
                            <el-button plain>Cancel</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- Human_associated_metagenome -->
        <div v-if="gsaHumanStore.$state.individualType===4">
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Required modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in humanAssociatedMetagenomeListRequired" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="humanAssociatedMetagenomeForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Optional modification field:</h3>
                </el-col>
                <el-col v-for="(item, index) in humanAssociatedMetagenomeListOptional" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ item }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="humanAssociatedMetagenomeForm[item]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>Is smoker?</span>
                        </el-col>
                        <el-col :span="20">
                            <el-select v-model="generalForm.isSmoker" placeholder="Select">
                                <el-option label="Yes" value="1" />
                                <el-option label="No" value="0" />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>Is drinker?</span>
                        </el-col>
                        <el-col :span="20">
                            <el-select v-model="generalForm.isDrinker" placeholder="Select">
                                <el-option label="Yes" value="1" />
                                <el-option label="No" value="0" />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <el-checkbox v-model="addNewkeywordhumanAssociatedMetagenome" label="Add a new keyword" size="large" />
                </el-col>
                <el-col :span="18" v-if="addNewkeywordhumanAssociatedMetagenome">
                    <el-row>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>New keyword: </span>
                            <el-input v-model="humanAssociatedMetagenomeNewKeyword" placeholder="Please enter a new keyword" clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>Value: </span>
                            <el-input v-model="humanAssociatedMetagenomeNewKeywordValue" placeholder="Please enter the value of new keyword"
                                clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <el-button type="primary" plain>Add</el-button>
                            <el-button plain>Cancel</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="submitIndividualModification">Cancel</el-button>
                <el-button type="primary" @click="individualModificationDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Individual information Deletion -->
    <el-dialog v-model="individualDeletionDialogVisible" width="50%">
        <template #header>
            <h3>Individual information deletion</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="20" :offset="2">
                <el-col :span="24">
                    <el-table :data="individualInformationDeletion" style="width: 100%" border>
                        <el-table-column prop="individualAccession" label="Individual Accession" align="center" />
                        <el-table-column prop="individual_name" label="*individual name" align="center" />
                        <el-table-column prop="gender" label="*gender" align="center" />
                        <el-table-column prop="existed_individual_accession" label="existed individual accession"
                            width="240" align="center" />
                        <el-table-column prop="experiment_group" label="*experiment group" align="center" />
                    </el-table>
                </el-col>
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="individualDeletionDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="individualDeletionDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { UploadFilled } from "@element-plus/icons-vue";
import batchModification from '@/commentComponent/batchModification.vue';
import useGsaHumanStore from "../../../store/modules/GsaHuman";

const gsaHumanStore = useGsaHumanStore();

const currentPage3 = ref(5)
const pageSize3 = ref(100)

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
//添加关键词标志
const addNewkeywordGeneral = ref(false)
const addNewkeywordCellLine = ref(false)
const addNewkeywordclinicalPathogen= ref(false)
const addNewkeywordhumanAssociatedMetagenome= ref(false)

const searchInput = ref('')
const textAreaContext = ref('')

// 要提交的表单
const generalForm = ref({})
const cellLineForm = ref({})
const clinicalPathogenForm = ref({})
const humanAssociatedMetagenomeForm = ref({})

//各个种类 new keyword 的值
const generalNewKeyword = ref('')
const generalNewKeywordValue = ref('')
const clinicalPathogenNewKeyword = ref('')
const clinicalPathogenNewKeywordValue = ref('')
const cellLineNewKeyword = ref('')
const cellLineNewKeywordValue = ref('')
const humanAssociatedMetagenomeNewKeyword = ref('')
const humanAssociatedMetagenomeNewKeywordValue = ref('')

//子组件ref
const batchModificationVue = ref()
// 单行删除的table绑定值
const individualInformationDeletion = ref([])

const deletionDialogVisible = ref(false)
// const modificationDialogVisible = ref(true)
const individualDeletionDialogVisible = ref(false)
const individualModificationDialogVisible = ref(false)
const showConfirmButton = ref(true)
const showDeleteFile = ref(false)


const individualData = [{
    individualAccession: "HRI283600",
    individual_name: "920123003",
    gender: "male",
    existed_individual_accession: "1111111",
    experiment_group: "Case set",
}, {
    individualAccession: "HRI283599",
    individual_name: "91714603",
    gender: "male",
    existed_individual_accession: "2222222222222",
    experiment_group: "Case set",
}, {
    individualAccession: "",
    individual_name: "",
    gender: "",
    existed_individual_accession: "",
    experiment_group: "",
}]
const deletionData = ref([{
    runAccession: "HRR0059190",
    runAlias: "Run1",
    type: "Fastq",
    runFiles: [{
        fileName: "Aaa_R1.fastq.gz",
        status: 10
    },
    {
        fileName: "Aaa_R2.fastq.gz",
        status: 10
    }],
    status: 10
}, {
    runAccession: "HRR0059191",
    runAlias: "Run2",
    type: "Fastq",
    runFiles: [{
        fileName: "Aaa_R1.fastq.gz",
        status: 10
    },
    {
        fileName: "Aaa_R2.fastq.gz",
        status: 10
    }],
    status: 10
}, {
    runAccession: "",
    runAlias: "",
    type: "",
    runFiles: [{
        fileName: "",
        status: ""
    }],
    status: ""
}
])

//单个修改显示列表
const generalListRequired = ref(['Individual_Name',
    'Gender',
    'Experiment_Group'

])
const generalListOptional = ref(['Existed_Individual_Accession',
    'Disease_Name',
    'Disease_Stage',
    'Treatment',
    'Survival_Time',
    'Height(m)',
    'Body_Weight(kg)',
    'Body_Mass_Index(BMI)',
    'Ethnicity',
    'Province',
    'Cccupation',
    'Race',
    'Birthplace',
])
const cellLineListRequired = ref(['Cell_Line_Name',
    'Tissue',
    'Gender',
])
const cellLineListOptional = ref(['Ethnicity',
    'Web_Url'
])
const clinicalPathogenListRequired = ref(['Individual_Name',
    'Gender'
])
const clinicalPathogenListOptional = ref(['Existed_Individual_Accession',
    'Disease_Name',
    'Race',
    'Description',
    'Disease_Outcome',
    'Disease_Stage',
    'Health_State',
])
const humanAssociatedMetagenomeListRequired = ref(['Individual_Name',
    'Gender'
])
const humanAssociatedMetagenomeListOptional = ref([
    'Existed_Individual_Accession',
    'Experiment_Group',
    'Description',
    'Disease_Name',
    'Disease_Stage',
    'Disease_Outcome',
    'Treatment',
    'Height(m)',
    'Body_Weight(kg)',
    'Body_Mass_Index(BMI)',
    'Ethnicity',
    'Province',
    'Occupation',
    'Race',
])



var fileDatas = [];

const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
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
const submitDelete = () => {
    console.log(textAreaContext);
    // deletionDialogVisible.value = false
}
const individualDelete = (val) => {
    individualInformationDeletion.value = []
    individualDeletionDialogVisible.value = true
    individualInformationDeletion.value.push(individualData[val.$index])
}
const individualModify = (val) => {
    individualModificationDialogVisible.value = true
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
const showDialog = () => {
    gsaHumanStore.$state.currentTable = 'individual'
    batchModificationVue.value.show()
}
const submitIndividualModification = () => {

    console.log(generalForm.value);
    individualModificationDialogVisible.value = false
}
</script>

<style lang="less" scoped>
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

.modificationFiled {
    margin-left: 30px;
}

// .innerData{
//     height: 100%;
//     width: 100%;
//     border: solid;
// }
</style>