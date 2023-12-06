<template>
    <div class="controlledInformation">
        <el-row type="flex">
            <el-col :span="22">
                <h2>Controlled Information</h2>
            </el-col>
            <el-col :span="2" v-if="!showControlledInfo">
                <el-button type="primary" plain @click="showControlledInfo = true">Modify</el-button>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="2">Data Sharing Limitation: </el-col>
            <el-col :span="3" v-if="!showControlledInfo" v-for="item in ControlledInfoList.dataSharingLimitation"><span>{{
                item }}</span></el-col>
            <el-col :span="10" v-if="showControlledInfo">
                <el-checkbox-group v-model="form.dataSharingLimitation">
                    <el-checkbox v-for="item in limitationList" :label="item">{{
                        item
                    }}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="2">Data Sharing Limitation: </el-col>
            <el-col :span="10" v-if="!showControlledInfo">
                <span v-if="ControlledInfoList.isOrganizationConfirm == 1">Yes</span>
                <span v-if="ControlledInfoList.isOrganizationConfirm == 0">No</span>
            </el-col>
            <el-col :span="10" v-if="showControlledInfo">
                <el-select v-model="form.isOrganizationConfirm" placeholder="Please input">
                    <el-option label="Yes" :value="1" clearable />
                    <el-option label="No" :value="0" clearable />
                </el-select>
            </el-col>
        </el-row>
        <template v-if="showControlledInfo">
            <el-row type="flex">
                <el-col :span="1" :offset="22">
                    <el-button type="primary" plain @Click="submitcontrolledInformation">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @Click="showControlledInfo = false">Back</el-button>
                </el-col>
            </el-row>
        </template>

    </div>
</template>

<script setup>
import useGsaHumanStore from "@/store/modules/GsaHuman";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const GsaHumanStore = useGsaHumanStore();

const showControlledInfo = ref(false)

const limitationList = ref(["General purpose use", "Non-profitable use", "Commercial activity"])
const form = ref({
    dataSharingLimitation: ['General purpose use', 'Non-profitable use'],
    isOrganizationConfirm: 0

})

const ControlledInfoList = ref({
    dataSharingLimitation: ['General purpose use', 'Non-profitable use'],
    isOrganizationConfirm: 0

})

const submitcontrolledInformation = () => {
    console.log(form.value);
    showControlledInfo.value = false
}
</script>

<style lang="less" scoped></style>