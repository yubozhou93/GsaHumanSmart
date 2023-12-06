<template>
  <div class="vue">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" plain style="width: 120px;" @click="showDialog">Batch modification</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain @click="deletionDialogVisible = true" style="width: 100px;">Batch
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
        <el-table :data="deletionData" style="width: 100%" border>
          <el-table-column type="index" label="No." width="80" align="center" />
          <el-table-column prop="runAccession" label="Run Accession" align="center" />
          <el-table-column prop="runAlias" label="Run Alias" align="center" />
          <el-table-column prop="type" label="Run data file type" align="center" />
          <el-table-column label="File Name" align="center">
            <template #default="scope">
              <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.fileName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Md5" align="center">
            <template #default="scope">
              <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.md5 }}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" align="center">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="runModify(scope)">Modify</el-button>
              <el-button link type="primary" size="small" @click="runDelete(scope)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
  <!-- Batch Deletion -->
  <el-dialog title="Batch Deletion" v-model="deletionDialogVisible" width="50%">
    <template #header>
      <h3>Batch deletion</h3>
      <el-divider />
    </template>
    <el-row type="flex">
      <el-col :span="15" :offset="2">
        <span class="notification">Please enter the run accessions which need to be deleted</span>
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
        <span class="notification">Please confirm the Run information to be deleted:</span>
      </el-col>
      <el-col :span="20" :offset="2" style="margin-top: 10px;">
        <el-table :data="deletionData" style="width: 100%" border>
          <el-table-column type="index" label="No." align="center" />
          <el-table-column prop="runAccession" label="Run Accession" width="130" align="center" />
          <el-table-column prop="runAlias" label="Run Alias" width="90" align="center" />
          <el-table-column prop="type" label="Run data file type" width="145" align="center" />
          <el-table-column label="File Name" align="center">
            <template #default="scope">
              <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.fileName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="File status" width="95" align="center">
            <template #default="scope">
              <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.status }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="80" align="center" />
        </el-table>
        <el-pagination v-model:current-page="currentPage3" v-model:page-size="pageSize3" :small="small"
          :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="300"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deletionDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitDelete" :disabled="showConfirmButton">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- Run information Deletion -->
  <el-dialog v-model="runDeletionDialogVisible" width="50%">
    <template #header>
      <h3>Run information deletion</h3>
      <el-divider />
    </template>
    <el-row type="flex">
      <el-col :span="20" :offset="2">
        <el-table :data="runInformationDeletion" style="width: 100%" border>
          <el-table-column type="index" label="No." align="center" />
          <el-table-column prop="runAccession" label="Run Accession" width="130" align="center" />
          <el-table-column prop="runAlias" label="Run Alias" width="90" align="center" />
          <el-table-column prop="type" label="Run data file type" width="145" align="center" />
          <el-table-column label="File Name" align="center">
            <template #default="scope">
              <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.fileName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="File status" width="95" align="center">
            <template #default="scope">
              <div class="innerData" v-for="(item, index) in scope.row.runFiles">{{ item.status }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="80" align="center" />
        </el-table>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="runDeletionDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="runDeletionDialogVisible = false">
          Delete
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- Run information Modification -->
  <el-dialog title="Run information modification" v-model="runModificationDialogVisible" width="50%">
    <template #header>
      <h3>Run information Modification</h3>
      <el-divider />
    </template>
    <!-- Run information -->
    <div style="margin-top: -50px; margin-left: 50px;">
      <span class="title"> Run information : </span><span>{{ form.runAccession }}</span>
      <el-row type="flex" style="margin-top: 10px">
        <el-col :span="12">
          <el-row type="flex">
            <el-col :span="24"><span>Alias</span></el-col>
            <el-col :span="22"><el-input v-model="form.runAlias" /></el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row type="flex">
            <el-col :span="24"><span>Run date type</span></el-col>
            <el-col :span="22"><el-select v-model="form.type" placeholder="Please select a type" clearable>
                <el-option label="fastq" value="fastq" />
                <el-option label="bam" value="bam" />
              </el-select></el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <!--Run data information:  -->
    <div style="margin-top: 20px;margin-left: 50px;">
      <span class="title">Run data information: </span>
      <el-row type="flex" style="margin-top: 10px">
        <el-col :span="12" v-for="(item, index) in form.runFiles">
          <el-row type="flex">
            <el-col :span="24"><span>{{ getRunName(index) }}</span></el-col>
            <el-col :span="22"><el-input v-model="item.fileName" /></el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-for="(item, index) in form.runFiles">
          <el-row type="flex" style="margin-top: 10px">
            <el-col :span="24"><span>{{ getRunMd5(index) }}</span></el-col>
            <el-col :span="22"><el-input v-model="item.md5" /></el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="runModificationDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="runModificationDialogVisible = false">
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

const deletionData = ref([{
  runAccession: "HRR0059190",
  runAlias: "Run1",
  type: "Fastq",
  runFiles: [{
    fileName: "Aaa_R1.fastq.gz",
    status: 10,
    md5: "102cce7c1b0181c6d7fa37f65b512ce6"
  },
  {
    fileName: "Aaa_R2.fastq.gz",
    status: 10,
    md5: "102cce7c1b0181c6d7fa37f65b512ce5"
  }],
  status: 10
}, {
  runAccession: "HRR0059191",
  runAlias: "Run2",
  type: "Fastq",
  runFiles: [{
    fileName: "Aaa_R1.fastq.gz",
    status: 10,
    md5: "102cce7c1b0181c6d7fa37f65b512ce6"
  },
  {
    fileName: "Aaa_R2.fastq.gz",
    status: 10,
    md5: "102cce7c1b0181c6d7fa37f65b512ce5"
  }],
  status: 10
}, {
  runAccession: "",
  runAlias: "",
  type: "",
  runFiles: [{
    fileName: "",
    status: ""
  }],
  status: ""
}
])
const currentPage3 = ref(5)
const pageSize3 = ref(100)

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const showDeleteFile = ref(false)
const showConfirmButton = ref(true)
const deletionDialogVisible = ref(false)
const runDeletionDialogVisible = ref(false)
const runModificationDialogVisible = ref(false)

const searchInput = ref('')
const textAreaContext = ref('')

const batchModificationVue = ref()

const runInformationDeletion = ref([])
const form = ref({})

var fileDatas = [];

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
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
const submitDelete = () => {
  console.log(textAreaContext.value[0]);
  var deleteList = textAreaContext.value[0].split('\r\n')
  var list = []
  for (var item in deleteList) {
    list.push(deleteList[item])

  }
  console.log(list);
  deletionDialogVisible.value = false
}
const runDelete = (val) => {
  runInformationDeletion.value = []
  runInformationDeletion.value.push(deletionData.value[val.$index])
  runDeletionDialogVisible.value = true
}
const runModify = (val) => {
  form.value = []
  form.value = deletionData.value[val.$index]
  console.log(form.value);
  runModificationDialogVisible.value = true
}
const getRunName = (index) => {
  var number = index + 1
  return 'Run file' + number + ' name'
}
const getRunMd5 = (index) => {
  var number = index + 1
  return 'Run file' + number + ' Md5'
}
const showDialog = () => {
  GsaHumanStore.$state.currentTable = 'run'
  batchModificationVue.value.show()
}
</script>

<style lang="less" scoped>
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

.title {
  font-size: large;
  font-weight: bold;
}
</style>