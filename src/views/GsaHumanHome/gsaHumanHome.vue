<template>
  <div class="gsaHumanHome">
    <!-- <h2>gsaHumanHome</h2> -->
    <!-- <el-row type="flex">
      <p>MetaData status:</p>
      <el-select v-model="value1" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <p>Data status:</p>
      <el-select v-model="value2" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <p>Release Status:</p>
      <el-select v-model="value3" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div class="searchArea">
        <el-input v-model="searchValue" placeholder="Enter search content" style="width: 200px;" size="large" />
        <el-button type="primary" @click="handleSearch" size="large">search</el-button>
      </div>
    </el-row>
    <el-divider /> -->
    <el-row>
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane>
            <template v-slot:label>
              <span class="custom-label">Data management</span>
            </template>
            <data-management></data-management>
          </el-tab-pane>
          <el-tab-pane>
            <template v-slot:label>
              <span class="custom-label">Task management</span>
            </template>
            Task management</el-tab-pane>
          <el-tab-pane>
            <template v-slot:label>
              <span class="custom-label">Resource management</span>
            </template>
            Resource management</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>

  <!-- <div class="dropdown3">
    <button class="dropbtn3">语言/language <span class="arrow">&#9660;</span></button>
    <div class="dropdown-content3">
      <a href="#">English</a>
      <a href="#">中文</a>
      <a href="#">French</a>
      <a href="#">German</a>
      <a href="#">Japanese</a>
    </div>
  </div> -->
</template>

<script setup>
import dataManagement from './cps/dataManagement.vue'
</script>

<style lang="less" scoped>
.gsaHumanHome {
  margin-top: -21px;
}

.custom-label {
  font-size: 22px;
}

// .dropdown3 {
//   position: relative;
//   display: inline-block;
// }

// .dropbtn3 {
//   background-color: inherit;
//   border: none;
//   color: #333;
//   padding: 6px 12px;
//   font-size: 14px;
//   border-radius: 0.5em;
//   cursor: pointer;
// }

// .dropdown-content3 {
//   display: none;
//   position: absolute;
//   min-width: 100%;
//   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
//   z-index: 1;
//   background-color: #f9f9f9;
// }

// .dropdown-content3 a {
//   color: #333;
//   padding: 10px;
//   display: block;
// }

// .dropdown3:hover .dropdown-content3 {
//   display: block;
// }
// .dropdown-content3 a:hover {
//   background-color: #ccc;
// }
</style>