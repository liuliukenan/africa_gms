import { PageParam } from '@/api/model/index';

export interface UserMoney {
  /**用户ID*/
  uid?: number;
  diamondSpinCnt?: number;
  bwDiamondState?: number;
  bwDiamondNum?: number;
  bwDiamondGdp?: number;
  bwDiamondType?: number;
  bwDiamondDesc?: string;
  /**金币*/
  gold?: number;
  totalWithdrawGold?: number;
  totalWithdrawDiamond?: number;
  totalRefuseGold?: number;
  /**钻石*/
  diamond?: number;
  /**福劵*/
  coupon?: number;
  /**累积积分*/
  totalScore?: number;
  /**当前积分*/
  currScore?: number;
  /**经验*/
  exp?: number;
  /**累积充值金币*/
  totalPayGold?: number;
  /**累积充值钻石*/
  totalPayDiamond?: number;
  /**累积充值金钱*/
  totalPayMoney?: number;
  /**vip等级*/
  vipLevel?: number;
  /**vip经验*/
  vipExp?: number;
  /**金币累积下注*/
  totalGoldBet?: number;
  /**金币累积赢取*/
  totalGoldWin?: number;
  /**GTP*/
  totalGoldResult?: number;
  /**钻石累积下注*/
  totalDiamondBet?: number;
  /**钻石思积赢取*/
  totalDiamondWin?: number;
  /**黑白名单*/
  bwType?: number;
  /**数量*/
  bwNum?: number;
  /**目标GTP*/
  bwGdp?: number;
  /**状态*/
  bwState?: number;
  /**加入时间*/
  bwTime?: number;
  /***/
  bwDesc?: string;
  /**分享数量*/
  shareCount?: number;
  /**分享金币*/
  shareGold?: number;
  /**有效分享数量*/
  shareValidCount?: number;
  /***/
  onlineLength?: number;
  /**月卡类型*/
  monthCardType?: number;
  /**月卡过期时间*/
  monthCardOverTime?: number;
  /**月卡最后时间*/
  monthCardLastTime?: number;
  /**月卡签到天数*/
  monthCardSignDay?: number;
  /**救急金次数*/
  reliefFundsTimes?: number;
  /**救急金最后时间*/
  reliefFundsLastTime?: number;
  /**spin次数*/
  spinCnt?: number;
  /**预spin次数*/
  advanceSpinCnt?: number;
  /**触发保护*/
  triggerUltimate?: number;
  /**提现要求金币*/
  depositGold?: number;
  depositDiamond?: number;
  /**当前提现金币*/
  currDepositGold?: number;
  currDepositDiamond?: number;
  /**在线时长*/
  onlineDayLength?: number;
  /**时间key*/
  onlineDayKey?: number;
}
export interface OperationFlow {
  uid?: number;
  amount?: number;
  operationType?: number;
  remark?: string;
}
// 封禁用户
export interface SealUser {
  uid?: number;
  status?: number;
  lockTime?: number;
  remark?: string;
}
// 月卡
export interface MonthCardParam {
  /**用户ID*/
  uid?: number;
  /**月卡类型*/
  monthCardType?: number;
  /**月卡过期时间*/
  monthCardOverTime?: number | string;
  /**月卡最后时间*/
  monthCardLastTime?: number | string;
  /**月卡签到天数*/
  monthCardSignDay?: number;

  monthCardOverDate?: number | string;

  monthCardLastDate?: number | string;

  reliefFundsLastTime?: number | string;
  reliefFundsLastDate?: number | string;
  reliefFundsTimes?: number;
}
// 操作余额
export interface OperateGoldParam {
  uid?: number;
  money?: number;
  queryType?: number;
  type?: number;
  totalAmount?: number;
  remark?: string;

  walletId?: number;
}
/**
 * 充值记录
 */

