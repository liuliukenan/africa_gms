<template>
  <div>
    <ele-card :bordered="false" style="margin: 0" body-class="card" :body-style="{ padding: '0px' }">
      <el-form ref="formRef" :model="form" :rules="rules" :label-width="130">
        <!-- 基础配置 -->
        <div class="sub-title">{{ t('activityConfig.baseConfig.title') }}</div>
        <ActivityBaseConfig ref="baseConfigRef" v-model="form" :get-api="getApi" @loaded="handleBaseLoaded" />

        <!-- 限制配置 -->
        <div>
          <div class="sub-title">限制配置</div>
          <el-row :gutter="16">
            <el-col :md="6" :sm="24" :xs="24">
              <el-form-item label="IP限制" prop="ipLimit">
                <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.ipLimit" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="24" :xs="24">
              <el-form-item label="IP周期(天)" prop="ipPeriod">
                <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.ipPeriod" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="24" :xs="24">
              <el-form-item label="设备限制" prop="deviceLimit">
                <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.deviceLimit" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="24" :xs="24">
              <el-form-item label="设备周期(天)" prop="devicePeriod">
                <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.devicePeriod" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 每日奖励配置（days） -->
        <div>
          <div class="flex">
            <div class="sub-title">每日奖励配置 </div>
            <el-button type="primary" size="small" style="margin-left: 12px" @click="handleAddDay">+ 新增天数</el-button>
          </div>
          <el-table :data="form.days" border style="width: 100%">
            <el-table-column label="第几天" prop="dayNo" width="140" align="center" >
               <template #default="{ row }">
               第{{row.dayNo}}天
              </template>
            </el-table-column>
            <el-table-column label="奖励名称" prop="rewardName" align="center" />
            <el-table-column label="图标URL" prop="rewardIconUrl" align="center" show-overflow-tooltip >
              <template #default="{ row }">
                <img :src="row.rewardIconUrl" alt="" style="width: 60px" />
              </template>
            </el-table-column>
            <el-table-column label="奖励限制" prop="rewardLimit" width="140" align="center">
              <template #default="scope">
                {{ scope.row.rewardLimit || 0 }}
              </template>
            </el-table-column>
            <el-table-column label="奖励物品" align="center">
              <template #default="scope">
                <span style="color: #67c23a"> {{ scope.row.rewardGoods.length }}项 </span>
              </template>
            </el-table-column>
            <el-table-column label="推送策略" align="center">
              <template #default="scope">
                <span style="color: #67c23a"> {{ scope.row.pushStrategies[0].pushes.length }}项 </span>
              </template>
            </el-table-column>
            <el-table-column :label="t('action.action')" width="150" align="center" fixed="right">
              <template #default="scope">
                <el-button type="primary" link size="small" @click="handleEditDay(scope.$index)">{{ t('action.edit') }}</el-button>
                <!-- <el-button type="success" link size="small" @click="handleCopyDay(scope.$index)">{{ t('action.copy') }}</el-button> -->
                <el-button type="danger" link size="small" @click="handleDeleteDay(scope.$index)">{{ t('action.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <!-- 推荐游戏 -->
        <div>
          <div class="flex">
            <div class="sub-title">推荐游戏 </div>
            <!-- <el-button type="primary" size="small" style="margin-left: 12px" @click="handleAddGame">+ 新增游戏</el-button> -->
          </div>
          <el-table :data="form.recommendedGames" border :cell-style="{ padding: '12px 0',width: '220px'}">
            <el-table-column label="游戏ID" width="220" align="center">
              <template #default="scope">
                <el-input-number v-model="scope.row.gameId" :controls="false" :min="1" :placeholder="t('common.placeholder.input')" size="small" style="width: 100%" />
              </template>
            </el-table-column>
            <!-- <el-table-column label="图标URL" align="center">
              <template #default="scope">
                <div style="display: flex; justify-content: center; align-items: center; min-height: 60px">
                  <image-upload
                    :key="`game-icon-${scope.$index}`"
                    :limit="1"
                    :model-value="scope.row.iconUrl ?? ''"
                    @update:model-value="(val: string) => (scope.row.iconUrl = val)"
                    accept="image/*"
                    :item-style="{
                      width: '60px',
                      height: '60px',
                      background: 'var(--el-fill-color-lighter)',
                      '--ele-upload-list-padding': 0
                    }"
                    :button-style="{ width: '60px', height: '60px' }"
                    category="1"
                    fileName="activitys"
                  />
                </div>
              </template>
            </el-table-column> -->
            <el-table-column :label="t('action.action')" width="180" align="center" fixed="right">
              <template #default="scope">
                <!-- v-if="form.recommendedGames?.length-1 ==scope.$index" -->
                <el-button type="primary" link size="small" @click="handleAddGame" v-if="(form.recommendedGames?.length ?? 0) - 1 === scope.$index">新增游戏</el-button>
                <el-button type="danger" link size="small" @click="handleDeleteGame(scope.$index)" >{{ t('action.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
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

    <!-- 每日奖励编辑抽屉 -->
    <EidtConfig v-model="dayEditDrawer.visible" :data="dayEditDrawer.data" :country-code="form.countryCode" :is-edit="dayEditDrawer.dayIndex >= 0" @confirm="handleSaveDayEdit" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { EleMessage } from 'ele-admin-plus/es';
  import { ElForm } from 'element-plus';
  import type { RegisterDailyBonusConfigVO, RegisterDailyBonusDayConfigVO, RegisterDailyBonusConfigRequest, RegisterDailyBonusRecommendedGameVO } from '@/api/welfare/model/registerDailyBonus';
  import { getRegisterDailyBonusConfig, saveRegisterDailyBonusConfig, reloadRegisterDailyBonusConfig } from '@/api/welfare/registerDailyBonusApi';
  import ActivityBaseConfig from '@/components/ActivityBaseConfig/index.vue';
  import EidtConfig from './eidt-config.vue';
  import ImageUpload from '@/components/ImageUpload/index.vue';
  const { t } = useI18n();
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const baseConfigRef = ref<any>(null);

  // 获取配置API（供基础配置组件调用）
  const getApi = (countryCode: number) => getRegisterDailyBonusConfig(countryCode);

  const form = ref<RegisterDailyBonusConfigVO>({
    id: undefined,
    countryCode: 254,
    name: '',
    jumpType: undefined,
    jumpId: '',
    imgUrl: '',
    sortNumber: undefined,
    status: true,
    startDate: '',
    endDate: '',
    showStartDate: '',
    showEndDate: '',
    subTitle: '',
    description: '',
    ipLimit: undefined,
    ipPeriod: undefined,
    deviceLimit: undefined,
    devicePeriod: undefined,
    recommendedGames: [],
    days: []
  });

  // 每日奖励编辑抽屉
  const dayEditDrawer = ref<{
    visible: boolean;
    dayIndex: number;
    data: RegisterDailyBonusDayConfigVO;
  }>({
    visible: false,
    dayIndex: -1,
    data: { dayNo: 1, rewardName: '', rewardIconUrl: '', rewardLimit: 0, rewardGoods: [], pushStrategies: [] }
  });

  // 表单验证规则
  const rules = {
    countryCode: [{ required: true, message: '请选择', trigger: 'change' }]
  };

  // 基础配置加载完成后，填充活动专属配置
  const handleBaseLoaded = (data: RegisterDailyBonusConfigVO) => {
    if (!data) return;
    const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
    // 填充限制配置
    form.value.ipLimit = data.ipLimit;
    form.value.ipPeriod = data.ipPeriod;
    form.value.deviceLimit = data.deviceLimit;
    form.value.devicePeriod = data.devicePeriod;
    // 填充推荐游戏（回显图片时拼接域名前缀）
    form.value.recommendedGames = (data.recommendedGames || []).map((item) => ({
      ...item,
      iconUrl: item.iconUrl ? imgBaseUrl + item.iconUrl : item.iconUrl
    }));
    // 填充每日奖励列表（回显图片时拼接域名前缀）
    form.value.days = (data.days || []).map((item) => ({
      ...item,
      rewardIconUrl: item.rewardIconUrl ? imgBaseUrl + item.rewardIconUrl : item.rewardIconUrl
    }));
  };

  // 新增游戏
  const handleAddGame = () => {
    if (!form.value.recommendedGames) {
      form.value.recommendedGames = [];
    }
    form.value.recommendedGames.push({ gameId: undefined, iconUrl: '' });
  };

  // 删除游戏
  const handleDeleteGame = (index: number) => {
    form.value.recommendedGames?.splice(index, 1);
  };

  // 新增天数（打开编辑弹窗）
  const handleAddDay = () => {
    const nextDay = (form.value.days?.length || 0) + 1;
    dayEditDrawer.value = {
      visible: true,
      dayIndex: -1,
      data: {
        dayNo: nextDay,
        rewardName: '',
        rewardIconUrl: '',
        rewardLimit: 0,
        rewardGoods: [],
        pushStrategies: [{ id: undefined, pushes: [] }]
      }
    };
  };

  // 删除天数
  const handleDeleteDay = (index: number) => {
    form.value.days?.splice(index, 1);
  };

  // 复制天数
  const handleCopyDay = (index: number) => {
    const days = form.value.days;
    if (!days || !days[index]) return;
    const source = days[index];
    // 设置新的天数编号（取当前最大dayNo + 1）
    const maxDayNo = days.reduce((max, d) => Math.max(max, d.dayNo || 0), 0);
    const copied: RegisterDailyBonusDayConfigVO = {
      dayNo: maxDayNo + 1,
      rewardName: source.rewardName,
      rewardIconUrl: source.rewardIconUrl,
      rewardLimit: source.rewardLimit,
      rewardGoods: [],
      pushStrategies: []
    };
    // 插入到当前行后面
    days.splice(index + 1, 0, copied);
  };

  // 编辑每日奖励配置（打开抽屉）
  const handleEditDay = (index: number) => {
    const row = form.value.days?.[index];
    if (!row) return;
    dayEditDrawer.value = {
      visible: true,
      dayIndex: index,
      data: JSON.parse(
        JSON.stringify({
          dayNo: row.dayNo,
          rewardName: row.rewardName,
          rewardIconUrl: row.rewardIconUrl,
          rewardLimit: row.rewardLimit,
          rewardGoods: row.rewardGoods || [],
          pushStrategies: row.pushStrategies || []
        })
      )
    };
  };

  // 保存每日奖励编辑（dayIndex=-1表示新增）
  const handleSaveDayEdit = (data: RegisterDailyBonusDayConfigVO) => {
    if (!form.value.days) {
      form.value.days = [];
    }
    if (dayEditDrawer.value.dayIndex >= 0) {
      // 编辑模式：替换已有项
      form.value.days[dayEditDrawer.value.dayIndex] = { ...data };
    } else {
      // 新增模式：追加到列表
      form.value.days.push({ ...data });
    }
  };

  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    reloadRegisterDailyBonusConfig()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  // 保存
  const save = () => {
    formRef.value?.validate((valid) => {
      if (!valid) {
        EleMessage.error('请完善基础配置信息');
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
      // 保存时剥离图片域名前缀
      const stripImgPrefix = (url: string | undefined | null): string | undefined => {
        if (!url || !imgBaseUrl || !url.startsWith(imgBaseUrl)) return url ?? undefined;
        return url.slice(imgBaseUrl.length);
      };
      // 组装提交数据
      const params: RegisterDailyBonusConfigRequest = {
        id: form.value.id,
        countryCode: form.value.countryCode!,
        name: form.value.name,
        jumpType: form.value.jumpType,
        jumpId: form.value.jumpId,
        imgUrl,
        sortNumber: form.value.sortNumber,
        status: form.value.status,
        startDate,
        endDate,
        showStartDate,
        showEndDate,
        description: form.value.description,
        subTitle: form.value.subTitle,
        ipLimit: form.value.ipLimit,
        ipPeriod: form.value.ipPeriod,
        deviceLimit: form.value.deviceLimit,
        devicePeriod: form.value.devicePeriod,
        recommendedGames: (form.value.recommendedGames || []).map((item) => ({
          gameId: item.gameId,
          iconUrl: stripImgPrefix(item.iconUrl)
        })) as RegisterDailyBonusRecommendedGameVO[],
        days: (form.value.days || []).map((item) => ({
          dayNo: item.dayNo,
          rewardName: item.rewardName,
          rewardIconUrl: stripImgPrefix(item.rewardIconUrl),
          rewardLimit: item.rewardLimit,
          rewardGoods: item.rewardGoods || [],
          pushStrategies: item.pushStrategies || []
        })) as RegisterDailyBonusDayConfigVO[]
      };
      saveRegisterDailyBonusConfig(params)
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
    box-shadow: 0 5px 5px 0 rgba(34, 34, 34, 0.1);
    margin: 15px 0;
    border-radius: 15px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
