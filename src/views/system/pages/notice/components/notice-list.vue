<template>
  <div id="notice-list-container">
    <!-- 操作栏 -->
    <el-card shadow="never">

      <!-- 搜索条件框 -->
      <el-form :inline="true" label-width="68px" label-position="left">

        <el-form-item label="标题">
          <el-input v-model="selectedConditions.title" placeholder="标题关键字" />
        </el-form-item>

        <el-form-item label="详情">
          <el-input v-model="selectedConditions.detail" placeholder="详情关键字" />
        </el-form-item>

        <el-form-item label="创建时间">
          <el-date-picker v-model="selectedConditions.tempTime" format="YYYY-MM-DD" type="daterange" range-separator="到"
            value-format="YYYY-MM-DD HH:mm:ss" @change="datePickerChange" start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>

        <!-- 搜索、重置 按钮-->
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

    <!-- 表格数据 -->
    <el-card shadow="never">
      <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" show-overflow-tooltip label="标题" width="240" />
        <el-table-column prop="subTitle" show-overflow-tooltip label="子标题" width="600" />
        <el-table-column prop="link" show-overflow-tooltip label="跳转链接" width="240">
          <template #default="scope">
            <el-link :href="scope.row.link" target="_blank">{{ scope.row.link }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="240" />
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button @click="handleUpdate(scope.row.id)" link type="primary" size="small">更新</el-button>
            <el-button @click="handleDelete(scope.row.id)" link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

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
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import type { INotice, INoticeSelect, INoticeCreateOrUpdate } from "../type"
import { noticeStore } from "../../../../../store";
import { deepClone } from "../../../../../utils/deep-clone"
import { noticeGetById, noticeUpdate, noticeInsert, noticeDelete } from "../../../../../api/notice";

//子组件接收父组件数据
const props = defineProps({
  list: Array<INotice>,
  currentIndex: {
    required: true,
    type: Number
  },
});
const { list, currentIndex } = toRefs(props);

const selectedIds = ref<Array<string>>([]);
const dialogVisible = ref<boolean>(false);

const handleSelectionChange = (selected: Array<INotice>) => {
  selectedIds.value = selected.map((notice: INotice) => notice.id)
}

// 默认的查询条件
const defaultSelectConditions: INoticeSelect = {
  type: currentIndex.value,
  title: "",
  detail: "",
  tempTime: "",
  beginTime: "",
  endTime: "",
}

// 新增或者更新的数据
const defaultCreateOrUpdateDate: INoticeCreateOrUpdate = {
  id: "",
  type: currentIndex.value,
  title: "",
  subTitle: "",
  detail: "",
  link: "",
}


const selectedConditions = reactive(deepClone<INoticeSelect>(defaultSelectConditions));
let createOrUpdateData = reactive(deepClone<INoticeCreateOrUpdate>(defaultCreateOrUpdateDate));

// 搜索
const handleSearch = () => {
  const requestData = deepClone<INoticeSelect>(selectedConditions);
  delete requestData["tempTime"]
  noticeStore.requestNotice(requestData)
};

// 重置
const handleReset = () => {
  Object.assign(selectedConditions, deepClone<INoticeSelect>(defaultSelectConditions));
  handleSearch();
};


// 新增(弹框)
const handleInsert = () => {
  createOrUpdateData = reactive(deepClone<INoticeCreateOrUpdate>(defaultCreateOrUpdateDate));
  dialogVisible.value = true
};


// 更新(弹框)
const handleUpdate = async (id: string) => {
  const result = await noticeGetById(id);
  createOrUpdateData = reactive(result.data);
  dialogVisible.value = true;
}


// 删除
const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除吗?', '删除', { type: "error" })
    .then(async () => {
      const result = await noticeDelete(id);
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
    result = await noticeUpdate(createOrUpdateData);
  } else {
    // 新增
    result = await noticeInsert(createOrUpdateData);
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
  // if (value[0] === value[1]) {
  //   value[1] = value[1].replace("00:00:00", "23:59:59");
  // }
  value[1] = value[1].replace("00:00:00", "23:59:59");
  selectedConditions.beginTime = value[0];
  selectedConditions.endTime = value[1];
}

</script>

<style lang="less" scoped>
#notice-list-container {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>