<template>
  <div class="insertPublication">
    <el-row :gutter="500" class="row-bg" v-loading="loading">
      <el-col :span="20" :offset="2" class="inputArea">
        <h2>insertPublication</h2>
        <el-divider border-style="dashed" />
        <!-- step 1 -->
        <fieldset class="border">
          <legend>Step 1</legend>
          <span class="inputAreaTitle">
            Copy article's informations from your mail and click "filterarticle
            titles" button</span>
          <textarea name="mailInformation" ref="filterArea" id="mail" rows="12" v-model="textData"
            class="text-area"></textarea>
          <br />
          <div>
            <el-button type="primary" class="btn-inputArea" @click="filterClick()" accept="*/*" round>Filter article
              titles</el-button>
            <el-button type="primary" class="btn-inputArea" round @click="rest()">Reset</el-button>
          </div>
        </fieldset>
        <el-divider border-style="double" />
        <!-- step 2 -->
        <fieldset class="border">
          <legend>Step 2</legend>
          <span class="inputAreaTitle">Please upload a .txt file,then submit it by clicking "Submit TXT
            file"button</span>
          <div class="test">
            <el-upload class="upload-demo" ref="upload" :auto-upload="false" action="interface" accept=".txt"
              :on-change="onChange" drag-over-class="my-drag-over"><template #trigger>
                <a class="el-upload__text">
                  <el-icon class="uploadIcon">
                    <UploadFilled />
                  </el-icon><em>Click here and upload a file</em>
                </a>
              </template>
            </el-upload>
            <el-button type="primary" class="btn-inputArea" round @click="submitData()">Submit TXT file</el-button>
          </div>
          <div id="notification">
            <span contenteditable="false" style="color: green">{{
              successfulInformation
            }}</span><br /><span contenteditable="false" style="color: red">{{
  wrongInformation
}}</span>
          </div>
        </fieldset>
      </el-col>
      <el-col :span="10">
        <div class="grid-content ep-bg-purple" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from "@vue/reactivity";
import { UploadFilled } from "@element-plus/icons-vue";
// import {getPublicationAll} from "@/services/modules/publication"
import axios from "axios";

