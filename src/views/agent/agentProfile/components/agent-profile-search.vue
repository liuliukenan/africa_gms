<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="代理ID">
            <el-input clearable v-model.trim="form.agentId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道">
            <el-select v-model="form.channel" placeholder="请选择渠道" style="width: 100%" @change="search" filterable>
              <el-option v-for="item in configStore.ShareChannelArr" :key="item.id" :label="item.channelName" :value="item.channel|| 0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="代理等级">
            <el-input clearable v-model.trim="form.agentLevel" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="代理类型">
             <el-select v-model="form.agentType" placeholder="请选择代理类型" style="width: 100%" clearable>
              <el-option label="总代理" value="1" />
              <el-option label="普通代理" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="佣金模式">
            <el-select v-model="form.commissionModel" placeholder="请选择佣金模式" style="width: 100%" clearable>
              <el-option label="CPA" value="0" />
              <el-option label="Revenue Share" value="1" />
              <el-option label="Hybrid" value="2" />
              <el-option label="Turnover" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
         <el-col v-show="searchExpand" :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item label="代理注册时间">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search"
              range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
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
  import type { AgentProfileParam } from '@/api/agent/model/agentProfile';
  import { useConfigStore } from '@/store/modules/config';
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: AgentProfileParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<AgentProfileParam>({
    id: undefined,
    agentId: undefined,
    countryCode: 254,
    channel: undefined,
    inviterAgentId: undefined,
    agentLevel: undefined,
    agentType: undefined,
    commissionModel: undefined,
    startDate: undefined,
    endDate: undefined,
  });
  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  let timeArr = ref<[string, string] | undefined>(undefined);
  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  /** 搜索 */
  const search = () => {
      const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form,  startDate, endDate });
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
