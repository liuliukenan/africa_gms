/**
 * 查询参数
 */
export interface BannerParam {
  uid?: number;
  startId?: number;
  num?: number;
  areaCode?: string;
  countryCode?: string;
  name?: string;
  navId?: number | string;
  status?: number | string;
  pushRange?: number | string;
  startDate?: string;
  endDate?: string;
}
//
export interface Banner {
  id?: number;
  name?: string;
  priority?: number;
  navId?: number | string;
  mm: string;
  vn: string;
  indon: string;
  my: string;
  en: string;
  th: string;
  zh: string;
  uca: string;
  jumpType?: number;
  status?: number;
  pushRange?: number | string;
  pushDetail?: string;
  intervalTime?: number;
  startDate?: string;
  endDate?: string;
  createBy?: number;
  createTime?: string;
  updateBy?: number;
  updateTime?: string;
  countryCodes?: number[];
}
