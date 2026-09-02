import { PageParam } from '@/api/model';


/**
 * 导出任务
 */
export interface ExportTask {
 /**任务ID*/
 taskId? : string;
 /**任务状态：0=PROCESSING/1=SUCCESS/2=FAILED*/
 status? : number;
 /**错误消息*/
 message? : string;
 /**下载地址*/
 downloadUrl? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 导出任务查询条件
 */
export interface ExportTaskParam extends PageParam {
     /**任务ID*/
     taskId? : string;
     /**任务状态：0=PROCESSING/1=SUCCESS/2=FAILED*/
     status? : number;
     /**错误消息*/
     message? : string;
     /**下载地址*/
     downloadUrl? : string;
}

