<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="1000" v-model="visible" :title="isUpdate ? '修改Tips配置' : '新建Tips配置'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- <el-col :sm="12" :xs="12">
          <el-form-item label="id" prop="id">
            <el-input-number :controls="false" style="width: 100%" v-model="form.id" :min="0" placeholder="请输入"
              :disabled="isUpdate" />
            <div>提示：该ID是程序用来确定Tip的唯一依据,一经确认，不要轻易更新</div>
          </el-form-item>
        </el-col> -->

        <el-col :sm="12" :xs="12">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="keyId" prop="keyId">
            <el-input-number :controls="false" style="width: 100%" v-model="form.keyId" :min="0" placeholder="请输入" :disabled="isUpdate" />
            <div style="line-height: 22px" v-if="!isUpdate">提示：该ID是程序用来确定邮件模板的唯一依据,一经确认，不要轻易更改</div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="名称" prop="tipsName">
            <el-input clearable :maxlength="50" v-model="form.tipsName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="Tip类型" prop="tipsType">
            <dict-data code="tipsType" v-model="form.tipsType" valueType="number" placeholder="请输入类型" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="颜色类型" prop="colorType">
            <dict-data code="colorType" v-model="form.colorType" valueType="number" placeholder="请输入类型" style="width: 100%" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="跳转类型" prop="jumpType">
            <dict-data code="actionType2" v-model="form.jumpType" valueType="number" placeholder="请输入类型" @change="changeType" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12" v-if="form.jumpType === 1">
          <el-form-item label="首页跳转地址" prop="homeUrl" :required="true">
            <el-cascader style="width: 100%" v-model="form.homeUrl" :options="homeUrlOptions" @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12" v-if="form.jumpType === 2">
          <el-form-item label="游戏ID" prop="gameId" :required="true">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.gameId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12" v-if="form.jumpType === 3 || form.jumpType === 4">
          <el-form-item label="跳转类联ID" prop="jumpId" :required="true">
            <el-select v-model="form.jumpId" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in jumpIdArr" :key="item.id" :label="item.jumpName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="时长(秒)" prop="timeLen">
            <el-input-number :controls="false" style="width: 100%" v-model="form.timeLen" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="状态" prop="state">
            <el-radio-group v-model="form.state">
              <el-radio :value="true">启用</el-radio>
              <el-radio :value="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="参数" prop="paramNameStr">
            <el-input clearable v-model="form.paramNameStr" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="内容" prop="tipsText">
            <el-input clearable type="textarea" v-model="form.tipsText" placeholder="请输入" :rows="3" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="备注" prop="remark">
            <el-input clearable type="textarea" v-model="form.remark" placeholder="请输入" :rows="3" />
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
  import { ref, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addTipsConf, updateTipsConf } from '@/api/config/tipsConfApi';
  import type { TipsConf } from '@/api/config/model/tipsConf';
  import { byTypeGetList, cascaderFaceShot } from '@/api/platform/faceShotApi';
  import { useConfigStore } from '@/store/modules/config';

  const configStore = useConfigStore();
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: TipsConf | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<TipsConf>({
    id: undefined,
    keyId: undefined,
    tipsName: undefined,
    countryCode: undefined,
    tipsType: undefined,
    colorType: undefined,
    tipsText: undefined,
    jumpType: undefined,
    jumpId: undefined,
    jumpExtend: undefined,
    timeLen: undefined,
    paramNames: [],
    paramNameStr: '[]',
    state: undefined,
    homeUrl: undefined,
    gameId: undefined,
    remark: undefined
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    keyId: [
      {
        required: true,
        type: 'number',
        message: '请输入keyId',
        trigger: 'blur'
      }
    ],
    homeUrl: [
      {
        validator: (_rule: any, value: any, callback: any) => {
          if (form.jumpType === 1 && (!value || value.length === 0)) {
            callback(new Error('请选择首页跳转地址'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    gameId: [
      {
        validator: (_rule: any, value: any, callback: any) => {
          if (form.jumpType === 2 && (value === undefined || value === null || value === '')) {
            callback(new Error('请输入游戏ID'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      }
    ],
    tipsName: [
      {
        required: true,
        type: 'string',
        message: '请输入跳转名称',
        trigger: 'blur'
      }
    ],
    tipsType: [
      {
        required: true,
        message: '请选择Tips类型',
        trigger: 'change'
        // validator: (_rule: any, value: any, callback: any) => {
        //   if (value === undefined || value === null || value === '') {
        //     callback(new Error('请选择Tips类型'));
        //   } else {
        //     callback();
        //   }
        // }
      }
    ],
    colorType: [
      {
        required: true,
        message: '请选择颜色类型',
        trigger: 'change'
        // validator: (_rule: any, value: any, callback: any) => {
        //   if (value === undefined || value === null || value === '') {
        //     callback(new Error('请选择颜色类型'));
        //   } else {
        //     callback();
        //   }
        // }
      }
    ],
    tipsText: [
      {
        required: true,
        type: 'string',
        message: '请输入内容',
        trigger: 'blur'
      }
    ],
    jumpType: [
      {
        required: true,
        type: 'number',
        message: '请输入跳转类型',
        trigger: 'change'
      }
    ],
    jumpId: [
      {
        required: true,
        type: 'number',
        message: '请输入跳转类联ID',
        trigger: 'blur'
      }
    ],
    jumpExtend: [
      {
        required: true,
        type: 'number',
        message: '请输入扩展信息',
        trigger: 'blur'
      }
    ],
    timeLen: [
      {
        required: true,
        type: 'number',
        message: '请输入时长',
        trigger: 'blur'
      }
    ],
    state: [
      {
        required: true,
        type: 'boolean',
        message: '请输入状态',
        trigger: 'blur'
      }
    ]
  });
  const homeUrlOptions = ref<any[]>([]);
  const getCascaderData = async () => {
    let res = await cascaderFaceShot();
    if (res) homeUrlOptions.value = res;
  };
  // 根据类型获取列表
  const changeType = (val: number) => {
    // 清空上次类型遗留的值
    form.homeUrl = undefined;
    form.jumpExtend = undefined;
    form.gameId = undefined;
    form.jumpId = undefined;
    nextTick(() => formRef.value?.clearValidate?.());
    if (val === 1) {
      getCascaderData();
    } else if (val === 3 || val === 4) {
      getList(val);
    }
  };
  const jumpIdArr = ref<any[]>([]);
  // 根据内联，外联类型获取列表
  const getList = (val: any) => {
    byTypeGetList(val).then((res) => {
      jumpIdArr.value = res;
    });
  };
  const handleChange = (val: any) => {
    console.log(val);
    // jumpExtend 存储为 JSON 字符串
    form.jumpExtend = val ? { list: val } : undefined;
  };
  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      // 从 form.time 拆出 startDate/endDate 提交给后端
      // const [startDate, endDate] = (form.time as string[]) || [];
      // form.startDate = startDate;
      // form.endDate = endDate;
      if (form.gameId) form.jumpId = form.gameId;
      // const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
      // if (form.imgUrl && imgBaseUrl && form.imgUrl.startsWith(imgBaseUrl)) {
      //   form.imgUrl = form.imgUrl.slice(imgBaseUrl.length);
      // }

      form.paramNames = JSON.parse(form.paramNameStr);
      const saveOrUpdate = isUpdate.value ? updateTipsConf : addTipsConf;
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
  const handleOpen = async () => {
    if (props.data) {
      assignFields({ ...props.data });
      // form.imgUrl = import.meta.env.VITE_APP_IMG_URL + props.data.imgUrl;

      // 回显时间：按目标国家时区转换，与列表展示保持一致
      // const tz = props.data.countryCode;
      // form.time = [
      //     toDateZone(props.data.startDate, tz),
      //     toDateZone(props.data.endDate, tz)
      // ];

      // jumpType===2 时游戏ID回显
      if (props.data.jumpId && props.data.jumpType === 2) {
        form.gameId = props.data.jumpId;
      }
      if (props.data.paramNames) {
        form.paramNameStr = JSON.stringify(props.data.paramNames);
      } else {
        form.paramNameStr="[]";
      }
      form.jumpExtend = props.data.jumpExtend ?? undefined;
      getList(form.jumpType);
      if (props.data.jumpType === 1 && props.data.jumpExtend) {
        // await 等 options 加载完再赋 homeUrl，保证 cascader 能匹配回显
        await getCascaderData();
        try {
          const extend = props.data.jumpExtend;
          form.homeUrl = extend?.list ?? undefined;
        } catch {
          form.homeUrl = undefined;
        }
      }

      isUpdate.value = true;
    } else {
      resetFields();
      isUpdate.value = false;
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
