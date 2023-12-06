<template>
  <div class="App">
    <!-- <div class="backgroudPicture">
        <Particles
            id="tsparticles"
            :particlesInit="particlesInit"
            :particlesLoaded="particlesLoaded"
            :options="{
                    background: {
                        color: {
                            value: '#0d47a1'
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'grab'
                            },
                            resize: true
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: '#ffffff'
                        },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: true
                        },
                        FullScreen:{enable:true,
                        ZIndex:-10},
                        move: {
                            direction: 'none',
                            enable: true,
                            outMode: 'bounce',
                            random: false,
                            speed: 5,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800
                            },
                            value: 40
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            random: true,
                            value: 5
                        }
                    },
                    detectRetina: true
                }"
        />
    </div> -->
    <el-container>
      <el-header class="banner">
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#ffff" text-color="#0c64b6"
          active-text-color="#0c64b6" style="margin-left: 20px; margin-right: 20px;">
          <el-menu-item-group index="0">
            <template #title>
              <a href="/">
                <img style="width: 160px" src="@/assets/img/home/smart-icon.png" alt="smart-logo" />
              </a>
            </template>
          </el-menu-item-group>

          <el-menu-item index="1"><el-icon>
              <HomeFilled />
            </el-icon><a href="/">Home</a></el-menu-item>
          <el-menu-item index="2"><el-icon>
              <Document />
            </el-icon><a href="">Documentation</a></el-menu-item>
          <el-sub-menu index="3">
            <template #title><el-icon>
                <Tools />
              </el-icon>Tools</template>
            <router-link to="/publication"><el-menu-item index="3-1">Publication</el-menu-item></router-link>
            <el-menu-item index="3-2">item two</el-menu-item>
            <el-menu-item index="3-3">item three</el-menu-item>
            <el-sub-menu index="3-4">
              <template #title>item four</template>
              <el-menu-item index="3-4-1">item one</el-menu-item>
              <el-menu-item index="3-4-2">item two</el-menu-item>
              <el-menu-item index="3-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="4"><el-icon>
              <UserFilled />
            </el-icon><a @click="showLogin">Log in</a></el-menu-item>
          <el-menu-item index="5"><el-icon>
              <EditPen />
            </el-icon><a href="">Sign up</a></el-menu-item>

          <el-sub-menu index="6">
            <template #title><el-icon>
                <Switch />
              </el-icon>Language</template>
            <el-menu-item index="2-1">Chinese</el-menu-item>
            <el-menu-item index="2-2">English</el-menu-item>
          </el-sub-menu>
        </el-menu>
        <el-main><router-view></router-view></el-main>
        <div class="h-6" />
      </el-header>

    </el-container>
    <login ref="loginComponent"/>
  </div>
</template>

<script setup>
import { HomeFilled } from "@element-plus/icons-vue";
import { Document } from "@element-plus/icons-vue";
import { Tools } from "@element-plus/icons-vue";
import { UserFilled } from "@element-plus/icons-vue";
import { EditPen } from "@element-plus/icons-vue";
import { Switch } from "@element-plus/icons-vue";

import { ref } from 'vue'
import login from './views/Login/login.vue'

const loginComponent = ref()
const showLogin =()=>{
  console.log(
    11111
  );

}
</script>

<style lang="less" scoped></style>
