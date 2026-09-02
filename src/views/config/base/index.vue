<template>
  <ele-card :bordered="false" style="margin: 20px" body-class="card">
    <template #header>
      <div class="card-header" style="display: flex; width: 100%; justify-content: space-between; align-items: center">
        <span style="font-weight: bold; font-size: 20px">基础配置</span>
        <div v-permission="'config:base:send'">
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送</span>
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>
    <el-form ref="formRef" :model="form" label-width="160px">
      <div style="color: red; margin-bottom: 10px">
        <el-row :gutter="16">
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="注册金币" prop="registerCoins">
              <el-input clearable placeholder="注册赠送金币数量" type="number" v-model.trim="form.registerCoins"
                style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="绑定赠送" prop="bindCoins">
              <el-input clearable placeholder="绑定赠送" type="number" v-model.trim="form.bindCoins" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="分享赠送" prop="shareAward">
              <el-input clearable placeholder="分享赠送" type="number" v-model.trim="form.shareAward" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="游戏代码" prop="gameCode">
              <el-input clearable placeholder="" v-model.trim="form.gameCode" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="救急金次数" prop="reliefFundsTimes">
              <el-input-number clearable controls-position="right" placeholder="救急金次数"
                v-model.trim="form.reliefFundsTimes" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="救急金金额" prop="reliefFundsCoins">
              <el-input clearable placeholder="救急金金额" type="number" v-model.trim="form.reliefFundsCoins"
                style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="领取限制" prop="reliefFundsOwnCoins">
              <el-input clearable placeholder="领取限制" type="number" v-model.trim="form.reliefFundsOwnCoins"
                style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="意见奖励" prop="feedback">
              <el-input clearable placeholder="意见奖励" v-model.trim="form.feedback" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item label="喇叭费用" prop="trumpetGold">
              <el-input clearable placeholder="喇叭费用" v-model.trim="form.trumpetGold" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="聊天地址" prop="chatAddress">
              <el-input clearable placeholder="聊天地址" v-model.trim="form.chatAddress" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="slot地址" prop="mainSlotsUrl">
              <el-input clearable placeholder="slot地址" v-model.trim="form.mainSlotsUrl" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin: 10px 0;padding: 20px 0;background: #f0f2f5">
          <div style='font-weight:bold;font-size:20px;margin-bottom:20px;color:black'>充值提现配置</div>
          <el-row :gutter="16">
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="货币类型" prop="unit">
                <!-- <el-input clearable placeholder="货币类型"  v-model.trim="form.unit" style="width: 100%" /> -->
                <dict-data code="unitType" v-model="form.unit" valueType='string' />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="货币-金币比例" prop="thbRate">
                <el-input clearable placeholder="1泰铢兑换多少金币" type="number" v-model.trim="form.thbRate"
                  style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="金币最小提现" prop="thbMinWithdrawMoney">
                <el-input clearable placeholder="金币最小提现" type="number" v-model.trim="form.thbMinWithdrawMoney"
                  style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="16">

          </el-row>
          <el-row :gutter="16">
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="金币提现预设金额" prop="thbExchangeListStr">
                <el-input clearable placeholder="金币提现预设金额" v-model.trim="form.thbExchangeListStr" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="充值流水倍数" prop="payFlowMutl">
                <el-input clearable placeholder="充值流水倍数" type="number" v-model.trim="form.payFlowMutl"
                  style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="兑换码流水倍数" prop="validCodeFlowMutl">
                <el-input clearable placeholder="兑换码流水倍数" type="number" v-model.trim="form.validCodeFlowMutl"
                  style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="重置提现需求流水金币" prop="resetFlowGold">
                <el-input clearable placeholder="重置提现需求流水金币" type="number" v-model.trim="form.resetFlowGold"
                  style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="充值范围" prop="payRangesStr">
                <el-input clearable placeholder="充值范围" v-model.trim="form.payRangesStr" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="提现范围" prop="withdrawRangesStr">
                <el-input clearable placeholder="提现范围" v-model.trim="form.withdrawRangesStr" style="width: 100%" />
              </el-form-item>
            </el-col>
             <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="非充值用户提现最小金额" prop="vip1WithdrawMoney">
                <el-input clearable placeholder="非充值用户提现最小金额" v-model.trim="form.vip1WithdrawMoney" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="支付渠道" prop="sepayChannelTypeStr">
                <el-input clearable placeholder="支付渠道" v-model.trim="form.sepayChannelTypeStr" style="width: 100%" />
                <div>该配置不要轻易修改</div>
              </el-form-item>
            </el-col>
          </el-row>

        </div>
      </div>
    </el-form>
    <el-form ref="formTableRef" :model="formTable" class="form-table">
      <el-table :data="formTable.contractInfos" stripe style="width: 100%; margin-top: 20px">
        <el-table-column prop="type" label="Type">
          <template #default="{ row, $index }">
            <el-form-item :prop="'contractInfos.' + $index + '.type'" :rules="infoRules.type">
              <dict-data v-if="row.isEdit" code="baseType" valueType="string" v-model="row.type" />
              <span v-else> {{ row.type }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="Account">
          <template #default="{ row, $index }">
            <el-form-item :prop="'contractInfos.' + $index + '.account'" :rules="infoRules.account">
              <el-input v-if="row.isEdit" clearable placeholder="请输入" v-model.trim="row.account" style="width: 100%" />
              <span v-else> {{ row.account }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="Url">
          <template #default="{ row, $index }">
            <el-form-item :prop="'contractInfos.' + $index + '.url'" :rules="infoRules.url">
              <el-input v-if="row.isEdit" clearable placeholder="请输入" v-model.trim="row.url" style="width: 100%" />
              <span v-else> {{ row.url }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button link :type="row.isEdit ? 'success' : 'primary'" size="small" @click="handleFinish(row, $index)"
              v-permission="'config:base:edit'">{{ row.isEdit ? '完成' : '修改' }}</el-button>
            <el-popconfirm title="确定要删除此记录吗？" @confirm="baseRemove(row, $index)">
              <template #reference>
                <el-button link type="danger" size="small" v-permission="'config:base:delete'">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button block style="margin-top: 16px; width: 80%" @click="baseAdd">
        <template #icon>
          <PlusOutlined />
        </template>
        <span>新增</span>
      </el-button>
    </el-form>
    <div style="text-align: right; padding: 20px 0" v-permission="'config:base:add'">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <!-- <template #footer>
            <span @click="save">保存</span>
        </template> -->
  </ele-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlusOutlined } from '@/components/icons';
import { getAppConf, saveAppConf, sendConfServer } from '@/api/conf';
import { assignObject, uuid } from 'ele-admin-plus';
import { EleMessage } from 'ele-admin-plus/es';
import type { ContractInfo } from '@/api/conf/model';
import { ElForm } from 'element-plus';

const form = ref({
  jsonType: 'AppConf',
  registerCoins: 0,
  bindCoins: 0,
  shareAward: 0,
  reliefFundsTimes: 0,
  reliefFundsCoins: 0,
  reliefFundsOwnCoins: 0,
  chatAddress: '',
  paytableAddress: '',
  vip1WithdrawMoney: 500,
  gameCode: '',
  feedback: undefined,
  unit: '',
  mainSlotsUrl: '',
  trumpetGold: undefined,
  thbRate: 0,
  thbMinWithdrawMoney: 0,
  thbExchangeList: [],
  payRanges: [],
  payRangesStr: '[]',
  sepayChannelType: [],
  thbExchangeListStr: '[]',
  withdrawRanges: [],
  withdrawRangesStr: '[]',
  sepayChannelTypeStr: '[]',
  payFlowMutl: 0,
  validCodeFlowMutl: 0,
  resetFlowGold: 0,
  contractInfos: [] as ContractInfo[]
});
const infoRules = {
  type: [{ required: true, message: '请选择type', trigger: 'blur' }],
  account: [{ required: true, message: '请输入account', trigger: 'blur' }],
  url: [{ required: true, message: '请输入url', trigger: 'blur' }]
};
const formTable = ref({
  contractInfos: [] as ContractInfo[]
});
const originData = ref<ContractInfo[]>([]);
// 获取基础配置信息
const loadingAppConf = () => {
  getAppConf().then((data) => {
    form.value = assignObject(form.value, data);
    form.value.jsonType = 'AppConf';
    if (!data.contractInfos) {
      form.value.contractInfos = [];
    } else {
      data.contractInfos.forEach((v) => {
        v.isEdit = false;
      });
      formTable.value.contractInfos = [...data.contractInfos];
      originData.value = JSON.parse(JSON.stringify(data.contractInfos)) || [];
    }
    form.value.thbExchangeListStr = JSON.stringify(data.thbExchangeList);
    form.value.payRangesStr = JSON.stringify(data.payRanges);
    form.value.withdrawRangesStr = JSON.stringify(data.withdrawRanges);
    form.value.sepayChannelTypeStr = JSON.stringify(data.sepayChannelType);
  });
};

loadingAppConf();
// 发送到服务器
const sendServer = () => {
  const loading = EleMessage.loading({
    message: '请求中..',
    plain: true
  });
  sendConfServer(8)
    .then((msg) => {
      loading.close();
      EleMessage.success(msg);
    })
    .catch((e) => {
      loading.close();
      EleMessage.error(e.message);
    });
};
const formTableRef = ref<InstanceType<typeof ElForm> | null>(null);
const handleFinish = (row: any, index: number) => {
  if (row.isEdit) {
    formTableRef.value?.validate?.((valid) => {
      if (valid) {
        row.isEdit = false;
        const originalRow = originData.value[index];
        let hasChange = row.type !== originalRow?.type || row.account !== originalRow?.account || row.url !== originalRow?.url;
        if (hasChange) save();
      }
    });
  } else {
    row.isEdit = true;
  }
};
// 删除
const baseRemove = (_row, index) => {
  formTable.value.contractInfos.splice(index, 1);
  save();
};
// 新增一行
const baseAdd = () => {
  formTable.value.contractInfos.push({
    key: uuid(8),
    isEdit: true,
    type: 'Telegram',
    account: undefined,
    url: undefined
  });
};
// 保存
const save = () => {
  formTableRef.value?.validate?.((valid) => {
    if (valid) {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      form.value.thbExchangeList = JSON.parse(form.value.thbExchangeListStr);
      form.value.payRanges = JSON.parse(form.value.payRangesStr);
      form.value.withdrawRanges = JSON.parse(form.value.withdrawRangesStr);
      form.value.sepayChannelType = JSON.parse(form.value.sepayChannelTypeStr);
      form.value.contractInfos = formTable.value.contractInfos;
      console.log(77, form.value);

      // return
      saveAppConf(form.value)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          loadingAppConf();
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    }
  });
};
</script>
<style lang="scss" scoped>
.form-table .el-form-item {
  margin-bottom: 0 !important;
}
</style>
