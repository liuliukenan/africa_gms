<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <div class="box-card">
        <div class="title">全局开关：</div>
        <div class="card">
          <div class="card-item">
            <div>跑马灯总开关</div>
            <div class="val">
              <el-switch v-model="form.announceSwitch" :active-value="true" :inactive-value="false" @change="save" :active-text="form.announceSwitch ? '开启' : '关闭'" />
            </div>
          </div>
          <div class="card-item">
            <div>机器人开关</div>
            <div class="val">
              <el-switch v-model="form.announceRobotSwitch" :active-value="true" :inactive-value="false" @change="save" :active-text="form.announceRobotSwitch ? '开启' : '关闭'" />
            </div>
          </div>
          <div class="card-item">
            <div>中奖类开关</div>
            <div class="val">
              <el-switch v-model="form.announceWinSwitch" :active-value="true" :inactive-value="false" @change="save" :active-text="form.announceWinSwitch ? '开启' : '关闭'" />
            </div>
          </div>
          <div class="card-item">
            <div>提款类开关</div>
            <div class="val">
              <el-switch v-model="form.announceWithdrawSwitch" :active-value="true" :inactive-value="false" @change="save" :active-text="form.announceWithdrawSwitch ? '开启' : '关闭'" />
            </div>
          </div>
          <div class="card-item">
            <div>邀请类开关</div>
            <div class="val">
              <el-switch v-model="form.announceInviteSwitch" :active-value="true" :inactive-value="false" @change="save" :active-text="form.announceInviteSwitch ? '开启' : '关闭'" />
            </div>
          </div>
        </div>
        <div class="title">机器人类型权重：</div>
        <el-row :gutter="16">
          <el-col :sm="6" :xs="12">
            <el-form-item label="普通中奖权重" prop="robotWinNormalWeight">
              <el-input-number style="width: 100%" :controls="false" clearable v-model="form.robotWinNormalWeight" :min="0" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :sm="6" :xs="12">
            <el-form-item label="高级中奖权重" prop="robotWinAdvancedWeight">
              <el-input-number style="width: 100%" :controls="false" clearable v-model="form.robotWinAdvancedWeight" :min="0" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :sm="6" :xs="12">
            <el-form-item label="提款权重" prop="robotWithdrawWeight">
              <el-input-number style="width: 100%" :controls="false" clearable v-model="form.robotWithdrawWeight" :min="0" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :sm="6" :xs="12">
            <el-form-item label="邀请权重" prop="robotInviteWeight">
              <el-input-number style="width: 100%" :controls="false" clearable v-model="form.robotInviteWeight" :min="0" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">机器人频率控制:</div>
        <el-row :gutter="16">
          <el-col :sm="24" :xs="24">
            <TimeTable :key="type" ref="timeTableRef" :form="form" />
          </el-col>
        </el-row>
        <el-popconfirm title="确定保存配置吗？" @confirm="save()" width="200px">
          <template #reference>
            <el-button type="success" class="ele-btn-icon" size="large">
              <span>保存</span>
            </el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
          <template #reference>
            <el-button type="danger" class="ele-btn-icon" size="large">
              <span> {{ t('action.sendServer') }}</span>
            </el-button>
          </template>
        </el-popconfirm>
      </div>
      <!--  -->
      <div class="box-card">
        <el-space>
          <el-button-group>
            <el-button :type="type === 0 ? 'primary' : ''" @click="handleClick(0)"> 触发条件</el-button>
            <el-button :type="type === 1 ? 'primary' : ''" @click="handleClick(1)"> 倍数池 · 普通中奖</el-button>
            <el-button :type="type === 2 ? 'primary' : ''" @click="handleClick(2)">倍数池 · 高级中奖</el-button>
            <el-button :type="type === 3 ? 'primary' : ''" @click="handleClick(3)">机器人提款触发配置</el-button>
            <el-button :type="type === 4 ? 'primary' : ''" @click="handleClick(4)">机器人邀请触发配置</el-button>
          </el-button-group>
        </el-space>
        <ele-pro-table v-if="type == 0" ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :tools="['reload', 'columns', 'maximized']" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="announceTriggerConfTable" :pagination="false">
          <template #triggerType="{ row }">
            <dict-data code="announceType" v-model="row.triggerType" type="tag" value-type="number" />
          </template>
          <template #condition="{ row }">
            <div v-if="row.triggerType == 1 || row.triggerType == 2">最低倍数: {{ row.minMultiplier }} 最低赢得金额: {{ row.minAmount }}</div>
            <div v-else-if="row.triggerType == 3">最低提款金额>={{ row.minAmount }} </div>
            <div v-else-if="row.triggerType == 4">单次邀请奖励最低值>={{ row.minAmount }} </div>
            <div v-else>在「跑马灯系统消息」页面单独配置</div>
          </template>

          <template #state="{ row }">
            <el-tag :type="row.state ? 'success' : 'danger'">{{ row.state ? '开启' : '关闭' }}</el-tag>
          </template>
          <template #action="{ row }">
            <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          </template>
        </ele-pro-table>
        <CommonTable v-else :key="type" ref="tableRef1" :triggerType="type" />
        <SpecialEdit ref="specialEditRef" :data="current" v-model="showEdit" @done="reload" />
      </div>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getAnnounceSwitchConf, pageAnnounceTriggerConfs, saveAnnounceSwitchConf, sendConfServer } from '@/api/push/announceTriggerConfApi';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import type { AnnounceTriggerConf } from '@/api/push/model/announceTriggerConf';
  import SpecialEdit from './components/special-edit.vue';
  import CommonTable from './components/commonTable.vue';
  import TimeTable from './components/time-table.vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const type = ref(0);
  const form = ref<any>({
    jsonType: 'AnnounceSwitchConf',
    announceSwitch: 1,
    announceRobotSwitch: 1,
    announceWinSwitch: 1,
    announceWithdrawSwitch: 1,
    announceInviteSwitch: 1,
    robotWinNormalWeight: undefined,
    robotWinAdvancedWeight: undefined,
    robotWithdrawWeight: undefined,
    robotInviteWeight: undefined,
    robotTimeSlots: undefined,
    '@class': 'com.gaming.api.dc.model.dto.AnnounceSwitchConf'
  });
  /** 当前编辑数据 */
  const current = ref<AnnounceTriggerConf | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  /** 表格选中数据 */
  const selections = ref<AnnounceTriggerConf[]>([]);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'triggerType',
      slot: 'triggerType',
      label: '触发类型',
      minWidth: 110
      // align: 'left',
    },
    {
      prop: 'condition',
      slot: 'condition',
      label: '触发条件',
      minWidth: 110
      // align: 'left',
    },
    {
      prop: 'state',
      slot: 'state',
      label: '状态',
      minWidth: 110
      // align: 'left',
    },

    {
      columnKey: 'action',
      label: '操作',
      width: 120,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);
  const handleClick = (val: number) => {
    type.value = val;
  };
  // const fixedArr = ref<any>([])

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAnnounceTriggerConfs({
      ...where,
      ...orders,
      ...pages
    }).then((res: any) => {
      if (res && Array.isArray(res)) {
        return res.filter((item: any) => item.isRobot === false);
      }
      if (res && Array.isArray(res.list)) {
        return { ...res, list: res.list.filter((item: any) => item.isRobot === false) };
      }
      return res;
    });
  };
  const openEdit = (row: AnnounceTriggerConf) => {
    showEdit.value = true;
    current.value = row;
  };
  /** 搜索 */
  const reload = (where?: AnnounceTriggerConf) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };
  const isLoading = ref(true);
  const getBaseConf = () => {
    isLoading.value = true;
    getAnnounceSwitchConf()
      .then((res) => {
        form.value = res;
      })
      .catch((e) => {
        EleMessage.error(e.message);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };
  getBaseConf();
  const save = () => {
    if (isLoading.value) return;
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    saveAnnounceSwitchConf(form.value).then((msg) => {
      EleMessage.success(msg);
      getBaseConf();
      loading.close();
    });
  };
  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    sendConfServer()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };
</script>
<style lang="scss" scoped>
  .title {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }

  .card {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    // padding: 0 16px;
    font-size: 14px;
    margin-top: 20px;
    grid-gap: 20px;

    .card-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-weight: bold;
      padding: 20px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      border-radius: 6px;

      .val {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }

  .box-card {
    padding: 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    margin-bottom: 20px;
  }
</style>
