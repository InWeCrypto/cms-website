import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "USER_";
export const GETUSERLIST = `${PRE_FIX}GETUSERLIST`;
export const OPERATEUSER = `${PRE_FIX}OPERATEUSER`;

export const getUserList = createAction(GETUSERLIST, params => {
	return http.get({
		url: "user",
		params
	});
});
export const operateUser = createAction(OPERATEUSER, params => {
	return http
		.put({
			url: `user/${params.id}/frozen`,
			params: params.param
		})
		.then(res => {
			if (res.code === 4000) {
				return {
					code: res.code,
					msg: res.msg,
					data: {
						enable: params.param.enable,
						id: params.id
					}
				};
			}
			return res;
		});
});
