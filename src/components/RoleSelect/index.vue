<!-- 角色选择下拉框 -->
<template>
  <el-select
    clearable
    :model-value="roleId"
    :placeholder="placeholder"
    class="ele-fluid"
    @update:modelValue="updateValue"
  >
    <el-option
      v-for="item in data"
      :key="item.roleId"
      :value="item.roleId"
      :label="item.roleName"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { EleMessage } from "ele-admin-plus/es";
import { pageRoles } from "@/api/system/roleApi";
import type { Role } from "@/api/model/role";

const props = withDefaults(
  defineProps<{
    userGroup: number;
    /** 选中的角色 */
    modelValue?: number;
    /** 提示文本 */
    placeholder?: string;
  }>(),
  {
    placeholder: "请选择角色"
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

/** 选中的角色id */
const roleId = computed(() =>props.modelValue);

/** 角色数据 */
const data = ref<Role[]>([]);

/** 更新选中数据 */
const updateValue = (value: number) => {
  console.log(value);

  emit("update:modelValue", value);
};


watch(
  () => props.userGroup,
  () => {
    /** 获取角色数据 */
    pageRoles({
      page:1,
      limit: 10000,
      userGroup: props.userGroup
    })
      .then((list) => {
        data.value = list;
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });

  },
  { immediate: true }
);

</script>
