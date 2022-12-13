<template>
  <div id="swiper-list-container">
    <!-- 头部 -->
    <div class="conditions-container">
      <el-card shadow="never">

        <!-- 搜索条件框 -->
        <el-row :gutter="20" class="condition-input-container">
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input v-model="selectedConditions.title" placeholder="标题关键字" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-date-picker v-model="selectedConditions.tempTime" format="YYYY-MM-DD" type="daterange"
                range-separator="到" value-format="YYYY-MM-DD HH:mm:ss" @change="datePickerChange"
                start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 搜索、重置 按钮-->
        <el-row class="search-and-reset-container">
          <el-button @click="handleSearch" type="primary">搜索 <el-icon class="el-icon--right">
              <Search />
            </el-icon>
          </el-button>

          <el-button @click="handleReset">重置 <el-icon class="el-icon--right">
              <RefreshRight />
            </el-icon>
          </el-button>
        </el-row>

        <!-- 新增 、修改、删除、导出 按钮-->
        <el-row>
          <el-button @click="handleInsert" plain type="primary">新增 <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>

          <el-button @click="handleUpdate(selectedIds[0])" type="success" :disabled="(selectedIds.length != 1)"
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
    </div>

    <!-- 表格数据 -->
    <div id="notice-list-container">
      <el-card shadow="never">
        <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" />
          <el-table-column prop="title" show-overflow-tooltip label="标题" width="240" />
          <el-table-column prop="link" show-overflow-tooltip label="图片" width="240">
            <template #default="scope">
              <el-image :preview-teleported="true" style="width: 200px; height: 50px" :src="scope.row.attachment.url"
                :preview-src-list="[scope.row.attachment.url]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="link" show-overflow-tooltip label="跳转链接" width="240">
            <template #default="scope">
              <el-link :href="scope.row.link" target="_blank">{{ scope.row.link }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="240" align="center" />
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button @click="handleUpdate(scope.row.id)" link type="primary" size="small">更新</el-button>
              <el-button @click="handleDelete(scope.row.id)" link type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="新增/更新" width="30%" :before-close="() => dialogVisible = false">
    <el-form label-position="left" :model="createOrUpdateData" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="createOrUpdateData.title" />
      </el-form-item>
      <el-form-item label="子标题">
        <el-input type="textarea" :rows="4" v-model="createOrUpdateData.subTitle" />
      </el-form-item>
      <el-form-item label="详情信息">
        <el-input type="textarea" :rows="2" v-model="createOrUpdateData.detail" />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload style="width:200px; height:80px; border: 1px solid #dcdfe6; line-height: 80px; text-align: center;"
          :action="baseUrl + '/attachments'" :headers="uploadHeader" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" width="200" height="80" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input v-model="createOrUpdateData.link" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleCreateOrUpdate">确定</el-button>
        <el-button @click="() => dialogVisible = false"> 取消</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>

import { toRefs, ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps } from 'element-plus'
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue';

import type { ISwiper, ISwiperSelect, ISwiperCreateOrUpdate } from "../type"

import { swiperStore } from "../../../../../store";
import { deepClone } from "../../../../../utils/deep-clone"
import { swiperGetById, swiperUpdate, swiperInsert, swiperDelete } from "../../../../../api/swiper";
import ServiceConfig from "../../../../../config/serviceConfig";
import { SCache } from "../../../../../utils/cache";


//子组件接收父组件数据
const props = defineProps({
  list: Array<ISwiper>,
  currentIndex: {
    required: true,
    type: Number
  },
});
const { list, currentIndex } = toRefs(props);

const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;

const uploadHeader = {
  Authorization: "Bearer " + SCache.get("token"),
}


const selectedIds = ref<Array<string>>([]);
const dialogVisible = ref<boolean>(false);
const imageUrl = ref<string>("");

const handleSelectionChange = (selected: Array<ISwiper>) => {
  selectedIds.value = selected.map((swiper: ISwiper) => swiper.id)
}

// 默认的查询条件
const defaultSelectConditions: ISwiperSelect = {
  type: currentIndex.value,
  title: "",
  tempTime: "",
  beginTime: "",
  endTime: "",
}

// 新增或者更新的数据
const defaultCreateOrUpdateDate: ISwiperCreateOrUpdate = {
  id: "",
  attachmentId: "",
  type: currentIndex.value,
  title: "",
  subTitle: "",
  detail: "",
  link: "",
  attachment: {},
}


const selectedConditions = reactive(deepClone<ISwiperSelect>(defaultSelectConditions));
let createOrUpdateData = reactive(deepClone<ISwiperCreateOrUpdate>(defaultCreateOrUpdateDate));

// 搜索
const handleSearch = () => {
  const requestData = deepClone<ISwiperSelect>(selectedConditions);
  delete requestData["tempTime"]
  swiperStore.requestSwiper(requestData)
};

// 重置
const handleReset = () => {
  Object.assign(selectedConditions, deepClone<ISwiperSelect>(defaultSelectConditions));
  handleSearch();
};


// 新增(弹框)
const handleInsert = () => {
  createOrUpdateData = reactive(deepClone<ISwiperCreateOrUpdate>(defaultCreateOrUpdateDate));
  imageUrl.value = "";
  dialogVisible.value = true
};


// 更新(弹框)
const handleUpdate = async (id: string) => {
  const result = await swiperGetById(id);
  createOrUpdateData = reactive(result.data);
  imageUrl.value = (baseUrl + createOrUpdateData.attachment?.url + '?t=' + new Date().getTime())
  dialogVisible.value = true;
}


// 删除
const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除吗?', '删除', { type: "error" })
    .then(async () => {
      const result = await swiperDelete(id);
      const { code, message } = result
      if (code == 200) {
        ElMessage({ type: "success", message });
        handleSearch();
      } else {
        ElMessage({ type: "success", message });
      }
    })
    .catch(() => { })
}

// 导出
const handleExport = () => ElMessage({ type: "warning", message: "功能开发中..." })

// 新增或者更新
const handleCreateOrUpdate = async () => {
  let result = null;
  if (createOrUpdateData.id) {
    // 更新
    result = await swiperUpdate(createOrUpdateData);
  } else {
    // 新增
    result = await swiperInsert(createOrUpdateData);
  }

  const { code, message } = result
  if (code == 200) {
    dialogVisible.value = false;
    ElMessage({ type: "success", message });
    handleSearch();
  } else {
    ElMessage({ type: "success", message });
  }
}

const datePickerChange = (value: any) => {
  value[1] = value[1].replace("00:00:00", "23:59:59");
  selectedConditions.beginTime = value[0];
  selectedConditions.endTime = value[1];
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  createOrUpdateData.attachment!.url = response.data.url;
  createOrUpdateData.attachmentId = response.data.id;
  imageUrl.value = baseUrl + response.data.url;
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isJPG = rawFile.type === 'image/jpeg' || 'image/png';
  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG、JPEG、PNG 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('上传图片大小不能超过 5MB!')
    return false
  }
  return true
}

</script>

<style lang="less" scoped>
#swiper-list-container {}
</style>