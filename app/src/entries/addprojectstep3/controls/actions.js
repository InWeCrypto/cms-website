import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ADDPRO_";
export const DESC = `${PRE_FIX}DESC`;
export const GETDESC = `${PRE_FIX}GETDESC`;
export const UPLOADKEY = `${PRE_FIX}UPLOADKEY`;
export const SENDPROBAXEMESS = `${PRE_FIX}SENDPROBAXEMESS`;
export const PUTPROBAXEMESS = `${PRE_FIX}PUTPROBAXEMESS`;

export const BROWSER = `${PRE_FIX}BROWSER`;
export const WALLET = `${PRE_FIX}WALLET`;
export const SOCIAL = `${PRE_FIX}SOCIAL`;

//项目介绍
export const proRecommend = createAction(DESC, data => {
	return http
		.post({
			url: `category/${data.c_id}/presentation`,
			params: { ...data.params }
		})
		.then(res => {
			return res;
		});
});

//获取项目介绍
export const getProRecommend = createAction(GETDESC, data => {
	return http
		.get({
			url: `category/${data.c_id}/presentation`,
			params: { ...data.params }
		})
		.then(res => {
			return res;
		});
});

export const getUploadKey = createAction(UPLOADKEY, type => {
	return http
		.get({
			url: `upload/${type}?get_oss_policy`
		})
		.then(res => {
			return res;
		});
});

export const postProBaseMess = createAction(SENDPROBAXEMESS, params => {
	return http
		.post({
			url: `category`,
			params
		})
		.then(res => {
			return res;
		});
});

export const putProBaseMess = createAction(PUTPROBAXEMESS, data => {
	return http
		.put({
			url: `category/${data.id}`,
			params: data.params
		})
		.then(res => {
			return res;
		});
});

//浏览器
export const postProBrowser = createAction(BROWSER, data => {
	return http
		.post({
			url: `category/${data.c_id}/explorer`,
			params: { params: data.params }
		})
		.then(res => {
			return res;
		});
});

//钱包
export const postProWallet = createAction(WALLET, data => {
	return http
		.post({
			url: `category/${data.c_id}/wallet`,
			params: { params: data.params }
		})
		.then(res => {
			return res;
		});
});

//媒体
export const postProSocial = createAction(SOCIAL, data => {
	return http
		.post({
			url: `category/${data.c_id}/media`,
			params: { params: data.params }
		})
		.then(res => {
			return res;
		});
});
