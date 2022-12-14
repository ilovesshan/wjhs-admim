<template>
  <div id="system-user-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">
        <el-form-item label="用户类型">
          <el-select v-model="currentUserType">
            <el-option key="0" label="平台用户" value="0" />
            <el-option key="2" label="骑手" value="2" />
            <el-option key="3" label="回收中心" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary">搜索 <el-icon class="el-icon--right">
              <Search />
            </el-icon>
          </el-button>
          <el-button @click="handleReset">重置 <el-icon class="el-icon--right">
              <RefreshRight />
            </el-icon>
          </el-button>
        </el-form-item>

      </el-form>

      <!-- 新增 、修改、删除、导出 按钮-->
      <el-row>
        <el-button @click="openDialogWithAdd" plain type="primary">新增<el-icon class="el-icon--right">
            <Plus />
          </el-icon>
        </el-button>

        <el-button @click="openDialogWithUpdate(selectedIds[0])" type="success" :disabled="(selectedIds.length != 1)"
          plain>更新<el-icon class="el-icon--right">
            <Edit />
          </el-icon>
        </el-button>

        <el-button @click="handleDelete(selectedIds[0])" type="danger" :disabled="(selectedIds.length < 1)"
          plain>删除<el-icon class="el-icon--right">
            <Delete />
          </el-icon>
        </el-button>

        <el-button @click="handleExport" type="warning" :disabled="(selectedIds.length < 1)" plain>导出<el-icon
            class="el-icon--right">
            <Download />
          </el-icon>
        </el-button>
      </el-row>
    </el-card>



    <!-- 表格区域 -->
    <el-card shadow="never">
      <el-table :data="systemUsers" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
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
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button @click="openDialogWithUpdate(scope.row.id)" link type="primary" size="small">更新</el-button>
            <el-button :disabled="scope.row.username == 'admin'" @click="handleDelete(scope.row.id)" link type="danger"
              size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增弹框 -->
    <el-dialog v-model="dialogVisible" title="新增/更新用户" width="30%">
      <el-form :model="insertOrUpdateUserData" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="insertOrUpdateUserData.username" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="insertOrUpdateUserData.nickName" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="insertOrUpdateUserData.phone" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload style="width:100px; height:80px; border: 1px solid #dcdfe6; line-height: 80px; text-align: center;"
            :action="baseUrl + '/attachments'" :headers="uploadHeader" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100" height="80" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="insertOrUpdateUserData.gender" placeholder="">
            <el-option key="20" label="男" value="20" />
            <el-option key="21" label="女" value="21" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="insertOrUpdateUserData.userType" placeholder="">
            <el-option key="0" label="平台用户" value="0" />
            <el-option key="2" label="骑手" value="2" />
            <el-option key="3" label="回收中心" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input :disabled="insertOrUpdateUserData.id == '' "  v-model="insertOrUpdateUserData.password" show-password type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleInsertOrUpdateUser"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { ElMessage, ElMessageBox } from "element-plus";

import { systemUserList, insertUser, deleteUser, selectUserById, updateUser } from "@/api/user";
import { userStore } from "@/store/index"

import { getStringByCode } from "@/utils/system-dict"
import ServiceConfig from "@/config/serviceConfig";
import { SCache } from "@/utils/cache";

import type { IUserInfo } from "@/store/modules/user";
import type { IInsertOrUpdateUser } from "./type";
import { deepClone } from "@/utils/deep-clone";


const selectedIds = ref<Array<string>>([]);
const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
const systemUsers = computed(() => userStore.systemUserList);

const uploadHeader = {
  Authorization: "Bearer " + SCache.get("token"),
}

const defaultValue = (): IInsertOrUpdateUser => {
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
let insertOrUpdateUserData = reactive(defaultValue());


const getSystemUserList = () => {
  systemUserList(currentUserType.value).then((res: { code: number; data: IUserInfo[]; }) => {
    if (res.code == 200) {
      userStore.saveSystemUserList(res.data as Array<IUserInfo>)
    }
  })
}

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

const openDialogWithAdd = () => {
  dialogVisible.value = true;
  insertOrUpdateUserData = reactive(deepClone<IInsertOrUpdateUser>(defaultValue()));
}

const handleInsertOrUpdateUser = async () => {
  let result = null;
  if (insertOrUpdateUserData.id) {
    result = await updateUser(insertOrUpdateUserData)
  } else {
    result = await insertUser(insertOrUpdateUserData)
  }
  if (result.code == 200) {
    ElMessage.success(result.message)
    dialogVisible.value = false;
    imageUrl.value = "";
    getSystemUserList();
  } else {
    ElMessage.success(result.message)
  }
}

getSystemUserList();

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  insertOrUpdateUserData.attachmentId = response.data.id;
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


const handleSelectionChange = (selected: Array<any>) => {
  selectedIds.value = selected.map((notice: any) => notice.id)
}

const handleSearch = () => getSystemUserList();
const handleReset = () => { }

const openDialogWithUpdate = async (id: string) => {
  const result = await selectUserById(id);
  insertOrUpdateUserData = reactive<IInsertOrUpdateUser>(result.data);
  imageUrl.value = baseUrl + result.data.attachment.url;
  dialogVisible.value = true;
}

const handleExport = () => { }

</script>
<style lang="less" scoped>
#system-user-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>