let loading = ref(false);
var textData = ref([]);
let upload = ref();
let filterArea = ref();
var fileDatas = [];
let wrongInformation = ref();
var publicationInfos = ref();
let successfulInformation = ref();
// var journalList;
// getAllJournal();
//封装
// getPublicationAll().then((ret) => {
//   journalList = ret.data;
// });
// function getAllJournal() {
//   //await axios.get("http://localhost:8089/api/gsa/journalname").then((ret) => {
//   axios.get("http://192.168.164.26:8088/api/gsa/journalname").then((ret) => {
//     journalList = ret.data;
//   });
// }
//重置
const rest = () => {
  filterArea.value.value = "";
};
//step1
const filterClick = () => {
  wrongInformation.value = "";
  if (textData.value.length == 0) {
    wrongInformation.value =
      "Please enter some article informations from your email!!!!";
    return null;
  }
  loading.value = true;
  var articleFromAreaText = getArticleTitle();
  const clue =
    "===========================================\n" +
    "Please delete this section (already in DB)\n\n";
  const str = "";
  axios
    .post(
      // "http://localhost:8089/api/gsa/publicationList",
      "http://192.168.164.26:8088/api/gsa/publicationList",
      articleFromAreaText
    )
    .then((ret) => {
      loading.value = false;
      ////console.log("ret",ret.data)
      publicationInfos = ret.data;
      for (var index in publicationInfos) {
        for (var infos in publicationInfos[index]) {
          if (publicationInfos[index][infos] == null) {
            publicationInfos[index][infos] = "";
          }
        }
      }
      downFlie(publicationInfos, str, clue);
    });
};
//下载文件
// 文本中数据：jsonObj；文件名: str;  文本中提示: clue
function downFlie(jsonObj, str, clue) {
  //function downFlie() {
  var publicationInDb = "";
  var publicationExisted = clue;
  var publicationManual = "";
  var MessageOutput = "";
  const showMessage = [
    "pmid",
    "year",
    "month",
    "title",
    "gsaAccessions",
    "isUnique",
    "volume",
    "doi",
    "journalName",
    "issue",
  ];

  if (jsonObj == null) {
    return null;
  }
  for (var index in jsonObj) {
    //暴力致空
    jsonObj[index]["isUnique"] = ""
    if (jsonObj[index]["pmid"] == null) {
      for (var itemA in jsonObj[index]) {
        if (showMessage.includes(itemA)) {
          publicationManual += itemA + " : " + jsonObj[index][itemA] + "\n";
        }
      }
      publicationManual += "\n";
    } else if (jsonObj[index]["gsaAccessions"] == "") {
      for (var itemB in jsonObj[index]) {
        if (showMessage.includes(itemB)) {
          publicationInDb += itemB + " : " + jsonObj[index][itemB] + "\n";
        }
      }
      publicationInDb += "\n";
    } else {
      for (var itemC in jsonObj[index]) {
        if (showMessage.includes(itemC)) {
          publicationExisted += itemC + " : " + jsonObj[index][itemC] + "\n";
        }
      }
      publicationExisted += "\n";
    }
  }
  MessageOutput = publicationInDb + publicationManual + publicationExisted;

  var elementA = document.createElement("a");
  let objectDate = new Date();
  const fileName =
    str +
    objectDate.getFullYear() +
    "/" +
    (objectDate.getMonth() + 1) +
    "/" +
    objectDate.getDate() +
    "/" +
    objectDate.getHours() +
    ":" +
    objectDate.getMinutes() +
    ":" +
    objectDate.getSeconds() +
    ".txt";
  elementA.download = fileName;
  elementA.style.display = "none";

  var blob = new Blob([MessageOutput], {
    type: "text/plain",
  });

  elementA.href = URL.createObjectURL(blob);

  document.body.appendChild(elementA);
  elementA.click();
  document.body.removeChild(elementA);
}
//过滤本地文件
function filterArticleTitle(articleFromAreaText, resource) {
  var newArticle = [];
  if (articleFromAreaText == null) {
    return null;
  } else if (resource == null) {
    newArticle = articleFromAreaText;
    return newArticle;
  }
  for (const x in articleFromAreaText) {
    var flag = true;
    for (const y in resource) {
      if (articleFromAreaText[x].title == resource[y].title) {
        flag = false;
      }
    }
    if (flag) {
      newArticle.unshift({
        title: articleFromAreaText[x].title,
      });
    }
  }
  return newArticle;
}
//获取文章title 如果没有[]仍然会继续程序
function getArticleTitle() {
  var articles = [];
  var articletitle = [];
  var mid = textData.value.trim().split("\n");
  articles.push(mid[0]);
  for (var i = 0; i < mid.length; i++) {
    if (i + 1 < mid.length) {
      if (mid[i] == "" || mid[i] == " ") {
        if (mid[i + 1] != "" && mid[i + 1] != " ") {
          articles.push(mid[i + 1]);
        }
      }
    }
  }

  for (var index in articles) {
    if (
      articles[index].includes("[PDF]") ||
      articles[index].includes("[HTML]")
    ) {
      //console.log(articles[index]);
      articles[index] = articles[index].split("]")[1].trim();
      //console.log(articles[index]);
    }
    articletitle.push({ title: articles[index] });
  }
  //console.log(articletitle)
  return articletitle;
}

