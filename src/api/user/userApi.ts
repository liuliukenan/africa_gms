import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { User, UserParam, UserSimple, UserVO, OperateGoldParam, MonthCardParam, UserPwdParam, UserWallet, UserGame, UserGameWinLossParam, UserGameWinLossVO, UserWelfareWalletRecordParam, UserWelfareWalletRecordVO, UserGameInfoParam, UserGameInfo, UserActivity, UserFundSourceVO, UserKYC, UserRecharge, UserWithdraw, OperationFlow, SealUser, UpdateUserKycOpenDTO } from '@/api/model/user';

/**
 * 分页查询
 */
export async function pageUsers(params: UserParam) {
  const res = await request.Post<ApiResult<PageResult<User>>>('/userManage/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 导出
export async function exportUsers(params: UserParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<User>>>(
    "/userManage/list",
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
 * 导出
 */
export async function listUser(params?: UserParam) {
  const res = await request.Post<ApiResult<User[]>>('/user/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 人工操作流水
export async function operationFlow(params?: OperationFlow) {
  const res = await request.Post<ApiResult<User[]>>('/userManage/manualFlowOperation', params);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户主钱包流水剩余总数
export async function getMainWalletFlow(params?: {uid: number, queryType?: number}) {
  const res = await request.Get<ApiResult<any>>('/userManage/getMainWalletFlow', { params });
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 封禁用户
export async function sealUser(data:SealUser) {
  const res = await request.Post<ApiResult<any>>('/userManage/lockUser',data );
  if (res.code === 0 ) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 根据id查询
 */
export async function getUser(id: number) {
  const res = await request.Get<ApiResult<UserVO>>('/user/getById/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 清除记录
export async function clearCurrDepositGold(id: number) {
  const res = await request.Get<ApiResult<UserVO>>('/user/clearCurrDepositGold/' + id);
  if (res.code === 0 && res.data) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户游戏信息
export async function getUserGame(uid: number) {
  const res = await request.Get<ApiResult<UserGame>>('/userManage/getUserGameInfo/' + uid);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户游戏输赢分页信息
export async function getUserGameWinLossPage(params?: UserGameWinLossParam) {
  const res = await request.Post<ApiResult<PageResult<UserGameWinLossVO>>>('/userManage/getUserGameWinLossPage', params);
  if (res.code === 0 && res.data) {
    return { ...res.data, count: res.data.totalRow ?? 0 };
  }
  return Promise.reject(new Error(res.message));
}
// 分页查询玩家平台福利钱包记录
export async function getUserWelfareWalletRecordPage(params?: UserWelfareWalletRecordParam) {
  const res = await request.Post<ApiResult<PageResult<UserWelfareWalletRecordVO>>>('/userManage/getUserWelfareWalletRecordPage', params);
  if (res.code === 0 && res.data) {
    return { ...res.data, count: res.data.totalRow ?? 0 };
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户游戏信息详情
export async function getUserGameInfo(params?: UserGameInfoParam) {
  const res = await request.Post<ApiResult<PageResult<UserGameInfo>>>('/userManage/getUserGameProfilePage', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户资金来源信息
export async function getUserFundSource(uid: number) {
  const res = await request.Get<ApiResult<UserFundSourceVO>>('/userManage/getUserFundSource/' + uid);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户活跃信息
export async function getUserActivity(uid: number) {
  const res = await request.Get<ApiResult<UserActivity>>('/userManage/getUserActiveInfo/' + uid);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取用户KYC信息
export async function getUserKyc(uid: number) {
  const res = await request.Get<ApiResult<UserKYC>>('/userManage/getKycById/' + uid);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户充值信息
export async function getUserRecharge(uid: number) {
  const res = await request.Get<ApiResult<UserRecharge>>('/userManage/getUserRechargeInfo/' + uid);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户提现信息
export async function getUserWithdraw(uid: number) {
  const res = await request.Get<ApiResult<UserWithdraw>>('/userManage/getUserWithdrawInfo/' + uid);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户钱包信息
export async function getUserWallet(uid: number) {
  const res = await request.Get<ApiResult<UserWallet>>('/userManage/getUserWalletByUid/' + uid);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询用户钱包流水信息
export async function getUserWalletFlow(uid: number) {
  const res = await request.Get<ApiResult<any>>('/userManage/getUserWalletFlow/' + uid);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function changeUserBlack(data) {
  const res = await request.Post<ApiResult<unknown>>('/user/changeUserBlack', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 账号密码修改
export async function changePwd(data: UserPwdParam) {
  const res = await request.Post<ApiResult<unknown>>('/userManage/updatePwd', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 谷歌验证码
 */
export async function seeMerchantCode(uid: number | string) {
  const res = await request.Post<ApiResult<unknown>>(`user/getGoogleVerification/${uid}`);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// svip
export async function changeUserSvip(uid: number, svip: number) {
  const res = await request.Post<ApiResult<unknown>>('/user/changeUserSvip', { uid, svip });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 测试账号
export async function changeUserTestAccount(uid: number, testAccount: number) {
  const res = await request.Post<ApiResult<unknown>>('/user/changeUserTestAccount', { uid, testAccount });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 月卡
export async function changeUserMonthCard(data: MonthCardParam) {
  const res = await request.Post<ApiResult<unknown>>('/user/changeUserMonthCard', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 扣减金额
export async function deductGold(data: OperateGoldParam) {
  const res = await request.Post<ApiResult<unknown>>('/userManage/updateMoney', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
export async function unsealApi(uid: number, state: number) {
  const res = await request.Post<ApiResult<unknown>>('/user/lock', { uid, state });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 更新用户KYC入口开关
export async function updateKycOpen(data: UpdateUserKycOpenDTO) {
  const res = await request.Post<ApiResult<boolean>>('/userManage/updateKycOpen', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}



// 导出
export async function exportUser(params: UserParam) {
  return await request.Post<ApiResult<unknown>>('/user/exportExcel', params, { responseType: 'blob' });
}
