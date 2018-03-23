import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "NEWS_";
export const GETLIST = `${PRE_FIX}GETLIST`;
export const GETTLIST = `${PRE_FIX}GETTLIST`;
export const GETPRLISTE = `${PRE_FIX}GETPRLISTE`;
export const DELETETRAN = `${PRE_FIX}DELETETRAN`;

export const getNewsList = createAction(GETLIST, params => {
	return http.get({
		url: "article",
		params
	});
});
export const deleteNews = createAction(DELETETRAN, params => {
	return http
		.delete({
			url: `ex_notice/${params.id}`
		})
		.then(res => {
			return res;
		});
});

export const getProjectList = createAction(GETPRLISTE, params => {
	return http.get({
		url: "ex_notice?getKeys"
	});
});

export const getTransList = createAction(GETTLIST, params => {
	return http
		.get({
			url: "article",
			params
		})
		.then(res => {
			return res;
		});
});
