<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col  :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道">
            <el-select v-model="form.channel" placeholder="请选择渠道" style="width: 100%" @change="search" filterable>
              <el-option v-for="item in configStore.ShareChannelArr" :key="item.id" :label="item.channelName" :value="item.channel|| 0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="上级代理ID">
            <el-input clearable v-model.trim="form.inviterAgentId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col   :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="玩家ID">
            <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="累计投注次数">
                        <el-input  clearable  v-model.trim="form.totalBetCnt"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="累计获奖次数">
                        <el-input  clearable  v-model.trim="form.totalRewardCnt"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="累计充值申请次数">
                        <el-input  clearable  v-model.trim="form.totalPayApplyCnt"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="累计充值成功次数">
                        <el-input  clearable  v-model.trim="form.totalPaySuccessCnt"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="累计提现申请次数">
                        <el-input  clearable  v-model.trim="form.totalWithdrawApplyCnt"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="累计提现成功次数">
                        <el-input  clearable  v-model.trim="form.totalWithdrawSuccessCnt"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="累计登录天数">
                        <el-input  clearable  v-model.trim="form.totalLoginDays"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="手机号">
            <el-input clearable v-model.trim="form.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item label="玩家注册时间">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
        <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="贡献">
                        <el-input  clearable  v-model.trim="form.totalContribution"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <el-col :lg="5" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>收起</span>
                <el-icon style="vertical-align: -1px">
                  <ArrowUp />
                </el-icon>
              </template>
              <template v-else>
                <span>展开</span>
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
  import { ArrowDown, ArrowUp } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import type { AgentUserProfileParam } from '@/api/agent/model/agentUserProfile';
  import { useConfigStore } from '@/store/modules/config';
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: AgentUserProfileParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<AgentUserProfileParam>({
    id: undefined,
    inviterAgentId: undefined,
    uid: undefined,
    countryCode: 254,
    channel: undefined,
    totalBetCnt: undefined,
    totalRewardCnt: undefined,
    totalPayApplyCnt: undefined,
    totalPaySuccessCnt: undefined,
    totalWithdrawApplyCnt: undefined,
    totalWithdrawSuccessCnt: undefined,
    totalLoginDays: undefined,
    phone: '',
    totalContribution: undefined
  });
  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  let timeArr = ref<[string, string] | undefined>(undefined);
  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  /** 搜索 */
  const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    timeArr.value = undefined;
    search();
  };

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
</script>
