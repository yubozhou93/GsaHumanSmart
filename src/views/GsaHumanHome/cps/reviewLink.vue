<template>
    <div class="review_link">
        <el-row type="flex">
            <el-col :span="22" :offset=1>
                <el-table :data="reviewLinkList" style="width: 100%" border>
                    <el-table-column type="index" label="No." align=center />
                    <el-table-column label="Random" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24"><span style="color: #07C4F6;text-decoration:underline">{{
                                    scope.row.random }}</span></el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="Expore Time" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24" v-if="scope.row.isModify === 0"><span>{{ scope.row.exporeTime
                                }}</span></el-col>
                                <el-col :span="22" v-if="scope.row.isModify === 1">
                                    <el-date-picker v-model="scope.row.exporeTime" type="datetime" placeholder="Pick a Date"
                                        format="YYYY-MM-DD HH:mm:ss" />
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="Delete Time" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24"><span>{{ scope.row.deleteTime }}</span></el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="is Email" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24"><span v-if="scope.row.isEmail == 1">Yes</span></el-col>
                                <el-col :span="24"><span v-if="scope.row.isEmail == 0">No</span></el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="is Data Link" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24" v-if="scope.row.isModify === 0"><span
                                        v-if="scope.row.isDataLink == 1">Yes</span></el-col>
                                <el-col :span="24" v-if="scope.row.isModify === 0"><span
                                        v-if="scope.row.isDataLink == 0">No</span></el-col>
                                <el-col :span="24" v-if="scope.row.isModify === 1">
                                    <el-select v-model="scope.row.isDataLink" placeholder="Please select">
                                        <el-option label="Yes" :value="1" clearable />
                                        <el-option label="No" :value="0" clearable />
                                    </el-select>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="is Hide" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24" v-if="scope.row.isModify === 0"><span
                                        v-if="scope.row.isHide == 1">Yes</span></el-col>
                                <el-col :span="24" v-if="scope.row.isModify === 0"><span
                                        v-if="scope.row.isHide == 0">No</span></el-col>
                                <el-col :span="24" v-if="scope.row.isModify === 1">
                                    <el-select v-model="scope.row.isHide" placeholder="Please select">
                                        <el-option label="Yes" :value="1" clearable />
                                        <el-option label="No" :value="0" clearable />
                                    </el-select>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="Status" align=center>
                        <template #default="scope">
                            <el-row type="flex">
                                <el-col :span="24"><span v-if="scope.row.status == 1"
                                        style="color: greenyellow;">Effectual</span></el-col>
                                <el-col :span="24"><span v-if="scope.row.status == 0"
                                        style="color:red">Deteted</span></el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="Operations" width="120" align=center>
                        <template #default="scope">
                            <el-row type="flex" v-if="!isChange">
                                <el-col :span="24" v-if="scope.row.status == 1 && !isAllDete"> <el-button link
                                        type="primary" plain @click="modify(scope.row)">Modify</el-button></el-col>
                                <el-col :span="24" v-if="scope.row.status == 1 && !isAllDete"> <el-button link
                                        type="primary" plain @click="deleteData(scope.row)">Delete</el-button></el-col>
                                <el-col :span="24" v-if="scope.row.status == 0 && isAllDete"> <el-button link type="primary"
                                        plain @click="recover(scope.row)">Recover</el-button></el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br />
        <template v-if="isChange">
            <el-row type="flex">
                <el-col :span="1" :offset="21">
                    <el-button type="primary" plain @click="submitData">Submit</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button @click="cancelChange">Back</el-button>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script setup>
import { ref } from "vue";

const reviewLinkList = ref([{
    random: "I30zbDwj",
    creatTime: '2023-01-01 12:00:00',
    exporeTime: '2023-03-01 12:00:00',
    deleteTime: '2023-03-02 12:00:00',
    isEmail: 1,
    isDataLink: 0,
    isHide: 0,
    status: 0,
    isModify: 0
},
{
    random: "cq5QOyVo",
    creatTime: '2023-03-01 12:00:00',
    exporeTime: '2023-06-01 12:00:00',
    deleteTime: '--',
    isEmail: 0,
    isDataLink: 1,
    isHide: 1,
    status: 1,
    isModify: 0
}])
const isAllDete = ref(false)
// const isAllDete = ref(true)
const isChange = ref(false)


const modify = (value) => {
    value.isModify = 1
    isChange.value = true
}
const recover = (value) => {
    value.isModify = 1
    value.isEmail = 0
    value.deleteTime = '--'
    isChange.value = true
    let date = new Date();
    date.setMonth(date.getMonth() + 3);
    value.exporeTime = date.toISOString();
}
const deleteData = (value) => {

}
const submitData = () => {
    for (var item in reviewLinkList.value) {
        reviewLinkList.value[item].isModify = 0
    }
    isChange.value = false
    console.log(reviewLinkList.value);
}
const cancelChange = () => {
    for (var item in reviewLinkList.value) {
        reviewLinkList.value[item].isModify = 0
    }
    isChange.value = false
}
</script>

<style lang="less" scoped>
.review_link{
    background-color: rgb(251, 250, 250);
    padding-top: 20px;
}
</style>