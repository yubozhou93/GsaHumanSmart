<template>
  <div class="journal">
    <el-row :gutter="0" class="row-bg" v-loading="loading">
      <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <span>Journal inserted with success !</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="dialogVisibleFalse" title="Tips" width="30%">
        <span>This journal already in DB!</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisibleFalse = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisibleFalse = false">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-col :span="16" :offset="4" class="row">
        <h2>journal</h2>
        <el-divider border-style="dashed" />
        <div class="notification">{{ notificationJournal }}</div>
        <el-col :span="8" :offset="7" class="col">
          <!-- <template v-if="Object.keys(notificationJournal).length">
            <el-alert :title="notificationJournal" type="error" />
          </template> -->
          <el-input v-model="journal" placeholder="Please input" clearable>
            <template #prepend>Journal</template>
          </el-input>
        </el-col>
        <br />
        <div class="notification">{{ notificationPublisher }}</div>
        <el-col :span="8" :offset="7" class="col">
          <el-input v-model="publisher" placeholder="Please input" clearable>
            <template #prepend>Publisher</template>
          </el-input>
        </el-col>
        <br />
        <el-col :span="10" :offset="10"
          ><el-button
            type="primary"
            round
            @click="insertJournal"
            id="insertJournal"
            >Insert journal</el-button
          ></el-col
        >
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
let loading = ref(false);
const dialogVisible = ref(false);
const dialogVisibleFalse = ref(false);
const notificationJournal = ref();
const notificationPublisher = ref();
const journal = ref("");
const publisher = ref("");

const insertJournal = () => {
  notificationJournal.value = "";
  let journalToDb = { journal: "", publisher: "" };
  if (journal.value == "") {
    notificationJournal.value = "Please input a journal name!";
    return null;
  }
  if (publisher.value == "") {
    notificationPublisher.value = "Please input this journal's publisher!";
    return null;
  }
  journalToDb.journal = journal.value;
  journalToDb.publisher = publisher.value;
  loading.value = true;
  axios
    // .post("http://localhost:8089/api/gsa/journal", journalToDb, {
    .post("http://192.168.164.26:8088/api/gsa/journal", journalToDb, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
    .then((ret) => {
      loading.value = false;
      if(ret.data==1){
      dialogVisible.value = true;
      }else if(ret.data==0){
        dialogVisibleFalse.value = true;
      }
    });
};
</script>

<style lang="less" scoped>
.journal {
  border-radius: 3ch;
  box-shadow: var(--el-box-shadow-dark);
  #insertJournal {
    margin-bottom: 10px;
    font-size: 18px;
  }
}
.notification {
  margin-left: 30%;
  color: red;
  font-family: "微软雅黑", Arial;
  font-size: 12px;
}
</style>