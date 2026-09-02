import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { JackpotPool, JackpotPoolParam } from "@/api/model/jackpotPool";
// export async function userDebug(data) {
//     const res = await request.post('/assign/assignResult', data);
//     if (res.data.code === 0) {
//       return res.data.message;
//     }
//     return Promise.reject(new Error(res.data.message));
//   }
  export async function userDebug(data: any) {
    const res = await request.Post<ApiResult<unknown>>("/assign/assignResult", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}