export interface UserExtend {
  /***/
  uid?: number;
  /***/
  clientInfo?: string;
  /***/
  states?: string;
  /***/
  dailySign?: string;
  thirdGame?: ThirdGame;
  userTask?: UserTask;
}
export interface UserTask {
  taskList?: TaskList[];
}
export interface TaskList {
  award?: boolean;
  finish?: boolean;
  targetId?: number;
  taskId?: number;
  taskType?: number;
  taskSchedule?: number;
  taskTarget?: number;
}
export interface ThirdGame {
  pgGameId?: number;
  pgDragInGold?: number;
  ppDragInGold?: number;
  ppGameId?: number;
  jsonType?: string;
  gameInfo?: string;
  diamondGameInfo?: string;
}
export interface GameInfoObj {
  Bet_0?: number;
  Win_0?: number;
  Cnt_0?: number;
  Bet_1?: number;
  Win_1?: number;
  Cnt_1?: number;
  Bet_2?: number;
  Win_2?: number;
  Cnt_2?: number;
  Bet_3?: number;
  Win_3?: number;
  Cnt_3?: number;
  Bet_4?: number;
  Win_4?: number;
  Cnt_4?: number;
  // pgDragInGold?: number;
  // ppDragInGold?: number;
  // ppGameId?: number;
  // jsonType?: string;
  // gameInfo?: string;
  // gameInfoObj?: GameInfoObj;
}
// 修改密码
export interface UserPwdParam {
  uid?: number;
  countryCode?: number;
  /***/
  id?: number;
  // areaCode: string;
  mobile?: string;
  phone?: string;
  /***/
  username?: string;
  nickname?: string;
  /***/
  passwd?: string;
}

// 更新用户KYC入口开关参数
export interface UpdateUserKycOpenDTO {
  /** 用户ID */
  uid: number;
  /** KYC入口开关：true=显示入口，false=隐藏入口 */
  kycOpen: boolean;
}
// 用戶
export interface User {
  /** 用户ID */
  uid: number;
  /** 昵称 */
  nickname?: string;
  /** 国家名称 */
  countryName?: string;
  /** 语言 */
  lang?: string;
  /** 渠道 */
  channel?: string;
  /** 邀请人ID */
  inviterId?: number;
  /** 手机号码 */
  phone?: string;
  /** 邀请码 */
  inviterCode?: string;
  /** 总金额 */
  totalAmount?: number;
  /** 成功支付总金额 */
  totalPaySuccessAmount?: number;
  /** 成功提现总金额 */
  totalWithdrawSuccessAmount?: number;
  /** 礼品总金额 */
  totalGiftAmount?: number;
  /** VIP等级 */
  vipLevel?: number;
  /** KYC等级 */
  kycLevel?: number;
  /** KYC入口开关 */
  kycOpen?: boolean;
  /** 状态 */
  state?: number;
  /** 是否在线 */
  online?: boolean;
  /** 注册IP */
  registerIp?: string;
  /** 登录IP */
  loginIp?: string;
  /** 设备信息 */
  device?: string;
  /** 创建时间 */
  createTime?: string;
  /** 最后登录时间 */
  lastLoginTime?: string;
  /** 首次支付时间 */
  firstPayTime?: string;
  /** 最后支付时间 */
  lastPayTime?: string;
  /** 首次提现时间 */
  firstWithdrawTime?: string;
  /** 最后提现时间 */
  lastWithdrawTime?: string;
  /** 首次游戏时间 */
  firstGameTime?: string;
  /** 最后游戏时间 */
  lastGameTime?: string;
}
// 用戶查询条件
export interface UserParam extends PageParam {
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** ID */
  id?: number;
  agentType?: number;
  /** 排序字段名称 */
  sortName?: string;
  nickname?: string;

  lastLoginStartDate?: string;
  lastLoginEndDate?: string;

