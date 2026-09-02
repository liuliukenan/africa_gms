<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="代理类型">
            <el-select v-model="form.agentType" placeholder="请选择代理类型" style="width: 100%" clearable>
              <el-option label="总代理" value="1" />
              <el-option label="普通代理" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="代理等级">
            <el-input clearable v-model.trim="form.agentLevel" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="分润模式">
            <el-select v-model="form.commissionModel" placeholder="请选择佣金模式" style="width: 100%" clearable>
              <el-option label="CPA" value="0" />
              <el-option label="Revenue Share" value="1" />
              <el-option label="Hybrid" value="2" />
              <el-option label="Turnover" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="需满足的升级条件个数，满足其中N条即可升级">
            <el-input clearable v-model.trim="form.upgradeConditionCount" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="[RS] 总付费人数阈值（仅普代直属下属）">
            <el-input clearable v-model.trim="form.rsTotalPaidUserCount" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="[RS] 结算周期内新增付费用户阈值（仅普代直属下属）">
            <el-input clearable v-model.trim="form.rsCycleNewPaidUserCount" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="[CPA] 总付费人数阈值（仅普代直属下属）">
            <el-input clearable v-model.trim="form.cpaTotalPaidUserCount" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="[CPA] 周期内新增付费用户阈值（仅普代直属下属）">
            <el-input clearable v-model.trim="form.cpaCycleNewPaidUserCount" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="[MA] 总付费人数阈值（含直属+普代直属）">
            <el-input clearable v-model.trim="form.maTotalPaidUserCount" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="[MA] 结算周期内新增付费用户阈值（含直属+普代直属）">
            <el-input clearable v-model.trim="form.maCycleNewPaidUserCount" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="12" :sm="12" :xs="24">
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
  import type { AgentLevelConfigParam } from '@/api/agent/model/agentLevelConfig';

  const emit = defineEmits<{
    (e: 'search', where?: AgentLevelConfigParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<AgentLevelConfigParam>({
    id: undefined,
    agentType: undefined,
    agentLevel: undefined,
    commissionModel: undefined,
    upgradeConditionCount: undefined,
    rsTotalPaidUserCount: undefined,
    rsCycleNewPaidUserCount: undefined,
    cpaTotalPaidUserCount: undefined,
    cpaCycleNewPaidUserCount: undefined,
    maTotalPaidUserCount: undefined,
    maCycleNewPaidUserCount: undefined
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  /** 搜索 */
  const search = () => {
    emit('search', { ...form });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    search();
  };

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
</script>
