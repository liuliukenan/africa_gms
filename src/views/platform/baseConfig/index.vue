<template>
  <ele-card :bordered="false" style="margin: 20px" body-class="card">
    <template #header>
      <div class="card-header" style="display: flex; width: 100%; justify-content: space-between; align-items: center">
        <span style="font-weight: bold; font-size: 20px">{{ t('platform.baseConfig.title') }}</span>
        <div>
          <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>{{ t('action.sendServer') }}</span>
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="160px">
      <div style="color: red; margin-bottom: 10px">
        <el-row :gutter="16">
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.defaultCountry')" prop="defaultCountrtyCode">
              <el-select v-model="form.defaultCountrtyCode" :placeholder="t('common.pleaseSelect')" style="width: 100%">
                <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.defaultLang')" prop="defaultLang">
              <el-input clearable :placeholder="t('common.pleaseInput')" v-model.trim="form.defaultLang" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.rechargeFlowMultiple')" prop="rechargeFlowMultiple">
              <el-input-number clearable :placeholder="t('common.pleaseInput')" :min="0" :controls="false" style="width: 100%" v-model="form.rechargeFlowMultiple" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.childWalletTransferDelayTime')" prop="childWalletTransferDelayTime" label-width="220px">
              <el-input clearable :placeholder="t('common.pleaseInput')" v-model.trim="form.childWalletTransferDelayTime" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 游戏链接配置区域 -->
        <div style="margin-bottom: 15px; padding: 12px 16px; background: #f5f7fa; border-radius: 4px; font-weight: bold; color: #303133">
          {{ t('platform.baseConfig.form.gameUrlTitle') }}
        </div>
        <el-row :gutter="16">
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.officialGameUrl')" prop="officialGameUrl">
              <el-input clearable :placeholder="t('common.pleaseInput')" v-model.trim="form.officialGameUrl" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.planeGameUrl')" prop="planeGameUrl">
              <el-input clearable :placeholder="t('common.pleaseInput')" v-model.trim="form.planeGameUrl" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.uploadUrl')" prop="uploadUrl">
              <el-input clearable :placeholder="t('common.pleaseInput')" v-model.trim="form.uploadUrl" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.chickenRoadUrl')" prop="chickenRoadUrl">
              <el-input clearable :placeholder="t('common.pleaseInput')" v-model.trim="form.chickenRoadUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="16">
                    <el-col :md="24" :sm="24" :xs="24">
                        <el-form-item :label="t('platform.baseConfig.form.flowCleanCheckSwitch')"
                            prop="flowCleanCheckSwitch">
                            <el-switch v-model="form.flowCleanCheckSwitch" :active-value="true" size="large"
                                :inactive-value="false"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :sm="24" :xs="24">
                        <el-form-item :label="t('platform.baseConfig.form.flowCleanCheck')" prop="flowCleanCheck">
                            <el-input-number v-model="form.flowCleanCheck" :controls="false" style="width: 100%;"
                                :placeholder="t('platform.baseConfig.form.flowPlace')" ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :sm="24" :xs="24">
                        <el-form-item :label="t('platform.baseConfig.form.flowCleanCheckDelayMinutes')"
                            prop="flowCleanCheckDelayMinutes">
                            <el-input v-model="form.flowCleanCheckDelayMinutes"
                                :placeholder="t('platform.baseConfig.form.timePlace')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :sm="24" :xs="24">
                        <el-form-item label="说明:" class="red">
                            <div> {{ t('platform.baseConfig.form.tips1') }}</div>
                            <div> {{ t('platform.baseConfig.form.tips2') }}</div>
                        </el-form-item>
                    </el-col>
                </el-row> -->
        <div v-for="(v, i) in configStore.countryArr" :key="v.code" class="card-item">
          <!-- <el-row :gutter="16"> -->
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.countryCode') + ':'" :prop="v.code + '.code'" class="title">
              {{ v.name }}
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.registerFlowMultiple')" :prop="v.code + '.registerFlowMultiple'">
              <el-input-number clearable :placeholder="t('common.pleaseInput')" :model-value="form.itemMap![v.code]?.registerFlowMultiple" :controls="false" style="width: 100%" @input="handleInput(v.code, 'registerFlowMultiple', Number($event) || 0)" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.registerAmountLabel')" :prop="v.code + '.registerAmount'">
              <el-input-number clearable :placeholder="t('common.pleaseInput')" :model-value="form.itemMap![v.code]?.registerAmount" :controls="false" style="width: 100%" @input="handleInput(v.code, 'registerAmount', Number($event) || 0)" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.domain')" :prop="v.code + '.domain'">
              <el-input clearable :placeholder="t('common.pleaseInput')" :model-value="form.itemMap![v.code]?.domain" @input="handleInput(v.code, 'domain', $event)" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.shortDomain')" :prop="v.code + '.shortDomain'">
              <el-input clearable :placeholder="t('common.pleaseInput')" :model-value="form.itemMap![v.code]?.shortDomain" @input="handleInput(v.code, 'shortDomain', $event)" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item :label="t('platform.baseConfig.form.deferRandomMinutes')">
              <el-input-number :model-value="form.itemMap![v.code]?.deferRandomMinutes" :controls="false" style="width: 100%" :min="0" :placeholder="t('common.pleaseInput')" @input="handleInput(v.code, 'deferRandomMinutes', Number($event) || 0)" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24">
            <el-form-item :label="t('platform.baseConfig.form.smsMuteTime')" :class="{ row: !mobile }">
              <el-time-picker :model-value="form.itemMap![v.code]?.smsMuteStart" format="HH:mm:ss" value-format="HH:mm:ss" :start-placeholder="t('common.time.start')" style="width: 100%" @update:model-value="(val: any) => handleInput(v.code, 'smsMuteStart', val || '')" />
              <div class="line">-</div>
              <el-time-picker :model-value="form.itemMap![v.code]?.smsMuteEnd" format="HH:mm:ss" value-format="HH:mm:ss" :start-placeholder="t('common.time.end')" style="width: 100%" @update:model-value="(val: any) => handleInput(v.code, 'smsMuteEnd', val || '')" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24">
            <el-form-item :label="t('platform.baseConfig.form.appPushMuteTime')" :class="{ row: !mobile }">
              <el-time-picker :model-value="form.itemMap![v.code]?.appPushMuteStart" format="HH:mm:ss" value-format="HH:mm:ss" :start-placeholder="t('common.time.start')" style="width: 100%" @update:model-value="(val: any) => handleInput(v.code, 'appPushMuteStart', val || '')" />
              <div class="line">-</div>
              <el-time-picker :model-value="form.itemMap![v.code]?.appPushMuteEnd" format="HH:mm:ss" value-format="HH:mm:ss" :start-placeholder="t('common.time.end')" style="width: 100%" @update:model-value="(val: any) => handleInput(v.code, 'appPushMuteEnd', val || '')" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24">
            <el-form-item :label="t('platform.baseConfig.form.inAppMuteTime')" :class="{ row: !mobile }">
              <el-time-picker :model-value="form.itemMap![v.code]?.inAppMuteStart" format="HH:mm:ss" value-format="HH:mm:ss" :start-placeholder="t('common.time.start')" style="width: 100%" @update:model-value="(val: any) => handleInput(v.code, 'inAppMuteStart', val || '')" />
              <div class="line">-</div>
              <el-time-picker :model-value="form.itemMap![v.code]?.inAppMuteEnd" format="HH:mm:ss" value-format="HH:mm:ss" :start-placeholder="t('common.time.end')" style="width: 100%" @update:model-value="(val: any) => handleInput(v.code, 'inAppMuteEnd', val || '')" />
            </el-form-item>
          </el-col>
        </div>
      </div>
    </el-form>
    <div style="text-align: right; padding: 20px 0">
      <el-button type="primary" @click="save">{{ t('action.save') }}</el-button>
    </div>
  </ele-card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { sendConfServer } from '@/api/conf';
  import { assignObject, EleMessage } from 'ele-admin-plus/es';
  import { ElForm } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  import { getBaseConfApi, saveBaseConfApi } from '@/api/platform/baseConfigApi';
  import { BaseConf } from '@/api/platform/model/baseConfig';
  import { useI18n } from 'vue-i18n';
  import { useMobile } from '@/utils/use-mobile';
  const { t } = useI18n();
  const { mobile } = useMobile();

  // 初始化store
  const configStore = useConfigStore();
  const form = ref<BaseConf>({
    jsonType: 'AppConf',
    defaultCountrtyCode: undefined,
    defaultLang: undefined,
    rechargeFlowMultiple: undefined,
    itemMap: {},
    flowCleanCheckSwitch: undefined,
    flowCleanCheck: undefined,
    flowCleanCheckDelayMinutes: undefined,
    uploadUrl: undefined,
    planeGameUrl: undefined,
    officialGameUrl: undefined,
    chickenRoadUrl: undefined,
    domain: undefined,
    shortDomain: undefined,
    registerAmount: undefined,
    deferRandomMinutes: undefined,
    childWalletTransferDelayTime: undefined
  });
  // 定义表单验证规则
  const rules = ref({
    defaultCountrtyCode: [{ required: true, message: t('common.pleaseSelect') + t('platform.baseConfig.form.defaultCountry'), trigger: 'blur' }],
    defaultLang: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.defaultLang'), trigger: 'blur' }],
    rechargeFlowMultiple: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.rechargeFlowMultiple'), trigger: 'blur' }],
    planeGameUrl: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
    officialGameUrl: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.officialGameUrl'), trigger: 'blur' }],
    domain: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.domain'), trigger: 'blur' }],
    shortDomain: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.shortDomain'), trigger: 'blur' }],
    registerAmount: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.registerAmount'), trigger: 'blur' }],
    flowCleanCheckSwitch: [{ required: true, message: t('common.pleaseSelect') + t('platform.baseConfig.form.flowCleanCheckSwitch'), trigger: 'blur' }],
    flowCleanCheck: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.flowCleanCheck'), trigger: 'blur' }],
    flowCleanCheckDelayMinutes: [{ required: true, message: t('common.pleaseInput') + t('platform.baseConfig.form.flowCleanCheckDelayMinutes'), trigger: 'blur' }]
  });

  // 初始化国家对应的 additionalProperties 对象
  const initAdditionalProperties = () => {
    const countryArr = configStore.countryArr;
    if (countryArr.length > 0) {
      countryArr.forEach((countryCode) => {
        const key = countryCode.code;
        if (!form.value.itemMap) form.value.itemMap = {};
        // 只为没有数据的国家初始化空对象，不设置默认值
        if (!form.value.itemMap[key]) {
          form.value.itemMap[key] = {};
        }
      });
    }
  };

  // 处理输入事件，更新 itemMap 中的值
  const handleInput = (countryCode: string, field: string, value: any) => {
    if (!form.value.itemMap) form.value.itemMap = {};
    if (!form.value.itemMap[countryCode]) {
      form.value.itemMap[countryCode] = {};
    }
    form.value.itemMap[countryCode][field] = value;
  };

  // 组件挂载时获取国家列表并初始化
  onMounted(async () => {
    initAdditionalProperties();
    loadingAppConf();
  });
  // 获取基础配置信息
  const loadingAppConf = () => {
    getBaseConfApi().then((res) => {
      if (res) {
        form.value = assignObject(form.value, res);
        // 加载数据后重新初始化国家条目，确保每个国家都有对象
        initAdditionalProperties();
        // 确保 itemMap 中的每个国家都有 registerFlowMultiple 和 domain 字段
        if (form.value.itemMap) {
          Object.keys(form.value.itemMap).forEach((key) => {
            if (!form.value.itemMap![key].registerFlowMultiple) {
              form.value.itemMap![key].registerFlowMultiple = 5; // 默认值
            }
            if (!form.value.itemMap![key].domain) {
              form.value.itemMap![key].domain = null;
            }
            if (!form.value.itemMap![key].shortDomain) {
              form.value.itemMap![key].shortDomain = null;
            }
          });
        }
      }
    });
  };

  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    sendConfServer(1)
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);

  // 保存
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (valid) {
        const loading = EleMessage.loading({
          message: t('common.loading'),
          plain: true
        });
        saveBaseConfApi(form.value)
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
  :deep(.red .el-form-item__label) {
    color: red;
  }
  :deep(.red .el-form-item__content) {
    display: flex;
    flex-direction: column;
    // justify-content: flex-start;
    align-items: flex-start;
  }
  .card-item {
    margin-bottom: 30px;
    // border: 1px solid #e4e7ed;
  }

  :deep(.title .el-form-item__label) {
    font-weight: bold;
    font-size: 20px;
  }

  :deep(.title .el-form-item__content) {
    font-weight: bold;
    font-size: 20px;
    color: black;
  }

  .form-table .el-form-item {
    margin-bottom: 0 !important;
  }
  :deep(.row .el-form-item__content) {
    flex-wrap: nowrap;
  }
  .line {
    margin: 0 10px;
  }
</style>
