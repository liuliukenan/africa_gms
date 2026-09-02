import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import { PostTypeEnum } from '@/api/model';

export async function serverClose(data: any) {
  const res = await request.Post<ApiResult<unknown>>('/close/close', data, {
    meta: {
      postType: PostTypeEnum.FORM
    }
  });
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
