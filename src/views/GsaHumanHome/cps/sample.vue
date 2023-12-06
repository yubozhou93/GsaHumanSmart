<template>
    <div class="sample">
        <el-row>
            <el-col :span="2">
                <el-button type="primary" plain style="width: 120px;" @click="showDialog">Batch modification</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" plain @click="deletionDialogVisible = true" style="width: 100px;"
                    @Click="sampleBatchDeletionDialogVIsible = true">Batch
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
                <el-table :data="sampleData" style="width: 100%" border>
                    <el-table-column type="index" label="No." align="center" width="80" />
                    <el-table-column prop="sample_name" label="*sample name" align="center" />
                    <el-table-column prop="tissue" label="*tissue" width="80" align="center" />
                    <el-table-column prop="sample_title" label="*sample title" align="center" />
                    <el-table-column prop="collection_date" label="collection date" align="center" />
                    <el-table-column prop="biomaterial_provider" label="*biomaterial provider" align="center" />
                    <el-table-column prop="karyotype" label="karyotype" align="center" />
                    <el-table-column prop="population" label="population" align="center" />
                    <el-table-column fixed="right" label="Operations" align="center">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="sampleModify(scope)">Modify</el-button>
                            <el-button link type="primary" size="small" @click="sampleDelete(scope)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
    <!-- Sample infromation modification -->
    <el-dialog v-model="sampleModificationDialogVisible" width="50%" style="height: 700px;overflow-y: auto;">
        <template #header>
            <h3>Sample information modification</h3>
            <el-divider />
        </template>
        <!-- CellLine/General -->
        <div v-if="gsaHumanStore.$state.sampleType===1">
            <el-row type="flex" class="modificationFiled" style="margin-top: -50px;">
                <el-col :span="24">
                    <h3 v-if="gsaHumanStore.$state.individualType===1">General</h3>
                    <h3 v-if="gsaHumanStore.$state.individualType===2">Cell Line</h3>
                </el-col>
                <el-col :span="24">
                    <h3>Required modification field:</h3>
                </el-col>
                <el-col v-for="(attribute, index) in generalListRequired" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ attribute }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="generalform[attribute]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
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
                                    <el-input v-model="generalform[item]" clearable></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6" v-if="gsaHumanStore.$state.individualType===1">
                        <el-row type="flex">
                            <el-col :span="24">
                                <span>Population</span>
                            </el-col>
                            <el-col :span="22">
                                <el-form-item>
                                    <el-input v-model="generalform.Population" clearable></el-input>
                                </el-form-item>
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
                                <el-input v-model="generalNewKeyword" placeholder="Please enter a new keyword"
                                    clearable></el-input>
                            </el-col>
                            <el-col :span="13" style="margin-top: 5px;">
                                <span>Value: </span>
                                <el-input v-model="generalNewKeywordValue"
                                    placeholder="Please enter the value of new keyword" clearable></el-input>
                            </el-col>
                            <el-col :span="13" style="margin-top: 5px;">
                                <el-button type="primary" plain>Add</el-button>
                                <el-button plain>Cancel</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-row>
        </div>
        <!-- Clinical_pathogen -->
        <div v-if="gsaHumanStore.$state.sampleType===2">
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Clinical pathogen</h3>
                </el-col>
                <el-col :span="24">
                    <h3>Required modification field:</h3>
                </el-col>
                <el-col v-for="(attribute, index) in clinicalPathogenListRequired" :key="index" :span="6">
                    <el-row type="flex">
                        <el-col :span="24">
                            <span>{{ attribute }}</span>
                        </el-col>
                        <el-col :span="22">
                            <el-form-item>
                                <el-input v-model="clinicalPathogenForm[attribute]" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
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
                                <el-input v-model="clinicalPathogenNewKeyword" placeholder="Please enter a new keyword"
                                    clearable></el-input>
                            </el-col>
                            <el-col :span="13" style="margin-top: 5px;">
                                <span>Value: </span>
                                <el-input v-model="clinicalPathogenNewKeywordValue"
                                    placeholder="Please enter the value of new keyword" clearable></el-input>
                            </el-col>
                            <el-col :span="13" style="margin-top: 5px;">
                                <el-button type="primary" plain>Add</el-button>
                                <el-button plain>Cancel</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-row>
        </div>
        <!-- Human associated metagenome -->
        <div v-if="gsaHumanStore.$state.sampleType===3">
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <h3>Human associated metagenome</h3>
                </el-col>
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
            </el-row>
            <el-row type="flex" class="modificationFiled">
                <el-col :span="24">
                    <el-checkbox v-model="addNewkeywordhumanAssociatedMetagenome" label="Add a new keyword" size="large" />
                </el-col>
                <el-col :span="18" v-if="addNewkeywordhumanAssociatedMetagenome">
                    <el-row>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>New keyword: </span>
                            <el-input v-model="humanAssociatedMetagenomeNewKeyword" placeholder="Please enter a new keyword"
                                clearable></el-input>
                        </el-col>
                        <el-col :span="13" style="margin-top: 5px;">
                            <span>Value: </span>
                            <el-input v-model="humanAssociatedMetagenomeNewKeywordValue"
                                placeholder="Please enter the value of new keyword" clearable></el-input>
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
                <el-button @click="sampleModificationDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="sampleModificationDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Experiment information Deletion -->
    <el-dialog v-model="sampleDeletionDialogVisible" width="50%">
        <template #header>
            <h3>Sample information deletion</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="20" :offset="2">
                <el-table :data="sampleInformationDeletion" style="width: 100%" border>
                    <el-table-column prop="sample_name" label="*sample name" align="center" />
                    <el-table-column prop="tissue" label="*tissue" align="center" />
                    <el-table-column prop="sample_title" label="*sample title" align="center" />
                    <el-table-column prop="collection_date" label="collection date" align="center" />
                    <el-table-column prop="biomaterial_provider" label="biomaterial provider" align="center" />
                    <el-table-column prop="karyotype" label="karyotype" align="center" />
                    <el-table-column prop="population" label="population" align="center" />
                </el-table>
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="sampleDeletionDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="sampleDeletionDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Batch Deletion -->
    <el-dialog v-model="sampleBatchDeletionDialogVIsible" width="50%">
        <template #header>
            <h3>Batch deletion</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="15" :offset="2">
                <span class="notification">Please enter the sample accessions which need to be deleted</span>
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
                <span class="notification">Please confirm the sample information to be deleted:</span>
            </el-col>
            <el-col :span="20" :offset="2" style="margin-top: 10px;">
                <el-table :data="deletionData" style="width: 100%" border>
                    <el-table-column type="index" label="No." align="center" width="80" />
                    <el-table-column prop="sample_name" label="*sample name" align="center" />
                    <el-table-column prop="tissue" label="*tissue" width="80" align="center" />
                    <el-table-column prop="sample_title" label="*sample title" align="center" />
                    <el-table-column prop="collection_date" label="collection date" align="center" />
                    <el-table-column prop="biomaterial_provider" label="*biomaterial provider" align="center" />
                    <el-table-column prop="karyotype" label="karyotype" align="center" />
                    <el-table-column prop="population" label="population" align="center" />
                </el-table>
                <el-pagination v-model:current-page="currentPage3" v-model:page-size="pageSize3" :small="small"
                    :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="300"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="sampleBatchDeletionDialogVIsible = false">Cancel</el-button>
                <el-button type="primary" @click="sampleBatchDeletionDialogVIsible = false">
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

