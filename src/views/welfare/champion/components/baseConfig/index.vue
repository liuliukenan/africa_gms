<template>
  <div>
    <ele-card :bordered="false" style="margin: 20px 20px 0; height: 100%" body-class="card">
      <!-- <div class="title">我是冠军 :</div> -->
      <el-form ref="formRef" :model="form" :rules="rules" label-width="210px">
        <el-row :gutter="16">
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="活动开启:">
              <el-radio-group v-model="form.open" size="large">
                <el-radio :value="true">开</el-radio>
                <el-radio :value="false">关</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="上期:" prop="prePeriods">
              <el-input-number clearable :controls="false" placeholder="请输入上期" v-model.trim="form.prePeriods" style="width: 100%" size="large" />
              <span class="tip">期号格式=当日时间加上当日期号</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="本期:" prop="currPeriods">
              <el-input-number clearable :controls="false" placeholder="请输入本期" v-model.trim="form.currPeriods" style="width: 100%" size="large" />
              <span class="tip">期号格式=当日时间加上当日期号</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="当日第几期:" prop="num">
              <el-input-number clearable :controls="false" placeholder="当日第几期" v-model.trim="form.num" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="本期奖池:" prop="currAward">
              <el-input-number clearable :controls="false" placeholder="请输入本期奖池" v-model.trim="form.currAward" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="上期奖池:" prop="preAward">
              {{form.preAward}}
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="开奖日期:" prop="openDate">
              <el-date-picker v-model="form.openDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="请选择开奖日期" size="large" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="基础奖池:" prop="baseAward">
              <el-input-number clearable :controls="false" placeholder="请输入基础奖池" v-model.trim="form.baseAward" style="width: 100%" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="奖池每秒增加区间:" prop="addAwardsStr">
              <el-input clearable placeholder="请输入奖池每秒增加金额区间" v-model="form.addAwardsStr" size="large" />
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="奖金权重:" prop="awardWeightStr">
              <el-input clearable placeholder="请输入奖金权重" v-model="form.awardWeightStr" size="large" />
              <span class="tip">1~10名奖金分取权重</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="机器人数量区间:" prop="robotNumStr">
              <el-input clearable placeholder="请输入机器人数量区间" v-model="form.robotNumStr" size="large" />
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="机器人倍数区间:" prop="robotMutisStr">
              <el-input clearable placeholder="请输入机器人倍数区间" v-model="form.robotMutisStr" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="机器人参与间隔(分):" prop="robotTimesStr">
              <el-input clearable placeholder="请输入机器人参与区间" v-model="form.robotTimesStr" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="公告触发时间区间:" prop="announceTimesStr">
              <el-input clearable placeholder="请输入公告触发时间区间" v-model="form.announceTimesStr" size="large" />
            </el-form-item>
          </el-col>
          <!-- <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="下次公告时间:" prop="annnounceNextTime">
              <el-input-number :controls="false" clearable placeholder="请输入下次公告时间" v-model="form.annnounceNextTime" size="large" style="width: 100%;"/>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="10">
          <el-col :lg="6" :md="12" :sm="24" :xs="24">
            <el-form-item label="开奖时间1:" prop="openTime1">
              <el-time-picker v-model="form.openTime1" format="HH:mm" value-format="HH:mm:ss" placeholder="请选择开奖时间1" size="large" :disabled-seconds="disabledSeconds" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="24" :xs="24">
            <el-form-item label="开奖时间2:" prop="openTime2">
              <el-time-picker v-model="form.openTime2" format="HH:mm" value-format="HH:mm:ss" @change="changeTime2" placeholder="请选择开奖时间2" size="large" :disabled-seconds="disabledSeconds" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="24" :xs="24">
            <el-form-item label="开奖时间3:" prop="openTime3">
              <el-time-picker v-model="form.openTime3" format="HH:mm" value-format="HH:mm:ss" placeholder="请选择开奖时间3" size="large" :disabled-seconds="disabledSeconds" />
            </el-form-item>
          </el-col>
          <el-col  :lg="6" :md="12" :sm="24" :xs="24">
            <el-form-item label="开奖时间4:" prop="openTime4">
              <el-time-picker v-model="form.openTime4" format="HH:mm" value-format="HH:mm:ss" placeholder="请选择开奖时间4" size="large" :disabled-seconds="disabledSeconds" />
              <span class="tip">最后一时间不能填00:00</span>
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
    </ele-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { getChampion, saveChampion } from '@/api/welfare/champion';
  import { sendConfServer } from '@/api/conf/index';
  import { assignObject } from 'ele-admin-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { ElForm, FormRules } from 'element-plus';
  import type { Champion } from '@/api/welfare/model';

  const disabledSeconds = () => {
    return Array.from({ length: 59 }, (_, i) => i + 1); // 禁用1-59秒
  };
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const form = ref<Champion>({
    jsonType: 'ChampConf',
    open: true,
    openTime: [],
    openTime1: '',
    openTime2: '',
    openTime3: '',
    openTime4: '',
    openDate: '',
    currAward: 0,
    preAward: 0,
    prePeriods: 0,
    currPeriods: 0,
    num: 0,
    baseAward: 0,
    awardWeights: [],
    awardWeightStr: '[]',
    addAwards: [],
    addAwardsStr: '[]',
    robotNums: [],
    robotNumStr: '[]',
    robotMutis: [],
    robotMutisStr: '[]',
    robotTimes: [],
    robotTimesStr: '[]',
    announceTimes: [],
    announceTimesStr: '[]',
    annnounceNextTime: 0,
  });
  const changeTime2 = (val: string) => {
    // if(form.value.openTime1) EleMessage.warning('请先设置开奖时间1!');
  };
  // 获取基础配置信息
  const loadingAppConf = () => {
    getChampion().then((data) => {
      form.value = assignObject(form.value, data || {});
      form.value.jsonType = 'ChampConf';
      form.value.awardWeightStr = JSON.stringify(data?.awardWeights);
      form.value.addAwardsStr = JSON.stringify(data?.addAwards);
      form.value.robotNumStr = JSON.stringify(data?.robotNums);
      form.value.robotMutisStr = JSON.stringify(data?.robotMutis);
      form.value.robotTimesStr = JSON.stringify(data?.robotTimes);
      form.value.announceTimesStr = JSON.stringify(data?.announceTimes);
      form.value.openTime1 = data?.openTime ? data?.openTime[0] : '';
      form.value.openTime2 = data?.openTime ? data?.openTime[1] : '';
      form.value.openTime3 = data?.openTime ? data?.openTime[2] : '';
      form.value.openTime4 = data?.openTime ? data?.openTime[3] : '';
    });
  };
  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    sendConfServer(25)
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
    if (!formRef.value) return;
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      form.value.awardWeights = JSON.parse(form.value.awardWeightStr || '[]');
      form.value.addAwards = JSON.parse(form.value.addAwardsStr || '[]');
      form.value.robotNums = JSON.parse(form.value.robotNumStr || '[]');
      form.value.robotMutis = JSON.parse(form.value.robotMutisStr || '[]');
      form.value.robotTimes = JSON.parse(form.value.robotTimesStr || '[]');
      form.value.announceTimes = JSON.parse(form.value.announceTimesStr || '[]');
      if (form.value.openTime1 && form.value.openTime2 && form.value.openTime3 && form.value.openTime4) {
        form.value.openTime = [form.value.openTime1, form.value.openTime2, form.value.openTime3, form.value.openTime4];
      }
      let params = { ...form.value };
      console.log(params);
      saveChampion(params)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          loadingAppConf();
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    });
  };

  loadingAppConf();
