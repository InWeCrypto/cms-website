import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "PERMISSION_";
export const GETMENUGROUP = `${PRE_FIX}GETMENUGROUP`;
export const DELETEMENUGROUP = `${PRE_FIX}DELETEMENUGROUP`;
export const getMenuGroup = createAction(GETMENUGROUP, params => {
	return http.get({
		url: "menu_group",
		params
	});
});
export const deleteMenuGroup = createAction(DELETEMENUGROUP, params => {
	return http
		.delete({
			url: `menu_group/${params.id}`
		})
		.then(res => {
			if (res.code === 4000) {
				return {
					code: res.code,
					msg: res.msg,
					data: {
						id: params.id
					}
				};
			}
			return res;
		});
});
