import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { PayRecord, PayRecordParam } from "@/api/model/payRecord";

/**
* 分页查询
*/
export async function pagePayRecords(params: PayRecordParam) {
    const res = await request.Post<ApiResult<PageResult<PayRecord>>>(
        "/payRecord/list",
        params);
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 导出
export async function exportPayRecord(params: PayRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<PayRecord>>>(
    "/payRecord/list",
    params, {
    headers: {
      "export": true,
      "filename": filename
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 充值记录列表
*/
export async function listPayRecord(params?: PayRecordParam) {
    const res = await request.Post<ApiResult<PayRecord[]>>("/payRecord/exportList",
        params
    );
    if (res.code === 0 && res.data) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 根据id查询
*/
export async function getPayRecord(id: number) {
    const res = await request.Get<ApiResult<PayRecord>>("/payRecord/" + id);
    if (res.code === 0 && res.data) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addPayRecord(data: PayRecord) {
    const res = await request.Post<ApiResult<unknown>>("/payRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updatePayRecord(data: PayRecord) {
    const res = await request.Put<ApiResult<unknown>>("/payRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removePayRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/payRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removePayRecords(data: (number | undefined)[]) {
    const res = await request.Delete<ApiResult<unknown>>('/payRecord/batchDelete',
        data
    );
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
export async function simulatePayRecord(data: any) {
    const res = await request.Post<ApiResult<unknown>>('/payChannel/simulatorPay', data);
    if (res.code === 0 && res.data) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
export async function simulatePay(data: { orderNo: string }) {
    const res = await request.Post<ApiResult<unknown>>('/payRecord/simulatorCallback', data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 导出
// export async function exportPayRecord(params: PayRecord) {
//     return await request.Post<ApiResult<unknown>>('/payRecord/exportExcel', params, { responseType: 'blob' });
// }

