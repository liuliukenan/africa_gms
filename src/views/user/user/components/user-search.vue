<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="20">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.countryCode')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.uid')">
            <el-input-number :min="1" v-model="form.uid" :placeholder="t('common.placeholder.input')" :controls="false" class="ele-fluid" style="width: 100%" clearable @enter.native="search" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.phone')">
            <el-input clearable v-model.trim="form.phone" :placeholder="t('common.placeholder.input')">
              <!-- <template #prefix>
                +254
              </template> -->
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="用户类型">
            <dict-data code="statUserTypeOfPayAndWithdraw" v-model="form.userType" valueType="number" />
          </el-form-item>
        </el-col> -->

        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.agentType')">
            <el-select v-model="form.agentType" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option :label="t('user.userList.userSearch.agentType0')" :value="0" />
              <el-option :label="t('user.userList.userSearch.agentType1')" :value="1" />
              <el-option :label="t('user.userList.userSearch.agentType2')" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.device')">
            <el-input clearable v-model.trim="form.device" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.channel')">
            <!-- <dict-data code="shareChannel" valueType="number" v-model="form.channel" placeholder="请选择渠道" /> -->
            <el-select v-model="form.channel" :placeholder="t('common.placeholder.select')" style="width: 100%" filterable clearable @change="search">
              <el-option v-for="item in configStore.ShareChannelArr" :key="item.id" :label="item.channelName" :value="item.channel || 0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道类型">
            <dict-data code="channelNewType" valueType="number" v-model="form.channelType" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.inviterId')">
            <el-input-number :min="1" v-model="form.inviterId" :placeholder="t('common.placeholder.input')" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="VIP">
            <dict-data code="svip" valueType="number" v-model="form.vipLevel" placeholder="请选择" />
          </el-form-item>
        </el-col> -->

        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.registerIp')">
            <el-input clearable v-model.trim="form.registerIp" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.loginIp')">
            <el-input clearable v-model.trim="form.loginIp" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="用户名">
            <el-input clearable v-model.trim="form.nickname" placeholder="请输入" />
          </el-form-item>
        </el-col> -->
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.state')">
            <dict-data code="userState" valueType="number" v-model="form.state" :placeholder="t('common.placeholder.select')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.online')">
            <dict-data code="onlineType" valueType="number" v-model="form.online" :placeholder="t('common.placeholder.select')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.registerTime')">
            <el-date-picker v-model="registerArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.loginTime')">
            <el-date-picker v-model="loginArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userList.userSearch.rechargeTime')">
            <el-date-picker v-model="PayArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="4" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
            <el-button @click="reset">{{ t('action.reset') }}</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>{{ t('action.collapse') }}</span>
                <el-icon style="vertical-align: -1px">
                  <ArrowUp />
                </el-icon>
              </template>
              <template v-else>
                <span>{{ t('action.expand') }}</span>
                <el-icon style="vertical-align: -2px">
                  <ArrowDown />
                </el-icon>
              </template>
            </el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ArrowDown, ArrowUp } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import type { UserParam } from '@/api/model/user';
  import { useRoute } from 'vue-router';
  import { useConfigStore } from '@/store/modules/config';
  import dayjs from 'dayjs';
  
  const { t } = useI18n();
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: UserParam): void;
  }>();
  const $route = useRoute();
  /** 表单数据 */
  const [form, resetFields] = useFormData<UserParam>({
    uid: $route.query.id ? Number($route.query.id) : undefined,
    device: undefined,
    countryCode: configStore.countryArr?.[0]?.code || '',
    channel: undefined,
    channelType: undefined,
    phone: undefined,
    state: undefined,
    loginIp: undefined,
    online: undefined,
    inviterId: undefined,
    vipLevel: undefined,
    registerIp: undefined,
    agentType: undefined,
    startDate: undefined,
    endDate: undefined,
    lastLoginStartDate: undefined,
    lastLoginEndDate: undefined,
    lastPayStartDate: undefined,
    lastPayEndDate: undefined,
    nickname: undefined,
    userType: undefined
  });
  /** 搜索表单是否展开 */
  const searchExpand = ref(false);
  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  let registerArr = ref<[string, string]>(['', '']);
  let loginArr = ref<[string, string]>(['', '']);
  let PayArr = ref<[string, string]>(['', '']);

  const dateRange = ref<[string, string]>(['', '']);
  /* 搜索 */
  const search = () => {
    const [startDate, endDate] = registerArr.value || [];
    const [lastLoginStartDate, lastLoginEndDate] = loginArr.value || [];
    const [lastPayStartDate, lastPayEndDate] = PayArr.value || [];
    // 如果用户前缀输入了254，就直接传254，如果没输入254，就默认加254
    // let phone: string | undefined;
    // if (form.phone?.startsWith('254')) {
    //   phone = form.phone
    // } else if (form.phone) {
    //   phone = '254' + form.phone;
    // } else {
    //   phone = undefined;
    // }
    // if (form.state == 2) {
    //   form.state = undefined;
    // }
    // if (form.online == 2) {
    //   form.online = undefined;
    // }
    emit('search', { ...form, startDate, endDate, lastLoginStartDate, lastLoginEndDate, lastPayStartDate, lastPayEndDate });
  };
  /**  重置 */
  const reset = () => {
    resetFields();
    form.uid = undefined;
    form.phone = undefined;
    registerArr.value = ['', ''];
    loginArr.value = ['', ''];
    PayArr.value = ['', ''];
    dateRange.value = ['', ''];
    search();
  };

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  const searchParams = () => {
    const [startDate, endDate] = dateRange.value || [];
    return { ...form, startDate, endDate };
  };
  defineExpose({
    searchParams,
    search
  });
</script>
