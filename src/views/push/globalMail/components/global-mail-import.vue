<template>
  <ele-modal :width="520" title="导入Excel" v-model="visible" @open="handleOpen">
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
import { uploadGlobalMailAssignUsers } from "@/api/platform/globalMailAssignUserApi";
const props = defineProps<{
  /** 修改回显的数据 */
  data?: any | null;
}>();

const emit = defineEmits<{
  (e: 'done'): void;
}>();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

let file = ref<any>();
/** 上传事件 */
const handleUpload = (_: number, data: any) => {
  if (!data.file) {
    EleMessage.error('请选择文件');
    return;
  }
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('mid', props.data.id);
  console.log(formData);
  uploadGlobalMailAssignUsers(formData)
    .then((message) => {
      EleMessage.success(message);
      handleCancel();
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};
/** 弹窗打开事件 */
const handleOpen = () => { };
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
</script>
