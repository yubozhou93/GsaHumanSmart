<template>
  <div class="GsaHumanReview">
    <div style="margin-bottom: 20px;">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }"><span style="font-size: 25px;">Homepage</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/gsaHumanHome' }"><span style="font-size: 25px;">Data
            management</span></el-breadcrumb-item>
        <el-breadcrumb-item><span style="font-size: 25px;">{{ GsaHumanStore.$state.currentInfos.SubmissionID
        }}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8; border-radius: 0.5em;">
        <h3 class="blockTitle">Review Information</h3>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Submission Number : </el-col>
        <el-col :span="6">{{
          GsaHumanStore.$state.currentInfos.SubmissionID
        }}</el-col>
        <div class="editButton">
          <el-button type="success" round @click="metaDataCheck" size="large">Review</el-button>
          <el-button type="primary" round size="large">Contact user</el-button>
          <el-button type="info" plain @click="toHistory" round size="large">History</el-button>
          <el-button type="primary" plain @click="backToGsaHuman" round size="large">Back</el-button>
        </div>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Archive Number : </el-col>
        <el-col :span="6">{{
          GsaHumanStore.$state.currentInfos.ArchiveID
        }}</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Submission status : </el-col>
        <!-- <el-col :span="6">To be reviewed</el-col> -->
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 0">未提交</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 1">待审核</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 2">审核中</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 3">元数据审核通过</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 4">元数据审核不通过</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 5">数据审核中</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 6">等待归档</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 7">追加待审核</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 8">删除</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 9">已归档</el-col>
        <el-col :span="6" v-if="GsaHumanStore.$state.currentInfos.MetadataStatus == 10">数据审核失败</el-col>
        <div class="editButton" v-if="GsaHumanStore.$state.currentInfos.ReleaseStatus == 2">
          <el-button type="danger" round @click="withdrawReleaseVisible = true" size="large">Withdraw release</el-button>
          <el-button type="primary" plain round size="large">Update access permission</el-button>
          <el-button type="primary" plain round size="large">Modify basic information</el-button>
          <el-button type="primary" plain round @click="toModifyMetadata" size="large">Modify metadata</el-button>
        </div>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Metadata :</el-col>
        <el-col :span="6">Pending 10/10/10/10/10</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Files : </el-col>
        <el-col :span="6" v-if="fileStatus == 0">- -</el-col>
        <el-col :span="6" v-if="fileStatus == 1" style="color: #548235;">Not review right now</el-col>
        <el-col :span="6" v-if="fileStatus == 2" style="color: #548235;"> Pass</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Release time : </el-col>
        <el-col :span="6">{{
          GsaHumanStore.$state.currentInfos.MetadataSubmissionTime
        }}</el-col>
      </el-row>
      <el-row class="context">
        <el-col :span="6">Release status : </el-col>
        <el-col :span="6" v-if="ReleaseStatus == 0">私有</el-col>
        <el-col :span="6" v-if="ReleaseStatus == 1">发布中</el-col>
        <el-col :span="6" v-if="ReleaseStatus == 2">已发布</el-col>
        <el-col :span="3" v-if="ReleaseStatus == 3" style="color: #4472C4;">Operating withdraw</el-col>
        <el-col :span="6" v-if="ReleaseStatus == 3">
          <el-button type="primary" link style="margin-top:-6px" @click="ReleaseStatus = 2"
            size="large">Cancel</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Queue : </el-col>
        <el-col :span="6" style="color: #4472C4;" v-if="queueSatus == 0">Normal</el-col>
        <el-col :span="6" style="color: #548235;" v-if="queueSatus == 2">Priority</el-col>
      </el-row>
      <el-row type="flex" class="context" v-if="isShow">
        <el-col :span="6">In batches : </el-col>
        <el-col :span="6" @click="inBbatchesVisible = true"> {{ form.vite }} /2000</el-col>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <h3 class="blockTitle">User Infotmation</h3>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">PI Information : </el-col>
        <template v-if="useInfos.isPI == 1">
          <el-col :span="6" :style="{ color: 'red' }">PI has not been identified</el-col>
          <el-col :span="6" class="editButton">
            <el-button type="success" round @click="dialogPICheckVisible = true" size="large">Review</el-button>
          </el-col>
        </template>
        <template v-if="useInfos.isPI == 2">
          <el-col :span="6" :style="{ color: 'green' }">PI has been identified</el-col>
          <el-col :span="6" class="editButton">
            <el-button type="info" round @click="(useInfos.isPI = 1), (commentsInTextArea = '')"
              size="large">Revocation</el-button>
          </el-col>
        </template>
        <template v-if="useInfos.isPI == 3">
          <el-col :span="6" :style="{ color: 'red' }">PI indentification refused</el-col>
          <el-col :span="6" class="editButton">
            <el-button type="info" round @click="(useInfos.isPI = 1), (commentsInTextArea = '')"
              size="large">Revocation</el-button>
          </el-col>
        </template>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Submitter : </el-col>
        <el-col :span="10">Zhang Yan /
          {{ GsaHumanStore.$state.currentInfos.SubmitterEmail }}</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Organization : </el-col>
        <el-col :span="10">Guangdong Women and Children Hospital</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Department : </el-col>
        <el-col :span="10">Center for Medical Genetics</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Country/Region : </el-col>
        <el-col :span="6">China</el-col>

      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Postal code : </el-col>
        <el-col :span="10">511442</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Personal Home Page : </el-col>
        <el-col :span="10"><a href="">https://baike.baidu.com/item/%E5%BC%A0%E5%BD%A6/57918436?fr=aladdin</a></el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Institute/Organization Home Page : </el-col>
        <el-col :span="10"><a href="">http://www.e3861.com/cn/</a></el-col>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <h3 class="blockTitle">Basic Information</h3>
      </el-row>

      <el-row type="flex" class="context">
        <el-col :span="6">Title : </el-col>
        <el-col :span="10">Exome sequencing in fetal short long bones</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Release date : </el-col>
        <el-col :span="10">2022-09-28</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Description : </el-col>
        <el-col :span="10">This study was conducted to identify the genetic causes for fetal
          short long bones (SLBs) and retrospectively evaluated the additional
          diagnostic yield of exome sequencing for SLBs following the use of
          conventional genetic testing.</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Data Accessibility : </el-col>
        <el-col :span="10">Controlled access</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">BioProject : </el-col>
        <el-col :span="10">{{
          GsaHumanStore.$state.currentInfos.BioProject
        }}</el-col>
        <el-col :span="6" class="editButton">
          <el-button type="success" round size="large">Review</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Disease name : </el-col>
        <el-col :span="10">monogenic disease</el-col>
      </el-row>
      <el-row type="flex" class="context">
        <el-col :span="6">Study type : </el-col>
        <el-col :span="10">Cohort Study</el-col>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <h3 class="blockTitle">HGRIP Information</h3>
        <el-button type="info" plain class="editButton" style="margin-top: 5px;" size="large">Add</el-button>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <h3 class="blockTitle">Publication Information</h3>
        <el-button type="info" plain class="editButton" style="margin-top: 5px;" size="large">Add</el-button>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <h3 class="blockTitle">Data Access Committee</h3>
      </el-row>
      <el-row type="flex">
        <el-table :data="tableData1" style="width: 100%;font-size: 18px" border size="large">
          <el-table-column prop="Accession" width="150" label="Accession" align="center" />
          <el-table-column prop="Name" label="Name" align="center" />
          <el-table-column prop="DACMembers" label="DAC members" align="center" width="160" />
          <el-table-column prop="Email" label="Email" align="center" />
          <el-table-column prop="Organization" label="Organization" align="center" />
          <el-table-column prop="Department" label="Department" align="center" />
          <el-table-column prop="IsContactPerson" width="190" label="Is contact person" align="center" />
          <el-table-column fixed="right" label="Operations" width="130" align="center">
            <template #default>
              <el-button link type="primary" size="small" @click="modify"><span
                  style="font-size: 18px">Modify</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <h3 class="blockTitle">Metadata Information</h3>
      </el-row>
      <el-row type="flex">
        <el-table :data="tableData2" style="width: 100%;font-size: 18px" border size="large">
          <el-table-column prop="SubmissionTime" label="Submission Time" align="center" />
          <el-table-column prop="FileName" label="File Name" align="center" />
          <el-table-column prop="Individual" label="Individual" align="center" />
          <el-table-column prop="Sample" label="Sample" align="center" />
          <el-table-column prop="Experiment " label="Experiment " align="center" />
          <el-table-column prop="Run" label="Run" align="center" />
          <el-table-column prop="File" label="File Number" align="center" />
          <el-table-column label="Detail" align="center">
            <template #default>
              <el-button link type="primary" size="small"><span style="font-size: 18px">View</span></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="Archived" label="Archived" align="center" />
        </el-table>
      </el-row>

    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;border-radius: 0.5em;">
        <h3 class="blockTitle">Individual & Family & sample</h3>
      </el-row>
      <el-row type="flex">
        <el-table :data="tableData3" style="width: 100%;font-size: 18px" border size="large">
          <el-table-column prop="IndividualAccession" label="Individual Accession" align="center" />
          <el-table-column prop="IndividualName" label="Individual Name" align="center" />
          <el-table-column prop="Gender" label="Gender" align="center" width="100" />
          <el-table-column prop="ExperimentGroup" label="Experiment Group" align="center" />
          <el-table-column prop="SampleAccession" label="Sample Accession " align="center" />
          <el-table-column prop="SampleName" label="Sample Name" align="center" />
          <el-table-column prop="SampleDescription" label="Sample Description" align="center" />
          <el-table-column prop="SampleTitle" label="Sample Title" align="center" />
          <el-table-column prop="Tissue" label="Tissue" align="center" width="90" />
          <el-table-column prop="CollectionDate" label="Collection Date" align="center" width="165" />
          <el-table-column prop="BiomaterialProvider" label="Biomaterial Provider" align="center" />
        </el-table>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" style="background-color: #cfe5f8;">
        <h3 class="blockTitle">Experiment & Run</h3>
      </el-row>
      <el-row type="flex">
        <el-table :data="tableData5" style="width: 100%;font-size: 18px" border size="large">
          <el-table-column prop="experimnetAccession" label="Experimnet Accession" width="230" align="center" />
          <el-table-column prop="experimentTitle" label="Experiment Title" align="center" />
          <el-table-column prop="platform" label="Platform" align="center" />
          <el-table-column prop="layout" label="Layout" align="center" />
          <el-table-column prop="sampleAccession" label="Sample Accession" align="center" />
          <el-table-column prop="sampleName" label="Sample Name" align="center" />
          <el-table-column prop="experimentStatus" label="Experiment Status" align="center" />
        </el-table>
      </el-row>
    </div>
    <!-- <h2>currentInfos: {{ GsaHumanStore.$state.currentInfos }}</h2> -->
  </div>

  <!-- PI check -->
  <el-dialog v-model="dialogPICheckVisible" title="PI Check">
    <template v-slot:title>
      <span style="font-size: 25px;">PI Check</span>
    </template>
    <div class="dialogTitle">
      <el-tabs v-model="activePI" class="demo-tabs">
        <el-tab-pane label="Pass" name="first">
          <template v-slot:label>
            <span style="font-size: 22px;">Pass</span>
          </template>
          <el-row type="flex" class="piPass">
            <el-col :span="24">
              <span style="font-size: 30px;">There is no problem with the account, and it has been approved.</span>
            </el-col>
          </el-row>
          <el-button @click="dialogPICheckVisible = false" size="large">Cancel</el-button>
          <el-button type="primary" @click="(dialogPICheckVisible = false), (useInfos.isPI = 2)" size="large">
            Comfirmed
          </el-button>
        </el-tab-pane>
        <el-tab-pane label="Refuse" name="second">
          <template v-slot:label>
            <span style="font-size: 22px;">Refuse</span>
          </template>
          <el-row type="flex">
            <el-col :span="24">
              <el-table ref="piCheck1" :data="tableData6" style="width: 100%; z-index: 9999"
                :highlight-current-row="radioId1" @cell-click="handlePICheckSelect">

                <el-table-column label="E-mail information">

                  <template #default="scope">
                    <el-radio v-model="radioId1" :label="scope.row.data"></el-radio>
                  </template>
                </el-table-column>
              </el-table>
              <el-table ref="piCheck2" :data="tableData7" style="width: 100%; margin-bottom: 20px;"
                :highlight-current-row="radioId2" @cell-click="handleHomePageSelect">
                <el-table-column label="Home page">
                  <template #default="scope">
                    <el-radio v-model="radioId2" :label="scope.row.data"></el-radio>
                  </template>
                </el-table-column>
              </el-table>

              <el-button @click="(dialogPICheckVisible = false), (commentsInTextArea = '')"
                size="large">Cancel</el-button>
              <el-button type="warning" @click="reset" size="large">reset</el-button>
              <el-button type="primary" @click="refusePIClick" size="large">
                Comfirmed
              </el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>

  <!-- review -->
  <el-dialog v-model="dialogReviewVisible" title="Review">
    <template v-slot:title>
      <span style="font-size: 22px;">Review</span>
    </template>
    <div class="dialogTitle">
      <el-row type="flex">
        <el-col :span="24">
          <el-tabs v-model="activePI" class="demo-tabs">
            <el-tab-pane label="Pass" name="first">
              <template v-slot:label>
                <span style="font-size: 22px;">Pass</span>
              </template>
              <el-row type="flex">
                <el-col :span="24">
                  <h4 style="text-align: center;">There is no problem in filling in the account and metadata information,
                    and it has been approved
                  </h4>
                </el-col>
                <el-col :span="10" :offset="3">
                  <el-form :model="form" label-width="120px">
                    <el-form-item label="Queue:">
                      <el-select v-model="form.queue" class="m-2" placeholder="Select">
                        <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="File:">
                      <el-select v-model="form.file" class="m-2" placeholder="Select" @change="showVite">
                        <el-option v-for="item in option2" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="5" style="margin-top: 50px;margin-left: 10px;" v-if="isShow">
                  <el-input v-model="form.vite" placeholder="Please input" clearable style="width: 80px;" />
                  <span>/Run</span>
                </el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="6" :offset="18">
                  <div class="dialog-footer">
                    <el-button @click="dialogReviewVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="metaDataReviewPassReview">
                      Comfirmed
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Refuse" name="second">
              <template v-slot:label>
                <span style="font-size: 22px;">Refuse</span>
              </template>
              <h4>Add comments to this submission</h4>
              <el-row type="flex">
                <el-col :span="7">
                  <el-cascader placeholder="MetaDatas problems" v-model="selectedMetaDatasProblemsOptions"
                    :options="options" :props="props" :show-all-levels="false" clearable collapse-tags-tooltip filterable
                    @change="handleCascaderChange"></el-cascader>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="selectedOverAllOptions" class="m-2" placeholder="Comprehensive advice" clearable
                    filterable @change="handleCascaderChangeForOverAll">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-col>
                <el-col :span="24" style="margin-top: 10px;">
                  <textarea id="w3review" name="w3review" rows="20" cols="125" v-model="commentsInTextArea"
                    style="resize: none; border-radius: 1em;"></textarea>
                </el-col>
              </el-row>
              <el-row type="flex" style="margin-top: 10px;">
                <el-col :span="6" :offset="18">
                  <div class="dialog-footer">
                    <el-button @click="dialogReviewVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogReviewVisible = false">
                      Comfirmed
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Not review immediately" name="third">
              <template v-slot:label>
                <span style="font-size: 22px;">Not review immediately</span>
              </template>
              <el-row type="flex">
                <el-col :span="20" :offset="3">
                  <span>No doute with user account and metadata. </span>
                </el-col>
                <el-col :span="20" :offset=3 style="margin-top: 10px;">
                  <span style="color: #4472C4;">However, due to</span>
                  <el-autocomplete v-model="state1" :fetch-suggestions="fetchSuggestions" clearable
                    class="inline-input w-50" placeholder="Please Input" @select="handleSelect"
                    style="margin-left: 5px ;width: 400px;" />
                </el-col>
                <el-col :span="20" :offset="3" style="margin-top: 10px;">
                  <span>We decide to not review this file right row</span>
                </el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="6" :offset="18">
                  <div class="dialog-footer">
                    <el-button @click="dialogReviewVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="notRewview">
                      Comfirmed
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </el-dialog>

  <!-- In batches -->
  <el-dialog v-model="inBbatchesVisible">
    <el-table :data="tableData8">
      <el-table-column type="index" label="No." width="150" align="center" />
      <el-table-column property="operationTime" label="Operation time" width="200" align="center" />
      <el-table-column property="run" label="Run" align="center" />
      <el-table-column label="Data Status" align="center">
        <template #default="scope">
          <div v-if="scope.row.dataStatus == 0">Under review</div>
          <div v-if="scope.row.dataStatus == 1">Pending</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="100" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" v-if="scope.row.dataStatus == 0">Withdraw</el-button>
          <el-button link type="primary" size="small" v-if="scope.row.dataStatus == 1">Handle</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-row type="flex">
      <el-col :span="2" :offset="22">
        <el-button type="primary" @click="inBbatchesVisible = flase">
          Back
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>

  <!-- withdraw release -->
  <el-dialog v-model="withdrawReleaseVisible">
    <template #header>
      <h3>Verification of withdraw release</h3>
      <el-divider />
    </template>
    <div style="height: 100px;">
      <el-row type="flex">
        <el-col :span="20" :offset="3">
          <span style="font-size: large;">You will do a withdraw release operation of data set {{
            GsaHumanStore.$state.currentInfos.SubmissionID }} (set
            name, need hot update)</span>
        </el-col>
      </el-row>
      <br />
      <br />
      <el-row type="flex">
        <el-col :span="8" :offset="3" style="margin-top: 10px;">
          <span style="font-size: large; ">The publishing time is delayed to: </span>
        </el-col>
        <el-col :span="8">
          <el-date-picker v-model="dateSelect" type="date" placeholder="Pick a day" size="large"
            :disabled-date="pickerOptions" />
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="withdrawReleaseVisible = false">Cancel</el-button>
        <el-button type="primary" @click="withDrawReleaseComfirmed">
          Comfirmed
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import useGsaHumanStore from "../../../store/modules/GsaHuman";
// import PiCheck from "@/commentComponent/PiCheck.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';

