<template>
    <div class="basic_information">
        <el-row type="flex">
            <el-col :span="2" v-if="!showBasicInfo" :offset="22">
                <el-button type="primary" plain @click="showBasicInfo = true">Modify</el-button>
            </el-col>
        </el-row>

        <!-- 不可修改 -->
        <div v-if="!showBasicInfo" style="padding: 20px;">
            <el-row type="flex">
                <el-col :span="3">
                    <h3 class="subtitle">Title :</h3>
                </el-col>
                <el-col :span="20">
                    <h3 class="subtitle">{{ basicInfoList.title }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3 class="subtitle">Description :</h3>
                </el-col>
                <el-col :span="20">
                    <h3 class="subtitle">{{ basicInfoList.description }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3 class="subtitle">BioProject Accession:</h3>
                </el-col>
                <el-col :span="20">
                    <h3 class="subtitle">{{ basicInfoList.projectAccession }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3 class="subtitle">Release Time :</h3>
                </el-col>
                <el-col :span="20">
                    <h3 class="subtitle">{{ basicInfoList.releaseTime }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3 class="subtitle">Data Accessibility :</h3>
                </el-col>
                <el-col :span="20">
                    <h3 class="subtitle">{{ basicInfoList.dataAccessibility }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3 class="subtitle">Study Type :</h3>
                </el-col>
                <el-col :span="20">
                    <h3 class="subtitle">{{ basicInfoList.cohortStudyType }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3 class="subtitle">Is Foreign :</h3>
                </el-col>
                <el-col :span="5">
                    <h3 v-if="basicInfoList.isForeign == 1" class="subtitle">Yes</h3>
                    <h3 v-if="basicInfoList.isForeign == 0" class="subtitle">No</h3>
                </el-col>
            </el-row>
        </div>
        <!-- 可修改 -->
        <div v-if="showBasicInfo">
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Title :</h3>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.title" placeholder="Please enter a title" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Description :</h4>
                </el-col>
                <el-col :span="20">
                    <textarea v-model="form.description" rows="10" cols="200" style="resize: none;"></textarea>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>BioProject Accession:</h4>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="form.projectAccession" placeholder="Please select">
                        <el-option v-for="item in form.porjectAccessionList" :label="item.label" :value="item.value"
                            clearable>
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Release Time :</h4>
                </el-col>
                <el-col :span="20">
                    <el-date-picker v-model="form.releaseTime" type="date" placeholder="Pick a Date" format="YYYY-MM-DD" />
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Data Accessibility</h4>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="form.dataAccessibility" placeholder="Please select" clearable>
                        <el-option v-for="item in dataAccessibilityList" :label="item.label" :value="item.value" clearable
                            :key="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Study Type</h4>
                </el-col>
                <el-col :span="20">
                    <!-- <el-select v-model="form.cohortStudyType" placeholder="Please select" clearable>
                        <el-option v-for="item in cohortStudyTypeList" :label="item.label" :value="item.value" clearable
                            :key="item.value">
                        </el-option>
                    </el-select> -->
                    <h4>{{ basicInfoList.cohortStudyType }}</h4>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="1" :offset="22">
                    <el-button type="primary" plain @Click="submitBasicInfo">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @Click="showBasicInfo = false">Back</el-button>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Is Foreign :</h4>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="basicInfoList.isForeign" placeholder="Please select">
                        <el-option label="Yes" :value="1" clearable />
                        <el-option label="NO" :value="0" clearable />
                    </el-select>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script setup>
import useGsaHumanStore from "@/store/modules/GsaHuman";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const GsaHumanStore = useGsaHumanStore();

const showBasicInfo = ref(false)

const basicInfoList = ref(
    {
        title: 'Exome sequencing in fetal short long bones',
        description: "This study was conducted to identify the genetic causes for fetal short long bones (SLBs) and retrospectively evaluated the additional diagnostic yield of exome sequencing for SLBs following the use of conventional genetic testing.",
        projectAccession: "PRJCA012810",
        diseaseName: "monogenic disease",
        releaseTime: "2022-09-28",
        isForeign: 1,
        studyType: "Cohort Study",
        dataAccessibility: 'Controlled-access',
        cohortStudyType: 'Cohort Study',
        porjectAccessionList: [
            { label: 'PRJCA012810', value: 'PRJCA012810' }, { label: 'PRJCA012812', value: 'PRJCA012812' }, { label: 'PRJCA012813', value: 'PRJCA012813' }
        ]
    }
)
const form = ref(
    {
        title: 'Exome sequencing in fetal short long bones',
        description: "This study was conducted to identify the genetic causes for fetal short long bones (SLBs) and retrospectively evaluated the additional diagnostic yield of exome sequencing for SLBs following the use of conventional genetic testing.",
        projectAccession: "PRJCA012810",
        diseaseName: "monogenic disease",
        releaseTime: "2022-09-28",
        isForeign: 1,
        studyType: "Cohort Study",
        dataAccessibility: 'Controlled-access',
        cohortStudyType: 'Cohort Study',
        porjectAccessionList: [{ label: 'PRJCA012810', value: 'PRJCA012810' }, { label: 'PRJCA012812', value: 'PRJCA012812' }, { label: 'PRJCA012813', value: 'PRJCA012813' }]
    }
)
const dataAccessibilityList = ref([{ label: 'Controlled-access', value: 'Controlled-access' }, { label: 'Controlled-access1', value: 'Controlled-access1' }, { label: 'Controlled-access2', value: 'Controlled-access2' }])
const cohortStudyTypeList = ref([{ label: 'Cohort Study', value: 'Cohort Study' }, { label: 'Cohort Study1', value: 'Cohort Study1' }, { label: 'Cohort Study2', value: 'Cohort Study2' }])


function compareObjects(obj1, obj2) {
    const differentProperties = [];

    for (let prop in obj1) {
        if (obj1.hasOwnProperty(prop) && obj2.hasOwnProperty(prop)) {
            if (obj1[prop] !== obj2[prop]) {
                differentProperties.push(prop);
            }
        }
    }

    return differentProperties;
}

const submitBasicInfo = () => {
    showBasicInfo.value = false

    console.log(compareObjects(basicInfoList.value, form.value));
    basicInfoList.value = form.value
    console.log(form.value);
}

</script>

<style lang="less" scoped>
.basic_information{
    background-color: rgb(251, 250, 250);
}
.subtitle{
    font-size: 17px;
}
</style>