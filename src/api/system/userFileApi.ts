import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { PostTypeEnum } from '@/api/model';
import type { UserFile, UserFileParam } from '../model/userFile';
// 公共上传
export async function uploadFileCategory(category: string, file: File, fileName?: string, config?: any) {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('file', file, fileName);
  return await request.Post<ApiResult<UserFile>>('/file/upload', formData, {
    ...config,
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
}
// 上传banner
// export async function uploadBanner(category: string, file: File, fileName?: string, config?: any) {
//   const formData = new FormData();
//   formData.append('category', category);
//   formData.append('file', file, fileName);
//   return await request.Post<ApiResult<UserFile>>('/file/uploadOBS', formData, {
//     ...config,
//     meta: {
//       postType: PostTypeEnum.FORM_DATA
//     }
//   });
// }

export async function uploadFileId(id: number, file: File, fileName?: string, config?: any) {
  const formData = new FormData();
  formData.append('parentId', id.toString());
  formData.append('file', file, fileName);
  return await request.Post<ApiResult<UserFile>>('/file/uploadById', formData, {
    ...config,
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
}
// 新的上传文件
export async function uploadFile(type: string, file: File, fileName?: string, config?: any) {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('file', file, fileName);
  return await request.Post<ApiResult<UserFile>>('/fileUpload/upload', formData, {
    ...config,
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
}

/**
 * 查询用户文件列表
 */
export async function pageUserFiles(params: UserFileParam) {
  const res = await request.Post<ApiResult<PageResult<UserFile>>>('/file/pageList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询用户文件列表
 */
export async function listUserFiles(params: UserFileParam) {
  const res = await request.Post<ApiResult<UserFile[]>>('/file/list', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加用户文件
 */
export async function addUserFile(data: UserFile) {
  const res = await request.Post<ApiResult<Boolean>>('/file', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function updateUserFile(data: UserFile) {
  const res = await request.Put<ApiResult<unknown>>('/system/user-file', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户文件
 */
export async function removeUserFile(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/system/user-file/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户文件
 */
export async function removeUserFiles(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/system/user-file/batch', { data });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
