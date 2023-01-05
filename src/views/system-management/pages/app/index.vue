<template>
  <div id="app-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="90px" label-position="left">
        <el-form-item label="版本号名称" prop="">
          <el-input placeholder="版本号关键字" clearable />
        </el-form-item>

        <el-form-item label="发布日志" prop="">
          <el-input placeholder="发布日志关键字" clearable />
        </el-form-item>

        <el-form-item label="创建时间" prop="">
          <el-date-picker format="YYYY-MM-DD" type="daterange" range-separator="到" value-format="YYYY-MM-DD HH:mm:ss"
            @change="datePickerChange" start-placeholder="开始日期" end-placeholder="结束日期" />
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

        <el-button @click="" type="success" :disabled="(selectedIds.length != 1)" plain>更新<el-icon
            class="el-icon--right">
            <Edit />
          </el-icon>
        </el-button>

        <el-button @click="" type="danger" :disabled="(selectedIds.length < 1)" plain>删除<el-icon class="el-icon--right">
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
      <el-table :data="apkList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="versionName" label="版本号名称" width="120" />
        <el-table-column prop="major" label="主版本号" width="80" />
        <el-table-column prop="minor" label="次版本号" width="80" />
        <el-table-column prop="patch" label="修订号" width="80" />
        <el-table-column prop="versionCode" label="编译版本号" width="120" />
        <el-table-column prop="" label="文件大小" width="120">
          <template #default="scope">
            {{ calcCapacity(scope.row.apkSize) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="更新类别" width="200">
          <template #default="scope">
            <el-tag type="success">{{ getStringByCode(scope.row.updateStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="modifyContent" show-overflow-tooltip label="发布日志" width="400" />
        <el-table-column prop="" show-overflow-tooltip label="下载地址" width="500">
          <template #default="scope">
            <el-link :href="baseUrl + scope.row.downloadUrl" target="_blank" :underline="false">{{ baseUrl +
    scope.row.downloadUrl
}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间" width="240" />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button @click="shareQrCode(scope.row.downloadUrl)" link type="success" size="small">下载二维码</el-button>
            <el-button @click="handleDelete(scope.row.id)" link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增弹框 -->
    <el-dialog v-model="dialogVisible" title="apk上传" width="30%">
      <el-form :model="apkData" label-width="100px" label-position="left">
        <el-form-item label="版本号名称">
          <el-input @blur="apkVersionNameBlur" v-model="apkData.versionName" />
        </el-form-item>
        <el-form-item label="apk文件">
          <el-upload :limit="1" :auto-upload="false" :on-change="handleChange">
            <el-button>上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="主版本号">
          <el-input v-model="apkData.major" />
        </el-form-item>
        <el-form-item label="次版本号">
          <el-input v-model="apkData.minor" />
        </el-form-item>
        <el-form-item label="修订版本号">
          <el-input v-model="apkData.patch" />
        </el-form-item>
        <el-form-item label="编译版本号">
          <el-input v-model="apkData.versionCode" />
        </el-form-item>
        <el-form-item label="更新类别">
          <el-select v-model="apkData.updateStatus">
            <el-option label="无版本更新" value="39" />
            <el-option label="有版本更新，不需要强制升级" value="40" />
            <el-option label="有版本更新，需要强制升级" value="41" />
          </el-select>
        </el-form-item>
        <el-form-item label="发布日志">
          <el-input type="textarea" :rows="3" v-model="apkData.modifyContent" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateApk"> 确定</el-button>
        </span>
      </template>
    </el-dialog>


    <!-- apk下载二维码 -->
    <el-dialog v-model="qrCodeDialog" title="apk下载二维码" width="30%">
      <div class="qr-code">
        <qrcode-vue :value="currentApkName" :size="200" level="H" />
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import QrcodeVue from 'qrcode.vue'
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps } from 'element-plus'


import { appStore } from '@/store';
import { selectApkList, uploadApk, deleteApkById } from '@/api/app';
import { getStringByCode } from '@/utils/system-dict';
import type { ICreateApk, IApk } from '@/interfaces/app';
import ServiceConfig from '@/config/serviceConfig';
import { deepClone } from '@/utils/deep-clone';
import { calcCapacity } from '@/utils/storage-capacity';

const dialogVisible = ref(false);
const qrCodeDialog = ref(false);
const apkName = ref("");
const currentApkName = ref("");
const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;

const defaultValue = (): ICreateApk => {
  return {
    updateStatus: "",
    versionCode: 1,
    versionName: "",
    major: 1,
    minor: 0,
    patch: 0,
    modifyContent: "",
    apkSize: 0,
    apkMd5: "",
    file: null,
  };
}

const selectedIds = ref<Array<string>>([]);
let apkData = reactive(defaultValue());
const apkList = computed(() => appStore.appList);

const openDialogWithAdd = () => {
  dialogVisible.value = true;
  apkData = reactive(deepClone<ICreateApk>(defaultValue()))
};

const requestApkList = async () => {
  const result = await selectApkList();
  appStore.saveApkList(result.data)
}

const handleSelectionChange = (selected: Array<IApk>) => {
  selectedIds.value = selected.map((notice: IApk) => notice.id)
}

requestApkList();


const handleUpdateApk = async () => {
  console.log(apkName.value);

  if (!apkName.value.includes(".apk")) {
    ElMessage.error("文件类型错误")
    return;
  }
  const formData: any = new FormData();

  for (const [key, value] of Object.entries(apkData)) {
    formData.append(key, value)
  }

  let result = await uploadApk(formData);
  if (result.code == 200) {
    ElMessage.success(result.message)
    dialogVisible.value = false;
    requestApkList();
  } else {
    ElMessage.error(result.message)
  }
}

const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除吗?', '删除', { type: "error" })
    .then(async () => {
      const result = await deleteApkById(id);
      if (result.code == 200) {
        ElMessage.success(result.message)
        requestApkList();
      } else {
        ElMessage.error(result.message)
      }
    })
    .catch(() => { })
}

const apkVersionNameBlur = () => {
  if (checkApkVersion()) {
    const versions = apkData.versionName.split(".");
    apkData.major = parseInt(versions[0]);
    apkData.minor = parseInt(versions[1]);
    apkData.patch = parseInt(versions[2]);
  }
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  apkName.value = uploadFile.name;
  apkData.file = uploadFile.raw;
}

const handleExport = () => { }
const handleSearch = () => { }
const handleReset = () => { }

const shareQrCode = (downLoadUrl: string) => {
  currentApkName.value = baseUrl + downLoadUrl;
  qrCodeDialog.value = true;
}


const checkApkVersion = (): boolean => {
  if (!/^\d+(?:\.\d+){2}$/.test(apkData.versionName)) {
    ElMessage.error("不正确的版本号");
    return false;
  }

  const versions = apkData.versionName.split(".");
  if (versions.length > 3) {
    ElMessage.error("不正确的版本号");
    return false;
  }

  if (isNaN(parseInt(versions[0])) || isNaN(parseInt(versions[1])) || isNaN(parseInt(versions[2]))) {
    ElMessage.error("不正确的版本号");
    return false;
  }

  return true;
}

const datePickerChange = (value: any) => {
  value[1] = value[1].replace("00:00:00", "23:59:59");
}


</script>

<style lang="less" scoped>
#app-page {

  .qr-code {
    text-align: center;
  }

  ::v-deep .el-upload-list,
  .el-upload-list--text {
    width: 300px;
  }

  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>