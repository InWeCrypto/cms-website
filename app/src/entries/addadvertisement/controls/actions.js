import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ADEDIT_";
export const ADDADVER = `${PRE_FIX}ADEDIT`;
export const GETADDDETAIL = `${PRE_FIX}GETADDDETAIL`;
export const EDITADVER = `${PRE_FIX}EDITADVER`;

export const addAdver = createAction(EDITADVER, params => {
	return http.post({
		url: "ads",
		params
	});
});
export const getAdverDetail = createAction(GETADDDETAIL, params => {
	return http.get({
		url: `ads/${params.id}`
	});
});
export const editADVER = createAction(EDITADVER, params => {
	return http.put({
		url: `ads/${params.id}`,
		params
	});
});
