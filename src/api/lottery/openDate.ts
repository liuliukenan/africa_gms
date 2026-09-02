
import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { OpenDate,OpenDateParam} from '@/api/lottery/model/index';
// 获取配置
  export async function get2dOpenTime(params: OpenDateParam) {
    const res = await request.Post<ApiResult<PageResult<OpenDate>>>('/lottery2dAwardtime/list', params);
    if (res.code === 0) {
      return res.data;
    }
    return Promise.reject(new Error(res.message));
  }
  /**
* 修改
*/
export async function update2dOpenTime(data: OpenDate[]) {
  const res = await request.Put<ApiResult<unknown>>("/lottery2dAwardtime", data);
  if (res.code === 0) {
  return res.message;
  }
  return Promise.reject(new Error(res.message));
}