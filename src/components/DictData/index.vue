<!-- 字典组件 -->
<template>
  <template v-if="type === 'text'">
    <span v-for="item in valueData" :key="item.dictDataCode">
      {{ item.dictDataName }}
    </span>
  </template>
  <template v-else-if="type === 'tag'">
    <el-tag v-for="item in valueData" :key="item.dictDataCode" :disable-transitions="true" size="small" :type="typeColor">
      {{ item.dictDataName }}
    </el-tag>
  </template>
  <el-radio-group v-else-if="type === 'radio'" :disabled="disabled" v-model="model as SingleValue">
    <el-radio v-for="item in data" :key="item.dictDataCode" :value="item.dictDataCode" :label="item.dictDataName" />
  </el-radio-group>
  <el-checkbox-group v-else-if="type === 'checkbox'" :disabled="disabled" v-model="model as any" @change="onChange">
    <el-checkbox v-for="item in data" :key="item.dictDataCode" :value="item.dictDataCode" :label="item.dictDataName" />
  </el-checkbox-group>
  <el-select v-else v-model="model" :clearable="true" :disabled="disabled" :placeholder="placeholder"  @change="onChange" :multiple="type === 'multipleSelect'" :teleported="teleported" :filterable="filterable" class="ele-fluid">
    <el-option v-for="item in data" :key="item.dictDataCode" :value="item.dictDataCode" :label="item.dictDataName" />
  </el-select>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useDictData } from '@/utils/use-dict-data';
  import type { DictionaryData } from '@/api/model/dictdata';

  defineOptions({ name: 'DictData' });

  const emit = defineEmits<{
    (e: 'change', value: string | number | boolean | Array<SingleValue> | undefined): void;
  }>();

  type SingleValue = string | number | boolean;
  type MultipleValue = Array<SingleValue>;
  type TypeValue = 'text' | 'tag' | 'radio' | 'select' | 'checkbox' | 'multipleSelect';
  type TypeColor = 'primary' | 'success' | 'info' | 'warning' | 'danger' ;
  const props = withDefaults(
    defineProps<{
      /** 字典类型 */
      code: string;
      /** 组件类型 */
      type?: TypeValue;
      // tag颜色 */
      typeColor?: TypeColor;
      valueType?: string;
      /** 是否禁用 */
      disabled?: boolean;
      value?: string | number | string[] | number[];
      /** 提示文本 */
      placeholder?: string;
      /** select的下拉是否插入到body下 */
      teleported?: boolean;
      /** select是否可搜索 */
      filterable?: boolean;
    }>(),
    {
      teleported: true,
      valueType: 'string'
    }
  );

  /** 字典值 */
  const model = defineModel<SingleValue | MultipleValue>({
    type: [String, Number, Boolean, Array]
  });

  const onChange = (val: MultipleValue) => {
    emit('change', val);
  };

  // console.log(props.code, props.valueType);
  /** 字典数据 */
  const [data] = useDictData([props.code], props.valueType);

  /** 绑定值对应的字典数据 */
  const valueData = computed<DictionaryData[]>(() => {
    const result: DictionaryData[] = [];
    const val = model.value;
    if (val == null || val === '') {
      return result;
    }
    const values = Array.isArray(val) ? val : [val];
    values.forEach((v) => {
      const temp = data.value.find((d) => d.dictDataCode == v);
      if (temp != null) {
        if (props.valueType == 'string') {
          result.push({ dictDataCode: temp.dictDataCode, dictDataName: temp.dictDataName });
        } else {
          const dictDataCode = Number(v);
          result.push({ dictDataCode: String(dictDataCode), dictDataName: temp.dictDataName });
        }
      }
    });
    return result;
  });
</script>
