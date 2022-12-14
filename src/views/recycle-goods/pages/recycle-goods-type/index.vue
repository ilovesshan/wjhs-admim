<template>
  <div id="recycle-goods-type-page">

    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">
        <el-form-item label="标题" prop="">
          <el-input placeholder="标题关键字" clearable />
        </el-form-item>

        <el-form-item label="描述" prop="">
          <el-input placeholder="描述关键字" clearable />
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
        <el-button @click="openDialog" plain type="primary">新增<el-icon class="el-icon--right">
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

    <!-- 表格区域 -->
    <el-card shadow="never">
      <el-table :data="goodsTypes" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" show-overflow-tooltip label="分类名称" width="160" />
        <el-table-column prop="status" show-overflow-tooltip label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status == '33' ? 'success' : 'danger' ">{{ getStringByCode(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="describe" show-overflow-tooltip label="描述" width="600" />
        <el-table-column prop="createTime" label="创建时间" width="240" />
        <el-table-column fixed="right" label="操作" width="280">
          <template #default="scope">
            <el-button @click="handleUpdate(scope.row.id)" link type="primary" size="small">更新</el-button>
            <el-button @click="handleShelves(scope.row)" link type="warning" size="small">{{ scope.row.status == "33" ? "下架" : "上架"}}</el-button>
            <el-button @click="handleDelete(scope.row.id)" link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增弹框 -->
    <el-dialog v-model="dialogVisible" title="新增回收商品分类" width="30%">
      <el-form :model="insertRecycleGoodTypeData" label-width="80px" label-position="left">
        <el-form-item label="分类名称">
          <el-input v-model="insertRecycleGoodTypeData.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="insertRecycleGoodTypeData.describe" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleInsertRecycleGoodType"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from "element-plus";


import { recycleGoodsStore } from '@/store';
import { deleteRecycleGoodsType, insertRecycleGoodsType, selectRecycleGoodsType, updateRecycleGoodsType} from '@/api/recycle-goods';

import type { IRecycleGoodsType } from '@/store/modules/recycle-goods';
import { getStringByCode } from '@/utils/system-dict';

const dialogVisible = ref(false);
const insertRecycleGoodTypeData = reactive({
  name: "",
  describe: ""
});
const selectedIds = ref<Array<string>>([]);
const goodsTypes = computed(() => recycleGoodsStore.goodsTypeList);

const openDialog = () => dialogVisible.value = true;

const requestRecycleGoodsType = async () => {
  const result = await selectRecycleGoodsType();
  recycleGoodsStore.saveGoodsTypeList(result.data)
}

const handleSelectionChange = (selected: Array<IRecycleGoodsType>) => {
  selectedIds.value = selected.map((notice: IRecycleGoodsType) => notice.id)
}

requestRecycleGoodsType();

const handleInsertRecycleGoodType = async () => {
  const result = await insertRecycleGoodsType(insertRecycleGoodTypeData);
  if (result.code == 200) {
    ElMessage.success(result.message)
    dialogVisible.value = false;
    requestRecycleGoodsType();
  } else {
    ElMessage.error(result.message)
  }
}

const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除吗?', '删除', { type: "error" })
    .then(async () => {
      const result = await deleteRecycleGoodsType(id);
      if (result.code == 200) {
        ElMessage.success(result.message)
        requestRecycleGoodsType();
      } else {
        ElMessage.error(result.message)
      }
    })
    .catch(() => { })
}

const handleShelves = async (row: any) => {
  if (row.status == "33") {
    row.status = "34"
  } else {
    row.status = "33"
  }
  const result = await updateRecycleGoodsType(row);
  if (result.code == 200) {
    ElMessage.success(result.message)
    requestRecycleGoodsType();
  } else {
    ElMessage.error(result.message)
  }
}
const handleUpdate = (id: string) => { }
const handleExport = () => { }
const handleSearch = () => { }
const handleReset = () => { }


const datePickerChange = (value: any) => {
  value[1] = value[1].replace("00:00:00", "23:59:59");
}


</script>

<style lang="less" scoped>
#recycle-goods-type-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>