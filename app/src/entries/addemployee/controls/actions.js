import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "EMPLOYEEDETAIL_";
export const GETMENUGROUP = `${PRE_FIX}GETMENUGROUP`;
export const SAVEEMPLOYEE = `${PRE_FIX}SAVEEMPLOYEE`;
export const GETEMPLOYEE = `${PRE_FIX}GETEMPLOYEE`;
export const EDITEMPLOYEE = `${PRE_FIX}EDITEMPLOYEE`;
export const getMenuGroup = createAction(GETMENUGROUP, params => {
	return http
		.get({
			url: "menu?per_page=1000",
			params
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
export const saveEmployee = createAction(SAVEEMPLOYEE, params => {
	return http.post({
		url: "admin",
		params
	});
});
export const getEmployee = createAction(GETEMPLOYEE, params => {
	return http.get({
		url: `admin/${params.id}`
	});
});
export const editEmployee = createAction(EDITEMPLOYEE, params => {
	return http.put({
		url: `admin/${params.id}`,
		params
	});
});
