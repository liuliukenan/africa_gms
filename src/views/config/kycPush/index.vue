<template>
  <ele-page>
    <ele-card>
    <div v-for="(item, idx) in form.configs" :key="idx" style="margin-bottom: 20px">
      <div class="box">
        <div class="sub-title">
          {{ item.eventType === 'KYC_SUCCESS' ? 'KYC审核通过' : 'KYC审核拒绝' }}
        </div>
        <el-form label-width="120px">
          <el-row :gutter="20">
            <el-col :md="6" :sm="24">
              <el-form-item label="启用状态">
                <el-switch v-model="item.status" :active-value="1" :inactive-value="0" active-text="启用" inactive-text="禁用" size="large" />
              </el-form-item>
            </el-col>
            <!-- <el-col v-if="item.strategyName" :md="6" :sm="24">
              <el-form-item label="策略名称">
                <span>{{ item.strategyName }}</span>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>

        <!-- 奖励物品 -->
        <ActivityRewardGoods v-model="item.rewardConf!" />

        <!-- 推送配置 -->
        <ActivityPush v-model="item.pushes!" :strategy-id="item.id" actTypeEnum="kyc"/>
      </div>
    </div>

    <el-button type="success" @click="handleSave">{{ t('action.save') }}</el-button>
    <el-popconfirm :title="t('common.sureSend')" @confirm="handleReload">
      <template #reference>
        <el-button type="danger" class="ele-btn-icon" style="margin-left: 12px">{{ t('action.send') }}</el-button>
      </template>
    </el-popconfirm>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { ElMessage } from 'element-plus/es';
  import { useI18n } from 'vue-i18n';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  import ActivityPush from '@/components/ActivityPush/index.vue';
  import { getKYCPushConfig, updateKYCPushConfig, reloadKYCPush } from '@/api/config/kycPushApi';
  import type { KycPushConfigVO, KycPushConfigDTO } from '@/api/config/model/kycPush';

  const { t } = useI18n();

  /** 表单数据 */
  const form = reactive<{ configs: KycPushConfigVO[] }>({
    configs: []
  });

  /**
   * 加载配置
   */
  const loadConfig = async () => {
    try {
      const data = await getKYCPushConfig();
      const rawConfigs = JSON.parse(JSON.stringify(data?.configs || []));

      // 映射 mailTemplateId → inAppTemplateId，以便 ActivityPush 的 MailSelect 回显
      rawConfigs.forEach((cfg: KycPushConfigVO) => {
        cfg.rewardConf = cfg.rewardConf || [];
        if (cfg.pushes) {
          cfg.pushes.forEach((push: any) => {
            push.inAppTemplateId = push.mailTemplateId;
          });
        }
      });

      form.configs = rawConfigs;
    } catch (error) {
      const message = error instanceof Error ? error.message : '查询失败';
      ElMessage.error(message);
    }
  };

  /**
   * 保存配置
   */
  const handleSave = async () => {
    const configs: KycPushConfigDTO[] = form.configs.map((item) => {
      const pushes = (item.pushes || []).map((push: any) => {
        // 将 ActivityPush 编辑的 inAppTemplateId 映射回 mailTemplateId
        const mapped = { ...push };
        mapped.mailTemplateId = mapped.inAppTemplateId;
        // 移除 ActivityPush 特有字段（和内部临时字段），避免污染请求体
        delete mapped.delayValue;
        delete mapped.delayUnit;
        delete mapped.needReward;
        delete mapped.inAppTemplateId;
        return mapped;
      });

      return {
        eventType: item.eventType || '',
        strategyName: item.strategyName,
        rewardConf: item.rewardConf || [],
        status: item.status ?? 0,
        pushes
      };
    });

    try {
      const msg = await updateKYCPushConfig({ configs });
      ElMessage.success(msg || '保存成功');
      loadConfig();
    } catch (error) {
      const message = error instanceof Error ? error.message : '保存失败';
      ElMessage.error(message);
    }
  };

  /**
   * 发送服务器
   */
  const handleReload = () => {
    reloadKYCPush()
      .then((msg) => {
        ElMessage.success(msg || '发送成功');
      })
      .catch((e) => {
        ElMessage.error(e.message);
      });
  };

  onMounted(() => {
    loadConfig();
  });
</script>

<script lang="ts">
  export default { name: 'kycPush' };
</script>

<style lang="scss" scoped>
  .box {
    padding: 16px;
    box-shadow: 0 5px 5px 0 rgba(34, 34, 34, 0.1);
    margin: 15px 0;
    border-radius: 15px;
  }

  .sub-title {
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0 16px;
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
</style>
