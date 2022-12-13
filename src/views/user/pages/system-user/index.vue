<template>
  <div id="system-user-page">
    <!-- 搜索条件框 -->
    <el-card shadow="never">
      <!-- 搜索条件框 -->
      <el-row>
        <el-col>
          <el-form-item label="用户类型">
            <el-select v-model="currentUserType">
              <el-option key="0" label="平台用户" value="0" />
              <el-option key="2" label="骑手" value="2" />
              <el-option key="3" label="回收中心" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 新增按钮 -->
      <el-row>
        <el-button @click="openDialog" plain type="primary">新增<el-icon class="el-icon--right">
            <Plus />
          </el-icon>
        </el-button>
      </el-row>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never">
      <el-table :data="systemUsers" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="nickName" label="昵称" width="180" />
        <el-table-column label="角色" width="120">
          <template #default="scoped">
            <el-tag type="success">{{ getStringByCode(scoped.row.userType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="120">
          <template #default="scoped">
            <el-avatar v-if="scoped.row.attachment && scoped.row.attachment.url"
              :src="baseUrl + scoped.row.attachment.url" />
          </template>
        </el-table-column>
        <el-table-column label="性别" width="160">
          <template #default="scoped">
            <p>{{ getStringByCode(scoped.row.gender) }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180" />
        <el-table-column prop="lastVisitTime" label="上次登录时间" width="240" />
        <el-table-column prop="createTime" label="注册时间" width="240" />
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button :disabled="scope.row.username == 'admin'" @click="handleDelete(scope.row.id)" link type="danger"
              size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增弹框 -->
    <el-dialog v-model="dialogVisible" title="新增用户" width="30%">
      <el-form :model="insertUserData" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="insertUserData.username" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="insertUserData.nickName" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="insertUserData.phone" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload style="width:200px; height:80px; border: 1px solid #dcdfe6; line-height: 80px; text-align: center;"
            :action="baseUrl + '/attachments'" :headers="uploadHeader" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" width="200" height="80" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="insertUserData.gender" placeholder="">
            <el-option key="20" label="男" value="20" />
            <el-option key="21" label="女" value="21" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="insertUserData.userType" placeholder="">
            <el-option key="0" label="平台用户" value="0" />
            <el-option key="2" label="骑手" value="2" />
            <el-option key="3" label="回收中心" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="insertUserData.password" show-password type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleInsertUser"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, reactive } from "vue";
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { ElMessage, ElMessageBox } from "element-plus";

import { systemUserList, insertUser, deleteUser } from "@/api/user";
import { userStore } from "@/store/index"

import { getStringByCode } from "@/utils/system-dict"
import ServiceConfig from "@/config/serviceConfig";
import { SCache } from "@/utils/cache";

import type { IUserInfo } from "@/store/modules/user";
import type { IInsertUser } from "./type";
import { deepClone } from "@/utils/deep-clone";

const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
const systemUsers = computed(() => userStore.systemUserList);

const uploadHeader = {
  Authorization: "Bearer " + SCache.get("token"),
}

const defaultInsertUserData = (): IInsertUser => {
  return {
    "attachmentId": "",
    "gender": "",
    "nickName": "",
    "password": "",
    "phone": "",
    "userType": null,
    "username": ""
  }
}

const imageUrl = ref<string>("");
const currentUserType = ref("0");
const dialogVisible = ref(false);
let insertUserData = reactive(defaultInsertUserData());


const getSystemUserList = () => {
  systemUserList(currentUserType.value).then((res: { code: number; data: IUserInfo[]; }) => {
    if (res.code == 200) {
      userStore.saveSystemUserList(res.data as Array<IUserInfo>)
    }
  })
}

watch(() => currentUserType.value, () => getSystemUserList())

const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除吗?', '删除', { type: "error" })
    .then(async () => {
      const result = await deleteUser(id);
      const { code, message } = result
      if (code == 200) {
        ElMessage({ type: "success", message });
        getSystemUserList();
      } else {
        ElMessage({ type: "success", message });
      }
    })
    .catch(() => { })
}

const openDialog = (id: string)=> {
  dialogVisible.value = true;
  insertUserData = reactive(deepClone<IInsertUser>(defaultInsertUserData()));
}

const handleInsertUser = () => {
  insertUser(insertUserData).then(res => {
    if (res.code == 200) {
      ElMessage.success(res["message"])
      dialogVisible.value = false;
      imageUrl.value = "";
      getSystemUserList();
    } else {
      ElMessage.error(res["message"])
    }
  })
}

getSystemUserList();

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  insertUserData.attachmentId = response.data.id;
  imageUrl.value = baseUrl + response.data.url;
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isJPG = rawFile.type === 'image/jpeg' || 'image/png';
  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG、JPEG、PNG 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error('上传图片大小不能超过 3MB!')
    return false
  }
  return true
}
</script>
<style lang="less" scoped>
#system-user-page {
  .el-card {
    margin-bottom: 15px;
  }
}
</style>