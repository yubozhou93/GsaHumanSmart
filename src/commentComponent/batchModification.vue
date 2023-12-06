<template>
    <div class="home">
        <el-dialog title=" Batch modification" v-model="modificationDialogVisible" width="80%">
            <template #header>
                <h3>Batch modification</h3>
                <el-divider />
            </template>
            <h2>Please provide the information to be modified. All the information has been modified according to {{
                GsaHumanStore.$state.currentTable }} accession as the reference field</h2>
            <el-row type="flex">
                <el-col :span="24">
                    <span>The field to be modified</span>
                </el-col>

                <div class="checkedBox" style="border: solid;">
                    <el-checkbox v-for="(item, index) in checkedList" :label="item" v-model="isSelected"
                        @change="unselected(index, item)"></el-checkbox>
                </div>
                <el-col :span="20">
                    <el-checkbox v-for="(item, index) in labelList" :label="item" @change="selected(index, item)"
                        v-model="isChecked"></el-checkbox>
                </el-col>

                <el-col :span="22">
                    <el-checkbox label="New keyword" v-model="addKeyword"></el-checkbox>
                </el-col>
                <el-col :span="5" v-if="addKeyword">
                    <el-input v-model="newKeyWordInput" placeholder="Please enter a new keyword" clearable></el-input>
                </el-col>
                <el-col :span="5" v-if="addKeyword">
                    <el-button type="primary" plain @click="addNewKeyword">Add keyword</el-button>
                </el-col>
                <el-col :span="5" style="margin-top: 10px;">
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
                <el-col :span="2" style="margin-top: 10px;">
                    <el-button type="primary" plain @click="showResult">Check</el-button>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="22" v-if="isShowResult">
                    <span style="color: red;" v-if="modificationCheckedResult == 1">Checked failed</span>
                    <span style="color: #548235;" v-if="modificationCheckedResult == 2">Checked ok</span>
                </el-col>
                <el-col :span="22" v-if="modificationCheckedResult == 2">

                    <el-table :data="showTable" style="width: 100%">
                        <el-table-column type="index" label="No." />
                        <template v-for="(item, index) in showTable">
                            <el-table-column v-for="(value, key) in item" :label="key" :prop="value"></el-table-column>
                        </template>
                    </el-table>
                </el-col>
            </el-row>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modificationDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="modificationDialogVisible = false">
                        Modify
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { UploadFilled } from "@element-plus/icons-vue";
import useGsaHumanStore from "@/store/modules/GsaHuman";

const GsaHumanStore = useGsaHumanStore();

const newKeyWordInput = ref("")
const checkedList = ref([])

const modificationCheckedResult = ref(0)

//测试用
const count = ref(0)


const modificationDialogVisible = ref(false)
const isChecked = ref(false)
const isSelected = ref(true)
const addKeyword = ref(false)


const showTable = ref([])
const labelList = ref([])
const individualList = ["individual_name",
    "gender",
    "existed_individual_accession",
    "experiment_group",
    "disease name",
    "disease_stage",
    "treatment",
    "survival time ",
    "is_smoker",
    "is_drinker",
    "height",
    "body_weight",
    "body_mass_index",
    "ethnicity",
    "province",
    "occupation",
    "race",
    "birthplace",
    "custom_attributes_1"
]
const sampleList = ['*sample_name',
'*tissue',
'*individual_ID',
'*age',
'*age_unit',
'*public_description',
'*sample_title',
'*collection_date',
'*biomaterial_provider',
'culture_collection',
'karyotype',
'phenotype',
'population',
'custom_attributes_1']
const basicList = ['submitter',
    'title',
    'description',
    'prj_accession',
    'disease_name',
    'is_controlled_access',
    'release_time'
]
const experimentList = ['*Experiment title',
    '*BioProject accession',
    '*BioSample name',
    '*Platform',
    '*Library Construction / Experimental Design',
    'Library name',
    '* Strategy',
    '*Source',
    '*Selection',
    '*Layout',
    '*Read length for mate 1(bp)',
    'Read length for mate 2 (bp)',
    'Insert size (bp)',
    'Nominal size (bp)',
    'Nominal standard deviation (bp)',
    'Planned number of cycles'
]
const runList = ['*Run title',
    '*BioProject accession',
    '*Experiment accession',
    '*Run data file type',
    '*File name 1',
    '*MD5 checksum 1',
    'File name 2',
    'MD5 checksum 2',
    'Reference file name',
    'MD5 for reference file',
    'Assembly Name or Accession',
    'Assembly Accession URL'
]
const familyList = ['*sample_name',
    '*tissue',
    '*individual_ID',
    '*age',
    '*age_unit',
    '*public_description',
    '*sample_title',
    '*collection_date',
    '*biomaterial_provider',
    'culture_collection',
    'karyotype',
    'phenotype',
    'population',
    'custom_attributes_1'
]

