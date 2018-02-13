import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "EDITTRADING_";
export const ADDTRADING = `${PRE_FIX}ADDTRADING`;
export const GETTRADING = `${PRE_FIX}GETTRADING`;
export const PUTTRADING = `${PRE_FIX}PUTTRADING`;
export const PROJECTLIST = `${PRE_FIX}PROJECTLIST`;

export const addTrading = createAction(ADDTRADING, params => {
	return http.post({
		url: "category/candy_bow",
		params
	});
});
export const getTrading = createAction(GETTRADING, params => {
	return http.get({
		url: `category/candy_bow/${params.id}`
	});
});
export const putTrading = createAction(PUTTRADING, params => {
	return http.put({
		url: `category/candy_bow/${params.category_id}`,
		params
	});
});
export const getProjectList = createAction(PROJECTLIST, params => {
	return http.get({
		url: "category?getKeys"
	});
});
