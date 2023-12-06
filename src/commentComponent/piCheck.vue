<template>
    <div class="PI check">
      <h2>PI check</h2>
      <div class="dialogTitle">
      <el-tabs v-model="activePI" class="demo-tabs">
        <el-tab-pane label="Pass" name="first">
          <h4>Submitter : Zhang Yan qiumantang@163.com</h4>
          <h4>Organization : Guangdong Women and Children Hospital</h4>
          <h4>Department : Center for Medical Genetics</h4>
          <h4>Country/Region : China</h4>
          <h4>
            Personal Home Page :
            <a
              href="https://baike.baidu.com/item/%E5%BC%A0%E5%BD%A6/57918436?fr=aladdin"
              >https://baike.baidu.com/item/%E5%BC%A0%E5%BD%A6/57918436?fr=aladdin</a
            >
          </h4>
          <h4>
            Institute/Organization Home Page :
            <a href="http://www.e3861.com/cn/">http://www.e3861.com/cn/</a>
          </h4>
          <el-button @click="dialogPICheckVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="(dialogPICheckVisible = false), (useInfos.isPI = 2)"
          >
            Comfirmed
          </el-button>
        </el-tab-pane>
        <el-tab-pane label="refuse" name="second">
          <el-row type="flex">
            <el-col :span="24">
              <el-table
                :data="tableData4"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="选择" align="center" width="65">
                  <template #default="scope">
                    <el-radio
                      :label="scope.$index"
                      v-model="radio"
                    ></el-radio>
                  </template>
                </el-table-column>

                <el-table-column label="description" width="650">
                  <template #default="scope">{{ scope.row.data }}</template>
                </el-table-column>
              </el-table>
              <el-button
                @click="
                  (dialogPICheckVisible = false), (commentsInTextArea = '')
                "
                >Cancel</el-button
              >
              <el-button type="primary" @click="refusePIClick">
                Comfirmed
              </el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
    
</style>