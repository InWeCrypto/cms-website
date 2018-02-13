import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ADDCAPITAL_";
export const SENDCAPITAL = `${PRE_FIX}SENDCAPITAL`;
export const GETCAPITALDETAIL = `${PRE_FIX}GETCAPITALDETAIL`;
export const EDITCAPITALDETAIL = `${PRE_FIX}EDITCAPITALDETAIL`;

export const sendCapital = createAction(SENDCAPITAL, params => {
	return http.post({
		url: "gnt_category",
		params
	});
});
export const getCapitalDetail = createAction(GETCAPITALDETAIL, params => {
	return http.get({
		url: `gnt_category/${params.id}`
	});
});
export const editCapitalDetail = createAction(EDITCAPITALDETAIL, params => {
	return http.put({
		url: `gnt_category/${params.id}`,
		params
	});
});
