import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ADDICO_";
export const GETCODE = `${PRE_FIX}GETCODE`;
export const LOGIN = `${PRE_FIX}LOGIN`;
export const POSTICO = `${PRE_FIX}POSTICO`;
export const PUTICO = `${PRE_FIX}PUTICO`;
export const GETICO = `${PRE_FIX}GETICO`;

export const getCode = createAction(GETCODE, params => {
	return http
		.post({
			url: "get_code",
			params
		})
		.then(res => {
			if (res.code === 4000) {
				Modal.success({
					title: "提示",
					content: "发送成功请注意查收"
				});
			} else {
				Modal.warning({
					title: "提示",
					content: res.msg
				});
			}
			return res;
		});
});

//添加ico介绍
export const postProIco = createAction(POSTICO, data => {
	return http
		.post({
			url: "category/" + data.c_id + "/desc",
			params: data.params
		})
		.then(res => {
			return res;
		});
});

//修改ico介绍
export const putProIco = createAction(PUTICO, data => {
	return http
		.put({
			url: "category/" + data.c_id + "/desc/" + data.proId,
			params: data.params
		})
		.then(res => {
			return res;
		});
});

//获取ico介绍
export const getIcoRate = createAction(GETICO, data => {
	return http
		.get({
			url: "category/" + data.c_id + "/desc",
			params: data.params
		})
		.then(res => {
			return res;
		});
});
