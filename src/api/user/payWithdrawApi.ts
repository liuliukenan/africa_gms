import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { PayWithdraw, PayWithdrawParam, SimulateParam } from "@/api/model/payWithdraw";

/**
* 分页查询
*/
export async function pagePayWithdraws(params: PayWithdrawParam) {
    const res = await request.Post<ApiResult<PageResult<PayWithdraw>>>(
        "/withdrawRecord/list",
        params);
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 导出
export async function exportPayWithdraw(params: PayWithdrawParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<PayWithdraw>>>(
    "/withdrawRecord/list",
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
*  提现记录列表
*/
export async function listPayWithdraw(params?: PayWithdrawParam) {
    const res = await request.Post<ApiResult<PayWithdraw[]>>("/payWithdraw/exportList",
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
export async function getPayWithdraw(id: number) {
    const res = await request.Get<ApiResult<PayWithdraw>>("/payWithdraw/" + id);
    if (res.code === 0 && res.data) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addPayWithdraw(data: PayWithdraw) {
    const res = await request.Post<ApiResult<unknown>>("/payWithdraw", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 审核
export async function auditWithdraw(data: PayWithdrawParam) {
    const res = await request.Post<ApiResult<unknown>>("/withdrawRecord/audit", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 模拟转账回调成功
export async function simulateSuccess(data: SimulateParam) {
    const res = await request.Post<ApiResult<unknown>>("/withdrawRecord/callbackSimulator", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 模拟转账回调失败
export async function simulateFail(data: SimulateParam) {
    const res = await request.Post<ApiResult<unknown>>("/withdrawRecord/callbackSimulatorFailed", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 发起提现转账
export async function executeWithdraw(data: SimulateParam) {
    const res = await request.Post<ApiResult<unknown>>("/withdrawRecord/execute", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 人工补单
export async function replayApi(data: { orderNo: string }) {
    const res = await request.Post<ApiResult<unknown>>("/withdrawRecord/replay", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updatePayWithdraw(data: PayWithdraw) {
    const res = await request.Put<ApiResult<unknown>>("/payWithdraw", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removePayWithdraw(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/payWithdraw/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removePayWithdraws(data: (number | undefined)[]) {
    const res = await request.Delete<ApiResult<unknown>>('/payWithdraw/batchDelete',
        data
    );
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// export async function exportPayWithdraw(params: PayWithdrawParam) {
//     return await request.Post<ApiResult<unknown>>('/payWithdraw/exportExcel', params, { responseType: 'blob' });
// }