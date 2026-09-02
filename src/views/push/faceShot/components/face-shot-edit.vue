<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="1000" v-model="visible" :title="isUpdate ? '修改拍脸图' : '新建拍脸图'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="显示名称" prop="name">
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
       
        <!-- <el-col :sm="12" :xs="12">
          <el-form-item label="是否悬浮" prop="hasFloat">
            <el-radio-group v-model="form.hasFloat">
              <el-radio :value="true">是</el-radio>
              <el-radio :value="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :sm="12" :xs="12">
          <el-form-item label="keyId" prop="keyId">
            <el-input-number :controls="false" style="width: 100%" v-model="form.keyId" :min="0" placeholder="请输入" :disabled="isUpdate" />
            <div style="line-height: 22px">提示：该ID是程序用来确定邮件模板的唯一依据,一经确认，不要轻易更改</div>
          </el-form-item>
        </el-col> -->
        <el-col :sm="12" :xs="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="true">启用</el-radio>
              <el-radio :value="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="跳转类型" prop="jumpType">
            <dict-data code="actionType" v-model="form.jumpType" valueType="number" placeholder="请输入类型" @change="changeType" style="width: 100%" />
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
          <el-form-item label="关联活动">
            <el-select v-model="form.actId" placeholder="请选择" style="width: 100%" clearable>
              <el-option v-for="item in activityArr" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="活动完成策略" prop="actCompletePolicy">
            <dict-data code="actCompletePolicy" v-model="form.actCompletePolicy" valueType="number" placeholder="请选择" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="12" v-if="form.jumpType === 3 || form.jumpType === 4">
                    <el-form-item :label="form.jumpType === 3 ? '内联地址' : '外联地址'" prop="jumpUrl">
                        <el-input clearable :maxlength="50" v-model="form.jumpUrl" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col :sm="24" :xs="24" v-if="form.jumpType === 1">
                    <el-form-item label="扩展信息" prop="jumpExtend" :required="true">
                        <el-input type="textarea" :rows="3" clearable :maxlength="50" v-model="form.jumpExtend"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col> -->

        <!-- <el-col :sm="12" :xs="12">
                    <el-form-item label="发送范围" prop="userRange">
                        <el-input-number :controls="false" style="width: 100%;" v-model="form.userRange" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="触发类型" prop="triggerType">
                        <el-input-number :controls="false" style="width: 100%;" v-model="form.triggerType" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col> -->

        <el-col :sm="12" :xs="12">
          <el-form-item label="每日显示总数" prop="dayDisplayTimes">
            <el-input-number :controls="false" style="width: 100%" v-model="form.dayDisplayTimes" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="排序" prop="sortNumber">
            <el-input-number :controls="false" style="width: 100%" v-model="form.sortNumber" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="生效时间">
            <el-date-picker v-model="form.time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" style="width: 100%" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="图片" prop="imgUrl">
            <image-upload
              :limit="1"
              v-model="form.imgUrl"
              accept="image/png"
              :item-style="{
                width: '120px',
                height: '120px',
                background: 'var(--el-fill-color-lighter)',
                '--ele-upload-list-padding': 0
              }"
              :button-style="{ width: '120px', height: '120px' }"
              category="1"
              fileName="face"
            />
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
  import { nextTick, reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addFaceShot, byTypeGetList, cascaderFaceShot, updateFaceShot } from '@/api/platform/faceShotApi';
  import type { CountryAct, FaceShot } from '@/api/platform/model/faceShot';
  import { useConfigStore } from '@/store/modules/config';
  import ImageUpload from '@/components/ImageUpload/index.vue';

  const configStore = useConfigStore();
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: FaceShot | null;
    activityArr: CountryAct[];
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
  let timeArr = ref<[string, string]>(['', '']);
  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<FaceShot>({
    id: undefined,
    keyId: undefined,
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    name: undefined,
    gameGroup: undefined,
    jumpType: undefined,
    jumpExtend: undefined,
    userRange: undefined,
    triggerType: undefined,
    actCompletePolicy: undefined,
    jumpId: undefined,
    dayDisplayTimes: undefined,
    sortNumber: undefined,
    status: true,
    startDate: undefined,
    endDate: undefined,
    homeUrl: undefined,
    gameId: undefined,
    imgUrl: undefined,
    actId: undefined,
    hasFloat: false,
    time: undefined as string[] | undefined
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    imgUrl: [
      {
        required: true,
        type: 'string',
        message: '请上传图片地址',
        trigger: 'blur'
      }
    ],
    countryCode: [
      {
        required: true,
        type: 'number',
        message: '请输入国家代码',
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
    jumpUrl: [
      {
        required: true,
        type: 'string',
        message: '请输入跳转地址',
        trigger: 'blur'
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
    name: [
      {
        required: true,
        type: 'string',
        message: '请输入显示名称',
        trigger: 'blur'
      }
    ],
    gameGroup: [
      {
        required: true,
        type: 'number',
        message: '请输入所属于分组',
        trigger: 'blur'
      }
    ],
    jumpType: [
      {
        required: true,
        type: 'number',
        message: '请输入跳转类型',
        trigger: 'blur'
      }
    ],
    jumpExtend: [
      {
        validator: (_rule: any, value: any, callback: any) => {
          if (form.jumpType === 1 && (!value || value === '')) {
            callback(new Error('请输入扩展信息'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      }
    ],
    userRange: [
      {
        required: true,
        type: 'number',
        message: '请输入发送范围',
        trigger: 'blur'
      }
    ],
    triggerType: [
      {
        required: true,
        type: 'number',
        message: '请输入触发类型',
        trigger: 'blur'
      }
    ],
    jumpId: [
      {
        validator: (_rule: any, value: any, callback: any) => {
          if ((form.jumpType === 3 || form.jumpType === 4) && (value === undefined || value === null || value === '')) {
            callback(new Error('请选择跳转类联ID'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    dayDisplayTimes: [
      {
        required: true,
        type: 'number',
        message: '请输入每日显示总数',
        trigger: 'blur'
      }
    ],
    sortNumber: [
      {
        required: true,
        type: 'number',
        message: '请输入排序',
        trigger: 'blur'
      }
    ],
    // status: [
    //     {
    //         required: true,
    //         type: 'boolean',
    //         message: '请输入状态',
    //         trigger: 'blur'
    //     }
    // ],
    startTime: [
      {
        required: true,
        type: 'number',
        message: '请输入开始时间',
        trigger: 'blur'
      }
    ],
    endTime: [
      {
        required: true,
        type: 'number',
        message: '请输入结束时间',
        trigger: 'blur'
      }
    ]
  });

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };
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
      console.log(res);
      jumpIdArr.value = res;
    });
  };
  const handleChange = (val: any) => {
    console.log(val);
    // jumpExtend 存储为 JSON 字符串
    form.jumpExtend = val ? { list: val } : undefined;
  };

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      form.userRange = 0;
      form.triggerType = 0;
      const [startDate, endDate] = (form.time as string[]) || [];
      if (form.gameId) form.jumpId = form.gameId;
      console.log(form);
      form.startDate = startDate;
      form.endDate = endDate;
      const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
      if (form.imgUrl && imgBaseUrl && form.imgUrl.startsWith(imgBaseUrl)) {
        form.imgUrl = form.imgUrl.slice(imgBaseUrl.length);
      }
      const saveOrUpdate = isUpdate.value ? updateFaceShot : addFaceShot;
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
      form.imgUrl = import.meta.env.VITE_APP_IMG_URL + props.data.imgUrl;

      // 回显时间：直接回填开始/结束时间
      form.time = [props.data.startDate || '', props.data.endDate || ''];
      // 如果jumpId存在，并且跳转类型是指定游戏2，则赋值给gameId
      if (props.data.jumpId && props.data.jumpType === 2) form.gameId = props.data.jumpId;

      getList(form.jumpType);
      // 如果是内联类型，则需要等待 options 加载完再赋 homeUrl，保证 cascader 能匹配回显
      if (props.data.jumpType === 1 && props.data.jumpExtend) {
        // await 等 options 加载完再赋 homeUrl，保证 cascader 能匹配回显
        await getCascaderData();
        try {
          const extend = props.data.jumpExtend;
          form.homeUrl = typeof extend === 'string' ? undefined : extend?.list ?? undefined;
        } catch {
          form.homeUrl = undefined;
        }
      }
      isUpdate.value = true;
    } else {
      resetFields();
      form.time = undefined;
      isUpdate.value = false;
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
