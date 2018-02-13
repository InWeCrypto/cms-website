import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "LABELDETAIL_";
export const ADDLABEL = `${PRE_FIX}ADDLABEL`;
export const GETLABEL = `${PRE_FIX}GETLABEL`;
export const EDITLABEL = `${PRE_FIX}EDITLABEL`;

export const addLabel = createAction(ADDLABEL, params => {
	return http.post({
		url: "article/tags",
		params
	});
});
export const getLabel = createAction(GETLABEL, params => {
	return http.get({
		url: `article/tags/${params.id}`
	});
});
export const editLabel = createAction(EDITLABEL, params => {
	return http.put({
		url: `article/tags/${params.id}`,
		params
	});
});
