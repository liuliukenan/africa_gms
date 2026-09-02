<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="t('user.userList.userDecAmount.title')" @open="handleOpen" :destroy-on-close="true">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userDecAmount.uid')">
            {{ form.uid }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userDecAmount.currentAmount')">
            {{ form.totalAmount }}
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="操作类型： " prop="type">
            <el-radio-group v-model="form.type" placeholder="请选择">
              <el-radio :value="0">增加</el-radio>
              <el-radio :value="1">扣减</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.userList.userDecAmount.walletType')" prop="queryType">
            <el-radio-group v-model="form.queryType" placeholder="请选择" @change="changeQueryType">
              <el-radio :value="0">{{ t('user.userList.userDecAmount.cashWallet') }}</el-radio>
              <el-radio :value="2">{{ t('user.userList.userDecAmount.bonusGroupWallet') }}</el-radio>
              <el-radio :value="3">{{ t('user.userList.userDecAmount.bonusGameWallet') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-if="form.queryType != 0 && childWalletFilter.length">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.userList.userDecAmount.walletTemplate')" prop="walletId">
            <el-table :data="childWalletFilter" border size="small" highlight-current-row style="width: 100%;"
              max-height="240" @row-click="handleWalletRowClick">
              <el-table-column width="50" align="center">
                <template #default="{ row }">
                  <el-radio v-model="form.walletId" :value="row.id">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="companyId" :label="t('user.userList.userDecAmount.companyId')" align="center" />
              <el-table-column prop="gameGroupId" :label="t('user.userList.userDecAmount.gameGroupId')" align="center" />
              <el-table-column prop="gameId" :label="t('user.userList.userDecAmount.gameId')" align="center" />
              <el-table-column prop="amount" :label="t('user.userList.userDecAmount.balance')" align="center" />
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <!-- <el-form-item :label="(form.type === 0 ? '增加' : '扣减') + '余额'" prop="money"> -->
          <el-form-item :label="t('user.userList.userDecAmount.deductAmount')" prop="money">
            <el-input-number :controls="false" clearable v-model.trim="form.money" :placeholder="t('common.placeholder.input')" :min="0"
              :max="form.totalAmount" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.userList.userDecAmount.remark')" prop="remark">
            <el-input type="textarea" :rows="3" clearable v-model.trim="form.remark" :placeholder="t('common.placeholder.input')"
              style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="扣减流水" prop="flowId">
            <el-input-number :controls="false" clearable v-model.trim="form.flowId" placeholder="请输入"
              style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
      <el-popconfirm :title="t('user.userList.userDecAmount.confirmDeduct')" @confirm="save()" width="250px">
        <template #reference>
          <el-button type="primary" :loading="loading">{{ t('action.confirm') }}</el-button>
        </template>
      </el-popconfirm>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { useI18n } from 'vue-i18n';
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { deductGold, getUserWallet } from '@/api/user/userApi';
import type { OperateGoldParam } from "@/api/model/user";

const { t } = useI18n();
const props = defineProps<{
  /** 修改回显的数据 */
  uid?: number;
  data?: OperateGoldParam | null;
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
const [form, resetFields, assignFields] = useFormData<OperateGoldParam>({
  uid: undefined,
  // walletId: undefined,
  totalAmount: undefined,
  queryType: 0,
  money: 0,
  type: 1,
  remark: '',
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  gold: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  money: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  queryType: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.select'),
      trigger: 'blur'
    }
  ],
  walletId: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.select'),
      trigger: 'blur'
    }
  ],
  flowId: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
});
const childWallet = ref<any>([]);
const childWalletFilter = ref<any>([]);
/** 获取钱包列表 */
const getWallteList = async () => {
  let res = await getUserWallet(form.uid || 0);
  childWallet.value = res?.childWallets || [];
};
/** 钱包类型改变 */
const changeQueryType = (val) => {
  // bonus
  if (val == 2) {
    childWalletFilter.value = childWallet.value.filter((item) => item.gameId == 0);
  } else if (val == 3) {
    // bonus指定游戏
    childWalletFilter.value = childWallet.value.filter((item) => item.gameId >= 0);
  }
};
/** 钱包表格行点击 */
const handleWalletRowClick = (row: any) => {
  form.walletId = row.id;
};

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};

/** 保存编辑 */
const save = () => {
  formRef.value?.validate?.((valid) => {
    const params = { ...form }
    // delete params.gold
    // delete params.diamond
    if (!valid) {
      return;
    }
    loading.value = true;
    deductGold(params as any)
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
    form.type = 1;
    form.queryType = 0;
    // form.accountType = 0;
    // form.originGold = props.data.gold;
    form.uid = props.data.uid;
    isUpdate.value = true;
    getWallteList();
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