const validateTen = (_, value, callback) => {
  if (!value) {
    callback(new Error('请输入权重'));
    return;
  }

  // 检查格式是否符合 [num, num, ..., num]（10个数字）
  const isValidFormat = /^\[\s*(\d+\s*,\s*){9}\d+\s*\]$/.test(value);
  if (!isValidFormat) {
    callback(new Error('格式必须为英文方括号包裹,英文逗号分隔的 10 个数字，例如: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]'));
    return;
  }

  // 提取数字
  const numbers = value.match(/\d+/g).map(Number);
  
  // 检查是否10个数字且都>=0
  if (numbers.length !== 10 || numbers.some((num) => num < 0)) {
    callback(new Error('必须包含 10 个大于等于 0 的数字'));
    return;
  }

  // 新增检查：数字之和必须等于100
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  if (sum !== 100) {
    callback(new Error('10个数字之和必须等于100'));
    return;
  }

  callback(); // 验证通过
};
  // 检查格式是否符合 [两位数,两位数]
  const validateTwo = (rule, value, callback) => {
    if (value) {
      const isValidFormat = /^\[\s*\d+\s*,\s*\d+\s*\]$/.test(value);
      if (!isValidFormat) {
        callback(new Error('格式必须为 [数字,数字]，例如: [10,20]'));
        return;
      }
      callback(); // 验证通过
    }
  };
  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    prePeriods: [
      {
        required: true,
        type: 'number',
        message: '请输入上期',
        trigger: 'blur'
      }
    ],
    currPeriods: [
      {
        required: true,
        type: 'number',
        message: '请输入本期',
        trigger: 'blur'
      }
    ],
    currAward: [
      {
        required: true,
        type: 'number',
        message: '请输入奖池',
        trigger: 'blur'
      }
    ],
    num: [
      {
        required: true,
        type: 'number',
        message: '请输入数量',
        trigger: 'blur'
      }
    ],
    baseAward: [
      {
        required: true,
        type: 'number',
        message: '请输入基础奖池',
        trigger: 'blur'
      }
    ],
    openDate: [
      {
        required: true,
        type: 'string',
        message: '请输入开奖日期',
        trigger: 'blur'
      }
    ],
    announceTimesStr: [
      {
        required: true,
        type: 'string',
        message: '请输入公告触发时间区间',
        trigger: 'blur'
      },
      { validator: validateTwo, trigger: 'blur' }
    ],
    awardWeightStr: [
      {
        required: true,
        type: 'string',
        message: '请输入请输入权重',
        trigger: 'blur'
      },
      { validator: validateTen, trigger: 'blur' }
    ],
    robotNumStr: [
      {
        required: true,
        type: 'string',
        message: '请输入机器人数量区间',
        trigger: 'blur'
      },
      { validator: validateTwo, trigger: 'blur' }
    ],
    robotMutisStr: [
      {
        required: true,
        type: 'string',
        message: '请输入机器人倍数区间',
        trigger: 'blur'
      },
      { validator: validateTwo, trigger: 'blur' }
    ],
    robotTimesStr: [
      {
        required: true,
        type: 'string',
        message: '请输入机器人参与时间',
        trigger: 'blur'
      },
      { validator: validateTwo, trigger: 'blur' }
    ],
    openTime1: [{ required: true, message: '请选择开奖时间1', trigger: 'change' }],
    openTime2: [
      // { required: true, message: '请选择开奖时间2', trigger: 'change' },
      {
        validator: (_, value, callback) => {
          if (!value) return callback(new Error('请选择开奖时间2'));
          if (!form.value.openTime1) return callback(new Error('请先选择开奖时间1'));
          if (value <= form.value.openTime1) {
            callback(new Error('开奖时间2必须大于开奖时间1'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    openTime3: [
      // { required: true, message: '请选择开奖时间3', trigger: 'change' },
      {
        validator: (_, value, callback) => {
          // if (!value || !form.value.openTime2) {
          //     callback();
          //     return;
          // }
          if (!value) return callback(new Error('请选择开奖时间3'));
          if (!form.value.openTime2) return callback(new Error('请先选择开奖时间2'));
          if (value <= form.value.openTime2) {
            callback(new Error('开奖时间3必须大于开奖时间2'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    openTime4: [
      // { required: true, message: '请选择开奖时间4', trigger: 'change' },
      {
        validator: (_, value, callback) => {
          if (!value) return callback(new Error('请选择开奖时间4'));
          if (!form.value.openTime3) return callback(new Error('请先选择开奖时间3'));
          if (value <= form.value.openTime3) {
            callback(new Error('开奖时间4必须大于开奖时间3'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ]
  });
</script>

<style lang="scss" scoped>
  ::v-deep .el-divider__text {
    font-weight: bold;
    font-size: 20px;
  }

  .tip {
    color: orange;
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
