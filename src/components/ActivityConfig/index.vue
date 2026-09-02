<template>
  <div>
    <ele-card :bordered="false" style="margin: 0" body-class="card" :body-style="{ padding: '0px' }">
      <el-form ref="formRef" :model="form" :rules="rules" :label-width="130">
        <!-- 基础配置 -->
        <div class="sub-title">{{ t('activityConfig.baseConfig.title') }}</div>
        <ActivityBaseConfig
          ref="baseConfigRef"
          v-model="form"
          :get-api="props.getApi"
          :hide-image="props.typeEnum === 'APK_LOGIN_BONUS'"
          @loaded="handleBaseLoaded"
        />
        <div class="box">
          <!-- 限制配置 -->
          <div class="sub-title">{{ t('activityConfig.limitConfig.title') }}</div>
          <ActivityLimit v-model="subConf" />

          <!-- 奖励物品表格 -->
          <div class="sub-title">{{ t('activityConfig.rewardConfig.title') }}</div>
          <el-row :gutter="16">
            <el-col :span="24">
              <ActivityRewardGoods ref="rewardGoodsTableRef" v-model="rewardGoodsList" :act-type-enum="typeEnum" />
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div style="text-align: left; padding: 20px 0">
        <el-button type="primary" size="large" @click="save">{{ t('action.save') }}</el-button>
        <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
          <template #reference>
            <el-button type="danger" size="large" class="ele-btn-icon">
              <span>{{ t('action.send') }}</span>
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </ele-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { EleMessage } from 'ele-admin-plus/es';
  import { ElForm } from 'element-plus';
  import type { ActivityConfigProps, RegisterBonusRequest, RewardGoods, ActSubConf } from './types';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  import ActivityLimit from '@/components/ActivityLimit/index.vue';
  import ActivityBaseConfig from '@/components/ActivityBaseConfig/index.vue';

  const { t } = useI18n();
  const props = defineProps<ActivityConfigProps>();

  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const baseConfigRef = ref<any>(null);
  const rewardGoodsTableRef = ref<InstanceType<typeof ActivityRewardGoods> | null>(null);
  const form = ref<RegisterBonusRequest>({
    id: undefined,
    countryCode: 254,
    name: '',
    jumpType: undefined,
    jumpValue: '',
    imgUrl: '',
    sortNumber: undefined,
    jumpId: undefined,
    status: true,
    startDate: '',
    endDate: '',
    showStartDate: '',
    showEndDate: '',
    subTitle: '',
    configValue: {
      jsonType: '',
      subActRewardConf: {}
    }
  });

  // 子类型配置（独立维护，保存时组装进 configValue.subActRewardConf）
  const SUB_CONF_KEY = 'common';
  const subConf = ref<ActSubConf>({
    ipLimit: undefined,
    ipPeriod: undefined,
    deviceLimit: undefined,
    devicePeriod: undefined,
    rewardLimit: undefined,
    rewardGoods: []
  });

  // 奖励物品列表（独立维护，保存时组装进 subConf.rewardGoods）
  const rewardGoodsList = ref<RewardGoods[]>([]);

  // 表单验证规则
  const rules = {
    countryCode: [{ required: true, message: '请选择', trigger: 'change' }],
    // jumpType: [
    //     { required: true, message: '请选择', trigger: 'change' }
    // ],
    jumpId: [{ required: true, message: '请选择', trigger: 'change' }]
  };

  // 基础配置加载完成后，填充活动专属配置
  const handleBaseLoaded = (data: any) => {
    if (!data) return;
    // 填充子配置
    if (data.configValue?.subActRewardConf) {
      const subConfData = data.configValue.subActRewardConf[SUB_CONF_KEY];
      if (subConfData) {
        subConf.value = { ...subConfData };
        rewardGoodsList.value = subConfData.rewardGoods || [];
      }
    }
  };

  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    props
      .sendApi()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  const handleSelectRow = (row: any, scopeRow: any) => {
    scopeRow.goodsName = row.name || '';
    scopeRow.goodsType = row.type;
    scopeRow.walletExampleName = row.walletExampleName || '';
  };

  // 保存
  const save = () => {
    formRef.value?.validate((valid) => {
      if (!valid) {
        EleMessage.error(`【${props.title}】请完善基础配置信息`);
        return;
      }
      // 校验奖励物品表格
      const validation = rewardGoodsTableRef.value?.validate();
      if (validation && !validation.valid) {
        EleMessage.error(`【${props.title}】${validation.message}`);
        return;
      }
      if (!validation) {
        EleMessage.error(`【${props.title}】奖励物品表格未初始化`);
        return;
      }
      const loading = EleMessage.loading({
        message: t('common.loading'),
        plain: true
      });
      // 解构日期范围
      const [startDate, endDate] = baseConfigRef.value?.timeArr || [];
      const [showStartDate, showEndDate] = baseConfigRef.value?.timeArr2 || [];
      // 保存时剥离图片域名前缀
      const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
      let imgUrl = form.value.imgUrl;
      if (imgUrl && imgBaseUrl && imgUrl.startsWith(imgBaseUrl)) {
        imgUrl = imgUrl.slice(imgBaseUrl.length);
      }
      // 组装提交数据
      const params: RegisterBonusRequest = {
        ...form.value,
        imgUrl,
        startDate,
        endDate,
        showStartDate,
        showEndDate,
        configValue: {
          ...form.value.configValue,
          subActRewardConf: {
            [SUB_CONF_KEY]: {
              ...subConf.value,
              rewardGoods: rewardGoodsList.value.filter((item) => item.goodsId !== undefined)
            }
          }
        }
      };
      props
        .saveApi(params)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          baseConfigRef.value?.loadingAppConf().then(handleBaseLoaded);
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    });
  };

  onMounted(() => {
    baseConfigRef.value?.loadingAppConf().then(handleBaseLoaded);
  });
</script>
<style lang="scss" scoped>
  .box {
    padding: 16px;
    // border: 2px solid #cccbcb;
    box-shadow: 0 5px 5px 0 rgba(34, 34, 34, 0.1);
    margin: 15px 0;
    border-radius: 15px;
  }

  .sub-title {
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0;
    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      min-height: 30px;
      height: 100%;
      background-color: #1677ff;
      vertical-align: -8px;
      margin-right: 5px;
    }
  }

  .sub-title3 {
    font-size: 15px;
    font-weight: bold;
    margin: 8px 0;
  }
  ::v-deep .el-form-item__label {
    line-height: 1;
    align-items: center;
  }
</style>
