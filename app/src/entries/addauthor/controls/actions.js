import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "EDITAUTHOR_";
export const ADDAUTHOR = `${PRE_FIX}ADDAUTHOR`;
export const GETAUTHOR = `${PRE_FIX}GETAUTHOR`;
export const EDITAUTHOR = `${PRE_FIX}EDITAUTHOR`;

export const addAuthor = createAction(ADDAUTHOR, params => {
	return http.post({
		url: "menu",
		params
	});
});
export const getAuthor = createAction(GETAUTHOR, params => {
	return http.get({
		url: `menu/${params.id}`
	});
});
export const editAuthor = createAction(EDITAUTHOR, params => {
	return http.put({
		url: `menu/${params.id}`,
		params
	});
});
