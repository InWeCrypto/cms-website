import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "PERMISSONSTEP_";
export const SENDPERMISSONNAME = `${PRE_FIX}SENDPERMISSONNAME`;
export const GETPERMISSONNAME = `${PRE_FIX}GETPERMISSONNAME`;
export const EDITPERMISSONNAME = `${PRE_FIX}EDITPERMISSONNAME`;
export const GETMENU = `${PRE_FIX}GETMENU`;
export const CHANGEITEM = `${PRE_FIX}CHANGEITEM`;
export const SAVEMENUGROUP = `${PRE_FIX}SAVEMENUGROUP`;
export const GETMENUGROUP = `${PRE_FIX}GETMENUGROUP`;
export const sendPermissonName = createAction(SENDPERMISSONNAME, params => {
	return http.post({
		url: "menu_group",
		params
	});
});
export const getPermissionName = createAction(GETPERMISSONNAME, params => {
	return http.get({
		url: `menu_group/${params.id}`
	});
});
export const editPermissionName = createAction(EDITPERMISSONNAME, params => {
	return http.put({
		url: `menu_group/${params.id}`,
		params: {
			group_name: params.group_name
		}
	});
});
export const getMenuList = createAction(GETMENU, params => {
	return http
		.get({
			url: "menu?per_page=1000"
		})
		.then(res => {
			if (
				res.code === 4000 &&
				res.data &&
				res.data.data &&
				res.data.data.length > 0
			) {
				let list = res.data.data.filter((item, index) => {
					item.isCheck = false;
					return item;
				});

				return {
					code: res.code,
					msg: res.msg,
					data: {
						...res.data,
						data: list
					}
				};
			}
			return res;
		});
});
export const changeItemCheck = createAction(CHANGEITEM, params => {
	return params;
});
export const saveMenuGroup = createAction(SAVEMENUGROUP, params => {
	return http.post({
		url: `menu_group/${params.id}/menus`,
		params: {
			menu_ids: params.menu_ids
		}
	});
});
export const getMenuGroup = createAction(GETMENUGROUP, params => {
	return http.get({
		url: `menu_group/${params.id}/menus`
	});
});
