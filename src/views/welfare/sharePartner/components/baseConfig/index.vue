<template>
  <div>
    <el-card :bordered="false" style="margin: 20px 20px 0; height: 100%" body-class="card">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-row :gutter="16">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="分享链接:" prop="shareUrl">
              <el-input clearable placeholder="请输入分享链接" v-model.trim="form.shareUrl" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="合营计划联系方式1:" prop="phone1">
              <el-input clearable placeholder="请输入合营计划联系方式1" v-model.trim="form.phone1" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="合营计划联系名称1:" prop="name1">
              <el-input clearable placeholder="请输入合营计划联系名称1" v-model.trim="form.name1" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="合营计划联系方式2:" prop="phone2">
              <el-input clearable placeholder="请输入合营计划联系方式2" v-model.trim="form.phone2" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="合营计划联系名称2:" prop="phone2">
              <el-input clearable placeholder="请输入合营计划联系名称2" v-model.trim="form.name2" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="上次发奖日期:" prop="lastTime">
              <el-date-picker v-model="form.lastTime" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="上次发奖日期" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="发奖时间配置:" prop="sendTime">
              <el-time-picker v-model="form.sendTime" format="HH:mm" value-format="HH:mm:ss" placeholder="发奖时间配置"
                size="large" :disabled-seconds="disabledSeconds" />
            </el-form-item>
          </el-col>
        </el-row>

        <div class="title">邀请配置</div>
        <el-row :gutter="16">
          <!--          <el-col :md="24" :sm="24" :xs="24">-->
          <!--            <el-form-item label="活动开启:">-->
          <!--              <el-radio-group v-model="form.shareConf.open" size="large">-->
          <!--                <el-radio :value="true">开</el-radio>-->
          <!--                <el-radio :value="false">关</el-radio>-->
          <!--              </el-radio-group>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="被邀请人流水倍数要求:" prop="shareConf.inviteeWaterFlow">
              <el-input-number clearable :controls="false" placeholder="请输入被邀请人流水倍数要求"
                v-model="form.shareConf.inviteeWaterFlow" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="邀请人流水倍数要求:" prop="shareConf.inviterWaterFlow">
              <el-input-number clearable :controls="false" placeholder="请输入邀请人流水倍数要求"
                v-model="form.shareConf.inviterWaterFlow" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="流水返利比例:" prop="shareConf.rebateRate">
              <el-input-number clearable :controls="false" :min="0" :max="1" placeholder="请输入流水返利比例"
                v-model="form.shareConf.rebateRate" size="large" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="流水返利流水倍数要求:" prop="shareConf.rebateRateWaterFlow">
              <el-input-number clearable :controls="false" placeholder="流水返利流水倍数要求"
                v-model="form.shareConf.rebateRateWaterFlow" size="large" />
            </el-form-item>
          </el-col>
        </el-row>

        <div class="title">邀请等级奖励配置</div>
        <el-row :gutter="16">
          <el-col :md="24" :sm="24" :xs="24" v-if="form.shareConf.items">
            <el-table :data="form.shareConf.items" stripe style="width: 100%; margin-top: 20px">
              <el-table-column prop="level" label="等级">
                <template #default="{ row, $index }">
                  <el-form-item prop="level">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" clearable placeholder="请输入level"
                      v-model="row.level" />
                    <span v-else>{{ row.level }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="min" label="最小值">
                <template #default="{ row, $index }">
                  <el-form-item prop="min">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" clearable placeholder="请输入最小值"
                      v-model="row.min" />
                    <span v-else>{{ row.min }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="max" label="最大值">
                <template #default="{ row, $index }">
                  <el-form-item prop="max">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" clearable placeholder="请输入最大值"
                      v-model="row.max" />
                    <span v-else>{{ row.max }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="inviterAmount" label="邀请人奖励">
                <template #default="{ row, $index }">
                  <el-form-item prop="inviterAmount">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" clearable placeholder="邀请人奖励"
                      v-model="row.inviterAmount" />
                    <span v-else>{{ row.inviterAmount }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="inviteeAmount" label="被邀请人奖励">
                <template #default="{ row, $index }">
                  <el-form-item prop="inviteeAmount">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" clearable placeholder="被邀请人奖励"
                      v-model="row.inviteeAmount" />
                    <span v-else>{{ row.inviteeAmount }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ row, $index }">
                  <el-button link :type="row.isEdit ? 'success' : 'primary'" size="small"
                    @click="handleFinish(row, $index)">
                    {{ row.isEdit ? '完成' : '修改' }}
                  </el-button>
                  <el-button link type="danger" size="small" @click="baseRemove($index)">删除</el-button>
                  <el-button link type="success" size="small" @click="addNewItem"
                    v-if="$index == form.shareConf.items!.length - 1"> 新增 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <div class="title">合伙人配置</div>
        <el-row :gutter="16">
          <!--          <el-col :md="12" :sm="24" :xs="24">-->
          <!--            <el-form-item label="活动开启:">-->
          <!--              <el-radio-group v-model="form.parterConf.open" size="large">-->
          <!--                <el-radio :value="true">开</el-radio>-->
          <!--                <el-radio :value="false">关</el-radio>-->
          <!--              </el-radio-group>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :md="24" :sm="24" :xs="24">
            <el-table :data="form.parterConf.items" stripe style="width: 100%; margin-top: 20px">
              <el-table-column prop="level" label="等级">
                <template #default="{ row, $index }">
                  <el-form-item :prop="'parterConf.items.' + $index + '.level'" :rules="rules.level">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" clearable placeholder="请输入level"
                      v-model="row.level" />
                    <span v-else>{{ row.level }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="layer1" label="层次1">
                <template #default="{ row, $index }">
                  <el-form-item :prop="'parterConf.items.' + $index + '.layer1'">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" :precision="6" :max="1" clearable
                      placeholder="请输入层次1比例" v-model="row.layer1" />
                    <span v-else>{{ formatToFixed(row.layer1) }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="layer2" label="层次2">
                <template #default="{ row, $index }">
                  <el-form-item :prop="'parterConf.items.' + $index + '.layer2'">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" :precision="6" :max="1" clearable
                      placeholder="请输入层次2比例" v-model="row.layer2" />
                    <span v-else>{{ formatToFixed(row.layer2) }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="layer3" label="层次3">
                <template #default="{ row, $index }">
                  <el-form-item :prop="'parterConf.items.' + $index + '.layer3'">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" :precision="6" :max="1" clearable
                      placeholder="请输入层次3比例" v-model="row.layer3" />
                    <span v-else>{{ formatToFixed(row.layer3) }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="persons" label="人数要求">
                <template #default="{ row, $index }">
                  <el-form-item :prop="'parterConf.items.' + $index + '.persons'">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false"  clearable
                      placeholder="请输入人数要求" v-model="row.persons" />
                    <span v-else>{{ row.persons }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="waterFlow" label="流水要求">
                <template #default="{ row, $index }">
                  <el-form-item :prop="'parterConf.items.' + $index + '.waterFlow'">
                    <el-input-number v-if="row.isEdit" :min="0" :controls="false" clearable placeholder="请输入流水要求"
                      v-model="row.waterFlow" />
                    <span v-else>{{ row.waterFlow }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ row, $index }">
                  <el-button link :type="row.isEdit ? 'success' : 'primary'" size="small"
                    @click="handlePartnerFinish(row, $index)">
                    {{ row.isEdit ? '完成' : '修改' }}
                  </el-button>
                  <el-button link type="danger" size="small" @click="removePartnerItem($index)">删除</el-button>
                  <el-button link type="success" size="small" @click="addNewPartnerItem"
                    v-if="$index == form.parterConf.items!.length - 1"> 新增 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>

      <div style="padding: 20px 0">
        <el-button type="primary" size="large" @click="save">保存</el-button>
        <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()" width="200">
          <template #reference>
            <el-button type="danger" size="large" class="ele-btn-icon" style="margin-left: 10px">
              <span>发送服务器</span>
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { getSharePartner, saveSharePartner } from '@/api/welfare/sharePartner';
import { sendConfServer } from '@/api/conf/index';
import { assignObject } from 'ele-admin-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { ElForm, FormRules } from 'element-plus';
import type { ShareConfig } from '@/api/welfare/model/sharePartner';

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const form = ref<ShareConfig>({
  jsonType: 'SharePartConf',
  shareUrl: '',
  phone1: '',
  phone2: '',
  name1: '',
  name2: '',
  lastTime: '',
  sendTime: '',
  shareConf: {
    rebateRateWaterFlow: 0,
    inviteeWaterFlow: 0,
    inviterWaterFlow: 0,
    rebateRate: 0,
    open: false,
    items: [
      {
        level: 1,
        min: 0,
        max: 0,
        inviteeAmount: 0,
        inviterAmount: 0,
        isEdit: true
      }
    ]
  },
  parterConf: {
    open: false,
    items: [
      {
        level: 1,
        layer1: 0,
        layer2: 0,
        layer3: 0,
        persons: 0,
        waterFlow: 0,
        isEdit: false
      }
    ]
  }
});

const disabledSeconds = () => {
  return Array.from({ length: 59 }, (_, i) => i + 1); // 禁用1-59秒
};

// 获取基础配置信息
const loadingAppConf = () => {
  getSharePartner()
    .then((data) => {
      if (data) {
        form.value = assignObject(form.value, data);
        form.value.jsonType = 'SharePartConf'; // 保持类型一致
        data.shareConf.items!.forEach((v) => {
          v.isEdit = false;
        });
        data.parterConf.items!.forEach((v) => {
          v.isEdit = false;
        });
        console.log('数据:', form.value.shareConf.items, form.value.parterConf.items);
      }
    })
    .catch((e) => {
      EleMessage.error(`加载配置失败: ${e.message}`);
    });
};

// 发送到服务器
const sendServer = () => {
  const loading = EleMessage.loading({
    message: '发送中...',
    plain: true
  });
  sendConfServer(28)
    .then((msg) => {
      loading.close();
      EleMessage.success(msg || '发送成功');
    })
    .catch((e) => {
      loading.close();
      EleMessage.error(e.message || '发送失败');
    });
};

// 保存
const save = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (!valid) return;

    const loading = EleMessage.loading({
      message: '保存中...',
      plain: true
    });

    // 深拷贝表单数据，避免修改原始数据
    const params = JSON.parse(JSON.stringify(form.value));

    // 处理合伙人配置中的数值，确保保留两位小数
    // if (params.parterConf && params.parterConf.items) {
    //   params.parterConf.items.forEach(item => {
    //     item.level = Number(item.level.toFixed(2));
    //     item.layer1 = Number(item.layer1.toFixed(2));
    //     item.layer2 = Number(item.layer2.toFixed(2));
    //     item.layer3 = Number(item.layer3.toFixed(2));
    //     item.persons = Number(item.persons.toFixed(2));
    //     item.waterFlow = Number(item.waterFlow.toFixed(2));
    //   });
    // }
    saveSharePartner(params)
      .then((msg) => {
        loading.close();
        EleMessage.success(msg || '保存成功');
        loadingAppConf();
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message || '保存失败');
      });
  });
};

// 添加新的邀请等级项
const addNewItem = () => {
  const newLevel = form.value.shareConf.items!.length + 1;
  form.value.shareConf.items!.push({
    level: newLevel,
    min: 0,
    max: 0,
    inviteeAmount: 0,
    inviterAmount: 0,
    isEdit: true
  });
};

// 删除邀请等级项
const baseRemove = (index: number) => {
  // if(form.value.shareConf.items&&form.value.shareConf.items.length==0) return  EleMessage.error('至少保留一条数据！');
  form.value.shareConf.items!.splice(index, 1);
  // 重新编号
  form.value.shareConf.items!.forEach((item, i) => {
    item.level = i + 1;
  });
};

// 处理邀请等级项的修改/完成
const handleFinish = (row: any, index: number) => {
  if (row.isEdit) {
    if (row.min >= row.max) return EleMessage.error('最小值不能等于或大于最大值！');
    if (!row.inviteeAmount) return EleMessage.error('请输入被邀请人奖励！');
    if (!row.inviterAmount) return EleMessage.error('请输入邀请人奖励！');
    if (!row.max) return EleMessage.error('请输入最大值！');
    row.isEdit = false;
  } else {
    row.isEdit = true;
  }
};

// 添加新的合伙人等级项
const addNewPartnerItem = () => {
  const newLevel = form.value.parterConf.items!.length + 1;
  form.value.parterConf.items!.push({
    level: newLevel,
    layer1: 0,
    layer2: 0,
    layer3: 0,
    persons: 0,
    waterFlow: 0,
    isEdit: true
  });
};

// 删除合伙人等级项
const removePartnerItem = (index: number) => {
  // if(form.value.parterConf.items&&form.value.parterConf.items.length==0) return  EleMessage.error('至少保留一条数据！');
  form.value.parterConf.items!.splice(index, 1);
  // 重新编号
  form.value.parterConf.items!.forEach((item, i) => {
    item.level = i + 1;
  });
};

// 处理合伙人等级项的修改/完成
const handlePartnerFinish = (row: any, index: number) => {
  if (row.isEdit) {
    if (!row.layer1) return EleMessage.error('请输入层次1！');
    if (!row.layer2) return EleMessage.error('请输入层次2！');
    if (!row.layer3) return EleMessage.error('请输入层次3！');
    // if (!row.persons) return EleMessage.error('请输入人数要求！');
    // if (!row.waterFlow) return EleMessage.error('请输入流水要求！');
    row.isEdit = false;
  } else {
    row.isEdit = true;
  }
};

// 表单验证规则
const rules = reactive<FormRules>({
  shareUrl: [{ required: true, message: '请输入分享链接', trigger: 'blur' }],
  phone1: [{ required: true, message: '请输入合营计划联系方式1', trigger: 'blur' }],
  phone2: [{ required: true, message: '请输入合营计划联系方式2', trigger: 'blur' }],
  name1: [{ required: true, message: '请输入合营计划联系名称1', trigger: 'blur' }],
  name2: [{ required: true, message: '请输入合营计划联系名称2', trigger: 'blur' }],
  percentage: [
    { required: true, type: 'number', message: '请输入分成比例', trigger: 'blur' },
    { type: 'number', min: 0, max: 100, message: '比例必须在0-100之间', trigger: 'blur' }
  ],
  persons: [
    { required: true, type: 'number', message: '请输入人数要求', trigger: 'blur' },
    // { type: 'number', min: 0, message: '人数不能小于0', trigger: 'blur' }
  ],
  waterFlow: [
    { required: true, type: 'number', message: '请输入流水要求', trigger: 'blur' },
    // { type: 'number', min: 0, message: '流水不能小于0', trigger: 'blur' }
  ]
});

// 添加格式化函数，保留2位数
const formatToFixed = (value: number) => {
  if (value === null || value === undefined) {
    return '';
  }
  return Number(value).toFixed(6);
};

// 组件挂载时加载配置
onMounted(() => {
  loadingAppConf();
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

::v-deep .el-tabs--left .el-tabs__item.is-left {
  flex: 1;
}
</style>
