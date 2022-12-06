<template>
  <div id="common-header">
    <!-- 查询条件、操作按钮 -->
    <div class="conditions-container">
      <el-card shadow="never">

        <!-- 搜索条件框 -->
        <el-row :gutter="20" class="condition-input-container">
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input placeholder="标题关键字" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="详情">
              <el-input placeholder="详情关键字" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-date-picker format="YYYY-MM-DD" type="daterange" range-separator="到"
                value-format="YYYY-MM-DD HH:mm:ss" @change="datePickerChange" start-placeholder="开始日期"
                end-placeholder="结束日期" />
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
          <el-button @click="handleInsert" plain type="success">新增 <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>

          <el-button @click="handleUpdate" type="danger" :disabled="(selectedIds.length != 1)" plain>修改<el-icon
              class="el-icon--right">
              <Edit />
            </el-icon>
          </el-button>

          <el-button @click="handleDelete" type="danger" :disabled="(selectedIds.length < 1)" plain>删除<el-icon
              class="el-icon--right">
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
  </div>
</template>

<script lang="ts" setup>
import { toRefs, withDefaults } from "vue";
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'

interface IProps {
  selectedIds: Array<string>,
}

const emits = defineEmits(['handleInsert', 'handleUpdate', 'handleDelete', 'handleExport']);
const props = withDefaults(defineProps<IProps>(), {
  selectedIds: () => [],
})

const { selectedIds } = toRefs(props);

const datePickerChange = (value: any) => {
  if (value[0] === value[1]) {
    value[1] = value[1].replace("00:00:00", "23:59:59");
  }
}

const handleSearch = () => { }
const handleReset = () => { }

const handleInsert = () => emits("handleInsert")
const handleUpdate = () => emits("handleUpdate")
const handleDelete = () => emits("handleDelete")
const handleExport = () => emits("handleExport")

</script>

<style lang="scss" scoped>
.conditions-container {
  margin-top: 5px;
  margin-bottom: 20px;

  .condition-input-container {
    ::v-deep .el-form-item__label {
      font-weight: 600;
    }
  }

  .search-and-reset-container {
    margin-bottom: 20px;

  }
}
</style>