<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改系统Tips' : '新建系统Tips'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="标题" prop="title">
            <el-input clearable :maxlength="50" v-model="form.title" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="Tips模版" prop="tipsConfId">
            <TipsConfSelectTable v-model="form.tipsConfId" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="状态" prop="state">
            <el-radio-group v-model="form.state">
              <el-radio :value="true">启用</el-radio>
              <el-radio :value="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="间隔分钟" prop="timeLen">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.timeLen" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="总次数" prop="totalCount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.totalCount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="生效时间">
            <el-date-picker v-model="form.time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" style="width: 100%" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { TipsRun } from '@/api/config/model/tipsRun';
  import { addTipsRun, updateTipsRun } from '@/api/config/tipsRunApi';
  import { toDateZone } from '@/utils/utils';
  import TipsConfSelectTable from './tips-conf-select-table.vue';
  import { useConfigStore } from '@/store/modules/config';

  const configStore = useConfigStore();

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: TipsRun | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
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
  const [form, resetFields, assignFields] = useFormData<TipsRun>({
    id: undefined,
    title: undefined,
    tipsConfId: undefined,
    startDate: undefined,
    endDate: undefined,
    countryCode: undefined,
    totalCount: undefined,
    sendCount: undefined,
    nextTime: undefined,
    state: false,
    timeLen: undefined,
    time: undefined as string[] | undefined
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    id: [
      {
        required: true,
        type: 'number',
        message: '请输入id',
        trigger: 'blur'
      }
    ],
    title: [
      {
        required: true,
        type: 'string',
        message: '请输入标题',
        trigger: 'blur'
      }
    ],
    tipsConfId: [
      {
        required: true,
        type: 'number',
        message: '请输入配置ID',
        trigger: 'blur'
      }
    ],
    startDate: [
      {
        required: true,
        type: 'string',
        message: '请输入开始时间',
        trigger: 'blur'
      }
    ],
    endDate: [
      {
        required: true,
        type: 'string',
        message: '请输入结束时间',
        trigger: 'blur'
      }
    ],
    totalCount: [
      {
        required: true,
        type: 'number',
        message: '请输入显示总数',
        trigger: 'blur'
      }
    ],
    sendCount: [
      {
        required: true,
        type: 'number',
        message: '请输入显示次数',
        trigger: 'blur'
      }
    ],
    nextTime: [
      {
        required: true,
        type: 'number',
        message: '请输入下次时间',
        trigger: 'blur'
      }
    ],
    state: [
      {
        required: true,
        type: 'boolean',
        message: '请输入状态',
        trigger: 'change'
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
      const [startTime, endTime] = (form.time as string[]) || [];
      // 如果time中的值不是ISO格式，转换为ISO格式
      if (startTime && !startTime.includes('T')) {
        form.startDate = new Date(startTime).toISOString();
      } else {
        form.startDate = startTime;
      }

      if (endTime && !endTime.includes('T')) {
        form.endDate = new Date(endTime).toISOString();
      } else {
        form.endDate = endTime;
      }
      const saveOrUpdate = isUpdate.value ? updateTipsRun : addTipsRun;
      saveOrUpdate(form)
        .then((msg) => {
          loading.value = false;
          EleMessage.success(msg);
          handleCancel();
          emit('done');
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
      form.time = [toDateZone(props.data.startDate), toDateZone(props.data.endDate)];
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
