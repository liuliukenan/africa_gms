<template>
  <el-row :gutter="16">
    <!-- 国家 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.country')" prop="countryCode">
        <el-select v-model="model.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="handleCountryChange">
          <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
    </el-col>
    <!-- 活动名称 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.activityName')" prop="name">
        <el-input clearable :placeholder="t('common.placeholder.input')" v-model="model.name" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 副标题 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.activitySubTitle')" prop="subTitle">
        <el-input clearable :placeholder="t('common.placeholder.input')" v-model="model.subTitle" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 活动状态 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.activityStatus')" prop="status">
        <el-radio-group v-model="model.status" size="large">
          <el-radio :value="true">{{ t('activityConfig.baseConfig.switchOn') }}</el-radio>
          <el-radio :value="false">{{ t('activityConfig.baseConfig.switchOff') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <!-- 跳转类型 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.jumpType')" prop="jumpType">
        <dict-data code="actionType2" v-model="model.jumpType" valueType="number" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="changeType" />
      </el-form-item>
    </el-col>
    <!-- 跳转目标 -->
    <el-col :md="8" :sm="24" :xs="24" v-if="model.jumpType">
      <el-form-item :label="title" prop="jumpId">
        <el-select v-model="model.jumpId" :placeholder="t('common.placeholder.select')" style="width: 100%" v-if="model.jumpType == '3' || model.jumpType == '4'">
          <el-option v-for="item in jumpIdArr" :key="item.id" :label="item.jumpName" :value="item.id" />
        </el-select>
        <el-input clearable :placeholder="t('activityConfig.baseConfig.jumpParam')" v-model="model.jumpId" style="width: 100%" v-if="model.jumpType == '2'" />
      </el-form-item>
    </el-col>
    <!-- 排序 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.sortNumber')" prop="sortNumber">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.sortNumber" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 活动开始/结束时间 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.activityStartTime')" prop="timeArr">
        <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 预热时间 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.activityWarmupTime')" prop="timeArr2">
        <el-date-picker v-model="timeArr2" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 活动描述 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.baseConfig.activityDescription')" prop="description">
        <el-input clearable :placeholder="t('common.placeholder.input')" v-model="model.description" type="textarea" :rows="3" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 活动图片 -->
    <el-col :md="8" :sm="24" :xs="24" v-if="!hideImage">
      <el-form-item :label="t('activityConfig.baseConfig.image')" prop="imgUrl">
        <image-upload
          :limit="1"
          :model-value="model.imgUrl ?? ''"
          @update:model-value="(val: string) => (model.imgUrl = val)"
          accept="image/*"
          :item-style="{
            width: '120px',
            height: '120px',
            background: 'var(--el-fill-color-lighter)',
            '--ele-upload-list-padding': 0
          }"
          :button-style="{ width: '120px', height: '120px' }"
          category="1"
          fileName="activitys"
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useConfigStore } from '@/store/modules/config';
  import ImageUpload from '@/components/ImageUpload/index.vue';
  import { toDateString, toDateZone } from '@/utils/utils';
  import { byTypeGetList } from '@/api/platform/faceShotApi';

  const props = defineProps<{
    /** 表单模型（v-model），包含基础配置字段 */
    modelValue: any;
    /** 获取活动配置API */
    getApi: (countryCode: number) => Promise<any>;
    /** 是否隐藏活动图片上传（默认 false） */
    hideImage?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', val: any): void;
    /** 基础配置加载完成后触发，透传原始返回数据，供父组件处理专属配置 */
    (e: 'loaded', data: any): void;
  }>();

  const { t } = useI18n();
  const configStore = useConfigStore();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });

  // 跳转目标标签
  const title = ref(t('activityConfig.baseConfig.gameId'));
  const jumpIdArr = ref<any[]>([]);

  // 根据类型获取列表
  const changeType = (val: number | string) => {
    const jumpTypeNum = Number(val);
    model.value.jumpId = undefined;
    if (jumpTypeNum === 3 || jumpTypeNum === 4) {
      title.value = t('activityConfig.baseConfig.jumpPage');
      getList(jumpTypeNum);
    } else if (jumpTypeNum === 2) {
      title.value = t('activityConfig.baseConfig.jumpParam');
    } else {
      title.value = t('activityConfig.baseConfig.gameId');
    }
  };

  const getList = (val: any) => {
    return byTypeGetList(val).then((res) => {
      jumpIdArr.value = res || [];
      return res;
    });
  };

  // 日期范围（由组件内部维护）
  const timeArr = ref<[string, string]>(['', '']);
  const timeArr2 = ref<[string, string]>(['', '']);

  // 加载基础配置并填充表单与日期
  const loadingAppConf = () => {
    return props.getApi(props.modelValue.countryCode).then(async (data) => {
      if (!data) return data;
      // 回显图片时拼接域名前缀
      let imgUrl = data.imgUrl;
      if (imgUrl) {
        imgUrl = import.meta.env.VITE_APP_IMG_URL + data.imgUrl;
      }
      // 回显跳转类型（jumpType 为 number，兼容 string；不调用 changeType 以避免清空已回显的 jumpId）
      const jumpTypeNum = Number(data.jumpType);
      let jumpId = data.jumpId;
      // 跳转页面(3/4)为下拉选择，选项 value 是 number；接口返回的 jumpId 是 string，需统一转成 number 才能匹配到 label
      if (jumpTypeNum === 3 || jumpTypeNum === 4) {
        if (jumpId !== undefined && jumpId !== null && jumpId !== '') {
          jumpId = Number(jumpId);
        }
      }
      emit('update:modelValue', { ...props.modelValue, ...data, imgUrl, jumpId });
      // 填充日期范围
      if (data.startDate || data.endDate) {
        timeArr.value = [toDateZone(Number(data.startDate) * 1000, 254), toDateZone(Number(data.endDate) * 1000, 254)];
      }
      if (data.showStartDate || data.showEndDate) {
        timeArr2.value = [toDateZone(Number(data.showStartDate) * 1000, 254), toDateZone(Number(data.showEndDate) * 1000, 254)];
      }
      if (jumpTypeNum === 3 || jumpTypeNum === 4) {
        title.value = t('activityConfig.baseConfig.jumpPage');
        // 等待跳转选项加载完成，并等 DOM 更新，确保 el-select 能匹配到 label
        await getList(jumpTypeNum);
        await nextTick();
      } else if (jumpTypeNum === 2) {
        title.value = t('activityConfig.baseConfig.jumpParam');
      } else {
        title.value = t('activityConfig.baseConfig.gameId');
      }
      return data;
    });
  };

  // 国家切换时重新加载配置，并通知父组件处理专属配置
  const handleCountryChange = () => {
    loadingAppConf().then((data) => {
      emit('loaded', data);
    });
  };

  defineExpose({
    loadingAppConf,
    timeArr,
    timeArr2
  });
</script>
