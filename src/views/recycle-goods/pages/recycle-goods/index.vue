<template>
  <div id="recycle-goods-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">
        <el-form-item label="用户类型">
          <el-select v-model="currentGoodsType">
            <div v-for="goodsType in goodsTypeList" :key="goodsType.id">
              <el-option :label="goodsType.name" :value="goodsType.id" v-if="goodsType.status == '33'" />
            </div>
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
    <div id="recycle-goods-page">
      <el-card shadow="never">
        <el-table :data="goodsList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" />
          <el-table-column prop="name" label="商品名称" width="180" align="center" />
          <el-table-column label="商品图片" width="220">
            <template #default="scoped">
              <el-image :preview-teleported="true" style="width: 200px; height: 50px"
                :src="baseUrl + scoped.row.attachment.url" :preview-src-list="[baseUrl + scoped.row.attachment.url]"
                fit="cover" />
            </template>
          </el-table-column>
          <el-table-column prop="status" show-overflow-tooltip label="状态" width="100" align="center">
            <template #default="scope">
              <el-tag :type="scope.row.status == '33' ? 'success' : 'danger'">{{ getStringByCode(scope.row.status)
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="integral" label="兑换积分" width="120" align="center" />
          <el-table-column prop="userPrice" label="用户价格" width="120" align="center" />
          <el-table-column prop="driverPrice" label="骑手价格" width="120" align="center" />
          <el-table-column prop="recycleCenterPrice" label="回收中心" width="120" align="center" />
          <el-table-column prop="describe" show-overflow-tooltip label="商品描述" width="400" />
          <el-table-column prop="createTime" label="创建时间" width="240" />
          <el-table-column fixed="right" label="操作" width="280">
            <template #default="scope">
              <el-button @click="openDialogWithUpdate(scope.row.id)" link type="primary" size="small">更新</el-button>
              <el-button @click="handleShelves(scope.row)" link :type="scope.row.status == '33'? 'warning' : 'success' "  size="small">{{ scope.row.status == "33"    ? "下架" : "上架" }}</el-button>
              <el-button @click="handleDelete(scope.row.id)" link type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 新增弹框 -->
    <el-dialog v-model="dialogVisible" title="新增回收商品分类" width="30%">
      <el-form :model="insertOrUpdateRecycleGoodData" label-width="120px" label-position="left">
        <el-form-item label="商品名称">
          <el-input v-model="insertOrUpdateRecycleGoodData.name" />
        </el-form-item>

        <el-form-item label="商品类型">
          <el-select v-model="insertOrUpdateRecycleGoodData.typeId">
            <div v-for="goodsType in goodsTypeList" :key="goodsType.id">
              <el-option :label="goodsType.name" :value="goodsType.id" v-if="goodsType.status == '33'" />
            </div>
          </el-select>
        </el-form-item>

        <el-form-item label="兑换积分">
          <el-input v-model="insertOrUpdateRecycleGoodData.integral" />
        </el-form-item>

        <el-form-item label="用户价格">
          <el-input v-model="insertOrUpdateRecycleGoodData.userPrice" />
        </el-form-item>

        <el-form-item label="骑手价格">
          <el-input v-model="insertOrUpdateRecycleGoodData.driverPrice" />
        </el-form-item>

        <el-form-item label="回收中心价格">
          <el-input v-model="insertOrUpdateRecycleGoodData.recycleCenterPrice" />
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload style="width:200px; height:80px; border: 1px solid #dcdfe6; line-height: 80px; text-align: center;"
            :action="baseUrl + '/attachments'" :headers="uploadHeader" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" width="200" height="80" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input v-model="insertOrUpdateRecycleGoodData.describe" type="textarea" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleInsertOrUpdateRecycleGood"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import type { UploadProps } from 'element-plus'
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import { recycleGoodsStore } from "@/store/index"
import { getStringByCode } from "@/utils/system-dict"
import ServiceConfig from "@/config/serviceConfig";
import { deleteRecycleGoods, insertRecycleGoods, selectRecycleGoodsById, selectRecycleGoodsByType, selectRecycleGoodsType, updateRecycleGoods } from "@/api/recycle-goods";
import { IInsertOrUpdateRecycleGoods, IRecycleGoods, IRecycleGoodsType } from "@/store/modules/recycle-goods";
import { deepClone } from "@/utils/deep-clone";
import { SCache } from "@/utils/cache";

const dialogVisible = ref(false);
const currentGoodsType = ref("585453a37a1845f48b2cdc697b763734");
const selectedIds = ref<Array<string>>([]);
const imageUrl = ref<string>("");
const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
const goodsList = computed(() => recycleGoodsStore.goodsList);
const goodsTypeList = computed(() => recycleGoodsStore.goodsTypeList);
const uploadHeader = {
  Authorization: "Bearer " + SCache.get("token"),
}

const defaultInsertRecycleGoodData = (): IInsertOrUpdateRecycleGoods => {
  return {
    "id": "",
    "name": "",
    "typeId": "",
    "integral": "",
    "userPrice": "",
    "driverPrice": "",
    "recycleCenterPrice": "",
    "attachmentId": "",
    "describe": "",
  }
}

let insertOrUpdateRecycleGoodData = reactive(defaultInsertRecycleGoodData());

const requestRecycleGoodsType = async () => {
  const goodsTypeList = await selectRecycleGoodsType();
  recycleGoodsStore.saveGoodsTypeList(goodsTypeList.data as Array<IRecycleGoodsType>);
  currentGoodsType.value = goodsTypeList.data[0].id;
  requestRecycleGoodsList(currentGoodsType.value);
}
const requestRecycleGoodsList = async (typeId: string) => {
  const result = await selectRecycleGoodsByType(typeId);
  recycleGoodsStore.saveGoodsList(result.data as Array<IRecycleGoods>);
}

requestRecycleGoodsType();

const handleSelectionChange = (selected: Array<any>) => {
  selectedIds.value = selected.map((notice: any) => notice.id)
}
const handleSearch = () => requestRecycleGoodsList(currentGoodsType.value);
const handleInsertOrUpdateRecycleGood = async () => {
  let result = null;
  if (insertOrUpdateRecycleGoodData.id) {
    // 更新
    result = await updateRecycleGoods(insertOrUpdateRecycleGoodData);
  } else {
    result = await insertRecycleGoods(insertOrUpdateRecycleGoodData);
  }
  if (result.code == 200) {
    ElMessage.success(result.message)
    dialogVisible.value = false;
    imageUrl.value = "";
    requestRecycleGoodsList(currentGoodsType.value);
  } else {
    ElMessage.error(result.message)
  }
}

const openDialogWithAdd = () => {
  dialogVisible.value = true;
  insertOrUpdateRecycleGoodData = reactive(deepClone<IInsertOrUpdateRecycleGoods>(defaultInsertRecycleGoodData()));
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  insertOrUpdateRecycleGoodData.attachmentId = response.data.id;
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

const handleReset = () => { }

const openDialogWithUpdate = async (id: string) => {
  const result = await selectRecycleGoodsById(id);
  imageUrl.value = baseUrl + result.data.attachment.url;
  dialogVisible.value = true;
  insertOrUpdateRecycleGoodData = reactive<IInsertOrUpdateRecycleGoods>(result.data);
}

const handleShelves = async (row: any) => {
  if (row.status == "33") {
    row.status = "34"
  } else {
    row.status = "33"
  }
  const result = await updateRecycleGoods(row);
  if (result.code == 200) {
    ElMessage.success(result.message)
    requestRecycleGoodsList(currentGoodsType.value);
  } else {
    ElMessage.error(result.message)
  }
}
const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除吗?', '删除', { type: "error" })
    .then(async () => {
      const result = await deleteRecycleGoods(id);
      if (result.code == 200) {
        ElMessage.success(result.message)
        requestRecycleGoodsList(currentGoodsType.value);
      } else {
        ElMessage.error(result.message)
      }
    })
    .catch(() => { })
}
const handleExport = () => { }


</script>
<style lang="less" scoped>
#recycle-goods-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>