<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改跳马灯配置' : '新建跳马灯配置'" @open="handleOpen" :destroy-on-close="true">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="跑马灯模版" prop="announcementConfId">
            <AnnouncementSelect v-model="form.announcementConfId" placeholder="请选择" @selectRow="handleSelect" />
          </el-form-item>
        </el-col>

        <el-col :sm="24" :xs="24">
          <el-form-item label="标题(仅参考)" prop="title">
            <el-input clearable :maxlength="50" v-model="form.title" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="是否启用" prop="state">
            <el-switch v-model="form.state" active-text="启用" inactive-text="禁用" style="--el-switch-on-color: #13ce66" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="生效开始时间">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" style="width: 100%" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="推送间隔（分钟）" prop="timeLen">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.timeLen" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="总推送次数" prop="totalCount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.totalCount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="已推送次数" prop="sendCount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.sendCount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <!-- <el-col :sm="24" :xs="24">
                    <el-form-item label="下次推送时间戳（ms）" prop="nextTime">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.nextTime"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
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
  import { addAnnouncementRun, updateAnnouncementRun } from '@/api/push/announcementRunApi';
  import type { AnnouncementRun } from '@/api/push/model/announcementRun';
  import AnnouncementSelect from '@/components/announcementSelect/index.vue';
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: AnnouncementRun | null;
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
  const [form, resetFields, assignFields] = useFormData<AnnouncementRun>({
    id: undefined,
    announcementConfId: undefined,
    title: '',
    state: true,
    startDate: undefined,
    endDate: undefined,
    totalCount: 0,
    timeLen: undefined,
    sendCount: 0,
    nextTime: undefined
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    id: [
      {
        required: true,
        type: 'number',
        message: '请输入',
        trigger: 'blur'
      }
    ],
    announcementConfId: [
      {
        required: true,
        type: 'number',
        message: '请输入配置id',
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

    startDate: [
      {
        required: true,
        type: 'number',
        message: '请输入生效开始时间',
        trigger: 'blur'
      }
    ],
    endDate: [
      {
        required: true,
        type: 'number',
        message: '请输入生效结束时间',
        trigger: 'blur'
      }
    ],
    totalCount: [
      {
        required: true,
        type: 'number',
        message: '请输入总推送次数，-1 表示不限',
        trigger: 'blur'
      }
    ],
    timeLen: [
      {
        required: true,
        type: 'number',
        message: '请输入推送间隔（分钟）',
        trigger: 'blur'
      }
    ]
  });

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };
  const timeArr = ref<any>(['', '']);
  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      const [startTime, endTime] = timeArr.value || [];
      // 如果time中的值不是ISO格式，转换为ISO格式
      // if (startTime && !startTime.includes('T')) {
      //     form.startDate = new Date(startTime).toISOString();
      // } else {
      //     form.startDate = startTime;
      // }

      // if (endTime && !endTime.includes('T')) {
      //     form.endDate = new Date(endTime).toISOString();
      // } else {
      //     form.endDate = endTime;
      // }
      form.startDate = startTime;
      form.endDate = endTime;
      const saveOrUpdate = isUpdate.value ? updateAnnouncementRun : addAnnouncementRun;
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
  const handleSelect = (row: any) => {

  };
  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({ ...props.data });
      timeArr.value = [props.data.startDate, props.data.endDate];
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