//Step2
function removeProperty(obj) {
  Object.keys(obj).forEach((item) => {
    if (
      obj[item] === "" ||
      obj[item] === [] ||
      obj[item] === {} ||
      obj[item] === undefined ||
      obj[item] === null ||
      obj[item] === "null" ||
      obj[item] === " "
    )
      delete obj[item];
  });
  return obj;
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
// async function findJournalReferencr(journalName) {
//   var journalReference = {
//     journal: "",
//   };
//   journalReference.journal = journalName;
//   await axios
//     .post("http://localhost:8089/api/gsa/journalReference", journalReference, {
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//     })
//     .then((ret) => {
//       return ret.data;
//     });
// }

async function submitData() {
  wrongInformation.value = "";
  successfulInformation.value = "";
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //var journalListFromDb = [];
  var wrongInformationInput = "";
  var publicationList = [];
  var publicationListUpload = [];
  var publication = {
    title: "",
    journalName: "",
    // journal_id: "",
    issue: "",
    volume: "",
    pmid: "",
    year: "",
    month: "",
    doi: "",
    gsaAccessions: "",
    isUnique: "",
  };
  if (fileDatas.length == 0) {
    wrongInformation.value += "please choose a file!";
    return null;
  }
  // for (var item in journalList) {
  //   journalListFromDb.push(item);
  // }
  var uploadData = removeProperty(
    fileDatas[0].replaceAll("\r", "\n").split("\n")
  );
  //console.log(fileDatas);
  for (var item in uploadData) {
    publicationList.push(uploadData[item]);
  }
  for (var i = 0; i < publicationList.length / 10; i++) {
    var mid = {};
    var wrongJournal = false;
    var wrongYear = false;
    var wrongMonth = false;
    var wrongIsUnique = false;
    var journalNotInDb = false;
    var noDoi = false;
    for (var j = i * 10; j < (i + 1) * 10; j++) {
      //console.log(publicationList[j]);
      if (publicationList[j].startsWith("title")) {
        publication.title = publicationList[j].split(" :")[1].trim();
      } else if (publicationList[j].startsWith("journalName")) {
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          publication.journalName = publicationList[j].split(" :")[1].trim();

          // var journalName = "";
          // journalName = publicationList[j]
          //   .split(" :")[1]
          //   .trim()
          //   .replaceAll(" ", "")
          //   .toUpperCase();
          // if (journalListFromDb.includes(journalName)) {
          //   publication.journalName = publicationList[j].split(" :")[1].trim();
          //   publication.journal_id = journalList[journalName];
          // } else {
          //   journalNotInDb = true;
          //   var isInReference = findJournalReferencr(
          //     publicationList[j].split(" :")[1].trim()
          //   );

          //   if (isInReference) {
          //     getAllJournal();
          //     console.log(journalList);
          //     publication.journalName = publicationList[j]
          //       .split(" :")[1]
          //       .trim();
          //     publication.journal_id = journalList[journalName];
          //   } else {
          //     journalNotInDb = true;
          //   }
          // }
        } else {
          wrongJournal = true;
        }
      } else if (publicationList[j].startsWith("issue")) {
        //publication["issue"]=publicationList[j].split(" : ")[1].trim()
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          publication.issue = publicationList[j].split(" :")[1].trim();
        } else {
          publication.issue = null;
        }
      } else if (publicationList[j].startsWith("volume")) {
        //publication["volume"]=publicationList[j].split(" : ")[1].trim()
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          publication.volume = publicationList[j].split(" :")[1].trim();
        } else {
          publication.volume = null;
        }
      } else if (publicationList[j].startsWith("pmid")) {
        //publication["pmid"]=publicationList[j].split(" : ")[1].trim()
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          publication.pmid = Number(publicationList[j].split(" : ")[1].trim());
        } else {
          publication.pmid = null;
        }
      } else if (publicationList[j].startsWith("year")) {
        //publication["year"]=publicationList[j].split(" : ")[1].trim()
        //2015年以前或者没有填,或者不是数字
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          var year = publicationList[j].split(" :")[1].trim();
          if (!isNaN(parseInt(year))) {
            if (parseInt(year) > 2015) {
              publication.year = publicationList[j].split(" :")[1].trim();
            } else {
              wrongYear = true;
            }
          } else {
            wrongYear = true;
          }
        } else {
          wrongYear = true;
        }
      } else if (publicationList[j].startsWith("month")) {
        //publication["month"]=publicationList[j].split(" : ")[1].trim()
        //如果是英文缩写自动改 如果1-9没有0也自动改，如果超出记录在提示中
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          var param = publicationList[j].split(" :")[1].trim();
          if (month.includes(param)) {
            if (param == "Jan") {
              param = "01";
            } else if (param == "Feb") {
              param = "02";
            } else if (param == "Mar") {
              param = "03";
            } else if (param == "Apr") {
              param = "04";
            } else if (param == "May") {
              param = "05";
            } else if (param == "Jun") {
              param = "06";
            } else if (param == "Jul") {
              param = "07";
            } else if (param == "Aug") {
              param = "08";
            } else if (param == "Sep") {
              param = "09";
            } else if (param == "Oct") {
              param = "10";
            } else if (param == "Nov") {
              param = "11";
            } else if (param == "Dec") {
              param = "12";
            }
            publication.month = param;
          } else if (!isNaN(parseInt(param))) {
            if (Number(param) > 0 && Number(param) < 10) {
              param = "0" + Number(param);
              publication.month = param;
            } else if (Number(param) > 10 && Number(param) < 13) {
              publication.month = param;
            } else {
              wrongMonth = true;
            }
          } else {
            wrongMonth = true;
          }
        } else {
          wrongMonth = true;
        }
      } else if (publicationList[j].startsWith("doi")) {
        //publication["doi"]=publicationList[j].split(" : ")[1].trim()
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          publication.doi = publicationList[j].split(" :")[1].trim();
        } else {
          noDoi = true;
        }
      } else if (publicationList[j].startsWith("gsaAccessions")) {
        //publication["gsaAccession"]=publicationList[j].split(" : ")[1].trim()
        if (
          publicationList[j].split(" :")[1] != "null" &&
          publicationList[j].split(" :")[1] != ""
        ) {
          publication.gsaAccessions = publicationList[j].split(" :")[1].trim();
        } else {
          publication.gsaAccessions = null;
        }
      } else if (publicationList[j].startsWith("isUnique")) {
        if (
          publicationList[j].split(" :")[1] != null &&
          publicationList[j].split(" :")[1] != ""
        ) {
          if (
            publicationList[j].split(" :")[1].trim() == "0" ||
            publicationList[j].split(" :")[1].trim() == "1"
          ) {
            publication.isUnique = Number(
              publicationList[j].split(" :")[1].trim()
            );
          } else {
            wrongIsUnique = true;
          }
        } else {
          wrongIsUnique = true;
        }
      }
    }
    if (
      wrongIsUnique ||
      wrongJournal ||
      wrongYear ||
      wrongMonth ||
      journalNotInDb ||
      noDoi
    ) {
      var wrongTitle = { "文章的名字: ": "", "存在的错误: ": "" };
      wrongTitle[0] = publication.title;
      wrongInformationInput +=
        "文章的名字: " + publication.title + "\n存在的错误: ";
      if (wrongJournal) {
        wrongInformationInput += "期刊的名字为空;";
      }
      if (wrongYear) {
        wrongInformationInput += "期刊的年份;";
      }
      if (wrongMonth) {
        wrongInformationInput += "期刊的月份;";
      }
      if (wrongIsUnique) {
        wrongInformationInput += "isUniqu 应为0或者1;";
      }
      if (journalNotInDb) {
        wrongInformationInput += "期刊不在数据库中请刷新页面;";
      }
      if (noDoi) {
        wrongInformationInput += "doi 为空;";
      }
      wrongInformationInput += "\n\n";
    }
    //浅拷贝publication
    Object.assign(mid, publication);
    publicationListUpload.push(mid);
  }
  if (wrongInformationInput != "") {
    wrongInformation.value += wrongInformationInput;
    // console.log(wrongInformation);
    return null;
  }
  //console.log("begin web service");
  //console.log(publicationListUpload);
  const clue = "";
  const str = "Please check follow gsaAccessions informations  ";
  loading.value = true;
  await axios
    .post(
      // "http://localhost:8089/api/gsa/creatpublication",
      "http://192.168.164.26:8088/api/gsa/creatpublication",
      publicationListUpload,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
    .then((ret) => {
      loading.value = false;
      //  console.log(ret.data);
      if (ret.data[1].length) {
        successfulInformation.value +=
          "成功插入 " + ret.data[1].length + "条数据!!!!\n";
        for (var i in ret.data[1]) {
          for (var j in ret.data[1][i]) {
            if (j == "title") {
              successfulInformation.value +=
                "插入文章: " + ret.data[1][i][j] + "  \n";
            }
            if (j == "gsaAccession") {
              successfulInformation.value +=
                "插入的gsaAccession: " + ret.data[1][i][j] + "\n\n\n";
            }
          }
        }
      }
      if (ret.data[0].length) {
        downFlie(ret.data[0], str, clue);
      }
      if (ret.data[2].length) {
        wrongInformation.value += "插入错误的文章:  \n";
        for (var m in ret.data[2]) {
          for (var n in ret.data[2][m]) {
            if (n == "title") {
              wrongInformation.value += "插入文章: " + ret.data[2][m][n] + "\n";
            }
            if (n == "journalName" && ret.data[2][m][n] == "") {
              wrongInformation.value += "journal 不存在于数据库中\n";
              continue;
            }
            else if (n == "gsaAccessions" && ret.data[2][m][n] != "") {
              wrongInformation.value +=
                "已经存在的gsaAccession: " + ret.data[2][m][n] + "\n\n\n";
            }
          }
        }
      }
    });
}
</script>


