<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" :title="title" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="名称" prop="name">
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="类型" prop="triggerSpinType">
            <el-select style="width: 100%" clearable v-model="form.triggerSpinType" placeholder="请选择" @change="changeTrigger">
              <el-option label="免费次数" :value="1" />
              <el-option label="免费游戏" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="游戏ID" prop="gameId">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.gameId" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="下注金额" prop="amount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.amount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="12">
                    <el-form-item label="下注索引" prop="base">
                        <el-input-number style="width: 100%" :controls="false" clearable v-model="form.base" :min="0"
                            :max="17" placeholder="请输入0~17" />
                    </el-form-item>
                </el-col> -->

        <el-col :sm="12" :xs="12">
          <el-form-item label="base" prop="base">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.base" :min="0" placeholder="请输入base" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12" v-if="form.triggerSpinType === 2">
          <el-form-item label="rtpIndex" prop="rtpIndex">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.rtpIndex" :min="0" placeholder="请输入rtpIndex" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="bet" prop="bet">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.bet" :min="0" :max="17" placeholder="请输入0~17" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="level" prop="level">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.level" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="流水倍数" prop="flowMutl">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.flowMutl" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="有效天数" prop="validDays">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.validDays" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="钱包模板" prop="exampleId">
            <WalletSelect v-model="form.exampleId" @select-row="selectRow" filter-type="game" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="次数" prop="totalSpins">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.totalSpins" :disabled="form.triggerSpinType === 2" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="流水需求" prop="requiredFlow">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.requiredFlow" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="rtp信息" prop="controlSet">
            <!-- 实现编辑表格 -->
            <el-table :data="form.controlSet" border highlight-current-row>
              <el-table-column label="start" prop="start" align="center">
                <template #default="scope">
                  <!-- <el-input :model-value="scope.row.start" disabled placeholder="自动计算" /> -->
                  {{ scope.row.start }}
                </template>
              </el-table-column>
              <el-table-column label="to" prop="to" align="center">
                <template #default="scope">
                  <el-input-number style="width: 100%" :controls="false" clearable v-model="scope.row.to" placeholder="请输入to" :min="(scope.row.start ?? 0) + 1" />
                </template>
              </el-table-column>
              <el-table-column label="rtp" prop="rtp" align="center">
                <template #default="scope">
                  <el-input-number style="width: 100%" :controls="false" clearable v-model="scope.row.rtp" placeholder="请输入rtp" :min="0" :max="6" />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                  <el-button type="danger" link @click="handleDeleteRow(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" plain style="margin-top: 10px" @click="handleAddRow">+ 添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick, watch } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addFreeGameConf, updateFreeGameConf } from '@/api/platform/freeGameConfApi';
  import type { FreeGameConf } from '@/api/platform/model/freeGameConf';
  import WalletSelect from '@/components/WallteSelect/index.vue';

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: FreeGameConf | null;
    isCopy: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();
  const title = ref('');

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<FreeGameConf>({
    id: undefined,
    name: undefined,
    triggerSpinType: undefined,
    gameId: undefined,
    amount: undefined,
    base: undefined,
    level: undefined,
    controlSet: [{ start: 1, to: undefined, rtp: undefined }],
    flowMutl: 1,
    validDays: undefined,
    exampleId: undefined,
    totalSpins: undefined,
    bet: undefined,
    requiredFlow: 0,
    rtpIndex: 0
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    name: [
      {
        required: true,
        type: 'string',
        message: '请输入名称',
        trigger: 'blur'
      }
    ],
    triggerSpinType: [
      {
        required: true,
        type: 'number',
        message: '请输入类型',
        trigger: 'blur'
      }
    ],
    gameId: [
      {
        required: true,
        type: 'number',
        message: '请输入游戏ID',
        trigger: 'blur'
      }
    ],
    amount: [
      {
        required: true,
        type: 'number',
        message: '请输入金额',
        trigger: 'blur'
      }
    ],
    base: [
      {
        required: true,
        type: 'number',
        message: '请输入base',
        trigger: 'blur'
      }
    ],
    rtpIndex: [
      {
        required: true,
        type: 'number',
        message: '请输入rtpIndex',
        trigger: 'blur'
      }
    ],
    bet: [
      {
        required: true,
        type: 'number',
        message: '请输入bet',
        trigger: 'blur'
      }
    ],
    level: [
      {
        required: true,
        type: 'number',
        message: '请输入level',
        trigger: 'blur'
      }
    ],
    // controlSet: [
    //     {
    //         required: true,
    //         type: 'number',
    //         message: '请输入rtp信息',
    //         trigger: 'blur'
    //     }
    // ],
    flowMutl: [
      {
        required: true,
        type: 'number',
        message: '请输入流水倍数',
        trigger: 'blur'
      }
    ],

    validDays: [
      {
        required: true,
        type: 'number',
        message: '请输入有效天数',
        trigger: 'blur'
      }
    ],
    exampleId: [
      {
        required: true,
        type: 'number',
        message: '请输入钱包模板',
        trigger: 'blur'
      }
    ],
    totalSpins: [
      {
        required: true,
        type: 'number',
        message: '请输入次数',
        trigger: 'blur'
      }
    ]
  });
  const changeTrigger = (value: number) => {
    form.totalSpins = undefined;
    if (value === 2) {
      form.totalSpins = 1;
    }
  };
  const selectRow = (row: any) => {
    if (form.gameId === undefined) {
      EleMessage.warning('请先选择游戏ID');
      nextTick(() => {
        form.exampleId = undefined;
      });
      return;
    } else if (row.gameId !== form.gameId) {
      EleMessage.warning('所选钱包模板的游戏ID与当前游戏ID不一致，无法选择');
      nextTick(() => {
        form.exampleId = undefined;
      });
      return;
    }
    form.exampleId = row.id;
  };

  /** 是否正在回显赋值中（避免 watch 误清空 exampleId） */
  const isAssigning = ref(false);

  /** 游戏ID变更时，清空钱包模板选择（回显赋值过程中跳过） */
  watch(
    () => form.gameId,
    () => {
      if (isAssigning.value) return;
      form.exampleId = undefined;
    }
  );
  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  // 添加行
  const handleAddRow = () => {
    const list = form.controlSet!;
    const lastRow = list[list.length - 1];
    // 检查最后一行的 to 是否已填
    if (lastRow && (lastRow.to === undefined || lastRow.to === null)) {
      EleMessage.warning('请先填写前一行的 to 值再新增');
      return;
    }
    // 新行 start = 上一行 to + 1，第一行 start = 0
    const nextStart = lastRow ? (lastRow.to as number) + 1 : 0;
    list.push({
      start: nextStart,
      to: undefined,
      rtp: undefined
    });
  };
  // 删除行
  const handleDeleteRow = (index: number) => {
    form.controlSet!.splice(index, 1);
  };
  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      // const saveOrUpdate = isUpdate.value ? updateFreeGameConf : addFreeGameConf;
      let saveOrUpdate: (data: FreeGameConf) => Promise<any>;
      if (isUpdate.value) {
        if (props.isCopy) {
          saveOrUpdate = addFreeGameConf;
        } else {
          saveOrUpdate = updateFreeGameConf;
        }
      } else {
        saveOrUpdate = addFreeGameConf;
      }
      saveOrUpdate(form)
        .then((msg) => {
          loading.value = false;
          EleMessage.success(msg);
          handleCancel();
          emit('done');
        })
        .catch((e) => {
          loading.value = false;
          EleMessage.error(e.message);
        });
    });
  };

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      isAssigning.value = true;
      assignFields({ ...props.data });
      nextTick(() => {
        isAssigning.value = false;
      });
      title.value = '修改免费游戏配置';
      if (props.isCopy) title.value = '复制免费游戏配置';

      isUpdate.value = true;
    } else {
      resetFields();
      title.value = '新增免费游戏配置';
      isUpdate.value = false;
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
