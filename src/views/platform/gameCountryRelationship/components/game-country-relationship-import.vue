<template>
  <ele-modal :width="520" title="导入导出" v-model="visible" @open="handleOpen">
    <el-form @submit.prevent="">
      <!-- <el-form @keyup.enter="search" @submit.prevent=""> -->
      <el-row :gutter="16">
        <el-col :lg="16" :md="16" :sm="16" :xs="12">
          <el-form-item label="国家">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="8" :xs="12">
          <el-popconfirm :title="`确认导出 ${getCountryName()} 的游戏国家关系表吗？`" @confirm="doExcelExport()" width='240px'>
            <template #reference>
              <el-button type="warning">导出</el-button>
            </template>
          </el-popconfirm>
        </el-col>
      </el-row>
    </el-form>
    <ele-upload-list :limit="1" :drag="true" :tools="true" :sortable="false" v-model="file" accept=".xls,.xlsx"
      :button-style="{ width: '100%', height: '200px' }" @upload="(item) => handleUpload(0, item)">
      <template #icon>
        <div style="line-height: 1">
          <el-icon class="ele-upload-icon" :size="90" color="#a8abb2">
            <upload-filled />
          </el-icon>
          <div style="color: #999; margin-top: 4px; font-size: 18px">请点击上传</div>
        </div>
      </template>
    </ele-upload-list>
    <div>
      <div style="color: #a8abb2; margin: 10px 0 0; text-align: center"> 只能上传xls、xlsx文件</div>
    </div>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { CloudUploadOutlined } from '@ant-design/icons-vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { EleMessage } from 'ele-admin-plus/es';
import { handleDownload } from '@/utils/file-util';
import { exportExcel, importExcel } from '@/api/platform/gameCountryRelationshipApi';
import { useConfigStore } from "@/store/modules/config"; // 导入store
import { GameCountryRelationshipParam } from '@/api/platform/model/gameCountryRelationship';
import { useFormData } from '@/utils/use-form-data';
// 初始化store
const configStore = useConfigStore();
const emit = defineEmits<{
  (e: 'done'): void;
}>();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const [form] = useFormData<GameCountryRelationshipParam>({
  countryCode: configStore.countryArr?.[0]?.code || '',
});
let file = ref<any>();
const getCountryName = () => {
  return configStore.countryArr?.find((item) => item.code == form.countryCode)?.name || '';
}
/** 上传事件 */
const handleUpload = (_: number, data: any) => {
  if (!data.file) {
    EleMessage.error('请选择文件');
    return;
  }
  const formData = new FormData();
  formData.append('file', data.file);
  importExcel(formData)
    .then((message) => {
      EleMessage.success(message);
      handleCancel();
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};

// 导出Excel
const doExcelExport = () => {
  exportExcel(form.countryCode || '').then((res) => {
    handleDownload('游戏国家关系表', res.data as any);
  });
};

/** 弹窗打开事件 */
const handleOpen = () => { };
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
</script>

