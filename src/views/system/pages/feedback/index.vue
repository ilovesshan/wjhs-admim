<template>
  <div id="feedback-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">

        <el-form-item label="用户类型">
          <el-select v-model="currentUserType">
            <el-option key="1" label="小程序用户" value="1" />
            <el-option key="2" label="骑手用户" value="2" />
            <el-option key="3" label="回收中心用户" value="3" />
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
        <el-button disabled @click="openDialog" plain type="primary">新增<el-icon class="el-icon--right">
            <Plus />
          </el-icon>
        </el-button>

        <el-button disabled @click="handleUpdate(selectedIds[0])" type="success" plain>更新<el-icon
            class="el-icon--right">
            <Edit />
          </el-icon>
        </el-button>

        <el-button disabled @click="handleDelete(selectedIds[0])" type="danger" plain>删除<el-icon class="el-icon--right">
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
      <el-table :data="feedbackList" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column show-overflow-tooltip prop="feedbackTitle" label="反馈标题" width="260" />
        <el-table-column show-overflow-tooltip prop="feedbackDetail" label="反馈详情" width="300" />
        <el-table-column label="反馈状态" width="120">
          <template #default="scoped">
            <el-tag :type="scoped.row.isSolve == '37' ? 'warning' : 'success' ">{{ getStringByCode(scoped.row.isSolve) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="反馈图片" width="140">
          <template #default="scoped">
            <el-image
              :preview-teleported="true"
              v-if="scoped.row.attachment && scoped.row.attachment.url"
              style="width: 100px; height: 30px"
              :src="baseUrl + scoped.row.attachment.url"
              :zoom-rate="1.2"
              :preview-src-list="[baseUrl + scoped.row.attachment.url]"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="createTime" label="反馈时间" width="180" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scoped">
            <el-button @click="updateFeedbackStatusHandler(scoped.row.id)" link type="primary" :disabled="scoped.row.isSolve == '38'"
              size="small">标记已解决</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import { feedbackStore } from "@/store/index"
import ServiceConfig from "@/config/serviceConfig";
import { getStringByCode } from "@/utils/system-dict";
import { IFeedback } from "@/interfaces/feedback";
import { selectFeedbackListByType, updateFeedbackStatus } from "@/api/feedback";
import { ElMessage, ElMessageBox } from "element-plus";

const currentUserType = ref("1");
const selectedIds = ref<Array<string>>([]);
const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
const feedbackList = computed<Array<IFeedback>>(() => feedbackStore.feedbackList);

const getFeedbackList = async () => {
  const result = await selectFeedbackListByType(currentUserType.value);
  if (result.code == 200) {
    feedbackStore.saveRecycleGoodsList(result.data as Array<IFeedback>)
  }
}
getFeedbackList();

const handleSelectionChange = (selected: Array<any>) => {
  selectedIds.value = selected.map((notice: any) => notice.id)
}
const handleSearch = () => getFeedbackList();
const handleReset = () => {
  currentUserType.value = "1";
  getFeedbackList();
}
const openDialog = () => { }
const handleUpdate = (id: string) => { }
const handleDelete = (id: string) => { }
const handleExport = () => { }

const updateFeedbackStatusHandler = async (id: string) => {
  ElMessageBox.confirm('确定当前发反馈已经处理了吗?', '反馈处理', { type: "success" })
    .then(async () => {
      const result = await updateFeedbackStatus(id);
      if (result.code == 200) {
        getFeedbackList();
        ElMessage.success(result.message);
      } else {
        ElMessage.error(result.message)
      }
    })
    .catch(() => { })
}

</script>
<style lang="less" scoped>
#feedback-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>