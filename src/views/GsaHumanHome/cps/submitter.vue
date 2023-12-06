<template>
    <div class="Submitter">
        <el-row type="flex">
            <el-col :span="22">
                <h3>Submitter Information</h3>
            </el-col>
            <el-col :span="2" v-if="!showSubmitterInfo">
                <el-button type="primary" plain @click="showSubmitterInfo = true">Modify</el-button>
            </el-col>
        </el-row>

        <!-- 不可修改 -->

        <el-row type="flex">
            <el-col :span="3">
                <h3>Email :</h3>
            </el-col>
            <el-col :span="20">
                <h4>{{ submitterInfoList.email }}</h4>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="3">
                <h4>Organization :</h4>
            </el-col>
            <el-col :span="6">
                <h4>{{ submitterInfoList.organization }}</h4>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="3">
                <h4>Department :</h4>
            </el-col>
            <el-col :span="6">
                <h4>{{ submitterInfoList.department }}</h4>
            </el-col>
        </el-row>
        <el-row type="flex">
                <el-col :span="3">
                    <h4>Country :</h4>
                </el-col>
                <el-col :span="6">
                    <h3>{{ submitterInfoList.Country }}</h3>
                </el-col>
            </el-row>
        <el-row type="flex">
            <el-col :span="3">
                <h4>Postal Code :</h4>
            </el-col>
            <el-col :span="6">
                <h4>{{ submitterInfoList.postalCode }}</h4>
            </el-col>
        </el-row>
        <div v-if="!showSubmitterInfo">
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Personal Home Page :</h4>
                </el-col>
                <el-col :span="16">
                    <a :href="submitterInfoList.personalHomePage">{{ submitterInfoList.personalHomePage }}</a>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Organization Home Page :</h4>
                </el-col>
                <el-col :span="16">
                    <a :href="submitterInfoList.organizationHomePage">{{ submitterInfoList.organizationHomePage }}</a>
                </el-col>
            </el-row>
    
        </div>
        <!-- 可修改 -->
        <div v-if="showSubmitterInfo">
            <!-- <el-row type="flex">
                <el-col :span="3">
                    <h3>Email :</h3>
                </el-col>
                <el-col :span="20">
                    <h4>{{ submitterInfoList.email }}</h4>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Organization :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.organization" placeholder="Please enter a organization" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Department :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.department" placeholder="Please enter a department" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Postal Code :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.postalCode" placeholder="Please enter a postal Code" clearable></el-input>
                </el-col>
            </el-row> -->
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Personal Home Page :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.personalHomePage" placeholder="Please enter the personal home page"
                        clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Organization Home Page :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.organizationHomePage" placeholder="Please enter the organization home page"
                        clearable></el-input>
                </el-col>
            </el-row>
            <!-- <el-row type="flex">
                <el-col :span="3">
                    <h4>Country :</h4>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="form.Country" placeholder="Select">
                        <el-option v-for="(item, index) in contriesList" :label="item.label" :value='item.value' />
                    </el-select>
                </el-col>
            </el-row> -->
            <el-row type="flex">
                <el-col :span="1" :offset="22">
                    <el-button type="primary" plain @Click="submitSubmitterInfo">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @Click="showSubmitterInfo = false">Back</el-button>
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

const showSubmitterInfo = ref(false)

const submitterInfoList = ref({
    email: 'zhengzhe@fuwai.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    postalCode: '511443',
    Country: 'China',
    personalHomePage: 'https://baike.baidu.com/item/%E5%BC%A0%E5%BD%A6/57918436?fr=aladdin',
    organizationHomePage: 'http://www.e3861.com/cn/'
})
const contriesList = ref([{
    value: 'China',
    label: 'China',
},
{
    value: 'French',
    label: 'French',
},
{
    value: 'Canada',
    label: 'Canada',
},])

const form = ref({
    email: 'zhengzhe@fuwai.com',
    organization: 'Guangdong Women and Children Hospital',
    department: 'Center for Medical Genetics',
    postalCode: '511443',
    Country: 'China',
    personalHomePage: 'https://baike.baidu.com/item/%E5%BC%A0%E5%BD%A6/57918436?fr=aladdin',
    organizationHomePage: 'http://www.e3861.com/cn/'
})

function compareObjects(obj1, obj3) {
    const differentProperties = [];

    for (let prop in obj1) {
        if (obj1.hasOwnProperty(prop) && obj3.hasOwnProperty(prop)) {
            if (obj1[prop] !== obj3[prop]) {
                differentProperties.push(prop);
            }
        }
    }

    return differentProperties;
}

const submitSubmitterInfo = () => {
    showSubmitterInfo.value = false

    console.log(compareObjects(submitterInfoList.value, form.value));
    submitterInfoList.value = form.value
    console.log(form.value);
}

</script>

<style lang="less" scoped></style>