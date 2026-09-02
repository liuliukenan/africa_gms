<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="1000" v-model="visible" :title="isUpdate ? '修改全局邮件' : '新建全局邮件'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- <el-col :sm="12" :xs="12">
                    <el-form-item label="id" prop="id">
                        <el-input-number v-model="form.id" :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <el-col :sm="12" :xs="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" clearable>
              <el-option label="所有人" :value="0"></el-option>
              <el-option label="指定人" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="国家" prop="countryCode">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%" :disabled="isUpdate">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="发件人名称" prop="fromName">
            <el-input clearable :maxlength="50" v-model="form.fromName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio label="启用" :value="1"></el-radio>
              <el-radio label="禁用" :value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="日期">
            <el-date-picker v-model="timeArr" type="daterange" :value-format="'YYYY-MM-DD'" range-separator="至"
              start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="附件类型" prop="annexType">
            <!-- <dict-data code="annexType" v-model="form.annexType" valueType="number" placeholder="请选择附件类型" /> -->
            <dict-data code="goods_type" v-model="form.annexType" valueType="number" placeholder="请选择附件类型" />
            <!-- 0=cash 1=group 2=game 3=freeGame  10=none-->
          </el-form-item>
        </el-col>
        <!--cash和none 时不显示-->
        <el-col :sm="12" :xs="12" v-if="form.annexType != 10 && form.annexType != 0">
          <el-form-item label="模板" prop="exampleId">
            <!-- 钱包模板需要筛选一下 -->
            <!-- group：钱包模版， gameId==0 -->
            <template v-if="form.annexType == 1">
              <WalletSelect v-model="form.exampleId" filter-type="group" />
            </template>
            <!-- game：钱包模版，gameId>0 -->
            <template v-if="form.annexType == 2">
              <WalletSelect v-model="form.exampleId" filter-type="game" />
            </template>
            <!-- 免费游戏模板 -->
            <template v-if="form.annexType == 3">
              <FreeGameSelect v-model="form.exampleId" />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-if="form.annexType != 10">
        <el-col :sm="12" :xs="12" v-if="form.annexType!=3 ">
          <el-form-item label="金额" prop="amount">
            <el-input-number v-model="form.amount" :min="0" placeholder="请输入" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="流水倍数" prop="flowMutl">
            <el-input-number v-model="form.flowMutl" :min="0" placeholder="请输入" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="邮件模板" prop="mailConfId">
            <!-- <MailTextConfSelectTable v-model="form.mailConfId" @select-row="selectRow" /> -->
              <MailSelect v-model="form.mailConfId" size="small" @select-row="selectRow"/>
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="邮件标题" prop="title">
            <el-input clearable :maxlength="255" v-model="form.title" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16" v-if="form.mailConfId != undefined && form.mailConfId > 0">
        <el-col :sm="24" :xs="24">
          <el-form-item label="邮件内容" prop="content">
            <tinymce-editor v-model="form.content" :init="{ height: 300 }" category="mail" style="width: 100%" />
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
import { nextTick, reactive, ref, watch } from 'vue';
import { type FormInstance, type FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { addGlobalMail, updateGlobalMail } from '@/api/platform/globalMailApi';
import type { GlobalMail } from '@/api/platform/model/globalMail';
import { pageUserWalletExamples } from '@/api/platform/userWalletExampleApi';
import { useConfigStore } from '@/store/modules/config';
import { toDateString } from '@/utils/utils';
import TinymceEditor from '@/components/TinymceEditor/index.vue'; // 导入store
// import MailTextConfSelectTable from './/mail-text-select-table.vue';
import WalletSelect from '@/components/WallteSelect/index.vue';
import FreeGameSelect from '@/components/FreeGameSelect/index.vue';
import MailSelect from '@/components/MailSelect/index.vue';
// 初始化store
const configStore = useConfigStore();
const props = defineProps<{
  /** 修改回显的数据 */
  data?: GlobalMail | null;
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
const [form, resetFields, assignFields] = useFormData<GlobalMail>({
  id: undefined,
  type: undefined,
  annexType: 0,
  countryCode: undefined,
  title: undefined,
  content: undefined,
  fromName: undefined,
  mailConfId: 1,
  status: 1,
  amount: undefined,
  flowMutl: 0,
  startDate: undefined,
  endDate: undefined
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  // id: [
  //     {
  //         required: true,
  //         type: 'number',
  //         message: '请输入id',
  //         trigger: 'blur'
  //     }
  // ],
  type: [
    {
      required: true,
      type: 'number',
      message: '请选择类型',
      trigger: 'blur'
    }
  ],
  title: [
    {
      required: true,
      type: 'string',
      message: '请输入邮件主题',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      type: 'string',
      message: '请输入内容',
      trigger: 'blur'
    }
  ],
  fromName: [
    {
      required: true,
      type: 'string',
      message: '请输入发件人名称',
      trigger: 'blur'
    }
  ],
  amount: [
    {
      required: true,
      type: 'number',
      message: '请输入数量',
      trigger: 'blur'
    }
  ],
  mailConfId: [
    {
      required: true,
      type: 'number',
      message: '文本模板',
      trigger: 'blur'
    }
  ],
  flowMutl: [
    {
      required: true,
      type: 'number',
      message: '请输入流水倍数',
      trigger: 'blur'
    }
  ],
  exampleId: [
    {
      required: false,
      type: 'number',
      message: '请选择钱包模板',
      trigger: 'blur'
    }
  ]
});

watch(
  () => form.annexType,
  (val) => {
    form.exampleId = undefined;
    const isBonus = val == 2;
    if (rules.exampleId) rules.exampleId[0].required = isBonus;
    if (!isBonus) {
      form.exampleId = undefined;
      nextTick(() => formRef.value?.clearValidate?.(['exampleId']));
    }
  }
);
const selectRow = (row: any) => {
  form.content = row.mailText;
  form.title = row.mailTitle;
};
const walletArr = ref<any[]>([]);
const getWallte = async () => {
  let res = await pageUserWalletExamples({ page: 1, limit: 100 });
  console.log(34, res);
  walletArr.value = res?.list || [];

};

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
let timeArr = ref<[string, string]>(['', '']);
/** 保存编辑 */
const save = () => {
  formRef.value?.validate?.((valid) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    const saveOrUpdate = isUpdate.value ? updateGlobalMail : addGlobalMail;
    const [startDay, endDay] = timeArr.value || [];
    let params = { ...form, startDate: startDay, endDate: endDay };
    saveOrUpdate(params)
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
    timeArr.value = [toDateString(props.data.startDate, 'yyyy-MM-dd'), toDateString(props.data.endDate, 'yyyy-MM-dd')];
    console.log(55, form);

    isUpdate.value = true;
  } else {
    resetFields();
    isUpdate.value = false;
  }
  getWallte()
  nextTick(() => {
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  });
};
</script>
