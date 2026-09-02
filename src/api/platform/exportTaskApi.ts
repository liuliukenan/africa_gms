import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { ExportTask, ExportTaskParam } from "./model/exportTask";

/**
* 分页查询
*/
export async function pageExportTasks(params: ExportTaskParam) {
    const res = await request.Post<ApiResult<PageResult<ExportTask>>>(
        "/export/list",
        params);
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function exportTask(taskId: string) {
    return await request.Get<ApiResult<unknown>>("/export/download/" + taskId, { responseType: 'blob' });
}

/**
* 根据id查询
*/
export async function getExportTask(id: number) {
    const res = await request.Get<ApiResult<ExportTask>>("/export/" + id);
    if (res.code === 0 && res.data) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addExportTask(data: ExportTask) {
    const res = await request.Post<ApiResult<unknown>>("/export", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateExportTask(data: ExportTask) {
    const res = await request.Put<ApiResult<unknown>>("/export", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeExportTask(taskId?: string) {
    const res = await request.Delete<ApiResult<unknown>>("/export/" + taskId);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeExportTasks(data: (number | undefined)[]) {
    const res = await request.Delete<ApiResult<unknown>>('/export/batchDelete',
        data
    );
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
