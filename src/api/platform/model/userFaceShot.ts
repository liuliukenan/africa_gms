import { PageParam } from '@/api/model';


/**
 * 用户拍脸图记录
 */
export interface UserFaceShot {
 /**id*/
 id? : number;
 /**用户ID*/
 uid? : number;
 /**拍脸图ID*/
 faceShotId? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 用户拍脸图记录查询条件
 */
export interface UserFaceShotParam extends PageParam {
     /**id*/
     id? : number;
     /**用户ID*/
     uid? : number;
     /**拍脸图ID*/
     faceShotId? : number;
}