var fileDatas = [];

const show = () => {
    modificationDialogVisible.value = true
    if(GsaHumanStore.$state.currentTable == 'individual'){
        labelList.value = individualList
    }else if(GsaHumanStore.$state.currentTable == 'sample'){
        labelList.value = sampleList
    }else if(GsaHumanStore.$state.currentTable == 'experiment'){
        labelList.value = experimentList
    }else if(GsaHumanStore.$state.currentTable == 'run'){
        labelList.value = runList
    }else if(GsaHumanStore.$state.currentTable == 'family'){
        labelList.value = familyList
    }else if(GsaHumanStore.$state.currentTable == 'basic'){
        labelList.value = basicList
    }
}

const selected = (index, item) => {
    checkedList.value.push(labelList.value[index])
    isChecked.value = false
    labelList.value.splice(index, 1);

}
const unselected = (index, item) => {
    labelList.value.push(checkedList.value[index])
    isSelected.value = true
    checkedList.value.splice(index, 1);
}
const addNewKeyword = () => {
    if (newKeyWordInput.value == '') {
        ElMessage({
            message: 'Warning, keyword could not be null.',
            type: 'warning',
        })
    }
    ElMessageBox.confirm(
        'This operation will add this word to database. Continue?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            //添加到数据库
            checkedList.value.push(newKeyWordInput.value)
            ElMessage({

                type: 'success',
                message: 'Success',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Canceled',
            })
        })


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
const showResult = () => {
    //真实操作需要
    // if(fileDatas.length == 0){
    //     ElMessage({
    //         message: 'Warning, please upload a fill.',
    //         type: 'warning',
    //     })
    //     return
    // }
    showTable.value = []
    var item = {}
    item[GsaHumanStore.$state.currentTable + ' accession'] = '1'
    for (var index in checkedList.value) {
        item[checkedList.value[index]] = '2'
        item['New' + checkedList.value[index]] = '3'
    }
    showTable.value.push(item)
    // for( var itemx in showTable.value){
    //     // console.log(showTable.value[itemx]);
    //     for(var itemy in showTable.value[itemx])
    //     {
    //         console.log(showTable.value[itemx][itemy]);
    //     }
    // }
    console.log(showTable.value);
    count.value++
    if (count.value % 2 == 0) {
        modificationCheckedResult.value = 1
    } else {
        modificationCheckedResult.value = 2
    }
}
const isShowResult = () => {
    if (modificationCheckedResult.value == 0) {
        return false
    } else {
        return true
    }
}

defineExpose({
    show
})

</script>

<style lang="less" scoped>
.checkedBox {
    border: solid;
    width: 80%;
    height: 100px;
    border-radius: 0.5em;
}

.upload-demo {
    .el-upload__text {
        font-family: "微软雅黑", Arial;
        font-size: 20px;
        color: var(--el-color-primary);
        text-decoration: underline;
    }
}
</style>