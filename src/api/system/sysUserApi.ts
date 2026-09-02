import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { SysUser, SysUserParam } from "../model/sysUser";
import { PostTypeEnum } from "@/api/model";

/**
 * 分页查询用户
 */
export async function pageUsers(params: SysUserParam) {
  const res = await request.Post<ApiResult<PageResult<SysUser>>>(
    "/sysUser/list",
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询用户列表
 */
export async function listUsers(params?: SysUserParam) {
  const res = await request.Post<ApiResult<SysUser[]>>("/sysUser",
    params
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询用户
 */
export async function getUser(id: number) {
  const res = await request.Get<ApiResult<SysUser>>("/sysUser/" + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加用户
 */
export async function addUser(data: SysUser) {
  const res = await request.Post<ApiResult<unknown>>("/sysUser", data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 谷歌验证码
 */
export async function seeMerchantCode(username: number|string) {
  const res = await request.Post<ApiResult<unknown>>("/sysUser/getGoogleVerification", {username});
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改用户
 */
export async function updateUser(data: SysUser) {
  const res = await request.Put<ApiResult<unknown>>("/sysUser", data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 修改用户密码
 */
export async function updateUserPwd(data: SysUser) {
  const res = await request.Post<ApiResult<unknown>>("/sysUser", data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
// export async function removeUser(id?: number | string, account?: string | number) {
//   const res = await request.Delete<ApiResult<unknown>>("/sysUser", { id , account });
//   if (res.code === 0) {
//     return res.message;
//   }
//   return Promise.reject(new Error(res.message));
// }
export async function removeUser(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>("/sysUser/" + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// /**
//  * 批量删除用户
//  */
// export async function removeUsers(data: (number | undefined)[]) {
//   const res = await request.Delete<ApiResult<unknown>>('/system/user/batch', {
//     data
//   });
//   if (res.code === 0) {
//     return res.message;
//   }
//   return Promise.reject(new Error(res.message));
// }

/**
 * 修改用户状态
 */
export async function updateUserStatus(userId?: number|string, status?: number) {
  const res = await request.Post<ApiResult<unknown>>("/sysUser/updateStatus", {
    userId,
    status
    }, {
      meta: {
        postType: PostTypeEnum.FORM
      }
    }
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 修改用户是否掩码
export async function updateUserMask(userId?: number|string, isMask?: boolean) {
  const res = await request.Post<ApiResult<unknown>>("/sysUser/updateMask", {
      userId,
      isMask
    }, {
      meta: {
        postType: PostTypeEnum.FORM
      }
    }
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 重置用户密码
 */
export async function updateUserPassword(data:SysUser) {
  const res = await request.Post<ApiResult<unknown>>("/sysUser/updatePwd", data );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导入用户
 */
export async function importUsers(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await request.Post<ApiResult<unknown>>(
    "/system/user/import",
    formData
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 检查用户是否存在
 */
export async function checkExistence(
  field: string,
  value: string,
  id?: number
) {
  const res = await request.Get<ApiResult<unknown>>("/system/user/existence", {
    params: { field, value, id }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
