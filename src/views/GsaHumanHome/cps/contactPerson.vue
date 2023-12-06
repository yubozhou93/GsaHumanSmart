<template>
    <div class="Contact person">
        <el-row type="flex">
            <el-col :span="22">
                <h2>Contact person Information</h2>
            </el-col>
            <el-col :span="2" v-if="!showContactPersonInfo">
                <el-button type="primary" plain @click="showContactPersonInfo = true">Modify</el-button>
            </el-col>
        </el-row>
        <!-- 不可修改 -->
        <div v-if="!showContactPersonInfo">
            <el-row type="flex">
                <el-col :span="3">
                    <h3>First Name :</h3>
                </el-col>
                <el-col :span="5">
                    <h4>{{ contactPersonList.firstName }}</h4>
                </el-col>
                <el-col :span="3">
                    <h4>Middle Name :</h4>
                </el-col>
                <el-col :span="5">
                    <h4>{{ contactPersonList.middleName }}</h4>
                </el-col>
                <el-col :span="3">
                    <h4>Last Name :</h4>
                </el-col>
                <el-col :span="5">
                    <h4>{{ contactPersonList.lastName }}</h4>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Email :</h4>
                </el-col>
                <el-col :span="20">
                    <h4>{{ contactPersonList.email }}</h4>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Institute/Organization :</h4>
                </el-col>
                <el-col :span="20">
                    <h4>{{ contactPersonList.organization }}</h4>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Department :</h4>
                </el-col>
                <el-col :span="20">
                    <h4>{{ contactPersonList.department }}</h4>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="3">
                    <h4>Country/Region :</h4>
                </el-col>
                <el-col :span="20">
                    <h4>{{ contactPersonList.country }}</h4>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="1">
                    <h4>Street :</h4>
                </el-col>
                <el-col :span="3">
                    <h4>{{ contactPersonList.street }}</h4>
                </el-col>
                <el-col :span="1">
                    <h4>City :</h4>
                </el-col>
                <el-col :span="3">
                    <h4>{{ contactPersonList.city }}</h4>
                </el-col>
                <el-col :span="1">
                    <h4>State :</h4>
                </el-col>
                <el-col :span="3">
                    <h4>{{ contactPersonList.state }}</h4>
                </el-col>
                <el-col :span="2">
                    <h4>Postal Code :</h4>
                </el-col>
                <el-col :span="3">
                    <h4>{{ contactPersonList.postalCode }}</h4>
                </el-col>
            </el-row>
        </div>
        <!-- 可修改 -->
        <div v-if="showContactPersonInfo">
            <el-row type="flex">
                <el-col :span="4">
                    <h3>First Name :</h3>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.firstName" placeholder="Please enter the first name" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h3>Middle Name :</h3>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.middleName" placeholder="Please enter the middle name" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h3>Last Name :</h3>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.lastName" placeholder="Please enter a last name" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h3>Email :</h3>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.email" placeholder="Please enter Email" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h3>Institute/Organization :</h3>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.organization" placeholder="Please enter the Organization" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h3>Department :</h3>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.department" placeholder="Please enter the Department" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h4>Street :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.street" placeholder="Please enter a street" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h4>City :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.city" placeholder="Please enter a City" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h4>State :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.state" placeholder="Please enter a state" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h4>Postal Code :</h4>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="form.postalCode" placeholder="Please enter a postal Code" clearable></el-input>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="4">
                    <h4>Country :</h4>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="form.country" placeholder="Select">
                        <el-option v-for="(item, index) in contriesList" :label="item.label" :value='item.value' />
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="1" :offset="22">
                    <el-button type="primary" plain @Click="submitContactPerson">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @Click="showContactPersonInfo = false">Back</el-button>
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

const contactPersonList = ref({
    firstName: "Yan",
    middleName: "",
    lastName: "Zhang",
    email: "Yan zhengzhe@fuwai.com",
    organization: "Guangdong Women and Children Hospital",
    department: "Center for Medical Genetics",
    street: "Qinghe road",
    city: "Huizhou",
    state: "GuangZhou",
    postalCode: "511442",
    country: "China",

})
const form = ref({
    firstName: "Yan",
    middleName: "",
    lastName: "Zhang",
    email: "Yan zhengzhe@fuwai.com",
    organization: "Guangdong Women and Children Hospital",
    department: "Center for Medical Genetics",
    street: "Qinghe road",
    city: "Huizhou",
    state: "GuangZhou",
    postalCode: "511442",
    country: "China",

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

const showContactPersonInfo = ref(false)



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

const submitContactPerson = () => {
    showContactPersonInfo.value = false

    console.log(compareObjects(contactPersonList.value, form.value));
    contactPersonList.value = form.value
    console.log(form.value);
}

</script>

<style lang="less" scoped></style>