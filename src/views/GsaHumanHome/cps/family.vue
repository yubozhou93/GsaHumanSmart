<template>
    <div class="family">
        <el-row>
            <el-col :span="2">
                <el-button type="primary" plain style="width: 120px;" @click="showDialog">Batch modification</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" plain @click="deletionDialogVisible = true" style="width: 100px;"
                    @Click="familyBatchDeletionDialogVIsible = true">Batch
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
                <el-table :data="familyData" style="width: 100%" border>
                    <el-table-column type="index" label="No." align="center" width="80" />
                    <el-table-column prop="familiyAccession" label="Familiy accession" align="center" />
                    <el-table-column prop="sample_name" label="*sample name" align="center" />
                    <el-table-column prop="tissue" label="*tissue" width="80" align="center" />
                    <el-table-column prop="sample_title" label="*sample title" align="center" />
                    <el-table-column prop="collection_date" label="collection date" align="center" />
                    <el-table-column prop="biomaterial_provider" label="*biomaterial provider" align="center" />
                    <el-table-column prop="karyotype" label="karyotype" align="center" />
                    <el-table-column prop="population" label="population" align="center" />
                    <el-table-column fixed="right" label="Operations" align="center">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="familyModify(scope)">Modify</el-button>
                            <el-button link type="primary" size="small" @click="familyDelete(scope)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
    <!-- Family infromation modification -->
    <el-dialog v-model="familyModificationDialogVisible" width="50%">
        <template #header>
            <h3>Family information modification</h3>
            <el-divider />
        </template>
        <el-row type="flex" class="modificationFiled" style="margin-top: -50px;">
            <el-col :span="24">
                <h3>Required modification field:</h3>
            </el-col>
            <el-col :span="8">
                <el-row type="flex">
                    <el-col :span="24">
                        <span>Family Title</span>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-input v-model="form.familyTitle" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex">
                    <el-col :span="24">
                        <span>Individual Accession</span>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-select v-model="form.individualAccession" class="m-2" placeholder="Select" size="large">
                                <el-option v-for="item in individualAccessionList" :key="item" :label="item"
                                    :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex">
                    <el-col :span="24">
                        <span>Mother's Individual Accession</span>
                    </el-col>
                    <el-col :span="22">
                        <!--选项要修改 individualAccessionList -->
                        <el-form-item>
                            <el-select v-model="form.motherIndividualAccession" class="m-2" placeholder="Select"
                                size="large">
                                <el-option v-for="item in individualAccessionList" :key="item" :label="item"
                                    :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex">
                    <el-col :span="24">
                        <span>Father's Individual Accession</span>
                    </el-col>
                    <el-col :span="22">
                        <!--选项要修改 individualAccessionList -->
                        <el-form-item>
                            <el-select v-model="form.FatherIndividualAccession" class="m-2" placeholder="Select"
                                size="large">
                                <el-option v-for="item in individualAccessionList" :key="item" :label="item"
                                    :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row type="flex" class="modificationFiled">
            <el-col :span="24">
                <h3>Optional modification field:</h3>
            </el-col>
            <el-col :span="8">
                <el-row type="flex">
                    <el-col :span="24">
                        <span>Monozygotic Twins Accession</span>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item>
                            <el-input v-model="form.monozygoticTwinsAccession" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="submitFamilyModification">Cancel</el-button>
                <el-button type="primary" @click="familyModificationDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Family information Deletion -->
    <el-dialog v-model="familyDeletionDialogVisible" width="50%">
        <template #header>
            <h3>Family information deletion</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="20" :offset="2">
                <el-table :data="familyInformationDeletion" style="width: 100%" border>
                    <el-table-column prop="familiyAccession" label="Familiy accession" align="center" />
                    <el-table-column prop="sample_name" label="*sample name" align="center" />
                    <el-table-column prop="sample_title" label="*sample title" align="center" />
                    <el-table-column prop="tissue" label="*tissue" align="center" />
                    <el-table-column prop="collection_date" label="collection date" align="center" />
                    <el-table-column prop="biomaterial_provider" label="biomaterial provider" align="center" />
                    <el-table-column prop="karyotype" label="karyotype" align="center" />
                    <el-table-column prop="population" label="population" align="center" />
                </el-table>
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="familyDeletionDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="familyDeletionDialogVisible = false">
                    Modify
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- Batch Deletion -->
    <el-dialog v-model="familyBatchDeletionDialogVIsible" width="50%">
        <template #header>
            <h3>Batch deletion</h3>
            <el-divider />
        </template>
        <el-row type="flex">
            <el-col :span="15" :offset="2">
                <span class="notification">Please enter the family accessions which need to be deleted</span>
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
                <span class="notification">Please confirm the family information to be deleted:</span>
            </el-col>
            <el-col :span="20" :offset="2" style="margin-top: 10px;">
                <el-table :data="deletionData" style="width: 100%" border>
                    <el-table-column prop="familiyAccession" label="Familiy accession" align="center" />
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
                <el-button @click="familyBatchDeletionDialogVIsible = false">Cancel</el-button>
                <el-button type="primary" @click="familyBatchDeletionDialogVIsible = false">
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

const familyModificationDialogVisible = ref(false)
const familyDeletionDialogVisible = ref(false)
const deletionDialogVisible = ref(false)
const familyBatchDeletionDialogVIsible = ref(false)
const showConfirmButton = ref(true)
const showDeleteFile = ref(false)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const currentPage3 = ref(5)
const pageSize3 = ref(100)

const batchModificationVue = ref()

const searchInput = ref('')
const textAreaContext = ref('')

var fileDatas = [];

const familyData = ref([{
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
const individualAccessionList = ref(['HRI283600', 'HRI283599'])

const form = ref({})

const familyInformationDeletion = ref([])

const familyModify = (val) => {
    familyModificationDialogVisible.value = true
}
const familyDelete = (val) => {
    familyInformationDeletion.value = []
    familyDeletionDialogVisible.value = true
    familyInformationDeletion.value.push(familyData.value[val.$index])
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
    GsaHumanStore.$state.currentTable = 'family'
    batchModificationVue.value.show()
}
const submitFamilyModification = () => {
    console.log(form.value);
    familyModificationDialogVisible.value = false
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

.modificationFiled {
    margin-left: 30px;
}
</style>