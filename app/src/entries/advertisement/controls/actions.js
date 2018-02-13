import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ADLIST_";
export const GETADLIST = `${PRE_FIX}GETADLIST`;
export const DELETEADVER = `${PRE_FIX}DELETEADVER`;
export const getAdList = createAction(GETADLIST, params => {
	return http.get({
		url: "ads",
		params
	});
});
export const deleteAdver = createAction(DELETEADVER, params => {
	return http
		.delete({
			url: `ads/${params.id}`,
			params
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
			} else {
				return res;
			}
		});
});
