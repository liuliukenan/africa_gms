import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/modules/user';
import { listByCode } from '@/api/system/dictDataApi';
import type { DictionaryData } from '@/api/model/dictdata';

/**
 * 获取字典数据hook
 * @param codes 字典编码
 */
export function useDictData(codes: string[], valueType: string): ComputedRef<DictionaryData[]>[] {
  const result: ComputedRef<DictionaryData[]>[] = [];
  const userStore = useUserStore();
  const { dicts } = storeToRefs(userStore);
  codes.forEach((code) => {
    result.push(computed<DictionaryData[]>(() => dicts.value[code] || []));
    // 若还未缓存过则获取字典数据
    if (dicts.value[code] != null) {
      return;
    }
    userStore.setDicts([], code);
    listByCode(code)
      .then((list) => {
        let result = list.map((item) => {
          if (valueType == 'string') {
            return {
              dictDataCode: item.dictDataCode,
              dictDataName: item.dictDataName
            };
          } else {
            return {
              dictDataCode: Number(item.dictDataCode),
              dictDataName: item.dictDataName
            };
          }
        });
        userStore.setDicts(result, code);
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });
  });

  return result;
}
