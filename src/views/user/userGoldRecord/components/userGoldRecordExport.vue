<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="680" v-model="visible" :confirm-loading="loading" title="导出" @open="handleOpen"
    :body-style="{ paddingBottom: '5px' }">
    <el-form ref="formRef" :model="form" :label-col="{ md: 7, sm: 4, xs: 24 }"
      :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="" name="note">
            <el-radio-group v-model="form.type" @change=selectNum>
              <el-radio-button :value="1">1万</el-radio-button>
              <el-radio-button :value="3">3万</el-radio-button>
              <el-radio-button :value="5">5万</el-radio-button>
              <el-radio-button :value="10">10万</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in dataList" :key="index" style="margin-bottom: 10px;">
        <el-col :md="12" :sm="12" :xs="12">{{ item }}</el-col>
        <el-col :md="12" :sm="12" :xs="12" style="text-align: right;">
          <el-popconfirm title="确定要导出该部分数据吗?" @confirm="getNumData(index + 1)" width="250px">
            <template #reference>
              <el-button>导出</el-button>
            </template>
          </el-popconfirm>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel" type="primary">取消</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { exportExcelGoldRecord } from '@/api/user/userGoldRecord'
// import { UserGoldRecord } from '@/api/model/userGoldRecord';
import { handleDownload } from '@/utils/file-util';
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

const props = defineProps<{
  // 修改回显的数据
  data: any;
  total: number
}>();

const formRef = ref<FormInstance | null>(null);

// 提交状态
const loading = ref(false);
// 默认选中 1 万
const form = ref({ type: 1 });
// 动态生成的列表
const dataList = ref<string[]>([]);
// 基础步长单位
const baseStep = ref(10000)
// 生产数据列表
const generateList = (type: number) => {
  // 根据按钮值计算单位步长
  const unit = type * baseStep.value;
  // 根据单位步长计算需要展示的条目数
  const count = Math.ceil(props.total / unit);
  const list: string[] = [];
  for (let i = 0; i < count; i++) {
    const start = i * unit / baseStep.value;
    const end = (i + 1) * unit / baseStep.value;
    list.push(`${start}w~${end}w之间的数据`);
  }

  dataList.value = list; // 更新动态列表
};
// 切换按钮时触发
const selectNum = (type: number) => {
  generateList(type);
};
// 导出对应按钮的数据
const getNumData = async (val: number) => {
  const unitPage = form.value.type * baseStep.value; // 根据按钮值计算单位步长
  let where = { ...props.data, limit: unitPage, page: val }
  let res = await exportExcelGoldRecord(where)
  handleDownload('金币记录', res.data as any);
}
/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.data) {
   // 初始化时生成默认列表
   generateList(form.value.type);
  }
};
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
</script>