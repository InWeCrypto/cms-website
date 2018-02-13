import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "NEWS_";
export const GETCODE = `${PRE_FIX}GETCODE`;
export const LOGIN = `${PRE_FIX}LOGIN`;
export const GETPROLIST = `${PRE_FIX}GETPROLIST`;
export const GETTAGLIST = `${PRE_FIX}GETTAGLIST`;
export const POSTART = `${PRE_FIX}POSTART`;
export const POSTTAG = `${PRE_FIX}POSTTAG`;
export const GETART = `${PRE_FIX}GETART`;
export const GETTAGID = `${PRE_FIX}GETTAGID`;

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

//获取项目列表
export const getProList = createAction(GETPROLIST, params => {
	return http
		.get({
			url: "category"
		})
		.then(res => {
			return res;
		});
});

//获取标签列表
export const getTagsList = createAction(GETTAGLIST, params => {
	return http
		.get({
			url: "article/tags"
		})
		.then(res => {
			return res;
		});
});

//获取标签
export const getTagsById = createAction(GETTAGID, id => {
	return http
		.get({
			url: "article/" + id + "/tags"
		})
		.then(res => {
			return res;
		});
});

//创建文章
export const postArticle = createAction(POSTART, params => {
	return http
		.post({
			url: "article",
			params
		})
		.then(res => {
			return res;
		});
});

//修改文章
export const putArticle = createAction(POSTART, data => {
	return http
		.put({
			url: "article/" + data.id,
			params: data.data
		})
		.then(res => {
			return res;
		});
});

//关联标签
export const postArticleTag = createAction(POSTTAG, data => {
	return http
		.post({
			url: "article/" + data.id + "/tags",
			params: data.params
		})
		.then(res => {
			return res;
		});
});

//获取资讯详情
export const getArticleDetail = createAction(GETART, data => {
	return http
		.get({
			url: "article/" + data.id,
			params: data.params
		})
		.then(res => {
			return res;
		});
});
