import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "LABEL_";
export const LABELLIST = `${PRE_FIX}LABELLIST`;
export const DELETELABEL = `${PRE_FIX}DELETELABEL`;

export const getLabelList = createAction(LABELLIST, params => {
	return http.get({
		url: "article/tags",
		params
	});
});
export const deleteLabel = createAction(DELETELABEL, param => {
	return http
		.delete({
			url: `article/tags/${param.id}`
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
