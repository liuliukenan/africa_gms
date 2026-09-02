<template>
  <el-descriptions :border="true" :column="mobile ? 2 : 4" class="detail-table" direction="vertical">
    <el-descriptions-item :label="t('user.userList.table.state')" :min-width="mobile ? 4 : 90">
      <dict-data code="userState" valueType="number" type="tag" v-model="form.state" :typeColor="form.state === 0 ? 'success' : form.state === 1 ? 'warning' : 'danger'" />
    </el-descriptions-item>
    <el-descriptions-item :label="t('user.userList.delete.deleteTime')" :min-width="mobile ? 5 : 200">
      <div>{{ toDateZone(form.deleteTime,configStore.countryArr?.[0]?.code || '') ?? '--' }}</div>
    </el-descriptions-item>
    <el-descriptions-item :label="t('user.userList.delete.deleteReason')" :min-width="mobile ? 5 : 90">
      <div>{{ form.deleteReason ?? '--' }}</div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/store/modules/config';
import { useFormData } from '@/utils/use-form-data';
  import { useMobile } from '@/utils/use-mobile';
import { toDateZone } from '@/utils/utils';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
const configStore = useConfigStore();
  interface UserDelete {
    deleteReason?: string;
    deleteTime?: string;
    state?: number;
  }

  const props = defineProps<{
    /** 用户ID */
    uid: number;
    /** 表格行数据 */
    data: any;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 是否是移动端 */
  const { mobile } = useMobile();

  /** 表单数据 */
  const [form, _, assignFields] = useFormData<UserDelete>({
    state: undefined,
    deleteTime: undefined,
    deleteReason: undefined
  });

  assignFields({
    state: props.data?.state,
    deleteTime: props.data?.deleteTime,
    deleteReason: props.data?.deleteReason
  });
</script>
<style lang="scss" scoped>
  :deep(.el-descriptions__header) {
    margin: 10px 0;
  }

  :deep(.el-descriptions__content.el-descriptions__cell.is-bordered-content) {
    text-align: center;
  }

  .detail-table :deep(.el-descriptions__label) {
    width: 120px;
    text-align: center;
    font-weight: normal;
  }

  .detail-table :deep(.el-descriptions__content > div) {
    max-height: 100%;
  }

  :deep(.el-descriptions .el-descriptions__label.el-descriptions__cell.is-bordered-label) {
    width: 121px;
  }
</style>
