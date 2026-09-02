<template>
  <el-select show-search optionFilterProp="label":dictCode="dictCode" :disabled="disabled" :all="all"  :value="value" :placeholder="placeholder" @update:value="updateValue" @blur="onBlur" :excludeValues="excludeValues" :fieldNames="fieldNames" >
    <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup>
  import { ref } from 'vue';
  import { EleMessage } from 'ele-admin-plus/es';
  import { listByCodeString } from '@/api/system/dictionary-data/index';

  const emit = defineEmits(['update:value', 'blur']);

  const props = defineProps({
    // 当前值
    value: Number,
    // 请求参数 code
    dictCode: String,
    all: {
      type: Number,
      default: undefined
    },
    excludeValues: {
      type: Array,
      default: () => []
    },

    placeholder: {
      type: String,
      default: '请选择类型'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 自定义节点 label、value、options 的字段
    fieldNames: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    }
  });

  // 字典数据
  const data = ref([]);

  /* 更新选中数据 */
  const updateValue = (value) => {
    emit('update:value', value);
  };

  /* 获取字典数据 */
  listByCodeString(props.dictCode)
    .then((res) => {
      console.log(res);
      if (props.all) {
        data.value.push({ label: '所有', value: props.all });
      }
      res.forEach((item) => {
        let value = parseInt(item.value);
        if (!props.excludeValues.includes(value)) {
          data.value.push({
            label: item.label,
            value: value
          });
        }
      });
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });

  /* 失去焦点 */
  const onBlur = () => {
    emit('blur');
  };
</script>