  lastPayStartDate?: string;
  lastPayEndDate?: string;
  /** 排序方向名称 */
  orderName?: string;
  /** 用户ID */
  uid?: number;
  userType?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 手机号码 */
  phone?: string;
  /** 设备信息 */
  device?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道类型 */
  channelType?: number;
  /** 邀请人ID */
  inviterId?: number;
  /** VIP等级 */
  vipLevel?: number;
  /** 注册IP */
  registerIp?: string;
  /** 登录IP */
  loginIp?: string;
  /** 状态 */
  state?: number;
  /** 是否在线 */
  online?: boolean;
}
// 用户游戏信息
export interface UserGame {
  gameGroupId?: number;
  rtp?: number;
  gdp?: number;
  gdpExcludeGift?: number;
  totalBet?: number;
  totalReward?: number;
  payBetRatio?: number;
  last7DaysBet?: number;
  last7DaysReward?: number;
  last7DaysProfit?: number;
}
// 用户游戏输赢信息【分页查询参数】
export interface UserGameWinLossParam extends PageParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  /** ID */
  id?: number;
  /** 排序字段名称 */
  sortName?: string;
  /** 排序方向名称 */
  orderName?: string;
  /** 玩家ID */
  uid?: number;
  /** 厂商代码 */
  factoryCode?: string;
  /** 账户类型：1=Cash，2=Bonus */
  accountType?: number;
  /** 游戏名称，支持模糊查询 */
  gameName?: string;
}
// 用户游戏输赢信息【VO】
export interface UserGameWinLossVO {
  /** 厂商代码 */
  factoryCode?: string;
  /** 游戏ID */
  gameId?: number;
  /** 游戏名称 */
  gameName?: string;
  /** 游戏类别,可用值:1,2,3,4,5,6,7 */
  gameGroupId?: string;
  /** Cash下注 */
  cashBet?: number;
  /** Cash返奖 */
  cashReward?: number;
  /** Cash RTP */
  cashRtp?: string;
  /** Cash净赢，返奖减下注 */
  cashNetWin?: number;
  /** Bonus下注，总下注减Cash下注 */
  bonusBet?: number;
  /** Bonus返奖，总返奖减Cash返奖 */
  bonusReward?: number;
  /** Bonus RTP */
  bonusRtp?: string;
  /** Bonus净赢，Bonus返奖减Bonus下注 */
  bonusNetWin?: number;
  /** 总下注 */
  totalBet?: number;
  /** 总返奖 */
  totalReward?: number;
  /** 总RTP */
  totalRtp?: string;
  /** 局数 */
  totalBetCnt?: number;
}
// 玩家平台福利钱包记录【分页查询参数】
export interface UserWelfareWalletRecordParam extends PageParam {
  /** 每页条数 */
  size?: number;
  /** 开始日期，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  /** ID */
  id?: number;
  /** 排序字段名称 */
  sortName?: string;
  /** 排序方向名称 */
  orderName?: string;
  /** 玩家ID */
  uid?: number;
  /** 来源类型（字典 money_source） */
  type?: number;
  /** 国家代码，默认 254 */
  countryCode?: number;
  /** 类型代码 */
  typeCode?: string;
}
// 玩家平台福利钱包记录【VO】
export interface UserWelfareWalletRecordVO {
  /** ID */
  id?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 来源类型（字典 money_source） */
  type?: number;
  /** 金额 */
  amount?: number;
  /** 变化后金额 */
  afterAmount?: number;
  /** 钱包ID */
  walletId?: number;
  /** 订单号 */
  orderNo?: string;
  /** 创建时间 */
  createTime?: string;
}
// 用户游戏信息【详情】
export interface UserGameInfo {
  /** 公司ID */
  companyId: number;
  /** 游戏ID */
  gameId: number;
  /** RTP (Return to Player) */
  rtp: number;
  gtp: number;
  /** 总投注额 */
  totalBet: number;
  /** 总奖励 */
  totalReward: number;
  /** 盈亏 */
  profitLoss: number;
  /** 总投注次数 */
  totalBetCnt: number;
  /** 最后游戏时间 */
  lastGameTime: string;
  // 可能还有其他字段...
}
// 用户游戏信息【详情】 查询参数
export interface UserGameInfoParam extends PageParam {
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** ID */
  id?: number;
  /** 排序字段名称 */
  sortName?: string;
  /** 排序方向名称 */
  orderName?: string;
  /** 用户ID */
  uid?: number;
  /** 游戏组ID */
  gameGroupId?: number; // 新增字段
}
// 用户活跃信息
export interface UserActivity {
  totalLoginDays: number;
  churnDays: number;
  last30DaysActiveDays: number;
  last7DaysActiveDays: number;
}
// 用户资金来源信息
export interface UserFundSourceVO {
  /** 累计充值成功金额 */
  totalPaySuccessAmount?: number;
  /** Bonus 转入 Cash 的累计金额 */
  totalBonusToCashAmount?: number;
  /** 游戏 Cash 净赢金额，计算口径为累计返奖减累计下注 */
  cashNetWinAmount?: number;
  /** 累计提现成功金额 */
  totalWithdrawSuccessAmount?: number;
  /** 当前 Cash 余额 */
  cashBalance?: number;
}
// 用户KYC信息
export interface UserKYC {
  /** 用户ID */
  uid?: number;
  /** KYC等级 */
  kycLevel?: number;
  /** KYC状态 */
  kycStatus?: number;
  /** 手机号码 */
  phone?: string;
  /** 用户名 */
  username?: string;
  realName?: string;
  /** 国家代码 */
  countryCode?: number;
  /** 身份证号 */
  idCard?: string;
  /** 身份证照片 */
  idPhoto?: string;
  /** 自拍手机号 */
  selfPhone?: string;
  /** 生日 */
  birthday?: string;
  /** 居住地址 */
  residenceAddress?: string;
  /** 居住证明照片 */
  residencePhoto?: number;
  /** 资金来源 */
  sourceFunds?: string;
  nationalId?:number;
  idCardFrontUrl?:string;
  idCardBackUrl?:string;
  selfieUrl?:string;
  remark?:string;
}
// 用户充值信息
export interface UserRecharge {
  /** 总支付申请次数 */
  totalPayApplyCnt?: number;
  /** 总支付成功次数 */
  totalPaySuccessCnt?: number;
  /** 总支付成功金额 */
  totalPaySuccessAmount?: number;
  /** 支付成功率 */
  paySuccessRate?: number;
  /** 平均支付金额 */
  avgPayAmount?: number;
  /** 首次支付金额 */
  firstPayAmount?: number;
  /** 最后一次支付金额 */
  lastPayAmount?: number;
  /** 近7天充值金额 */
  last7DaysRechargeAmount?: number;
  /** 近30天充值金额 */
  last30DaysRechargeAmount?: number;
}
// 用户提现信息
export interface UserWithdraw {
  /** 总提现申请次数 */
  totalWithdrawApplyCnt?: number;
  /** 总提现成功次数 */
  totalWithdrawSuccessCnt?: number;
  /** 总提现成功金额 */
  totalWithdrawSuccessAmount?: number;
  /** 平均提现金额 */
  avgWithdrawAmount?: number;
  /** 提现成功率 */
  withdrawSuccessRate?: number;
  /** 冻结金额 */
  frozenAmount?: number;
  /** 首次提现金额 */
  firstWithdrawAmount?: number;
  /** 最后一次提现金额 */
  lastWithdrawAmount?: number;
  lockAmount?: number;
  remainingFlow?: number;
}

