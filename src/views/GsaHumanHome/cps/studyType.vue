<template>
    <div class="Study type">
        <el-row type="flex">
            <el-col :span="22">
                <h2>Study type</h2>
            </el-col>
            <el-col :span="2" v-if="!showInfo">
                <el-button type="primary" plain @click="showInfo = true">Modify</el-button>
            </el-col>
        </el-row>
        <!-- Disease study -->
        <div v-if="!showInfo && gsaHumanStore.$state.studyType === 1">
            <el-row type="flex">
                <el-col :span="5">
                    <h3>Disease Name :</h3>
                </el-col>
                <el-col :span="15">
                    <h3>{{ diseaseStudyList.diseaseName }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="5">
                    <h3>Is Longitudinal :</h3>
                </el-col>
                <el-col :span="15">
                    <h3 v-if="diseaseStudyList.isLongitudinal == 1">Yes</h3>
                    <h3 v-if="diseaseStudyList.isLongitudinal == 0">No</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="5">
                    <h3>Is Trios :</h3>
                </el-col>
                <el-col :span="15">
                    <h3 v-if="diseaseStudyList.isTrios == 1">Yes</h3>
                    <h3 v-if="diseaseStudyList.isTrios == 0">No</h3>
                </el-col>
            </el-row>
        </div>
        <!-- Disease study可修改 -->
        <div v-if="showInfo && gsaHumanStore.$state.studyType === 1">
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Disease Name :</h3>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="diseaseForm.diseaseName" placeholder="Please select">
                        <el-option v-for="item in diseaseList" :label="item" :value="item" clearable>
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Is Longitudinal :</h3>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="diseaseForm.isLongitudinal" placeholder="Please select">
                        <el-option label="Yes" :value="1" clearable />
                        <el-option label="No" :value="0" clearable />
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Is Trios :</h3>
                </el-col>
                <el-col :span="20">
                    <!-- <el-select v-model="form.isTrios" placeholder="Please select">
                        <el-option label="Yes" :value="1" clearable />
                        <el-option label="No" :value="0" clearable />
                    </el-select> -->
                    <h3 v-if="diseaseForm.isTrios == 1">Yes</h3>
                    <h3 v-if="diseaseForm.isTrios == 0">No</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="1" :offset="22">
                    <el-button type="primary" plain @Click="submitDiseaseStudyType">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @Click="showInfo = false">Back</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- Cohort study不可修改 -->
        <div v-if="!showInfo && gsaHumanStore.$state.studyType === 2">
            <el-row type="flex">
                <el-col :span="5">
                    <h3>Cohort Study Type :</h3>
                </el-col>
                <el-col :span="15">
                    <h3 v-if="cohortForm.cohortStudyType == 1">Disease-related Cohort</h3>
                    <h3 v-if="cohortForm.cohortStudyType == 2">Healthy Population Cohort</h3>
                    <h3 v-if="cohortForm.cohortStudyType == 3">Other Study : {{ cohortForm.otherStudy }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="5">
                    <h3>Disease Name :</h3>
                </el-col>
                <el-col :span="15">
                    <h3>{{ cohortStudyList.diseaseName }}</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="5">
                    <h3>Is Longitudinal :</h3>
                </el-col>
                <el-col :span="15">
                    <h3 v-if="cohortStudyList.isLongitudinal == 1">Yes</h3>
                    <h3 v-if="cohortStudyList.isLongitudinal == 0">No</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="5">
                    <h3>Is Trios :</h3>
                </el-col>
                <el-col :span="15">
                    <h3 v-if="cohortStudyList.isTrios == 1">Yes</h3>
                    <h3 v-if="cohortStudyList.isTrios == 0">No</h3>
                </el-col>
            </el-row>
        </div>
        <!-- Cohort study可修改 -->
        <div v-if="showInfo && gsaHumanStore.$state.studyType === 2">
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Cohort Study Type :</h3>
                </el-col>
                <el-col :span="20">
                    <!-- <el-input v-model="cohortForm.cohortStudyType" placeholder="Please enter Cohort Study Type"
                        clearable></el-input> -->

                    <el-select v-model="cohortForm.cohortStudyType" placeholder="Please select">
                        <el-option v-for="item in cohortStudyTypeList" :label="item.label" :value="item.value" clearable>
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex" v-if="cohortForm.cohortStudyType == 3">
                <el-col :span="3"><h3>Other Study :</h3> </el-col>
                <el-col :span="15">
                    <el-input v-model="cohortForm.otherStudy" placeholder="Please Input" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Disease Name :</h3>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="cohortForm.diseaseName" placeholder="Please select">
                        <el-option v-for="item in diseaseList" :label="item" :value="item" clearable>
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Is Longitudinal :</h3>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="cohortForm.isLongitudinal" placeholder="Please select">
                        <el-option label="Yes" :value="1" clearable />
                        <el-option label="No" :value="0" clearable />
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h3>Is Trios :</h3>
                </el-col>
                <el-col :span="20">
                    <!-- <el-select v-model="form.isTrios" placeholder="Please select">
                        <el-option label="Yes" :value="1" clearable />
                        <el-option label="No" :value="0" clearable />
                    </el-select> -->
                    <h3 v-if="cohortForm.isTrios == 1">Yes</h3>
                    <h3 v-if="cohortForm.isTrios == 0">No</h3>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="1" :offset="22">
                    <el-button type="primary" plain @Click="submitStudyType">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @Click="showInfo = false">Back</el-button>
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
const gsaHumanStore = useGsaHumanStore();

const cohortForm = ref({
    cohortStudyType: 1,
    otherStudy:"",
    diseaseName: 'monogenic disease',
    isLongitudinal: 0,
    isTrios: 0

})
const diseaseForm = ref({
    cohortStudyType: 'Disease-related Cohort',
    diseaseName: 'monogenic disease',
    isLongitudinal: 0,
    isTrios: 0

})

const showInfo = ref(false)

const diseaseStudyList = ref({
    cohortStudyType: 'Disease-related Cohort',
    diseaseName: 'monogenic disease',
    isLongitudinal: 0,
    isTrios: 0

})
const cohortStudyList = ref({
    cohortStudyType: 1,
    otherStudy:"",
    diseaseName: 'monogenic disease',
    isLongitudinal: 0,
    isTrios: 0

})
const diseaseList = ref(["Disease1", "Disease2", "Disease3", "monogenic disease"])
const cohortStudyTypeList = ref([
    { label: "Disease-related Cohort", value: 1 },
    { label: "Healthy Population Cohort", value: 2 },
    { label: "Other Cohort", value: 3 },
])

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
const submitStudyType = () => {
    showInfo.value = false
    var mid = []
    mid = form.value
    cohortStudyList.value = mid
}
const submitDiseaseStudyType = () => {
}
</script>

<style lang="less" scoped></style>