import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const GsaHumanStore = useGsaHumanStore();

const piCheck1 = ref()
const piCheck2 = ref()
const radioId1 = ref()
const radioId2 = ref()
const option1 = ref([{
  value: 0,
  label: 'Normal'
}, {
  value: 1,
  label: 'Priority'
}])
const option2 = ref([{
  value: 0,
  label: 'All'
}, {
  value: 1,
  label: 'In batches'
}])
const form = ref({ queue: 0, file: 0, vite: 1000 })
const tableData1 = ref([
  {
    Accession: "HDAC001774",
    Name: "short long bones sequencing",
    DACMembers: "Zhang Yan",
    Email: "zhangyan1981_2003@aliyun.com",
    Organization: "Guangdong Women and Children Hospital",
    Department: "Center for Medical Genetics",
    IsContactPerson: "Yes",
  },
]);
const tableData2 = ref([
  {
    SubmissionTime: "2022-11-06",
    FileName: "subHRA0004512.xlsx ",
    Individual: "11/11",
    Sample: "86",
    Experiment: "86",
    Run: "86",
    File: "86",
    Detail: "View",
    Archived: "--",
  },
]);
const tableData3 = ref([
  {
    IndividualAccession: "HRI283600",
    IndividualName: "920123003",
    Gender: "male",
    ExperimentGroup: "Case set",
    SampleAccession: "HRS453275",
    SampleName: "920123003",
    SampleDescription: "B2021258_S94",
    SampleTitle: "920123003",
    Tissue: "blood",
    CollectionDate: "2020-01-01",
    BiomaterialProvider: "--",
  },
  {
    IndividualAccession: "HRI283599",
    IndividualName: "91714603",
    Gender: "male",
    ExperimentGroup: "Case set",
    SampleAccession: "HRS453274",
    SampleName: "91714603",
    SampleDescription: "B2021258_S94",
    SampleTitle: "91714603",
    Tissue: "blood",
    CollectionDate: "2020-01-01",
    BiomaterialProvider: "--",
  },
  {
    IndividualAccession: "HRI283598",
    IndividualName: "920008403",
    Gender: "male",
    ExperimentGroup: "Case set",
    SampleAccession: "HRS453273",
    SampleName: "920008403",
    SampleDescription: "B2021258_S92",
    SampleTitle: "920008403",
    Tissue: "blood",
    CollectionDate: "2020-01-01",
    BiomaterialProvider: "--",
  },
]);
const tableData4 = ref([
  {
    data: "Email accounts do not have advanced professional titles",
    comments:
      "The GSA-Human database only allows email accounts of PIs/project leaders (with senior professional titles) to submit data. Your account information does not meet the requirements, so please delete the submission and use the email account of the PI/project leader (with senior professional titles) to submit the data. If the data files have already been uploaded, there is no need to re-upload them. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mail hard drive) to gsa@big.ac.cn, and we will assist in transferring the data.",
  },
  {
    data: "Data is submitted through the laboratory public email address",
    comments:
      "The GSA-Human database only allows email accounts of PIs/project leaders (with senior professional titles) to submit data. The homepage information you provided is not a personal homepage, so we cannot verify your identity.\na. If the email account belongs to the project leader (PI), please click on the PI-Profile and user_profile in the upper right corner, modify your personal information, and provide a personal homepage link that contains your professional title or a link to an article published as the corresponding author. Please ensure that your account information (email, name, personal homepage) is consistent. After modification, please inform us by email at gsa@big.ac.cn.\nb. If the email account does not belong to the project leader, please delete all the information you have submitted, use the project leader's email to register an account, and resubmit the metadata online. If the data files have already been uploaded, there is no need to re-upload them. Please send us the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mailing hard drive) to gsa@big.ac.cn, and we will assist in transferring the data.",
  },
  {
    data: "The article is not the corresponding author",
    comments:
      "The GSA-Human database only allows email accounts of PIs/project leaders (with advanced titles) to submit data. If you provide article information on your personal homepage link, the article must be published as the corresponding author and the email information must be consistent. Your personal homepage information does not meet the requirements:\n a. If the email account belongs to the project leader's email account (PI), please click on the PI-Profile in the upper right corner, modify the homepage information, and provide a personal homepage link with title information or a link to the article published as the corresponding author. The account information (email, name, personal homepage) must be consistent, and the email must be consistent with the corresponding author's email. After modification, please inform gsa@big.ac.cn by email.\nb. If the email account is not the project leader's email account, please delete all submitted information, use the project leader's email to register a new account, and resubmit the metadata information online. If the data files have been uploaded, there is no need to upload again. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mailed hard drive) to gsa@big.ac.cn, and we will assist in completing the data transfer.",
  },
  {
    data: "The personal homepage link is not the account himself",
    comments:
      "The GSA-Human database only allows email accounts of PI/project leaders (with senior titles) to submit data. The personal homepage link provided must be an article published as a corresponding author, with consistent email information. Your personal homepage information does not meet the requirements:\na. If the email account belongs to the PI, please click on PI-Profile and user_profile in the upper right corner to modify the homepage information. Please provide a personal homepage link with professional title information or a link to an article published as a corresponding author, and ensure that the account information (email, name, personal homepage) is consistent. After modification, please inform gsa@big.ac.cn by email.\nb. If the account email does not belong to the project leader, please delete all submitted information, use the project leader's email to register for an account, and submit metadata information online again. If the data files have already been uploaded, there is no need to upload them again. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/ship hard disk) to gsa@big.ac.cn. We will assist in completing the data transfer.",
  },
  {
    data: "The homepage is not a link to the personal homepage and does not reflect the professional title",
    comments:
      "Translation: The GSA-Human database only allows email accounts of PI/project leaders (with advanced titles) to submit data. The homepage information you provided is not a personal homepage, so we cannot verify your identity:\na. If the email account belongs to the project leader (PI), please click on PI-Profile and user_profile in the upper right corner to modify your personal information. Please provide a personal homepage link with professional title information or a link to an article you published as the corresponding author. Please ensure that your account information (email, name, personal homepage) is consistent. After modifying, please inform us by emailing gsa@big.ac.cn.\nb. If the email account does not belong to the project leader, please delete all information submitted and register a new account using the project leader's email address. Please resubmit the metadata information online. If the data files have already been uploaded, there is no need to re-upload them. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/shipped hard drive) to gsa@big.ac.cn, and we will assist in completing the data transfer.",
  },
  {
    data: "The homepage page could not be opened",
    comments:
      "GSA-Human database only allows email accounts of PIs/project leaders (with advanced titles) to submit data. However, the personal homepage link you provided cannot be accessed, so we are unable to verify your identity.\na. If the email account is that of the project leader (PI), please click on PI-Profile and user_profile in the upper right corner to modify your personal information. Please provide a personal homepage link that contains your title information or a link to an article you have published as the corresponding author. Please ensure that your account information (email, name, personal homepage) is consistent. After modifying, please inform us by email at gsa@big.ac.cn.\nb. If the email account is not that of the project leader, please delete all submitted information and register a new account using the email account of the project leader. Then, resubmit your metadata information online. If the data files have already been uploaded, you do not need to upload them again. Please send us the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mailing hard disk) to gsa@big.ac.cn, and we will assist in transferring the data.",
  },
]);
const tableData5 = ref([
  {
    experimnetAccession: 'HRX555465',
    experimentTitle: 'title1',
    platform: 'MGISEQ-2000RS',
    layout: 'FRAGMENT',
    sampleAccession: 'HRS453275',
    sampleName: '91995603',
    experimentStatus: 'Unchecked Confidential'
  }
])
const tableData6 = ref([
  {
    data: "Email accounts do not have advanced professional titles",
    comments:
      "The GSA-Human database only allows email accounts of PIs/project leaders (with senior professional titles) to submit data. Your account information does not meet the requirements, so please delete the submission and use the email account of the PI/project leader (with senior professional titles) to submit the data. If the data files have already been uploaded, there is no need to re-upload them. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mail hard drive) to gsa@big.ac.cn, and we will assist in transferring the data.",
  },
  {
    data: "Data is submitted through the laboratory public email address",
    comments:
      "The GSA-Human database only allows email accounts of PIs/project leaders (with senior professional titles) to submit data. The homepage information you provided is not a personal homepage, so we cannot verify your identity.\na. If the email account belongs to the project leader (PI), please click on the PI-Profile and user_profile in the upper right corner, modify your personal information, and provide a personal homepage link that contains your professional title or a link to an article published as the corresponding author. Please ensure that your account information (email, name, personal homepage) is consistent. After modification, please inform us by email at gsa@big.ac.cn.\nb. If the email account does not belong to the project leader, please delete all the information you have submitted, use the project leader's email to register an account, and resubmit the metadata online. If the data files have already been uploaded, there is no need to re-upload them. Please send us the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mailing hard drive) to gsa@big.ac.cn, and we will assist in transferring the data.",
  },
])
const tableData7 = ref([
  {
    data: "The article is not the corresponding author",
    comments:
      "The GSA-Human database only allows email accounts of PIs/project leaders (with advanced titles) to submit data. If you provide article information on your personal homepage link, the article must be published as the corresponding author and the email information must be consistent. Your personal homepage information does not meet the requirements:\n a. If the email account belongs to the project leader's email account (PI), please click on the PI-Profile in the upper right corner, modify the homepage information, and provide a personal homepage link with title information or a link to the article published as the corresponding author. The account information (email, name, personal homepage) must be consistent, and the email must be consistent with the corresponding author's email. After modification, please inform gsa@big.ac.cn by email.\nb. If the email account is not the project leader's email account, please delete all submitted information, use the project leader's email to register a new account, and resubmit the metadata information online. If the data files have been uploaded, there is no need to upload again. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mailed hard drive) to gsa@big.ac.cn, and we will assist in completing the data transfer.",
  },
  {
    data: "The personal homepage link is not the account himself",
    comments:
      "The GSA-Human database only allows email accounts of PI/project leaders (with senior titles) to submit data. The personal homepage link provided must be an article published as a corresponding author, with consistent email information. Your personal homepage information does not meet the requirements:\na. If the email account belongs to the PI, please click on PI-Profile and user_profile in the upper right corner to modify the homepage information. Please provide a personal homepage link with professional title information or a link to an article published as a corresponding author, and ensure that the account information (email, name, personal homepage) is consistent. After modification, please inform gsa@big.ac.cn by email.\nb. If the account email does not belong to the project leader, please delete all submitted information, use the project leader's email to register for an account, and submit metadata information online again. If the data files have already been uploaded, there is no need to upload them again. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/ship hard disk) to gsa@big.ac.cn. We will assist in completing the data transfer.",
  },
  {
    data: "The homepage is not a link to the personal homepage and does not reflect the professional title",
    comments:
      "The GSA-Human database only allows email accounts of PI/project leaders (with advanced titles) to submit data. The homepage information you provided is not a personal homepage, so we cannot verify your identity:\na. If the email account belongs to the project leader (PI), please click on PI-Profile and user_profile in the upper right corner to modify your personal information. Please provide a personal homepage link with professional title information or a link to an article you published as the corresponding author. Please ensure that your account information (email, name, personal homepage) is consistent. After modifying, please inform us by emailing gsa@big.ac.cn.\nb. If the email account does not belong to the project leader, please delete all information submitted and register a new account using the project leader's email address. Please resubmit the metadata information online. If the data files have already been uploaded, there is no need to re-upload them. Please send the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/shipped hard drive) to gsa@big.ac.cn, and we will assist in completing the data transfer.",
  },
  {
    data: "The homepage page could not be opened",
    comments:
      "GSA-Human database only allows email accounts of PIs/project leaders (with advanced titles) to submit data. However, the personal homepage link you provided cannot be accessed, so we are unable to verify your identity.\na. If the email account is that of the project leader (PI), please click on PI-Profile and user_profile in the upper right corner to modify your personal information. Please provide a personal homepage link that contains your title information or a link to an article you have published as the corresponding author. Please ensure that your account information (email, name, personal homepage) is consistent. After modifying, please inform us by email at gsa@big.ac.cn.\nb. If the email account is not that of the project leader, please delete all submitted information and register a new account using the email account of the project leader. Then, resubmit your metadata information online. If the data files have already been uploaded, you do not need to upload them again. Please send us the original account email, new account email (PI account), new BioProject number, and data upload method (FTP upload Aspera/mailing hard disk) to gsa@big.ac.cn, and we will assist in transferring the data.",
  },
])
const tableData8 = ref([
  {
    operationTime: '2023-01-01 08:00:00',
    run: '1-1000',
    dataStatus: 0
  },
  {
    operationTime: '2023-01-01 08:00:00',
    run: '10001-2000',
    dataStatus: 1
  }
])

