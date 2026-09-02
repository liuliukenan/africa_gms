/**
 * 接口统一返回结果
 */
export interface ApiResult<T> {
  /** 状态码 */
  code?: number;
  /** 状态信息 */
  message?: string;
  /** 返回数据 */
  data?: T;
}

/**
 * 分页查询统一结果
 */
export interface PageResult<T> {
  total?: {};
  /** 返回数据 */
  list: T[];
  /** 总数量 */
  count: number;
  gold?: number;
  totalRow?: number;
}

/**
 * 分页查询基本参数
 */
export interface PageParam {
  /** 第几页 */
  page?: number;
  /** 每页多少条 */
  limit?: number;
  /** 排序字段 */
  sort?: string;
  /** 排序方式, asc升序, desc降序 */
  order?: string;
}
export interface CodeResult{
  code:string;
  data:string;
}
export enum RetEnum {
  SUCCESS = 0,
  FAIL = 1
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum PostTypeEnum {
  JSON = 0,
  FORM = 1,
  FORM_DATA = 2
}