const gsaHumanStore = useGsaHumanStore();

const searchInput = ref('')
const textAreaContext = ref('')

//各个种类 new keyword 的值
const generalNewKeyword = ref('')
const generalNewKeywordValue = ref('')
const clinicalPathogenNewKeyword = ref('')
const clinicalPathogenNewKeywordValue = ref('')
const humanAssociatedMetagenomeNewKeyword = ref('')
const humanAssociatedMetagenomeNewKeywordValue = ref('')


const batchModificationVue = ref()

const showConfirmButton = ref(true)
const deletionDialogVisible = ref(false)
const sampleModificationDialogVisible = ref(false)
const sampleDeletionDialogVisible = ref(false)
const sampleBatchDeletionDialogVIsible = ref(false)
const showDeleteFile = ref(false)
//添加关键词标志
const addNewkeywordGeneral = ref(false)
const addNewkeywordclinicalPathogen = ref(false)
const addNewkeywordhumanAssociatedMetagenome = ref(false)



const sampleInformationDeletion = ref([])

const currentPage3 = ref(5)
const pageSize3 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
//提交的表单
const generalform = ref({})
const clinicalPathogenForm = ref({})
const humanAssociatedMetagenomeForm = ref({})

var fileDatas = [];


const sampleData = ref([{
    experimentAccession: "HRX555465",
    sample_name: "title1",
    platform: "MGISEQ-2000RS",
    layout: "FRAGMENT",
    sampleAccession: "HRS453275",
    sample_title: "91995603",
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

//模拟数据
const generalListRequired = ref(['*Sample_Name',
    '*Tissue',
    '*Individual_Accession',
    '*Age',
    '*Age_Unit',
    '*Public_Description',
    '*Sample_Title',
    '*Collection_Date',
    '*Biomateria_Provider'
])
const generalListOptional = ref(['Culture_Collection',
    'Karyotype',
    'Phenotype',
])
const clinicalPathogenListRequired = ref(['Sample_Name',
    'Individual_Accession',
    'Public_Description',
    'Sample_Title',
    'Organism',
    'Collected_By',
    'Collection_Date',
    'Geographic_Location',
    'Isolation_Source',
    'Latitude_Longitude',

])
const clinicalPathogenListOptional = ref(['Isolate',
    'Strain',
    'Culture_Collection',
    'Genotype',
    'Host_Tissue_Sampled',
    'Host_Age',
    'Host_Age_Unit',
    'Passage_History',
    'Pathotype',
    'Serotype',
    'Serovar',
    'Specimen_Voucher',
    'Subgroup',
    'Subtype'
])
const humanAssociatedMetagenomeListRequired = ref(['Sample_Name',
    'Individual_Accession',
    'Environment_Type',
    'Public_Description',
    'Sample_Title',
    'Organism',
    'Collection_Date',
    'Env_Broad_Scale',
    'Env_Local_Scale',
    'Environment_Medium',
    'Host',
    'Geographic_Location',
    'Latitude_Longitude',
])
const humanAssociatedMetagenomeListOptional = ref([
    'Chemical_Administration',
    'Gastrointestinal_Tract_Disorder',
    'Host_Age',
    'Host_Age_Unit',
    'Host_Body_Product',
    'Host_Body_Temperature',
    'Host_Diet',
    'Host_Genotype',
    'Host_Phenotype',
    'Host_Tissue_Sampled',
    'Isolation_Source',
    'Liver_Disorder',
    'Nose_Mouth_Teeth_Throat_Disorder',
    'Pulmonary_Disorder',
    'Dermatology_Disorder',
    'Gynecologic_Disorder',
    'Urogenit_Disorder',
    'Medical_History_Performed',
    'Organism_Count',
    'Oxygenation_Status'
])

const sampleModify = (val) => {
    sampleModificationDialogVisible.value = true
}
const sampleDelete = (val) => {
    sampleDeletionDialogVisible.value = true
    sampleInformationDeletion.value = []
    sampleInformationDeletion.value.push(sampleData.value[val.$index])
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
const showDialog = () => {
    gsaHumanStore.$state.currentTable = 'sample'
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
</style>