const options = [
  {
    value: 1,
    label: "study type",
    children: [
      {
        value:
          "The Study Type was selected incorrectly. The project is a cell line related study. Please delete the previous submission and submit a new one with the correct Study Type selected as 'Cell line related study' in the 'study information' step. Also, download the cell line table, fill in the cell line information, and submit it. Please do not use the incorrect table from the previous submission. Each cell line should be filled in on a separate row, and different samples from different treatments or time points can be filled in under different samples. Only one sample needs to be filled in for materials cultured in the same conditions, while different samples need to be filled in for materials cultured in different conditions.",
        label: "Cell line data has selected other types.",
      },
      {
        value:
          "The Study Type was selected incorrectly. This project is studying metagenome data. Please delete and resubmit the study with the correct Study Type selected as 'Human metagenome' in the Study Information section. Also, download the new template form for metagenome data, fill it out, and submit it. Please do not use the incorrect form from the previous submission.",
        label: "Metagenome type has selected other types.",
      },
      {
        value:
          "Study Type selected incorrectly, this project is not about human metagenome data, and the sample source should be human materials. Please delete and resubmit the study, selecting 'other' as the Study Type in the study information section, and fill in the appropriate type name. Also, please download the new template form and fill in the required information. Note that you should not use the previous form that was submitted with the incorrect study type.",
        label: "Other types have selected the metagenome type.",
      },
      {
        value:
          "Study Type selection is incorrect. The material source of the project is not cell line. Please delete and resubmit. In the new submission, select the corresponding category in the Study Information step. If there is no suitable category, please select 'Other study' Please download the new template table and fill it out for submission. Note that you should not use the incorrect table submitted in the previous submission.",
        label: "Human-origin data type has selected cell line.",
      },
      {
        value:
          "Please split the different types of data according to the study type (Disease study, Cohort study, Cell line related study, Clinical pathogen, Human metagenome, Ancients or Fossils, Other study) and submit them to the corresponding study separately.",
        label:
          "The data contains multiple types, including both cell line and human-origin data.",
      },
    ],
  },
  {
    value: 2,
    label: "individual",
    children: [
      {
        value:
          'The "individual" table should be used to fill in the information for each individual or patient. Each person or patient should be represented in one row. The information for different tissues or timepoints should be indicated in the "sample" table.',
        label: "Individual quantity is incorrect.",
      },
      {
        value:
          "The patient's name (full name, pinyin initials, etc.) in the individual table is confidential information and cannot be filled in the database. You need to rename the individual name.",
        label: "Individual name contains private information.",
      },
      {
        value:
          "The patient's name (full name, pinyin initials, etc.) in the individual table is considered private information and cannot be entered into the database. Therefore, you need to rename the individual name. This issue may also involve the sample name/title in the sample table, Experiment title in the experiment table, and Run title/file name information in the run table. Please check and modify them accordingly.",
        label: "Individual name contains sensitive information.",
      },
      {
        value:
          'In the individual table, the fifth column *experiment_group, the experiment_group of the study subject should be selected as "Case set".',
        label: "Experiment group was filled out incorrectly.",
      },
    ],
  },
  {
    value: 3,
    label: "family",
    children: [
      {
        value:
          'This study is a family-based study, and family information needs to be submitted. Please delete and resubmit. In the new submission, please select "yes" for "Is your study a Parent-Offspring Trios study?" in the study information step, and fill in the relationship between family members in the "family" table in the metadata spreadsheet.',
        label:
          "The family study did not provide information on the family lineage.",
      },
    ],
  },
  {
    value: 4,
    label: "sample",
    children: [
      {
        value:
          "The sample table is used to fill in information about the sampling of each sample. One type of sample material should be filled in one row. If there are different libraries for the same sample, please create different experiments and associate them with the sample. Samples extracted from different tissues or at different time points are considered as different samples.",
        label: "The sample quantity is incorrect.",
      },
      {
        value:
          "The patient's name (full pinyin, initials, etc.) is confidential information and cannot be filled in the database. Please rename the sample name/title.",
        label: "Sample name contains private information.",
      },
      {
        value:
          "The information in column 5 (*public_description) of the sample table is too brief. Please provide detailed information on the sample collection.",
        label: "Column 5 *public_description is filled out too simply.",
      },
      {
        value:
          "In the fifth column *public_description of the sample table, there are numerical increments. Please check and confirm whether they are real increments or mouse dragging increments. If there are any issues, please email gsa@big.ac.cn and we will assist in modifying or approving the relevant information.",
        label:
          "Column 5 *public_description has an increasing numerical value.",
      },
      {
        value:
          "The sample table is for filling in sample collection information. Please modify the column 5 * public_description information to include detailed information on the sample material. The library construction information should be filled in the Experiment table.",
        label:
          "Column 5 *public_description should include library construction information.",
      },
      {
        value:
          "In the sample table, please fill in the name and address of the unit, laboratory or PI who provided the biomaterial in the column 10 *biomaterial_provider.",
        label: "*biomaterial_provider only includes address information.",
      },
      {
        value:
          'The dates in the 9th column "collection_date" of the sample table are increasing, please check and confirm if they are correct. Once this information is submitted, users cannot update it themselves. Please email gsa@big.ac.cn to request modification assistance.',
        label: "*collection_date has an increasing date order",
      },
      {
        value:
          "In the sample table, the 7th column *organism is filled with the species information of the sequencing samples in this project. Please fill in the appropriate metagenome species information. Click the following link to select the corresponding species information: https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Undef&id=408169&lvl=3&p=has_linkout&p=blast_url&p=genome_blast&keep=1&srchmode=1&unlock.",
        label:
          "In the Meta table, *organism species is filled out incorrectly.",
      },
      {
        value:
          "The values in the column 14 *latitude_longitude of the sample table are in ascending order, please correct them.",
        label: "*latitude_longitude is incorrect.",
      },
      {
        value: "Tissue information is filled out incorrectly.",
        label: "Tissue information is filled out incorrectly.",
      },
    ],
  },
  {
    value: 5,
    label: "cell line",
    children: [
      {
        value:
          "The cell line table is used to fill in information about cell lines. One cell line should be filled in per row, and different treatments or samples from different time periods should be filled in as different samples. For materials that have been cultured under the same conditions, only one sample needs to be filled in, while for those that have been cultured under different conditions, different samples should be filled in.",
        label: "Incorrect number of commercial cell lines.",
      },
      {
        value:
          "Fill in the cell line information in the cell line table, one cell line per row. For different treatments or samples from different periods, fill in different samples. If the materials are cultured under the same conditions, only one sample needs to be filled in. If they are cultured under different conditions, different samples need to be filled in. Samples from the same individual should be included in the same row.",
        label: "Incorrect number of non-commercial cell lines.",
      },
      {
        value:
          "This project is researching cell lines. Please confirm if the cell lines used in this project are commercial cell lines, and fill in this information accurately.",
        label: "Commercial cell lines marked as non-commercial.",
      },
      {
        value:
          "Please confirm whether the cell lines used in the project are non-commercial. Please fill in the information accordingly.",
        label: "Non-commercial cell lines marked as commercial.",
      },
    ],
  },
  {
    value: 6,
    label: "experiment",
    children: [
      {
        value:
          "The experiment table is used to record the information of sequencing libraries generated from each sample. One sequencing library per sample should be recorded as one experiment. Biological replicates should be treated as different samples and recorded as different experiments. Technical replicates should also be recorded as different experiments.",
        label: "Incorrect number of experiments.",
      },
      {
        value:
          "Patient names (full pinyin, initial letters, etc.) are considered private information and cannot be filled in the database. Please rename Experiment title.",
        label: "Experiment title contains private information.",
      },
      {
        value:
          "The information in the 5th column *Library Construction / Experimental Design in the Experiment table is too simple, please provide detailed library construction information.",
        label:
          "*Library Construction / Experimental Design is filled out too simply.",
      },
      {
        value:
          "The column 5, 'Library Construction / Experimental Design', in the Experiment table should not contain the entire project's library construction information. It should only contain the library construction information for that particular sample. Please correct this.",
        label:
          "*Library Construction / Experimental Design should include multiple library construction strategies for the entire project.",
      },
      {
        value:
          'The values in the "Library Construction / Experimental Design" column of the Experiment table are in increasing order. Please check if the increase is genuine or due to drag-and-drop. If needed, please email gsa@big.ac.cn for assistance in correcting or approving the information.',
        label:
          "*Library Construction / Experimental Design has an increasing numerical value.",
      },
      {
        value:
          "The eighth column *Source in the Experiment table is recommended to be filled with the corresponding category of SINGLE CELL. Please modify it online.",
        label:
          "Single-cell sequencing source information is filled out incorrectly.",
      },
    ],
  },
  {
    value: 7,
    label: "run",
    children: [
      {
        value:
          "The relationship between multiple Runs associated with each Experiment: if it is biological replicate data, different samples should be created; if it is technical replicate data, multiple experiments should be created and associated with the same sample. If it is different Lane data produced from the same sequencing, please email gsa@big.ac.cn for approval.",
        label: "Incorrect number of runs (potentially duplicated).",
      },
      {
        value:
          "If multiple runs are associated with a single experiment, it means they are data generated from the same sample but with different library construction. In this case, you should create different experiments in the Experiment table to capture the different library construction information, and then associate each run with the corresponding experiment and fill in the file information in the Run table.",
        label: "Incorrect number of runs (different library constructions).",
      },
      {
        value:
          "Each single cell should be treated as a separate sample instead of being classified as different runs. Please delete and resubmit.",
        label:
          "Single-cell sequencing information for each cell is written as each run.",
      },
      {
        value:
          "The patient's name (full spelling, pinyin initials, etc.) is private information and should not be filled in the database. Please rename the run title.",
        label: "Run title contains private information.",
      },
      {
        value:
          "The sequencing method of this project should be paired-end sequencing. *R1.f(ast)q.gz and *R2.f(ast)q.gz or *1.f(ast)q.gz and *2.f(ast)q.gz are paired files. The Layout in the 10th column of the Experiment table should be selected as 'PAIRED'. In the Run table, fill in columns 5, 6, 7, and 8 for each row.",
        label: "Layout information is filled out incorrectly.",
      },
      {
        value:
          "The output format of the raw data from this sequencing platform is fastq. Please upload data files in fastq.gz/fq.gz format.",
        label: "A file in FASTA format was submitted.",
      },
      {
        value:
          'For single-cell sequencing data, one run may generate multiple files such as R1, R2, I1, etc. Please put all the data files of each run into one folder, compress them into a *.tar.gz file, and submit it. For the Run table, choose "10x Genomics" as the *Run data file type.',
        label: "Single-cell file processing is incorrect.",
      },
      {
        value:
          "There is an issue with the information provided in columns 5 and 7 of the Run table regarding the file name. The patient's name (full spelling, pinyin initials, etc.) is considered private information and cannot be included in the database. Please rename the file name, and if the data files have already been uploaded, please send the corresponding file names before and after the modification to gsa@big.ac.cn for assistance in making the changes.",
        label: "File name contains private information.",
      },
      {
        value:
          "Please provide a valid website URL and naming for the Assembly Name or Accession and Assembly Accession URL. This information is used for the reference genome used to generate the BAM file.",
        label:
          "Assembly Name or Accession and Assembly Accession URL are filled out incorrectly.",
      },
      {
        value:
          "The suffix of B1 format data should be *.ab1. Please check if the file names in the Run table are complete.",
        label: "AB1 format is filled out incorrectly.",
      },
      {
        value:
          'It needs to be confirmed whether the submitted data files are all in the fastq format. There are some file names in the table that do not contain "fq" or "fastq". If they are not in the fastq format, please submit the correct format of data files.',
        label: "Fastq data file name does not include '.fq' or '.fastq'.",
      },
    ],
  },
  {
    value: 8,
    label: "wrong DB selected",
    children: [
      {
        value:
          "GSA-Human database only accepts human-related omics sequencing data. Based on the information you provided, the sample is non-human. Please submit it to the GSA database. The submission process is as follows:",
        label: "Non-human raw sequencing data.",
      },
      {
        value:
          "GSA-Human database only accepts human-related raw omics sequencing data. For non-human samples, please submit to the GSA database following the relevant process. For chip data, please submit to the OMIX database (https://ngdc.cncb.ac.cn/omix/)..",
        label: "Chip data.",
      },
      {
        value:
          "GSA-Human database only accepts human-related raw omics sequencing data. Please submit variant data to GVM database (https://ngdc.cncb.ac.cn/gvm/).",
        label: "Variation data.",
      },
      {
        value:
          "GSA-Human database only accepts human-related original omics sequencing data. Please submit genome data to GWH database (https://ngdc.cncb.ac.cn/gwh/).",
        label: "Genome data.",
      },
      {
        value:
          "GSA-Human database only accepts human-related raw omics sequencing data. Please submit analyzed data to the OMIX database (https://ngdc.cncb.ac.cn/omix/).",
        label: "Analyzed data.",
      },
    ],
  },
  {
    value: 9,
    label: "Others",
    children: [
      {
        value:
          "Please fill in and submit the real and detailed metadata information. Please delete and resubmit.",
        label: "For testing purposes.",
      },
      {
        value:
          "Please separate human and non-human data and submit human data to GSA-Human and non-human data to GSA. Both data should be associated with the same BioProject accession.",
        label: "Partial human data and partial mouse or other species data.",
      },
    ],
  },
];
const options1 = [
  {
    value:
      "The submitted form cannot be overwritten. Please delete the Study and resubmit it. If the data files have already been uploaded, there is no need to re-upload them.",
    label:
      "The submitted form cannot be overwritten. Please delete the Study and resubmit it. If the data files have already been uploaded, there is no need to re-upload them.",
  },
  {
    value:
      "Please delete and resubmit, or make modifications online by clicking on 'edit' for each experiment and run.",
    label:
      "Please delete and resubmit, or make modifications online by clicking on 'edit' for each experiment and run.",
  },
  {
    value:
      "After submitting the form, it cannot be overwritten. You can either delete it and resubmit, or send the correct information to gsa@big.ac.cn via email and we will assist with the modification.",
    label:
      "After submitting the form, it cannot be overwritten. You can either delete it and resubmit, or send the correct information to gsa@big.ac.cn via email and we will assist with the modification.",
  },
];
const useInfos = ref({
  isPI: 1,
});
const activePI = ref("first");
const props = { checkStrictly: true, multiple: true };
const isShow = ref(false)
const fileStatus = ref(0)
const queueSatus = ref(0)
const dateSelect = ref(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
const ReleaseStatus = ref(GsaHumanStore.$state.currentInfos.ReleaseStatus)

var commentsInTextArea = ref("");
var selectedMetaDatasProblemsOptions = ref([]);
var selectedOverAllOptions = ref([]);


var PIComments = "";
var isPi = ""
var isHomePage = ""
var MetaComments = "";
var OverAllComments = "";

const dialogPICheckVisible = ref(false);
const dialogReviewVisible = ref(false);
const inBbatchesVisible = ref(false);
const withdrawReleaseVisible = ref(false);

const commentBaicPI = "There are the following issues with your PI information:" + "\n";
const commentBaicDatas = "There are the following issues with your metadata information:" + "\n";
const commentBaic = "There are the following suggestions for your submission:" + "\n";


const state1 = ref('')
const suggestions = [
  { value: "Large file, hard disk has been contacted to mail, hard disk has not arrived" },
  { value: "The Run file is large, and no file is submitted" }
]



const fetchSuggestions = (queryString, callback) => {
  const results = queryString ? suggestions.filter(createFilter(queryString)) : suggestions
  callback(results);
};
function createFilter(queryString) {
  return (restaurant) => {
    return (
      //restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) == 0
      /*index==0表示是否在第一个索引位置找到输入的字符，*/
      restaurant.value.indexOf(queryString) != -1 //这个语句表示只有有关键字即可，不论在哪个位置匹配到

    )
  }
}
const metaDataCheck = () => {
  //暂时没有管bioproject
  if (useInfos.value.isPI == 1) {
    ElMessage({
      message:
        "Warning, Please check PI information and BioProject in advance.",
      type: "warning",
    });
    return null;
  }
  dialogReviewVisible.value = true;
};
const refusePIClick = () => {

  if (isPi == "" && isHomePage == "") {
    ElMessage({
      message: "Warning, Please select an option.",
      type: "warning",
    });
    return null;
  }
  PIComments = "";
  PIComments += commentBaicPI + isPi + '\n\n' + isHomePage + '\n\n'
  commentsInTextArea.value += PIComments
  // console.log(PIComments);
  dialogPICheckVisible.value = false;
  useInfos.value.isPI = 3;
};
const handleCascaderChange = (selectedMetaDatasProblemsOptions) => {
  MetaComments = "";
  MetaComments += commentBaicDatas;
  if (!selectedMetaDatasProblemsOptions.length) {
    MetaComments = "";
  } else {
    for (var i = 1; i <= selectedMetaDatasProblemsOptions.length; i++) {
      MetaComments +=
        i + "." + selectedMetaDatasProblemsOptions[i - 1][1] + "\n\n";
    }
  }
  commentsInTextArea.value = PIComments + MetaComments + OverAllComments;
};
const handleCascaderChangeForOverAll = (val) => {
  OverAllComments = "";
  OverAllComments += commentBaic;
  if (val == "") {
    OverAllComments = "";
  } else {
    OverAllComments += val
  }
  commentsInTextArea.value = PIComments + MetaComments + OverAllComments;
};
const modify = () => {

}
const reset = () => {
  radioId1.value = 0
  radioId2.value = 0
}
const handleHomePageSelect = (row) => {
  isHomePage = row.comments
}
const handlePICheckSelect = (row) => {
  isPi = row.comments
}
const toHistory = () => {
  let historyTableData = []
  let thisData = {}
  thisData.ArchiveID = GsaHumanStore.$state.currentInfos.ArchiveID + "/history"
  thisData.time = GsaHumanStore.$state.currentInfos.MetadataSubmissionTime
  thisData.position = 'Data management'
  thisData.event = '元数据审核'
  thisData.detail = commentsInTextArea.value
  thisData.addation = ""
  historyTableData.push(thisData)
  GsaHumanStore.$state.historyTableData = historyTableData
  router.push("/history")
}
const showVite = (row) => {
  // console.log(row);
  if (row == 1) {
    isShow.value = true
  } else {
    isShow.value = false
  }
}
const metaDataReviewPassReview = () => {
  // console.log(form.value);
  if (form.value.queue == 0) {
    queueSatus.value = 0
  } else if (form.value.queue == 1) {
    queueSatus.value = 2
  }
  if (form.value.file == 0) {
    form.value.vite = ""
  }
  fileStatus.value = 2
  dialogReviewVisible.value = false
}
const handleSelect = (item) => {
  console.log(item)
}
const notRewview = () => {
  fileStatus.value = 1
  dialogReviewVisible.value = false
}
const backToGsaHuman = () => {
  router.go(-1)
}
const pickerOptions = (time) => {
  return time.getTime() < Date.now()
}
const withDrawReleaseComfirmed = () => {
  ReleaseStatus.value = 3
  withdrawReleaseVisible.value = false
}
const toModifyMetadata = () => {
  let historyTableData = []
  let thisData = {}
  thisData.ArchiveID = GsaHumanStore.$state.currentInfos.ArchiveID + "/Metadata"
  thisData.time = GsaHumanStore.$state.currentInfos.MetadataSubmissionTime
  thisData.position = 'Data management'
  thisData.event = '元数据审核'
  thisData.detail = commentsInTextArea.value
  thisData.title = 'Exome sequencing in fetal short long bones'
  thisData.description = 'This study was conducted to identify the genetic causes for fetal short long bones (SLBs) and retrospectively evaluated the additional diagnostic yield of exome sequencing for SLBs following the use of conventional genetic testing.'
  thisData.addation = ""
  historyTableData.push(thisData)
  GsaHumanStore.$state.historyTableData = historyTableData
  router.push("/modifyMetaData")
}
</script>

<style lang="less" scoped>
.GsaHumanReview {

  min-width: 1300px;
}

.block {
  margin-bottom: 30px;
  border-radius: 0.5em;
  border: dotted;
  border-width: 0.1px;
  border-color: rgb(203, 200, 200);

  // border-top-style: none;
  .blockTitle {
    color: #0070C0;
    margin: 8px;
    font-size: 30px;
  }
}

.editButton {
  position: absolute;
  right: 0px;
}

// .inline-input w-50{

// }
.context {
  margin: 7px;
  font-size: 22px;
}

.piPass {
  margin-top: 50px;
  text-align: center;
  height: 100px;
  font-size: large;
}
</style>