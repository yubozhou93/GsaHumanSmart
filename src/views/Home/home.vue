<template>
  <div class="home">
    <div class="layout1">
      <el-main>
        <el-row class="is-justify-center">
          <el-col :span="8">
            <h1 truncated class="title-text">
              We provide reliable smart service
            </h1>
            <div class="el-button-mg">
              <el-button class="p1-button" type="primary"
                >Quick Start Guide smart (CN)<el-icon><DArrowRight /></el-icon
              ></el-button>
              <el-button class="p2-button" type="primary"
                >Quick Start Guide smart (US)<el-icon><DArrowRight /></el-icon
              ></el-button>
            </div>
          </el-col>
          <el-col :span="9">
            <el-scrollbar height="240px" style="margin-top: 10px">
              <template v-for="item in scrollbarDatas" :key="item">
                <div class="scrollbar-demo-item">
                  <img
                    style="width: 20px"
                    src="@/assets/img/notice-icon.png"
                    alt="notice-icon"
                  />
                  <h3 style="padding: 10px">{{ item.date }}</h3>
                  <p>{{ item.name }}</p>
                </div>
              </template>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-main>
    </div>

    <div class="layout2">
      <el-main>
        <el-row class="is-justify-center">
          <el-col :span="8">
            <div class="el-l2-item">
              <div class="el-l2-title">
                Please choose a smart curation service to use
              </div>
            </div>
          </el-col>
          <template v-for="item in squareDatas" :key="item">
            <el-col :span="8" @click="dbclick(item.url)">
              <div
                class="el-l2-text"
                :style="{
                  background:
                    'linear-gradient(to top right, ' + item.color + ')',
                }"
              >
                <div class="s3-ico">
                  <img :src="item.img" :alt="item.name" />
                </div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.name }}</p>
              </div>
            </el-col>
          </template>
        </el-row>
      </el-main>
    </div>

    <div class="layout3">
      <el-main>
        <el-row class="is-justify-center">
          <el-col :span="6">
            <div class="statistic-card">
              <el-icon><Avatar /></el-icon>
              <el-statistic title="Daily active Curator" :value="268500" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="statistic-card">
              <el-icon><Document /></el-icon>
              <el-statistic title="Daily deal Curation" :value="268500" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="statistic-card">
              <el-icon><Collection /></el-icon>
              <el-statistic title="Curation in Total" :value="8286500" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="statistic-card">
              <el-icon><UserFilled /></el-icon>
              <el-statistic title="Curator in Total" :value="268500" />
            </div>
          </el-col>
        </el-row>
      </el-main>
    </div>
  </div>
</template>

<script setup>
import { Document } from "@element-plus/icons-vue";
import { DArrowRight } from "@element-plus/icons-vue";
import { UserFilled } from "@element-plus/icons-vue";
import { Avatar } from "@element-plus/icons-vue";
import { Collection } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router =useRouter()

const scrollbarDatas = [
  {
    date: "2023-03-29",
    name: "国家基因组科学数据中心smart用户服务数据统计",
    url: "",
  },
  {
    date: "2023-03-29",
    name: "国家基因组科学数据中心smart用户服务数据统计",
    url: "",
  },
  {
    date: "2023-03-29",
    name: "国家基因组科学数据中心smart用户服务数据统计",
    url: "",
  },
];
const squareDatas = [
  {
    title: "GSA-SMART",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "",
    img: "/static/img/home/gsa-smart.png",
    color: "#8fdfff, #dcf5ff",
  },
  {
    title: "GSA-Human-Smart",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "/gsaHumanHome",
    img: "/static/img/home/gsa-human-smart.png",
    color: "#e3a8c7, #fff5fb",
  },
  {
    title: "Omix-Smart",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "",
    img: "/static/img/home/omix-smart.png",
    color: "#aeeeff, #dcffdc",
  },
  {
    title: "BioProject-SMART",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "",
    img: "/static/img/home/bioproject-smart.png",
    color: "#ffd9a1, #f9edda",
  },
  {
    title: "BioSample-smart",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "",
    img: "/static/img/home/bio-sample-smart.png",
    color: "#f1caff, #f3e6ff",
  },
  {
    title: "GWH-SMART",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "",
    img: "/static/img/home/gwh-smart.png",
    color: "#f1caff, #ffe5b8",
  },
  {
    title: "GenBase-smart",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "",
    img: "/static/img/home/genbase-smart.png",
    color: "#f1caff, #caf3ff",
  },
  {
    title: "GVM-Smart",
    name: "北京基因组所（国家生物信息中心）实现国家人类遗传资源信息一体化管理备份",
    url: "",
    img: "/static/img/home/gvm-smart.png",
    color: "#d3ffca, #ffeaa6",
  },
];
function dbclick(url){
  // console.log(url);
  router.push(url)
}
</script>

<style lang="less" scoped>
.layout1 {
  padding-top: 20px;
  background: #f8f9fa;
  .title-text {
    font-size: 60px;
    color: #0c64b6;
    font-weight: bolder;
    margin-top: 15px;
  }
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 110px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
  .p2-button {
    height: 60px;
    background: linear-gradient(to top right, #49c6b5, #13ae67);
    border: #13ae67;
    font-weight: bolder;
  }
  .p1-button {
    height: 60px;
    background: linear-gradient(to top right, #fe651b, #fcd878);
    border: #fcd878;
    font-weight: bolder;
  }
}

.layout2 {
  padding: 60px 0 60px;
  background: #f8f9fa;
  .el-l2-item {
    margin: 30px 0;
    max-height: 200px;
    .el-l2-title {
      margin-left: 10px;
      font-size: 40px;
      font-weight: bolder;
    }
  }
  .el-l2-text {
    position: relative;
    transition: 0.3s;
    margin: 18px;
    padding: 28px 30px;
    border-radius: 5px;
    h4 {
      color: #323648;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 18px;
      margin-top: 15px;
      position: relative;
      text-transform: uppercase;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      a {
        color: #323648;
      }
    }
    .s3-ico {
      overflow: hidden;
      position: absolute;
      top: -30px;
      right: 30px;
      background: #fff;
      width: 95px;
      text-align: center;
      border-radius: 80px;
      height: 80px;
      padding-top: 15px;
    }
  }
}
.el-l2-text img {
  width: 100px;
  margin-top: -18px;
}
.el-l2-item:hover .el-l2-text {
  background: #fff none repeat scroll 0 0;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.2);
}
.el-l2-item:hover .el-l2-text .s3-ico {
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.2);
  background: #00bcd4;
}
.el-l2-item:hover .el-l2-text .s3-ico img {
  filter: drop-shadow(0 100px #fff);
  opacity: 0.9;
}

.layout3 {
  background-color: #e6f1f4;
  height: auto;
  .statistic-card {
    height: auto;
    padding: 30px;
    border-radius: 5px;
    background: linear-gradient(to top right, #fffbf3, #f0fdff);
    margin: 10px;
  }
  
}
</style>