<style lang="less" scoped>
.insertPublication {
  border-radius: 3ch;
  box-shadow: var(--el-box-shadow-dark);

  .row-bg {
    .inputArea {
      padding: 10px;

      .border {
        border-radius: 3ch;
        display: flex;
        flex-direction: column;
        border-color: var(--el-color-primary);

        legend {
          color: var(--el-color-primary);
          margin-left: 30px;
          font-family: "微软雅黑", Arial;
          font-size: 25px;
        }

        span {
          font-family: "微软雅黑", Arial;
          white-space: pre-line;
        }

        .inputAreaTitle {
          margin-top: 10px;
          margin-left: 25px;
          margin-bottom: 15px;
          font-size: 18px;
          padding: 1px;
        }

        .text-area {
          border-radius: 2ch;
          margin-left: 25px;
          margin-bottom: 5px;
          box-shadow: var(--el-box-shadow);
          resize: none;
          width: 85%;
          outline-color: var(--el-color-primary);
          font-family: "微软雅黑", Arial;
          font-size: 17px;
        }

        .btn-inputArea {
          width: 200px;
          margin-left: 25px;
          margin-bottom: 10px;
          font-size: 18px;
        }

        .test {
          margin-left: 25px;
          margin-top: 15px;
          display: flex;
          margin-bottom: 20px;

          .upload-demo {
            .el-upload__text {
              font-family: "微软雅黑", Arial;
              font-size: 20px;
              color: var(--el-color-primary);
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}

#notification {
  overflow-y: auto;
  border-radius: 2ch;
  margin: 10px;
  margin-top: 25px;
  margin-left: 25px;
  box-shadow: var(--el-box-shadow);
  resize: none;
  width: 85%;
  outline-color: var(--el-color-primary);
  margin-top: 0px;
  border: 1px solid;
  height: 226px;
  margin-bottom: 20px;
}
</style>