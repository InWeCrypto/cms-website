import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "BOARD_";
export const ISTOP = `${PRE_FIX}ISTOP`;
export const GETDETAIL = `${PRE_FIX}GETDETAIL`;
export const PUTDETAIL = `${PRE_FIX}PUTDETAIL`;

//修改搜索推荐
export const putTopRecommend = createAction(ISTOP, data => {
	return http
		.put({
			url: `category/${data.c_id}`,
			params: { ...data.params }
		})
		.then(res => {
			return res;
		});
});

//获取项目详情
export const getProDetail = createAction(GETDETAIL, id => {
	return http
		.get({
			url: `category/${id}`
		})
		.then(res => {
			return res;
		});
});
putChangeType;

//更改项目详情
export const putChangeType = createAction(PUTDETAIL, id => {
	return http
		.put({
			url: `category/${id}`,
			params: {
				type: 1
			}
		})
		.then(res => {
			return res;
		});
});
