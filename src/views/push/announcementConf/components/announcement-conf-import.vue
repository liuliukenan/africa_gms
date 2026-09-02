<template>
  <ele-modal :width="520" title="导入导出" v-model="visible" @open="handleOpen">
    <el-form @submit.prevent="">
      <el-row :gutter="16">
        <el-col :lg="24" :md="24" :sm="24" :xs="24">
          <el-popconfirm :title="`确认导出跑马灯模板表吗？`" @confirm="doExcelExport()" width='240px'>
            <template #reference>
              <el-button type="warning">导出</el-button>
            </template>
          </el-popconfirm>
        </el-col>
      </el-row>
    </el-form>
    <ele-upload-list :limit="1" :drag="true" :tools="true" :sortable="false" accept=".xls,.xlsx"
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
import { ref, nextTick } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { EleMessage } from 'ele-admin-plus/es';
import { handleDownload } from '@/utils/file-util';
import { exportExcel, importExcel } from '@/api/push/announcementConfApi';
const emit = defineEmits<{ (e: 'done'): void; }>();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 上传事件 */
const handleUpload = (_: number, data: any) => {
  if (!data || !data.file) {
    EleMessage.error('请选择文件');
    return;
  }
  const formData = new FormData();
  formData.append('file', data.file);
  importExcel(formData)
    .then((message) => {
      EleMessage.success(message);
      handleCancel();
      emit('done');
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};

// 导出Excel
const doExcelExport = () => {
  exportExcel().then((res) => {
    handleDownload('跑马灯模板表', res.data as any);
  });
};

/** 弹窗打开事件 */
const handleOpen = () => { };
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
</script>