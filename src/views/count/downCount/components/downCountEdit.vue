<!-- 用户编辑弹窗 -->
<template>
  <ele-modal
    :width="680"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate ? '修改下载统计' : '新建下载统计'"
    :body-style="{ paddingBottom: '5px' }"
    @update:visible="updateVisible"
    @ok="save"
  >
    <el-form ref="formRef" :model="form" :rules="rules" :label-col="{ md: 7, sm: 4, xs: 24 }" :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="id" name="id">
              <el-input-number v-model.trim="form.id"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="时间" name="daykey">
              <el-input-number v-model.trim="form.daykey"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="web" name="webNum">
              <el-input-number v-model.trim="form.webNum"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="下载" name="downNum">
              <el-input-number v-model.trim="form.downNum"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
    </el-form>
  </ele-modal>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addDownCount, updateDownCount} from '@/api/count/downCount.js';

  const emit = defineEmits(['done', 'update:visible']);

  const props = defineProps({
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object
  });

  //
  const formRef = ref(null);

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  // 表单数据
  const { form, resetFields, assignFields } = useFormData({
       id: undefined,
       daykey: undefined,
       webNum: undefined,
       downNum: undefined,
  });

  // 表单验证规则
  const rules = reactive({
      id: [
          {
              required: true,
              type:  'number',
              message: '请输入id',
              trigger: 'blur'
          }
      ],
      daykey: [
          {
              required: true,
              type:  'number',
              message: '请输入时间',
              trigger: 'blur'
          }
      ],
      webNum: [
          {
              required: true,
              type:  'number',
              message: '请输入web',
              trigger: 'blur'
          }
      ],
      downNum: [
          {
              required: true,
              type:  'number',
              message: '请输入下载',
              trigger: 'blur'
          }
      ]
  });

  /* 保存编辑 */
  const save = () => {
    if (!formRef.value) {
      return;
    }
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        const saveOrUpdate = isUpdate.value ? updateDownCount : addDownCount;
        saveOrUpdate(form)
          .then((msg) => {
            loading.value = false;
            message.success(msg);
            updateVisible(false);
            emit('done');
          })
          .catch((e) => {
            loading.value = false;
            message.error(e.message);
          });
      })
      .catch(() => {});
  };

  /* 更新visible */
  const updateVisible = (value) => {
    emit('update:visible', value);
  };

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        if (props.data) {
          assignFields({
            ...props.data,
            password: ''
          });
          isUpdate.value = true;
        } else {
          isUpdate.value = false;
        }
      } else {
        resetFields();
        formRef.value?.clearValidate();
      }
    }
  );
</script>
