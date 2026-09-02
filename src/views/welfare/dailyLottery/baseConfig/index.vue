<template>
  <div>
    <ele-card :bordered="false" body-class="card">
      <!-- <template #header>
          <div class="card-header"
              style="display: flex; width: 100%; justify-content: space-between; align-items: center">
              <span style="font-weight: bold; font-size: 20px">新用户弥补损失</span>
          </div>
      </template> -->
      <!-- <div class="title">彩票配置 :</div> -->
      <el-form ref="formRef" :model="form" :rules="rules" label-width="210px">
        <el-row :gutter="16">
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="活动开启:">
              <el-radio-group v-model="form.actOpen" size="large">
                <el-radio :label="1">开</el-radio>
                <el-radio :label="0">关</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="机器人:">
              <el-radio-group v-model="form.robotOpen" size="large">
                <el-radio :label="1">开</el-radio>
                <el-radio :label="0">关</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <!-- <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="活动时间:">
                  <el-date-picker v-model="timeArr" type="daterange" range-separator="至" format="HH:mm:ss"
                      value-format="HH:mm:ss" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期"
                      @change="changeTime" size="large" />
              </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="16">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="上期:">
              <el-input-number clearable :controls="false" placeholder="请输入每期总奖金" v-model.trim="form.prePeriod" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="本期:">
              <el-input-number clearable :controls="false" placeholder="请输入每期总奖金" v-model.trim="form.currentPeriod" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>

          <!-- <el-row :gutter="16"> -->
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="每期总奖金:" prop="jackpot">
              <el-input-number clearable :controls="false" placeholder="请输入每期总奖金" v-model.trim="form.jackpot" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="本期开奖日期:" prop="openDate">
              <el-date-picker v-model="form.openDate"  type="date"   format="YYYY-MM-DD"
                              value-format="YYYY-MM-DD" placeholder="请选择本期开奖日期" size="large" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="下注截止时间:" prop="betOverTime">
              <el-time-picker v-model="form.betOverTime" format="HH:mm:ss" value-format="HH:mm:ss" placeholder="请选择下注截止时间" size="large" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="每日开奖时间:" prop="openTime">
              <el-time-picker v-model="form.openTime" format="HH:mm:ss" value-format="HH:mm:ss" placeholder="请选择每日开奖时间" size="large" style="width: 100%" />
            </el-form-item>
          </el-col>
          <!-- <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="任务重置时间:" prop="resetTime">
              <el-time-picker v-model="form.resetTime" format="HH:mm:ss" value-format="HH:mm:ss" placeholder="请选择任务重置时间" size="large" style="width: 100%" />
            </el-form-item>
          </el-col> -->
          <!-- <el-col :md="12" :sm="24" :xs="24">
                  <el-form-item label="新一期下注开始时间:" >
                      <el-date-picker v-model="form.nextTime" type="date" format="HH:mm:ss"
                          value-format="HH:mm:ss" placeholder="请选择新一期下注开始时间" size="large" style="width: 100%" />
                  </el-form-item>
              </el-col> -->
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="彩票奖金提现流水倍率:" prop="waterFlowMul">
              <el-input-number clearable :controls="false" placeholder="请输入彩票奖金提现流水倍率" v-model.trim="form.waterFlowMul" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="公告间隔时间(分):" prop="announceInterval">
              <el-input-number clearable :controls="false" placeholder="请输入间隔时间" v-model.trim="form.announceInterval" :min="0" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="公告下一次时间:" prop="announceNextTime">
              <span>{{ form.announceNextTime ? formatTimestamp(form.announceNextTime) : '' }}</span>
            </el-form-item>
          </el-col>
          <!-- </el-row> -->
          <!-- <div class="title">开奖配置 :</div>
          <el-row>
              <el-col :md="12" :sm="24" :xs="24">
                  <el-form-item label="手动开奖:" >
                      <el-input-number clearable :controls="false" placeholder="请输入手动开奖"
                          v-model.trim="form.openAward" style="width: 100%" size="large" />
                  </el-form-item>
                  <div class="tips">
                      *需在下注截止时间至系统开奖时间之间手动开奖若无手动开奖，则由系统自动开奖
                  </div>
              </el-col>
          </el-row> -->
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
    </ele-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { getDailyLottery, saveDailyLotteryConf, sendConfServer } from '@/api/conf';
  import { assignObject } from 'ele-admin-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { ElForm, FormRules } from 'element-plus';

  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const form = ref({
    jsonType: 'LotterActConf',
    actOpen: 0,
    jackpot: 0,
    robotOpen: 0,
    betOverTime: '',
    resetTime: '',
    openTime: '',
    openDate: '',
    waterFlowMul: 0,
    currentPeriod: 0,
    prePeriod: 0,
    announceInterval: 0,
    announceNextTime: 0
  });
  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    jackpot: [
      {
        required: true,
        type: 'number',
        message: '请输入每期总奖金',
        trigger: 'blur'
      }
    ],
    betOverTime: [
      {
        required: true,
        type: 'string',
        message: '请输入下注截止时间',
        trigger: 'blur'
      }
    ],
    openTime: [
      {
        required: true,
        type: 'string',
        message: '请输入每日开奖时间',
        trigger: 'blur'
      }
    ],
    announceInterval: [
      {
        required: true,
        type: 'number',
        message: '请输入间隔时间',
        trigger: 'blur'
      }
    ],
    waterFlowMul: [
      {
        required: true,
        type: 'number',
        message: '请输入彩票奖金提现流水倍率',
        trigger: 'blur'
      }
    ]
  });
  // 获取基础配置信息
  const loadingAppConf = () => {
    getDailyLottery().then((data) => {
      form.value = assignObject(form.value, data || {});
      form.value.jsonType = 'LotterActConf';
      form.value.robotOpen = data?.robotOpen ? 1 : 0;
      form.value.actOpen = data?.actOpen ? 1 : 0;
    });
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    sendConfServer(21)
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
    let params = { ...form.value };

    saveDailyLotteryConf(params)
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

<style lang="scss" scoped>
  ::v-deep .el-divider__text {
    font-weight: bold;
    font-size: 20px;
  }

  .title {
    padding-left: 30px;
    font-weight: bold;
    font-size: 20px;
    margin: 20px 0;
  }

  .form-table .el-form-item {
    margin-bottom: 0 !important;
  }

  :deep(.el-form-item__label) {
    font-size: 18px;
  }

  .tips {
    color: red;
    margin-left: 110px;
  }

  ::v-deep .el-tabs--left {
    height: 100%;
  }

  // ::v-deep .ele-page.is-multi-card {
  //     height: 100%;
  // }

  ::v-deep .el-tabs--left .el-tabs__item.is-left {
    flex: 1;
  }
</style>
