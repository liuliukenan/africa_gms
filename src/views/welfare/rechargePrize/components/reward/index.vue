<template>
  <div style="margin-top: 20px">
    <el-form ref="formRef" :model="form" label-width="130px">
      <el-row :gutter="20">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="每充值金额:" prop="amount">
            <el-input-number clearable :controls="false" placeholder="请输入每充值金额" v-model.trim="form.amount" style="width: 100%" size="large" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="机器人下次时间:" prop="robotNextTime">
            {{ form.robotNextTime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="奖金提现流水倍数:" prop="waterFlowMult">
            <el-input-number clearable :controls="false" placeholder="请输入奖金提现流水倍数" v-model.trim="form.waterFlowMult" style="width: 100%" size="large" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :md="12" :sm="24" :xs="24">
        <el-form-item label="机器人频率区间(分):" prop="robotFrequenciesStr">
          <el-input clearable placeholder="请输入机器人频率区间" v-model.trim="form.robotFrequenciesStr" size="large" />
        </el-form-item>
      </el-col>
      <el-row :gutter="20">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="奖励数组:" prop="robotAwardsStr">
            <el-input clearable placeholder="请输入奖励数组" v-model.trim="form.robotAwardsStr" size="large" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="padding: 20px 0">
      <el-button type="primary" size="large" @click="save">保存</el-button>
      <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()" width="200">
        <template #reference>
          <el-button type="danger" size="large" class="ele-btn-icon">
            <span>发送服务器</span>
          </el-button>
        </template>
      </el-popconfirm>
    </div>
    <!-- <BaseEditTable :columns="tableColumns" title="新手充值次数配置" :getListApi="getList" :saveApi="saveList"
        :deleteApi="deleteList" /> -->
  </div>
</template>

<script setup lang="ts">
  import { ElForm } from 'element-plus';
  import { ref } from 'vue';
  import { assignObject, EleMessage } from 'ele-admin-plus';
  // import BaseEditTable from '@/components/BaseEditTable/index.vue';
  import { getWheelConf, saveWheelConf, sendConfServer } from '@/api/conf';

  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const form = ref({
    jsonType: 'DayWheelActConf',
    amount: 0,
    robotNextTime: 0,
    waterFlowMult: 0,
    robotFrequencies: [],
    robotFrequenciesStr: '[]',
    robotAwards: [],
    robotAwardsStr: '[]'
  });

  // 获取表格tableData的列数据
  const tableColumns = [
    { label: '奖励', prop: 'payMax', placeholder: '请输入奖励', type: 'txt' },
    { label: '数量', prop: 'payMin', placeholder: '请输入数量' },
    { label: '奖励类型', prop: 'payMin', placeholder: '请输入奖励类型', type: 'select', code: 'gameType' },
    { label: '中奖权重', prop: 'payMin', placeholder: '请输入中奖权重' },
    { label: '当前库存', prop: 'payMin', placeholder: '请输入当前库存' }
  ];
  // 删除表格tableData数据
  const deleteList = async (index: number, data: any[]) => {
    try {
      const res = await fetch(`/api/deleteUserWinLimitConf/${data[index].key}`, { method: 'DELETE' });
      return res || '删除成功';
    } catch (error) {
      throw new Error('删除数据失败');
    }
  };
  // 获取表格tableData数据
  const getList = async () => {};
  const saveList = async () => {};

  // 获取基础配置信息
  const loadingAppConf = () => {
    getWheelConf().then((data) => {
      form.value = assignObject(form.value, data || {});
      form.value.jsonType = 'DayWheelActConf';
      form.value.robotFrequenciesStr = JSON.stringify(data?.robotFrequencies);
      form.value.robotAwardsStr = JSON.stringify(data?.robotAwards);
    });
  };

  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    sendConfServer(22)
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
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    form.value.robotFrequencies = JSON.parse(form.value.robotFrequenciesStr || '[]');
    form.value.robotAwards = JSON.parse(form.value.robotAwardsStr || '[]');
    let params = { ...form.value };

    saveWheelConf(params)
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
        loadingAppConf();
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  loadingAppConf();
</script>

<style scoped></style>
