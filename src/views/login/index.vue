<template>
  <div id="login-page">
    <div class="login-form">
      <p class="title">Hi，欢迎登录</p>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0" class="demo-ruleForm">
        <el-form-item label="" prop="username">
          <el-input :prefix-icon="Avatar" v-model="ruleForm.username" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input :prefix-icon="Lock" v-model="ruleForm.password" show-password type="password"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="loginHandler(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="form-bottom">
        <el-button class="register-btn" link type="primary">找回密码</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { reactive, ref } from "vue";

import { Avatar, Lock } from "@element-plus/icons-vue";
import { FormInstance } from 'element-plus';
import { ILoginUserInfo } from "./type";


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ILoginUserInfo>({
  username: "admin",
  password: "admin123!@#",
})
const rules = reactive({
  username: [{ required: true, min: 4, max: 12, trigger: 'blur' }],
  password: [{ required: true, min: 6, max: 18, trigger: 'blur' }],
})
const loginHandler = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
   
  });
}

</script>

<style lang="less" scoped>
#login-page {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/login_background.e80f4621.png");
  background-size: cover;

  /* element-ui 样式重置 */
  .login-form {
    box-sizing: border-box;
    width: 320px;
    height: 340px;
    position: absolute;
    background-color: #ffffff;
    border-radius: 8px;
    right: 105px;
    bottom: 150px;
    text-align: center;
    padding: 20px 10px;

    .title {
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 30px;
    }

    .login-btn {
      width: 100px;
    }


    .form-bottom {
      margin-top: 30px;
      text-align: right;
      padding: 0 10px;
    }
  }
}
</style>