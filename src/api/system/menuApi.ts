import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { Menu, MenuParam } from '../model/menu';

/**
 * 分页查询菜单
 */
export async function pageMenus(params: MenuParam) {
  const res = await request.Get<ApiResult<PageResult<Menu>>>('/sysMenu', {
    params
  });
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询菜单列表
 */
export async function listMenus(params?: MenuParam) {
  const res = await request.Get<ApiResult<Menu[]>>('/sysMenu', {
    params
  });
  if (res.code === 0 && res.data) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加菜单
 */
export async function addMenu(data: Menu) {
  const res = await request.Post<ApiResult<unknown>>('/sysMenu', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改菜单
 */
export async function updateMenu(data: Menu) {
  const res = await request.Put<ApiResult<unknown>>('/sysMenu', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除菜单
 */
export async function removeMenu(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/sysMenu/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
