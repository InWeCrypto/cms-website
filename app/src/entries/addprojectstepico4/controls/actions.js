import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "RATE_";
export const GETCODE = `${PRE_FIX}GETCODE`;
export const LOGIN = `${PRE_FIX}LOGIN`;

export const POSTICORATE = `${PRE_FIX}POSTICORATE`;
export const PUTICORATE = `${PRE_FIX}PUTICORATE`;
export const GETICORATE = `${PRE_FIX}GETICORATE`;

//添加ico介绍rate
export const postProIcoRate = createAction(POSTICORATE, data => {
	return http
		.post({
			url: "category/" + data.c_id + "/structure",
			params: {
				params: data.params
			}
		})
		.then(res => {
			return res;
		});
});

//修改ico介绍rate
export const putProIcoRate = createAction(PUTICORATE, data => {
	return http
		.put({
			url: "category/" + data.c_id + "/structure",
			params: {
				params: data.params
			}
		})
		.then(res => {
			return res;
		});
});

//修改ico介绍rate
export const getIcoStructure = createAction(GETICORATE, data => {
	return http
		.get({
			url: "category/" + data.c_id + "/structure",
			params: {
				...data.params
			}
		})
		.then(res => {
			return res;
		});
});
