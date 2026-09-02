<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改导出任务' : '新建导出任务'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="任务ID" name="taskId">
                            <el-input clearable :maxlength="50" v-model="form.taskId"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="任务状态：0=PROCESSING/1=SUCCESS/2=FAILED" name="status">
                            <el-input-number   v-model="form.status"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="错误消息" name="message">
                            <el-input clearable :maxlength="50" v-model="form.message"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="下载地址" name="downloadUrl">
                            <el-input clearable :maxlength="50" v-model="form.downloadUrl"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save">
                保存
            </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
    import { ref, reactive, nextTick } from "vue";
    import type { FormInstance, FormRules } from "element-plus";
    import { EleMessage } from "ele-admin-plus/es";
    import { useFormData } from "@/utils/use-form-data";
    import { addExportTask, updateExportTask } from "@/api/platform/exportTaskApi";
    import type { ExportTask } from "@/api/platform/model/exportTask";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: ExportTask | null;
    }>();

    const emit = defineEmits<{
      (e: "done"): void;
    }>();

    /** 弹窗是否打开 */
    const visible = defineModel({ type: Boolean });

    /** 是否是修改 */
    const isUpdate = ref(false);

    /** 提交状态 */
    const loading = ref(false);

    /** 表单实例 */
    const formRef = ref<FormInstance | null>(null);

    /** 表单数据 */
    const [form, resetFields, assignFields] = useFormData<ExportTask>({
          taskId: undefined,
          status: undefined,
          message: undefined,
          downloadUrl: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      taskId: [
          {
              required: true,
              type:  'string',
              message: '请输入任务ID',
              trigger: 'blur'
          }
      ],
      status: [
          {
              required: true,
              type:  'number',
              message: '请输入任务状态：0=PROCESSING/1=SUCCESS/2=FAILED',
              trigger: 'blur'
          }
      ],
      message: [
          {
              required: true,
              type:  'string',
              message: '请输入错误消息',
              trigger: 'blur'
          }
      ],
      downloadUrl: [
          {
              required: true,
              type:  'string',
              message: '请输入下载地址',
              trigger: 'blur'
          }
      ]
    });

    /** 关闭弹窗 */
    const handleCancel = () => {
      visible.value = false;
    };

    /** 保存编辑 */
    const save = () => {
      formRef.value?.validate?.((valid) => {
        if (!valid) {
          return;
        }
        loading.value = true;
        const saveOrUpdate = isUpdate.value ?updateExportTask : addExportTask;;
        saveOrUpdate(form)
          .then((msg) => {
            loading.value = false;
            EleMessage.success(msg);
            handleCancel();
            emit("done");
          })
          .catch((e) => {
            loading.value = false;
            EleMessage.error(e.message);
          });
      });
    };

    /** 弹窗打开事件 */
    const handleOpen = () => {
      if (props.data) {
        assignFields({ ...props.data });
        isUpdate.value = true;
      } else {
        resetFields();
        isUpdate.value = false;
      }
      nextTick(() => {
        nextTick(() => {
          formRef.value?.clearValidate?.();
        });
      });
    };
</script>