/**
 * 用戶查询条件
 */
export interface UserSimple {
  areaCode: string;
  uid: number;
  accessToken: string;
  deviceUuid: string;
  userType: number; // UserTypeEnum
  debugType: number; // DebugEnum
  avatar: string;
  defaultAvatar: number;
  gender: number; // GenderEnum
  email: string;
  lang: string;
  username: string;
  nickname: string;
  mobile: string;
  level: number;
  svip: number;
  state: number; // UserStateEnum
  facebookId: string;
  pwd: string;
  googleId: string;
  inRank: boolean;
  os: string;
  brower: string;
  dealPwd: string;
  clientType: string;
  inviterId: number;
  inviterCode: string;
  currGameId: number;
  currGameName: string;
  currLimitTag: number;
  loginIp: string;
  registerIp: string;
  loginLocation: string;
  registerLocation: string;
  online: number; // OnlineEnum
  createTime: string; // LocalDateTime
  updateTime: string; // LocalDateTime
  gold: number;
  diamond: number;
  coupon: number;
  totalScore: number; // BigDecimal
  currScore: number; // BigDecimal
  exp: number;
  totalPayGold: number;
  totalPayDiamond: number;
  totalPayMoney: number; // BigDecimal
  vipLevel: number;
  vipExp: number; // BigDecimal
  totalGoldBet: number;
  totalGoldWin: number;
  totalGoldResult: number;
  totalDiamondBet: number;
  totalDiamondWin: number;
  bwType: number;
  bwState: number;
  bwNum: number;
  bwGdp: number;
  bwTime: number;
  bwDesc: string;
  monthCardType: number;
  monthCardOverTime: number;
  monthCardLastDay: number;
  monthCardSignDay: number;
  reliefFundsTimes: number;
  reliefFundsLastTime: number;
  userMoney?: UserMoney;
  userExtend?: UserExtend;
}

export interface UserVO extends User {
  userMoney: UserMoney;
  userExtend: UserExtend;
  gameInfoObj?: GameInfoObj;
  diamondGameInfo?: GameInfoObj; //字段一样的
  diamondGameInfoObj?: GameInfoObj; //字段一样的
  taskList: TaskList[];
}

export interface UserBlack {
  uid: number;
  moneyType?: number;
  bwType?: number;
  bwState?: number;
  bwNum?: number;
  totalGoldResult?: number;
  totalGoldWin?: number;
  totalGoldBet?: number;
  totalDiamondWin?: number;
  totalDiamondBet?: number;
  bwGdp?: number;
  bwTime?: number;
  bwDesc?: string;
}
// 用户钱包信息
export interface UserWallet {
  masterWallet: MasterWallet;
  childWallets: ChildWallet[];
}
export interface MasterWallet {
  uid: number;
  amount: number;
}
export interface ChildWallet {
  id: number;
  uid: number;
  name: string;
  companyId: number;
  gameGroupId: number;
  gameId: number;
  amount: number;
}

