import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "AUTHORITY_";
export const AUTHORITYLIST = `${PRE_FIX}AUTHORITYLIST`;
export const DELETEAUTHORITY = `${PRE_FIX}DELETEAUTHORITY`;
export const getAuthorityList = createAction(AUTHORITYLIST, params => {
	return http.get({
		url: "menu",
		params
	});
});

export const deleteAuthority = createAction(DELETEAUTHORITY, param => {
	return http
		.delete({
			url: `menu/${param.id}`
		})
		.then(res => {
			if (res.code === 4000) {
				return {
					code: res.code,
					msg: res.msg,
					data: { id: param.id }
				};
			}
			return res;
		});
});
