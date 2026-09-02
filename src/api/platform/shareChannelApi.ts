import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import { PostTypeEnum } from "@/api/model";
import type { FacebookPixelTestResult, ShareChannel, ShareChannelParam, TikTokPixelTestResult, UpdateUserChannelDTO } from "./model/shareChannel";

/**
* 分页查询
*/
export async function pageShareChannels(params?: ShareChannelParam) {
const res = await request.Post<ApiResult<PageResult<ShareChannel>>>(
// const res = await request.Post<ApiResult<ShareChannel>>(
    "/channel/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function exportShareChannels(params: ShareChannelParam, filename: string) {
    const res = await request.Post<ApiResult<PageResult<ShareChannel>>>(
        "/channel/list",
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
* 根据id查询
*/
export async function getShareChannel(id: number) {
    const res = await request.Get<ApiResult<ShareChannel>>("/channel/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
//  重置密码
export async function resetChannelPassword(channelId: number) {
    const res = await request.Post<ApiResult<ShareChannel>>("/channel/resetPassword/" + channelId);
     if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 重置渠道谷歌验证码
export async function resetChannelGoogle(channelId: number) {
    const res = await request.Post<ApiResult<ShareChannel>>("/channel/resetGoogleVerification/" + channelId);
     if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addShareChannel(data: ShareChannel) {
    const res = await request.Post<ApiResult<unknown>>("/channel", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateShareChannel(data: ShareChannel) {
    const res = await request.Put<ApiResult<unknown>>("/channel", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeShareChannel(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/channel/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeShareChannels(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/channel/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/countryCode/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改玩家渠道
 */
export async function changeUserChannel(data: UpdateUserChannelDTO) {
  const res = await request.Post<ApiResult<boolean>>('/channel/changeUserChannel', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 发送 Facebook Purchase 测试事件
export async function testFacebookPurchase(channelId: number, withTestCode?: boolean) {
  const res = await request.Post<ApiResult<FacebookPixelTestResult>>(
    "/channel/testFacebook/" + channelId,
    { withTestCode: !!withTestCode },
    {
      meta: {
        postType: PostTypeEnum.FORM
      }
    }
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 发送 TikTok Purchase 测试事件
export async function testTikTokPurchase(channelId: number, withTestCode?: boolean) {
  const res = await request.Post<ApiResult<TikTokPixelTestResult>>(
    "/channel/testTikTok/" + channelId,
    { withTestCode: !!withTestCode },
    {
      meta: {
        postType: PostTypeEnum.FORM
      }
    }
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
